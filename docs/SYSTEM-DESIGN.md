# System Design: From Bricks to Bytes Blog

This document outlines the architectural design of Théo Gédin's personal blog and portfolio website.

## 1. System Architecture Overview

The blog follows a modern Jamstack architecture with the following key characteristics:

- **Framework**: Next.js (React-based framework)
- **Content**: MDX (Markdown with JSX) for blog posts and projects
- **Styling**: Custom CSS with CSS variables for theming
- **Rendering**: Static Site Generation (SSG) with incremental static regeneration
- **Deployment**: Vercel platform

```
┌─────────────────────────────────────┐
│            Client Browser           │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│              Vercel CDN             │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│         Next.js Application         │
├─────────────────────────────────────┤
│  ┌─────────┐    ┌────────────────┐  │
│  │ React   │    │ Static Pages   │  │
│  │Components│   │ (HTML/CSS/JS)  │  │
│  └─────────┘    └────────────────┘  │
│         │              ▲            │
│         └──────────────┘            │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│         Content Repository          │
├─────────────────────────────────────┤
│  ┌─────────┐    ┌────────────────┐  │
│  │ MDX     │    │ JSON Metadata  │  │
│  │ Content │    │                │  │
│  └─────────┘    └────────────────┘  │
└─────────────────────────────────────┘
```

## 2. Key Components

### 2.1 Content Management

- **Content Organization**: Year-based directory structure in `/content/{YYYY}/{slug}/`
- **Metadata Storage**: Dual-approach with frontmatter in MDX files and centralized `posts.json`
- **Image Management**: Post-specific images stored in each post's directory
- **Projects Data**: Similar structure to blog posts with additional metadata fields

### 2.2 Frontend Components

#### Core Layout Components

- `MainLayout.js`: Base layout with header, footer, and SEO metadata
- `BlogPostLayout.js`: Extended layout for blog post presentation
- `ProjectLayout.js`: Specialized layout for project showcases

#### Reusable UI Components

- `SkillsModule.js`: Interactive skills display with tabbed interface
- `PostCard.js`: Card component for blog post previews
- `Header.js`: Navigation component with theme toggle
- `BricksToBytes.js`: Custom visual element for the homepage
- `Tag.js`: Reusable tag component for categorization

### 2.3 Page Templates

- `pages/index.js`: Homepage with profile, featured projects, and skills
- `pages/blog/index.js`: Blog listing with filtering capabilities
- `pages/blog/[year]/[slug].js`: Dynamic route for individual blog posts
- `pages/projects/index.js`: Projects showcase and listing
- `pages/about.js`: Personal information and professional journey
- `pages/contact.js`: Contact form and professional links

## 3. Data Flow

```
┌─────────────┐      ┌───────────────┐      ┌───────────────┐
│ Build Time  │─────▶│ Static Assets │─────▶│  Deployment   │
└─────────────┘      └───────────────┘      └───────────────┘
       │                                            │
       ▼                                            ▼
┌─────────────┐      ┌───────────────┐      ┌───────────────┐
│ MDX Content │─────▶│    Next.js    │─────▶│ Client Browser│
└─────────────┘      │ getStaticProps│      └───────────────┘
       │             └───────────────┘             ▲
       ▼                     │                     │
┌─────────────┐              │                     │
│JSON Metadata│──────────────┘                     │
└─────────────┘                                    │
       ▲                                           │
       │                                           │
┌─────────────┐                                    │
│ Image Assets│───────────────────────────────────-┘
└─────────────┘
```

### 3.1 Build Process

1. **Content Processing**:

   - MDX files are read from `content/` directory
   - Frontmatter is extracted and combined with metadata
   - Content is processed and rendered to HTML

2. **Page Generation**:

   - Static HTML is generated for all pages at build time
   - Dynamic routes are pre-rendered based on content
   - JSON data files are generated for client-side interactions

3. **Asset Optimization**:
   - Images are processed and optimized
   - CSS is minified and bundled
   - JavaScript is bundled and code-split

## 4. Technical Implementations

### 4.1 Styling Approach

- **Global CSS Variables**: Defined in `styles/globals.css` for consistent theming
- **CSS-in-JSX**: Component-specific styling via styled-jsx
- **Dark/Light Mode**: Theme switching with persistent user preference
- **Responsive Design**: Mobile-first approach with CSS media queries

### 4.2 Performance Optimizations

- **Image Optimization**: Next.js Image component for responsive images
- **Code Splitting**: Automatic code splitting based on routes
- **Static Generation**: Pre-rendered HTML for fast initial load
- **Client-side Navigation**: Fast page transitions with Next.js Link
- **Lazy Loading**: Components and images loaded as needed

### 4.3 SEO Enhancements

- **Metadata Management**: Dynamic meta tags based on page content
- **Structured Data**: Schema.org JSON-LD for improved search results
- **OpenGraph/Twitter Cards**: Social media metadata for sharing
- **Canonical URLs**: Proper URL handling to prevent duplicate content

### 4.4 Caching Strategy

- **Redis Cache**: Optional Redis implementation for content caching
- **Incremental Static Regeneration**: Updates to static content without full rebuild
- **Cache Management**: Utility to clear specific cache entries during deployments

## 5. Deployment Pipeline

```
┌─────────────┐      ┌───────────────┐      ┌───────────────┐
│   GitHub    │─────▶│ GitHub Actions│─────▶│    Vercel     │
│ Repository  │      │    CI/CD      │      │  Deployment   │
└─────────────┘      └───────────────┘      └───────────────┘
       ▲                     │                     │
       │                     ▼                     ▼
┌─────────────┐      ┌───────────────┐      ┌───────────────┐
│   Content   │─────▶│    Tests &    │─────▶│  Production   │
│   Updates   │      │    Builds     │      │     CDN       │
└─────────────┘      └───────────────┘      └───────────────┘
```

### 5.1 Deployment Workflow

1. Content is authored in MDX format locally
2. Code is committed to GitHub repository
3. Automatic builds are triggered on push
4. Preview deployments for pull requests
5. Production deployment on merge to main
6. Content is served from Vercel's global CDN

### 5.2 Content Update Workflow

- **Development Mode**: Local content preview with `npm run dev`
- **Content Scripts**: Utilities for creating new posts and projects
- **Git Workflow**: Branch-based workflow for content management
- **Cache Invalidation**: Automatic or manual cache clearing on updates

## 6. Security Considerations

- **Content Security Policy**: Restricted resource loading
- **Private Mode**: Password protection option for development/preview
- **Input Validation**: Form input sanitization and validation
- **Environment Variables**: Secure storage of API keys and secrets
- **HTTPS Only**: Secure connection enforcement
