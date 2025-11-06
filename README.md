# E-Learn AI - Gendarmerie Royale of Morocco

A professional, military-grade e-learning platform built specifically for the Gendarmerie Royale of Morocco. This platform features AI-powered learning, multilingual support (English, French, Arabic), and premium animations for an exceptional user experience.

## 🌟 Features

### Core Functionality
- **🌓 Dark/Light Mode Toggle** - Seamless theme switching with persistent preferences
- **🌍 Multi-Language Support** - Full support for English, French, and Arabic (with RTL support)
- **🤖 AI-Powered Learning** - Personalized AI tutors available 24/7
- **🎮 Gamified Challenges** - Interactive quizzes and challenges to boost engagement
- **📊 Comprehensive Dashboards** - Detailed progress tracking for students and instructors
- **🎨 Premium Animations** - Smooth Framer Motion animations throughout the app
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🔒 Professional Authentication** - Secure sign-in with social login options

### Technical Stack
- **React 19** - Modern React with hooks and context API
- **Vite** - Lightning-fast development and build tool
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready animation library
- **React Router DOM** - Client-side routing
- **i18next** - Internationalization framework
- **Lucide React** - Beautiful, consistent icons

## 🚀 Getting Started

The development server is currently running at: **http://localhost:5174/**

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server (already running!)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
e-learning/
├── src/
│   ├── components/        # Navbar, Footer
│   ├── contexts/          # ThemeContext
│   ├── i18n/              # Translations (EN, FR, AR)
│   ├── pages/             # LandingPage, SignInPage
│   ├── App.jsx            # Main app with routing
│   └── index.css          # Tailwind styles
├── tailwind.config.js     # Custom theme configuration
└── package.json           # Dependencies
```

## 🎨 Key Features

### 1. Landing Page (`/`)
- Animated hero section with Gendarmerie badge
- Features grid with hover effects
- Course showcase
- Testimonials section
- Call-to-action with animations

### 2. Sign In Page (`/signin`)
- Split-screen design
- Animated form inputs
- Social login (Google, Facebook)
- Remember me functionality
- Responsive mobile design

### 3. Navigation
- Sticky header with blur effect
- Theme toggle (Dark/Light)
- Language selector (🇬🇧 🇫🇷 🇲🇦)
- Mobile hamburger menu

## 🌐 Language Support

Click the globe icon to switch languages:
- **English** - Default
- **Français** - French translations
- **العربية** - Arabic with RTL support

All translations are in `src/i18n/locales/`

## 🎨 Theme Colors

- **Primary:** `#00ffbb` (Vibrant cyan)
- **Dark Background:** `#0f231e`
- **Light Background:** `#f5f8f8`
- **Accent:** `#17362d`

Edit `tailwind.config.js` to customize.

## 📱 Responsive Design

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload 'dist' folder
```

## 📝 Environment Variables

Create `.env`:
```env
VITE_API_URL=your_api_url
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_FACEBOOK_APP_ID=your_app_id
```

## 🎯 Premium Animations

Built with Framer Motion:
- Fade in/out transitions
- Hover scale effects
- Smooth page transitions
- Floating elements
- Icon rotations

## 🛠️ Customization

### Add New Page
1. Create in `src/pages/`
2. Add route in `App.jsx`
3. Link from Navbar

### Add Translation
1. Edit `src/i18n/locales/[lang].json`
2. Use: `t('your.key')`

## 📄 License

Proprietary - Gendarmerie Royale of Morocco 🇲🇦

---

**Built with ❤️ for the Gendarmerie Royale of Morocco**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
