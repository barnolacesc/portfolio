#!/bin/bash

# Portfolio Optimization Script
echo "Portfolio Optimization Tool"
echo "==========================="

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "Error: Please run this script from the portfolio root directory"
    exit 1
fi

echo "1. Image Optimization"
echo "2. CSS/JS Minification"
echo "3. Performance Audit"
echo "4. All Optimizations"
echo "5. Exit"
echo

read -p "Select optimization (1-5): " choice

case $choice in
    1)
        echo "Image Optimization Tips:"
        echo "- Convert images to WebP format for better compression"
        echo "- Use 'cwebp' command: cwebp input.jpg -o output.webp"
        echo "- Add WebP with fallback in HTML:"
        echo "  <picture>"
        echo "    <source srcset='image.webp' type='image/webp'>"
        echo "    <img src='image.jpg' alt='description'>"
        echo "  </picture>"
        ;;
    2)
        echo "CSS/JS Minification Options:"
        echo "- Online tools: cssminifier.com, javascript-minifier.com"
        echo "- Command line: npm install -g clean-css-cli uglify-js"
        echo "- Commands:"
        echo "  cleancss -o style.min.css style.css"
        echo "  uglifyjs script.js -o script.min.js"
        ;;
    3)
        echo "Performance Audit Tools:"
        echo "- Google PageSpeed Insights: https://pagespeed.web.dev/"
        echo "- Lighthouse (Chrome DevTools): F12 > Lighthouse tab"
        echo "- GTmetrix: https://gtmetrix.com/"
        echo "- WebPageTest: https://www.webpagetest.org/"
        ;;
    4)
        echo "Complete Optimization Checklist:"
        echo "✓ Font loading optimized (preconnect, display=swap)"
        echo "✓ CSS custom properties organized"
        echo "✓ JavaScript error handling added"
        echo "✓ Performance optimizations (GPU acceleration)"
        echo "✓ Accessibility improvements (reduced motion, contrast)"
        echo "✓ Browser fallbacks implemented"
        echo "⚠ Image optimization needed (manual WebP conversion)"
        echo "⚠ Minification recommended for production"
        ;;
    5)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid option. Please try again."
        ;;
esac