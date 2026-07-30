# AI Idea Forge - Frontend Development Rules

## Project Philosophy

AI Idea Forge is a production-style capstone project.

Every screen should be implemented as if it were ready for a live product demonstration.

---

# Core Principle

> Every page we build should be demo-ready.

This means:

- No placeholder layouts.
- No temporary components.
- No throwaway code.
- No duplicate implementations.
- No unfinished UI.
- No mock-only experiences unless explicitly required.

Every page should look polished, responsive, and presentation-ready.

---

# UI Standards

Every page must include:

- Consistent navigation
- Consistent spacing
- Consistent typography
- Responsive layout
- Loading states
- Error handling
- Empty states
- Accessibility considerations

---

# Design Language

Follow the AI Idea Forge visual identity.

Theme:

- Dark
- Futuristic
- Premium
- Glassmorphism
- Purple/Blue gradients
- AI Innovation Lab aesthetic

All pages must maintain a consistent experience.

---

# Component Rules

Prefer reusable components.

Examples:

- Sidebar
- Top Navigation
- Page Header
- Cards
- Buttons
- Form Controls
- Progress Indicators
- Status Badges

Avoid duplicating UI code.

---

# Data Rules

Avoid mock data where real data is available.

Priority:

1. Supabase
2. n8n
3. AI Agents
4. Temporary mock data (only during integration)

---

# Form Standards

Forms should include:

- Validation
- Helpful placeholders
- Required field indicators
- Clear error messages
- Loading state
- Success state

---

# Code Standards

- TypeScript only
- Functional components
- Clean folder structure
- Small reusable components
- Meaningful variable names
- No unused code
- No commented-out legacy code

---

# Navigation Standards

All navigation should follow:

Dashboard

↓

New Analysis

↓

Discovery Galaxy

↓

Product Blueprint

---

# AI Agent Workflow

New Analysis

↓

Create Analysis

↓

Discovery Galaxy

↓

Market Research

↓

Competitor Analysis

↓

Gap Analysis

↓

Technical Feasibility

↓

Business Feasibility

↓

Risk Analysis

↓

Opportunity Scoring

↓

Recommendation Engine

↓

Product Blueprint

---

# Quality Checklist

Before marking any page complete:

- UI matches approved design
- Responsive on desktop and laptop
- No console errors
- Clean code
- Integrated with existing architecture
- Ready for demonstration
- Ready for Git commit

If any of the above is false, the page is not complete.

---

# Final Principle

Every commit should improve the product.

Every feature should be presentation-ready.

Every page should feel like part of a real SaaS application.

Build once. Build it properly.