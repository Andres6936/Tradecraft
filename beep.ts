import { play } from "./src/beep";

await play('./public/tone.wav')

import { $ } from 'bun';

const cmd = "Add-Type -AssemblyName System.Speech; $synth = New-Object -TypeName System.Speech.Synthesis.SpeechSynthesizer; $synth.Speak('Hola, Esperando durante 6624...!');"

await $`powershell ${cmd}`
