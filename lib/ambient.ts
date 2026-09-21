/**
 * Generative ambient soundtrack built on the Web Audio API, no audio file to
 * download, no licensing. A slow four-chord pad (Fmaj7 → Em7 → Dm9 → Cmaj7)
 * with sparse pentatonic "bell" notes through a delay and a small reverb.
 */

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

const CHORDS: number[][] = [
  [53, 57, 60, 64], // Fmaj7
  [52, 55, 59, 62], // Em7
  [50, 57, 60, 64], // Dm9 (no 3rd)
  [48, 55, 59, 64], // Cmaj7
];
const BELLS = [72, 74, 76, 79, 81, 84, 88]; // C major pentatonic
const CHORD_SECONDS = 8;
const TARGET_VOLUME = 0.42;

type Engine = { start: () => void; stop: () => void; isPlaying: () => boolean };

let engine: Engine | null = null;

export function getAmbient(): Engine {
  if (engine) return engine;

  let ctx: AudioContext | null = null;
  let master: GainNode;
  let padBus: GainNode;
  let bellBus: GainNode;
  let timer: ReturnType<typeof setInterval> | undefined;
  let nextChordAt = 0;
  let nextBellAt = 0;
  let chordIdx = 0;
  let playing = false;

  const build = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Small generated reverb impulse
    const len = ctx.sampleRate * 2.6;
    const impulse = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = impulse.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    const reverb = ctx.createConvolver();
    reverb.buffer = impulse;
    const wet = ctx.createGain();
    wet.gain.value = 0.55;
    reverb.connect(wet);
    wet.connect(master);

    padBus = ctx.createGain();
    padBus.gain.value = 0.22;
    padBus.connect(master);
    padBus.connect(reverb);

    // Bells go through a feedback delay for that gentle echo
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.42;
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    delay.connect(fb);
    fb.connect(delay);

    bellBus = ctx.createGain();
    bellBus.gain.value = 0.12;
    bellBus.connect(master);
    bellBus.connect(delay);
    bellBus.connect(reverb);
    delay.connect(reverb);
    delay.connect(master);
  };

  const playChord = (when: number, notes: number[]) => {
    if (!ctx) return;
    const attack = 2.6;
    const release = 3.2;
    const dur = CHORD_SECONDS;
    for (const n of notes) {
      for (const detune of [-6, 6]) {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = midi(n);
        osc.detune.value = detune;
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 800;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, when);
        g.gain.linearRampToValueAtTime(0.5, when + attack);
        g.gain.setValueAtTime(0.5, when + dur - 0.5);
        g.gain.linearRampToValueAtTime(0, when + dur + release);
        osc.connect(lp);
        lp.connect(g);
        g.connect(padBus);
        osc.start(when);
        osc.stop(when + dur + release + 0.1);
      }
    }
    // Soft bass root
    const bass = ctx.createOscillator();
    bass.type = "sine";
    bass.frequency.value = midi(notes[0] - 12);
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(0, when);
    bg.gain.linearRampToValueAtTime(0.5, when + attack);
    bg.gain.linearRampToValueAtTime(0, when + dur + release);
    bass.connect(bg);
    bg.connect(padBus);
    bass.start(when);
    bass.stop(when + dur + release + 0.1);
  };

  const playBell = (when: number) => {
    if (!ctx) return;
    const note = BELLS[Math.floor(Math.random() * BELLS.length)];
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = midi(note);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(0.7, when + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, when + 2.6);
    osc.connect(g);
    g.connect(bellBus);
    osc.start(when);
    osc.stop(when + 2.7);
  };

  const tick = () => {
    if (!ctx) return;
    const horizon = ctx.currentTime + 1.2;
    while (nextChordAt < horizon) {
      playChord(nextChordAt, CHORDS[chordIdx % CHORDS.length]);
      chordIdx++;
      nextChordAt += CHORD_SECONDS;
    }
    while (nextBellAt < horizon) {
      if (Math.random() < 0.6) playBell(nextBellAt);
      nextBellAt += 1.4 + Math.random() * 1.6;
    }
  };

  engine = {
    start() {
      if (playing) return;
      if (!ctx) build();
      const c = ctx!;
      void c.resume();
      const now = c.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(TARGET_VOLUME, now + 3);
      nextChordAt = now + 0.1;
      nextBellAt = now + 2.5;
      tick();
      timer = setInterval(tick, 300);
      playing = true;
    },
    stop() {
      if (!playing || !ctx) return;
      playing = false;
      clearInterval(timer);
      const c = ctx;
      const now = c.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 1.2);
      // Suspend once the fade is done so we aren't burning CPU/battery
      setTimeout(() => { if (!playing) void c.suspend(); }, 1400);
    },
    isPlaying: () => playing,
  };
  return engine;
}
