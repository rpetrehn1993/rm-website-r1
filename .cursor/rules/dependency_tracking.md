# Dependency Tracking Rule

## Purpose
This rule ensures that all changes to the codebase are properly tracked and their impacts are understood before implementation.

## Rule
Before making any changes to the codebase, you MUST:

1. **Check Dependencies**
   - Review `.cursor/dependencies.yaml`
   - Identify all affected components, assets, and pages
   - Understand upstream and downstream impacts

2. **Update Dependencies**
   - After making changes, update `.cursor/dependencies.yaml`
   - Add new entries to the `changes` section
   - Update any modified component/asset/page entries

3. **Documentation Requirements**
   - All changes must be documented in the `changes` section
   - Include:
     - Date of change
     - Description of change
     - Affected components
     - Affected assets
     - Any new dependencies created
     - Any broken dependencies

## Examples

### Before Making Changes
```yaml
# Check dependencies.yaml for:
- What components will be affected
- What assets are involved
- What pages might be impacted
- What functions might need updates
```

### After Making Changes
```yaml
changes:
  - date: "YYYY-MM-DD"
    description: "Description of changes made"
    affected_components:
      - Component1
      - Component2
    affected_assets:
      - Asset1
      - Asset2
    new_dependencies: []
    broken_dependencies: []
```

## Enforcement
- This rule is mandatory for all code changes
- The dependencies file must be kept up-to-date
- Changes without proper dependency tracking will be rejected
- Regular audits of the dependencies file should be performed

## Benefits
- Prevents unintended side effects
- Maintains codebase stability
- Improves change management
- Facilitates better understanding of the system
- Helps with debugging and maintenance 