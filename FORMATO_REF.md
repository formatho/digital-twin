# Design Reference: formatho.com

## Source
URL: https://formatho.com
Repo: /Users/studio/sandbox/formatho/formatho-site (Vue 3 + Tailwind)

## Design DNA

### Overall Style
- **Clean, light, modern developer tools aesthetic**
- White/light backgrounds with subtle borders
- NOT dark mode — uses light theme as primary
- Professional but approachable
- Content-dense but well-organized

### Layout
- Top navbar: Logo (left), nav links, search (Cmd+K), GitHub link
- Hero: Large heading, subtitle, CTA buttons, trust badges
- Stats bar: Key metrics in a row
- Tools organized by category with cards
- Grid: Cards in responsive grid, each with icon, title, description
- Footer: Multi-column with logo, links, email capture

### Colors
- Primary: Blue/indigo accent
- Background: White (#ffffff) and light gray (#f8fafc)
- Text: Dark (#0f172a) for headings, gray for secondary
- Borders: Light gray (#e2e8f0)
- Accent buttons: Blue gradient or solid blue
- Success indicators: Green badges
- Cards: White with subtle shadow/border

### Typography
- Clean sans-serif (Inter/system-ui)
- Large, bold headings
- Regular weight body text
- Small caps for categories

### Components
- **Navbar**: Fixed, white bg, logo left, links center/right, search input, GitHub icon
- **Hero**: Large text, 2 CTA buttons (primary + secondary), privacy badges row
- **Stats Bar**: 4 metrics in a row with numbers
- **How It Works**: 3 numbered steps with icons
- **Tool Cards**: Icon + title + description + "Open tool" link
- **Comparison Table**: Feature comparison with checkmarks
- **Footer**: 4 columns (Features, Popular Tools, Categories), email signup

### Key Patterns to Replicate
1. **Search bar** (Cmd+K shortcut) — prominent in navbar
2. **Privacy trust badges** — "Your data never leaves your browser", "Zero tracking"
3. **Category sections** — Grouped content with section headings and tool counts
4. **Card grid** — Consistent card design across all categories
5. **CTA buttons** — Primary (filled blue) + Secondary (outlined)
6. **Stats counter** — Animated numbers showing key metrics
