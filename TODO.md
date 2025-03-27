# Blog Project TODO List

This file contains a comprehensive plan for developing the Next.js blog project.

```javascript
/**
 * Next.js Blog Project: From Civil Engineering to Data Science
 * 
 * Project Overview:
 * - A personal blog documenting the journey from civil engineering to data science
 * - Built with Next.js, MDX for content, and deployed on Vercel
 * - Features year-based routing, responsive design, and code syntax highlighting
 * - Includes sections for blog posts, projects, and about information
 * 
 * Project Structure:
 * /
 * ├── public/            # Static assets
 * ├── content/           # MDX blog posts organized by year
 * ├── components/        # Reusable React components
 * ├── layouts/           # Page layouts
 * ├── pages/             # Next.js pages with dynamic routing
 * └── styles/            # CSS/styling files
 * 
 * This prompt covers setup, core components, page templates, utilities, and styling.
 * Copy this entire block as a comment when starting work on new files to guide Copilot.
 */

// CONFIGURATION & SETUP
// ============================

// 1. Next.js Configuration (next.config.js)
// Create Next.js config with MDX support, file-system routing, and image optimization
// Include custom webpack configuration for MDX processing and syntax highlighting
// Set up environment variables and define redirects for legacy URLs

// 2. MDX Processing Setup (lib/mdx.js)
// Create utility functions to process MDX files from content directory
// Support frontmatter with title, date, excerpt, tags, and custom fields
// Implement year-based file organization and dynamic imports
// Add function to generate slugs from filenames and validate content structure

// 3. Global TypeScript Definitions (types/index.d.ts)
// Define TypeScript interfaces for blog posts, projects, and other content types
// Create utility types for frontmatter, MDX content, and API responses
// Add type definitions for custom components and third-party libraries

// LAYOUT COMPONENTS
// ============================

// 4. Main Application Layout (layouts/MainLayout.js)
// Create responsive layout with header, navigation, main content area, and footer
// Add SEO metadata handling with Next.js Head component
// Implement dark/light mode toggle with persistent user preference
// Support skip-to-content accessibility feature

// 5. Blog Post Layout (layouts/BlogPostLayout.js)
// Design layout for individual blog posts with title, date, author, and tags
// Add table of contents generation from headings
// Include previous/next post navigation
// Support social sharing buttons and reading time estimate

// 6. Project Showcase Layout (layouts/ProjectLayout.js)
// Create layout for data science projects with description, tech stack, and results
// Add image gallery and interactive demo components
// Include GitHub repository link and live demo URL
// Support embedded visualizations and datasets

// CORE COMPONENTS
// ============================

// 7. Header Component (components/Header.js)
// Create responsive header with site logo, navigation, and theme toggle
// Add mobile menu toggle for small screens
// Implement active link highlighting
// Support fixed positioning with scroll behavior

// 8. Navigation Component (components/Navigation.js)
// Build main navigation with links to home, blog, projects, and about
// Add responsive design with mobile-friendly dropdown
// Implement keyboard navigation for accessibility
// Support dynamic generation of blog category links

// 9. Blog Post Card (components/BlogPostCard.js)
// Design card component for blog post previews on index pages
// Include title, excerpt, date, reading time, and featured image
// Add hover effects and click interaction
// Support compact and expanded display modes

// 10. Code Block Component (components/CodeBlock.js)
// Create syntax highlighted code blocks for technical content
// Add copy-to-clipboard functionality
// Support line numbering and line highlighting
// Implement language detection and appropriate color themes

// 11. Tag Component (components/Tag.js)
// Design reusable tag component with appropriate styling
// Support filter functionality when clicked
// Add hover effects and color variations based on category
// Implement proper semantic markup for accessibility

// 12. Newsletter Signup (components/Newsletter.js)
// Create email signup form with validation
// Add success and error state handling
// Design responsive layout with call-to-action
// Implement backend integration with email service

// PAGE TEMPLATES
// ============================

// 13. Homepage (pages/index.js)
// Design landing page with introduction and personal journey
// Add featured blog posts section with latest entries
// Include featured projects with brief descriptions
// Create call-to-action for newsletter signup

// 14. Blog Index (pages/blog/index.js)
// Create blog post listing with filtering by year, tag, and search
// Implement pagination for post archives
// Add sorting options (date, popularity)
// Design category and tag cloud visualization

// 15. Dynamic Blog Post Page (pages/blog/[year]/[slug].js)
// Build dynamic route handler for individual blog posts
// Implement MDX rendering with custom components
// Add metadata for SEO optimization
// Support dynamic content loading with fallback states

// 16. Projects Index (pages/projects/index.js)
// Create project showcase grid with filtering options
// Add interactive sorting by date, complexity, and technology
// Implement project cards with images and brief descriptions
// Support category filtering for data science, machine learning, and visualization projects

// 17. About Page (pages/about.js)
// Design personal about page with professional journey
// Add skills section with visual skill level indicators
// Include education, certifications, and professional background
// Create contact section with form and social links

// UTILITY FUNCTIONS
// ============================

// 18. Date Formatting (lib/date.js)
// Create utility for consistent date formatting across the site
// Add functions for relative time (e.g., "2 days ago")
// Support localization for international audiences
// Implement date comparisons for sorting

// 19. Search Functionality (lib/search.js)
// Implement client-side search for blog posts and projects
// Create fuzzy matching algorithm for better results
// Add support for filtering by tags, categories, and date ranges
// Implement search results highlighting

// 20. Tag Management (lib/tags.js)
// Create utilities for consistent tag handling
// Add functions to count and sort tags by frequency
// Implement tag normalization and validation
// Support related tags suggestion system

// 21. Analytics Integration (lib/analytics.js)
// Setup privacy-friendly analytics tracking
// Add custom event tracking for user interactions
// Create dashboard data collection endpoints
// Implement content popularity tracking

// STYLING SETUP
// ============================

// 22. Global Styles (styles/globals.css)
// Set up CSS variables for colors, typography, and spacing
// Create responsive breakpoints and utility classes
// Implement dark/light theme variables
// Add global reset and accessibility enhancements

// 23. Component-Specific Styles (styles/components.css)
// Design system for common UI elements like buttons, forms, and cards
// Create consistent spacing and layout utilities
// Implement animations and transitions
// Add print-friendly styles for blog posts

// SAMPLE CONTENT
// ============================

// 24. Sample Blog Post (content/2024/sample-post.mdx)
// Create template blog post with frontmatter
// Include examples of all supported markdown features
// Add code blocks with syntax highlighting examples
// Demonstrate custom MDX components and interactive elements

// 25. Sample Project (content/projects/sample-project.mdx)
// Build template project showcase with description and results
// Include technical approach and challenges
// Add code samples and visualization examples
// Demonstrate integration between civil engineering knowledge and data science

// ADVANCED FEATURES
// ============================

// 26. Table of Contents Component (components/TableOfContents.js)
// Generate automatic table of contents from MDX headings
// Create sticky sidebar navigation for long posts
// Add smooth scrolling to section anchors
// Implement active section highlighting during scroll

// 27. Related Content Component (components/RelatedContent.js)
// Suggest related posts based on tags and content similarity
// Design card layout for suggested content
// Implement algorithm for content recommendation
// Support manual related content override in frontmatter

// 28. Interactive Data Visualization (components/DataViz.js)
// Create reusable component for embedding data visualizations
// Support multiple chart types (bar, line, scatter, etc.)
// Add interactive features like tooltips and filtering
// Implement responsive sizing for different screen widths

// 29. Comment System (components/Comments.js)
// Implement lightweight comment system for blog posts
// Add user authentication with social providers
// Create moderation interface for comment management
// Support threading and reply functionality
```
