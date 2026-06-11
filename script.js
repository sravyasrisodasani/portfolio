/* ══════════════════════════════════════════════════
   SRAVYA SRI SODASANI — PORTFOLIO SCRIPTS
   ══════════════════════════════════════════════════ */

/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = -100, my = -100;
let fx = -100, fy = -100;

window.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = (mx - 5) + 'px';
  cursor.style.top  = (my - 5) + 'px';
});

function loopFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = (fx - 18) + 'px';
  follower.style.top  = (fy - 18) + 'px';
  requestAnimationFrame(loopFollower);
}
loopFollower();

/* ── CANVAS PARTICLE NETWORK ── */
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
const NUM = 70;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r = Math.random() * 1.5 + 0.5;
    const cols = ['#06b6d4','#ec4899','#10b981','#a78bfa'];
    this.col = cols[Math.floor(Math.random() * cols.length)];
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.col;
    ctx.fill();
  }
}

for (let i = 0; i < NUM; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(6,182,212,${0.12 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animCanvas() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animCanvas);
}
animCanvas();

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── HAMBURGER ── */
const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
ham.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--cyan)';
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => io.observe(s));

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.tl-card,.edu-card,.stat-box,.proj-card,.featured-card,.dash-card,.ws-card,.hack-card,.contact-link,.skill-group');
revealEls.forEach(el => el.classList.add('reveal'));
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ── TYPING EFFECT ── */
const roles = ['Data Scientist', 'ML Engineer', 'Data Analyst', 'AI Builder', 'Analytics Developer'];
let ri = 0, ci = 0, del = false;
const typed = document.getElementById('typedText');
if (typed) {
  function type() {
    const word = roles[ri];
    typed.textContent = del ? word.substring(0, ci - 1) : word.substring(0, ci + 1);
    del ? ci-- : ci++;
    if (!del && ci === word.length) setTimeout(() => del = true, 1800);
    else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    setTimeout(type, del ? 55 : 95);
  }
  setTimeout(type, 800);
}

/* ── CONTACT FORM ── */
function handleForm(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '✓ Message sent! I\'ll get back to you soon.';
  e.target.reset();
  setTimeout(() => note.textContent = '', 5000);
}

/* ══════════════════════════════════════════════════
   PROJECT DATA
   ══════════════════════════════════════════════════ */
const projects = {
  startupiq: {
    tag: 'AI Product · SummerSaaS 2026',
    tagClass: 'cyan-tag',
    title: 'StartupIQ AI',
    overview: 'AI McKinsey for every Indian founder. An AI-powered startup intelligence platform that validates any startup idea in 60 seconds — analyzing market opportunities, mapping competitors, scoring the idea, and providing India-specific insights. Built for SummerSaaS 2026 AI Hackathon by Centle Group.',
    meta: ['Event: SummerSaaS 2026 · Centle Group', 'Score: 96/100', 'Track: Maceco + Saasum AI', 'Status: Completed'],
    problem: '90% of startups in India fail — not because founders lack passion or money, but because they build the wrong thing, in the wrong market, at the wrong time. Getting real market intelligence requires hiring consultants (₹50,000+) or buying reports (₹1,00,000+). 63 million MSMEs, and less than 1% have ever validated their idea before building.',
    solution: 'One platform. One input. Complete startup intelligence in 60 seconds. Type any idea → StartupIQ analyzes the Indian market, maps competitors via bubble chart, scores the opportunity, finds failure risks with RiskLens AI, shows city-wise demand on an India heatmap, checks originality, connects founders with investors, and provides an AI business copilot.',
    features: [
      'Market Opportunity Analyzer — demand, trend, market size in ₹, India Tier 1 vs Tier 2 comparison',
      'Competitor Intelligence — bubble chart visualization, market saturation, gap analysis',
      'RiskLens AI — 5 failure reasons, biggest risk, competitor response prediction, 3 fixes',
      'Opportunity Score Card (out of 100) — exportable as PDF report',
      'India Market Heatmap — city-wise demand, top launch city recommendation',
      'Originality Check — ORIGINAL / SIMILAR EXISTS / ALREADY EXISTS verdict',
      'Investor Connect — browse active investors, export CSV, register as investor',
      'AI Business Copilot — floating chat with India-specific business context'
    ],
    tech: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'FastAPI', 'Google Gemini', 'Python', 'Vercel', 'Railway']
  },
  roadsos: {
    tag: 'Emergency AI · Smart Mobility',
    tagClass: 'pink-tag',
    title: 'RoadSense AI',
    overview: 'An intelligent emergency response platform enabling instant road accident reporting, real-time GPS location sharing, hospital recommendations, and rapid assistance coordination to reduce response time and save lives.',
    meta: ['Category: Smart Mobility & Emergency AI', 'Evaluator: Ms. Diksha', 'Status: Completed'],
    problem: 'Road accident victims face critical delays in emergency assistance. Poor reporting mechanisms, lack of location sharing, and no coordination between witnesses, hospitals, and emergency responders costs lives. Every minute of delay in the golden hour reduces survival rates significantly.',
    solution: 'Built an intelligent emergency response platform with one-tap accident reporting that captures GPS coordinates, automatically recommends and alerts nearby hospitals, sends notifications to emergency contacts, and provides a real-time incident tracking dashboard for coordinators and responders.',
    features: [
      'One-tap Emergency Reporting with automatic GPS capture',
      'Live GPS location sharing with emergency responders',
      'AI-powered nearest hospital recommendations',
      'Automated emergency contact alerts and notifications',
      'Real-time incident tracking dashboard',
      'Responder coordination and status updates',
      'Incident history and analytics'
    ],
    tech: ['React', 'Python', 'Firebase', 'Google Maps API', 'Machine Learning', 'GPS API', 'FastAPI']
  },
  hatespeech: {
    tag: 'NLP · AptPath Internship',
    tagClass: 'cyan-tag',
    title: 'Hate Speech Detection',
    overview: 'An NLP-based machine learning classifier capable of detecting hate speech, offensive content, and toxic language from text data with ~96% accuracy. Built during AptPath internship as a production-grade pipeline.',
    meta: ['Type: Internship Project · AptPath', 'Accuracy: ~96%', 'Duration: Nov 2025 – Apr 2026'],
    problem: 'Online communities and social platforms struggle with toxic, harmful, and hateful content that harms users and degrades community quality. Manual moderation is slow and inconsistent, unable to scale to millions of posts per day.',
    solution: 'Developed a complete text classification pipeline using TF-IDF vectorization and Logistic Regression. Applied comprehensive text preprocessing — tokenization, stopword removal, lemmatization — to detect hate speech, offensive language, and neutral content with ~96% accuracy.',
    features: [
      'TF-IDF vectorization for feature extraction',
      'Logistic Regression classification model',
      'Full text preprocessing pipeline',
      '~96% classification accuracy',
      'Multi-class detection: hate / offensive / neutral',
      'Scalable inference pipeline'
    ],
    tech: ['Python', 'Scikit-learn', 'NLP', 'TF-IDF', 'Logistic Regression', 'Pandas', 'NumPy']
  },
  spam: {
    tag: 'ML · NLP',
    tagClass: 'pink-tag',
    title: 'Email/SMS Spam Classifier',
    overview: 'A machine learning spam detection system achieving 97–98% accuracy using TF-IDF feature extraction and Multinomial Naive Bayes classification, deployed with an interactive Streamlit web interface.',
    meta: ['Accuracy: 97–98%', 'Interface: Streamlit', 'Domain: Text Classification'],
    problem: 'Spam messages — both emails and SMS — create significant security risks, productivity loss, and potential financial harm. Users need a fast, accurate system to filter unwanted content automatically.',
    solution: 'Built a complete spam detection pipeline: cleaned and preprocessed a large labelled dataset, extracted features using TF-IDF, trained a Multinomial Naive Bayes classifier achieving 97–98% accuracy, and deployed it through an interactive Streamlit web interface for real-time classification.',
    features: [
      '97–98% detection accuracy',
      'TF-IDF vectorization for feature extraction',
      'Multinomial Naive Bayes classifier',
      'Interactive Streamlit web interface',
      'Real-time text input classification',
      'Handles both email and SMS text formats'
    ],
    tech: ['Python', 'Scikit-learn', 'TF-IDF', 'Naive Bayes', 'Streamlit', 'Pandas', 'NumPy']
  },
  movies: {
    tag: 'Recommendation · ML',
    tagClass: 'green-tag',
    title: 'Movie Recommendation System',
    overview: 'A content-based movie recommendation engine using cosine similarity to generate personalized movie suggestions from a dataset of 5000+ films based on movie metadata and user preferences.',
    meta: ['Dataset: 5000+ movies', 'Algorithm: Cosine Similarity', 'Type: Content-Based Filtering'],
    problem: 'Users spend excessive time searching for movies to watch. Streaming platforms provide generic recommendations that don\'t accurately reflect individual tastes, wasting time and creating decision fatigue.',
    solution: 'Built a content-based filtering system that analyzes movie metadata — genres, cast, director, keywords, plot — converts them into TF-IDF feature vectors, and computes cosine similarity scores to generate personalized top-N recommendations for any queried movie.',
    features: [
      'Content-based filtering using multi-field metadata',
      'Cosine similarity scoring engine',
      '5000+ movie dataset coverage',
      'Multi-feature vectorization (genre, cast, director, plot)',
      'Top-N personalized recommendations',
      'Fast query and response time'
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TF-IDF', 'Cosine Similarity', 'NLTK']
  },
  health: {
    tag: 'Healthcare AI · Diploma Major Project',
    tagClass: 'orange-tag',
    title: 'Personalized Health Advisor',
    overview: 'An AI-powered symptom analysis platform using a Random Forest model to predict potential diseases from user-reported symptoms and provide health recommendations. Built as the Diploma Major Project.',
    meta: ['Type: Diploma Major Project', 'Algorithm: Random Forest', 'Domain: Healthcare AI'],
    problem: 'People often struggle to interpret their symptoms, assess health risks, and decide when to seek medical attention. Quick preliminary health guidance is inaccessible, especially in Tier 2 and Tier 3 cities where doctor availability is limited.',
    solution: 'Developed a Random Forest classification model trained on a symptom-disease dataset. Users input symptoms through a simple interface, and the system predicts likely conditions, provides tailored health recommendations, risk level assessment, and preventive guidance.',
    features: [
      'Symptom-based disease prediction',
      'Random Forest multi-class classification',
      'Personalized health recommendations per prediction',
      'Risk level assessment (low / medium / high)',
      'Preventive guidance and next steps',
      'User-friendly symptom input interface'
    ],
    tech: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'NumPy', 'Streamlit']
  },
  leaderboard: {
    tag: 'Full Stack · FastAPI',
    tagClass: 'purple-tag',
    title: 'Coding Platform Leaderboard',
    overview: 'A full-stack live leaderboard that aggregates coding statistics from multiple platforms using web scraping and APIs, providing unified rankings, contest results, and performance tracking for students.',
    meta: ['Type: Full Stack Project', 'Backend: FastAPI + Uvicorn', 'Domain: EdTech'],
    problem: 'Students participate across multiple coding platforms (LeetCode, Codeforces, HackerRank, etc.) but there is no unified view to compare rankings, track progress, or identify top performers across all platforms simultaneously.',
    solution: 'Developed a full-stack leaderboard using FastAPI backend with Uvicorn server, BeautifulSoup4 for web scraping, Pandas for data processing, and Requests for API calls — aggregating multi-platform data into a single interactive ranked view.',
    features: [
      'Live multi-platform data aggregation',
      'FastAPI + Uvicorn high-performance backend',
      'Web scraping with BeautifulSoup4',
      'Contest rankings and performance tracking',
      'Custom ranking algorithm with Pandas',
      'Interactive UI with real-time updates'
    ],
    tech: ['Python', 'FastAPI', 'Uvicorn', 'Pandas', 'Requests', 'BeautifulSoup4', 'HTML', 'CSS', 'JavaScript']
  },
  canteen: {
    tag: 'Full Stack · Group Project',
    tagClass: 'cyan-tag',
    title: 'Smart Digitalized Canteen',
    overview: 'A complete digital canteen ecosystem replacing manual counter-based operations. Features a student ordering dashboard and an admin analytics panel — automating billing, order tracking, and inventory management.',
    meta: ['Type: Group Project', 'Date: Feb 2026', 'Batch: D2', 'Domain: Operations / EdTech'],
    problem: 'The existing canteen operated through manual counter-based processes: time-consuming order processing, long queues, human billing errors, no sales records, cash handling issues, paper tokens that get lost, no real-time tracking, and poor experience during peak hours.',
    solution: 'Developed an app-based platform automating all canteen processes — faster ordering, online convenience, automated billing, secure digital payments, real-time order status updates, and a centralized database for easy record keeping and demand analysis.',
    features: [
      'Student: Browse menu, place orders, track order status',
      'Student: Digital payment — no cash handling issues',
      'Admin: Revenue and daily sales analytics',
      'Admin: Inventory management and demand forecasting',
      'Admin: Popular items and peak hour analysis',
      'Automated billing — eliminates human errors',
      'Order history and digital receipts'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Local Storage']
  },
  food: {
    tag: 'Web App · Group Project',
    tagClass: 'pink-tag',
    title: 'Online Food Ordering System',
    overview: 'A group project building a complete online food ordering, payment processing, and receipt generation system, improving operational efficiency and significantly reducing customer waiting time.',
    meta: ['Type: Group Project', 'Tech: HTML · CSS · JavaScript', 'Outcome: Reduced waiting time'],
    problem: 'Traditional food ordering at counters causes long wait times, order mix-ups, payment inefficiencies, and no visibility for customers into their order status — leading to poor overall experience.',
    solution: 'Built a responsive web application for online food ordering featuring an intuitive menu, seamless checkout flow, automated receipt generation, and order tracking — significantly improving efficiency and reducing waiting time.',
    features: [
      'Interactive menu browsing and item selection',
      'Seamless checkout and payment flow',
      'Automated digital receipt generation',
      'Order summary and confirmation',
      'Fully responsive mobile-first design',
      'Reduced waiting time and improved efficiency'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design']
  },
  meepanthulu: {
    tag: 'Paid Client Project · React',
    tagClass: 'green-tag',
    title: 'Mee Panthulu — Pooja Booking Platform',
    overview: 'A full-stack pooja booking platform connecting users with experienced pandits for Hindu religious ceremonies — supporting 7 pooja categories in 4 languages. Built as a paid client project with React, Node.js, and PostgreSQL.',
    meta: ['Type: Paid Client Project', 'Stack: React + Node.js + PostgreSQL', 'Deployment: Vercel + Render + Neon'],
    problem: 'The client needed a professional digital platform to connect devotees with experienced pandits for religious ceremonies. No existing solution offered multilingual support, direct booking, admin management, and printable receipts in one place.',
    solution: 'Designed and developed a full-stack pooja booking platform with React + Vite + Tailwind frontend, Node.js + Express backend, and PostgreSQL (Neon) database — supporting 7 pooja categories in Telugu, Hindi, Tamil, and English with admin panel and printable booking receipts.',
    features: [
      'Browse 7 pooja categories in Telugu, Hindi, Tamil & English',
      'View pandit profiles and book directly',
      'Admin panel to manage pandits and bookings',
      'Printable booking receipts',
      'JWT authentication and secure sessions',
      'Mobile-first fully responsive design',
      'Deployed on Vercel (frontend) + Render (backend) + Neon (DB)'
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'Neon', 'JWT', 'Vercel', 'Render']
  },
  hrdb: {
    tag: 'Power BI Dashboard',
    tagClass: 'cyan-tag',
    title: 'HR Analytics Dashboard',
    overview: 'An interactive Power BI dashboard delivering comprehensive HR insights — employee attrition analysis, hiring trends, workforce analytics, and performance metrics for data-driven talent decisions.',
    meta: ['Tool: Power BI', 'Domain: HR Analytics', 'Type: Business Intelligence'],
    problem: 'HR teams lack centralized visual dashboards to monitor attrition, analyze hiring pipelines, track workforce trends, and make data-driven talent decisions efficiently.',
    solution: 'Built a multi-page Power BI dashboard connecting HR data sources to visualize attrition patterns, departmental analytics, hiring funnels, employee demographics, and performance trends with interactive cross-filtering and slicers.',
    features: [
      'Employee attrition analysis by department and role',
      'Hiring insights and recruitment funnel tracking',
      'Workforce trend visualization over time',
      'Performance metrics and KPI cards',
      'Interactive cross-filters and slicers',
      'Demographic and tenure breakdowns'
    ],
    tech: ['Power BI', 'SQL', 'Excel', 'DAX', 'Data Modeling']
  },
  wwdb: {
    tag: 'Hackathon · Decode & Display 2026',
    tagClass: 'orange-tag',
    title: 'Global Ripple Effects Dashboard',
    overview: '"Global Ripple Effects: How War Impacts the World Economy" — A 5-page Power BI dashboard visualizing the America-Iran War (2025) economic shockwaves across 28 countries and 8 regions. Built for Decode & Display, SMS University of Hyderabad. Team: Data Detectives.',
    meta: ['Event: Decode & Display · SMS, Univ. of Hyderabad', 'Team: Data Detectives', 'Deadline: Apr 23, 2026', 'Countries: 28 · Pages: 5'],
    problem: 'The America-Iran War (2025) sent economic shockwaves globally — oil spiked 84%, net global loss reached -$2,826 Billion, wheat prices surged 104%, and Hormuz traffic dropped 43%. No unified visual story existed to explain the full cause-effect chain across 28 countries.',
    solution: 'Created a 5-page interactive Power BI dashboard using 5 CSV datasets covering 28 countries and 18 months of data. 12 custom DAX measures. Filled map, decomposition tree, waterfall chart, bubble map, and synced slicers tell the complete story from war trigger to food crisis in 14 weeks.',
    features: [
      'Page 1: Executive Overview — KPI cards, oil price timeline (+84%), stock market impact (DAX -40%)',
      'Page 2: Global Impact Map — Red (losers) to Green (winners) across 28 countries',
      'Page 3: Cause & Effect Chain — decomposition tree, 14-week war-to-food-crisis timeline',
      'Page 4: Winners vs Losers — waterfall chart, scatter plot, top 5 tables (ratio: $1 gained = $4.60 lost)',
      'Page 5: Commodities & Trade — wheat +104%, Hormuz -43%, inflation comparison',
      '5 datasets · 28 countries · 18 months · 12 DAX measures'
    ],
    tech: ['Power BI', 'DAX', 'Python', 'SQL', 'Data Storytelling', 'Filled Maps', 'Decomposition Tree']
  },
  restdb: {
    tag: 'Power BI Dashboard',
    tagClass: 'green-tag',
    title: 'Restaurant Analytics Dashboard',
    overview: 'An interactive Power BI dashboard for restaurant management — sales performance tracking, customer behavior insights, revenue trends, and operational analytics for data-driven decisions.',
    meta: ['Tool: Power BI', 'Domain: F&B Analytics', 'Type: Business Intelligence'],
    problem: 'Restaurant managers struggle with understanding sales patterns, identifying peak hours, tracking menu performance, and making inventory and staffing decisions without data visibility.',
    solution: 'Developed a restaurant analytics dashboard connecting sales data to visualize revenue trends, customer flow patterns, top-performing menu items, time-based analysis, and performance benchmarks in an interactive filterable interface.',
    features: [
      'Sales performance tracking over time',
      'Customer insights and behavior analysis',
      'Revenue trends and period comparisons',
      'Menu item performance ranking',
      'Peak hour and day-of-week analysis',
      'Interactive date and category filters'
    ],
    tech: ['Power BI', 'Excel', 'SQL', 'DAX', 'Data Visualization']
  },
  zomathon: {
    tag: 'ML System Design · Zomathon Hackathon',
    tagClass: 'pink-tag',
    title: 'Smart Add-On Recommendation System',
    overview: 'A real-time, context-aware add-on recommendation engine for food delivery apps — built for Zomathon Hackathon. Mathematically framed as a context-aware ranking problem using a two-stage LightGBM pipeline. Projected daily revenue lift of ₹18 million.',
    meta: ['Event: Zomathon Hackathon · Online', 'Domain: ML · RecSys · FinTech', 'Latency Target: <200ms', 'Dataset: 75,000 synthetic orders'],
    problem: 'In food delivery apps, users frequently miss complementary items like drinks, desserts, or sides when building their cart. This leads to lower Average Order Value (AOV), missed revenue opportunities, and an incomplete meal experience. The challenge: build a real-time recommendation system that updates dynamically as the cart changes, works under 200ms, and is personalized to each user.',
    solution: 'Framed as a context-aware ranking problem: Given user U, cart state C, and context T (time, location, restaurant) — rank candidate items I by P(I | U, C, T). Built a two-stage system: Stage 1 narrows candidates to 30–50 using co-occurrence patterns and category rules. Stage 2 uses a LightGBM model to predict add-on probability and rank by score. Synthetic dataset of 75,000 orders across 5,000 users and 250 restaurants was generated with injected real-world behavioral patterns.',
    features: [
      'Two-stage pipeline: Candidate Generation (30ms) + LightGBM Ranking (50ms) = <200ms total',
      'Synthetic dataset: 5,000 users · 250 restaurants · 1,500 items · 75,000 orders',
      'Time-based behavior: lunch/dinner/late-night biases injected',
      'Co-purchase patterns: Biryani→Salan 60%, Pizza→Garlic Bread 50%, Burger→Fries 65%',
      'Cold-start strategy: popularity fallback for new users, cuisine clustering for new restaurants',
      'A/B Testing plan: control vs proposed model over 2–3 weeks',
      'Business impact: Precision@8 improved from 0.12→0.20, projected ₹18M/day revenue lift',
      'Evaluated on AUC, Precision@8, Recall@8, NDCG@8 with temporal train-test split'
    ],
    tech: ['Python', 'LightGBM', 'Pandas', 'NumPy', 'Scikit-learn', 'Feature Engineering', 'Synthetic Data Generation']
  },
  iith: {
    tag: 'FinTech · Yuvaan IIT Hyderabad',
    tagClass: 'purple-tag',
    title: 'Intelli Credit — Credit Risk Assessment',
    overview: 'An Explainable AI-powered credit risk assessment prototype built for the Intelli Credit Challenge at Yuvaan, IIT Hyderabad (Online Hackathon). Uses classification models with feature engineering and XAI techniques to make transparent, interpretable lending decisions.',
    meta: ['Event: Yuvaan · IIT Hyderabad · Online', 'Domain: FinTech · Credit Risk · XAI', 'Type: Prototype', 'Theme: Intelli Credit Challenge'],
    problem: 'Traditional credit scoring models are black boxes — lenders cannot explain why a loan was rejected, regulators demand transparency, and biased models can discriminate against certain groups. The challenge was to build a credit risk model that is not only accurate but explainable and fair.',
    solution: 'Built a credit risk classification prototype using machine learning models with Explainable AI (XAI) techniques. Applied feature engineering on financial and behavioral data to extract meaningful risk signals. Used SHAP values for model explainability — enabling clear, human-readable explanations for each credit decision.',
    features: [
      'Credit risk classification: predict default probability per applicant',
      'Feature engineering on financial, behavioral, and demographic data',
      'Explainable AI (XAI) with SHAP values for decision transparency',
      'Risk segmentation: Low / Medium / High risk categories',
      'Model fairness analysis across demographic groups',
      'Interpretable output: key factors driving each credit decision'
    ],
    tech: ['Python', 'Scikit-learn', 'SHAP', 'XAI', 'Feature Engineering', 'Pandas', 'NumPy', 'LightGBM']
  },
  valkey: {
    tag: 'Hackathon · Build Beyond Limits · Amazon',
    tagClass: 'orange-tag',
    title: 'Valkey E-Commerce Demo',
    overview: 'A fully-featured e-commerce frontend built with React to showcase Valkey capabilities across multiple backend subsystems — authentication, search, caching, real-time recommendations, and more. Built for the "Build Beyond Limits" hackathon powered by Valkey, hosted by React Hyderabad at Amazon.',
    meta: ['Event: Build Beyond Limits · Amazon', 'Organizer: React Hyderabad', 'Tech: React + Valkey', 'Status: Completed'],
    problem: 'Modern e-commerce platforms need high-performance, scalable backend subsystems — but teams often lack a structured starting point to demonstrate capabilities like real-time recommendations, vector search, rate limiting, and geolocation-based delivery tracking using in-memory data systems.',
    solution: 'Built a complete React e-commerce starter (product catalog, cart, checkout, wishlist, vendor, blog pages) integrated with the Valkey Bundle Docker image — providing teams a launchpad to implement 14 Valkey-powered backend subsystems including full-text search, vector similarity search, analytics, and agentic AI search.',
    features: [
      'Full e-commerce UI: Home, Shop, Cart, Checkout, Wishlist, Account, Vendor, Blog',
      'Valkey Bundle integration (all modules: Search, DocumentDB, Bloom Filter, etc.)',
      'User Authentication with session management',
      'Full-Text Search and Vector Similarity Search',
      'Real-time Recommendations and Trending Products',
      'Rate Limiting, Analytics with Prometheus, Observability with OpenSearch',
      'Delivery Tracking with geolocation',
      'Agentic AI-powered search experience'
    ],
    tech: ['React 18', 'React Router v6', 'Bootstrap 5', 'SCSS', 'Valkey', 'Docker', 'Node.js', 'Jest', 'Vercel']
  }
};

/* ── MODAL OPEN/CLOSE ── */
function openProject(id) {
  const p = projects[id];
  if (!p) return;

  document.getElementById('mTag').innerHTML = `<span class="feat-tag ${p.tagClass}">${p.tag}</span>`;
  document.getElementById('mTitle').textContent = p.title;
  document.getElementById('mOverview').textContent = p.overview;
  document.getElementById('mMeta').innerHTML = p.meta.map(m => `<span>${m}</span>`).join('');
  document.getElementById('mProblem').textContent = p.problem;
  document.getElementById('mSolution').textContent = p.solution;
  const featList = document.getElementById('mFeatures');
  featList.innerHTML = '';
  p.features.forEach(f => { const li = document.createElement('li'); li.textContent = f; featList.appendChild(li); });
  document.getElementById('mTech').innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');

  document.getElementById('modalBackdrop').classList.add('open');
  document.getElementById('modalPanel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.getElementById('modalPanel').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

/* ── IMAGE SLIDERS ── */
const sliderState = {};

function initSlider(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const imgs = el.querySelectorAll('.dash-img');
  const count = imgs.length;
  sliderState[id] = { current: 0, count };

  // filter out broken images
  imgs.forEach(img => {
    img.onerror = function() { this.parentElement.removeChild(this); recount(id); };
  });

  // build dots
  const dotsEl = document.getElementById('dots-' + id);
  if (dotsEl) {
    dotsEl.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const d = document.createElement('button');
      d.className = 'sl-dot' + (i === 0 ? ' active' : '');
      d.onclick = (e) => { e.stopPropagation(); goSlide(id, i); };
      dotsEl.appendChild(d);
    }
  }
}

function recount(id) {
  const el = document.getElementById(id);
  if (!el) return;
  sliderState[id].count = el.querySelectorAll('.dash-img').length;
}

function goSlide(id, index) {
  const el = document.getElementById(id);
  if (!el) return;
  const state = sliderState[id];
  const imgs = el.querySelectorAll('.dash-img');
  state.current = Math.max(0, Math.min(index, imgs.length - 1));
  el.querySelector('.slides').style.transform = `translateX(-${state.current * 100}%)`;
  const dots = document.querySelectorAll(`#dots-${id} .sl-dot`);
  dots.forEach((d, i) => d.classList.toggle('active', i === state.current));
}

function slideMove(id, dir) {
  const state = sliderState[id];
  if (!state) return;
  const el = document.getElementById(id);
  const count = el.querySelectorAll('.dash-img').length;
  const next = (state.current + dir + count) % count;
  goSlide(id, next);
}

// Auto-slide every 3s
function autoSlide(id, interval = 3000) {
  setInterval(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const count = el.querySelectorAll('.dash-img').length;
    if (count > 1) slideMove(id, 1);
  }, interval);
}

// Init all sliders
['slider-hr', 'slider-ww'].forEach(id => {
  initSlider(id);
  autoSlide(id, 3500);
});
