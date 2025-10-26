import { 
  type User, 
  type UpsertUser,
  type Speaker,
  type InsertSpeaker,
  type Category,
  type InsertCategory,
  type Speech,
  type InsertSpeech,
  type SpeechWithDetails,
  type Subscription,
  type InsertSubscription,
  type UserPurchase,
  type InsertUserPurchase
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, user: Partial<UpsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  
  // Speakers
  getSpeakers(): Promise<Speaker[]>;
  getSpeaker(id: string): Promise<Speaker | undefined>;
  createSpeaker(speaker: InsertSpeaker): Promise<Speaker>;
  updateSpeaker(id: string, speaker: Partial<InsertSpeaker>): Promise<Speaker | undefined>;
  deleteSpeaker(id: string): Promise<boolean>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;
  
  // Speeches
  getSpeeches(filters?: {
    categoryId?: string;
    speakerId?: string;
    type?: string;
    search?: string;
  }): Promise<SpeechWithDetails[]>;
  getSpeech(id: string): Promise<SpeechWithDetails | undefined>;
  createSpeech(speech: InsertSpeech): Promise<Speech>;
  updateSpeech(id: string, speech: Partial<InsertSpeech>): Promise<Speech | undefined>;
  deleteSpeech(id: string): Promise<boolean>;
  
  // Subscriptions
  getSubscriptions(): Promise<Subscription[]>;
  getSubscription(id: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  deleteSubscription(id: string): Promise<boolean>;
  
  // User Purchases
  getUserPurchases(userId: string): Promise<UserPurchase[]>;
  getUserPurchaseForSpeech(userId: string, speechId: string): Promise<UserPurchase | undefined>;
  createUserPurchase(purchase: InsertUserPurchase): Promise<UserPurchase>;
  userHasAccessToSpeech(userId: string, speechId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private speakers: Map<string, Speaker>;
  private categories: Map<string, Category>;
  private speeches: Map<string, Speech>;
  private subscriptions: Map<string, Subscription>;
  private userPurchases: Map<string, UserPurchase>;

  constructor() {
    this.users = new Map();
    this.speakers = new Map();
    this.categories = new Map();
    this.speeches = new Map();
    this.subscriptions = new Map();
    this.userPurchases = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize sample speakers
    const speakers: Speaker[] = [
      {
        id: randomUUID(),
        name: "Abraham Lincoln",
        bio: "16th President of the United States, led the nation through the Civil War and worked to end slavery.",
        birthYear: 1809,
        deathYear: 1865,
        location: "United States",
        period: "1800s",
        imageUrl: "/api/placeholder-speaker/lincoln"
      },
      {
        id: randomUUID(),
        name: "Winston Churchill",
        bio: "British Prime Minister during World War II, renowned orator and Nobel Prize winner in Literature.",
        birthYear: 1874,
        deathYear: 1965,
        location: "United Kingdom",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/churchill"
      },
      {
        id: randomUUID(),
        name: "Martin Luther King Jr.",
        bio: "American civil rights leader and activist, advocate for nonviolent resistance and equality.",
        birthYear: 1929,
        deathYear: 1968,
        location: "United States",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/king"
      },
      {
        id: randomUUID(),
        name: "Queen Elizabeth I",
        bio: "Queen of England and Ireland, presided over the English Renaissance and defeat of the Spanish Armada.",
        birthYear: 1533,
        deathYear: 1603,
        location: "England",
        period: "1500s",
        imageUrl: "/api/placeholder-speaker/elizabeth"
      },
      {
        id: randomUUID(),
        name: "Mahatma Gandhi",
        bio: "Leader of Indian independence movement, pioneer of nonviolent civil disobedience.",
        birthYear: 1869,
        deathYear: 1948,
        location: "India",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/gandhi"
      },
      {
        id: randomUUID(),
        name: "Nelson Mandela",
        bio: "South African anti-apartheid revolutionary and first Black president of South Africa, Nobel Peace Prize laureate.",
        birthYear: 1918,
        deathYear: 2013,
        location: "South Africa",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/mandela"
      },
      {
        id: randomUUID(),
        name: "Adolf Hitler",
        bio: "German dictator and leader of Nazi Germany, central figure of World War II and the Holocaust.",
        birthYear: 1889,
        deathYear: 1945,
        location: "Germany",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/hitler"
      },
      {
        id: randomUUID(),
        name: "Alan Watts",
        bio: "British philosopher and writer, popularizer of Eastern philosophy for Western audiences.",
        birthYear: 1915,
        deathYear: 1973,
        location: "United Kingdom",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/watts"
      },
      {
        id: randomUUID(),
        name: "Franklin D. Roosevelt",
        bio: "32nd President of the United States, led America through the Great Depression and World War II.",
        birthYear: 1882,
        deathYear: 1945,
        location: "United States",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/fdr"
      },
      {
        id: randomUUID(),
        name: "John F. Kennedy",
        bio: "35th President of the United States, inspired a generation with his vision of public service and space exploration.",
        birthYear: 1917,
        deathYear: 1963,
        location: "United States",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/jfk"
      },
      {
        id: randomUUID(),
        name: "Napoleon Bonaparte",
        bio: "French military leader and emperor, one of history's greatest military commanders.",
        birthYear: 1769,
        deathYear: 1821,
        location: "France",
        period: "1700s-1800s",
        imageUrl: "/api/placeholder-speaker/napoleon"
      },
      {
        id: randomUUID(),
        name: "Malcolm X",
        bio: "American Muslim minister and human rights activist, influential figure in the civil rights movement.",
        birthYear: 1925,
        deathYear: 1965,
        location: "United States",
        period: "1900s",
        imageUrl: "/api/placeholder-speaker/malcolmx"
      }
    ];
    
    speakers.forEach(s => this.speakers.set(s.id, s));

    // Initialize categories
    const categories: Category[] = [
      { id: randomUUID(), name: "Freedom & Rights", description: "Speeches on liberty and human rights", icon: "Sparkles" },
      { id: randomUUID(), name: "War & Peace", description: "Addresses during times of conflict", icon: "Shield" },
      { id: randomUUID(), name: "Leadership", description: "Inspiring leadership messages", icon: "Crown" },
      { id: randomUUID(), name: "Social Justice", description: "Calls for equality and justice", icon: "Scale" },
      { id: randomUUID(), name: "Politics", description: "Political discourse and debate", icon: "Landmark" }
    ];
    
    categories.forEach(c => this.categories.set(c.id, c));

    // Initialize speeches with references to speakers and categories
    const speakersList = Array.from(this.speakers.values());
    const categoriesList = Array.from(this.categories.values());

    const speeches: Speech[] = [
      {
        id: randomUUID(),
        title: "Gettysburg Address",
        speakerId: speakersList[0].id,
        categoryId: categoriesList[0].id,
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
        id: randomUUID(),
        title: "We Shall Fight on the Beaches",
        speakerId: speakersList[1].id,
        categoryId: categoriesList[1].id,
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
        id: randomUUID(),
        title: "I Have a Dream",
        speakerId: speakersList[2].id,
        categoryId: categoriesList[3].id,
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
        id: randomUUID(),
        title: "Speech to the Troops at Tilbury",
        speakerId: speakersList[3].id,
        categoryId: categoriesList[2].id,
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
        id: randomUUID(),
        title: "Quit India Speech",
        speakerId: speakersList[4].id,
        categoryId: categoriesList[0].id,
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
        id: randomUUID(),
        title: "Inauguration Address",
        speakerId: speakersList[5].id,
        categoryId: categoriesList[0].id,
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
        id: randomUUID(),
        title: "Reichstag Speech",
        speakerId: speakersList[6].id,
        categoryId: categoriesList[4].id,
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
        id: randomUUID(),
        title: "The Nature of Consciousness",
        speakerId: speakersList[7].id,
        categoryId: categoriesList[2].id,
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
        id: randomUUID(),
        title: "First Fireside Chat",
        speakerId: speakersList[8].id,
        categoryId: categoriesList[2].id,
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
        id: randomUUID(),
        title: "Ask Not What Your Country Can Do For You",
        speakerId: speakersList[9].id,
        categoryId: categoriesList[2].id,
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
        id: randomUUID(),
        title: "Farewell to the Old Guard",
        speakerId: speakersList[10].id,
        categoryId: categoriesList[2].id,
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
        id: randomUUID(),
        title: "The Ballot or the Bullet",
        speakerId: speakersList[11].id,
        categoryId: categoriesList[3].id,
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
    ];
    
    speeches.forEach(s => this.speeches.set(s.id, s));

    // Initialize subscription plans
    const subscriptions: Subscription[] = [
      {
        id: randomUUID(),
        name: "Monthly Access",
        type: "monthly",
        price: 999,
        features: ["Unlimited access to all speeches", "Audio playback", "Full transcripts", "Multi-language support"],
        isPopular: false
      },
      {
        id: randomUUID(),
        name: "Annual Access",
        type: "annual",
        price: 9999,
        features: ["Unlimited access to all speeches", "Audio playback", "Full transcripts", "Multi-language support", "Offline downloads", "Priority support"],
        isPopular: true
      },
      {
        id: randomUUID(),
        name: "Per Speech",
        type: "per-speech",
        price: 299,
        features: ["Single speech purchase", "Lifetime access", "Audio playback", "Full transcript"],
        isPopular: false
      }
    ];
    
    subscriptions.forEach(s => this.subscriptions.set(s.id, s));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async upsertUser(insertUser: UpsertUser): Promise<User> {
    const id = insertUser.id || randomUUID();
    const existing = this.users.get(id);
    
    const user: User = existing ? {
      ...existing,
      ...insertUser,
      id,
      updatedAt: new Date(),
    } : { 
      language: 'en', 
      subscriptionType: null,
      subscriptionExpiry: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...insertUser,
      id,
    };
    
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: string, updates: Partial<UpsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updated: User = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updated);
    return updated;
  }
  
  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // Speaker methods
  async getSpeakers(): Promise<Speaker[]> {
    return Array.from(this.speakers.values());
  }

  async getSpeaker(id: string): Promise<Speaker | undefined> {
    return this.speakers.get(id);
  }

  async createSpeaker(insertSpeaker: InsertSpeaker): Promise<Speaker> {
    const id = randomUUID();
    const speaker: Speaker = { ...insertSpeaker, id };
    this.speakers.set(id, speaker);
    return speaker;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Speech methods
  async getSpeeches(filters?: {
    categoryId?: string;
    speakerId?: string;
    type?: string;
    search?: string;
  }): Promise<SpeechWithDetails[]> {
    let speeches = Array.from(this.speeches.values());

    if (filters?.categoryId) {
      speeches = speeches.filter(s => s.categoryId === filters.categoryId);
    }
    if (filters?.speakerId) {
      speeches = speeches.filter(s => s.speakerId === filters.speakerId);
    }
    if (filters?.type) {
      speeches = speeches.filter(s => s.type === filters.type);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      speeches = speeches.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.excerpt.toLowerCase().includes(searchLower) ||
        s.context.toLowerCase().includes(searchLower)
      );
    }

    return speeches.map(speech => {
      const speaker = this.speakers.get(speech.speakerId)!;
      const category = this.categories.get(speech.categoryId)!;
      return { ...speech, speaker, category };
    });
  }

  async getSpeech(id: string): Promise<SpeechWithDetails | undefined> {
    const speech = this.speeches.get(id);
    if (!speech) return undefined;

    const speaker = this.speakers.get(speech.speakerId)!;
    const category = this.categories.get(speech.categoryId)!;
    return { ...speech, speaker, category };
  }

  async createSpeech(insertSpeech: InsertSpeech): Promise<Speech> {
    const id = randomUUID();
    const speech: Speech = { ...insertSpeech, id };
    this.speeches.set(id, speech);
    return speech;
  }

  // Subscription methods
  async getSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values());
  }

  async getSubscription(id: string): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = randomUUID();
    const subscription: Subscription = { ...insertSubscription, id };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async updateSubscription(id: string, updates: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const subscription = this.subscriptions.get(id);
    if (!subscription) return undefined;

    const updated: Subscription = { ...subscription, ...updates };
    this.subscriptions.set(id, updated);
    return updated;
  }

  async deleteSubscription(id: string): Promise<boolean> {
    return this.subscriptions.delete(id);
  }

  // User Purchases
  async getUserPurchases(userId: string): Promise<UserPurchase[]> {
    return Array.from(this.userPurchases.values()).filter(p => p.userId === userId);
  }

  async getUserPurchaseForSpeech(userId: string, speechId: string): Promise<UserPurchase | undefined> {
    return Array.from(this.userPurchases.values()).find(
      p => p.userId === userId && p.speechId === speechId
    );
  }

  async createUserPurchase(purchase: InsertUserPurchase): Promise<UserPurchase> {
    const id = randomUUID();
    const newPurchase: UserPurchase = { 
      ...purchase, 
      id,
      purchasedAt: new Date()
    };
    this.userPurchases.set(id, newPurchase);
    return newPurchase;
  }

  async userHasAccessToSpeech(userId: string, speechId: string): Promise<boolean> {
    const user = this.users.get(userId);
    if (user?.subscriptionType && user?.subscriptionExpiry && user.subscriptionExpiry > new Date()) {
      return true;
    }
    const purchase = await this.getUserPurchaseForSpeech(userId, speechId);
    return !!purchase;
  }

  // Speaker update/delete methods
  async updateSpeaker(id: string, updates: Partial<InsertSpeaker>): Promise<Speaker | undefined> {
    const speaker = this.speakers.get(id);
    if (!speaker) return undefined;

    const updated: Speaker = { ...speaker, ...updates };
    this.speakers.set(id, updated);
    return updated;
  }

  async deleteSpeaker(id: string): Promise<boolean> {
    return this.speakers.delete(id);
  }

  // Category update/delete methods
  async updateCategory(id: string, updates: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;

    const updated: Category = { ...category, ...updates };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Speech update/delete methods
  async updateSpeech(id: string, updates: Partial<InsertSpeech>): Promise<Speech | undefined> {
    const speech = this.speeches.get(id);
    if (!speech) return undefined;

    const updated: Speech = { ...speech, ...updates };
    this.speeches.set(id, updated);
    return updated;
  }

  async deleteSpeech(id: string): Promise<boolean> {
    return this.speeches.delete(id);
  }
}

export const storage = new MemStorage();
