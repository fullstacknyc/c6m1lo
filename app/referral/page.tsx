const referrals = [
  {
    name: "GoMining",
    href: "https://gomining.com/?ref=BM4W812",
    description: "Cloud mining platform referral link.",
  },
  {
    name: "TrustDice Faucet",
    href: "https://trustdice.win/faucet/?ref=u_camgoat",
    description: "Crypto faucet referral link.",
  },
  {
    name: "Coinbase",
    href: "https://coinbase.com/join/ZXD8P8E?src=referral-link",
    description: "Exchange referral program link.",
  }
];

export default function ReferralPage() {
  return (
    <div className="page-wrap">
      <section className="panel p-8 sm:p-10">
        <span className="kicker">Referrals</span>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Referral Programs</h1>
        <p className="muted mt-4 max-w-2xl">
          External links are listed here for convenience. Please review each provider&apos;s terms
          before using any offer.
        </p>
        <div className="mt-8 space-y-4">
          {referrals.map((item) => (
            <article key={item.name} className="info-card">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="muted mt-1">{item.description}</p>
              <a className="primary-link mt-3" href={item.href} target="_blank" rel="noreferrer">
                Open link →
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
