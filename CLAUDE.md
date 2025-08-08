# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a professional portfolio website featuring a futuristic glassmorphism design with interactive animations. It's a static website built with vanilla HTML, CSS, and JavaScript, deployed via GitHub Pages.

## Development Commands

### Local Development
```bash
# Start local development server (Python 3)
python3 -m http.server 8000

# Alternative with Node.js
npx serve .

# Open in browser (automated via script)
./update.sh  # Choose option 4

# Run optimization checks
./optimize.sh  # Performance optimization tool
```

### Deployment & Updates
```bash
# Deploy to GitHub Pages (automated script)
./update.sh  # Choose option 1

# Manual deployment
git add .
git commit -m "Your commit message"
git push origin main
```

### Asset Management
```bash
# Update CV PDF
./update.sh  # Choose option 2

# Update profile photo
./update.sh  # Choose option 3
```

## Architecture

### File Structure
- `index.html` - Single-page application with semantic HTML5 structure
- `css/futuristic-style.css` - Main styles with CSS custom properties, glassmorphism effects
- `css/additional-styles.css` - Responsive styles and component-specific rules
- `js/futuristic-main.js` - Interactive functionality with modern ES6+ APIs
- `assets/` - Static assets (profile photo, CV PDF, images)

### Design System
- **CSS Custom Properties**: Centralized color scheme, spacing, and animation values in `:root`
- **Glassmorphism**: Backdrop-filter effects with translucent backgrounds
- **Mobile-first responsive**: Breakpoints at 768px and 1024px
- **Animation system**: Intersection Observer API for scroll-triggered animations

### JavaScript Architecture
- Modular initialization functions called on DOMContentLoaded
- Event delegation patterns for performance
- Intersection Observer API for scroll animations
- Mobile menu toggle with CSS transforms
- Form validation with floating label effects

## Development Guidelines

### CSS Best Practices
- Use CSS custom properties for consistent theming
- Prefer CSS Grid and Flexbox for layouts
- Implement animations with `will-change` property for performance
- Use `backdrop-filter` for glassmorphism effects

### JavaScript Patterns
- Initialize all functionality from `DOMContentLoaded` event
- Use throttled event listeners for scroll events
- Implement progressive enhancement for mobile devices
- Handle accessibility with keyboard navigation support

### Performance Considerations
- Lazy-load non-critical animations
- Use `will-change` sparingly and remove after animations complete
- Optimize for mobile with reduced motion preferences
- Test scroll performance on lower-end devices

### Responsive Design
- Profile image repositions from hero to about section on mobile
- Navigation transforms to hamburger menu below 768px
- Touch-friendly button sizes (minimum 44px)
- Hidden scroll indicators on mobile to prevent layout issues

## Key Features to Maintain

### Visual Effects
- Animated particle background with floating orbs
- Glassmorphism navigation with backdrop blur
- Scroll-triggered animations using Intersection Observer
- Orbital animations around profile images
- Custom gradient backgrounds and accent colors

### Interactive Elements
- Smooth scrolling navigation with active state indicators
- Mobile menu with animated hamburger toggle
- Contact form with floating labels and validation
- Status badge linking to LinkedIn profile
- Easter egg functionality (Konami code with rainbow effects)

### Accessibility
- Semantic HTML5 structure
- Keyboard navigation support
- Reduced motion preferences respected
- Alt text for images and meaningful link text

## Testing

No automated test suite - verify changes by:
1. Testing in local development server
2. Checking responsive behavior across device sizes
3. Validating form functionality and navigation
4. Ensuring animations perform smoothly
5. Testing mobile menu and touch interactions