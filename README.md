# Interfy

A modern full-stack application built with Next.js, GraphQL, Prisma, and NextAuth for secure authentication.

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Icon library

### Backend & Database

- **GraphQL** - API query language with Apollo Server
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Relational database
- **NextAuth.js** - Authentication framework

### Development Tools

- **GraphQL Code Generator** - Auto-generate TypeScript types
- **ESLint** - Code linting
- **pnpm** - Fast package manager

## 📁 Project Structure

```
interfy/
├── prisma/                        # Database schema and migrations
│   ├── schema.prisma              # Database schema definition
│   └── migrations/                # Database migration files
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── api/                   # API routes
│   │   │   ├── auth/              # Authentication API endpoints
│   │   │   └── graphql/           # GraphQL API endpoint
│   │   ├── (public)               # User can only visit if not authenticated
│   │   │   ├──(auth)              # Auth route group
│   │   │   │  └── auth/
│   │   │   │      ├── sign-in.tsx # Login page
│   │   │   │      └── sign-up.tsx # Registration page
│   │   │   └── landing.tsx        # Landing page
│   │   ├── (main)                 # User can only visit if authenticated
│   │   |     └── page.tsx         # Home page ..... entire app resides in this route group
│   │   ├── globals.css            # Global styles
│   │   └── layout.tsx             # Root layout
│   │
│   ├── components/                # Reusable UI components
│   │   └── ui/                    # shadcn/ui components
│   ├── frontend/                  # Frontend GraphQL setup
│   │   └── gql/                   # GraphQL queries and generated types
│   ├── graphql/                   # GraphQL server setup
│   │   ├── modules/               # GraphQL modules (resolvers, schemas)
│   │   │   └── user/              # User-related GraphQL operations
│   │   ├── context.ts             # GraphQL context with auth
│   │   └── index.ts               # GraphQL server setup
│   ├── lib/                       # Utility libraries
│   │   ├── auth.ts                # NextAuth configuration
│   │   ├── prisma.ts              # Prisma client setup
│   │   └── utils.ts               # Utility functions
│   └── types/                     # TypeScript type definitions
│       └── generated/             # Auto-generated GraphQL types
├── public/                        # Static assets
├── .env                           # Environment variables
├── components.json                # shadcn/ui configuration
├── codegen.ts                     # GraphQL code generation config
└── package.json                   # Dependencies and scripts
```

## 🛠 Setup Instructions

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database

### 1. Clone and Install

```bash
git clone <repository-url>
cd interfy
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/interfy"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate deploy

# (Optional) View database in Prisma Studio
pnpm prisma studio
```

### 4. Generate GraphQL Types

```bash
# Generate TypeScript types from GraphQL schema
pnpm codegen
pnpm codegen:watch # generate in watch mode
```

### 5. Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your application!

### Key Files for Authentication

- `src/lib/auth.ts` - NextAuth configuration with credentials provider
- `src/app/auth/sign-in.tsx` - Login page
- `src/app/auth/sign-up.tsx` - Registration page
- `src/app/api/auth/register/route.ts` - User registration API

## 🗄 Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(uuid())
  name      String?
  email     String   @unique
  hash      String   // bcrypt hashed password
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 📊 GraphQL API

### Structure

- **Schema**: Defined in `src/graphql/schema.graphql`
- **Resolvers**: Located in `src/graphql/modules/`
- **Context**: Includes Prisma client and user session
- **Code Generation**: Auto-generates TypeScript types

### Example Query

```graphql
query Me {
  me {
    id
    email
    name
  }
}
```

### Key Files

- `src/graphql/index.ts` - Apollo Server setup
- `src/graphql/context.ts` - GraphQL context with auth
- `src/graphql/modules/user/` - User-related operations

## 🎨 UI Components

### shadcn/ui Components

We use shadcn/ui for consistent, accessible components:

### Adding New Components

```bash
npx shadcn@latest add <component-name>
```

## 🔧 Development Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm prisma generate        # Generate Prisma client
pnpm prisma migrate dev     # Generate .sql migration file from changes made in schema
pnpm prisma migrate deploy  # Apply the pending migrations to the database

# Code Generation
pnpm codegen          # Generate GraphQL types

# Linting
pnpm lint             # Run ESLint
```

## 🚀 Deployment

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### Build and Deploy

```bash
pnpm build
pnpm start
```

## 📝 Key Concepts

### 1. **App Router vs Pages Router**

- We use Next.js 15 with App Router
- Pages are defined in `src/app/` directory
- Each folder represents a route
- `page.tsx` is the default page component

### 2. **Server vs Client Components**

- **Server Components** (default): Run on server, no JavaScript sent to client
- **Client Components**: Use `"use client"` directive, run in browser
- Authentication pages are client components because they need interactivity

### 3. **API Routes**

- Located in `src/app/api/`
- Each folder becomes an API endpoint
- `route.ts` files handle HTTP methods (GET, POST, etc.)

### 4. **GraphQL vs REST**

- **GraphQL**: Single endpoint, flexible queries, strong typing
- **REST**: Multiple endpoints, fixed responses
- We use GraphQL for better developer experience

### 5. **Authentication Flow**

1. User submits credentials
2. NextAuth validates against database
3. Creates JWT session
4. Session available in GraphQL context
5. Protected routes check session

### 6. **Database Operations**

- **Prisma**: Type-safe database queries
- **Migrations**: Track database schema changes

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting
4. Submit a pull request

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Tutorial](https://graphql.org/learn/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 🆘 Common Issues

### Database Connection

- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Run `pnpm prisma generate` after schema changes

### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure database migrations are up to date

### GraphQL Type Generation

- Run `pnpm codegen` after schema changes
- Check `codegen.ts` configuration
- Verify GraphQL schema syntax

---

**Happy coding! 🚀**
