import { db } from "./db";
import { speakers, categories, speeches } from "@shared/schema";

export async function seedDatabase() {
  console.log("Seeding database...");

  const existingSpeakers = await db.select().from(speakers).limit(1);
  if (existingSpeakers.length > 0) {
    console.log("Database already seeded");
    return;
  }

  console.log("Starting fresh seed...");

  const speakerData = await db.insert(speakers).values([
    {
      name: "Abraham Lincoln",
      bio: "16th President of the United States, led the nation through the Civil War and worked to end slavery.",
      birthYear: 1809,
      deathYear: 1865,
      location: "United States",
      period: "1800s",
      imageUrl: "/api/placeholder-speaker/lincoln"
    },
    {
      name: "Winston Churchill",
      bio: "British Prime Minister during World War II, renowned orator and Nobel Prize winner in Literature.",
      birthYear: 1874,
      deathYear: 1965,
      location: "United Kingdom",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/churchill"
    },
    {
      name: "Martin Luther King Jr.",
      bio: "American civil rights leader and activist, advocate for nonviolent resistance and equality.",
      birthYear: 1929,
      deathYear: 1968,
      location: "United States",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/king"
    },
    {
      name: "Queen Elizabeth I",
      bio: "Queen of England and Ireland, presided over the English Renaissance and defeat of the Spanish Armada.",
      birthYear: 1533,
      deathYear: 1603,
      location: "England",
      period: "1500s",
      imageUrl: "/api/placeholder-speaker/elizabeth"
    },
    {
      name: "Franklin D. Roosevelt",
      bio: "32nd President of the United States, led America through the Great Depression and World War II.",
      birthYear: 1882,
      deathYear: 1945,
      location: "United States",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/fdr"
    },
    {
      name: "John F. Kennedy",
      bio: "35th President of the United States, inspired a generation with his vision of public service and space exploration.",
      birthYear: 1917,
      deathYear: 1963,
      location: "United States",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/jfk"
    }
  ]).returning();

  const categoryData = await db.insert(categories).values([
    { name: "Freedom & Rights", description: "Speeches on liberty and human rights", icon: "Sparkles" },
    { name: "War & Peace", description: "Addresses during times of conflict", icon: "Shield" },
    { name: "Leadership", description: "Inspiring leadership messages", icon: "Crown" },
    { name: "Social Justice", description: "Calls for equality and justice", icon: "Scale" },
    { name: "Politics", description: "Political discourse and debate", icon: "Landmark" }
  ]).returning();

  await db.insert(speeches).values([
    {
      title: "Gettysburg Address",
      speakerId: speakerData[0].id,
      categoryId: categoryData[0].id,
      type: "speech",
      date: "November 19, 1863",
      location: "Gettysburg, Pennsylvania",
      context: "Delivered during the dedication of the Soldiers National Cemetery",
      transcript: "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.",
      audioUrl: "/api/placeholder-audio/gettysburg",
      duration: 180,
      excerpt: "Four score and seven years ago our fathers brought forth on this continent, a new nation...",
      imageUrl: "/api/placeholder-speech/gettysburg"
    },
    {
      title: "We Shall Fight on the Beaches",
      speakerId: speakerData[1].id,
      categoryId: categoryData[1].id,
      type: "speech",
      date: "June 4, 1940",
      location: "House of Commons, London",
      context: "Speech to the House of Commons following the evacuation of Dunkirk during World War II",
      transcript: "We shall go on to the end. We shall fight in France, we shall fight on the seas and oceans, we shall fight with growing confidence and growing strength in the air, we shall defend our island, whatever the cost may be. We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender. And if, which I do not for a moment believe, this island or a large part of it were subjugated and starving, then our Empire beyond the seas, armed and guarded by the British Fleet, would carry on the struggle, until, in God's good time, the New World, with all its power and might, steps forth to the rescue and the liberation of the old.",
      audioUrl: "/api/placeholder-audio/beaches",
      duration: 420,
      excerpt: "We shall go on to the end. We shall fight in France, we shall fight on the seas and oceans...",
      imageUrl: "/api/placeholder-speech/beaches"
    },
    {
      title: "I Have a Dream",
      speakerId: speakerData[2].id,
      categoryId: categoryData[3].id,
      type: "speech",
      date: "August 28, 1963",
      location: "Washington, D.C.",
      context: "Delivered during the March on Washington for Jobs and Freedom",
      transcript: "I have a dream that one day this nation will rise up and live out the true meaning of its creed: We hold these truths to be self-evident, that all men are created equal. I have a dream that one day on the red hills of Georgia, the sons of former slaves and the sons of former slave owners will be able to sit down together at the table of brotherhood. I have a dream that one day even the state of Mississippi, a state sweltering with the heat of injustice, sweltering with the heat of oppression, will be transformed into an oasis of freedom and justice. I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. I have a dream today.",
      audioUrl: "/api/placeholder-audio/dream",
      duration: 1020,
      excerpt: "I have a dream that one day this nation will rise up and live out the true meaning of its creed...",
      imageUrl: "/api/placeholder-speech/dream"
    },
    {
      title: "Speech to the Troops at Tilbury",
      speakerId: speakerData[3].id,
      categoryId: categoryData[1].id,
      type: "speech",
      date: "August 9, 1588",
      location: "Tilbury, England",
      context: "Delivered to English troops preparing to repel the Spanish Armada",
      transcript: "My loving people, we have been persuaded by some that are careful of our safety, to take heed how we commit ourselves to armed multitudes, for fear of treachery; but I assure you I do not desire to live to distrust my faithful and loving people. Let tyrants fear. I have always so behaved myself that, under God, I have placed my chiefest strength and safeguard in the loyal hearts and good-will of my subjects; and therefore I am come amongst you, as you see, at this time, not for my recreation and disport, but being resolved, in the midst and heat of the battle, to live and die amongst you all; to lay down for my God, and for my kingdom, and my people, my honour and my blood, even in the dust. I know I have the body of a weak, feeble woman; but I have the heart and stomach of a king, and of a king of England too, and think foul scorn that Parma or Spain, or any prince of Europe, should dare to invade the borders of my realm; to which rather than any dishonour shall grow by me, I myself will take up arms, I myself will be your general, judge, and rewarder of every one of your virtues in the field.",
      audioUrl: "/api/placeholder-audio/tilbury",
      duration: 240,
      excerpt: "I know I have the body of a weak, feeble woman; but I have the heart and stomach of a king...",
      imageUrl: "/api/placeholder-speech/tilbury"
    },
    {
      title: "Ask Not What Your Country Can Do For You",
      speakerId: speakerData[5].id,
      categoryId: categoryData[2].id,
      type: "speech",
      date: "January 20, 1961",
      location: "Washington, D.C.",
      context: "Presidential inauguration address calling for civic duty and public service",
      transcript: "And so, my fellow Americans: ask not what your country can do for you—ask what you can do for your country. My fellow citizens of the world: ask not what America will do for you, but what together we can do for the freedom of man. Finally, whether you are citizens of America or citizens of the world, ask of us the same high standards of strength and sacrifice which we ask of you. With a good conscience our only sure reward, with history the final judge of our deeds, let us go forth to lead the land we love, asking His blessing and His help, but knowing that here on earth God's work must truly be our own.",
      audioUrl: "/api/placeholder-audio/jfk-inaugural",
      duration: 840,
      excerpt: "And so, my fellow Americans: ask not what your country can do for you—ask what you can do for your country...",
      imageUrl: "/api/placeholder-speech/jfk-inaugural"
    }
  ]);

  console.log("Database seeded successfully!");
}
