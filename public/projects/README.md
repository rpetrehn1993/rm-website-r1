# Project Structure and Metadata Guide

## Directory Structure
```
public/projects/
├── [project-name]/
│   ├── hero/
│   │   ├── main/
│   │   │   └── [hero-image].svg
│   │   └── hover/
│   │       └── video.mp4
│   ├── content/
│   │   ├── images/
│   │   │   └── [content-images].jpg
│   │   ├── videos/
│   │   │   └── [content-videos].mov
│   │   └── copy/
│   │       └── project-description.md
│   └── metadata/
│       └── project-info.json
```

## Metadata Structure
Each project should have a `project-info.json` file in its metadata directory with the following structure:

```json
{
  "title": "Project Title",
  "description": "Brief project description",
  "year": "YYYY",
  "category": "Category",
  "layout": {
    "hero": {
      "type": "full",
      "height": "full"
    },
    "content": {
      "blocks": [
        {
          "type": "text",
          "content": "Content text",
          "title": "Block Title",
          "layout": "full",
          "textAlignment": "center"
        },
        {
          "type": "gallery",
          "title": "Gallery Title",
          "layout": "grid",
          "assets": [
            {
              "path": "content/images/image.jpg",
              "alt": "Image description",
              "type": "image",
              "format": "jpg",
              "title": "Image Title",
              "caption": "Image caption"
            }
          ]
        },
        {
          "type": "video",
          "title": "Video Title",
          "layout": "full",
          "assets": [
            {
              "path": "content/videos/video.mp4",
              "alt": "Video description",
              "type": "video",
              "format": "mp4",
              "title": "Video Title",
              "caption": "Video caption"
            }
          ]
        }
      ]
    }
  },
  "assets": {
    "hero": {
      "main": {
        "path": "hero/main/hero-image.svg",
        "alt": "Hero image description",
        "type": "image",
        "format": "svg",
        "title": "Hero Title",
        "caption": "Hero caption"
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
    },
    "content": {
      "images": [
        {
          "path": "content/images/image.jpg",
          "alt": "Image description",
          "type": "image",
          "format": "jpg"
        }
      ],
      "copy": "content/copy/project-description.md"
    }
  }
}
```

## Best Practices

### 1. File Organization
- Keep all project assets within their respective project directory
- Use consistent naming conventions for files
- Organize media by type (images, videos, copy)

### 2. Image Formats
- Hero images: Use SVG for vector graphics, JPG/PNG for photos
- Content images: Use JPG for photos, PNG for graphics with transparency
- Optimize images for web use

### 3. Video Formats
- Hover videos: Use MP4 format for better web compatibility
- Content videos: Use MOV for high quality, MP4 for web playback
- Keep video files optimized for web streaming

### 4. Copy Content
- Use Markdown (.md) files for all text content
- Store copy files in the `content/copy` directory
- Include proper formatting and structure in markdown files

### 5. Metadata
- Keep metadata files up to date
- Use descriptive alt text for accessibility
- Include meaningful titles and captions
- Maintain consistent structure across all projects

### 6. Asset References
- Use relative paths in metadata
- Ensure all paths are correct and files exist
- Keep asset references consistent with directory structure

### 7. Performance
- Optimize all media files for web use
- Use appropriate formats for different use cases
- Consider lazy loading for images and videos

### 8. Accessibility
- Include descriptive alt text for all images
- Provide captions for videos
- Ensure proper contrast and readability

## Adding a New Project

1. Create a new directory in `public/projects/` with the project name
2. Set up the directory structure as shown above
3. Add all project assets to their respective directories
4. Create a `project-info.json` file in the metadata directory
5. Update the project configuration in `app/config/heroGrid.ts`
6. Test the project page and all assets

## Troubleshooting

- Check file paths in metadata match actual file locations
- Verify all required fields are present in project-info.json
- Ensure all referenced assets exist in the correct directories
- Check file formats are supported by the application
- Verify image and video optimization for web use 