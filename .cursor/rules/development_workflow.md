# Development Workflow Guidelines

## Server Management
1. Always check server logs for:
   - 404 errors
   - Invalid resource errors
   - Configuration changes
   - Compilation issues

2. Server Restart Protocol:
   - Document any next.config.js changes
   - Note affected components/pages
   - Update dependencies.yaml
   - Verify server restart success

## Asset Management
1. Placeholder Protocol:
   - Use proper file formats
   - Document placeholder status
   - Track in dependencies.yaml
   - Include placeholder metadata

2. 404 Error Handling:
   - Log all 404 errors
   - Document missing assets
   - Create placeholders if needed
   - Update asset tracking

## Environment Configuration
1. Environment Variables:
   - Document all required variables
   - Track in dependencies.yaml
   - Note development vs production values
   - Include validation rules

2. Next.js Configuration:
   - Document all custom configs
   - Track config dependencies
   - Note restart requirements
   - Include validation steps

## Development Standards
1. Code Organization:
   - Follow Next.js 14 conventions
   - Maintain component hierarchy
   - Document file structure
   - Track component relationships

2. Testing Protocol:
   - Run tests before commits
   - Document test coverage
   - Track test dependencies
   - Include performance metrics

## Performance Monitoring
1. Metrics to Track:
   - Server startup time
   - Compilation duration
   - Resource loading
   - API response times

2. Optimization Rules:
   - Document performance issues
   - Track optimization attempts
   - Note successful improvements
   - Include benchmark data 