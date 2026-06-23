import { useUIStore } from "./ui-store";

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: new () => AudioContext }).webkitAudioContext
    )();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSound(type: "click" | "levelup" | "portal") {
  if (typeof window === "undefined") return;

  const soundOn = useUIStore.getState().soundOn;
  if (!soundOn) return;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "levelup") {
      // XP Level up arpeggio: G4 -> B4 -> D5 -> G5
      const notes = [392.0, 493.88, 587.33, 783.99];
      notes.forEach((freq, index) => {
        const time = now + index * 0.07;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.08, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
        osc.start(time);
        osc.stop(time + 0.4);
      });
    } else if (type === "portal") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.linearRampToValueAtTime(250, now + 0.5);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch (e) {
    console.warn("Failed to play synthesized sound:", e);
  }
}
