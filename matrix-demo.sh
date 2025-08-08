#!/bin/bash

# Matrix Terminal Portfolio Demo Script
echo "🌟 Welcome to the Matrix Terminal Portfolio Demo! 🌟"
echo "=================================================="
echo ""

echo "🎨 Revolutionary Features Included:"
echo ""
echo "✨ VISUAL DESIGN:"
echo "   • Matrix code rain background animation"
echo "   • Animated mesh gradient overlays"
echo "   • Cyberpunk neon color scheme"
echo "   • Holographic card effects with 3D transforms"
echo "   • Glitch effects and neon text animations"
echo ""

echo "🚀 INTERACTIVE ELEMENTS:"
echo "   • Terminal boot sequence animation"
echo "   • Live terminal with working commands"
echo "   • Custom cyber cursor with trails"
echo "   • Typewriter effects for dynamic text"
echo "   • 3D floating tech stack icons"
echo ""

echo "⚡ MODERN TECHNOLOGIES:"
echo "   • CSS mesh gradients (2024 trend)"
echo "   • Advanced keyframe animations"
echo "   • Intersection Observer API"
echo "   • CSS custom properties system"
echo "   • Hardware-accelerated transformations"
echo ""

echo "🎵 SPECIAL FEATURES:"
echo "   • Interactive terminal commands (try 'help')"
echo "   • Konami code easter egg (↑↑↓↓←→←→BA)"
echo "   • Subtle sci-fi audio effects"
echo "   • Performance optimization modes"
echo "   • Mobile-responsive design"
echo ""

echo "🎯 DEVOPS THEMED CONTENT:"
echo "   • System status displays"
echo "   • Terminal command interfaces"
echo "   • DevOps skill visualizations"
echo "   • Infrastructure project showcases"
echo "   • Live terminal activity simulation"
echo ""

read -p "Press Enter to start the local demo server..."

if command -v python3 &> /dev/null; then
    echo ""
    echo "🚀 Starting Matrix Terminal Portfolio on http://localhost:8000"
    echo ""
    echo "💡 Try these commands in the terminal:"
    echo "   • help - View available commands"
    echo "   • about - Learn about Francesc"
    echo "   • skills - View technical skills"
    echo "   • projects - See project portfolio"
    echo "   • contact - Get contact information"
    echo ""
    echo "🎮 Easter Eggs:"
    echo "   • Try the Konami code for Matrix overdrive mode!"
    echo "   • Hover over holographic cards for 3D effects"
    echo "   • Watch the Matrix rain adapt to your actions"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 Starting Matrix Terminal Portfolio on http://localhost:8000"
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. Please install Python to run the demo server."
    echo "📁 You can open index.html directly in your browser instead."
fi