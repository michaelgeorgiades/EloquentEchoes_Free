import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateTilburyAudio() {
  const tilburyTranscript = `My loving people, we have been persuaded by some that are careful of our safety, to take heed how we commit ourselves to armed multitudes, for fear of treachery; but I assure you I do not desire to live to distrust my faithful and loving people. Let tyrants fear. I have always so behaved myself that, under God, I have placed my chiefest strength and safeguard in the loyal hearts and good-will of my subjects; and therefore I am come amongst you, as you see, at this time, not for my recreation and disport, but being resolved, in the midst and heat of the battle, to live and die amongst you all; to lay down for my God, and for my kingdom, and my people, my honour and my blood, even in the dust. I know I have the body of a weak, feeble woman; but I have the heart and stomach of a king, and of a king of England too, and think foul scorn that Parma or Spain, or any prince of Europe, should dare to invade the borders of my realm; to which rather than any dishonour shall grow by me, I myself will take up arms, I myself will be your general, judge, and rewarder of every one of your virtues in the field.`;

  console.log('Generating audio for Queen Elizabeth I Tilbury speech...');
  
  const mp3 = await openai.audio.speech.create({
    model: "tts-1-hd",
    voice: "nova",
    input: tilburyTranscript,
  });

  const audioDir = path.join(process.cwd(), 'attached_assets', 'audio');
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const audioPath = path.join(audioDir, 'tilbury-speech.mp3');
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(audioPath, buffer);

  console.log(`Audio generated successfully: ${audioPath}`);
  console.log(`File size: ${(buffer.length / 1024).toFixed(2)} KB`);
}

generateTilburyAudio()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error generating audio:', error);
    process.exit(1);
  });
