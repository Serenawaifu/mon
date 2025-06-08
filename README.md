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
