// Musical chord transposer helper for guitarists and keyboardists

const CHROMATIC_SCALE_SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const CHROMATIC_SCALE_FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export function transposeChord(chord: string, semitones: number): string {
  if (semitones === 0) return chord;

  return chord.replace(/\[([A-G][b#]?)(.*?)\]/g, (_match, root, suffix) => {
    let index = CHROMATIC_SCALE_SHARPS.indexOf(root);
    if (index === -1) {
      index = CHROMATIC_SCALE_FLATS.indexOf(root);
    }
    if (index === -1) return `[${root}${suffix}]`;

    const newIndex = (index + semitones + 120) % 12;
    const newRoot = CHROMATIC_SCALE_SHARPS[newIndex];
    return `[${newRoot}${suffix}]`;
  });
}

export function transposeChordLine(line: string, semitones: number): string {
  return transposeChord(line, semitones);
}
