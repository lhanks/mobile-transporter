# Mobile Transporter - Project Instructions

## Story-Based Ralph Workflow

This project uses Ralph Wiggum to process user stories from a backlog.

### Story Locations

```
.ai/stories/
├── TEMPLATE.md           # Copy this to create new stories
├── backlog/              # Stories waiting to be implemented
│   ├── MT-001.md
│   ├── MT-002.md
│   └── ...
└── processed/            # Completed stories (moved after commit)
```

### How It Works

1. Ralph reads `PROMPT.md` which instructs it to process stories
2. Picks the first story from `backlog/` (alphabetically)
3. Implements the story requirements
4. Commits with message: `feat(MT-XXX): Story title`
5. Moves story to `processed/`: `git mv .ai/stories/backlog/MT-XXX.md .ai/stories/processed/`
6. Continues to next story until backlog is empty

### Starting a Ralph Session

```bash
/ralph-wiggum:ralph-loop "Process stories from PROMPT.md" --completion-promise "ALL STORIES COMPLETE"
```

Or with iteration limit:
```bash
/ralph-wiggum:ralph-loop "Process stories from PROMPT.md" --max-iterations 20 --completion-promise "ALL STORIES COMPLETE"
```

### Adding New Stories

1. Copy `.ai/stories/TEMPLATE.md` to `.ai/stories/backlog/{STORY-ID}.md`
2. Fill in the story details
3. Stories are processed in alphabetical order by filename

### Story File Format

```markdown
# MT-XXX: Title

## Description
What needs to be built

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Notes
Implementation hints

## Files to Modify
- `path/to/file.ts` - what to change

## Testing
- [ ] Tests added
```

### Completion Promise

Ralph outputs `<promise>ALL STORIES COMPLETE</promise>` when:
- `.ai/stories/backlog/` is empty
- All stories have been committed

## Commands Reference

| Command | Description |
|---------|-------------|
| `/ralph-wiggum:ralph-loop` | Start processing stories |
| `/ralph-wiggum:cancel-ralph` | Stop active loop |
| `ls .ai/stories/backlog/` | See pending stories |
| `ls .ai/stories/processed/` | See completed stories |
| `head -10 .claude/ralph-loop.local.md` | Check loop status |

## Conventions

- One story per commit
- Commit message format: `feat(STORY-ID): Title`
- Move story AFTER successful commit
- Follow existing code patterns
- Add tests for new functionality
