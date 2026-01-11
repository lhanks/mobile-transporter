# Mobile Transporter - Ralph Story Processor

## Workflow

1. Check `.ai/stories/backlog/` for unprocessed story files
2. Pick the first story (alphabetically by filename)
3. Implement the story requirements
4. Commit the changes with the story ID in the commit message
5. Move the story file to `.ai/stories/processed/`
6. If more stories remain in backlog, continue to next iteration
7. When backlog is empty, output `<promise>ALL STORIES COMPLETE</promise>`

## Story File Format

Each story file in `.ai/stories/backlog/` follows this format:
- Filename: `{STORY-ID}.md` (e.g., `MT-001.md`, `MT-002.md`)
- Contains: Title, description, acceptance criteria, technical notes

## Implementation Rules

1. **One story per iteration** - Complete and commit one story before moving to next
2. **Atomic commits** - Each story gets its own commit with message: `feat({story-id}): {title}`
3. **Move after commit** - Only move story to processed/ AFTER successful commit
4. **Follow existing patterns** - Match the project's code style and architecture
5. **Test coverage** - Add tests for new functionality

## Current State Check

Before starting work:
1. List files in `.ai/stories/backlog/` to see pending stories
2. List files in `.ai/stories/processed/` to see completed stories
3. Check git log for recent commits

## Completion Promise

Output `<promise>ALL STORIES COMPLETE</promise>` ONLY when:
- `.ai/stories/backlog/` is empty (no more stories to process)
- All processed stories have been committed

Do NOT output the promise if there are still stories in backlog.

---

*This prompt processes user stories one at a time, committing each before moving to the next.*
