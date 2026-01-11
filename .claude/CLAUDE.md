# Mobile Transporter - Project Instructions

## Ralph Loop Configuration

This project uses the Ralph Wiggum technique for iterative AI development.

### How It Works

1. `PROMPT.md` contains the current objective
2. Ralph loop feeds the same prompt repeatedly
3. Each iteration, Claude sees previous work in files/git
4. Progress accumulates until completion promise is output

### Commands

- `/ralph-wiggum:ralph-loop <prompt>` - Start a loop
- `/ralph-wiggum:cancel-ralph` - Cancel active loop
- Check status: `head -10 .claude/ralph-loop.local.md`

### Completion Promises

To signal completion, output:
```
<promise>YOUR_COMPLETION_TEXT</promise>
```

The stop hook detects this and exits the loop.

## Project Structure

```
mobile-transporter/
├── PROMPT.md              # Ralph loop prompt (edit this!)
├── .ai/
│   ├── specs/             # Feature specifications
│   ├── reports/           # Generated reports
│   └── tasks/             # Task lists
├── .claude/
│   ├── CLAUDE.md          # This file
│   ├── docs/              # Project documentation
│   └── ralph-loop.local.md # Loop state (auto-generated)
└── src/                   # Source code (to be created)
```

## Getting Started

1. Edit `PROMPT.md` with your project description and objective
2. Set clear success criteria
3. Run `/ralph-wiggum:ralph-loop "Work on PROMPT.md objectives"`
4. Let Ralph iterate until completion

## Conventions

- Commit meaningful progress each iteration
- Use descriptive commit messages
- Update success criteria checkboxes as you complete them
- Output completion promise ONLY when ALL criteria are met
