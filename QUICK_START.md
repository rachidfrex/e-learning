# E-Learn AI - Quick Start Guide

## 🎉 Your Website is Live!

Visit: **http://localhost:5174/**

## ✅ What's Been Created

### Pages
1. **Landing Page** (`/`) - Main homepage with:
   - Hero section with Gendarmerie badge
   - AI features showcase
   - Course carousel
   - Testimonials
   - CTA section

2. **Sign In Page** (`/signin`) - Authentication with:
   - Email & password form
   - Social login (Google, Facebook)
   - Remember me option
   - Animated inputs

### Features Implemented

#### 🌓 Theme Toggle
- Click the sun/moon icon in the navbar
- Switches between dark and light mode
- Preference saved in localStorage

#### 🌍 Language Switcher
- Click the globe icon in the navbar
- Switch between:
  - 🇬🇧 English
  - 🇫🇷 Français
  - 🇲🇦 العربية (with RTL support)
- All text updates instantly

#### 🎨 Premium Animations
- Smooth page transitions
- Hover effects on cards
- Floating elements
- Icon rotations
- Scale animations

#### 📱 Responsive Design
- Mobile-first approach
- Hamburger menu on mobile
- Optimized for all screen sizes

## 🚀 Quick Actions

### Change Theme
```javascript
// In any component
import { useTheme } from '../contexts/ThemeContext';
const { theme, toggleTheme } = useTheme();
```

### Change Language
```javascript
// In any component
import { useTranslation } from 'react-i18next';
const { t, i18n } = useTranslation();
i18n.changeLanguage('fr'); // 'en', 'fr', or 'ar'
```

### Add New Translation
Edit `src/i18n/locales/en.json`:
```json
{
  "newKey": {
    "title": "My New Title"
  }
}
```

Use in component:
```javascript
{t('newKey.title')}
```

### Add New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

### Customize Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#00ffbb", // Change this!
}
```

## 📂 File Structure

```
src/
├── components/
│   ├── Navbar.jsx      ← Navigation bar
│   └── Footer.jsx      ← Footer
├── contexts/
│   └── ThemeContext.jsx ← Dark/Light mode
├── i18n/
│   ├── config.js       ← i18n setup
│   └── locales/        ← Translations
│       ├── en.json
│       ├── fr.json
│       └── ar.json
├── pages/
│   ├── LandingPage.jsx ← Home page
│   └── SignInPage.jsx  ← Login page
├── App.jsx             ← Routing
└── main.jsx            ← Entry point
```

## 🎨 Design Tokens

### Colors
```css
Primary: #00ffbb (Cyan)
Dark BG: #0f231e (Deep green-black)
Light BG: #f5f8f8 (Soft white)
Card Dark: #17362d (Medium green)
Border: #2e6b5b (Subtle green)
```

### Fonts
```css
Font: 'Lexend', sans-serif
Weights: 400, 500, 700, 800, 900
```

## 🛠️ Common Tasks

### Add Animation
```javascript
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Content
</motion.div>
```

### Add Icon
```javascript
import { Icon } from 'lucide-react';
<Icon size={24} className="text-primary" />
```

### Link to Page
```javascript
import { Link } from 'react-router-dom';
<Link to="/page">Click Me</Link>
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use the auto-selected port (5174)
```

### Styles Not Updating
```bash
# Restart dev server
Ctrl+C
npm run dev
```

### Translation Not Working
1. Check key exists in all language files
2. Verify syntax: `t('key.subkey')`
3. Restart dev server

## 📦 Build for Production

```bash
npm run build
```

Output in `dist/` folder - ready to deploy!

## 🚀 Next Steps

1. ✅ Landing Page - DONE
2. ✅ Sign In Page - DONE
3. 🔄 Add more pages:
   - Dashboard
   - Course Details
   - Profile Page
   - Settings
4. 🔄 Backend Integration:
   - API endpoints
   - Authentication
   - Database
5. 🔄 Advanced Features:
   - Video player
   - Quiz system
   - Progress tracking
   - Certificates

## 💡 Tips

- All animations are customizable in components
- Theme and language persist across sessions
- Mobile menu auto-closes on navigation
- Images are placeholder URLs - replace with real images
- Tailwind IntelliSense extension recommended for VS Code

## 📞 Need Help?

- Check console for errors (F12)
- Review component files for examples
- Framer Motion docs: https://www.framer.com/motion/
- Tailwind docs: https://tailwindcss.com/
- i18next docs: https://www.i18next.com/

---

**Happy Coding! 🎉**
Built for Gendarmerie Royale of Morocco 🇲🇦
