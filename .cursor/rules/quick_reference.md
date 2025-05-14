# RM Website Development Rules Quick Reference

## Required Files to Share
1. `.cursor/rules/dependency_tracking.md` - Core dependency tracking rules
2. `.cursor/dependencies.yaml` - Current dependency state
3. `.cursor/rules/development_workflow.md` - Development workflow guidelines
4. `.cursor/rules/error_handling.md` - Error handling protocols
5. `TASKS.md` - Current task tracking and status

## Before Making Changes
1. Check `.cursor/dependencies.yaml` for:
   - Affected components
   - Asset dependencies
   - Upstream/downstream impacts
   - Existing test coverage

2. Server Management:
   - Check server logs for errors
   - Verify compilation status
   - Note configuration changes
   - Document restart requirements
   - Update TASKS.md with any new issues found

   Example Server Log:
   ```
   ✓ Ready in 1365ms
   ✓ Compiled / in 1922ms (1310 modules)
   GET /?vscodeBrowserReqId=1747110564725 200 in 2105ms
   ```

3. Asset Management:
   - Verify asset formats
   - Check placeholder status
   - Document missing assets
   - Update asset tracking
   - Add any new asset issues to TASKS.md

   Common Asset Errors:
   ```
   GET /videos/food-culture-preview.mp4 404 in 205ms
   GET /gifs/documentary-preview.gif 404 in 19ms
   ⨯ The requested resource isn't a valid image
   ```

## After Making Changes
1. Update `.cursor/dependencies.yaml`:
   ```yaml
   changes:
     - date: "YYYY-MM-DD"
       description: "Description of changes"
       affected_components: []
       affected_assets: []
       new_dependencies: []
       broken_dependencies: []
   ```

2. Update TASKS.md:
   ```markdown
   ## [YYYY-MM-DD]
   - [ ] Task completed: Description
   - [ ] New issue found: Description
   - [ ] Performance impact: Description
   ```

3. Error Handling:
   - Log all errors
   - Document resolutions
   - Track error patterns
   - Update prevention measures
   - Add unresolved errors to TASKS.md

   Example Error Pattern:
   ```
   ⚠ Found a change in next.config.js. Restarting the server...
   ✓ Ready in 1216ms
   ```

4. Development Workflow:
   - Document config changes
   - Update environment variables
   - Track performance metrics
   - Verify optimization results
   - Update TASKS.md with any new tasks

## Component Requirements
All components must have:
- ✓ Test coverage
- ✓ Accessibility features
- ✓ Dark mode support
- ✓ Analytics tracking (where applicable)
- ✓ Error handling
- ✓ Performance monitoring

Example Component Structure:
```typescript
// Example: ProjectCard.tsx
export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  link
}) => {
  // 1. Error handling
  const [error, setError] = useState<Error | null>(null);
  
  // 2. Analytics tracking
  useEffect(() => {
    trackComponentView('ProjectCard', { title });
  }, [title]);
  
  // 3. Accessibility
  return (
    <article 
      role="article"
      aria-label={`Project: ${title}`}
    >
      {/* Component content */}
    </article>
  );
};
```

## Testing Requirements
- Unit tests for all components
- Accessibility testing
- Visual regression testing
- Performance testing
- Error case testing
- Edge case validation

Example Test Structure:
```typescript
// Example: ProjectCard.test.tsx
describe('ProjectCard', () => {
  it('handles missing image gracefully', () => {
    // Test error case
  });
  
  it('tracks analytics on mount', () => {
    // Test analytics
  });
  
  it('maintains accessibility', () => {
    // Test a11y
  });
});
```

## Performance Standards
Monitor:
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.25
- Resource loading < 2s
- Server startup < 1.5s
- Compilation time < 2s

Example Performance Log:
```
✓ Ready in 1365ms
✓ Compiled / in 1922ms (1310 modules)
GET /?vscodeBrowserReqId=1747110564725 200 in 2105ms
```

## Error Handling
1. Development Errors:
   - Log server errors
   - Track compilation issues
   - Document resolution steps
   - Verify fixes

   Example Server Error:
   ```
   ⚠ Found a change in next.config.js. Restarting...
   ✓ Ready in 1216ms
   ```

2. Asset Errors:
   - Handle 404s
   - Validate resource formats
   - Create placeholders
   - Update tracking

   Example Asset Error:
   ```
   GET /videos/food-culture-preview.mp4 404 in 205ms
   ⨯ The requested resource isn't a valid image
   ```

3. Component Errors:
   - Log runtime errors
   - Validate props
   - Track error frequency
   - Document fixes

## Common Use Cases

1. Adding New Component:
   ```typescript
   // 1. Create component with all requirements
   // 2. Add tests
   // 3. Update dependencies.yaml
   // 4. Verify performance
   // 5. Update TASKS.md with new component status
   ```

2. Handling 404 Errors:
   ```
   // 1. Log the error
   // 2. Create placeholder
   // 3. Update asset tracking
   // 4. Document resolution
   // 5. Add to TASKS.md if unresolved
   ```

3. Server Restart:
   ```
   // 1. Note config changes
   // 2. Document affected components
   // 3. Update dependencies.yaml
   // 4. Verify restart success
   // 5. Update TASKS.md with restart impact
   ```

## Current Components
- Navigation
- ContactForm
- ErrorBoundary
- ProjectCard
- TestUtils

## Current Pages
- HomePage
- WorkPage
- ContactPage
- ArchivePage

## Current Assets
- food-culture-preview.mp4
- documentary-preview.gif
- art-collection-alt.jpg

## Development Environment
- Next.js 14.2.28
- Local: http://localhost:3000
- Server startup: ~1.2s
- Compilation: ~1.5-2s

## Common Commands
```bash
# Start development server
npm run dev
# After running: Update TASKS.md with any new issues found

# Run tests
npm test
# After running: Update TASKS.md with test results

# Build for production
npm run build
# After running: Update TASKS.md with build status

# Start production server
npm start
# After running: Update TASKS.md with deployment status
```

## TASKS.md Update Protocol
1. After every command:
   - Check for new issues
   - Document performance impacts
   - Note any errors
   - Track unresolved items

2. Format:
   ```markdown
   ## [YYYY-MM-DD]
   ### Server Status
   - [ ] Issue: Description
   - [ ] Performance: Description
   
   ### Development Tasks
   - [ ] Task: Description
   - [ ] Blocked by: Description
   
   ### Asset Status
   - [ ] Missing: Description
   - [ ] Invalid: Description
   ```

3. Priority Levels:
   - [P0] Critical: Blocks development
   - [P1] High: Needs immediate attention
   - [P2] Medium: Should be addressed soon
   - [P3] Low: Nice to have

[Rest of the file remains unchanged...] 