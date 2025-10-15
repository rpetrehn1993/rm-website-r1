# Figma Design to Code Mapping

This document maps Figma design frames to existing React components and style tokens.

## Source
- **Figma File**: [RM Website R1](https://www.figma.com/design/n8L29fzgFvVZFpVUl26pHR/250419_RP-FRAMER-WEBSITE_R1?node-id=37-8060&m=dev&t=XFPu58bPfjmqB095-1)

## Frame Mappings

### Landing Page
- **Frame ID**: `55:8646`
- **Component**: `app/page.tsx` (Home page)
- **Key Elements**:
  - Loading animation with centered content
  - White background with loading GIF
- **Assets**: `/images/loading.gif`
- **Typography**: Uses default font stack

### Web_Home (Desktop)
- **Frame ID**: `37:8209`
- **Component**: `app/page.tsx` + `app/components/HeroGrid.tsx`
- **Key Elements**:
  - Hero grid with project cards
  - Navigation overlay
  - Logo and wordmark positioning
- **Components Used**:
  - `Navigation.tsx` - Top navigation with logo
  - `HeroGrid.tsx` - Project grid layout
  - `OptimizedImage.tsx` - For project images
- **Typography**: 
  - Font: `font-degular` (DegularVariable.ttf)
  - Sizes: `text-3xl`, `text-base`, `text-xs`
- **Colors**: 
  - Background: `#F0F0EE` (home), `white` (other pages)
  - Text: `#1E1E1E` (primary), `#AAAAAA` (secondary)

### Web_Home_Mobile
- **Frame ID**: `309:258`
- **Component**: `app/page.tsx` (responsive)
- **Key Elements**:
  - Mobile-optimized layout
  - Smaller logo and wordmark
  - Stacked project grid
- **Responsive Classes**: `md:hidden`, `md:block`

### Web_Condensed
- **Frame ID**: `137:11315`
- **Component**: `app/components/HeroGrid.tsx` (condensed state)
- **Key Elements**:
  - Reduced spacing and sizing
  - Maintains grid structure
- **State**: Triggered by navigation menu open

### Web_Nav
- **Frame ID**: `137:11124`
- **Component**: `app/components/Navigation.tsx`
- **Key Elements**:
  - Slide-out navigation panel
  - Menu items: ABOUT, CONNECT, DIRECTOR'S REEL, ARCHIVE
  - Color-coded panels (red, brown, dark)
- **Colors**:
  - Default: `#FA3820` (red)
  - Connect: `#A09583` (brown)
  - About/Reel: `#1A1A1A` (dark)
- **Typography**:
  - Menu items: `font-degular font-medium text-[9.5px] tracking-widest`
  - Panel content: `font-['Times_New_Roman'] italic`

### Web_About
- **Frame ID**: `58:9129`
- **Component**: `app/components/Navigation.tsx` (AboutPanel)
- **Key Elements**:
  - Full-screen overlay
  - Centered content with contact info
  - Back button navigation
- **Layout**: Fixed positioning with centered content
- **Colors**: Background `#A09583` (brown)

### Web_Project_1
- **Frame ID**: `53:8533`
- **Component**: `app/projects/[projectId]/page.tsx`
- **Key Elements**:
  - Project detail layout
  - Media content areas
  - Project metadata
- **Assets**: Dynamic loading from `/public/projects/{project-name}/content/`

### Archive
- **Frame ID**: `124:11083`
- **Component**: `app/archive/page.tsx`
- **Key Elements**:
  - Archive grid layout
  - Project thumbnails
  - Filtering/sorting options
- **Layout**: Grid-based with responsive columns

## Component Architecture

### Navigation System
```tsx
// Main navigation component
<Navigation>
  // Slide-out menu with panels
  <ConnectPanel />
  <AboutPanel />
  <DirectorsReelPanel />
</Navigation>
```

### Page Transitions
```tsx
// Smooth page transitions
<PageTransition>
  <main>{children}</main>
</PageTransition>
```

### Asset Loading
```tsx
// Dynamic asset loading
<MediaElement 
  src={dynamicPath}
  alt={projectTitle}
  loading="lazy"
/>
```

## Style Token Mapping

### Typography
- **Primary Font**: `font-degular` (DegularVariable.ttf)
- **Secondary Font**: `font-['Times_New_Roman']` (Times New Roman)
- **Sizes**: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`

### Colors
- **Primary Text**: `#1E1E1E`
- **Secondary Text**: `#AAAAAA`
- **Background**: `#F0F0EE` (home), `white` (pages)
- **Navigation**: `#FA3820` (red), `#A09583` (brown), `#1A1A1A` (dark)

### Spacing
- **Container**: `max-w-[1440px] mx-auto px-4`
- **Grid Gaps**: `gap-4`, `space-y-8`
- **Padding**: `p-4`, `py-2`, `px-4`

## Asset Structure
```
/public/
├── images/
│   ├── logo.svg
│   ├── wordmark-horizontal.svg
│   ├── tiny-wordmark.svg
│   └── loading.gif
├── projects/
│   └── {project-name}/
│       ├── hero/
│       │   ├── main/
│       │   └── hover/
│       └── content/
└── videos/
    └── fallback-video.mp4
```

## Implementation Notes

1. **Responsive Design**: Uses Tailwind's responsive prefixes (`md:`, `lg:`)
2. **Performance**: Lazy loading for images, memoized components
3. **Accessibility**: ARIA attributes, focus management, keyboard navigation
4. **Animations**: Framer Motion for smooth transitions
5. **State Management**: React hooks with custom event system for menu state

## Next Steps

1. Implement remaining page layouts (Reel, Connect, Archive)
2. Add missing project detail pages
3. Optimize asset loading and caching
4. Add comprehensive testing coverage
5. Implement analytics and monitoring
