# Typography Standardization Guide

## Overview
Your application now has a **standardized typography system** using CSS variables and utility classes for consistent font sizes, weights, and spacing across all components.

---

## Font Family
**Primary Font Stack:**
```css
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Helvetica', 'Arial', sans-serif
```
This is automatically applied to all elements in your application.

---

## Font Sizes

### CSS Variables
Use these CSS variables in your stylesheets:

| Variable | Size | Usage |
|----------|------|-------|
| `var(--font-size-xs)` | 12px (0.75rem) | Small labels, tags, badges |
| `var(--font-size-sm)` | 14px (0.875rem) | Small text, captions, metadata |
| `var(--font-size-base)` | 16px (1rem) | **Base body text** (default) |
| `var(--font-size-md)` | 18px (1.125rem) | Medium text, subheadings |
| `var(--font-size-lg)` | 20px (1.25rem) | Large text, card titles |
| `var(--font-size-xl)` | 24px (1.5rem) | Section headings (h3) |
| `var(--font-size-2xl)` | 32px (2rem) | Page headings (h2) |
| `var(--font-size-3xl)` | 40px (2.5rem) | Hero headings (h1) |
| `var(--font-size-4xl)` | 48px (3rem) | Display headings |

### Utility Classes
Add these classes directly to HTML elements:

```jsx
<p className="text-sm">Small text</p>
<h3 className="text-xl">Extra large heading</h3>
<div className="text-2xl">Very large text</div>
```

**Available classes:**
- `.text-xs` - Extra small (12px)
- `.text-sm` - Small (14px)
- `.text-base` - Base/default (16px)
- `.text-md` - Medium (18px)
- `.text-lg` - Large (20px)
- `.text-xl` - Extra large (24px)
- `.text-2xl` - 2X large (32px)
- `.text-3xl` - 3X large (40px)
- `.text-4xl` - 4X large (48px)

---

## Font Weights

### CSS Variables
Use these in your stylesheets:

| Variable | Weight | Usage |
|----------|--------|-------|
| `var(--font-weight-normal)` | 400 | Normal body text |
| `var(--font-weight-medium)` | 500 | Slightly emphasized text |
| `var(--font-weight-semibold)` | 600 | Semi-bold (h3-h6, buttons) |
| `var(--font-weight-bold)` | 700 | **Bold** (h1-h2, important) |
| `var(--font-weight-extrabold)` | 800 | Extra bold (hero text) |

### Utility Classes

```jsx
<p className="font-normal">Normal weight text</p>
<h3 className="font-semibold">Semi-bold heading</h3>
<button className="font-bold">Bold button</button>
```

**Available classes:**
- `.font-normal` - Normal (400)
- `.font-medium` - Medium (500)
- `.font-semibold` - Semi-bold (600)
- `.font-bold` - Bold (700)
- `.font-extrabold` - Extra bold (800)

---

## Line Heights

### CSS Variables

| Variable | Value | Usage |
|----------|-------|-------|
| `var(--line-height-tight)` | 1.25 | Headings, tight spacing |
| `var(--line-height-normal)` | 1.5 | **Default** body text |
| `var(--line-height-relaxed)` | 1.75 | Paragraphs, readable content |

### Utility Classes

```jsx
<h1 className="leading-tight">Tight line height</h1>
<p className="leading-relaxed">Relaxed paragraph spacing</p>
```

**Available classes:**
- `.leading-tight` - Tight (1.25)
- `.leading-normal` - Normal (1.5)
- `.leading-relaxed` - Relaxed (1.75)

---

## Standard Heading Sizes

Headings are automatically styled with appropriate sizes and weights:

```jsx
<h1>Hero Heading</h1>      // 40px, bold, tight
<h2>Page Heading</h2>      // 32px, bold, tight
<h3>Section Heading</h3>   // 24px, semibold, tight
<h4>Subsection</h4>        // 20px, semibold, normal
<h5>Small Heading</h5>     // 18px, medium, normal
<h6>Tiny Heading</h6>      // 16px, medium, normal
```

---

## Usage Examples

### In CSS Files

```css
/* Use variables for consistency */
.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.description {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
}

.label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}
```

### In JSX/React Components

```jsx
// Using utility classes
<div className="course-card">
  <h3 className="text-xl font-bold">Course Title</h3>
  <p className="text-sm font-normal leading-relaxed">
    Course description goes here
  </p>
  <span className="text-xs font-medium">12 weeks</span>
</div>

// Combining with inline styles (when necessary)
<div style={{
  fontSize: 'var(--font-size-md)',
  fontWeight: 'var(--font-weight-semibold)'
}}>
  Custom styled text
</div>
```

---

## Migration Guide

To standardize existing code:

### Replace hardcoded font sizes:
❌ **Before:**
```css
.title { font-size: 24px; }
.text { font-size: 16px; }
```

✅ **After:**
```css
.title { font-size: var(--font-size-xl); }
.text { font-size: var(--font-size-base); }
```

### Replace hardcoded font weights:
❌ **Before:**
```css
.heading { font-weight: 700; }
```

✅ **After:**
```css
.heading { font-weight: var(--font-weight-bold); }
```

### Use utility classes:
❌ **Before:**
```jsx
<p style={{ fontSize: '14px', fontWeight: '500' }}>Text</p>
```

✅ **After:**
```jsx
<p className="text-sm font-medium">Text</p>
```

---

## Best Practices

1. **Always use CSS variables** instead of hardcoded pixel values
2. **Use utility classes** for one-off styling needs
3. **Use semantic HTML headings** (h1-h6) appropriately
4. **Keep font sizes consistent** across similar components
5. **Test on different screen sizes** - consider using responsive font sizes if needed

---

## Typography Scale Reference

```
Display (48px)  ████████████ Hero/Landing pages
3XL (40px)      ██████████   Page titles (h1)
2XL (32px)      ████████     Section headers (h2)
XL (24px)       ██████       Subsection headers (h3)
LG (20px)       █████        Card titles (h4)
MD (18px)       ████         Emphasized text (h5)
BASE (16px)     ███          Body text (default)
SM (14px)       ██           Small text, captions
XS (12px)       █            Labels, tags, badges
```

---

## Common Patterns

### Card Component
```jsx
<article className="card">
  <h3 className="text-xl font-semibold">Card Title</h3>
  <p className="text-base font-normal leading-relaxed">
    Card description text
  </p>
  <span className="text-sm font-medium">Metadata</span>
</article>
```

### Button Component
```jsx
<button className="text-base font-semibold">
  Click Me
</button>
```

### Form Label
```jsx
<label className="text-sm font-medium">
  Email Address
</label>
<input className="text-base" type="email" />
```

---

## Need Help?

If you need to add new font sizes or weights:
1. Add the variable to `:root` in `src/index.css`
2. Create the utility class
3. Document it here
4. Use consistently across the app

**Current typography system ensures:**
- ✅ Consistent visual hierarchy
- ✅ Better accessibility
- ✅ Easier maintenance
- ✅ Professional appearance
- ✅ Responsive design ready
