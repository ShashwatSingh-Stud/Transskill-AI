"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BrainCircuit, Target, Sparkles, AlertCircle, ChevronRight, Activity, Zap, MessageSquare, X, BookOpen, Clock, Compass, Send
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend
} from "recharts";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface Role {
  id: string;
  title: string;
}

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<{ name: string, confidence: number }[]>([]);
  const [targetRole, setTargetRole] = useState<string>("");
  const [isPredicting, setIsPredicting] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string, text: string }[]>([
    { role: "bot", text: "Hi! 👋 I'm your TransSkill AI Mentor. Ask me about career transitions, skill recommendations, salary insights, or learning strategies!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatSuggestions, setChatSuggestions] = useState<string[]>(["Career paths", "Salary insights", "Learning resources"]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // === MASSIVE AI KNOWLEDGE BASE ===
  const knowledgeBase: { keywords: string[]; response: string; suggestions: string[] }[] = [
    // GREETINGS
    { keywords: ["hi", "hey", "sup"], response: "Hey there! 👋 I'm your TransSkill AI Mentor. I can help with career transitions, skill recommendations, salary insights, learning strategies, interview prep, and more. What would you like to explore?", suggestions: ["Career paths", "Salary insights", "Skill recommendations"] },
    { keywords: ["hello", "good morning", "good evening"], response: "Hello! 🌟 Welcome to TransSkill AI. I'm here to help you map out your ideal career path and maximize your skill ROI. What's on your mind?", suggestions: ["What skills should I learn?", "Career transition advice", "Interview tips"] },
    { keywords: ["thanks", "thank you", "appreciate"], response: "You're welcome! 😊 Remember, consistency beats intensity. Keep showing up every day and your career will transform. Feel free to ask more anytime!", suggestions: ["More career advice", "Learning resources", "Motivation tips"] },

    // SALARY & COMPENSATION
    { keywords: ["salary", "pay", "compensation", "earn", "income", "money"], response: "💰 Here's the 2025 salary landscape for tech roles:\n\n• Junior Developer: $60-80K\n• Mid-Level Developer: $85-120K\n• Senior Developer: $120-160K\n• Staff Engineer: $160-220K\n• ML Engineer: $130-180K\n• Data Scientist: $110-155K\n• Cloud Architect: $140-190K\n• DevOps Engineer: $110-150K\n\nTransitioning to higher-demand roles (ML, Cloud, Security) typically adds $20-50K to your market value.", suggestions: ["How to negotiate salary?", "Highest paying skills", "Career growth timeline"] },
    { keywords: ["negotiate", "raise", "promotion"], response: "💼 Salary negotiation tips:\n\n1. Research market rates on Glassdoor, Levels.fyi, and Blind\n2. Quantify your impact (e.g., 'I reduced load time by 40%')\n3. Time it right — after a successful project delivery\n4. Always negotiate the first offer (companies expect it)\n5. Consider total comp: base + bonus + equity + benefits\n6. Have a competing offer if possible\n7. Practice your pitch with a friend first\n\nMost companies have 10-20% negotiation room on initial offers!", suggestions: ["Salary ranges", "Career advancement", "Skills that pay more"] },

    // PYTHON
    { keywords: ["python"], response: "🐍 Python is the #1 most versatile programming language:\n\n**Career paths with Python:**\n• Web Dev → Django, FastAPI, Flask\n• Data Science → Pandas, NumPy, Matplotlib\n• Machine Learning → PyTorch, TensorFlow, Scikit-learn\n• Automation → Selenium, scripts, bots\n• DevOps → Ansible, infrastructure scripts\n\n**Learning roadmap:**\nWeek 1-2: Syntax & basics → Week 3-4: OOP → Week 5-8: Choose specialization → Month 3+: Build projects\n\n**Best resources:** Python.org docs, Automate the Boring Stuff, CS50P", suggestions: ["Python for ML", "Python vs JavaScript", "Data Science path"] },

    // JAVASCRIPT / TYPESCRIPT
    { keywords: ["javascript", "js", "typescript", "ts"], response: "⚡ JavaScript/TypeScript powers the web:\n\n**Frontend:** React, Vue, Angular, Svelte\n**Backend:** Node.js, Express, Nest.js, Deno\n**Mobile:** React Native, Ionic\n**Desktop:** Electron\n**Full Stack:** Next.js, Nuxt, SvelteKit\n\n**Why TypeScript?** 73% of companies now prefer TS. It catches bugs before runtime and improves team collaboration.\n\n**Salary impact:** JS developers average $95K; TypeScript specialists earn $110-130K on average.", suggestions: ["React roadmap", "Node.js backend", "TypeScript tips"] },

    // REACT
    { keywords: ["react", "nextjs", "next.js"], response: "⚛️ React is the most in-demand frontend framework (43% market share):\n\n**Learning path:**\n1. HTML/CSS/JS fundamentals\n2. React basics (components, state, props)\n3. Hooks (useState, useEffect, useContext)\n4. State management (Zustand, Redux Toolkit)\n5. Next.js for full-stack\n6. Testing (Jest, React Testing Library)\n\n**Career boost:** React devs earn 15-20% more than vanilla JS devs. Next.js knowledge adds another $10-15K.\n\n**Top resources:** React.dev, Josh Comeau's blog, Kent C. Dodds courses", suggestions: ["State management", "Next.js features", "React interview Q&A"] },

    // ML / AI / DATA SCIENCE
    { keywords: ["machine learning", "ml", "ai", "artificial intelligence", "deep learning", "neural"], response: "🤖 Machine Learning roadmap for 2025:\n\n**Phase 1 (Month 1-2):** Python + Math foundations\n• Linear algebra, statistics, probability\n• NumPy, Pandas, Matplotlib\n\n**Phase 2 (Month 3-4):** Core ML\n• Scikit-learn (regression, classification, clustering)\n• Feature engineering, model evaluation\n\n**Phase 3 (Month 5-7):** Deep Learning\n• PyTorch or TensorFlow\n• CNNs, RNNs, Transformers\n\n**Phase 4 (Month 8+):** Specialization\n• NLP, Computer Vision, or Reinforcement Learning\n• MLOps (MLflow, Kubeflow)\n\n**Salary:** ML Engineers average $145K, with top companies paying $200K+", suggestions: ["Best ML courses", "ML interview prep", "Data Science vs ML"] },
    { keywords: ["data science", "data scientist", "data analysis", "analytics"], response: "📊 Data Science career guide:\n\n**Required skills:**\n• Python/R + SQL (non-negotiable)\n• Statistics & probability\n• Data visualization (Matplotlib, Tableau, Power BI)\n• ML basics (Scikit-learn)\n• Communication & storytelling\n\n**Best certifications:**\n1. Google Data Analytics Certificate\n2. IBM Data Science Professional\n3. AWS Data Analytics Specialty\n\n**Salary range:** $95K-155K depending on experience\n**Job growth:** 35% increase projected through 2030\n\n**Pro tip:** Build a portfolio with 3-5 real-world analysis projects on Kaggle.", suggestions: ["Data Science projects", "SQL mastery", "Tableau vs Power BI"] },

    // CLOUD
    { keywords: ["aws", "cloud", "azure", "gcp", "google cloud"], response: "☁️ Cloud computing is a $600B industry:\n\n**AWS (32% market share):**\nStart: EC2, S3, Lambda → Intermediate: RDS, DynamoDB, API Gateway → Advanced: ECS, SageMaker, CloudFormation\n\n**Azure (23% market share):**\nStrong in enterprise, .NET ecosystem, and hybrid cloud\n\n**GCP (11% market share):**\nBest for ML/AI (Vertex AI), data analytics (BigQuery)\n\n**Certification path:**\n1. Cloud Practitioner ($50K boost potential)\n2. Solutions Architect Associate ($115K avg)\n3. Solutions Architect Professional ($155K avg)\n\nCloud skills add $15-30K to any developer role.", suggestions: ["AWS certifications", "Cloud architecture", "Serverless guide"] },

    // DEVOPS
    { keywords: ["devops", "ci/cd", "cicd", "deployment", "infrastructure"], response: "🔧 DevOps Engineer roadmap:\n\n**Core skills:**\n1. Linux administration & scripting\n2. Git & version control (advanced)\n3. Docker & containerization\n4. Kubernetes orchestration\n5. CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI)\n6. Infrastructure as Code (Terraform, Pulumi)\n7. Monitoring (Prometheus, Grafana, Datadog)\n\n**Salary:** $110-165K | **Demand growth:** 22% YoY\n\n**Pro tip:** The fastest path to DevOps is through development experience + cloud certifications. Don't try to learn it in isolation.", suggestions: ["Docker basics", "Kubernetes guide", "Terraform tutorial"] },
    { keywords: ["docker", "container", "containerization"], response: "🐳 Docker is essential for modern development:\n\n**Why Docker?**\n• Consistent environments (no more 'works on my machine')\n• Microservices architecture\n• Easy deployment & scaling\n• Required for Kubernetes\n\n**Learning path:**\n1. Docker basics (images, containers, volumes)\n2. Dockerfile & docker-compose\n3. Multi-stage builds\n4. Docker networking\n5. Docker Swarm or Kubernetes\n\n**Impact:** Docker knowledge makes you 40% more competitive. Nearly every job posting for mid-senior roles mentions it.", suggestions: ["Kubernetes next steps", "Docker best practices", "Microservices"] },
    { keywords: ["kubernetes", "k8s"], response: "☸️ Kubernetes is the production orchestration standard:\n\n**What it does:** Automates deployment, scaling, and management of containerized apps.\n\n**Learning path:**\n1. Master Docker first\n2. Pods, Deployments, Services\n3. ConfigMaps & Secrets\n4. Helm charts\n5. Monitoring & logging\n6. CKA Certification\n\n**Certification:** CKA (Certified Kubernetes Administrator) leads to $140K+ avg salary.\n\n**Popular managed services:** EKS (AWS), GKE (Google), AKS (Azure)", suggestions: ["CKA certification", "Helm charts", "Service mesh"] },

    // GIT
    { keywords: ["git", "github", "version control", "gitlab"], response: "🔀 Git mastery is non-negotiable:\n\n**Essential commands:**\n• git rebase vs merge (know when to use each)\n• git stash, cherry-pick, bisect\n• Interactive rebase for clean history\n• Resolving merge conflicts confidently\n\n**GitHub profile tips:**\n1. Pin your best 6 repositories\n2. Write detailed README files\n3. Contribute to open source (start with 'good first issue')\n4. Show consistent green squares\n5. Use GitHub Actions for CI/CD\n\n**Pro tip:** Recruiters check your GitHub. A well-maintained profile with good projects beats a resume.", suggestions: ["Open source guide", "Git workflow", "GitHub Actions"] },

    // INTERVIEWS
    { keywords: ["interview", "whiteboard", "coding interview", "technical interview"], response: "🎯 Technical interview preparation:\n\n**DSA (2-3 months):**\n• Arrays, Strings, Hash Maps (easy wins)\n• Trees, Graphs (BFS/DFS)\n• Dynamic Programming (pattern recognition)\n• Practice 150+ LeetCode problems\n\n**System Design (for senior roles):**\n• Scalability, load balancing, caching\n• Database design (SQL vs NoSQL)\n• Microservices architecture\n• Study real systems (Twitter, Uber, Netflix)\n\n**Behavioral (often underestimated):**\n• STAR method for stories\n• Prepare 8-10 stories covering leadership, conflict, failure\n\n**Resources:** NeetCode.io, System Design Primer, Grokking the System Design Interview", suggestions: ["LeetCode strategy", "System design tips", "Behavioral interview"] },
    { keywords: ["leetcode", "dsa", "algorithm", "data structure"], response: "🧮 LeetCode / DSA strategy:\n\n**The 75 Blind pattern:**\n1. Two Pointers (5 problems)\n2. Sliding Window (4 problems)\n3. Stack (7 problems)\n4. Binary Search (7 problems)\n5. Trees (11 problems)\n6. Dynamic Programming (11 problems)\n7. Graphs (6 problems)\n\n**Study plan:**\n• Week 1-2: Easy problems (build confidence)\n• Week 3-6: Medium problems (core patterns)\n• Week 7-8: Hard problems (edge cases)\n\n**Pro tip:** Don't memorize solutions. Understand PATTERNS. If you can identify the pattern, you can solve any variation.", suggestions: ["Top patterns", "Interview timeline", "Mock interviews"] },
    { keywords: ["resume", "cv"], response: "📄 Resume optimization tips:\n\n**Format:**\n• 1 page (even with 10+ years experience)\n• Clean, ATS-friendly template\n• No photos, graphics, or fancy layouts\n\n**Content:**\n• Start bullets with action verbs (Built, Designed, Led, Optimized)\n• Quantify everything (e.g., 'Reduced load time by 40%')\n• Tailor to each job description\n• Include links: GitHub, LinkedIn, portfolio\n\n**Sections order:**\nContact → Summary → Experience → Skills → Education → Projects\n\n**ATS keywords:** Match 60%+ of keywords from the job description.", suggestions: ["Portfolio tips", "LinkedIn optimization", "Cover letter guide"] },

    // CAREER TRANSITIONS
    { keywords: ["career", "transition", "switch", "change career"], response: "🚀 Career transition strategies:\n\n**Fastest transitions (3-6 months):**\n• Frontend → Full Stack (learn Node.js + databases)\n• QA → Automation Engineer (learn Selenium/Cypress)\n• IT Support → DevOps (learn Linux + cloud)\n\n**Medium transitions (6-12 months):**\n• Developer → Data Scientist (learn Python + stats)\n• Designer → UX Engineer (learn React + CSS)\n• PM → Technical PM (learn system design basics)\n\n**Longer transitions (12+ months):**\n• Non-tech → Software Developer (full bootcamp)\n• Developer → ML Engineer (deep math + ML)\n\n**Key strategy:** Build bridge projects that combine your current skills with your target skills.", suggestions: ["Fastest career paths", "Bridge projects", "Skill gap analysis"] },
    { keywords: ["frontend", "front-end", "ui developer"], response: "🎨 Frontend Developer career path:\n\n**Core skills:** HTML, CSS, JavaScript, React/Vue\n**Advanced:** TypeScript, Testing, Performance, Accessibility\n**Salary:** Junior $60K → Mid $95K → Senior $130K+\n\n**Growth paths from Frontend:**\n1. → Full Stack (add Node.js, databases)\n2. → Frontend Architect (design systems, performance)\n3. → Engineering Manager (leadership track)\n4. → UX Engineer (design + code hybrid)\n\n**Hot skills for frontend in 2025:**\nNext.js, TypeScript, Tailwind CSS, Framer Motion, Storybook", suggestions: ["Full Stack path", "Frontend interview", "Design systems"] },
    { keywords: ["backend", "back-end", "server", "api"], response: "⚙️ Backend Developer guide:\n\n**Languages (pick one to master):**\n• Node.js (JavaScript ecosystem)\n• Python (Django/FastAPI — great for AI/data)\n• Go (performance-critical systems)\n• Java/Kotlin (enterprise, Android)\n• Rust (systems programming)\n\n**Core concepts:**\n1. REST API design & GraphQL\n2. Database design (PostgreSQL, MongoDB)\n3. Authentication & authorization (JWT, OAuth)\n4. Caching (Redis)\n5. Message queues (RabbitMQ, Kafka)\n6. API rate limiting & security\n\n**Salary:** $95K-160K depending on language and experience.", suggestions: ["Database design", "API best practices", "Microservices"] },
    { keywords: ["full stack", "fullstack", "full-stack"], response: "🏗️ Full Stack Developer roadmap:\n\n**Frontend:** React/Next.js + TypeScript + Tailwind\n**Backend:** Node.js + Express/Fastify or Python + FastAPI\n**Database:** PostgreSQL + Redis\n**DevOps:** Docker + CI/CD + basic AWS\n**Testing:** Jest + Cypress\n\n**Recommended stack for 2025:**\nNext.js + Prisma + PostgreSQL + Vercel = The 'T3 Stack'\n\n**Salary:** $100K-150K (one of the broadest hiring categories)\n\n**Advantage:** Full stack developers can build complete products solo, making them invaluable to startups and small teams.", suggestions: ["T3 Stack", "Full Stack projects", "Database choices"] },

    // TOOLS & TECHNOLOGIES
    { keywords: ["database", "sql", "postgresql", "mongo", "mysql"], response: "🗃️ Database skills guide:\n\n**SQL (relational — structured data):**\n• PostgreSQL (most popular, feature-rich)\n• MySQL (widely used, easy to start)\n• SQL Server (enterprise/.NET ecosystem)\n\n**NoSQL (unstructured data):**\n• MongoDB (flexible documents)\n• Redis (blazing-fast caching)\n• DynamoDB (AWS serverless)\n\n**What to learn:**\n1. SQL fundamentals (JOIN, GROUP BY, subqueries)\n2. Indexing & query optimization\n3. Database design & normalization\n4. ORMs (Prisma, SQLAlchemy)\n5. When to use SQL vs NoSQL\n\n**Pro tip:** SQL knowledge is required for 90% of tech roles.", suggestions: ["SQL practice", "Database design", "Redis caching"] },
    { keywords: ["figma", "design", "ui/ux", "ux"], response: "🎨 UI/UX Design skills:\n\n**Tools:** Figma (industry standard), Sketch, Adobe XD\n\n**Developer + Design combo is powerful:**\n• UX Engineers earn $120-160K\n• Design system architects are in high demand\n\n**Learning path:**\n1. Design principles (hierarchy, spacing, color theory)\n2. Figma basics (auto layout, components, variants)\n3. User research & testing methods\n4. Accessibility (WCAG guidelines)\n5. Design systems (Tokens, component libraries)\n\n**Top resources:** Refactoring UI, Laws of UX, Nielsen Norman Group", suggestions: ["Design systems", "Accessibility guide", "Color theory"] },
    { keywords: ["rust"], response: "🦀 Rust is the most loved language (8 years straight on StackOverflow):\n\n**Why Rust?**\n• Memory safety without garbage collection\n• Performance comparable to C/C++\n• Growing adoption: Firefox, Dropbox, Discord, Cloudflare\n\n**Use cases:** Systems programming, WebAssembly, embedded, blockchain, high-performance backends\n\n**Salary:** $120-170K (premium due to scarcity of Rust developers)\n\n**Warning:** Steep learning curve. Expect 3-6 months to feel comfortable. The borrow checker will frustrate you initially, but it makes you a better programmer.", suggestions: ["Rust learning path", "Systems programming", "WebAssembly"] },
    { keywords: ["go", "golang"], response: "🐹 Go (Golang) — built for simplicity and performance:\n\n**Why Go?**\n• Built by Google for scalable services\n• Simple syntax (productive in days)\n• Excellent concurrency (goroutines)\n• Used by: Google, Uber, Docker, Kubernetes, Terraform\n\n**Best for:** APIs, microservices, CLI tools, DevOps tooling\n\n**Salary:** $110-155K\n\n**Learning timeline:** 2-4 weeks to be productive (one of the easiest languages to learn)", suggestions: ["Go vs Rust", "Building APIs in Go", "Go concurrency"] },

    // CERTIFICATIONS
    { keywords: ["certification", "certified", "certificate"], response: "🏆 Most valuable tech certifications in 2025:\n\n**Cloud (highest ROI):**\n1. AWS Solutions Architect Associate (+$25K avg)\n2. AWS Developer Associate\n3. Google Cloud Professional\n4. Azure Administrator\n\n**DevOps:**\n5. CKA (Kubernetes)\n6. HashiCorp Terraform Associate\n\n**Data:**\n7. Google Data Analytics\n8. Databricks Data Engineer\n\n**Security:**\n9. CompTIA Security+\n10. AWS Security Specialty\n\n**Pro tip:** A certification + hands-on project > certification alone. Always pair learning with building.", suggestions: ["AWS certification path", "Free certifications", "Study plan"] },

    // LEARNING & RESOURCES
    { keywords: ["learn", "resource", "course", "tutorial", "study", "book"], response: "📚 Top learning platforms ranked by use case:\n\n**Structured learning:**\n1. Coursera (university-quality, certificates)\n2. edX (MIT, Harvard courses)\n3. Udemy (affordable, practical)\n\n**Interactive coding:**\n4. freeCodeCamp (free, project-based)\n5. Codecademy (beginner-friendly)\n6. Exercism (practice problems)\n\n**Advanced:**\n7. Frontend Masters (deep dives)\n8. Pluralsight (enterprise tech)\n9. O'Reilly (books + video)\n\n**Interview prep:**\n10. NeetCode, LeetCode, AlgoExpert\n\n**Free resources:**\n• The Odin Project (full stack)\n• CS50 (Harvard, free)\n• MDN Web Docs (reference)", suggestions: ["Free learning paths", "Best YouTube channels", "Project ideas"] },
    { keywords: ["project", "build", "side project"], response: "🛠️ Portfolio project ideas by career target:\n\n**Full Stack:**\n• E-commerce platform with payments\n• Real-time chat app with WebSockets\n• Project management tool (Trello clone)\n\n**Data Science:**\n• Stock price predictor\n• Sentiment analysis dashboard\n• Customer churn prediction model\n\n**ML Engineer:**\n• Image classifier with web deployment\n• Recommendation engine\n• NLP chatbot with fine-tuned model\n\n**DevOps:**\n• Automated CI/CD pipeline\n• Kubernetes cluster setup\n• Infrastructure monitoring dashboard\n\n**Pro tip:** Quality over quantity. 2-3 polished projects > 10 half-finished ones.", suggestions: ["Full stack project", "ML project ideas", "Open source"] },
    { keywords: ["open source", "contribute", "contribution"], response: "🌐 Getting started with open source:\n\n**Step 1:** Find beginner-friendly repos\n• Look for 'good first issue' and 'help wanted' labels\n• Check: first-timers-only.com\n\n**Step 2:** Start small\n• Fix typos in docs\n• Add tests\n• Fix small bugs\n\n**Step 3:** Level up\n• Implement features\n• Review PRs\n• Maintain issues\n\n**Popular beginner repos:**\n• freeCodeCamp, React, VS Code, Next.js\n\n**Why it matters:** Open source contributions demonstrate collaboration and real-world coding skills. Many employers value OSS contributions over personal projects.", suggestions: ["Good first repos", "Git workflow", "Building in public"] },

    // TIMELINE & PLANNING
    { keywords: ["how long", "time", "duration", "timeline", "month", "week"], response: "⏱️ Realistic career transition timelines:\n\n**3-6 months:**\n• Frontend → Full Stack\n• QA → Automation\n• IT Support → Junior Dev (with bootcamp)\n\n**6-9 months:**\n• Developer → DevOps\n• Analyst → Data Scientist\n• Designer → Frontend Dev\n\n**9-12 months:**\n• Developer → ML Engineer\n• Non-tech → Junior Developer\n• PM → Technical PM\n\n**12-18 months:**\n• Complete career change (non-tech to senior dev)\n• Specialist → Architect\n\n**Key insight:** Focus on 2 hours of deliberate practice daily. Consistency > intensity.", suggestions: ["Daily study plan", "Milestone tracking", "Stay motivated"] },
    { keywords: ["roadmap", "plan", "path", "guide"], response: "🗺️ Career planning framework:\n\n**Step 1: Assess**\n• List your current skills honestly\n• Identify transferable skills\n• Take skill assessments (LinkedIn, HackerRank)\n\n**Step 2: Target**\n• Research 3 target roles\n• Study job descriptions\n• Talk to people in those roles\n\n**Step 3: Gap Analysis**\n• Compare your skills vs requirements\n• Prioritize high-impact gaps\n• Use TransSkill AI's predictor!\n\n**Step 4: Execute**\n• Set weekly learning goals\n• Build projects as you learn\n• Network consistently\n\n**Step 5: Apply**\n• Start applying when 60% ready\n• You learn faster on the job", suggestions: ["Skill assessment", "Gap analysis tool", "Networking tips"] },

    // SOFT SKILLS
    { keywords: ["soft skill", "communication", "leadership", "teamwork", "management"], response: "🤝 Soft skills that multiply your career:\n\n**Communication (most important):**\n• Clear technical writing\n• Presenting to non-technical stakeholders\n• Active listening in meetings\n\n**Leadership:**\n• Mentoring junior developers\n• Leading code reviews constructively\n• Taking ownership of problems\n\n**Strategic thinking:**\n• Understanding business context\n• Making trade-off decisions\n• Prioritizing ruthlessly\n\n**Impact on salary:** Engineers with strong soft skills earn 15-25% more than those with equivalent technical skills. At senior+ levels, soft skills become MORE important than technical skills.", suggestions: ["Leadership growth", "Tech presentations", "Mentorship"] },

    // FREELANCING & REMOTE
    { keywords: ["freelance", "remote", "work from home", "wfh", "contract"], response: "💻 Freelancing & remote work guide:\n\n**Platforms:**\n• Toptal (elite, high-paying: $80-200/hr)\n• Upwork (broad marketplace)\n• Freelancer.com (competitive)\n• Arc.dev (remote dev jobs)\n\n**Rates by skill:**\n• Web dev: $50-150/hr\n• ML/AI: $100-250/hr\n• Mobile dev: $75-175/hr\n• DevOps: $100-200/hr\n\n**Tips:**\n1. Build a niche (e.g., 'React + e-commerce')\n2. Start with lower rates, build reviews\n3. Over-communicate with clients\n4. Save 30% for taxes\n5. Build recurring client relationships", suggestions: ["Freelance pricing", "Client management", "Remote tools"] },

    // MOTIVATION
    { keywords: ["motivat", "stuck", "burnout", "frustrated", "overwhelm", "give up", "difficult", "hard"], response: "💪 Feeling stuck is NORMAL and temporary:\n\n**The learning curve truth:**\n• Month 1-2: Excitement (everything is new!)\n• Month 3-4: Frustration valley (this is where most quit)\n• Month 5-6: Breakthrough (things start clicking)\n• Month 7+: Confidence (you can build real things)\n\n**Practical tips:**\n1. Celebrate small wins daily\n2. Join a community (Discord, Reddit, meetups)\n3. Teach what you learn (blog, YouTube)\n4. Take breaks — rest is productive\n5. Compare yourself to yesterday, not others\n6. Remember WHY you started\n\nEvery expert was once a beginner. Keep going! 🚀", suggestions: ["Study routine", "Community recommendations", "Break recovery"] },

    // NETWORKING
    { keywords: ["network", "linkedin", "connect", "mentor", "community"], response: "🤝 Networking strategies that actually work:\n\n**LinkedIn optimization:**\n1. Professional headline (not just 'Developer')\n2. Post 2-3x per week about your learning journey\n3. Comment thoughtfully on others' posts\n4. Write articles about what you're learning\n\n**Building connections:**\n• Attend local meetups and tech talks\n• Join Discord communities (Reactiflux, Python, etc.)\n• Contribute to open source\n• Reach out to 2-3 new people weekly\n\n**Finding mentors:**\n• ADPList.org (free mentoring platform)\n• Twitter/X tech community\n• Company internal mentorship programs\n\n**Rule of thumb:** Give value before asking for help. Share, teach, and contribute.", suggestions: ["LinkedIn tips", "Tech communities", "Mentorship platforms"] },

    // INDUSTRY DEMAND
    { keywords: ["demand", "trend", "market", "job market", "hiring", "2025", "future"], response: "📈 Tech job market trends for 2025:\n\n**Highest demand roles:**\n1. AI/ML Engineer (+45% YoY growth)\n2. Cloud Security Engineer (+38%)\n3. Full Stack Developer (+25%)\n4. Data Engineer (+30%)\n5. DevOps/SRE (+22%)\n\n**Emerging fields:**\n• AI Safety & Alignment\n• Prompt Engineering ($80-150K)\n• Edge Computing\n• Quantum Computing (early stage)\n\n**Skills most employers seek:**\n1. Python (68% of listings)\n2. Cloud (AWS/Azure/GCP) (52%)\n3. React/TypeScript (47%)\n4. Docker/K8s (41%)\n5. SQL (73% — still king!)\n\n**Layoff reality:** Tech layoffs affected big tech, but overall demand is UP across mid-market and startups.", suggestions: ["Top skills 2025", "Emerging fields", "Job search strategy"] },

    // STARTUP VS CORPORATE
    { keywords: ["startup", "corporate", "company", "mnc", "faang", "google", "microsoft", "amazon"], response: "🏢 Startup vs Corporate career comparison:\n\n**Startup pros:**\n• Faster growth, more responsibility\n• Equity potential (lottery ticket)\n• Wear multiple hats (learn more)\n• Flexible culture\n\n**Corporate/FAANG pros:**\n• Higher base salary ($150-400K+ at FAANG)\n• Better benefits and stability\n• Structured mentorship\n• Resume prestige\n\n**Decision framework:**\n• Early career → Startup (for learning speed)\n• Mid career → Try both (for breadth)\n• Want stability → Corporate\n• Want equity upside → Startup\n\n**FAANG interview tip:** Start preparing 3 months before applying. Focus on LeetCode Medium + System Design.", suggestions: ["FAANG interview prep", "Startup culture", "Equity negotiation"] },

    // SPECIFIC SKILLS
    { keywords: ["cyber", "security", "infosec", "hacking", "pentest"], response: "🔐 Cybersecurity career path:\n\n**Entry paths:**\n1. IT Support → SOC Analyst → Security Engineer\n2. Developer → Application Security\n3. DevOps → Cloud Security\n\n**Certifications (in order):**\n1. CompTIA Security+ (entry)\n2. CEH (Certified Ethical Hacker)\n3. CISSP (senior, $140K+ avg)\n\n**In-demand skills:** Cloud security, penetration testing, incident response, SIEM tools, threat modeling\n\n**Salary:** $85K-175K (one of the fastest-growing fields)\n**Job gap:** 3.5 million unfilled cybersecurity positions globally!", suggestions: ["Security certifications", "Ethical hacking", "Bug bounty programs"] },
    { keywords: ["mobile", "android", "ios", "flutter", "react native", "swift", "kotlin"], response: "📱 Mobile Development guide:\n\n**Cross-platform (build once, deploy twice):**\n• React Native (JavaScript — largest community)\n• Flutter (Dart — best performance)\n\n**Native (platform-specific):**\n• iOS: Swift + SwiftUI\n• Android: Kotlin + Jetpack Compose\n\n**Which to choose?**\n• Startup/MVP → React Native or Flutter\n• Performance-critical → Native\n• Already know JS → React Native\n• Starting fresh → Flutter (growing faster)\n\n**Salary:** $95-150K | **Market:** 3.5B smartphones = massive demand", suggestions: ["Flutter vs React Native", "iOS development", "App monetization"] },

    // BLOCKCHAIN / WEB3
    { keywords: ["blockchain", "web3", "crypto", "solidity", "smart contract"], response: "⛓️ Blockchain/Web3 development:\n\n**Current state (honest assessment):**\n• Much smaller job market than traditional dev\n• Higher pay if you get in ($130-200K)\n• Very volatile industry\n\n**Tech stack:** Solidity, Ethers.js, Hardhat, IPFS\n\n**Best approach:** Learn it as a secondary skill alongside traditional development. Don't bet your entire career on it.\n\n**Learning:** CryptoZombies (free), Buildspace, Alchemy University", suggestions: ["Is Web3 worth it?", "Solidity basics", "DeFi development"] },

    // HELP
    { keywords: ["help", "what can you do", "features", "can you"], response: "🧠 I'm your TransSkill AI Career Mentor! Here's what I can help with:\n\n• 🚀 **Career transitions** — best paths, timelines, strategies\n• 💰 **Salary insights** — market rates, negotiation tips\n• 📚 **Learning resources** — courses, books, platforms\n• 🛠️ **Skill recommendations** — what to learn next\n• 🎯 **Interview prep** — DSA, system design, behavioral\n• 📄 **Resume & portfolio** — optimization tips\n• 🤝 **Networking** — LinkedIn, communities, mentorship\n• ☁️ **Tech stack advice** — cloud, frontend, backend, ML\n• 💪 **Motivation** — overcoming burnout and staying focused\n\nJust type your question and I'll give you actionable advice!", suggestions: ["Career advice", "Salary data", "Learning path"] },

    // CATCH-ALL PATTERNS
    { keywords: ["best", "recommend", "suggest", "should i"], response: "🎯 Great question! To give you the best recommendation, I think about these factors:\n\n1. **Your current skills** — what transfers?\n2. **Market demand** — what's growing?\n3. **Salary potential** — what pays well?\n4. **Your interests** — what excites you?\n5. **Timeline** — how quickly do you need results?\n\nTry using the Dashboard's skill predictor to get a personalized analysis. Or tell me more about your specific situation and I can give targeted advice!", suggestions: ["Skill predictor", "Career comparison", "Market trends"] },
  ];

  const getSmartResponse = (input: string): { text: string; suggestions: string[] } => {
    const lower = input.toLowerCase();

    // Score each entry by how many keywords match
    let bestMatch: { score: number; entry: typeof knowledgeBase[0] | null } = { score: 0, entry: null };

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (lower.includes(keyword)) {
          score += keyword.length; // Longer keyword matches are more specific
        }
      }
      if (score > bestMatch.score) {
        bestMatch = { score, entry };
      }
    }

    if (bestMatch.entry) {
      return { text: bestMatch.entry.response, suggestions: bestMatch.entry.suggestions };
    }

    return {
      text: `Great question! 🤔 I'd love to help with that. Could you be more specific? For example, ask me about:\n\n• Career transitions & salary data\n• Skill recommendations for a target role\n• Interview preparation strategies\n• Learning resources & roadmaps\n• Market trends & demand\n\nThe more specific your question, the better I can assist you!`,
      suggestions: ["Career advice", "Skill recommendations", "Salary insights"]
    };
  };

  const handleSendChat = (overrideMsg?: string) => {
    const msg = overrideMsg || chatInput.trim();
    if (!msg) return;
    setChatMessages(prev => [...prev, { role: "user", text: msg }]);
    setChatInput("");
    setChatSuggestions([]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getSmartResponse(msg);
      setChatMessages(prev => [...prev, { role: "bot", text: response.text }]);
      setChatSuggestions(response.suggestions);
    }, 800 + Math.random() * 1200);
  };

  // Fetch initial data
  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data.skills || []))
      .catch((err) => console.error(err));

    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data.roles || []))
      .catch((err) => console.error(err));
  }, []);

  const toggleSkill = (skillName: string) => {
    if (selectedSkills.some(s => s.name === skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s.name !== skillName));
    } else {
      if (selectedSkills.length < 15) {
        setSelectedSkills([...selectedSkills, { name: skillName, confidence: 50 }]);
      }
    }
  };

  const updateSkillConfidence = (skillName: string, value: number) => {
    setSelectedSkills(prev => prev.map(s => s.name === skillName ? { ...s, confidence: value } : s));
  };

  const handlePredict = async () => {
    if (selectedSkills.length === 0) {
      setError("Please select at least one current skill.");
      return;
    }
    if (!targetRole) {
      setError("Please select a target role.");
      return;
    }
    setError("");
    setIsPredicting(true);
    setResults(null);

    // Mock target role skills for MVP (since API needs them)
    // In a real app, the API would fetch them from the DB
    // We send a hardcoded mock matching our seed for now
    const mockRoleSkills: Record<string, string[]> = {
      "Frontend Developer": ["HTML/CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Git"],
      "Backend Developer": ["Python", "Node.js", "SQL", "PostgreSQL", "Docker", "Git", "Go", "Java"],
      "Full Stack Developer": ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "Tailwind CSS"],
      "Data Scientist": ["Python", "Machine Learning", "Data Analysis", "Pandas", "SQL"],
      "Machine Learning Engineer": ["Python", "PyTorch", "TensorFlow", "Deep Learning", "Docker", "AWS", "SQL"]
    };

    const targetRoleName = roles.find(r => r.id === targetRole)?.title || "";
    const targetRoleSkills = mockRoleSkills[targetRoleName] || ["Python", "SQL", "Git", "React", "AWS"];

    try {
      const res = await fetch("http://localhost:8000/api/predict-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_skills: selectedSkills.map(s => s.name), // MVP logic ignores confidence level for Prediction, but UX requires it for Tier 1 profiling.
          target_role: targetRoleName,
          target_role_skills: targetRoleSkills
        })
      });

      if (!res.ok) throw new Error("Failed to predict");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Prediction Engine is currently unavailable. Ensure Python AI service is running on port 8000.");
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen p-6 md:p-10 font-sans selection:bg-brand-100 bg-section-dashboard bg-dots"
    >

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 md:p-8">
            <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <Activity className="w-5 h-5 text-brand-600" />
                Your Current Arsenal
              </h2>
              <p className="text-sm text-slate-500 mt-1">Select the tools you already know well.</p>

              <div className="mt-5 flex flex-wrap gap-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {skills.map((skill) => {
                  const isSelected = selectedSkills.some(s => s.name === skill.name);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill(skill.name)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${isSelected
                        ? 'bg-brand-900 border-brand-900 text-white shadow-[0_8px_16px_rgba(44,47,140,0.2)] scale-[1.02]'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-900 hover:shadow-sm'
                        }`}
                    >
                      {skill.name}
                    </button>
                  )
                })}
              </div>

              {selectedSkills.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">Set Confidence Levels</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {selectedSkills.map(skill => (
                      <div key={skill.name} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-slate-700">{skill.name}</span>
                          <span className="font-bold text-brand-600">{skill.confidence}%</span>
                        </div>
                        <input
                          type="range"
                          min="0" max="100"
                          value={skill.confidence}
                          onChange={(e) => updateSkillConfidence(skill.name, parseInt(e.target.value))}
                          className="w-full accent-brand-600 bg-slate-200 h-2 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-xs font-semibold text-slate-400 mt-4 text-right">
                {selectedSkills.length} selected
              </div>
            </div>

            <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <Target className="w-5 h-5 text-accent-500" />
                Target Career Path
              </h2>
              <p className="text-sm text-slate-500 mt-1">Where do you want to be?</p>

              <select
                className="mt-5 w-full p-4 rounded-full border-2 border-slate-200 bg-white shadow-sm focus:ring-0 focus:border-brand-600 outline-none text-slate-800 font-bold appearance-none transition-colors cursor-pointer hover:border-slate-300"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              >
                <option value="">Select a role...</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.title}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              onClick={handlePredict}
              disabled={isPredicting}
              className="w-full relative group overflow-hidden rounded-full bg-slate-900 border border-slate-800 text-white font-bold py-5 px-8 transition-all duration-300 hover:shadow-[0_12px_24px_rgba(44,47,140,0.25)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              <div className="absolute inset-0 bg-gradient-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-3">
                {isPredicting ? (
                  <div className="h-6 w-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-accent-300 group-hover:text-white transition-colors" />
                    <span className="text-lg">Predict My Next Skill</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Dashboard */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!results && !isPredicting ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full min-h-[500px] glass-panel flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-24 h-24 mb-6 rounded-full bg-indigo-50 flex items-center justify-center border-4 border-white shadow-inner">
                  <Zap className="w-10 h-10 text-indigo-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Awaiting Intelligence</h3>
                <p className="text-slate-500 max-w-sm">
                  Select your current skills and target role to generate a high-ROI transition map.
                </p>
              </motion.div>
            ) : isPredicting ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[500px] glass-panel flex flex-col items-center justify-center p-8 text-center"
              >
                <BrainCircuit className="w-16 h-16 text-brand-500 animate-pulse mb-6" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Simulating Pathways...</h3>
                <p className="text-slate-500 text-sm">Our AI is modeling semantic boundaries & skill transfer graphs.</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="glass-panel p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between">
                    <span>Top Recommendations</span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-brand-100 text-brand-700 rounded-full">High Transferability</span>
                  </h2>

                  <div className="space-y-4">
                    {results.recommendations?.length === 0 ? (
                      <p className="text-slate-500">You already possess all mapped skills for this role!</p>
                    ) : (
                      results.recommendations.map((rec: any, idx: number) => (
                        <div key={idx} className="group p-5 rounded-3xl border border-slate-100 bg-white hover:border-brand-200 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-start gap-5">
                          <div className={`w-14 h-14 rounded-full flex gap-1 items-center justify-center font-black text-xl shrink-0 shadow-inner ${idx === 0 ? 'bg-gradient-highlight text-white' :
                            idx === 1 ? 'bg-slate-100 text-slate-700' :
                              'bg-brand-50 text-brand-700'
                            }`}>
                            #{idx + 1}
                          </div>
                          <div className="flex-1 mt-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-xl font-bold text-slate-900">{rec.skill}</h4>
                              <div className="text-right">
                                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-highlight">{rec.impact_score}</div>
                                <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mt-0.5">Impact</div>
                              </div>
                            </div>

                            <p className="text-sm font-medium text-slate-600 mt-1 mb-4 pr-8 leading-relaxed">{rec.reason}</p>

                            <div className="grid grid-cols-2 gap-4 mb-5">
                              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated ROI</div>
                                <div className="text-sm font-black text-slate-800">{rec.time_to_roi}</div>
                              </div>
                              <div className="bg-brand-50 p-3 rounded-xl border border-brand-100">
                                <div className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-1">Salary Impact</div>
                                <div className="text-sm font-black text-brand-900">+{rec.salary_impact ? `$${rec.salary_impact.toLocaleString()}` : "Market Dep."}</div>
                              </div>
                            </div>

                            <div className="mb-4 flex items-center justify-between bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-xl">
                              <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                                <Activity className="w-4 h-4" />
                                Market Trend: Rising
                              </div>
                              <span className="text-xs font-semibold text-emerald-600">High Longevity</span>
                            </div>

                            <div className="mb-4">
                              <h5 className="text-xs font-bold text-slate-800 mb-2">Suggested Learning Path</h5>
                              <div className="space-y-2">
                                {rec.learning_resources?.map((lr: any, i: number) => (
                                  <Link key={i} href={`/path/${encodeURIComponent(rec.skill)}`} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-white hover:border-brand-200 hover:shadow-sm transition-all group/link">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">{lr.provider[0]}</div>
                                      <span className="text-xs font-semibold text-slate-700 group-hover/link:text-brand-600 transition-colors">{lr.title}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400">{lr.duration}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-bold text-accent-700 bg-accent-50 w-max px-3 py-1.5 rounded-full mt-2">
                              <ArrowRight className="w-3.5 h-3.5" />
                              Transfers from {rec.transfer_from}
                              <span className="ml-2 px-1.5 py-0.5 bg-white rounded text-[10px] opacity-70">
                                Match: {rec.transfer_score}/10
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Graph Area */}
                <div className="glass-panel p-6 h-80 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Impact Analysis</h3>
                  <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.recommendations} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="skill" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis domain={[0, 10]} hide />
                        <Tooltip
                          cursor={{ fill: '#f1f5f9', opacity: 0.5 }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="impact_score" radius={[6, 6, 6, 6]}>
                          {results.recommendations.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#14b8a6' : '#818cf8'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Personalized Learning Roadmap Widget */}
                {results.recommendations?.length > 0 && (
                  <div className="glass-panel p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-brand-600" />
                      Your 90-Day Transition Roadmap
                    </h3>
                    <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
                      {results.recommendations.slice(0, 3).map((rec: any, idx: number) => (
                        <div key={idx} className="relative pl-6">
                          <div className={`absolute -left-2 top-0.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${idx === 0 ? 'bg-brand-500' : 'bg-slate-300'}`} />
                          <Link href={`/roadmap/schedule/${idx + 1}`} className="block bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-300 transition-all group">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Phase {idx + 1}: {rec.skill}</h4>
                              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{rec.time_to_roi}</span>
                            </div>
                            <p className="text-sm text-slate-600">Complete the {rec.learning_resources?.[0]?.provider || 'Online'} certification to overcome the initial learning curve mapped from {rec.transfer_from}.</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== ANALYTICS OVERVIEW SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-6xl mx-auto mt-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Activity className="w-6 h-6 text-brand-600" />
            Analytics Overview
          </h2>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">Last 7 Days</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Skills Tracked", value: selectedSkills.length || 5, change: "+2", color: "text-brand-600", bg: "bg-brand-50", slug: "skills-tracked" },
            { label: "Hours Logged", value: "34.5", change: "+12%", color: "text-emerald-600", bg: "bg-emerald-50", slug: "hours-logged" },
            { label: "Readiness Score", value: "78%", change: "+5%", color: "text-violet-600", bg: "bg-violet-50", slug: "readiness-score" },
            { label: "Career Matches", value: "12", change: "+3", color: "text-amber-600", bg: "bg-amber-50", slug: "career-matches" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <Link href={`/analytics/${stat.slug}`} className="stat-card glass-panel p-5 rounded-2xl cursor-pointer block hover:ring-2 hover:ring-brand-300 transition-all">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                  <span className={`text-xs font-bold ${stat.color} ${stat.bg} px-1.5 py-0.5 rounded-md mb-1`}>{stat.change}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/analytics/skill-distribution">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 chart-container hover:ring-2 hover:ring-brand-300 cursor-pointer transition-all"
            >
              <h3 className="text-sm font-bold text-slate-700 mb-4">Skill Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Frontend', value: 35, fill: '#818CF8' },
                      { name: 'Backend', value: 25, fill: '#2EE6D6' },
                      { name: 'Data', value: 20, fill: '#A78BFA' },
                      { name: 'DevOps', value: 12, fill: '#FB923C' },
                      { name: 'Soft Skills', value: 8, fill: '#F472B6' },
                    ]}
                    cx="50%" cy="50%"
                    innerRadius={55} outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
                  />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </Link>

          <Link href="/analytics/weekly-activity">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6 chart-container hover:ring-2 hover:ring-brand-300 cursor-pointer transition-all"
            >
              <h3 className="text-sm font-bold text-slate-700 mb-4">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={[
                  { day: 'Mon', hours: 4.5, target: 3 },
                  { day: 'Tue', hours: 3.2, target: 3 },
                  { day: 'Wed', hours: 5.1, target: 3 },
                  { day: 'Thu', hours: 2.8, target: 3 },
                  { day: 'Fri', hours: 6.0, target: 3 },
                  { day: 'Sat', hours: 7.2, target: 3 },
                  { day: 'Sun', hours: 5.7, target: 3 },
                ]} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="hours" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} name="Hours" />
                  <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="6 4" dot={false} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </Link>

          <Link href="/analytics/career-readiness">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="glass-panel p-6 chart-container flex flex-col items-center justify-center hover:ring-2 hover:ring-brand-300 cursor-pointer transition-all"
            >
              <h3 className="text-sm font-bold text-slate-700 mb-4 self-start">Career Readiness</h3>
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#gaugeGrad)" strokeWidth="10"
                    strokeDasharray={`${78 * 3.14} ${100 * 3.14}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#2EE6D6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900">78%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ready</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">You&apos;re 78% ready for your target role transition</p>
            </motion.div>
          </Link>
        </div>

        <Link href="/analytics/skill-proficiency">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-panel p-6 chart-container mt-6 hover:ring-2 hover:ring-brand-300 cursor-pointer transition-all"
          >
            <h3 className="text-sm font-bold text-slate-700 mb-4">Skill Proficiency Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={[
                { subject: 'Frontend', A: 85, B: 70 },
                { subject: 'Backend', A: 65, B: 80 },
                { subject: 'DevOps', A: 45, B: 60 },
                { subject: 'Data Science', A: 55, B: 75 },
                { subject: 'System Design', A: 70, B: 65 },
                { subject: 'Soft Skills', A: 80, B: 55 },
              ]}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Your Skills" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Target Role" dataKey="B" stroke="#2EE6D6" fill="#2EE6D6" fillOpacity={0.1} strokeWidth={2} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </Link>
      </motion.div>

      {/* Floating AI Mentor Chat */}
      <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-brand-200/30"
              style={{ background: 'var(--chat-bg, #ffffff)' }}
            >
              <div className="bg-gradient-to-r from-brand-900 to-brand-700 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">TransSkill AI Mentor</h4>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-[10px] text-brand-200">Online & Ready</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-brand-200 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 h-80 flex flex-col gap-3 overflow-y-auto" style={{ background: 'var(--chat-body, #F8FAFC)' }}>
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === 'bot'
                      ? 'self-start rounded-tl-sm shadow-sm'
                      : 'bg-gradient-to-r from-brand-600 to-brand-500 text-white self-end rounded-tr-sm'
                      }`}
                    style={msg.role === 'bot' ? { background: 'var(--chat-bubble, #ffffff)', color: 'var(--chat-text, #334155)', border: '1px solid var(--chat-border, #E2E8F0)' } : undefined}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="self-start p-3 rounded-2xl rounded-tl-sm max-w-[60%] shadow-sm" style={{ background: 'var(--chat-bubble, #ffffff)', border: '1px solid var(--chat-border, #E2E8F0)' }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                {!isTyping && chatSuggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 self-start">
                    {chatSuggestions.map((s, i) => (
                      <button key={i} onClick={() => handleSendChat(s)}
                        className="text-xs px-3 py-1.5 rounded-full bg-brand-600/10 text-brand-600 font-semibold border border-brand-500/20 hover:bg-brand-600/20 transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-3 flex gap-2 border-t" style={{ background: 'var(--chat-bg, #ffffff)', borderColor: 'var(--chat-border, #E2E8F0)' }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                  placeholder="Ask about careers, skills, salaries..."
                  className="flex-1 text-sm p-3 rounded-xl border outline-none transition-colors"
                  style={{ background: 'var(--chat-input, #F1F5F9)', borderColor: 'var(--chat-border, #E2E8F0)', color: 'var(--chat-text, #334155)' }}
                />
                <button onClick={() => handleSendChat()} className="bg-gradient-to-r from-brand-600 to-accent-500 text-white p-3 rounded-xl hover:shadow-lg transition-all hover:scale-105">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 duration-300 ${chatOpen ? 'bg-slate-800 text-white' : 'bg-gradient-to-r from-brand-600 to-accent-500 text-white glow-brand'}`}
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

    </motion.main>
  );
}
