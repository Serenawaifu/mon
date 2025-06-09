wulu/
├── .env.example
├── .gitignore
├── README.md
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-browser.js
├── gatsby-ssr.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── deploy.sh
├── public/
│   └── mascot.svg
│   └── logo.png
├── src/
│   ├── assets/
│   │   └── themes/
│   │       ├── retro-pixel.png
│   │       ├── sakura-blossom.png
│   │       ├── cyberpunk-neon.png
│   │       ├── minimal-light.png
│   │       └── cozy-cafe.png
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── AuthForm.js
│   │   │   └── WalletConnectButton.js
│   │   ├── Carousel/
│   │   │   └── Carousel.js
│   │   ├── Comments/
│   │   │   └── CommentsSection.js
│   │   ├── Forum/
│   │   │   ├── ForumBoard.js
│   │   │   ├── ForumPost.js
│   │   │   └── RichTextEditor.js
│   │   ├── Layout/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── ThemeSwitcher.js
│   │   ├── Marketplace/
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   └── ProductCard.js
│   │   ├── Player/
│   │   │   └── VideoPlayer.js
│   │   ├── Reader/
│   │   │   └── MangaReader.js
│   │   ├── Search/
│   │   │   └── SearchBar.js
│   │   └── Theme/
│   │       └── ThemeProvider.js
│   ├── constants/
│   │   └── themes.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useAnimeAPI.js
│   │   ├── useMangaAPI.js
│   │   ├── useForum.js
│   │   ├── useMarketplace.js
│   │   └── useTheme.js
│   ├── lib/
│   │   ├── api/
│   │   │   ├── anilist.js
│   │   │   ├── anidb.js
│   │   │   ├── kitsu.js
│   │   │   ├── mal.js
│   │   │   └── googleSearch.js
│   │   ├── firebase.js
│   │   ├── recaptcha.js
│   │   └── stripe.js
│   ├── pages/
│   │   ├── _app.js
│   │   ├── 404.js
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── anime.js
│   │   ├── manga.js
│   │   ├── manhwa.js
│   │   ├── anime/
│   │   │   └── [id].js
│   │   ├── manga/
│   │   │   └── [id].js
│   │   ├── manhwa/
│   │   │   └── [id].js
│   │   ├── forum.js
│   │   ├── forum/
│   │   │   └── [board].js
│   │   ├── marketplace.js
│   │   ├── checkout.js
│   │   ├── reader/
│   │   │   └── [id].js
│   │   └── player/
│   │       └── [id].js
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── format.js
│       ├── rating.js
│       └── scroll.js
└── static/
    └── favicon.ico
Explanation of Key Folders/Files
Top Level
.env.example — All API keys (MAL, AniDB, AniList, Kitsu, Firebase, Google, Stripe, Razorpay, etc)
gatsby-config.js — Gatsby config, plugins, env
tailwind.config.js — Tailwind theme config
deploy.sh — Static build & deploy to GitHub Pages
src/assets/themes/
PNG previews for each theme (used in theme switcher)
src/components/
Auth/ — All authentication UIs (Google, email, WalletConnect)
Carousel/ — Horizontal scrollable carousels for anime/manga/manhwa
Comments/ — Firestore-backed comments section
Forum/ — Reddit-style forum, posts, rich text editor
Layout/ — Header, footer, theme switcher, mascot overlay, etc
Marketplace/ — Product cards, cart, checkout
Player/ — Video player (HLS.js/Video.js)
Reader/ — Infinite-scroll manga reader
Search/ — Global search bar
Theme/ — ThemeProvider, context, etc
src/constants/
themes.js — Theme definitions (colors, names, etc)
src/hooks/
Custom React hooks for auth, APIs, forum, marketplace, theme, etc
src/lib/api/
anilist.js — AniList GraphQL API wrapper
anidb.js — AniDB HTTP API wrapper
kitsu.js — Kitsu API wrapper
mal.js — MyAnimeList REST API wrapper
googleSearch.js — Google Custom Search for cover art
Each API module exports functions that return fallback/empty data if API is not configured or fails
src/lib/
firebase.js — Firebase init, auth, Firestore utils
recaptcha.js — reCAPTCHA v3 integration
stripe.js — Stripe.js integration
src/pages/
index.js — Homepage: hero, carousels, mascot, etc
auth.js — Authentication page
anime.js, manga.js, manhwa.js — Catalog pages
anime/[id].js, manga/[id].js, manhwa/[id].js — Detail pages
forum.js, forum/[board].js — Forum main and board pages
marketplace.js, checkout.js — Marketplace and checkout
reader/[id].js — Manga reader
player/[id].js — Video player
src/styles/
global.css — Tailwind base + custom styles
src/utils/
Utility functions (formatting, rating, scroll, etc)
    
