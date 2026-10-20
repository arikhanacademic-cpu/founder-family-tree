// Founder Family Tree — dataset
// Every founder→parent link carries a public source URL. Figures are publicly reported only.
// "value" = latest publicly reported valuation, exit price or market cap (dates vary — see valueLabel).
// "funding" = total funding where publicly reported; "sum of announced rounds" where we added reported rounds ourselves.
// events: [year, "ipo" | "acq" | "shut"] drive the time-lapse colours.

window.FFT_DATA = {
  asOf: "2026-10-15",
  asOfLabel: "15 Oct 2026",
  parents: [
    { id: "Meta",     label: "META",     note: "Incl. Facebook and FAIR" },
    { id: "Google",   label: "GOOGLE",   note: "Incl. Google Brain; DeepMind shown separately" },
    { id: "DeepMind", label: "DEEPMIND", note: "Incl. Google DeepMind" },
    { id: "PayPal",   label: "PAYPAL",   note: "Incl. X.com / Confinity era" },
    { id: "Stripe",   label: "STRIPE",   note: "" },
    { id: "Revolut",  label: "REVOLUT",  note: "" }
  ],
  startups: [
  // ───────────────────────── PayPal family ─────────────────────────
  { name: "YouTube", year: 2005, country: "United States", sector: "Consumer",
    desc: "Video-sharing platform where users upload, watch and share videos.",
    status: "acquired", statusDetail: "Acquired by Google, 2006", events: [[2006, "acq"]],
    unicorn: true, funding: null, value: 1.65e9, valueYear: 2006, valueLabel: "Acquired by Google for $1.65B (2006)", valueSrc: "https://en.wikipedia.org/wiki/YouTube",
    founders: [
      { n: "Chad Hurley", p: ["PayPal"], r: "Early employee (designer)", s: "https://en.wikipedia.org/wiki/YouTube", st: "YouTube — Wikipedia" },
      { n: "Steve Chen", p: ["PayPal"], r: "Engineer", s: "https://en.wikipedia.org/wiki/YouTube", st: "YouTube — Wikipedia" },
      { n: "Jawed Karim", p: ["PayPal"], r: "Engineer", s: "https://en.wikipedia.org/wiki/Jawed_Karim", st: "Jawed Karim — Wikipedia" } ] },

  { name: "LinkedIn", year: 2002, country: "United States", sector: "Social",
    desc: "Professional social network for profiles, job listings and recruiting.",
    status: "acquired", statusDetail: "IPO 2011; acquired by Microsoft, 2016", events: [[2011, "ipo"], [2016, "acq"]],
    unicorn: true, funding: null, value: 2.62e10, valueYear: 2016, valueLabel: "Acquired by Microsoft for $26.2B (2016)", valueSrc: "https://news.microsoft.com/announcement/microsoft-buys-linkedin/",
    founders: [ { n: "Reid Hoffman", p: ["PayPal"], r: "Executive vice president", s: "https://greylock.com/team/reid-hoffman/", st: "Reid Hoffman — Greylock" } ] },

  { name: "Yelp", year: 2004, country: "United States", sector: "Consumer",
    desc: "Crowdsourced reviews and listings for local businesses.",
    status: "ipo", statusDetail: "Listed on NYSE, March 2012", events: [[2012, "ipo"]],
    unicorn: true, funding: null, value: 1.05e9, valueYear: 2026, valueLabel: "Market cap ~$1.05B (Oct 2026)", valueSrc: "https://companiesmarketcap.com/yelp/marketcap/",
    founders: [
      { n: "Jeremy Stoppelman", p: ["PayPal"], r: "VP of technology", s: "https://en.wikipedia.org/wiki/Yelp", st: "Yelp — Wikipedia" },
      { n: "Russel Simmons", p: ["PayPal"], r: "Engineer", s: "https://en.wikipedia.org/wiki/Yelp", st: "Yelp — Wikipedia" } ] },

  { name: "Palantir", year: 2003, country: "United States", sector: "Data & Analytics",
    desc: "Data-integration and analytics software for governments and enterprises.",
    status: "ipo", statusDetail: "Direct listing on NYSE, Sept 2020", events: [[2020, "ipo"]],
    unicorn: true, funding: null, value: 4.83e11, valueYear: 2026, valueLabel: "Market cap ~$483B (Oct 2026)", valueSrc: "https://companiesmarketcap.com/palantir/marketcap/",
    founders: [
      { n: "Peter Thiel", p: ["PayPal"], r: "Co-founder & CEO", s: "https://foundersfund.com/team/peter-thiel/", st: "Peter Thiel — Founders Fund" },
      { n: "Nathan Gettings", p: ["PayPal"], r: "Engineer", s: "https://en.wikipedia.org/wiki/Palantir_Technologies", st: "Palantir Technologies — Wikipedia" } ] },

  { name: "Affirm", year: 2012, country: "United States", sector: "Fintech",
    desc: "Buy-now-pay-later lender offering point-of-sale instalment loans.",
    status: "ipo", statusDetail: "Listed on Nasdaq, January 2021", events: [[2021, "ipo"]],
    unicorn: true, funding: null, value: 2.379e10, valueYear: 2026, valueLabel: "Market cap ~$23.8B (Oct 2026)", valueSrc: "https://companiesmarketcap.com/affirm/marketcap/",
    founders: [
      { n: "Max Levchin", p: ["PayPal", "Google"], r: "PayPal co-founder & CTO; Google VP of Engineering after the Slide deal (2010–11)", s: "https://en.wikipedia.org/wiki/Max_Levchin", st: "Max Levchin — Wikipedia" },
      { n: "Nathan Gettings", p: ["PayPal"], r: "Engineer", s: "https://en.wikipedia.org/wiki/Palantir_Technologies", st: "Palantir Technologies — Wikipedia" } ] },

  { name: "Yammer", year: 2008, country: "United States", sector: "Enterprise",
    desc: "Enterprise social network for internal company communication.",
    status: "acquired", statusDetail: "Acquired by Microsoft, 2012", events: [[2012, "acq"]],
    unicorn: true, funding: null, value: 1.2e9, valueYear: 2012, valueLabel: "Acquired by Microsoft for $1.2B cash (2012)", valueSrc: "https://techcrunch.com/2012/06/25/its-official-microsoft-confirms-it-has-acquired-yammer-for-1-2-billion-in-cash/",
    founders: [ { n: "David Sacks", p: ["PayPal"], r: "COO", s: "https://www.craftventures.com/team/david-sacks", st: "David Sacks — Craft Ventures" } ] },

  { name: "SpaceX", year: 2002, country: "United States", sector: "Space & Hardware",
    desc: "Builds and launches reusable rockets and spacecraft; runs Starlink.",
    status: "ipo", statusDetail: "Listed on Nasdaq (SPCX), 12 June 2026; merged with xAI Feb 2026", events: [[2026, "ipo"]],
    unicorn: true, funding: null, value: 1.77e12, valueYear: 2026, valueLabel: "Valuation at IPO pricing $1.77T (June 2026)", valueSrc: "https://en.wikipedia.org/wiki/Initial_public_offering_of_SpaceX",
    founders: [ { n: "Elon Musk", p: ["PayPal"], r: "Co-founder & CEO of X.com, which became PayPal", s: "https://en.wikipedia.org/wiki/Elon_Musk", st: "Elon Musk — Wikipedia" } ] },

  { name: "xAI", year: 2023, country: "United States", sector: "AI",
    desc: "AI lab behind the Grok language models.",
    status: "acquired", statusDetail: "Acquired by SpaceX (all-stock), Feb 2026", events: [[2026, "acq"]], absorbedInto: "SpaceX",
    unicorn: true, funding: null, value: 2.5e11, valueYear: 2026, valueLabel: "Valued at $250B in SpaceX all-stock deal (Feb 2026)", valueSrc: "https://en.wikipedia.org/wiki/XAI_(company)",
    founders: [
      { n: "Elon Musk", p: ["PayPal"], r: "Co-founder & CEO of X.com, which became PayPal", s: "https://en.wikipedia.org/wiki/Elon_Musk", st: "Elon Musk — Wikipedia" },
      { n: "Igor Babuschkin", p: ["DeepMind"], r: "Researcher", s: "https://en.wikipedia.org/wiki/XAI_(company)", st: "xAI — Wikipedia" } ] },

  { name: "Inflection AI", year: 2022, country: "United States", sector: "AI",
    desc: "Builds language models; known for the Pi assistant, now enterprise-focused.",
    status: "active", statusDetail: "Independent; Microsoft hired most staff and licensed its models for $650M in 2024", events: [],
    unicorn: true, funding: 1.525e9, fundingLabel: "Sum of announced rounds", fundingSrc: "https://techcrunch.com/2023/06/29/inflection-ai-lands-1-3b-investment-to-build-more-personal-ai/",
    value: 4.0e9, valueYear: 2023, valueLabel: "Valuation $4B (June 2023 round)", valueSrc: "https://techcrunch.com/2023/06/29/inflection-ai-lands-1-3b-investment-to-build-more-personal-ai/",
    founders: [
      { n: "Reid Hoffman", p: ["PayPal"], r: "Executive vice president", s: "https://greylock.com/team/reid-hoffman/", st: "Reid Hoffman — Greylock" },
      { n: "Mustafa Suleyman", p: ["DeepMind", "Google"], r: "DeepMind co-founder; later Google VP (AI product & policy)", s: "https://www.cnbc.com/2022/03/08/reid-hoffman-has-set-up-a-new-ai-company-with-deepminds-co-founder.html", st: "CNBC, 8 Mar 2022" },
      { n: "Karén Simonyan", p: ["DeepMind"], r: "Researcher (AlphaZero, AlphaFold)", s: "https://www.cnbc.com/2022/03/08/reid-hoffman-has-set-up-a-new-ai-company-with-deepminds-co-founder.html", st: "CNBC, 8 Mar 2022" } ] },

  { name: "Opendoor", year: 2014, country: "United States", sector: "Consumer",
    desc: "Makes instant cash offers on homes and resells them.",
    status: "ipo", statusDetail: "Listed via SPAC merger, Dec 2020 (Nasdaq: OPEN)", events: [[2020, "ipo"]],
    unicorn: true, funding: null, value: 2.18e9, valueYear: 2026, valueLabel: "Market cap ~$2.2B (Oct 2026)", valueSrc: "https://companiesmarketcap.com/opendoor/marketcap/",
    founders: [ { n: "Keith Rabois", p: ["PayPal"], r: "EVP, business development", s: "https://en.wikipedia.org/wiki/Keith_Rabois", st: "Keith Rabois — Wikipedia" } ] },

  { name: "Personal Capital", year: 2009, country: "United States", sector: "Fintech",
    desc: "Wealth-management and personal-finance dashboard with robo-advice.",
    status: "acquired", statusDetail: "Acquired by Empower, 2020", events: [[2020, "acq"]],
    unicorn: false, funding: null, value: 8.25e8, valueYear: 2020, valueLabel: "Acquired by Empower for $825M + up to $175M earn-out (2020)", valueSrc: "https://www.forbes.com/sites/jeffkauflin/2020/06/29/robo-advisor-personal-capital-to-be-acquired-for-up-to-1-billion/",
    founders: [ { n: "Bill Harris", p: ["PayPal"], r: "CEO", s: "https://techcrunch.com/2011/09/20/bill-harris-launches-personal-capital/", st: "TechCrunch, 20 Sept 2011" } ] },

  { name: "Slide", year: 2004, country: "United States", sector: "Social",
    desc: "Photo slideshow widgets and social apps for MySpace and Facebook.",
    status: "acquired", statusDetail: "Acquired by Google, 2010", events: [[2010, "acq"]],
    unicorn: false, funding: null, value: 1.82e8, valueYear: 2010, valueLabel: "Acquired by Google for $182M (2010)", valueSrc: "https://techcrunch.com/2010/08/04/google-buys-slide-for-182-million-getting-more-serious-about-social-games/",
    founders: [ { n: "Max Levchin", p: ["PayPal"], r: "Co-founder & CTO", s: "https://www.forbes.com/profile/max-levchin/", st: "Max Levchin — Forbes" } ] },

  { name: "Geni", year: 2006, country: "United States", sector: "Consumer",
    desc: "Collaborative genealogy site building a shared world family tree.",
    status: "acquired", statusDetail: "Acquired by MyHeritage, 2012 (price undisclosed)", events: [[2012, "acq"]],
    unicorn: false, funding: null, value: null,
    founders: [ { n: "David Sacks", p: ["PayPal"], r: "COO", s: "https://techcrunch.com/2007/01/12/paypal-pulp-fiction-and-geni/", st: "TechCrunch, 12 Jan 2007" } ] },

  // ───────────────────────── Google family ─────────────────────────
  { name: "Instagram", year: 2010, country: "United States", sector: "Social",
    desc: "Photo and video sharing social network.",
    status: "acquired", statusDetail: "Acquired by Facebook, 2012", events: [[2012, "acq"]],
    unicorn: true, funding: 5.75e7, fundingLabel: "Sum of reported rounds", fundingSrc: "https://en.wikipedia.org/wiki/Instagram",
    value: 1.0e9, valueYear: 2012, valueLabel: "Acquired by Facebook for $1B (2012)", valueSrc: "https://en.wikipedia.org/wiki/Instagram",
    founders: [ { n: "Kevin Systrom", p: ["Google"], r: "Product marketing (Gmail, Calendar, Docs)", s: "https://en.wikipedia.org/wiki/Kevin_Systrom", st: "Kevin Systrom — Wikipedia" } ] },

  { name: "Pinterest", year: 2009, country: "United States", sector: "Consumer",
    desc: "Visual discovery service for saving ideas to pinboards.",
    status: "ipo", statusDetail: "Listed on NYSE, April 2019", events: [[2019, "ipo"]],
    unicorn: true, funding: null, value: 1.2e10, valueYear: 2019, valueLabel: "~$12B around its April 2019 IPO (press estimate)", valueSrc: "https://en.wikipedia.org/wiki/Pinterest",
    founders: [ { n: "Ben Silbermann", p: ["Google"], r: "Employee", s: "https://thenextweb.com/insider/2013/05/30/pinterests-ben-silbermann-on-turning-his-collection-hobby-into-a-product-and-not-making-money/", st: "The Next Web, 30 May 2013" } ] },

  { name: "Twitter", year: 2006, country: "United States", sector: "Social",
    desc: "Short-form social network, now called X.",
    status: "acquired", statusDetail: "IPO 2013; taken private by Elon Musk 2022; now part of SpaceX via xAI", events: [[2013, "ipo"], [2022, "acq"]], absorbedInto: "SpaceX",
    unicorn: true, funding: null, value: 4.4e10, valueYear: 2022, valueLabel: "Acquired for ~$44B (2022)", valueSrc: "https://en.wikipedia.org/wiki/Twitter,_Inc.",
    founders: [ { n: "Evan Williams", p: ["Google"], r: "Joined via Blogger acquisition (2003–04)", s: "https://en.wikipedia.org/wiki/Evan_Williams_(Internet_entrepreneur)", st: "Evan Williams — Wikipedia" } ] },

  { name: "Foursquare", year: 2009, country: "United States", sector: "Data & Analytics",
    desc: "Location technology company that began as a check-in app.",
    status: "active", statusDetail: "Operating; runs Swarm and a location-data business", events: [],
    unicorn: false, funding: null, value: null,
    founders: [ { n: "Dennis Crowley", p: ["Google"], r: "Joined via Dodgeball acquisition (2005–07)", s: "https://en.wikipedia.org/wiki/Dodgeball_(service)", st: "Dodgeball — Wikipedia" } ] },

  { name: "Character.AI", year: 2021, country: "United States", sector: "AI",
    desc: "Consumer app for chatting with customisable AI characters.",
    status: "active", statusDetail: "Independent; Google licensed its tech and rehired the founders in 2024", events: [],
    unicorn: true, funding: 1.93e8, fundingLabel: "Sum of announced rounds", fundingSrc: "https://en.wikipedia.org/wiki/Character.ai",
    value: 1.0e9, valueYear: 2023, valueLabel: "Valued at ~$1B (March 2023)", valueSrc: "https://www.nytimes.com/2023/03/23/technology/chatbot-characterai-chatgpt-valuation.html",
    founders: [
      { n: "Noam Shazeer", p: ["Google"], r: "Engineer (2000–21); Transformer co-author", s: "https://en.wikipedia.org/wiki/Noam_Shazeer", st: "Noam Shazeer — Wikipedia" },
      { n: "Daniel De Freitas", p: ["Google"], r: "Engineer; led Meena/LaMDA", s: "https://en.wikipedia.org/wiki/Daniel_De_Freitas", st: "Daniel De Freitas — Wikipedia" } ] },

  { name: "Cohere", year: 2019, country: "Canada", sector: "AI",
    desc: "Large language models and AI tools for businesses.",
    status: "active", statusDetail: "Private; merger agreement with Aleph Alpha signed Sept 2026, pending approval", events: [],
    unicorn: true, funding: 1.535e9, fundingLabel: "Sum of announced venture rounds", fundingSrc: "https://en.wikipedia.org/wiki/Cohere",
    value: 7.0e9, valueYear: 2025, valueLabel: "Valued at ~$7B (Sept 2025)", valueSrc: "https://www.bloomberg.com/news/articles/2025-09-24/nvidia-backed-cohere-valued-at-7-billion-as-new-capital-flows-in",
    founders: [
      { n: "Aidan Gomez", p: ["Google"], r: "Google Brain; Transformer co-author", s: "https://en.wikipedia.org/wiki/Aidan_Gomez", st: "Aidan Gomez — Wikipedia" },
      { n: "Nick Frosst", p: ["Google"], r: "Google Brain researcher (2016–20)", s: "https://en.wikipedia.org/wiki/Nick_Frosst", st: "Nick Frosst — Wikipedia" } ] },

  { name: "Anthropic", year: 2021, country: "United States", sector: "AI",
    desc: "AI safety and research company that builds the Claude models.",
    status: "active", statusDetail: "Private; confidentially filed for IPO, June 2026", events: [],
    unicorn: true, funding: null, value: 9.65e11, valueYear: 2026, valueLabel: "Valued at $965B, Series H (May 2026, per Reuters)", valueSrc: "https://en.wikipedia.org/wiki/Anthropic",
    founders: [
      { n: "Dario Amodei", p: ["Google"], r: "Senior research scientist, Google Brain", s: "https://www.darioamodei.com/", st: "Dario Amodei — personal site" },
      { n: "Chris Olah", p: ["Google"], r: "Google Brain research scientist (to 2018)", s: "https://en.wikipedia.org/wiki/Chris_Olah", st: "Chris Olah — Wikipedia" } ] },

  { name: "Adept", year: 2022, country: "United States", sector: "AI",
    desc: "AI agents that operate software to complete tasks.",
    status: "active", statusDetail: "Operating; founders and part of team joined Amazon in 2024 under a licensing deal", events: [],
    unicorn: false, funding: 4.15e8, fundingLabel: "Sum of announced rounds", fundingSrc: "https://www.adept.ai/blog/series-b", value: null,
    founders: [
      { n: "David Luan", p: ["Google"], r: "Tech lead, Google Brain large models", s: "https://techcrunch.com/2022/04/26/2304039/", st: "TechCrunch, 26 Apr 2022" },
      { n: "Ashish Vaswani", p: ["Google"], r: "Google Brain researcher; Transformer co-author", s: "https://en.wikipedia.org/wiki/Ashish_Vaswani", st: "Ashish Vaswani — Wikipedia" } ] },

  { name: "Sakana AI", year: 2023, country: "Japan", sector: "AI",
    desc: "Tokyo lab building nature-inspired foundation models.",
    status: "active", statusDetail: "Private; Series B Nov 2025", events: [],
    unicorn: true, funding: 4.12e8, fundingLabel: "Total raised (company)", fundingSrc: "https://sakana.ai/series-b/",
    value: 2.7e9, valueYear: 2025, valueLabel: "~$2.7B post-money, Series B (Nov 2025)", valueSrc: "https://sakana.ai/series-b/",
    founders: [
      { n: "David Ha", p: ["Google"], r: "Google Brain researcher", s: "https://en.wikipedia.org/wiki/David_Ha", st: "David Ha — Wikipedia" },
      { n: "Llion Jones", p: ["Google"], r: "Google Research; Transformer co-author", s: "https://en.wikipedia.org/wiki/Llion_Jones", st: "Llion Jones — Wikipedia" } ] },

  { name: "Glean", year: 2019, country: "United States", sector: "Enterprise",
    desc: "AI search and assistant platform for company knowledge.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: true, funding: 7.65e8, fundingLabel: "Sum of announced rounds", fundingSrc: "https://en.wikipedia.org/wiki/Glean_Technologies",
    value: 7.2e9, valueYear: 2025, valueLabel: "Valued at $7.2B, Series F (June 2025)", valueSrc: "https://en.wikipedia.org/wiki/Glean_Technologies",
    founders: [
      { n: "Arvind Jain", p: ["Google"], r: "Distinguished engineer", s: "https://www.glean.com/about", st: "About — Glean" },
      { n: "Tony Gentilcore", p: ["Google"], r: "Engineer (search)", s: "https://www.glean.com/about", st: "About — Glean" },
      { n: "T.R. Vishwanath", p: ["Meta"], r: "Worked at Facebook", s: "https://www.glean.com/about", st: "About — Glean" } ] },

  { name: "OpenAI", year: 2015, country: "United States", sector: "AI",
    desc: "Builds large AI models and products such as ChatGPT.",
    status: "active", statusDetail: "Private; filed for IPO June 2026, since delayed to 2027", events: [],
    unicorn: true, funding: null, value: 8.52e11, valueYear: 2026, valueLabel: "$852B post-money (2026 round)", valueSrc: "https://en.wikipedia.org/wiki/OpenAI",
    founders: [
      { n: "Greg Brockman", p: ["Stripe"], r: "CTO (2010–15)", s: "https://en.wikipedia.org/wiki/Greg_Brockman", st: "Greg Brockman — Wikipedia" },
      { n: "Ilya Sutskever", p: ["Google"], r: "Research scientist, Google Brain (2013–15)", s: "https://en.wikipedia.org/wiki/Ilya_Sutskever", st: "Ilya Sutskever — Wikipedia" } ] },

  // ───────────────────────── Meta family ─────────────────────────
  { name: "Asana", year: 2008, country: "United States", sector: "Enterprise",
    desc: "Work-management software for planning and tracking projects.",
    status: "ipo", statusDetail: "Direct listing on NYSE, 2020", events: [[2020, "ipo"]],
    unicorn: true, funding: null, value: null,
    founders: [
      { n: "Dustin Moskovitz", p: ["Meta"], r: "Facebook co-founder; first CTO", s: "https://en.wikipedia.org/wiki/Dustin_Moskovitz", st: "Dustin Moskovitz — Wikipedia" },
      { n: "Justin Rosenstein", p: ["Meta", "Google"], r: "Facebook engineering lead; earlier Google PM", s: "https://en.wikipedia.org/wiki/Justin_Rosenstein", st: "Justin Rosenstein — Wikipedia" } ] },

  { name: "Quora", year: 2009, country: "United States", sector: "Social",
    desc: "Question-and-answer site.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: true, funding: null, value: 2.0e9, valueYear: 2019, valueLabel: "~$2B valuation (May 2019)", valueSrc: "https://www.vox.com/recode/2019/5/16/18627157/quora-value-billion-question-answer",
    founders: [
      { n: "Adam D'Angelo", p: ["Meta"], r: "Facebook CTO (2006–08)", s: "https://venturebeat.com/2008/05/11/facebook-cto-adam-dangelo-to-leave-or-at-least-take-an-extended-vacation/", st: "VentureBeat, 11 May 2008" },
      { n: "Charlie Cheever", p: ["Meta"], r: "Engineering manager", s: "http://fortune.com/2016/08/23/charlie-cheever-y-combinator/", st: "Fortune, 23 Aug 2016" } ] },

  { name: "Path", year: 2010, country: "United States", sector: "Social",
    desc: "Mobile social network for a small circle of close friends.",
    status: "shutdown", statusDetail: "Acquired by Kakao 2015; service shut down Oct 2018", events: [[2015, "acq"], [2018, "shut"]],
    unicorn: false, funding: null, value: null,
    founders: [ { n: "Dave Morin", p: ["Meta"], r: "Senior platform manager (Platform, Connect)", s: "https://en.wikipedia.org/wiki/Dave_Morin", st: "Dave Morin — Wikipedia" } ] },

  { name: "Mistral AI", year: 2023, country: "France", sector: "AI",
    desc: "Open-weight and commercial language models for businesses and governments.",
    status: "active", statusDetail: "Independent; €3B Series D, Sept 2026", events: [],
    unicorn: true, funding: null, value: 2.44e10, valueYear: 2026, valueLabel: "€21B+ post-money, Series D (Sept 2026); ≈$24.4B converted, estimate", valueSrc: "https://techcrunch.com/2026/09/08/mistral-raises-e3b-as-sovereign-ai-becomes-big-business/",
    founders: [
      { n: "Arthur Mensch", p: ["DeepMind"], r: "Research scientist, DeepMind Paris", s: "https://techcrunch.com/2023/06/13/frances-mistral-ai-blows-in-with-a-113m-seed-round-at-a-260m-valuation-to-take-on-openai/", st: "TechCrunch, 13 June 2023" },
      { n: "Guillaume Lample", p: ["Meta"], r: "Researcher, Meta AI Paris (LLaMA)", s: "https://techcrunch.com/2023/06/13/frances-mistral-ai-blows-in-with-a-113m-seed-round-at-a-260m-valuation-to-take-on-openai/", st: "TechCrunch, 13 June 2023" },
      { n: "Timothée Lacroix", p: ["Meta"], r: "Researcher, Meta AI Paris", s: "https://techcrunch.com/2023/06/13/frances-mistral-ai-blows-in-with-a-113m-seed-round-at-a-260m-valuation-to-take-on-openai/", st: "TechCrunch, 13 June 2023" } ] },

  { name: "Statsig", year: 2021, country: "United States", sector: "Devtools",
    desc: "A/B testing, feature flags and product analytics.",
    status: "acquired", statusDetail: "Acquired by OpenAI, Sept 2025", events: [[2025, "acq"]], absorbedInto: "OpenAI",
    unicorn: true, funding: 1.53e8, fundingLabel: "Total raised (GeekWire)", fundingSrc: "https://www.geekwire.com/2025/statsig-lands-100m-at-1-1b-valuation-aiming-to-unify-product-development-as-ai-upends-industry/",
    value: 1.1e9, valueYear: 2025, valueLabel: "$1.1B acquisition by OpenAI (Sept 2025)", valueSrc: "https://techcrunch.com/2025/09/02/openai-acquires-product-testing-startup-statsig-and-shakes-up-its-leadership-team/",
    founders: [ { n: "Vijaye Raji", p: ["Meta"], r: "Engineering leader for 10 years", s: "https://www.geekwire.com/2025/statsig-lands-100m-at-1-1b-valuation-aiming-to-unify-product-development-as-ai-upends-industry/", st: "GeekWire, 2025" } ] },

  { name: "Sierra", year: 2023, country: "United States", sector: "AI",
    desc: "AI agents for customer service.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: true, funding: null, value: 1.0e10, valueYear: 2025, valueLabel: "$10B valuation (Sept 2025)", valueSrc: "https://www.forbes.com/sites/richardnieva/2025/11/05/sierra-bret-taylor-clay-bavor/",
    founders: [
      { n: "Bret Taylor", p: ["Meta", "Google"], r: "Facebook CTO; co-created Google Maps", s: "https://www.forbes.com/sites/richardnieva/2025/11/05/sierra-bret-taylor-clay-bavor/", st: "Forbes, 5 Nov 2025" },
      { n: "Clay Bavor", p: ["Google"], r: "18 years at Google (VR/AR, Workspace)", s: "https://www.forbes.com/sites/richardnieva/2025/11/05/sierra-bret-taylor-clay-bavor/", st: "Forbes, 5 Nov 2025" } ] },

  { name: "Quip", year: 2012, country: "United States", sector: "Enterprise",
    desc: "Collaborative documents, spreadsheets and team chat.",
    status: "acquired", statusDetail: "Acquired by Salesforce, 2016", events: [[2016, "acq"]],
    unicorn: false, funding: 4.5e7, fundingLabel: "Total raised (TechCrunch)", fundingSrc: "https://techcrunch.com/2016/08/01/salesforce-buys-word-processing-app-quip-for-750m/",
    value: 7.5e8, valueYear: 2016, valueLabel: "~$750M acquisition by Salesforce (2016)", valueSrc: "https://techcrunch.com/2016/08/01/salesforce-buys-word-processing-app-quip-for-750m/",
    founders: [
      { n: "Bret Taylor", p: ["Meta", "Google"], r: "Facebook CTO; earlier Google PM (Maps)", s: "https://techcrunch.com/2016/08/01/salesforce-buys-word-processing-app-quip-for-750m/", st: "TechCrunch, 1 Aug 2016" },
      { n: "Kevin Gibbs", p: ["Google"], r: "Engineer", s: "https://techcrunch.com/2016/08/01/salesforce-buys-word-processing-app-quip-for-750m/", st: "TechCrunch, 1 Aug 2016" } ] },

  { name: "Cloudera", year: 2008, country: "United States", sector: "Data & Analytics",
    desc: "Enterprise data platform built on Apache Hadoop.",
    status: "acquired", statusDetail: "IPO 2017; taken private by KKR and CD&R, 2021", events: [[2017, "ipo"], [2021, "acq"]],
    unicorn: true, funding: null, value: 5.3e9, valueYear: 2021, valueLabel: "~$5.3B take-private (2021)", valueSrc: "https://www.wsj.com/articles/kkr-cd-r-near-deal-to-buy-cloudera-11622510459",
    founders: [
      { n: "Jeff Hammerbacher", p: ["Meta"], r: "Built Facebook's data team", s: "https://venturebeat.com/2008/07/10/rumor-jeff-hammerbacher-a-key-early-facebook-employee-is-leaving/", st: "VentureBeat, 10 July 2008" },
      { n: "Christophe Bisciglia", p: ["Google"], r: "Engineer; led academic cloud initiative", s: "https://www.engr.washington.edu/alumcomm/diamond/2015honorees.html", st: "UW Engineering, 2015" } ] },

  { name: "Fireworks AI", year: 2022, country: "United States", sector: "AI",
    desc: "Cloud platform for fast inference on open generative models.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: true, funding: null, value: 1.75e10, valueYear: 2026, valueLabel: "$17.5B, Series D (July 2026, per Reuters)", valueSrc: "https://www.reuters.com/technology/nvidia-backed-startup-fireworks-valued-175-billion-latest-funding-2026-07-16/",
    founders: [ { n: "Lin Qiao", p: ["Meta"], r: "Led Meta's AI platform team (PyTorch)", s: "https://techcrunch.com/2024/03/26/fireworks-ai-open-source-api-puts-generative-ai-in-reach-of-any-developer/", st: "TechCrunch, 26 Mar 2024" } ] },

  { name: "Perplexity", year: 2022, country: "United States", sector: "AI",
    desc: "AI search engine that answers with cited sources.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: true, funding: null, value: 2.0e10, valueYear: 2025, valueLabel: "$20B valuation (Sept 2025, per Reuters)", valueSrc: "https://www.reuters.com/technology/perplexity-finalizes-20-billion-valuation-round-information-reports-2025-09-10/",
    founders: [ { n: "Denis Yarats", p: ["Meta"], r: "Researcher, FAIR", s: "https://cs.nyu.edu/~dy1042/", st: "Denis Yarats — NYU page" } ] },

  { name: "AMI Labs", year: 2025, country: "France", sector: "AI",
    desc: "Builds AI 'world models' that learn how the physical world works.",
    status: "active", statusDetail: "Private; raised $1.03B, March 2026", events: [],
    unicorn: true, funding: 1.03e9, fundingLabel: "Announced round", fundingSrc: "https://en.wikipedia.org/wiki/AMI_Labs",
    value: 3.5e9, valueYear: 2026, valueLabel: "$3.5B pre-money (Mar 2026, per NYT)", valueSrc: "https://www.nytimes.com/2026/03/10/technology/ami-labs-yann-lecun-funding.html",
    founders: [ { n: "Yann LeCun", p: ["Meta"], r: "Chief AI Scientist; founded FAIR", s: "https://www.forbes.com/sites/ronschmelzer/2025/12/22/yann-lecuns-new-startup-ami-labs-can-world-models-move-beyond-hype/", st: "Forbes, 22 Dec 2025" } ] },

  // ───────────────────────── DeepMind family ─────────────────────────
  { name: "Reflection AI", year: 2024, country: "United States", sector: "AI",
    desc: "Open frontier models and autonomous coding agents.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: true, funding: 2.13e9, fundingLabel: "Sum of announced rounds", fundingSrc: "https://en.wikipedia.org/wiki/Reflection_AI",
    value: 8.0e9, valueYear: 2025, valueLabel: "$8B valuation (Oct 2025)", valueSrc: "https://techcrunch.com/2025/10/09/reflection-raises-2b-to-be-americas-open-frontier-ai-lab-challenging-deepseek/",
    founders: [
      { n: "Misha Laskin", p: ["DeepMind"], r: "Led reward modelling for Gemini", s: "https://techcrunch.com/2025/10/09/reflection-raises-2b-to-be-americas-open-frontier-ai-lab-challenging-deepseek/", st: "TechCrunch, 9 Oct 2025" },
      { n: "Ioannis Antonoglou", p: ["DeepMind"], r: "Researcher; AlphaGo co-creator", s: "https://techcrunch.com/2025/10/09/reflection-raises-2b-to-be-americas-open-frontier-ai-lab-challenging-deepseek/", st: "TechCrunch, 9 Oct 2025" } ] },

  { name: "H Company", year: 2023, country: "France", sector: "AI",
    desc: "Agentic models that operate computers and web interfaces.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: false, funding: 2.2e8, fundingLabel: "Seed round", fundingSrc: "https://techcrunch.com/2024/05/21/french-ai-startup-h-raises-220-million-seed-round/", value: null,
    founders: [
      { n: "Laurent Sifre", p: ["DeepMind"], r: "Principal scientist", s: "https://techcrunch.com/2024/05/21/french-ai-startup-h-raises-220-million-seed-round/", st: "TechCrunch, 21 May 2024" },
      { n: "Karl Tuyls", p: ["DeepMind"], r: "Research director", s: "https://techcrunch.com/2024/05/21/french-ai-startup-h-raises-220-million-seed-round/", st: "TechCrunch, 21 May 2024" },
      { n: "Daan Wierstra", p: ["DeepMind"], r: "Founding member", s: "https://techcrunch.com/2024/05/21/french-ai-startup-h-raises-220-million-seed-round/", st: "TechCrunch, 21 May 2024" },
      { n: "Julien Perolat", p: ["DeepMind"], r: "Researcher", s: "https://techcrunch.com/2024/05/21/french-ai-startup-h-raises-220-million-seed-round/", st: "TechCrunch, 21 May 2024" } ] },

  { name: "Reka AI", year: 2022, country: "United States", sector: "AI",
    desc: "Multimodal models for video, images, audio and text.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: false, funding: 1.7e8, fundingLabel: "Sum of announced rounds", fundingSrc: "https://reka.ai/news", value: null,
    founders: [
      { n: "Dani Yogatama", p: ["DeepMind"], r: "Senior staff research scientist (2016–22)", s: "https://dyogatama.github.io/", st: "Dani Yogatama — homepage" },
      { n: "Yi Tay", p: ["Google"], r: "Research scientist, Google Brain", s: "https://www.yitay.net/blog/returning-to-google-deepmind", st: "Yi Tay — blog" } ] },

  { name: "Latent Labs", year: 2023, country: "United Kingdom", sector: "Health",
    desc: "Generative models that design proteins and antibodies.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: false, funding: 5.0e7, fundingLabel: "Total raised at launch", fundingSrc: "https://techcrunch.com/2025/02/12/founded-by-deepmind-alumnus-latent-labs-launches-with-50m-to-make-biology-programmable/", value: null,
    founders: [ { n: "Simon Kohl", p: ["DeepMind"], r: "AlphaFold2 team; co-led protein design", s: "https://techcrunch.com/2025/02/12/founded-by-deepmind-alumnus-latent-labs-launches-with-50m-to-make-biology-programmable/", st: "TechCrunch, 12 Feb 2025" } ] },

  { name: "Ineffable Intelligence", year: 2025, country: "United Kingdom", sector: "AI",
    desc: "Reinforcement-learning agents trained in simulated environments.",
    status: "active", statusDetail: "Private; $1.1B seed, April 2026", events: [],
    unicorn: true, funding: 1.1e9, fundingLabel: "Seed round", fundingSrc: "https://www.cityam.com/former-deepmind-star-lands-1-1bn-backing-for-ai-startup/",
    value: 5.1e9, valueYear: 2026, valueLabel: "$5.1B valuation (Apr 2026 seed)", valueSrc: "https://www.cityam.com/former-deepmind-star-lands-1-1bn-backing-for-ai-startup/",
    founders: [ { n: "David Silver", p: ["DeepMind"], r: "Led reinforcement learning (AlphaGo, AlphaZero)", s: "https://fortune.com/2026/01/30/google-deepmind-ai-researcher-david-silver-leaves-to-found-ai-startup-ineffable-intelligence/", st: "Fortune, 30 Jan 2026" } ] },

  { name: "Physical Intelligence", year: 2024, country: "United States", sector: "AI",
    desc: "General-purpose foundation models for robots.",
    status: "active", statusDetail: "Independent; CEO denied July 2026 acquisition rumours", events: [],
    unicorn: true, funding: 1.0e9, fundingLabel: "\"Just over $1B\" (TechCrunch)", fundingSrc: "https://techcrunch.com/2026/03/27/physical-intelligence-is-reportedly-in-talks-to-raise-1-billion-again/",
    value: 5.6e9, valueYear: 2026, valueLabel: "$5.6B, last confirmed round (per TechCrunch, Mar 2026)", valueSrc: "https://techcrunch.com/2026/03/27/physical-intelligence-is-reportedly-in-talks-to-raise-1-billion-again/",
    founders: [
      { n: "Karol Hausman", p: ["DeepMind"], r: "Staff research scientist (robotics)", s: "https://techcrunch.com/2026/01/30/physical-intelligence-stripe-veteran-lachy-grooms-latest-bet-is-building-silicon-valleys-buzziest-robot-brains/", st: "TechCrunch, 30 Jan 2026" },
      { n: "Quan Vuong", p: ["DeepMind"], r: "Researcher", s: "https://techcrunch.com/2026/01/30/physical-intelligence-stripe-veteran-lachy-grooms-latest-bet-is-building-silicon-valleys-buzziest-robot-brains/", st: "TechCrunch, 30 Jan 2026" },
      { n: "Lachy Groom", p: ["Stripe"], r: "Early employee; head of Issuing", s: "https://techcrunch.com/2026/01/30/physical-intelligence-stripe-veteran-lachy-grooms-latest-bet-is-building-silicon-valleys-buzziest-robot-brains/", st: "TechCrunch, 30 Jan 2026" } ] },

  // ───────────────────────── Stripe family ─────────────────────────
  { name: "Watershed", year: 2019, country: "United States", sector: "Climate",
    desc: "Software to measure, report and cut carbon emissions.",
    status: "active", statusDetail: "Private", events: [],
    unicorn: true, funding: null, value: 1.8e9, valueYear: 2024, valueLabel: "$1.8B, Series C (Feb 2024)", valueSrc: "https://watershed.com/blog/series-c",
    founders: [
      { n: "Christian Anderson", p: ["Stripe"], r: "Engineer; Stripe Climate", s: "https://sequoiacap.com/article/watershed-spotlight", st: "Sequoia — Watershed spotlight" },
      { n: "Avi Itskovich", p: ["Stripe"], r: "Engineer", s: "https://sequoiacap.com/article/watershed-spotlight", st: "Sequoia — Watershed spotlight" },
      { n: "Taylor Francis", p: ["Stripe"], r: "Employee (2014–19)", s: "https://sequoiacap.com/article/watershed-spotlight", st: "Sequoia — Watershed spotlight" } ] },

  { name: "Stainless", year: 2022, country: "United States", sector: "Devtools",
    desc: "Generates SDKs, CLIs and docs from an API spec.",
    status: "acquired", statusDetail: "Joined Anthropic, May 2026 (terms undisclosed)", events: [[2026, "acq"]], absorbedInto: "Anthropic",
    unicorn: false, funding: null, value: null,
    founders: [ { n: "Alex Rattray", p: ["Stripe"], r: "Led API docs and SDK tooling", s: "https://www.stainless.com/blog/stainless-series-a/", st: "Stainless — Series A post" } ] },

  // ───────────────────────── Revolut family ─────────────────────────
  { name: "Fuse Energy", year: 2022, country: "United Kingdom", sector: "Climate",
    desc: "Renewable generation plus cheaper power for UK households.",
    status: "active", statusDetail: "Private; raised again June 2026", events: [],
    unicorn: true, funding: null, value: 5.0e9, valueYear: 2025, valueLabel: "$5B valuation (Dec 2025)", valueSrc: "https://www.eu-startups.com/2025/12/founded-by-former-revolut-executives-britains-fuse-energy-secures-e59-million-to-to-scale-energy-operations/",
    founders: [
      { n: "Alan Chang", p: ["Revolut"], r: "Chief Revenue Officer", s: "https://en.wikipedia.org/wiki/Fuse_Energy", st: "Fuse Energy — Wikipedia" },
      { n: "Charles Orr", p: ["Revolut"], r: "Early executive", s: "https://www.eu-startups.com/2025/12/founded-by-former-revolut-executives-britains-fuse-energy-secures-e59-million-to-to-scale-energy-operations/", st: "EU-Startups, Dec 2025" } ] },

  { name: "Tequipy", year: 2022, country: "United Kingdom", sector: "Enterprise",
    desc: "Manages employee IT devices from sourcing to resale in 180+ countries.",
    status: "active", statusDetail: "Raised €3M+, May 2026", events: [],
    unicorn: false, funding: null, value: null,
    founders: [
      { n: "Tomek Stawarski", p: ["Revolut"], r: "Global Head of IT", s: "https://www.eu-startups.com/2026/05/tequipy-founded-by-revoluts-former-it-chief-raises-over-e3-million-to-automate-global-device-logistics/", st: "EU-Startups, May 2026" },
      { n: "Bart Czerkies", p: ["Revolut"], r: "Colleague of Stawarski at Revolut", s: "https://www.eu-startups.com/2026/05/tequipy-founded-by-revoluts-former-it-chief-raises-over-e3-million-to-automate-global-device-logistics/", st: "EU-Startups, May 2026" },
      { n: "Albert Podraza", p: ["Revolut"], r: "Colleague of Stawarski at Revolut", s: "https://www.eu-startups.com/2026/05/tequipy-founded-by-revoluts-former-it-chief-raises-over-e3-million-to-automate-global-device-logistics/", st: "EU-Startups, May 2026" } ] },

  { name: "Tilt", year: 2023, yearNote: "approx. — app launched about a year before Aug 2024", country: "United Kingdom", sector: "Consumer",
    desc: "Live-stream shopping app for buying fashion in real time.",
    status: "active", statusDetail: "Series A Aug 2024", statusChecked: "Aug 2024", events: [],
    unicorn: false, funding: null, value: null,
    founders: [
      { n: "Abhi Thanendran", p: ["Revolut"], r: "First data scientist", s: "https://www.eu-startups.com/2024/08/london-based-tilt-nabs-e16-1-million-series-a-to-pump-up-real-time-shopping/", st: "EU-Startups, Aug 2024" },
      { n: "Neil Shah", p: ["Revolut"], r: "Fifth employee; led international expansion", s: "https://www.eu-startups.com/2024/08/london-based-tilt-nabs-e16-1-million-series-a-to-pump-up-real-time-shopping/", st: "EU-Startups, Aug 2024" } ] },

  { name: "Pillar", year: 2021, country: "United Kingdom", sector: "Fintech",
    desc: "Credit cards and loans for people who just moved country, using open banking.",
    status: "active", statusDetail: "€15.6M pre-seed, Apr 2022", statusChecked: "Apr 2022", events: [],
    unicorn: false, funding: null, value: null,
    founders: [ { n: "Ashutosh Bhatt", p: ["Revolut"], r: "Revolut alumnus", s: "https://www.eu-startups.com/2022/04/uk-based-pillar-picks-up-e15-6-million-to-tackle-credit-access-problem-for-migrants/", st: "EU-Startups, Apr 2022" } ] },

  { name: "Screenloop", year: 2021, country: "United Kingdom", sector: "Enterprise",
    desc: "Hiring platform for sourcing, interview analysis and reference checks.",
    status: "active", statusDetail: "€2.2M round, Dec 2021", statusChecked: "Dec 2021", events: [],
    unicorn: false, funding: null, value: null,
    founders: [ { n: "João Leal", p: ["Revolut"], r: "AI lead", s: "https://www.eu-startups.com/2021/12/london-based-hiring-intelligence-startup-screenloop-picks-up-e2-2-million/", st: "EU-Startups, Dec 2021" } ] }
  ]
};
