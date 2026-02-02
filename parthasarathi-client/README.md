# PARTHASARATHI MUSICAL – FRONTEND CHEAT SHEET


3. FRONTEND TECH STACK

---

Core Framework: Vite 5.x - React 18.x - TypeScript 5.x - Tailwind CSS 3.x
UI & Design System: shadcn/ui - Radix UI - Lucide React - Framer Motion - React Three Fiber - Recharts
State Management: TanStack Query v5 - Zustand - React Context
Data Fetching: Axios - TanStack Query
Forms & Validation: React Hook Form - Zod - @hookform/resolvers
Routing: React Router v6 - React Helmet Async
Utilities & Integrations: Cloudinary SDK - Razorpay/Stripe - jsPDF/react-pdf - india-pincode-lookup - React Leaflet - Socket.io Client - Sonner - Clerk/Auth0 - React Error Boundary - date-fns
Development Tools: ESLint - Prettier - Husky - lint-staged - Vitest - React Testing Library - Playwright
Build & Optimization: vite-plugin-compression - vite-imagetools - @vitejs/plugin-react-swc


5. PAGE-WISE FONT USAGE

---

HOME PAGE
HOME PAGE
├─ Hero Section
│ ├─ Main headline: font-brand (DM Serif Display 400, 4rem)
│ ├─ Subheading: font-ui (Manrope 400, 1.25rem)
│ └─ CTA button: font-ui (Manrope 600, 1rem)
│
├─ Featured Collections
│ ├─ Section title: font-brand (DM Serif Display 400, 3rem)
│ ├─ Product names: font-ui (Manrope 600, 1.125rem)
│ └─ Prices: font-ui (Manrope 600, 1.25rem)
│
└─ Testimonials / About
├─ Quote text: font-content (Libre Baskerville 400 italic, 1.25rem)
└─ Author name: font-helper (Outfit 600, 0.875rem)

PRODUCT LISTING PAGE
├─ Page title: font-brand (DM Serif Display 400, 2.5rem)
├─ Filters & categories: font-helper (Outfit 500, 0.9rem)
├─ Product cards
│ ├─ Product name: font-ui (Manrope 600, 1rem)
│ ├─ Short description: font-ui (Manrope 400, 0.875rem)
│ ├─ Price: font-ui (Manrope 700, 1.125rem)
│ └─ Badges (Sale, New): font-helper (Outfit 600, 0.75rem uppercase)
└─ Pagination: font-ui (Manrope 500, 0.9rem)

PRODUCT DETAIL PAGE
├─ Product name: font-brand (DM Serif Display 400, 2.5rem)
├─ SKU & metadata: font-helper (Outfit 400, 0.875rem)
├─ Price: font-ui (Manrope 700, 2rem)
├─ Short summary: font-ui (Manrope 400, 1.125rem)
├─ Full description: font-content (Libre Baskerville 400, 1rem)
├─ Specifications table
│ ├─ Labels: font-helper (Outfit 600, 0.875rem)
│ └─ Values: font-ui (Manrope 400, 0.875rem)
├─ Reviews
│ ├─ Review text: font-ui (Manrope 400, 1rem)
│ └─ Reviewer name: font-helper (Outfit 500, 0.875rem)
└─ Buttons: font-ui (Manrope 600, 1rem)

CART & CHECKOUT
├─ Page title: font-brand (DM Serif Display 400, 2.5rem)
├─ Product names: font-ui (Manrope 600, 1rem)
├─ Quantities & prices: font-ui (Manrope 500, 0.9rem)
├─ Form labels: font-ui (Manrope 500, 0.875rem)
├─ Form inputs: font-ui (Manrope 400, 1rem)
├─ Validation errors: font-ui (Manrope 500, 0.875rem)
├─ Total pricing: font-ui (Manrope 700, 1.5rem)
└─ Payment button: font-ui (Manrope 700, 1.125rem)

BLOG / CONTENT PAGES
├─ Article title: font-content (Libre Baskerville 700, 2.5rem)
├─ Subtitle: font-content (Libre Baskerville 400 italic, 1.25rem)
├─ Body paragraphs: font-content (Libre Baskerville 400, 1.0625rem)
├─ Section headings: font-ui (Manrope 600, 1.5rem)
├─ Metadata (date, author): font-helper (Outfit 400, 0.875rem)
├─ Blockquotes: font-content (Libre Baskerville 400 italic, 1.125rem)
└─ Read more link: font-ui (Manrope 600, 0.9375rem)

NAVIGATION & FOOTER
├─ Logo: font-brand (DM Serif Display 400 italic, 1.75rem)
├─ Menu links: font-ui (Manrope 500, 0.9375rem)
├─ Footer headings: font-ui (Manrope 600, 1rem)
├─ Footer links: font-ui (Manrope 400, 0.875rem)
└─ Copyright: font-helper (Outfit 400, 0.8125rem)


7. RECOMMENDED FRONTEND FILE STRUCTURE

---

src/
├── assets/
│ ├── images/ # Static images
│ ├── icons/ # Custom SVG icons
│ └── fonts/ # Self-hosted fonts (if needed)
│
├── components/
│ ├── ui/ # shadcn/ui components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── dialog.tsx
│ │ └── ...
│ ├── layout/ # Layout components
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ ├── Sidebar.tsx
│ │ └── PageLayout.tsx
│ ├── common/ # Reusable components
│ │ ├── LoadingSpinner.tsx
│ │ ├── ErrorBoundary.tsx
│ │ ├── SEO.tsx
│ │ └── Breadcrumbs.tsx
│ ├── product/ # Product-specific
│ │ ├── ProductCard.tsx
│ │ ├── ProductGrid.tsx
│ │ ├── ProductDetail.tsx
│ │ ├── ProductFilters.tsx
│ │ └── ProductReviews.tsx
│ ├── cart/
│ │ ├── CartItem.tsx
│ │ ├── CartSummary.tsx
│ │ └── MiniCart.tsx
│ └── forms/
│ ├── CheckoutForm.tsx
│ ├── AddressForm.tsx
│ └── PaymentForm.tsx
│
├── pages/
│ ├── Home.tsx
│ ├── Products.tsx
│ ├── ProductDetail.tsx
│ ├── Cart.tsx
│ ├── Checkout.tsx
│ ├── OrderConfirmation.tsx
│ ├── About.tsx
│ ├── Contact.tsx
│ ├── Blog.tsx
│ └── BlogPost.tsx
│
├── hooks/ # Custom React hooks
│ ├── useCart.ts
│ ├── useAuth.ts
│ ├── useDebounce.ts
│ ├── useMediaQuery.ts
│ └── useLocalStorage.ts
│
├── store/ # Zustand stores
│ ├── cartStore.ts
│ ├── uiStore.ts
│ └── userStore.ts
│
├── services/ # API services
│ ├── api.ts # Axios instance
│ ├── productService.ts
│ ├── orderService.ts
│ ├── authService.ts
│ └── paymentService.ts
│
├── lib/ # Third-party configs
│ ├── queryClient.ts # TanStack Query
│ ├── cloudinary.ts
│ └── razorpay.ts
│
├── utils/ # Utility functions
│ ├── formatters.ts # Price, date formatting
│ ├── validators.ts # Custom validation
│ ├── constants.ts # App constants
│ └── helpers.ts
│
├── types/ # TypeScript types
│ ├── product.ts
│ ├── order.ts
│ ├── user.ts
│ └── index.ts
│
├── styles/
│ ├── globals.css # Global styles
│ └── tailwind.css # Tailwind imports
│
├── App.tsx
├── main.tsx
├── router.tsx # Route definitions
└── vite-env.d.ts

8. COMPONENT ARCHITECTURE BEST PRACTICES

---

COMPONENT DESIGN PRINCIPLES
✓ Single Responsibility: Each component does one thing well
✓ Composition over inheritance
✓ Props over configuration objects
✓ Controlled components for forms
✓ Error boundaries around risky components

NAMING CONVENTIONS

- PascalCase for components: ProductCard.tsx
- camelCase for utilities: formatPrice.ts
- kebab-case for CSS/files: product-card.module.css
- SCREAMING_SNAKE_CASE for constants: MAX_CART_ITEMS

PROP PATTERNS
// Good: Clear, typed props
interface ProductCardProps {
product: Product
onAddToCart: (id: string) => void
showQuickView?: boolean
}

// Avoid: Vague or untyped props
interface CardProps {
data: any
onClick: Function
}

COMPONENT STRUCTURE
import { FC } from 'react'
import { cn } from '@/lib/utils'

// 1. Types/Interfaces
interface ComponentProps {
className?: string
}

// 2. Component
export const Component: FC<ComponentProps> = ({ className }) => {
// 3. Hooks
// 4. Event handlers
// 5. Derived state
// 6. Effects (minimal)

// 7. Render
return (

<div className={cn('base-classes', className)}>
{/_ JSX _/}
</div>
)
}

9. PERFORMANCE OPTIMIZATION

---

IMAGE OPTIMIZATION
✓ Use Cloudinary for automatic format detection (WebP, AVIF)
✓ Implement lazy loading: loading="lazy"
✓ Responsive images: srcset and sizes
✓ Blur-up placeholders with LQIP (Low Quality Image Placeholder)

<img
  src="https://res.cloudinary.com/.../image.jpg"
  srcSet="...w_400.jpg 400w, ...w_800.jpg 800w"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  alt="Product name"
/>

CODE SPLITTING
✓ Route-based splitting with React.lazy
✓ Component-based splitting for heavy modules

import { lazy, Suspense } from 'react'
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))

<Suspense fallback={<LoadingSpinner />}>
<ProductDetail />
</Suspense>

BUNDLE SIZE
✓ Analyze with vite-plugin-bundle-visualizer
✓ Tree-shake unused code
✓ Import only what you need from libraries

// Bad
import \_ from 'lodash'

// Good
import debounce from 'lodash/debounce'

STATE MANAGEMENT
✓ Use TanStack Query for server state (products, orders)
✓ Use Zustand for client state (cart, UI preferences)
✓ Avoid prop drilling with composition

RENDERING OPTIMIZATION
✓ Memoize expensive calculations with useMemo
✓ Prevent re-renders with React.memo
✓ Optimize lists with proper key props
✓ Virtual scrolling for long lists (react-virtual)

10. ACCESSIBILITY (A11Y) CHECKLIST

---

SEMANTIC HTML
✓ Use proper heading hierarchy (H1 → H6)
✓ <button> for actions, <a> for navigation
✓ <nav>, <main>, <aside>, <footer>
✓ Form labels with htmlFor

COLOR CONTRAST
✓ Minimum 4.5:1 for normal text (WCAG AA)
✓ Minimum 3:1 for large text (18px+)
✓ Test with tools: WebAIM Contrast Checker

KEYBOARD NAVIGATION
✓ All interactive elements focusable
✓ Visible focus indicators
✓ Logical tab order
✓ Escape to close modals
✓ Enter/Space to activate buttons

ARIA ATTRIBUTES
✓ aria-label for icon buttons
✓ aria-expanded for dropdowns
✓ aria-live for dynamic content
✓ aria-hidden for decorative elements

SCREEN READER TESTING
✓ Test with NVDA (Windows) or VoiceOver (Mac)
✓ Alternative text for all images
✓ Skip navigation links
✓ Descriptive link text (avoid "click here")

FORMS
✓ Clear error messages
✓ Associate errors with fields (aria-describedby)
✓ Required field indicators
✓ Input type="email", type="tel", etc.

11. SEO BEST PRACTICES

---

META TAGS (React Helmet Async)
<Helmet>

  <title>Sitar | Premium Musical Instruments | Parthasarathi</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
  <meta property="og:image" content="..." />
  <link rel="canonical" href="..." />
</Helmet>

STRUCTURED DATA (JSON-LD)

- Product schema for product pages
- BreadcrumbList for navigation
- Organization schema for homepage

URL STRUCTURE
✓ /products/sitars/professional-sitar-rosewood
✓ /blog/how-to-maintain-tabla
✗ /product?id=12345

PERFORMANCE
✓ Core Web Vitals optimization
✓ Server-side rendering (consider Remix/Next.js)
✓ Preload critical resources

SITEMAP & ROBOTS
✓ Generate sitemap.xml
✓ Configure robots.txt
✓ Submit to Google Search Console

12. SECURITY BEST PRACTICES

---

✓ Sanitize user inputs (DOMPurify for rich text)
✓ HTTPS only (enforce in production)
✓ Content Security Policy headers
✓ Secure cookie settings (httpOnly, secure, sameSite)
✓ Rate limiting on API calls
✓ Input validation on frontend AND backend
✓ No sensitive data in localStorage (use httpOnly cookies)
✓ Regular dependency updates (npm audit)

13. TESTING STRATEGY

---

UNIT TESTS (Vitest)

- Utility functions
- Custom hooks
- Pure components

COMPONENT TESTS (React Testing Library)

- User interactions
- Conditional rendering
- Props validation

E2E TESTS (Playwright)

- Critical user flows
  - Product search → Add to cart → Checkout
  - User registration → Login → Profile update
  - Payment flow

COVERAGE GOALS
✓ 80%+ for utility functions
✓ 70%+ for components
✓ 100% for critical paths (checkout, payment)

14. DEPLOYMENT & CI/CD

---

BUILD OPTIMIZATION
✓ Production build: npm run build
✓ Preview build: npm run preview
✓ Environment variables (.env.production)

HOSTING OPTIONS

- Vercel (recommended for Vite/React)
- Netlify
- AWS S3 + CloudFront
- Cloudflare Pages

CI/CD PIPELINE

1. Lint (ESLint)
2. Type check (TypeScript)
3. Test (Vitest)
4. Build
5. Deploy to staging
6. E2E tests
7. Deploy to production

MONITORING
✓ Error tracking: Sentry
✓ Analytics: Google Analytics 4
✓ Performance: Lighthouse CI

15. DESIGN SYSTEM GOLDEN RULES

---

TYPOGRAPHY
✓ EB Garamond defines the soul—use for emotional impact
✓ Plus Jakarta Sans runs the UI—use for clarity and function
✓ Libre Baskerville tells the story—use for immersive reading
✓ Outfit supports clarity—use for labels and metadata
✓ Consistency > creativity—stick to the system

SPACING SCALE (Tailwind)

- 0.5 (2px) → Tight inline spacing
- 1 (4px) → Icon gaps
- 2 (8px) → Component internal padding
- 4 (16px) → Standard spacing between elements
- 6 (24px) → Section padding
- 8 (32px) → Large component spacing
- 12 (48px) → Section margins
- 16 (64px) → Hero section padding

COMPONENT CONSISTENCY
✓ Same button styles across pages
✓ Consistent card shadows and borders
✓ Unified form input styling
✓ Standardized spacing patterns

RESPONSIVE BREAKPOINTS

- sm: 640px (Mobile landscape)
- md: 768px (Tablet)
- lg: 1024px (Desktop)
- xl: 1280px (Large desktop)
- 2xl: 1536px (Extra large)

DESIGN TOKENS

- Use CSS variables for colors
- Define spacing in Tailwind config
- Centralize border radius, shadows

16. CONTENT GUIDELINES

---

PRODUCT DESCRIPTIONS
✓ Write in active voice
✓ Highlight key features (3–5 bullet points)
✓ Include dimensions, materials, origin
✓ Add care instructions
✓ Use font-content (Libre Baskerville) for long descriptions

MICROCOPY
✓ Clear error messages: "Email is required" not "Invalid input"
✓ Action-oriented CTAs: "Start Shopping" not "Click Here"
✓ Helpful empty states: "Your cart is empty. Explore our collection."

TONE OF VOICE

- Professional yet approachable
- Respectful of classical music heritage
- Educational when needed
- Avoid jargon unless explaining instruments

17. QUICK REFERENCE

---

COMMON TAILWIND CLASSES

- font-brand text-5xl font-bold → Hero title
- font-ui text-base font-normal → Body text
- font-content text-lg leading-relaxed → Article text
- font-helper text-sm font-medium → Labels

- bg-maroon-500 text-ivory → Primary button
- border-2 border-gold-400 → Gold accent
- shadow-lg hover:shadow-xl → Card elevation

COMPONENT IMPORTS
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'

API CALL PATTERN (TanStack Query)
const { data, isLoading, error } = useQuery({
queryKey: ['products', categoryId],
queryFn: () => productService.getByCategory(categoryId),
staleTime: 5 _ 60 _ 1000, // 5 minutes
})

==========================================
END OF CHEAT SHEET
==========================================

REMEMBER:
✓ User experience first
✓ Performance matters
✓ Accessibility is not optional
✓ Test before shipping
✓ Document as you build
✓ Consistency creates trust

For questions or updates, refer to:

- Official docs: docs.parthasarathimusical.com
- Design system: Figma link
- Component library: Storybook link
