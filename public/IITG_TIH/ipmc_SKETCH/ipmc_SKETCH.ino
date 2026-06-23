#include "esp_camera.h"
#include <WiFi.h>
#include "FS.h"
#include "SD_MMC.h"
#include <EEPROM.h>
#include "img_converters.h"
#include <time.h>


// ===========================
// Select camera model
// ===========================
#define CAMERA_MODEL_AI_THINKER
#include "camera_pins.h"

// ===========================
// Enter your WiFi credentials
// ===========================
const char *ssid = "Pervez";
const char *password = "16iphone";

// SD Card and capture settings - UPDATED FOR TWO-PHASE CAPTURE
#define FRAMES_PER_PHASE 20           // 20 frames for stimulus, 20 frames for relaxation
#define TOTAL_FRAMES (FRAMES_PER_PHASE * 2) // Total 40 frames
#define EEPROM_SIZE 2                  // Store sequence number
#define FRAME_DELAY_MS 300             // 300ms interval between frames
#define FLASH_DELAY_MS 150             // Flash duration

// Global variables
int captureSequence = 0;
bool shouldCapture = false;
bool shouldCaptureRelaxation = false; // NEW: Flag for relaxation phase
float voltageInput = 0.0;
String mediumName = "";
int framesCaptured = 0;
unsigned long lastCaptureTime = 0;
bool isCapturing = false;
bool sdCardAvailable = false;
int currentPhase = 0; // 0 = not capturing, 1 = stimulus phase, 2 = relaxation phase
int currentFrameInPhase = 0; // Current frame within the current phase

// Forward declarations
void startCameraServer();
void capturePhase(); // Renamed from captureAndSaveFrames
String createFilename(int frameNumber, float voltage, String medium, String phase);
bool initSDCard();
bool saveToSD(const char* filename, uint8_t* buf, size_t len);
void processSerialCommand();
void setupTime();
void createMediumDirectory(String mediumName);

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();
  
  // Initialize EEPROM
  EEPROM.begin(EEPROM_SIZE);
  // Read 2-byte sequence number
  captureSequence = (EEPROM.read(0) << 8) | EEPROM.read(1);
  Serial.printf("Starting capture sequence: %d\n", captureSequence);
  
  // Initialize SD Card
  sdCardAvailable = initSDCard();
  
  if (!sdCardAvailable) {
    Serial.println("SD Card initialization failed - images won't be saved");
  }

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.frame_size = FRAMESIZE_QVGA;
  config.pixel_format = PIXFORMAT_RGB565;
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  if (psramFound()) {
    Serial.println("PSRAM found");
    config.jpeg_quality = 10;
    config.fb_count = 2;
    config.grab_mode = CAMERA_GRAB_LATEST;
  } else {
    Serial.println("No PSRAM found");
    config.frame_size = FRAMESIZE_QVGA;
    config.fb_location = CAMERA_FB_IN_DRAM;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x, trying RGB565...\n", err);
    
    config.pixel_format = PIXFORMAT_RGB565;
    config.frame_size = FRAMESIZE_QVGA;
    err = esp_camera_init(&config);
    
    if (err != ESP_OK) {
      Serial.printf("Camera init failed again with error 0x%x\n", err);
      return;
    } else {
      Serial.println("Camera initialized with RGB565 format");
    }
  } else {
    Serial.println("Camera initialized with JPEG format");
  }

  sensor_t *s = esp_camera_sensor_get();
  if (s->id.PID == OV3660_PID) {
    s->set_vflip(s, 1);
    s->set_brightness(s, 1);
    s->set_saturation(s, -2);
  } else if (s->id.PID == OV2640_PID) {
    s->set_vflip(s, 1);
    s->set_hmirror(s, 1);
  }
  
  s->set_framesize(s, FRAMESIZE_QVGA);
  s->set_quality(s, 10);

  WiFi.begin(ssid, password);
  WiFi.setSleep(false);

  Serial.print("WiFi connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  // Setup time from NTP server (only used for status display)
  setupTime();

  startCameraServer();

  Serial.print("Camera Ready! Use 'http://");
  Serial.print(WiFi.localIP());
  Serial.println("' to connect");
  
  Serial.println("\n=== IPMC TWO-PHASE CAPTURE SYSTEM ===");
  Serial.println("Phase 1: Stimulus (20 frames @ 300ms) - Voltage applied, bending occurs");
  Serial.println("Phase 2: Relaxation (20 frames @ 300ms) - After voltage removal, back relaxation");
  Serial.println("\n=== FLEXIBLE MEDIUM SUPPORT ===");
  Serial.println("You can use ANY medium name! The system will automatically create directories.");
  Serial.println("\nCommands:");
  Serial.println("CAPTURE:<voltage>:<medium> - Start Phase 1 (stimulus)");
  Serial.println("  Example: CAPTURE:2.5:AIR (for Air medium at 2.5V)");
  Serial.println("  Example: CAPTURE:3.0:WATER");
  Serial.println("  Example: CAPTURE:2.5:NaCl_0.9% (0.9% NaCl)");
  Serial.println("  Example: CAPTURE:2.5:NaCl_3.5% (3.5% NaCl)");
  Serial.println("  Example: CAPTURE:2.5:PBS");
  Serial.println("  Example: CAPTURE:2.5:Glucose_5%");
  Serial.println("  Example: CAPTURE:2.5:Artificial_Seawater");
  Serial.println("  Example: CAPTURE:2.5:Custom_Solution_1");
  Serial.println("RELAX - Start Phase 2 (relaxation) after removing voltage");
  Serial.println("STATUS - Check current status");
  Serial.println("RESET - Reset capture sequence");
  Serial.println("TEST - Test camera capture");
  Serial.println("LIST - List files on SD card");
  Serial.println("DEBUG - Debug SD card");
  Serial.println("MEDIUMS - List available medium directories");
  Serial.println("NEWMEDIUM:<name> - Create a new medium directory");
}

void setupTime() {
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  
  Serial.print("Waiting for NTP time sync");
  time_t now = time(nullptr);
  int attempts = 0;
  while (now < 8 * 3600 * 2 && attempts < 20) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
    attempts++;
  }
  
  if (now < 8 * 3600 * 2) {
    Serial.println("\nFailed to sync time");
  } else {
    struct tm timeinfo;
    localtime_r(&now, &timeinfo);
    Serial.println("\nTime synchronized");
  }
}

bool initSDCard() {
  Serial.println("Initializing SD card...");
  
  if (!SD_MMC.begin("/sdcard", true)) {
    Serial.println("SD Card initialization failed!");
    return false;
  }
  
  uint8_t cardType = SD_MMC.cardType();
  if (cardType == CARD_NONE) {
    Serial.println("No SD card found");
    return false;
  }
  
  Serial.print("SD Card Type: ");
  if (cardType == CARD_MMC) {
    Serial.println("MMC");
  } else if (cardType == CARD_SD) {
    Serial.println("SDSC");
  } else if (cardType == CARD_SDHC) {
    Serial.println("SDHC");
  } else {
    Serial.println("UNKNOWN");
  }
  
  uint64_t cardSize = SD_MMC.cardSize() / (1024 * 1024);
  uint64_t usedBytes = SD_MMC.usedBytes() / (1024 * 1024);
  uint64_t freeBytes = (SD_MMC.totalBytes() - SD_MMC.usedBytes()) / (1024 * 1024);
  
  Serial.printf("SD Card Size: %lluMB\n", cardSize);
  Serial.printf("Used space: %lluMB\n", usedBytes);
  Serial.printf("Free space: %lluMB\n", freeBytes);
  
  // Create IPMC directory structure for organized storage
  String baseDir = "/IPMC_Data";
  if (!SD_MMC.exists(baseDir.c_str())) {
    if (SD_MMC.mkdir(baseDir.c_str())) {
      Serial.println("Created /IPMC_Data directory");
    }
  }
  
  // Create common medium directories for convenience
  String commonMedia[] = {"AIR", "WATER", "NaCl_0.9%", "NaCl_3.5%", "PBS", "Glucose_5%", "Artificial_Seawater"};
  for (String medium : commonMedia) {
    createMediumDirectory(medium);
  }
  
  // Test write
  File testFile = SD_MMC.open("/IPMC_Data/test.txt", FILE_WRITE);
  if (testFile) {
    testFile.println("IPMC Actuation Experiment - Two-Phase Capture System");
    testFile.println("Supports flexible medium names - directories auto-created");
    testFile.close();
    Serial.println("SD card test: PASSED");
    return true;
  }
  
  Serial.println("SD card test: FAILED");
  return false;
}

void createMediumDirectory(String mediumName) {
  if (!sdCardAvailable) return;
  
  // Clean the medium name for directory creation
  String cleanMedium = mediumName;
  cleanMedium.trim();
  cleanMedium.replace(" ", "_");
  
  String fullPath = "/IPMC_Data/" + cleanMedium;
  if (!SD_MMC.exists(fullPath.c_str())) {
    if (SD_MMC.mkdir(fullPath.c_str())) {
      Serial.printf("Created medium directory: %s\n", fullPath.c_str());
      
      // Create a readme file in the directory
      String readmePath = fullPath + "/README.txt";
      File readmeFile = SD_MMC.open(readmePath.c_str(), FILE_WRITE);
      if (readmeFile) {
        readmeFile.printf("Medium: %s\n", mediumName.c_str());
        readmeFile.printf("Created: %s\n", __DATE__);
        readmeFile.println("Contains IPMC stimulus and relaxation images");
        readmeFile.close();
      }
    }
  }
}

bool saveToSD(const char* filename, uint8_t* buf, size_t len) {
  if (!sdCardAvailable) {
    Serial.println("SD card not available");
    return false;
  }
  
  Serial.printf("Saving: %s (%d bytes)\n", filename, len);
  
  File file = SD_MMC.open(filename, FILE_WRITE);
  if (!file) {
    Serial.printf("Failed to open file: %s\n", filename);
    return false;
  }
  
  size_t bytesWritten = file.write(buf, len);
  file.close();
  
  if (bytesWritten != len) {
    Serial.printf("Write incomplete: %d/%d bytes\n", bytesWritten, len);
    return false;
  }
  
  return true;
}

String createFilename(int frameNumber, float voltage, String medium, String phase) {
  char filename[200];
  
  // Clean the medium name for filename
  String cleanMedium = medium;
  cleanMedium.trim();
  cleanMedium.replace(" ", "_");
  
  // Determine phase abbreviation
  String phaseAbbr = (phase == "STIMULUS") ? "S" : "R";
  
  // Create filename with format: /IPMC_Data/MEDIUM/SEQ_VOLTAGE_PHASE_MEDIUM_FRAME.jpg
  // Added more descriptive naming
  snprintf(filename, sizeof(filename), 
           "/IPMC_Data/%s/%03d_%.1fV_%s_%s_%02d.jpg", 
           cleanMedium.c_str(), captureSequence, voltage, 
           phaseAbbr.c_str(), cleanMedium.c_str(), frameNumber + 1);
  
  return String(filename);
}

void capturePhase() {
  if (isCapturing) return;
  isCapturing = true;
  
  String phaseName = (currentPhase == 1) ? "STIMULUS" : "RELAXATION";
  Serial.printf("\n=== Starting %s phase for sequence %d ===\n", 
                phaseName.c_str(), captureSequence);
  Serial.printf("Voltage: %.1fV, Medium: %s\n", voltageInput, mediumName.c_str());
  Serial.printf("Capturing %d frames @ 300ms intervals...\n", FRAMES_PER_PHASE);
  
  // Ensure medium directory exists before capturing
  if (sdCardAvailable) {
    createMediumDirectory(mediumName);
  } else {
    Serial.println("WARNING: SD card not available. Images won't be saved!");
  }
  
  sensor_t *s = esp_camera_sensor_get();
  framesize_t originalSize = s->status.framesize;
  
  s->set_framesize(s, FRAMESIZE_QVGA);
  delay(100);
  
  for (int i = 0; i < FRAMES_PER_PHASE; i++) {
    currentFrameInPhase = i;
    
    Serial.printf("Capturing %s frame %d/%d...\n", 
                  phaseName.c_str(), i + 1, FRAMES_PER_PHASE);
    
    camera_fb_t* fb = esp_camera_fb_get();
    
    if (!fb) {
      Serial.println("Camera capture failed");
      delay(100);
      continue;
    }
    
    Serial.printf("Frame: %dx%d, format: %d, size: %d bytes\n", 
                  fb->width, fb->height, fb->format, fb->len);
    
    uint8_t* jpeg_buf = NULL;
    size_t jpeg_len = 0;
    bool success = false;
    
    if (fb->format == PIXFORMAT_JPEG) {
      jpeg_buf = fb->buf;
      jpeg_len = fb->len;
      success = true;
    } else if (fb->format == PIXFORMAT_RGB565) {
      if (frame2jpg(fb, 80, &jpeg_buf, &jpeg_len)) {
        success = true;
      }
    }
    
    if (success && jpeg_buf && jpeg_len > 0) {
      String filename = createFilename(i, voltageInput, mediumName, phaseName);
      
      if (sdCardAvailable) {
        if (saveToSD(filename.c_str(), jpeg_buf, jpeg_len)) {
          framesCaptured++;
          Serial.printf("✓ %s frame %d saved as: %s\n", 
                       phaseName.c_str(), i + 1, filename.c_str());
        } else {
          Serial.printf("✗ Failed to save %s frame %d\n", phaseName.c_str(), i + 1);
        }
      } else {
        Serial.printf("%s frame %d captured (%d bytes) - NOT saved (no SD card)\n", 
                     phaseName.c_str(), i + 1, jpeg_len);
      }
      
      // Free converted buffer if needed
      if (fb->format != PIXFORMAT_JPEG && jpeg_buf) {
        free(jpeg_buf);
      }
    } else {
      Serial.println("Failed to convert frame to JPEG");
    }
    
    esp_camera_fb_return(fb);
    
    if (i < FRAMES_PER_PHASE - 1) {
      delay(FRAME_DELAY_MS);
    }
  }
  
  s->set_framesize(s, originalSize);
  
  Serial.printf("\n=== %s phase complete! ===\n", phaseName.c_str());
  Serial.printf("Saved %d/%d frames\n", framesCaptured, FRAMES_PER_PHASE);
  
  // Update phase tracking
  if (currentPhase == 1) {
    // Stimulus phase completed
    Serial.println("\n⚠️  APPLY VOLTAGE NOW - IPMC bending should occur");
    Serial.println("⚠️  After voltage application, type 'RELAX' in Serial Monitor");
    Serial.println("⚠️  to start capturing relaxation phase (20 frames @ 300ms)");
    currentPhase = 0; // Return to idle
  } else if (currentPhase == 2) {
    // Relaxation phase completed - update sequence number
    if (framesCaptured > 0) {
      captureSequence++;
      // Store 2-byte sequence number in EEPROM
      EEPROM.write(0, (captureSequence >> 8) & 0xFF);
      EEPROM.write(1, captureSequence & 0xFF);
      EEPROM.commit();
      Serial.printf("Capture sequence updated to: %d\n", captureSequence);
    }
    
    Serial.printf("\n=== COMPLETE EXPERIMENT ===\n");
    Serial.printf("Total frames captured: %d (20 stimulus + 20 relaxation)\n", framesCaptured * 2);
    Serial.printf("Voltage: %.1fV, Medium: %s\n", voltageInput, mediumName.c_str());
    Serial.printf("Sequence: %d\n", captureSequence - 1);
    currentPhase = 0; // Return to idle
  }
  
  framesCaptured = 0;
  currentFrameInPhase = 0;
  isCapturing = false;
}

void processSerialCommand() {
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    
    if (command.startsWith("CAPTURE:")) {
      // Parse voltage and medium name
      String params = command.substring(8);
      int colonPos = params.indexOf(':');
      
      if (colonPos > 0) {
        String voltageStr = params.substring(0, colonPos);
        voltageInput = voltageStr.toFloat();
        mediumName = params.substring(colonPos + 1);
        
        // Clean medium name
        mediumName.trim();
        
        if (voltageInput > 0 && voltageInput < 100 && mediumName.length() > 0) {
          if (!sdCardAvailable) {
            Serial.println("Warning: SD card not available. Images won't be saved!");
          }
          
          // Check if we're already in a capture sequence
          if (currentPhase != 0) {
            Serial.println("Error: Already in a capture sequence. Please complete current experiment first.");
            return;
          }
          
          // Create medium directory if needed
          if (sdCardAvailable) {
            createMediumDirectory(mediumName);
          }
          
          // Start stimulus phase
          currentPhase = 1;
          shouldCapture = true;
          lastCaptureTime = millis();
          Serial.printf("\n=== STARTING STIMULUS PHASE ===\n");
          Serial.printf("Voltage: %.1fV, Medium: %s\n", voltageInput, mediumName.c_str());
          Serial.printf("Will capture 20 frames @ 300ms intervals\n");
          Serial.println("Starting capture in 2 seconds...");
        } else {
          Serial.println("Invalid parameters. Use: CAPTURE:<voltage>:<medium>");
          Serial.println("Example: CAPTURE:2.5:AIR or CAPTURE:3.0:WATER");
        }
      } else {
        Serial.println("Invalid format. Use: CAPTURE:<voltage>:<medium>");
        Serial.println("Example: CAPTURE:2.5:AIR");
      }
    } 
    else if (command == "RELAX") {
      // Start relaxation phase
      if (currentPhase == 0 && mediumName.length() > 0) {
        currentPhase = 2;
        shouldCapture = true;
        lastCaptureTime = millis();
        Serial.println("\n=== STARTING RELAXATION PHASE ===");
        Serial.println("⚠️  REMOVE VOLTAGE NOW - IPMC back relaxation will occur");
        Serial.println("Will capture 20 frames @ 300ms intervals");
        Serial.println("Starting capture in 2 seconds...");
      } else if (currentPhase == 1) {
        Serial.println("Error: Please complete stimulus phase first.");
      } else {
        Serial.println("Error: No active experiment. Start with CAPTURE:<voltage>:<medium> first.");
      }
    }
    else if (command == "STATUS") {
      sensor_t *s = esp_camera_sensor_get();
      Serial.printf("\n=== System Status ===\n");
      Serial.printf("Capture Sequence: %d\n", captureSequence);
      Serial.printf("Current Phase: ");
      if (currentPhase == 0) Serial.println("Idle");
      else if (currentPhase == 1) Serial.println("Stimulus (waiting for RELAX command)");
      else if (currentPhase == 2) Serial.println("Relaxation (capturing)");
      Serial.printf("Current Medium: %s\n", mediumName.c_str());
      Serial.printf("Voltage: %.1fV\n", voltageInput);
      Serial.printf("SD Card: %s\n", sdCardAvailable ? "Available" : "Not Available");
      if (sdCardAvailable) {
        uint64_t totalBytes = SD_MMC.totalBytes() / (1024 * 1024);
        uint64_t usedBytes = SD_MMC.usedBytes() / (1024 * 1024);
        uint64_t freeBytes = (SD_MMC.totalBytes() - SD_MMC.usedBytes()) / (1024 * 1024);
        Serial.printf("SD Total: %lluMB, Used: %lluMB, Free: %lluMB\n", 
                      totalBytes, usedBytes, freeBytes);
      }
      Serial.printf("WiFi: %s\n", WiFi.status() == WL_CONNECTED ? "Connected" : "Disconnected");
      Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());
      if (s) {
        const char* cameraName = "Unknown";
        if (s->id.PID == OV2640_PID) cameraName = "OV2640";
        else if (s->id.PID == OV3660_PID) cameraName = "OV3660";
        Serial.printf("Camera: %s\n", cameraName);
        Serial.printf("Resolution: QVGA (320x240)\n");
        Serial.printf("Format: %s\n", s->pixformat == PIXFORMAT_JPEG ? "JPEG" : "RGB565");
      }
      Serial.printf("Free Heap: %d bytes\n", ESP.getFreeHeap());
      Serial.printf("PSRAM: %s\n", psramFound() ? "Yes" : "No");
      Serial.println("===================\n");
    }
    else if (command == "RESET") {
      captureSequence = 0;
      EEPROM.write(0, 0);
      EEPROM.write(1, 0);
      EEPROM.commit();
      currentPhase = 0;
      mediumName = "";
      voltageInput = 0.0;
      Serial.println("Capture sequence reset to 0");
      Serial.println("Current experiment cleared");
    }
    else if (command == "TEST") {
      camera_fb_t* fb = esp_camera_fb_get();
      if (fb) {
        Serial.printf("Test capture: %dx%d, format: %d, size: %d bytes\n",
                     fb->width, fb->height, fb->format, fb->len);
        esp_camera_fb_return(fb);
      } else {
        Serial.println("Test capture failed");
      }
    }
    else if (command == "LIST") {
      if (sdCardAvailable) {
        Serial.println("Files in /IPMC_Data directory:");
        
        if (!SD_MMC.exists("/IPMC_Data")) {
          Serial.println("/IPMC_Data directory doesn't exist yet");
          return;
        }
        
        File root = SD_MMC.open("/IPMC_Data");
        if (!root) {
          Serial.println("Failed to open /IPMC_Data directory");
          return;
        }
        
        // List all media directories
        File file = root.openNextFile();
        int totalFiles = 0;
        while (file) {
          if (file.isDirectory()) {
            Serial.printf("\nDirectory: %s\n", file.name());
            // List files in this directory
            String dirPath = "/IPMC_Data/" + String(file.name());
            File mediaDir = SD_MMC.open(dirPath.c_str());
            File mediaFile = mediaDir.openNextFile();
            int dirFileCount = 0;
            while (mediaFile) {
              if (!mediaFile.isDirectory()) {
                Serial.printf("  %s (%d bytes)\n", mediaFile.name(), mediaFile.size());
                dirFileCount++;
                totalFiles++;
              }
              mediaFile = mediaDir.openNextFile();
            }
            mediaDir.close();
            Serial.printf("  Total in %s: %d files\n", file.name(), dirFileCount);
          }
          file = root.openNextFile();
        }
        Serial.printf("\nTotal files in /IPMC_Data: %d\n", totalFiles);
        root.close();
      } else {
        Serial.println("SD card not available");
      }
    }
    else if (command == "DEBUG") {
      Serial.println("SD Card Debug Info:");
      Serial.printf("Card type: %d\n", SD_MMC.cardType());
      Serial.printf("Total bytes: %llu\n", SD_MMC.totalBytes());
      Serial.printf("Used bytes: %llu\n", SD_MMC.usedBytes());
      
      File testFile = SD_MMC.open("/IPMC_Data/debug_test.txt", FILE_WRITE);
      if (testFile) {
        testFile.println("Debug test - IPMC Two-Phase System");
        testFile.close();
        Serial.println("Test file created successfully");
        SD_MMC.remove("/IPMC_Data/debug_test.txt");
      } else {
        Serial.println("Failed to create test file");
      }
    }
    else if (command == "MEDIUMS") {
      if (sdCardAvailable) {
        Serial.println("\n=== Available Medium Directories ===");
        
        File root = SD_MMC.open("/IPMC_Data");
        File file = root.openNextFile();
        int mediumCount = 0;
        
        while (file) {
          if (file.isDirectory()) {
            mediumCount++;
            String dirPath = "/IPMC_Data/" + String(file.name());
            File mediumDir = SD_MMC.open(dirPath.c_str());
            File mediumFile = mediumDir.openNextFile();
            int fileCount = 0;
            
            while (mediumFile) {
              if (!mediumFile.isDirectory()) {
                fileCount++;
              }
              mediumFile = mediumDir.openNextFile();
            }
            mediumDir.close();
            
            Serial.printf("%d. %s (%d files)\n", mediumCount, file.name(), fileCount);
          }
          file = root.openNextFile();
        }
        root.close();
        
        if (mediumCount == 0) {
          Serial.println("No medium directories found.");
        } else {
          Serial.printf("\nTotal medium directories: %d\n", mediumCount);
          Serial.println("\nYou can use ANY medium name in CAPTURE command!");
          Serial.println("System will auto-create directories for new mediums.");
        }
      } else {
        Serial.println("SD card not available");
      }
    }
    else if (command.startsWith("NEWMEDIUM:")) {
      String newMedium = command.substring(10);
      newMedium.trim();
      
      if (newMedium.length() > 0) {
        if (sdCardAvailable) {
          createMediumDirectory(newMedium);
          Serial.printf("Medium directory '%s' created/verified.\n", newMedium.c_str());
          Serial.println("You can now use it with: CAPTURE:<voltage>:" + newMedium);
        } else {
          Serial.println("SD card not available");
        }
      } else {
        Serial.println("Invalid medium name. Use: NEWMEDIUM:<name>");
      }
    }
    else {
      Serial.println("Unknown command. Available commands:");
      Serial.println("  CAPTURE:<voltage>:<medium> - Start stimulus phase (apply voltage)");
      Serial.println("    Examples: CAPTURE:2.5:AIR, CAPTURE:3.0:Water, CAPTURE:2.5:Custom_Solution");
      Serial.println("  RELAX - Start relaxation phase (remove voltage)");
      Serial.println("  STATUS - Show system status");
      Serial.println("  RESET - Reset capture sequence");
      Serial.println("  TEST - Test camera capture");
      Serial.println("  LIST - List files on SD card");
      Serial.println("  DEBUG - Debug SD card");
      Serial.println("  MEDIUMS - List available medium directories");
      Serial.println("  NEWMEDIUM:<name> - Create a new medium directory");
    }
  }
}

void loop() {
  processSerialCommand();
  
  if (shouldCapture && millis() - lastCaptureTime > 2000) {
    shouldCapture = false;
    capturePhase();
  }
  
  delay(50);
}