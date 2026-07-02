# Mane Blends Design System

## 1. Core Principles
- **Aesthetic:** Modern, premium, masculine, and sophisticated.
- **Theme:** Dark mode by default to highlight the metallic logo and high-quality imagery.
- **Vibe:** "Best in the world" grooming studio. 

## 2. Color Palette
We use a deep, rich palette to create a high-end atmosphere.
- **Brand Dark (Backgrounds):** `#0f1115` (Deep Charcoal/Black)
- **Brand Gold (Accents/Buttons):** `#c29d59` (Metallic Amber/Gold)
- **Brand Light (Primary Text):** `#f5f5f5` (Soft White)
- **Brand Accent (Cards/Sections):** `#1f2937` (Dark Gray)

## 3. Typography
Modern, clean, and highly legible fonts.
- **Headings (Display):** `Outfit`, sans-serif (Bold, metallic, tracking-tight).
- **Body Text (Sans):** `Inter`, sans-serif (Clean, readable, professional).

## 4. Components

### Buttons
- **Primary (Book Now):** 
  - Background: `bg-brand-primary`
  - Text: `text-brand-dark`
  - Hover: Slightly lighter gold, subtle scale up (`hover:scale-105`)
  - Transition: Smooth `transition-all duration-300`

### Animations (Framer Motion)
- **Page Load:** Smooth fade-in and slight upward translation (`y: 20` to `y: 0`).
- **Scroll Reveal:** Elements fade in as they enter the viewport.
- **Interactive:** Hover states on buttons and service cards must feel responsive and snappy.

## 5. Layout & Responsiveness
- **Mobile First:** All sections must look perfect on mobile devices (stacking columns, readable text).
- **Container:** Max-width of `1280px` for desktop to keep content focused.
- **Spacing:** Generous padding between sections (`py-20` or `py-24`) to let the design breathe.
