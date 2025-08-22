# 🏃‍♂️ The Mimic Tycoon - Speedrun Leaderboard

A **modern, beautiful, and fully responsive** speedrun leaderboard for The Mimic Tycoon game. Built with cutting-edge web technologies and designed for the best user experience.

![The Mimic Tycoon Speedrun](https://img.shields.io/badge/Game-The%20Mimic%20Tycoon-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge)

## ✨ **Features**

### 🎮 **Game Content**
- **4 Main Chapters** (Chapter 1-4) with Normal/Nightmare modes
- **3 Gamemodes** (Witch Trials, Jigoku, Christmas Trials) with Normal/Nightmare modes  
- **4 Legacy Chapters** (Legacy 1-4) with Normal/Nightmare modes
- **Top 3 Runs** displayed for each category with medal indicators 🥇🥈🥉

### 🎨 **Design & UX**
- **Modern Glassmorphism Design** with beautiful gradients and shadows
- **Smooth Animations** and transitions throughout the interface
- **Responsive Layout** that works perfectly on all devices
- **Interactive Toggle System** for Normal/Nightmare difficulties
- **Beautiful Typography** using Inter and JetBrains Mono fonts
- **Custom Scrollbars** and selection styling

### 🚀 **Technical Features**
- **ES6+ Class-based Architecture** with clean, maintainable code
- **Intersection Observer API** for performance-optimized animations
- **Keyboard Navigation** (Press 1, 2, 3 to navigate sections)
- **Fallback Data System** ensures the page always works
- **Modern CSS Variables** for easy theming and customization
- **Font Awesome Icons** for enhanced visual appeal

## 🚀 **Quick Start**

### **Option 1: Python Local Server (Recommended)**
```bash
# Navigate to project folder
cd TheMimicTycoon

# Start server (Python 3)
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Open browser to: http://localhost:8000
```

### **Option 2: VS Code Live Server**
1. Install **"Live Server"** extension in VS Code
2. Right-click on `index.html`
3. Select **"Open with Live Server"**

### **Option 3: Node.js**
```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server

# Open browser to displayed URL
```

## 📁 **Project Structure**

```
TheMimicTycoon/
├── 📄 index.html          # Main HTML structure
├── 🎨 styles.css          # Modern CSS with variables and animations
├── ⚡ script.js           # ES6+ Class-based JavaScript
├── 📊 data.json           # Speedrun data (runs, times, players)
└── 📖 README.md           # This documentation
```

## 🎯 **Why You Need a Local Server**

The page won't work if you just double-click `index.html` because:
- **CORS restrictions** prevent loading `data.json` from local files
- **Security policies** block `fetch()` requests to local files
- **Browser limitations** for security reasons

## 🎮 **How to Use**

### **Navigation**
- **Main Chapters**: Click the "Main Chapters" tab or press `1`
- **Gamemodes**: Click the "Gamemodes" tab or press `2`  
- **Legacy Chapters**: Click the "Legacy Chapters" tab or press `3`

### **Difficulty Toggle**
- Each chapter/gamemode has **Normal** and **Nightmare** buttons
- **Normal** is selected by default
- Click to switch between difficulties
- Only one difficulty is shown at a time for better organization

### **Viewing Runs**
- **Top 3 runs** are displayed for each category
- **Medal indicators** show 1st 🥇, 2nd 🥈, and 3rd 🥉 place
- **Times are sorted** fastest to slowest
- **Video links** open in new tabs when available

## 📊 **Data Format**

The `data.json` file contains all speedrun records:

```json
{
  "chapters": {
    "chapter1": {
      "normal": [
        {
          "runnerName": "PlayerName",
          "time": "12:34",
          "date": "2024-01-15",
          "video": "https://youtube.com/watch?v=..."
        }
      ],
      "nightmare": [...]
    }
  }
}
```

### **Adding New Runs**
1. **Edit `data.json`** in any text editor
2. **Add new run objects** to the appropriate arrays
3. **Save the file** and refresh your browser
4. **Runs automatically sort** by time (fastest first)

## 🎨 **Customization**

### **Colors & Theme**
Edit CSS variables in `styles.css`:
```css
:root {
  --accent-primary: #4f46e5;    /* Main accent color */
  --accent-secondary: #7c3aed;  /* Secondary accent */
  --accent-tertiary: #ec4899;   /* Tertiary accent */
  --primary-bg: #0a0a0f;       /* Background color */
}
```

### **Layout & Spacing**
Adjust spacing variables:
```css
:root {
  --spacing-lg: 2rem;           /* Large spacing */
  --spacing-xl: 3rem;           /* Extra large spacing */
  --spacing-2xl: 4rem;          /* Double extra large */
}
```

### **Typography**
Change fonts in CSS variables:
```css
:root {
  --font-primary: 'Inter', sans-serif;      /* Main font */
  --font-mono: 'JetBrains Mono', monospace; /* Monospace font */
}
```

## 🌐 **Browser Support**

| Browser | Support | Notes |
|---------|---------|-------|
| **Chrome** | ✅ Full | Best experience |
| **Edge** | ✅ Full | Best experience |
| **Firefox** | ✅ Full | Best experience |
| **Safari** | ✅ Full | Best experience |
| **Mobile** | ✅ Full | Responsive design |

## 📱 **Mobile Responsive**

The page automatically adapts to:
- **Desktop** (1200px+): Full grid layout with optimal spacing
- **Tablet** (768px-1199px): Adjusted spacing and layout
- **Mobile** (<768px): Single column layout with touch-friendly buttons

## 🛠️ **Troubleshooting**

### **No Runs Showing?**
1. **Check browser console** (F12 → Console tab)
2. **Ensure you're using a local server** (not just opening the file)
3. **Verify `data.json` exists** in the same folder
4. **Check for JavaScript errors** in console

### **Toggle Buttons Not Working?**
1. **Check if JavaScript is enabled**
2. **Look for console errors**
3. **Verify the HTML structure is intact**
4. **Try refreshing the page**

### **Console Errors?**
- **CORS errors** = You need a local server
- **404 errors** = Check if `data.json` exists
- **JavaScript errors** = Check browser compatibility

## 🚀 **Performance Features**

- **Intersection Observer** for scroll-based animations
- **Staggered animations** for smooth loading
- **CSS transforms** for hardware acceleration
- **Efficient DOM manipulation** with minimal reflows
- **Lazy loading** of animations and effects

## 🎯 **Keyboard Shortcuts**

| Key | Action |
|-----|--------|
| `1` | Navigate to Main Chapters |
| `2` | Navigate to Gamemodes |
| `3` | Navigate to Legacy Chapters |
| `Escape` | Close any open modals |

## 🔧 **Developer Features**

### **Console Commands**
```javascript
// Get current application state
speedrunLeaderboard.getCurrentState()

// Refresh data
speedrunLeaderboard.refreshData()

// Check total categories
speedrunLeaderboard.getTotalCategories()
```

### **Debug Mode**
- **Console logging** for all major operations
- **Performance metrics** for animations
- **Error handling** with fallback systems
- **State management** for debugging

## 🎨 **Design Philosophy**

- **Minimalist yet engaging** interface
- **Consistent spacing** and typography
- **Smooth animations** that enhance UX
- **Accessible color contrasts** for readability
- **Modern glassmorphism** effects
- **Responsive design** for all devices

## 🚨 **Important Notes**

- **Always use a local server** - don't just open the HTML file
- **Keep `data.json` in the same folder** as the HTML file
- **Check browser console** for any error messages
- **Test on different devices** to ensure responsiveness
- **Backup your `data.json`** before making major changes

## 🆘 **Still Having Issues?**

1. **Check the console** for error messages
2. **Verify all files** are in the same folder
3. **Ensure you're using a local server**
4. **Try a different browser** to isolate issues
5. **Check file permissions** and access rights

## 🤝 **Contributing**

Feel free to:
- **Report bugs** or issues
- **Suggest improvements** to the design
- **Add new features** or functionality
- **Improve the documentation**

## 📄 **License**

This project is open source and available under the MIT License.

---

## 🎉 **Ready to Speedrun?**

Your beautiful, modern speedrun leaderboard is ready! Just start a local server and open `index.html` to see it in action.

**Happy Speedrunning! 🏃‍♂️⚡**

---

*Built with ❤️ using modern web technologies*
