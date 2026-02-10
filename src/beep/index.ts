import { $ } from "bun";

const createMediaPlayer = `$player = New-Object System.Media.SoundPlayer;`;
const loadAudioFile = (path: string) => `$player.SoundLocation = '${path}';`;
const playAudio = `$player.PlaySync();`;

const getPlayCommand = (path: string, volume: number) =>
  `${createMediaPlayer} ${loadAudioFile(path)} ${playAudio}`;

/**
 * Plays an audio file on Mac or Windows
 *
 * @param {string} path - The file path to the audio file that will be played.
 * @param {number} [volume=0.5] - Playback volume as a decimal between 0 and 1.
 *  - Windows: Volume range is 0 to 1. Default is 0.5.
 *  - Mac: Volume range is scaled from 0 to 2 (where 2 is 100% volume). Values above 2 may cause distortion.
 * @param {number} [rate=1] - Playback rate multiplier (only used on Mac). 1 is normal speed.
 *
 * @throws Will throw an error if audio playback fails.
 */
const play = async (path: string, volume: number = 1, rate: number = 1) => {
  const playCommand = getPlayCommand(path, volume);

  try {
    await $`powershell -c ${playCommand}`;
  } catch (err) {
    throw err;
  }
};

export { play };
