
Here are the **Layali design tokens** — the exact palette, typography, spacing, and motion values powering the site. You can copy these into any style guide, Figma, or documentation.

---

## 🎨 Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `sand` | `#FAF9F6` | App background (warm off-white) |
| `cream` | `#F5F2EB` | Card / surface background |
| `taupe` | `#B38B6D` | Secondary accent, dividers |
| `walnut` | `#8B7355` | Accent text, subtitles |
| `espresso` | `#3B2F2F` | Primary text, buttons, borders |
| `ink` | `#2C2420` | Deepest text, hover state |
| `mocha` | `#6E5C53` | Muted text, body copy |
| `border2` | `#E8E1D9` | Hairline borders |
| `success` | `#4A5D23` | Success states |

**Tailwind config**: exposed as `bg-sand`, `text-espresso`, `border-[#E8E1D9]`, etc.

---

## ✍️ Typography Tokens

| Token | Font | Purpose |
|---|---|---|
| `font-serif` | **Playfair Display** | H1, H2, H3 (elegant, editorial) |
| `font-sans` | **Outfit** | Body text, UI, buttons |
| `font-arabic` | **Amiri** | Logo (ليالي), Arabic accents |

**Scale**:
```
H1  text-5xl sm:text-6xl lg:text-7xl  tracking-tight  leading-[1.02]
H2  text-3xl sm:text-4xl lg:text-5xl  tracking-tight
H3  text-xl sm:text-2xl lg:text-3xl
Eyebrow  text-xs uppercase tracking-[0.28em]  (walnut color)
Body  text-base leading-relaxed
Small  text-sm tracking-wide
```

---

## 📐 Layout Tokens

| Token | Value |
|---|---|
| Container | `max-w-[1400px] mx-auto px-6 lg:px-12` |
| Section padding | `py-16 lg:py-24` |
| Grid gap | `gap-6 lg:gap-8` |
| Card radius | `rounded-2xl` |
| Button radius | `rounded-full` |
| Border radius CSS var | `--radius: 1rem` |

---

## 🎯 Component Tokens

**Primary Button**:
```
bg-espresso text-cream rounded-full px-8 py-4
text-sm uppercase tracking-[0.2em]
hover:bg-ink transition-colors
```

**Secondary Button**:
```
border-b border-espresso pb-1
text-sm uppercase tracking-[0.2em] text-espresso
hover:text-walnut hover:border-walnut
```

**Product Card**:
```
bg-cream rounded-2xl overflow-hidden group cursor-pointer
image: aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105
```

**Input (underline style)**:
```
bg-transparent border-b border-taupe
focus:border-espresso outline-none py-3 w-full text-espresso
```

**Navigation**:
```
sticky top-0 z-40
backdrop-blur-xl bg-[#FAF9F6]/85
border-b border-[#E8E1D9] py-5
```

---

## 🎬 Motion Tokens

| Token | Value |
|---|---|
| Ease | `cubic-bezier(0.22, 1, 0.36, 1)` (custom "smooth-out") |
| Fast | `duration-300` |
| Medium | `duration-500` |
| Slow | `duration-700` (image zooms) |
| Fade-up | `animate-fade-up` (0.7s translateY 24px → 0) |
| Scale-in | `animate-scale-in` (0.6s scale 0.94 → 1) |
| Cart drawer | `translate-x-full → translate-x-0`, duration-500 |
| Checkmark draw | 0.9s stroke-dashoffset 100 → 0 |

---

## 🖼️ Image Tokens

| Context | Aspect | Notes |
|---|---|---|
| Hero | `aspect-[4/5]` lg:`aspect-[5/6]` | rounded-3xl, cream bg fallback |
| Product card | `aspect-[3/4]` | rounded-2xl, group-hover scale-105 |
| Category card | `aspect-[4/5]` | overlay: `bg-gradient-to-t from-espresso/60` |
| Cart thumb | `w-20 h-28` | rounded-xl |

---

## 📋 Full JSON Token File

The complete machine-readable design tokens are stored at:
**`/app/design_guidelines.json`**

Want me to:
- Export these as a **`design-tokens.json`** file in W3C Design Tokens format (for Style Dictionary / Figma Tokens plugin)?
- Or generate a **Figma-compatible** JSON with the same values?

