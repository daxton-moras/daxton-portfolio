// Every claim on the site traces to Daxton's verified career facts.
// Keep client and colleague names out, and keep project scope honest
// (personal / test-mode work is labelled as such).

// Production URL on Vercel. Update this if a custom domain is added.
export const siteUrl = 'https://daxton-portfolio-iota.vercel.app'

export const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'career', label: 'Career' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'contact', label: 'Contact' },
] as const

export const heroContent = {
    firstName: 'Daxton',
    lastName: 'Moras',
    location: 'Dublin, Ireland',
    availability: 'Open to Cloud & AI infrastructure roles',
    // Rendered with the highlighted phrases in a brighter tone.
    summary: [
        { text: 'AWS-certified ' },
        { text: 'Cloud & AI engineer', highlight: true },
        { text: ' running ' },
        { text: 'GPU-accelerated edge inference', highlight: true },
        { text: ' in production. I bring four years of enterprise-scale AWS to ' },
        { text: 'agentic AI', highlight: true },
        { text: ', ' },
        { text: 'cloud-native infrastructure', highlight: true },
        { text: ' and observability, from network discovery to go\u2011live.' },
    ],
    currently: ['Implementation Engineer', 'Physical AI & Edge Systems at Protex AI'],
    // Cycled in the hero's terminal line: certifications, awards and disciplines.
    typed: [
        'AWS Certified Solutions Architect – Associate',
        'AWS Certified AI Practitioner',
        'AWS Certified Cloud Practitioner',
        'AWS All-Rounder Award',
        'AWS Wise Guru Award',
        'Solutions engineering',
        'Deployment engineering',
    ],
}

export const focusAreas = [
    'Agentic AI',
    'Edge AI',
    'NVIDIA GPUs',
    'AWS',
    'Kubernetes',
    'Docker',
    'Terraform',
    'Python',
    'SQL',
    'Linux',
    'Networking',
    'Observability',
]

// Public Credly verification pages for each certification and award.
const credly = (id: string) => `https://www.credly.com/badges/${id}`

export type BadgeLink = { label: string; href: string }

const badges = {
    solutionsArchitect: credly('fadf5281-c85f-4e35-ba4b-a30b808920d3'),
    aiPractitioner: credly('04c1fa91-e96a-4ebe-9152-1f4a6a4721a0'),
    cloudPractitioner: credly('c452e8db-2eae-45a7-88bf-9eb8b1e85d6f'),
    mvp: [credly('fb1322a2-d7c8-4eb8-85f7-db71017354b1'), credly('14724238-846d-4607-b4ac-2480ad040ea4')],
    allRounder: credly('410d2ec2-0e23-4f7c-9ad8-fa42bd2501cb'),
    wiseGuru: credly('623f6388-9c75-4d42-b338-22b3e66e68ab'),
}

const mvpLinks: BadgeLink[] = badges.mvp.map((href, i) => ({ label: `Badge ${i + 1}`, href }))

export const aboutContent = {
    eyebrow: 'Behind the terminal',
    title: 'Part cloud whisperer, part AI agent wrangler, full\u2011time GPU enthusiast',
    lead: 'I make systems behave in places they\'d rather not: locked-down enterprise networks, multi-terabyte data warehouses and GPU boxes running AI on customer sites.',
    paragraphs: [
        'By day I deploy bare-metal Ubuntu devices powered by NVIDIA GPUs into client infrastructure. That means negotiating with firewalls, coaxing Linux into cooperating, and once swapping GPUs into replacement hardware because the newer cards weren\'t supported yet. (They are now. I like to think word got around.)',
        'Before that, four years at AWS taught me that every "the database is slow" ticket has a root cause, and it\'s usually a queue. Two MVP awards later, I still enjoy a well-tuned workload management config more than is strictly normal.',
        'These days I\'m working hands-on with AI agents (Claude-maxxing, if you like), handing them the boring parts of the job so I get the fun ones, and I\'m making my way through NVIDIA\'s AI Infrastructure and Operations course. Next stop: GPU clusters, agentic AI and infrastructure that keeps AI workloads fed.',
    ],
    credentials: [
        {
            kicker: 'AWS Certified',
            title: 'Solutions Architect – Associate',
            note: null,
            links: [{ label: 'Verify on Credly', href: badges.solutionsArchitect }],
        },
        {
            kicker: 'AWS Certified',
            title: 'AI Practitioner',
            note: null,
            links: [{ label: 'Verify on Credly', href: badges.aiPractitioner }],
        },
        { kicker: 'AWS Award', title: 'Most Valuable Player (MVP)', note: 'Awarded twice', links: mvpLinks },
        {
            kicker: 'AWS Award',
            title: 'All-Rounder Award',
            note: null,
            links: [{ label: 'Verify on Credly', href: badges.allRounder }],
        },
        {
            kicker: 'AWS Award',
            title: 'Wise Guru Award',
            note: null,
            links: [{ label: 'Verify on Credly', href: badges.wiseGuru }],
        },
    ] as { kicker: string; title: string; note: string | null; links: BadgeLink[] }[],
}

export const skillGroups = [
    {
        title: 'Cloud',
        items: ['AWS', 'AWS Lambda'],
    },
    {
        title: 'AI, GPU & Edge',
        items: ['Edge AI deployment', 'NVIDIA GPU hardware', 'Bare-metal Ubuntu', 'AWS IoT Greengrass'],
    },
    {
        title: 'Agentic AI & Automation',
        items: ['AI agents (Claude)', 'Python scripting', 'Bash', 'REST APIs'],
    },
    {
        title: 'Data & Analytics',
        items: [
            'Amazon Redshift',
            'SQL performance tuning',
            'Amazon Athena',
            'Lake Formation',
            'AWS DMS',
            'Amazon QuickSight',
            'PostgreSQL',
            'MongoDB',
            'NoSQL databases',
            'Amazon Neptune',
        ],
    },
    {
        title: 'DevOps & Observability',
        items: ['Terraform', 'Kubernetes', 'GitHub Actions', 'CloudWatch', 'Prometheus', 'Grafana'],
    },
    {
        title: 'Networking',
        items: [
            'Network security',
            'Linux administration',
            'Load balancers',
            'Proxies',
            'VLANs & VPNs',
            'TCP/TLS troubleshooting',
        ],
    },
]

export const practiceSkills = {
    title: 'Practice',
    items: [
        'Root cause analysis',
        'Escalation management',
        'Customer onboarding & go-live',
        'Proof-of-concept delivery',
        'Stakeholder management',
        'Runbooks & documentation',
        'Technical enablement',
    ],
}

export const projects = [
    {
        title: 'Stock Market Price Ingestion Pipeline',
        context: 'Personal project · 2026',
        description:
            'A scheduled end-of-day price ingestion worker in Python that pulls US and Indian market data via yfinance and writes idempotent upserts to MongoDB Atlas. Runs as a Kubernetes CronJob with bounded retries and a run deadline, instrumented with Datadog APM and monitors defined in Terraform.',
        tags: ['Python', 'MongoDB Atlas', 'Kubernetes', 'Docker', 'Datadog', 'Terraform', 'Helm'],
        href: null,
        linkLabel: 'Private repository',
    },
    {
        title: 'NYC Taxi Batch Data Pipeline',
        context: 'Personal project · 2026',
        description:
            'A reproducible batch pipeline that downloads NYC taxi trip data, loads it into PostgreSQL staging tables and transforms it into a date dimension and trip fact table, with SQL data-quality checks and a Streamlit dashboard on top.',
        tags: ['Python', 'pandas', 'SQLAlchemy', 'PostgreSQL', 'Docker Compose', 'Streamlit'],
        href: 'https://github.com/daxton-moras/nyc-taxi-data-pipeline',
        linkLabel: 'View on GitHub',
    },
    {
        title: 'Marketplace Payments & Partner API Design',
        context: 'Independent project (Stripe test mode) · 2026',
        description:
            'Designed and demonstrated a food-delivery marketplace funds flow on Stripe Connect in test mode, splitting payments between restaurant, courier and platform. Also designed a versioned partner REST API contract with webhooks, idempotent ordering and canonical status mapping.',
        tags: ['Stripe Connect', 'REST APIs', 'Webhooks', 'Idempotency', 'API design'],
        href: null,
        linkLabel: null,
    },
]

export type CareerEntry = {
    kind: 'experience' | 'education'
    period: string
    title: string
    subtitle: string | null
    org: string
    summary: string | null
    highlights: string[]
    tags: string[]
}

export const career: CareerEntry[] = [
    {
        kind: 'experience',
        period: 'Nov 2025 – Present',
        title: 'Implementation Engineer',
        subtitle: 'Physical AI & Edge Systems',
        org: 'Protex AI · Dublin',
        summary:
            'Owning end-to-end deployment of Linux GPU edge systems that run computer vision safety models, taking 14+ sites live to date.',
        highlights: [
            'Took two greenfield sites live in 7 and 20 days from deal close by front-loading network, security and camera readiness.',
            'Unblocked a stalled Fortune 500 manufacturing rollout by tracing failures to firewall URL rules, reaching 39 of 39 endpoints passing.',
            'Built a CTO engineering dashboard end to end: Python on GitHub Actions pulls Jira data into S3 for a Vue.js front end on AWS Amplify.',
        ],
        tags: ['Linux', 'NVIDIA GPUs', 'Networking', 'IoT Greengrass', 'Grafana', 'Python', 'GitHub Actions'],
    },
    {
        kind: 'experience',
        period: 'Nov 2021 – Nov 2025',
        title: 'Cloud Support Engineer',
        subtitle: 'Analytics',
        org: 'Amazon Web Services · Dublin',
        summary:
            'Redshift subject-matter expert and on-call escalation manager, resolving an average of 35–40 cases a month through deep-dive root cause analysis.',
        highlights: [
            'Diagnosed a Redshift Concurrency Scaling bug behind peak-hour queuing, cleared it with queue changes and handed the service team a confirmed repro. The fix shipped.',
            'Guided customers through zero-downtime database-to-warehouse migrations with AWS DMS, including RDS PostgreSQL to Redshift.',
            'Maintained 100% CSAT throughout the role, with every customer rating 4 or 5 stars.',
        ],
        tags: ['Amazon Redshift', 'Athena', 'Lake Formation', 'AWS DMS', 'WLM', 'CloudWatch'],
    },
    {
        kind: 'education',
        period: 'Jan 2020 – 2022',
        title: 'MSc Data Analytics',
        subtitle: null,
        org: 'Dublin Business School · Dublin',
        summary: null,
        highlights: [],
        tags: [],
    },
    {
        kind: 'education',
        period: 'Jun 2014 – 2018',
        title: 'BSc Computer Science',
        subtitle: null,
        org: 'St. Francis Institute of Technology · Mumbai',
        summary: null,
        highlights: [],
        tags: [],
    },
]

export const certifications: { name: string; status: string; href: string | null }[] = [
    { name: 'AWS Certified Solutions Architect – Associate', status: 'Certified', href: badges.solutionsArchitect },
    { name: 'AWS Certified AI Practitioner', status: 'Certified', href: badges.aiPractitioner },
    { name: 'AWS Certified Cloud Practitioner', status: 'Certified', href: badges.cloudPractitioner },
]

export const awards: { name: string; note: string | null; links: BadgeLink[] }[] = [
    { name: 'AWS Most Valuable Player (MVP) Award', note: 'Awarded twice', links: mvpLinks },
    { name: 'AWS All-Rounder Award', note: null, links: [{ label: 'Verify', href: badges.allRounder }] },
    { name: 'AWS Wise Guru Award', note: null, links: [{ label: 'Verify', href: badges.wiseGuru }] },
]

export const contactContent = {
    title: "Let's Connect",
    blurb: 'Open to conversations about cloud, data and AI infrastructure roles, or just a good debugging story.',
    email: 'moras.daxton@gmail.com',
    links: [
        { label: 'GitHub', handle: '@daxton-moras', href: 'https://github.com/daxton-moras' },
        { label: 'LinkedIn', handle: 'daxtonmoras', href: 'https://www.linkedin.com/in/daxtonmoras' },
    ],
}
