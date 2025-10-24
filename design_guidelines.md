# Design Guidelines: Historical Speeches & Letters Platform

## Design Approach
**Reference-Based Approach**: Drawing inspiration from MasterClass and Audible's premium educational content delivery and subscription interfaces, creating a sophisticated, academically-grounded experience that emphasizes historical gravitas and premium content presentation.

## Core Design Principles
- Classical academic elegance with historical gravitas
- Premium educational content presentation
- Sophisticated subscription interface design
- Rich media storytelling with historical context
- Readability-first approach for long-form content

## Typography System

**Font Families:**
- Headers & Titles: Playfair Display (serif, elegant)
- Body Text & Letters: Crimson Text (serif, readable)
- UI Elements & Labels: Source Sans Pro (sans-serif, clean)

**Hierarchy:**
- Hero Titles: text-5xl to text-7xl (Playfair Display, font-bold)
- Section Headers: text-3xl to text-4xl (Playfair Display, font-semibold)
- Speech/Letter Titles: text-2xl to text-3xl (Playfair Display)
- Body Content: text-lg (Crimson Text, leading-relaxed)
- UI Text: text-base to text-sm (Source Sans Pro)
- Metadata: text-sm (Source Sans Pro, italic)

## Color Palette (User-Specified)
- Primary: #8B4513 (rich brown) - navigation, primary CTAs
- Secondary: #DAA520 (golden rod) - highlights, featured content
- Background: #F5F5DC (beige) - main background
- Text: #2F4F4F (dark slate grey) - body text
- Accent: #CD853F (peru) - borders, decorative elements
- Premium: #FFD700 (gold) - premium badges, subscription highlights

## Layout System
**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (p-4, h-8, gap-12, etc.)

**Container Strategy:**
- Hero sections: Full-width with max-w-7xl inner container
- Content sections: max-w-6xl
- Speech/letter transcripts: max-w-4xl (optimal reading width)
- Speaker profiles: max-w-5xl

## Component Library

### Navigation
- Sticky header with logo, main navigation, language selector, subscription badge
- Premium indicator for subscribed users
- Search bar prominently featured in header
- Mobile: hamburger menu with slide-in drawer

### Hero Section
- **Large hero image**: Historical photograph or period-appropriate imagery (grainy/sepia-toned preferred)
- Overlay with semi-transparent dark gradient for text readability
- Centered headline with tagline
- Primary CTA buttons with blurred background treatment
- Subscription status indicator

### Content Cards (Speeches/Letters)
- Rich media cards with speaker portrait or historical imagery
- Card structure: Image → Title → Speaker/Date → Excerpt → Duration/Length badge
- Premium lock icon for non-subscribers
- Hover state: subtle elevation increase
- Grid: 1 column mobile, 2 columns tablet, 3 columns desktop

### Timeline Navigation
- Horizontal scrollable timeline with era markers (1700s, 1800s, 1900s, 2000s)
- Visual indicators for content density
- Interactive: click era to filter content
- Sticky positioning below header when scrolling

### Audio Player
- Fixed bottom player when speech is playing
- Waveform visualization
- Playback controls, speed adjustment, 15s skip buttons
- Synchronized transcript highlighting as audio plays
- Bookmark/favorite functionality

### Speaker Profiles
- Two-column layout: Portrait + biographical sidebar | Main content
- Portrait: Large historical photograph in ornate frame styling
- Bio section: Time period badge, location, historical context
- Collection of their speeches/letters below
- Timeline of their life events

### Subscription Tiers
- Three-column comparison table (Monthly, Annual, Per-Speech)
- Feature checkmarks with premium gold accent
- Most popular badge on Annual tier
- PayPal button integration for each tier
- Testimonials from educators/historians below pricing

### Search & Filter Interface
- Prominent search bar with autocomplete
- Filter sidebar: Era, Topic, Speaker, Language, Duration
- Applied filters displayed as removable chips
- Results count and sort options

## Images Strategy

**Hero Section:**
- Large, immersive historical photograph (vintage paper texture, old photographs, historical artifacts)
- Dimensions: Full viewport width, 70vh height

**Content Cards:**
- Speaker portraits (square, 300x300px minimum)
- Historical document imagery for letters

**Speaker Profiles:**
- High-quality portrait (400x600px minimum)
- Historical context images (locations, events)

**Background Textures:**
- Subtle paper texture overlay on beige background
- Aged parchment styling for letter displays

## Responsive Breakpoints
- Mobile: Single column, stacked navigation, simplified timeline
- Tablet (768px): Two-column grids, condensed navigation
- Desktop (1024px): Full multi-column layouts, expanded features
- Large (1280px+): Maximum content width, enhanced spacing

## Accessibility
- WCAG AA contrast ratios maintained throughout
- Keyboard navigation for audio player and all interactive elements
- ARIA labels for timeline, audio controls, and subscription features
- Screen reader-friendly transcript displays
- Focus indicators consistent with accent color

## Key Page Layouts

**Homepage:** Hero → Featured Speeches Carousel → Categories Grid → Timeline Navigation → Subscription CTA → Recent Additions

**Browse Page:** Filter Sidebar | Content Grid with infinite scroll

**Speech/Letter Detail:** Audio Player (sticky) → Transcript (scrollable, synchronized) → Speaker Info Card → Related Content

**Speaker Profile:** Hero with Portrait → Biography → Timeline of Life → Complete Works Grid

**Subscription Page:** Tier Comparison → Feature Breakdown → PayPal Integration → FAQs → Testimonials