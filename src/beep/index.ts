import { exec } from "child_process";
const execPromise = require("util").promisify(exec);

/* MAC PLAY COMMAND */
const macPlayCommand = (path: string, volume: number, rate: number) =>
  `afplay \"${path}\" -v ${volume} -r ${rate}`;

/* WINDOW PLAY COMMANDS */
const createMediaPlayer = `$player = New-Object System.Media.SoundPlayer;`;
const loadAudioFile = (path: string) => `$player.SoundLocation = '${path}';`;
const playAudio = `$player.Play();`;
const stopAudio = `Start-Sleep 1; Start-Sleep -s $player.NaturalDuration.TimeSpan.TotalSeconds;Exit;`;

const windowPlayCommand = (path: string, volume: number) =>
  `powershell -c ${createMediaPlayer} ${loadAudioFile(
    path,
  )} $player.Volume = ${volume}; ${playAudio} ${stopAudio}`;

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
  const volumeAdjustedByOS =
    process.platform === "darwin" ? Math.min(2, volume * 2) : volume;

  const playCommand =
    process.platform === "darwin"
      ? macPlayCommand(path, volumeAdjustedByOS, rate)
      : windowPlayCommand(path, volumeAdjustedByOS);

  try {
    await execPromise(playCommand, { windowsHide: true });
  } catch (err) {
    throw err;
  }
};

export { play };
