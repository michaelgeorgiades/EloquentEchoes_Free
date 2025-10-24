# Historical Speeches & Letters Platform

## Overview

A premium educational platform for exploring historical speeches and letters, inspired by MasterClass and Audible. The application provides access to transcripts, audio playback, biographical context, and rich historical metadata with a sophisticated, academically-grounded user experience. Features include multilingual support, subscription-based access with PayPal integration, and a classical design aesthetic emphasizing readability and historical gravitas.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight alternative to React Router. Routes include home, browse, speech detail, speaker profile, and subscription pages.

**State Management**: TanStack Query (React Query) for server state management, data fetching, and caching. No global client state management library is used; component state is managed locally with React hooks.

**UI Component Library**: Shadcn UI components based on Radix UI primitives, providing accessible, customizable components. The "new-york" style variant is configured with Tailwind CSS for styling.

**Design System**: 
- Custom color palette with historical theme (browns, golds, beiges)
- Typography system using Playfair Display (headers), Crimson Text (body), and Source Sans Pro (UI elements)
- Responsive layouts with max-width containers (max-w-7xl, max-w-6xl, max-w-4xl)
- Tailwind CSS with custom theming via CSS variables for light/dark mode support

**Key Patterns**:
- Component composition with Radix UI primitives
- Custom hooks for mobile detection and toast notifications
- Path aliases (@/, @shared/, @assets/) for clean imports

### Backend Architecture

**Runtime**: Node.js with Express.js framework, written in TypeScript and compiled with esbuild for production.

**API Structure**: RESTful API with route handlers for:
- Speakers CRUD operations
- Categories management
- Speeches with filtering capabilities (by category, speaker, type, search)
- PayPal payment integration endpoints
- Subscription management

**Middleware**: 
- Express JSON body parser with raw body capture for PayPal webhook verification
- Request logging middleware with duration tracking
- Vite development server integration in development mode

**Development vs Production**: Uses conditional Vite middleware setup for hot module replacement in development, serves static files in production.

### Data Storage

**ORM**: Drizzle ORM for type-safe database operations with PostgreSQL dialect configuration.

**Database**: PostgreSQL (configured for Neon serverless database via `@neondatabase/serverless`).

**Schema Design**:
- **Speakers**: Historical figures with biographical data (name, bio, birth/death years, period, location, image)
- **Categories**: Topic categorization (e.g., "Wartime Addresses", "Civil Rights")
- **Speeches**: Main content table with foreign keys to speakers and categories, includes type (speech/letter), transcript, audio URL, premium status, and pricing
- **Users**: User authentication and profile data
- **Subscriptions**: Subscription plans and user subscription tracking

**Migration Strategy**: Drizzle Kit for schema migrations with output to `/migrations` directory.

**Storage Pattern**: Abstraction layer defined in `server/storage.ts` providing an `IStorage` interface for database operations, enabling potential future backend swapping.

### Authentication & Authorization

User authentication system with session-based approach (indicated by user CRUD operations and subscription tracking). Premium content access controlled via `isPremium` flag on speeches and user subscription status.

### External Dependencies

**Payment Processing**: 
- PayPal Server SDK for subscription and one-time payment processing
- Critical PayPal integration code marked immutable (must not be modified)
- Environment-based configuration (sandbox vs production)
- Endpoints: `/paypal/setup`, `/paypal/order`, `/paypal/order/:orderID/capture` with shortened aliases

**Third-Party Services**:
- Neon serverless PostgreSQL database
- Google Fonts (Playfair Display, Crimson Text, Source Sans Pro)
- Audio hosting for speech playback (URLs stored in database)
- Image hosting for speaker portraits and speech imagery

**Font Loading**: Preconnected to Google Fonts with specific font families loaded via CDN.

**Asset Management**: Static image assets stored in `attached_assets/generated_images/` directory with speaker portraits and hero images.

**Development Tools**:
- Replit-specific Vite plugins (runtime error overlay, cartographer, dev banner)
- TypeScript strict mode for type safety
- ESLint/Prettier configurations (implicit)

**Key Design Decisions**:

1. **Monorepo Structure**: Shared schema types between client and server via `shared/` directory for type safety across the stack.

2. **Premium Content Model**: Hybrid monetization with both subscription-based access and per-speech purchasing options.

3. **Immutable PayPal Integration**: Critical payment processing code protected against modifications to prevent integration failures.

4. **Responsive Design First**: Mobile-responsive layouts with breakpoint-aware components and mobile menu implementation.

5. **SEO & Accessibility**: Semantic HTML, ARIA labels, and meta descriptions for content discoverability.

6. **Type Safety**: End-to-end TypeScript with Zod schema validation for runtime type checking on database operations.