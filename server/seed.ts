import { db } from "./db";
import { speakers, categories, speeches, subscriptions } from "@shared/schema";

export async function seedDatabase() {
  console.log("Seeding database...");

  // Check if data already exists
  const existingSpeakers = await db.select().from(speakers).limit(1);
  if (existingSpeakers.length > 0) {
    console.log("Database already seeded");
    return;
  }

  // Insert speakers
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
      name: "Mahatma Gandhi",
      bio: "Leader of Indian independence movement, pioneer of nonviolent civil disobedience.",
      birthYear: 1869,
      deathYear: 1948,
      location: "India",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/gandhi"
    },
    {
      name: "Nelson Mandela",
      bio: "South African anti-apartheid revolutionary and first Black president of South Africa, Nobel Peace Prize laureate.",
      birthYear: 1918,
      deathYear: 2013,
      location: "South Africa",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/mandela"
    },
    {
      name: "Adolf Hitler",
      bio: "German dictator and leader of Nazi Germany, central figure of World War II and the Holocaust.",
      birthYear: 1889,
      deathYear: 1945,
      location: "Germany",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/hitler"
    },
    {
      name: "Alan Watts",
      bio: "British philosopher and writer, popularizer of Eastern philosophy for Western audiences.",
      birthYear: 1915,
      deathYear: 1973,
      location: "United Kingdom",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/watts"
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
    },
    {
      name: "Napoleon Bonaparte",
      bio: "French military leader and emperor, one of history's greatest military commanders.",
      birthYear: 1769,
      deathYear: 1821,
      location: "France",
      period: "1700s-1800s",
      imageUrl: "/api/placeholder-speaker/napoleon"
    },
    {
      name: "Malcolm X",
      bio: "American Muslim minister and human rights activist, influential figure in the civil rights movement.",
      birthYear: 1925,
      deathYear: 1965,
      location: "United States",
      period: "1900s",
      imageUrl: "/api/placeholder-speaker/malcolmx"
    }
  ]).returning();

  // Insert categories
  const categoryData = await db.insert(categories).values([
    { name: "Freedom & Rights", description: "Speeches on liberty and human rights", icon: "Sparkles" },
    { name: "War & Peace", description: "Addresses during times of conflict", icon: "Shield" },
    { name: "Leadership", description: "Inspiring leadership messages", icon: "Crown" },
    { name: "Social Justice", description: "Calls for equality and justice", icon: "Scale" },
    { name: "Politics", description: "Political discourse and debate", icon: "Landmark" }
  ]).returning();

  // Insert speeches
  await db.insert(speeches).values([
    {
      title: "Gettysburg Address",
      speakerId: speakerData[0].id,
      categoryId: categoryData[0].id,
      type: "speech",
      date: "November 19, 1863",
      location: "Gettysburg, Pennsylvania",
      context: "Delivered during the American Civil War at the dedication of the Soldiers' National Cemetery",
      transcript: "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal...",
      audioUrl: "/api/placeholder-audio/gettysburg",
      duration: 180,
      excerpt: "Four score and seven years ago our fathers brought forth on this continent, a new nation...",
      imageUrl: "/api/placeholder-speech/gettysburg",
      isPremium: false,
      price: null
    },
    {
      title: "We Shall Fight on the Beaches",
      speakerId: speakerData[1].id,
      categoryId: categoryData[1].id,
      type: "speech",
      date: "June 4, 1940",
      location: "House of Commons, London",
      context: "Speech to the House of Commons following the evacuation of Dunkirk during World War II",
      transcript: "We shall go on to the end. We shall fight in France, we shall fight on the seas and oceans...",
      audioUrl: "/api/placeholder-audio/beaches",
      duration: 420,
      excerpt: "We shall go on to the end. We shall fight in France, we shall fight on the seas...",
      imageUrl: "/api/placeholder-speech/beaches",
      isPremium: true,
      price: 299
    },
    {
      title: "I Have a Dream",
      speakerId: speakerData[2].id,
      categoryId: categoryData[3].id,
      type: "speech",
      date: "August 28, 1963",
      location: "Washington, D.C.",
      context: "Delivered during the March on Washington for Jobs and Freedom",
      transcript: "I have a dream that one day this nation will rise up and live out the true meaning of its creed...",
      audioUrl: "/api/placeholder-audio/dream",
      duration: 1020,
      excerpt: "I have a dream that one day this nation will rise up and live out the true meaning...",
      imageUrl: "/api/placeholder-speech/dream",
      isPremium: false,
      price: null
    },
    {
      title: "Speech to the Troops at Tilbury",
      speakerId: speakerData[3].id,
      categoryId: categoryData[2].id,
      type: "speech",
      date: "August 9, 1588",
      location: "Tilbury, England",
      context: "Delivered to English troops preparing to repel the Spanish Armada",
      transcript: "I know I have the body of a weak, feeble woman; but I have the heart and stomach of a king...",
      audioUrl: "/api/placeholder-audio/tilbury",
      duration: 240,
      excerpt: "I know I have the body of a weak, feeble woman; but I have the heart and stomach...",
      imageUrl: "/api/placeholder-speech/tilbury",
      isPremium: true,
      price: 199
    },
    {
      title: "Quit India Speech",
      speakerId: speakerData[4].id,
      categoryId: categoryData[0].id,
      type: "speech",
      date: "August 8, 1942",
      location: "Mumbai, India",
      context: "Call for immediate independence from British rule",
      transcript: "Here is a mantra, a short one, that I give you. You may imprint it on your hearts and let every breath of yours give expression to it...",
      audioUrl: "/api/placeholder-audio/quit-india",
      duration: 360,
      excerpt: "Here is a mantra, a short one, that I give you. You may imprint it on your hearts...",
      imageUrl: "/api/placeholder-speech/quit-india",
      isPremium: true,
      price: 249
    },
    {
      title: "Inauguration Address",
      speakerId: speakerData[5].id,
      categoryId: categoryData[0].id,
      type: "speech",
      date: "May 10, 1994",
      location: "Pretoria, South Africa",
      context: "Delivered at his inauguration as the first democratically elected President of South Africa",
      transcript: "We understand it still that there is no easy road to freedom. We know it well that none of us acting alone can achieve success. We must therefore act together as a united people...",
      audioUrl: "/api/placeholder-audio/mandela-inauguration",
      duration: 720,
      excerpt: "We understand it still that there is no easy road to freedom. We know it well that none of us acting alone can achieve success...",
      imageUrl: "/api/placeholder-speech/mandela-inauguration",
      isPremium: false,
      price: null
    },
    {
      title: "Reichstag Speech",
      speakerId: speakerData[6].id,
      categoryId: categoryData[4].id,
      type: "speech",
      date: "January 30, 1939",
      location: "Berlin, Germany",
      context: "Address to the German Reichstag marking the anniversary of his rise to power",
      transcript: "Today I will once more be a prophet: if the international Jewish financiers in and outside Europe should succeed in plunging the nations once more into a world war...",
      audioUrl: "/api/placeholder-audio/reichstag",
      duration: 540,
      excerpt: "Today I will once more be a prophet: if the international Jewish financiers in and outside Europe should succeed...",
      imageUrl: "/api/placeholder-speech/reichstag",
      isPremium: true,
      price: 199
    },
    {
      title: "The Nature of Consciousness",
      speakerId: speakerData[7].id,
      categoryId: categoryData[2].id,
      type: "speech",
      date: "1960s",
      location: "California, United States",
      context: "Philosophical lecture on the fundamental nature of human consciousness and existence",
      transcript: "We do not 'come into' this world; we come out of it, as leaves from a tree. As the ocean 'waves,' the universe 'peoples.' Every individual is an expression of the whole realm of nature...",
      audioUrl: "/api/placeholder-audio/watts-consciousness",
      duration: 1800,
      excerpt: "We do not 'come into' this world; we come out of it, as leaves from a tree...",
      imageUrl: "/api/placeholder-speech/watts-consciousness",
      isPremium: true,
      price: 349
    },
    {
      title: "First Fireside Chat",
      speakerId: speakerData[8].id,
      categoryId: categoryData[2].id,
      type: "speech",
      date: "March 12, 1933",
      location: "Washington, D.C.",
      context: "First of FDR's famous radio addresses to the American people during the Great Depression",
      transcript: "I want to talk for a few minutes with the people of the United States about banking... First of all, let me state the simple fact that when you deposit money in a bank, the bank does not put the money into a safe deposit vault...",
      audioUrl: "/api/placeholder-audio/fdr-fireside",
      duration: 840,
      excerpt: "I want to talk for a few minutes with the people of the United States about banking...",
      imageUrl: "/api/placeholder-speech/fdr-fireside",
      isPremium: false,
      price: null
    },
    {
      title: "Ask Not What Your Country Can Do For You",
      speakerId: speakerData[9].id,
      categoryId: categoryData[2].id,
      type: "speech",
      date: "January 20, 1961",
      location: "Washington, D.C.",
      context: "Presidential inauguration address calling for civic duty and public service",
      transcript: "And so, my fellow Americans: ask not what your country can do for you—ask what you can do for your country. My fellow citizens of the world: ask not what America will do for you, but what together we can do for the freedom of man...",
      audioUrl: "/api/placeholder-audio/jfk-inaugural",
      duration: 840,
      excerpt: "And so, my fellow Americans: ask not what your country can do for you—ask what you can do for your country...",
      imageUrl: "/api/placeholder-speech/jfk-inaugural",
      isPremium: false,
      price: null
    },
    {
      title: "Farewell to the Old Guard",
      speakerId: speakerData[10].id,
      categoryId: categoryData[2].id,
      type: "speech",
      date: "April 20, 1814",
      location: "Fontainebleau, France",
      context: "Napoleon's emotional farewell to his Imperial Guard before his first exile",
      transcript: "Soldiers of my Old Guard: I bid you farewell. For twenty years I have constantly accompanied you on the road to honor and glory...",
      audioUrl: "/api/placeholder-audio/napoleon-farewell",
      duration: 300,
      excerpt: "Soldiers of my Old Guard: I bid you farewell. For twenty years I have constantly accompanied you...",
      imageUrl: "/api/placeholder-speech/napoleon-farewell",
      isPremium: true,
      price: 249
    },
    {
      title: "The Ballot or the Bullet",
      speakerId: speakerData[11].id,
      categoryId: categoryData[3].id,
      type: "speech",
      date: "April 3, 1964",
      location: "Cleveland, Ohio",
      context: "Speech advocating for Black nationalism and self-defense",
      transcript: "It's time for us to submerge our differences and realize that it is best for us to first see that we have the same problem, a common problem...",
      audioUrl: "/api/placeholder-audio/malcolm-ballot",
      duration: 3600,
      excerpt: "It's time for us to submerge our differences and realize that it is best for us to first see that we have the same problem...",
      imageUrl: "/api/placeholder-speech/malcolm-ballot",
      isPremium: false,
      price: null
    }
  ]);

  // Insert subscriptions
  await db.insert(subscriptions).values([
    {
      name: "Monthly Access",
      type: "monthly",
      price: 999,
      features: ["Unlimited access to all speeches", "Audio playback", "Full transcripts", "Multi-language support"],
      isPopular: false
    },
    {
      name: "Annual Access",
      type: "annual",
      price: 9999,
      features: ["Unlimited access to all speeches", "Audio playback", "Full transcripts", "Multi-language support", "Offline downloads", "Priority support"],
      isPopular: true
    },
    {
      name: "Per-Speech Purchase",
      type: "per-speech",
      price: 299,
      features: ["Single speech access", "Audio playback", "Full transcript", "Lifetime access"],
      isPopular: false
    }
  ]);

  console.log("Database seeded successfully!");
}
