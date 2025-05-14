# Portfolio Site Style Guide

## Typography

### Fonts
- **Primary Font (Degular)**
  - Weights: Light (300), Regular (400), Medium (500)
  - Usage: Headings, Navigation, Key UI elements
  - Sizes:
    - H1: 2rem (32px)
    - H2: 1.5rem (24px)
    - H3: 1.25rem (20px)
    - Body: 1rem (16px)
    - Small: 0.875rem (14px)

- **Secondary Font (Times New Roman)**
  - Style: Italic
  - Usage: Subtitles, Quotes, Accent text
  - Sizes:
    - Large: 1.25rem (20px)
    - Regular: 1rem (16px)
    - Small: 0.875rem (14px)

## Colors

### Primary Colors
- **Black**
  - Main: #1E1E1E
  - Light: #333333
  - Dark: #000000

- **White**
  - Main: #FFFFFF
  - Off-white: #F5F5F5
  - Warm white: #FAFAFA

### Accent Colors
- **Orange**
  - Main: #FF6B00
  - Light: #FF8533
  - Dark: #CC5500

### UI Colors
- **Background**
  - Primary: #FFFFFF
  - Secondary: #F5F5F5
  - Overlay: rgba(0, 0, 0, 0.5)

- **Text**
  - Primary: #1E1E1E
  - Secondary: #666666
  - Muted: #999999

## Spacing

### Base Unit
- 4px (0.25rem)

### Common Spacing
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

### Layout Spacing
- Container padding: 1rem (16px)
- Section margin: 2rem (32px)
- Component spacing: 1rem (16px)

## Layout

### Container
- Max width: 1440px
- Padding: 1rem (16px)
- Margin: 0 auto

### Grid System
- 12-column grid
- Gap: 1rem (16px)
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## Components

### Navigation
- Height: 4rem (64px)
- Background: transparent/white
- Text color: #1E1E1E
- Hover state: opacity 0.7
- Active state: underline

### Buttons
- Primary
  - Background: #1E1E1E
  - Text: #FFFFFF
  - Padding: 0.75rem 1.5rem
  - Border radius: 0.25rem

- Secondary
  - Background: transparent
  - Border: 1px solid #1E1E1E
  - Text: #1E1E1E
  - Padding: 0.75rem 1.5rem
  - Border radius: 0.25rem

### Cards
- Background: #FFFFFF
- Border radius: 0.5rem
- Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
- Padding: 1.5rem

## Animations

### Transitions
- Duration: 300ms
- Easing: ease-out
- Properties: opacity, transform, color

### Hover Effects
- Scale: 1.02
- Duration: 200ms
- Easing: ease-out

### Page Transitions
- Fade duration: 500ms
- Slide duration: 600ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

## Images

### Hero Images
- Aspect ratio: 16:9
- Max width: 1440px
- Quality: 90%
- Format: WebP with JPEG fallback

### Thumbnails
- Aspect ratio: 4:3
- Size: 400x300px
- Quality: 80%
- Format: WebP with JPEG fallback

### Icons
- Size: 24x24px
- Format: SVG
- Color: Current color

## Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile First
- Base styles for mobile
- Media queries for larger screens
- Fluid typography
- Flexible images

## Accessibility

### Color Contrast
- Text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Focus States
- Visible outline
- High contrast
- No removal of focus styles

### Screen Reader
- Proper heading hierarchy
- Alt text for images
- ARIA labels where needed 