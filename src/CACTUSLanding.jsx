import React, { useState } from "react";

export default function CACTUSLanding() {
  const TOKEN = {
    name: "CACTUScoin",
    symbol: "CACT",
    address: "EQBC7NMrOBIZFX_mB8QqQozG9wg04BcOd_P-HvtFy7bssSnN",
    // Оригинальный логотип CACTUScoin (локальный файл)
    image: "/cactus-original.png",
    // Простой резервный логотип если оригинал не загрузится
    fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Ccircle cx='48' cy='48' r='40' fill='%2310b981'/%3E%3Ctext x='48' y='58' text-anchor='middle' fill='white' font-size='20' font-weight='bold'%3ECACT%3C/text%3E%3C/svg%3E",
  };

  // Отладочная информация
  console.log('Token image path:', TOKEN.image);

  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  // Простой компонент изображения с fallback
  const SafeImage = ({ src, alt, className, fallback }) => {
    const [imgError, setImgError] = useState(false);

    return (
      <img 
        src={imgError ? fallback : src}
        alt={alt}
        className={className}
        onError={() => {
          console.log('Image failed to load:', src);
          setImgError(true);
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', src);
          setImgError(false);
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60 bg-neutral-900/70 border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <SafeImage src={TOKEN.image} alt="CACT logo" className="h-7 w-7 sm:h-8 sm:w-8 rounded" fallback={TOKEN.fallbackImage} />
            <span className="font-semibold tracking-wide text-sm sm:text-base">{TOKEN.name} · ${TOKEN.symbol}</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#how" className="hover:text-white">How to Buy</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-neutral-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-800 bg-neutral-900/95 backdrop-blur">
            <nav className="px-4 py-3 space-y-2">
              <a 
                href="#about" 
                className="block py-2 text-neutral-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#how" 
                className="block py-2 text-neutral-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                How to Buy
              </a>
              <a 
                href="#faq" 
                className="block py-2 text-neutral-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-24 grid gap-6 sm:gap-8 md:gap-10 items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight">
            CACTUScoin <span className="text-emerald-400">${TOKEN.symbol}</span>
          </h1>
          <p className="mt-2 sm:mt-4 text-sm sm:text-base text-neutral-300 max-w-prose mx-auto px-2">
            The TON community coin: simple, transparent, without unnecessary noise. All information on this page is for reference only — verify details before buying.
          </p>

          {/* Two-column layout: CA block left, logo right */}
          <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center max-w-6xl mx-auto">
            {/* CA block - left side */}
            <div className="order-2 md:order-1 rounded-2xl border border-emerald-600 bg-neutral-900 p-4 sm:p-6 shadow-lg">
              <div className="text-xs sm:text-sm uppercase text-emerald-400 font-bold tracking-wide">CA:</div>
              <div className="mt-2 font-mono text-xs sm:text-sm break-all bg-neutral-800 p-2 sm:p-3 rounded-lg">{TOKEN.address}</div>
              <div className="mt-3 flex flex-col gap-2">
                <button onClick={() => copy(TOKEN.address)} className="w-full px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold">
                  {copied ? "Copied" : "Copy address"}
                </button>
                <a className="w-full text-center px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-400 text-sm font-semibold" target="_blank" rel="noreferrer" href="https://tonviewer.com/EQBC7NMrOBIZFX_mB8QqQozG9wg04BcOd_P-HvtFy7bssSnN">
                  Open in Tonviewer
                </a>
              </div>
            </div>

            {/* Logo - right side */}
            <div className="order-1 md:order-2 relative flex justify-center">
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-emerald-500/10 blur-3xl" />
              <img src={TOKEN.image} alt="CACTUScoin" className="relative h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96 rounded-2xl shadow-2xl ring-1 ring-neutral-800 object-contain" onError={(e) => {
                console.log('Main image failed to load:', TOKEN.image);
                e.target.src = TOKEN.fallbackImage;
              }} onLoad={() => console.log('Main image loaded:', TOKEN.image)} />
            </div>
          </div>

        </div>
      </section>

      {/* Running text */}
      <div className="relative w-full overflow-hidden py-4 bg-emerald-500">
        <div className="animate-marquee-infinite whitespace-nowrap text-black font-extrabold text-2xl">
          <span className="inline-block">$CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · </span>
          <span className="inline-block">$CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · $CACT · </span>
        </div>
      </div>
      <style>{`
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          animation: marquee-infinite 12.5s linear infinite;
        }
      `}</style>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">What is {TOKEN.name}?</h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-300">
              {TOKEN.name} (${TOKEN.symbol}) is a jetton on the TON network. The token is created for the community and
              experiments with on‑chain mechanics. No promises of profit — DYOR.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <h3 className="font-semibold text-sm sm:text-base">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm text-emerald-300">
              <li><a target="_blank" className="hover:underline" href="https://tonviewer.com/EQBC7NMrOBIZFX_mB8QqQozG9wg04BcOd_P-HvtFy7bssSnN">Tonviewer</a></li>
              <li><a target="_blank" className="hover:underline" href="https://dexscreener.com/ton/EQDLJaOH47dHDWSyqs_9PyLSFdIasOtgCBIm1wvX3u2PtaMw">Dexscreener</a></li>
              <li><a target="_blank" className="hover:underline" href="https://t.me/CACTUScoinCTO">Telegram</a></li>
              <li><a target="_blank" className="hover:underline" href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to buy */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">How to Buy</h2>
        <ol className="mt-4 space-y-3 sm:space-y-4 text-sm sm:text-base text-neutral-300 list-decimal list-inside">
          <li className="pl-2">Install Tonkeeper, TonSpace in OKX, or MyTonWallet.</li>
          <li className="pl-2">Top up TON (via exchange/on‑ramp).</li>
          <li className="pl-2">
            Use <a target="_blank" rel="noreferrer" href="https://dedust.io/ru/swap/TON/EQBC7NMrOBIZFX_mB8QqQozG9wg04BcOd_P-HvtFy7bssSnN" className="text-emerald-400 hover:underline">DeDust</a> to swap TON → {TOKEN.symbol} using the CA.
          </li>
          <li className="pl-2">Check the transaction in Tonviewer and make sure the jetton appeared in your wallet.</li>
        </ol>
      </section>

      {/* Socials */}
      <section id="socials" className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Community</h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-300">Join us — news, announcements, and activities.</p>
        <div className="mt-4 sm:mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
          <a target="_blank" href="https://t.me/CACTUScoinCTO" className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-medium hover:bg-emerald-400 text-sm sm:text-base">Telegram</a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">FAQ</h2>
        <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[
            {
              q: "Is there any profit guarantee?",
              a: "No. The token was created for the community and experiments. Do your own research (DYOR).",
            },
            {
              q: "How to add the token to a wallet?",
              a: "In Tonkeeper the jetton will appear automatically after the first transaction. If needed, add it manually using the master address.",
            },
            {
              q: "Taxes and risks?",
              a: "Check your local regulations. All actions are performed at your own risk.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
              <div className="font-semibold text-sm sm:text-base">{item.q}</div>
              <div className="mt-2 text-xs sm:text-sm text-neutral-300">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 md:py-10 text-xs sm:text-sm text-neutral-400">
          <div className="flex flex-col gap-4">
            {/* Logo and name */}
            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
              <SafeImage src={TOKEN.image} alt="CACT logo" className="h-5 w-5 sm:h-6 sm:w-6 rounded" fallback={TOKEN.fallbackImage} />
              <div className="text-sm sm:text-base">{TOKEN.name} · ${TOKEN.symbol}</div>
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
              <a className="hover:text-white transition-colors" target="_blank" href="https://dexscreener.com/ton/EQDLJaOH47dHDWSyqs_9PyLSFdIasOtgCBIm1wvX3u2PtaMw">Dexscreener</a>
              <a className="hover:text-white transition-colors" target="_blank" href="https://t.me/CACTUScoinCTO">Telegram</a>
            </div>
            
            {/* Copyright */}
            <div className="text-center md:text-left text-xs text-neutral-500 leading-relaxed">
              © {new Date().getFullYear()} {TOKEN.name}. All rights reserved.<br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>This site is for informational purposes only and is not financial advice.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
