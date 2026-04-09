# Design Reference: iOS Liquid Glass Effect

## Source
Dribbble Shot: "iOS Liquid Glass Effect Smart Home UI"
URL: https://dribbble.com/shots/26315731-iOS-Liquid-Glass-Effect-Smart-Home-UI

## Design DNA to Replicate

### Background
- Deep dark navy/black base (#0a0a1a to #0f0f2e)
- Colorful ambient light orbs floating behind content
- Orbs: electric blue, deep purple, teal/cyan, warm orange
- Orbs have massive blur (80-120px), low opacity (15-30%)
- Creates a "living" dark background with depth

### Glass Cards (Liquid Glass)
- Ultra-frosted glass effect: `backdrop-filter: blur(20-40px) saturate(180%)`
- Background: `rgba(255, 255, 255, 0.05)` to `rgba(255, 255, 255, 0.12)`
- Border: 1px solid `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.15)`
- The "liquid" quality: background glow colors bleed through the glass slightly
- NO harsh borders, everything feels soft and floating
- Generous border-radius: 16px to 28px
- Soft shadows: `0 8px 32px rgba(0, 0, 0, 0.3)` with colored glow shadow

### Typography
- Primary text: pure white `#ffffff`
- Secondary text: soft gray `#a0a0b8` to `#8888a8`
- Tertiary/muted: `#5a5a7a`
- Font: system-ui or SF Pro style (clean, modern)
- Headings: bold, larger sizes
- Body: regular weight, comfortable line height (1.6)

### Layout Pattern
- Bento grid with MIXED card sizes
- Some cards span 2 columns or 2 rows
- Grid gap: 12-16px
- Content areas well-padded (20-28px)
- Asymmetric but balanced

### Interactive Elements
- Buttons: glass background with colored accent (blue/purple gradient)
- Hover: subtle scale (1.02-1.05), increased glow
- Active states: brighter border glow
- Toggle switches: rounded pill style with glow when active

### Status & Indicators
- Active: tiny green dot with green glow shadow
- Idle: dim gray dot
- Progress: thin rounded bars with gradient fill

### Color Accents (for twin identification)
- Blue: `#3b82f6` (Strategist)
- Purple: `#8b5cf6` (Builder)
- Green/Teal: `#10b981` (Analyst)
- Amber: `#f59e0b` (Operator)
- Red: `#ef4444` (Critic)
- Cyan: `#06b6d4` (Research)
- Pink: `#f472b6` (Content)
- Lavender: `#a78bfa` (Design)
- Emerald: `#34d399` (Growth)
- Sky: `#60a5fa` (Code)

### Key Visual Effects
1. Ambient glow orbs in background (animated, slow pulse)
2. Glass cards with blur and light transparency
3. Colored accent lines on card edges (like borderTop)
4. Floating animations (subtle, 6-8s cycle)
5. Gradient text for key headings
6. Pulse animation on active elements

### What Makes It "Liquid"
- The glass isn't opaque — you can SEE the colored orbs through it
- Cards near a blue orb have a slight blue tint
- Cards near a purple orb have a slight purple tint
- This creates an organic, "liquid light" feel
- The background orbs should gently animate (move slowly or pulse)

## CSS Implementation Guide

```css
/* Liquid Glass Base */
.liquid-glass {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Ambient Orb */
.ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.2;
  animation: orb-float 8s ease-in-out infinite;
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -30px) scale(1.05); }
  66% { transform: translate(-15px, 15px) scale(0.95); }
}

/* Liquid Text Gradient */
.liquid-gradient-text {
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```
