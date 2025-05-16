# Project Asset Management Guide

## Table of Contents
1. [Understanding the Structure](#understanding-the-structure)
2. [Adding a New Project](#adding-a-new-project)
3. [Adding Content](#adding-content)
4. [Content Block Types](#content-block-types)
5. [Best Practices](#best-practices)
6. [Example Project Structure](#example-project-structure)
7. [Project Examples](#project-examples)
8. [Project Description Template](#project-description-template)
9. [Hero Grid Management](#hero-grid-management)

## Understanding the Structure

Each project in your portfolio follows this folder structure:
```
public/projects/[project-name]/
├── hero/
│   ├── main/         # Main hero image
│   └── hover/        # Hover animations (videos or GIFs)
├── content/
│   ├── images/       # Project gallery images
│   └── copy/         # Project descriptions
└── metadata/         # Project information file
```

## Adding a New Project

### Step 1: Create Project Folders
1. Go to the `public/projects` folder
2. Create a new folder with your project name (use lowercase with hyphens)
   - Example: `art-collection`, `design-evolution`

### Step 2: Create the Basic Structure
Inside your project folder, create these subfolders:
- `hero/main` - For your main hero image
- `hero/hover` - For hover animations
- `content/images` - For project gallery images
- `content/copy` - For project descriptions
- `metadata` - For project information

### Step 3: Add Your Project Information
Create a file called `project-info.json` in the `metadata` folder. Here's a template:

```json
{
  "title": "Your Project Title",
  "description": "A brief description of your project",
  "year": "2024",
  "category": "Category Name",
  "layout": {
    "hero": {
      "type": "full",
      "height": "full"
    },
    "content": {
      "blocks": [
        {
          "type": "text",
          "content": "Your project description here",
          "title": "Introduction",
          "layout": "full",
          "textAlignment": "center",
          "padding": {
            "top": 80,
            "bottom": 80
          }
        },
        {
          "type": "gallery",
          "title": "Project Images",
          "layout": "grid",
          "assets": [
            {
              "path": "content/images/image-1.jpg",
              "alt": "Description of image 1",
              "type": "image",
              "format": "jpg",
              "title": "Image Title",
              "caption": "Image caption"
            }
          ]
        }
      ],
      "maxWidth": 1200,
      "spacing": 40
    }
  },
  "assets": {
    "hero": {
      "main": {
        "path": "hero/main/main.jpg",
        "alt": "Main hero image description",
        "type": "image",
        "format": "jpg",
        "title": "Hero Image Title",
        "caption": "Hero image caption"
      },
      "hover": {
        "type": "video",
        "assets": [
          {
            "path": "hero/hover/video.mp4",
            "alt": "Hover video description",
            "type": "video",
            "format": "mp4"
          }
        ]
      }
    }
  }
}
```

## Adding Content

### Hero Section
1. **Main Image**:
   - Place your main hero image in `hero/main/`
   - Name it `main.jpg` (or appropriate format)
   - Recommended size: 1920x1080px

2. **Hover Animation**:
   - For videos: Place in `hero/hover/`
   - For GIFs: Place in `hero/hover/`
   - Include both MP4 and WebM formats for videos

### Content Section
1. **Images**:
   - Place gallery images in `content/images/`
   - Use descriptive names (e.g., `gallery-1.jpg`, `gallery-2.jpg`)
   - Recommended size: 1200x800px

2. **Project Description**:
   - Create a markdown file in `content/copy/`
   - Name it `project-description.md`
   - Include your project description, process, and details

## Content Block Types

You can use these types of content blocks in your project:

1. **Text Block**:
   ```json
   {
     "type": "text",
     "content": "Your text here",
     "title": "Optional Title",
     "layout": "full",
     "textAlignment": "center"
   }
   ```

2. **Gallery Block**:
   ```json
   {
     "type": "gallery",
     "title": "Gallery Title",
     "layout": "grid",
     "assets": [
       {
         "path": "content/images/image-1.jpg",
         "alt": "Image description",
         "type": "image",
         "format": "jpg",
         "title": "Image Title",
         "caption": "Image caption"
       }
     ]
   }
   ```

3. **Quote Block**:
   ```json
   {
     "type": "quote",
     "content": "Your quote here",
     "subtitle": "Quote attribution",
     "layout": "full",
     "backgroundColor": "#f5f5f5"
   }
   ```

## Best Practices

1. **File Naming**:
   - Use lowercase letters
   - Use hyphens instead of spaces
   - Be descriptive but concise

2. **Image Formats**:
   - Use JPG for photographs
   - Use PNG for graphics with transparency
   - Use WebP for better compression
   - Include both MP4 and WebM for videos

3. **Image Sizes**:
   - Hero images: 1920x1080px
   - Gallery images: 1200x800px
   - Thumbnails: 400x300px

4. **Metadata**:
   - Always include alt text for images
   - Add descriptive titles and captions
   - Keep descriptions concise but informative

## Example Project Structure

Here's a complete example for the "Art Collection" project:

```
public/projects/art-collection/
├── hero/
│   ├── main/
│   │   └── main.jpg
│   └── hover/
│       ├── video.mp4
│       └── video.webm
├── content/
│   ├── images/
│   │   ├── gallery-1.jpg
│   │   └── gallery-2.jpg
│   └── copy/
│       └── project-description.md
└── metadata/
    └── project-info.json
```

## Project Examples

### 1. Photography Project
```json
{
  "title": "Urban Landscapes",
  "description": "A photographic journey through city architecture",
  "year": "2024",
  "category": "Photography",
  "layout": {
    "hero": {
      "type": "full",
      "height": "full"
    },
    "content": {
      "blocks": [
        {
          "type": "text",
          "content": "Exploring the intersection of nature and urban development",
          "title": "Project Overview",
          "layout": "full",
          "textAlignment": "center"
        },
        {
          "type": "gallery",
          "title": "Featured Photographs",
          "layout": "grid",
          "assets": [
            {
              "path": "content/images/urban-1.jpg",
              "alt": "City skyline at sunset",
              "type": "image",
              "format": "jpg",
              "title": "Golden Hour",
              "caption": "Downtown skyline during sunset"
            }
          ]
        }
      ]
    }
  }
}
```

### 2. Branding Project
```json
{
  "title": "Brand Evolution",
  "description": "Complete brand transformation for tech startup",
  "year": "2023",
  "category": "Branding",
  "layout": {
    "hero": {
      "type": "split",
      "height": "half"
    },
    "content": {
      "blocks": [
        {
          "type": "text",
          "content": "From concept to implementation",
          "title": "Process",
          "layout": "full"
        },
        {
          "type": "gallery",
          "title": "Brand Elements",
          "layout": "grid",
          "assets": [
            {
              "path": "content/images/logo-evolution.gif",
              "alt": "Logo evolution animation",
              "type": "gif",
              "format": "gif",
              "title": "Logo Evolution",
              "caption": "The journey of the logo design"
            }
          ]
        }
      ]
    }
  }
}
```

### 3. Video Project
```json
{
  "title": "Documentary Series",
  "description": "Behind the scenes of modern architecture",
  "year": "2024",
  "category": "Video",
  "layout": {
    "hero": {
      "type": "overlay",
      "height": "full"
    },
    "content": {
      "blocks": [
        {
          "type": "video",
          "title": "Trailer",
          "layout": "full",
          "assets": [
            {
              "path": "content/videos/trailer.mp4",
              "alt": "Documentary trailer",
              "type": "video",
              "format": "mp4"
            }
          ]
        }
      ]
    }
  }
}
```

## Project Description Template

Create a file named `project-description.md` in your project's `content/copy` folder using this template:

```markdown
# [Project Title]

## Overview
[Brief description of the project, its goals, and significance]

## Challenge
[Describe the problem or challenge that needed to be solved]

## Solution
[Explain your approach and solution]

## Process
1. **Research & Discovery**
   - [Key research findings]
   - [Important insights]

2. **Design & Development**
   - [Design decisions]
   - [Technical implementation details]

3. **Results**
   - [Outcomes and achievements]
   - [Impact and feedback]

## Technical Details
- **Tools Used**: [List of tools, software, technologies]
- **Timeline**: [Project duration]
- **Team**: [Team members and roles]

## Key Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

## Lessons Learned
[What you learned from the project]

## Credits
- [Client/Company name]
- [Team members]
- [Special thanks]
```

### Example Project Description

```markdown
# Urban Landscapes Photography Series

## Overview
A photographic exploration of how modern architecture interacts with natural elements in urban environments. This series captures the dynamic relationship between man-made structures and the natural world.

## Challenge
To document the often-overlooked beauty of urban spaces while highlighting the contrast between architectural design and natural elements.

## Solution
Through careful composition and timing, I captured the interplay of light, shadow, and structure in various urban settings, focusing on moments when nature and architecture create compelling visual narratives.

## Process
1. **Research & Discovery**
   - Studied architectural styles in target locations
   - Identified optimal shooting times for each location
   - Mapped out key vantage points

2. **Design & Development**
   - Used specialized equipment for architectural photography
   - Implemented post-processing techniques to enhance details
   - Created a consistent visual language across the series

3. **Results**
   - Exhibition at City Gallery
   - Featured in Architectural Digest
   - Series acquired by Museum of Modern Art

## Technical Details
- **Tools Used**: Canon EOS R5, 24-70mm f/2.8 lens, Adobe Lightroom
- **Timeline**: 6 months
- **Team**: Solo project

## Key Features
- High-resolution architectural photography
- Time-lapse sequences of urban spaces
- Detailed documentation of architectural details

## Lessons Learned
The importance of patience in capturing the perfect moment and the value of understanding both architectural and photographic principles.

## Credits
- City Gallery for exhibition space
- Local architects for access to buildings
- Museum of Modern Art for acquisition
```

## Additional Notes

1. **Layout Types**:
   - `full`: Full-width content
   - `split`: Split screen layout
   - `grid`: Grid layout for galleries
   - `overlay`: Overlay text on images

2. **Content Block Options**:
   - `textAlignment`: 'left' | 'center' | 'right'
   - `backgroundColor`: Any valid CSS color
   - `padding`: Custom padding for blocks
   - `maxWidth`: Maximum width of content
   - `spacing`: Space between blocks

3. **Asset Types**:
   - `image`: Static images (jpg, png, webp)
   - `video`: Video files (mp4, webm)
   - `gif`: Animated GIFs

4. **Performance Tips**:
   - Optimize images before adding them
   - Use appropriate image sizes
   - Include multiple video formats
   - Keep file names consistent 

## Hero Grid Management

The hero grid on the homepage is managed through a configuration file that controls the order, visibility, and display of projects.

### Configuration File

The hero grid configuration is stored in `app/config/heroGrid.ts`. Here's how to manage it:

```typescript
export interface HeroGridProject {
  id: string;          // matches the folder name in public/projects/
  title: string;       // display title (can be different from folder name)
  order: number;       // position in the grid
  isActive: boolean;   // whether to show in the grid
}

export const heroGridProjects: HeroGridProject[] = [
  {
    id: 'art-collection',
    title: 'Art Collection',
    order: 1,
    isActive: true
  },
  {
    id: 'design-evolution',
    title: 'Design Evolution',
    order: 2,
    isActive: true
  }
  // ... other projects
];
```

### Managing Projects in the Grid

1. **Change Project Order**:
   ```typescript
   // To change the order of projects, modify the order numbers:
   {
     id: 'film-series',
     title: 'Film Series',
     order: 1,  // Changed from 3 to 1
     isActive: true
   }
   ```

2. **Change Project Titles**:
   ```typescript
   // To change how a project appears in the grid:
   {
     id: 'art-collection',
     title: 'Contemporary Art Exhibition',  // Changed from 'Art Collection'
     order: 2,
     isActive: true
   }
   ```

3. **Hide/Show Projects**:
   ```typescript
   // To hide a project from the grid:
   {
     id: 'food-culture',
     title: 'Food Culture',
     order: 5,
     isActive: false  // Changed from true to false
   }
   ```

4. **Add New Projects**:
   ```typescript
   // To add a new project to the grid:
   {
     id: 'new-project',  // must match folder name in public/projects/
     title: 'New Project Title',
     order: 6,
     isActive: true
   }
   ```

### Hero Grid Assets

Each project in the hero grid requires two types of assets:

1. **Main Image**:
   - Location: `public/projects/[project-id]/hero/main/main.jpg`
   - Size: 1920x1080px recommended
   - Format: JPG or WebP
   - This is the static image shown in the grid

2. **Hover Animation**:
   - Location: `public/projects/[project-id]/hero/hover/`
   - Options:
     - Video: Include both MP4 and WebM formats
     - GIF: Single GIF file
   - This plays when users hover over the project

### Best Practices for Hero Grid

1. **Image Optimization**:
   - Compress main images to reduce load time
   - Keep hover videos short (2-3 seconds)
   - Use WebP format for better performance

2. **Naming Conventions**:
   - Keep project IDs lowercase with hyphens
   - Use descriptive titles
   - Maintain consistent file naming

3. **Asset Management**:
   - Always include both main and hover assets
   - Test hover animations for smooth playback
   - Ensure images are properly sized

4. **Grid Organization**:
   - Keep related projects together
   - Consider visual flow when ordering
   - Maintain consistent spacing

### Example Project Structure for Hero Grid

```
public/projects/art-collection/
├── hero/
│   ├── main/
│   │   └── main.jpg          # Main grid image
│   └── hover/
│       ├── video.mp4         # Hover video (MP4)
│       └── video.webm        # Hover video (WebM)
```

### Troubleshooting

1. **Project Not Showing**:
   - Check `isActive` is set to `true`
   - Verify project ID matches folder name
   - Ensure all required assets exist

2. **Hover Not Working**:
   - Check video/GIF file exists
   - Verify file formats are correct
   - Test video playback in browser

3. **Image Quality Issues**:
   - Verify image dimensions
   - Check compression settings
   - Ensure proper file format

// ... rest of existing content ... 