# Digital Twin OS — Full Redesign Brief

## Repository
- **Path:** `/Users/studio/sandbox/formatho/digital-twin`
- **Stack:** Next.js 14, React 18, TypeScript, CSS Variables (no Tailwind currently)
- **Deploy:** Vercel at https://digital-twin-formatho.vercel.app
- **Remote:** https://github.com/formatho/digital-twin

## Design System (from ui-ux-pro-max skill)

### Style: Glassmorphism + Bento Grid
- Dark theme with glass cards, frosted backgrounds, ambient glows
- Bento grid layout for dashboard
- Subtle animations (float, pulse-glow, gradient-shift)
- CSS variables already defined in `src/styles/globals.css`

### Color Palette: "Neon Abyss"
- Primary: `#3b82f6` (Blue)
- Secondary: `#8b5cf6` (Purple)  
- Accent: `#06b6d4` (Cyan)
- Background: `#0f172a` → `#1e293b` → `#334155`
- Success: `#10b981`, Warning: `#f59e0b`, Error: `#ef4444`

### Typography
- Display: Inter (or system-ui)
- Body: system-ui
- Already defined in CSS variables

## Pages to Redesign

### 1. Landing Page — `app/(website)/page.tsx`
**Current:** Basic sections with emoji icons, text-heavy, flat feel
**Target:** Premium SaaS landing page

**Must include:**
- Sticky navigation bar with logo, links (About, Pricing, GitHub), CTA button
- Hero with animated gradient mesh background (not just blur circles)
- Animated twin avatars (use CSS animations, not just emoji)
- Interactive bento grid showcasing features
- Social proof section (logos placeholder, stats counter)
- Testimonials section (placeholder quotes)
- "How it works" 3-step section
- Final CTA with gradient background
- Proper footer with columns (Product, Resources, Company, Legal)

### 2. Dashboard — `app/(os)/dashboard/page.tsx`
**Current:** Decent layout but static, mock data only
**Target:** Premium mission control

**Must include:**
- Animated metric cards with counters
- Mini charts (CSS-only bar charts or sparklines)
- Live activity feed with typing indicators
- Twin status cards with glow animations
- Memory visualization (pie chart or bars)
- Quick action grid with hover effects
- Notification bell with count badge

### 3. Pricing Page — `app/(website)/pricing/page.tsx`
**Current:** Plain gray cards, inconsistent with home page design
**Target:** Glassmorphism pricing table

**Must include:**
- Match home page design language (dark bg, glass cards, gradients)
- 3 tiers: Starter ($0), Pro ($29/mo), Enterprise (Custom)
- Pro tier highlighted (most popular)
- Feature comparison table below cards
- FAQ section with accordion
- Trust badges
- Money-back guarantee badge
- Annual/monthly toggle

### 4. About Page — `app/(website)/about/page.tsx`
**Current:** Likely minimal
**Target:** Company story, team, mission

### 5. OS Components — `app/(os)/components/`
**Improve:**
- **Sidebar:** Add twin avatars with status indicators, animated active states, keyboard shortcuts
- **Header:** Add search bar, breadcrumb navigation
- Add proper transitions between pages

## Technical Requirements

1. **Install Tailwind CSS** — Add `tailwindcss`, `postcss`, `autoprefixer` and configure
2. **Keep CSS variables** — They define the design tokens, Tailwind should extend them
3. **Use existing glass-card classes** — Don't duplicate
4. **Add `framer-motion`** — For page transitions and micro-interactions
5. **Add `lucide-react`** — Replace ALL emoji icons with proper SVG icons
6. **Responsive** — Mobile-first, test at 320px, 768px, 1024px, 1440px
7. **Performance** — Lazy load below-fold sections, optimize images
8. **SEO** — Proper meta tags, Open Graph, structured data

## File Structure (key files)
```
app/
  layout.tsx                    # Root layout
  (website)/
    layout.tsx                  # Website layout (add navbar + footer here)
    page.tsx                    # Landing page
    about/page.tsx              # About page
    pricing/page.tsx            # Pricing page
  (os)/
    layout.tsx                  # OS layout (sidebar + header)
    dashboard/page.tsx          # Dashboard
    council/page.tsx            # Council page
    twins/page.tsx              # Twins page
    marketplace/page.tsx        # Marketplace
    workflows/page.tsx          # Workflows
    memory/page.tsx             # Memory
    settings/page.tsx           # Settings
    components/
      Sidebar.tsx               # OS sidebar
      Header.tsx                # OS header
      GlassWrapper.tsx          # Glass card component
  api/                          # API routes
src/
  styles/globals.css            # Design tokens & global styles
```

## ⚡ CRITICAL: New Dashboard Vision — AI Project Builder

The dashboard is NOT just a metrics overview. It's an **AI Project Builder**.

### Flow:
1. **Text Input Box** — Prominent, center-stage. User types what they want to build (e.g. "Build me an e-commerce app with Stripe payments")
2. **Digital Twin Activation** — When submitted, the Council Twins activate:
   - 5 Council Twins start discussing the request in parallel
   - They create a **Business Requirements Document (BRD)**
   - They generate an **Architectural Diagram** (visual)
   - They **Identify all Agents** needed for the project
   - Full end-to-end planning visible to user
3. **User Review** — User reviews the plan (BRD, architecture, agents list)
   - Can approve, modify, or reject
4. **Execution Phase** — If user proceeds:
   - Agents get activated with specific tasks
   - Progress dashboard shows real-time agent utilization
   - Each agent's status, output, and progress visible
   - Building starts automatically

### Dashboard UI Components Needed:
- **Hero Input Section** — Large glassmorphic text area with submit button, placeholder: "What do you want to build?"
- **Council Chamber View** — Shows 5 twins discussing in real-time (chat-style bubbles)
- **Document Panel** — Tabs for BRD, Architecture, Agents, Timeline
- **Approval Bar** — Approve/Modify/Reject buttons with comments
- **Execution Dashboard** — Grid of active agents with status, progress bars, output previews
- **Architecture Visualizer** — SVG/component diagram showing system architecture
- **Agent Utilization Cards** — Per-agent cards showing task, status, time, output

This is the CORE product experience. Make it feel magical.

## Execution Order
1. Install deps (tailwindcss, postcss, autoprefixer, framer-motion, lucide-react) — if not already done
2. Configure Tailwind with existing CSS variables — if not already done
3. Create shared components (Navbar, Footer, GlassCard, AnimatedCounter, etc.)
4. **Redesign Dashboard with AI Project Builder flow (PRIORITY #1)**
5. Redesign Landing Page
6. Redesign Pricing Page
7. Improve About Page
8. Enhance OS Sidebar + Header
9. Add page transitions with framer-motion
10. Test responsive at all breakpoints
11. Run `npm run build` to verify
12. Commit all changes

## DO NOT
- Delete existing API routes
- Remove CSS variables
- Break existing functionality
- Use emoji as icons (replace with lucide-react)
- Use placeholder/lorem ipsum — use the actual Digital Twin OS content
