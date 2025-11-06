# ZAYNA Store - Project TODO

## Phase 1: Setup & Infrastructure
- [x] Initialize project with static frontend template
- [x] Copy ZAYNA logo to public assets
- [x] Configure global styles (dark/gold theme)
- [x] Add Arabic and English fonts (Noto Kufi Arabic, Playfair Display)
- [x] Set up language context and i18n utilities

## Phase 2: Homepage & Product Grid
- [x] Create Header component with logo, language toggle, and search
- [x] Create ProductCard component with hover effects
- [x] Implement product grid layout
- [x] Add fade-in animation on scroll
- [x] Set up product data structure (JSON/localStorage)
- [x] Display products from data source

## Phase 3: Product Detail Page
- [x] Create ProductDetail page component
- [x] Display product image (large)
- [x] Add video player for product videos
- [x] Show product name, description, price
- [x] Add quantity selector
- [x] Implement WhatsApp purchase button with message template
- [x] Add multi-currency support (SAR, EGP, AED)

## Phase 4: Admin Panel
- [x] Create hidden admin page (trigger with "adminZAYNA" search code)
- [x] Build product form (name, price, description, image upload)
- [x] Implement image upload to localStorage/public folder
- [x] Add video URL input field
- [x] Create "Add Product" functionality
- [x] Update products.json or localStorage on submit
- [x] Verify new products appear on homepage

## Phase 5: Multi-Currency Support
- [x] Add currency selector in header
- [x] Implement currency conversion logic
- [x] Display prices in selected currency (SAR, EGP, AED)
- [x] Save currency preference to localStorage

## Phase 6: Polish & Optimization
- [x] Add loading splash screen with ZAYNA logo
- [x] Implement smooth transitions and animations
- [x] Add hover effects (gold shadow, color inversion on buttons)
- [x] Ensure RTL/LTR support for both languages
- [x] Test responsive design (mobile, tablet, desktop)
- [x] Optimize images and performance
- [x] Test WhatsApp integration across devices

## Phase 7: Testing & Deployment
- [x] Test all features in browser
- [x] Verify language switching works correctly
- [x] Test product CRUD operations
- [x] Verify WhatsApp message generation
- [x] Test on mobile devices
- [x] Create checkpoint
- [x] Deploy to production (Ready for publishing via UI)


## Phase 8: Light Mode & Theme Switching
- [x] Create light mode theme (white background, gold accents)
- [x] Add theme toggle button in header
- [x] Update CSS variables for light mode
- [x] Ensure light mode works with both languages
- [x] Test theme persistence in localStorage

## Phase 9: Country Selection System
- [x] Create CountryContext for managing selected country
- [x] Add country selector component in header
- [x] Support 4 countries: Saudi Arabia, Egypt, UAE, Iraq
- [x] Map countries to currencies (SAR, EGP, AED, IQD)
- [x] Save country preference to localStorage

## Phase 10: Product Country Management
- [x] Update Product type to include country field
- [x] Add country selector in admin panel
- [x] Filter products by selected country on homepage
- [x] Update product detail page to show country-specific info
- [x] Ensure products only appear in their assigned country

## Phase 11: Currency Management by Country
- [x] Add currency conversion rates for all 4 countries
- [x] Auto-select currency based on selected country
- [x] Update price display based on country/currency
- [x] Update admin panel to show currency per country
- [x] Test currency conversion for all countries

## Phase 12: Final Testing & Deployment
- [x] Test light/dark mode switching
- [x] Test country selection functionality
- [x] Verify products filter by country correctly
- [x] Test currency conversion for all countries
- [x] Test on mobile and desktop
- [x] Create final checkpoint
- [x] Deploy updated version (Ready for publishing via UI)


## Phase 13: Product ID System & Search
- [x] Generate unique product ID for each product
- [x] Add product ID field to Product interface
- [x] Display product ID in admin panel
- [x] Simplify WhatsApp message to only include greeting and product ID
- [x] Implement search by product ID functionality
- [x] Update search handler to filter products by ID
- [x] Display search results for product ID matches
- [x] Test product ID generation and search
