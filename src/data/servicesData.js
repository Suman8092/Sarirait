export const serviceCategories = [
  {
    id: "development",
    number: "01",
    title: "Development Solutions",
    description: "Build powerful digital products with modern technology and scalable development.",
    accent: "cyan",
    accentColor: "#00f0ff",
    services: [
      {
        slug: "website-development",
        title: "Website Development",
        shortDesc: "Modern, responsive and high-performance websites built for business growth.",
        icon: "Globe",
        badge: "Next.js / React / Performance",
        features: [
          "Jamstack & SSR Architectures (Next.js & Astro)",
          "Sub-second page load speeds & 100/100 Core Web Vitals",
          "Responsive, pixel-perfect fluid design systems",
          "Headless CMS integration (Sanity, Strapi, Contentful)",
          "Enterprise security hardening & SSL automation",
          "Automated CI/CD pipelines & edge CDN delivery"
        ],
        benefits: [
          { value: "<0.8s", label: "Average First Contentful Paint" },
          { value: "+64%", label: "Mobile Engagement Lift" },
          { value: "99.99%", label: "Uptime SLA Guarantee" }
        ]
      },
      {
        slug: "mobile-app-development",
        title: "Mobile App Development",
        shortDesc: "Scalable mobile applications for Android and iOS.",
        icon: "Smartphone",
        badge: "iOS / Android / Flutter",
        features: [
          "Cross-platform Flutter & React Native development",
          "Native iOS (Swift) & Android (Kotlin) engineering",
          "Offline-first sync & local database architecture",
          "Secure biometric authentication & Apple/Google Pay",
          "Real-time push notifications & background services",
          "App Store & Google Play submission management"
        ],
        benefits: [
          { value: "60 FPS", label: "Native Smooth Rendering" },
          { value: "4.9★", label: "App Store User Rating Target" },
          { value: "1-Codebase", label: "Multi-Platform Efficiency" }
        ]
      },
      {
        slug: "web-applications",
        title: "Web Applications",
        shortDesc: "Custom web applications designed around business workflows and user needs.",
        icon: "LayoutGrid",
        badge: "Full-Stack SaaS / Portals",
        features: [
          "Complex state management & reactive dashboards",
          "Role-based access control (RBAC) & OAuth2/SSO",
          "High-throughput RESTful & GraphQL APIs",
          "Real-time WebSocket event streaming",
          "Automated testing suites (Unit, Integration & E2E)",
          "Containerized Docker & Kubernetes deployments"
        ],
        benefits: [
          { value: "10x", label: "Workflow Automation Velocity" },
          { value: "Zero", label: "Vendor Monolith Lock-in" },
          { value: "SOC2", label: "Compliance-Ready Codebase" }
        ]
      },
      {
        slug: "ecommerce-solutions",
        title: "E-Commerce Solutions",
        shortDesc: "Conversion-focused e-commerce platforms with secure payments and scalable architecture.",
        icon: "ShoppingBag",
        badge: "Shopify / WooCommerce / Custom",
        features: [
          "Custom headless storefronts & headless Shopify",
          "High-volume WooCommerce & Magento architectures",
          "Global payment gateways (Stripe, PayPal, Apple Pay)",
          "Dynamic product configuration & 3D AR previews",
          "Inventory, ERP & multi-warehouse synchronization",
          "Cart abandonment recovery & one-click checkouts"
        ],
        benefits: [
          { value: "+38%", label: "Checkout Conversion Lift" },
          { value: "100K+", label: "Concurrent Shopper Capacity" },
          { value: "<1.2s", label: "Global Checkout Latency" }
        ]
      },
      {
        slug: "website-maintenance",
        title: "Website Maintenance",
        shortDesc: "Reliable maintenance, security updates, performance optimization and technical support.",
        icon: "ShieldCheck",
        badge: "24/7 Monitoring / Security",
        features: [
          "24/7 automated uptime & latency monitoring",
          "Continuous security patching & malware prevention",
          "Weekly offsite encrypted cloud backups",
          "Core Web Vitals auditing & speed optimization",
          "Database defragmentation & asset purging",
          "Dedicated technical SLA support hours"
        ],
        benefits: [
          { value: "99.98%", label: "Uptime Retention" },
          { value: "15-min", label: "Emergency Response Window" },
          { value: "100%", label: "Data Recovery Assurance" }
        ]
      },
      {
        slug: "ppc-marketing",
        title: "Pay Per Click Marketing",
        shortDesc: "Performance-focused PPC campaigns designed to drive qualified traffic and leads.",
        icon: "TrendingUp",
        badge: "High-Intent Lead Gen",
        features: [
          "High-intent search keyword architecture",
          "Ad copywriting & multivariate A/B testing",
          "Custom dedicated landing page design & optimization",
          "Conversion tracking & server-side tracking (CAPI)",
          "Negative keyword sculpting & bid management",
          "Transparent weekly ROI & lead attribution reporting"
        ],
        benefits: [
          { value: "4.2x", label: "Average Return on Ad Spend (ROAS)" },
          { value: "-32%", label: "Cost Per Acquisition Reduction" },
          { value: "100%", label: "Transparent Attributed Revenue" }
        ]
      }
    ]
  },
  {
    id: "marketing",
    number: "02",
    title: "Digital Marketing",
    description: "Grow your online presence with measurable digital marketing strategies.",
    accent: "blue",
    accentColor: "#38bdf8",
    services: [
      {
        slug: "seo-services",
        title: "SEO Services",
        shortDesc: "Technical SEO, content optimization and search visibility strategies.",
        icon: "Search",
        badge: "Organic Search / High Intent",
        features: [
          "Technical crawlability, indexation & schema markup",
          "Competitor keyword intelligence & search gap analysis",
          "Editorial content hubs & high-authority link building",
          "Core Web Vitals engineering & mobile search priority",
          "International hreflang & multi-region SEO architecture",
          "Real-time ranking telemetry & organic revenue attribution"
        ],
        benefits: [
          { value: "+210%", label: "Organic Search Traffic Lift" },
          { value: "#1 Rank", label: "High-Value Commercial Keywords" },
          { value: "3.5x", label: "Inbound Pipeline Expansion" }
        ]
      },
      {
        slug: "google-business-profile",
        title: "Google Business Profile",
        shortDesc: "Optimize local presence and improve visibility across Google Search and Maps.",
        icon: "MapPin",
        badge: "Local SEO / Google Maps",
        features: [
          "Complete profile optimization & category geo-targeting",
          "Automated review collection & reputation workflows",
          "Local citation consistency & NAP synchronization",
          "Geo-tagged visual updates & weekly business posts",
          "Local Pack 3-box ranking optimization",
          "Direct call, direction, and conversion analytics"
        ],
        benefits: [
          { value: "+175%", label: "Google Maps Discovery Inquiries" },
          { value: "Top 3", label: "Local Pack Domination" },
          { value: "+85%", label: "Direct Phone Call Leads" }
        ]
      },
      {
        slug: "social-media-marketing",
        title: "Social Media Marketing",
        shortDesc: "Build brand awareness and engagement through strategic social media campaigns.",
        icon: "Share2",
        badge: "Brand Voice & Audience",
        features: [
          "Omnichannel content strategy (LinkedIn, IG, X, YouTube)",
          "High-production visual assets & motion graphics",
          "Community management & proactive sentiment engagement",
          "Influencer partnership curation & collaboration",
          "Brand narrative storytelling & founder personal branding",
          "Comprehensive monthly engagement & reach benchmarks"
        ],
        benefits: [
          { value: "+340%", label: "Brand Impression Reach" },
          { value: "8.5%", label: "Average Organic Engagement Rate" },
          { value: "10x", label: "Qualified Community Growth" }
        ]
      },
      {
        slug: "google-meta-ads",
        title: "Google & Meta Ads",
        shortDesc: "Performance advertising campaigns across Google Ads, Facebook and Instagram.",
        icon: "Target",
        badge: "Omnichannel Paid Media",
        features: [
          "Full-funnel Google Performance Max & Search ads",
          "Meta (Facebook & Instagram) dynamic catalog ads",
          "First-party Conversions API (CAPI) server integration",
          "Lookalike audience modeling & behavioral retargeting",
          "Creative fatigue cycling & continuous ad iteration",
          "Predictive budget allocation algorithm tuning"
        ],
        benefits: [
          { value: "5.1x", label: "Blended Paid ROAS" },
          { value: "-40%", label: "Wasted Ad Spend Cut" },
          { value: "24/7", label: "Algorithmic Bid Protection" }
        ]
      },
      {
        slug: "email-marketing",
        title: "Email Marketing",
        shortDesc: "Targeted email campaigns focused on engagement, retention and conversions.",
        icon: "Mail",
        badge: "Klaviyo / Automated Flows",
        features: [
          "Behavior-triggered lifecycle automation flows",
          "Welcome series, cart abandonment & win-back campaigns",
          "Hyper-personalized dynamic product recommendations",
          "Custom responsive HTML email template engineering",
          "DKIM, SPF, DMARC deliverability optimization",
          "List cleaning, segmentation & zero-inbox-spam compliance"
        ],
        benefits: [
          { value: "48%", label: "Average Open Rate Benchmark" },
          { value: "+28%", label: "Direct Email Attributed Revenue" },
          { value: "99.4%", label: "Inbox Delivery Rate" }
        ]
      },
      {
        slug: "whatsapp-marketing",
        title: "WhatsApp Marketing",
        shortDesc: "Direct customer communication and marketing campaigns through WhatsApp.",
        icon: "MessageCircle",
        badge: "WhatsApp Business API",
        features: [
          "Official WhatsApp Business Platform API setup",
          "Automated 24/7 customer conversational triage chatbots",
          "Order status, shipping & transactional alert triggers",
          "Targeted promotional broadcast campaigns & newsletters",
          "Interactive catalog browsing & in-chat ordering",
          "CRM synchronization (HubSpot, Salesforce, Zoho)"
        ],
        benefits: [
          { value: "98%", label: "Message Open Rate within 5 Mins" },
          { value: "45%", label: "Direct Interactive Click-Through" },
          { value: "Instant", label: "Customer Service Response" }
        ]
      }
    ]
  },
  {
    id: "creative",
    number: "03",
    title: "Creative Services",
    description: "Creative solutions that help businesses build memorable brands and powerful visual experiences.",
    accent: "violet",
    accentColor: "#8a2be2",
    services: [
      {
        slug: "branding-solutions",
        title: "Branding Solutions",
        shortDesc: "Strategic branding systems that create a consistent business identity.",
        icon: "Sparkles",
        badge: "Brand Identity Systems",
        features: [
          "Brand positioning, archetype & tonal voice guidelines",
          "Color psychology palettes & typography pairing systems",
          "Comprehensive digital & print brand identity book",
          "Marketing collateral systems (decks, business cards, signage)",
          "UI component library style guide integration",
          "Brand rollout strategy & internal stakeholder alignment"
        ],
        benefits: [
          { value: "Iconic", label: "Market Memorability & Moat" },
          { value: "Unified", label: "Cohesive Across All Channels" },
          { value: "Premium", label: "Price Power Perception" }
        ]
      },
      {
        slug: "graphic-design",
        title: "Graphic Design",
        shortDesc: "Professional creative design for digital and business communication.",
        icon: "Palette",
        badge: "Visual Communication",
        features: [
          "Digital marketing banners & advertising creatives",
          "Custom infographic design & complex data visualization",
          "Investor pitch deck & sales presentation design",
          "Annual reports, whitepapers & product catalogs",
          "Packaging design & high-resolution 3D mockups",
          "Fast-turnaround iterative creative sprint cycles"
        ],
        benefits: [
          { value: "High-Res", label: "Vector & Print-Ready Assets" },
          { value: "3x", label: "Faster Design Turnaround" },
          { value: "Engaging", label: "Visual Communication Impact" }
        ]
      },
      {
        slug: "packaging-product-design",
        title: "Packaging & Product Design",
        shortDesc: "Creative packaging and product visuals designed to strengthen brand identity and product presentation.",
        icon: "Package",
        badge: "Packaging & 3D Mockups",
        features: [
          "Custom structural packaging design & dieline engineering",
          "Retail box, bottle, pouch & label artwork development",
          "Photorealistic 3D product rendering & mockup visualization",
          "Eco-friendly sustainable material specification consulting",
          "Regulatory compliance labeling & barcode integration",
          "Full prepress color profiling & print vendor management"
        ],
        benefits: [
          { value: "+52%", label: "Shelf Impact & Purchase Intent" },
          { value: "3D Ultra-HD", label: "Render Precision" },
          { value: "100%", label: "Print Production Ready" }
        ]
      },
      {
        slug: "reels-video-marketing",
        title: "Reels & Video Marketing",
        shortDesc: "Short-form video content designed for social media growth and engagement.",
        icon: "Video",
        badge: "Viral Short-Form Motion",
        features: [
          "Concept scripting & viral hook optimization",
          "Dynamic kinetic typography & sound design editing",
          "Product 3D animation & motion graphic overlays",
          "TikTok, Instagram Reels & YouTube Shorts format grading",
          "Batch production sprint workflows (10-30 assets/mo)",
          "Content performance analytics & retention graph analysis"
        ],
        benefits: [
          { value: "5.4x", label: "Higher Algorithm Reach vs Static" },
          { value: "+82%", label: "Audience Retention Rate" },
          { value: "Turnkey", label: "Script-to-Delivery Pipeline" }
        ]
      },
      {
        slug: "logo-branding",
        title: "Logo & Branding",
        shortDesc: "Professional logo design and complete visual identity development.",
        icon: "PenTool",
        badge: "Signature Mark & Logo",
        features: [
          "Exploratory creative moodboards & ideation sketches",
          "Primary logomark, wordmark & submark responsive lockups",
          "Monochrome, inverted, and favicon adaptation formats",
          "Clear-space rules, minimum sizing & misapplication bounds",
          "Complete source files (.AI, .EPS, .SVG, .PNG, .PDF)",
          "Full commercial copyright & trademark-ready handoff"
        ],
        benefits: [
          { value: "100%", label: "Original Trademarkable Artwork" },
          { value: "Versatile", label: "From 16px Favicon to 50ft Billboard" },
          { value: "Timeless", label: "Engineered for 10+ Year Longevity" }
        ]
      }
    ]
  },
  {
    id: "business",
    number: "04",
    title: "Business Solutions",
    description: "Transform business operations with intelligent software and cloud solutions.",
    accent: "indigo",
    accentColor: "#6366f1",
    services: [
      {
        slug: "erp-solutions",
        title: "ERP Solutions",
        shortDesc: "Integrated enterprise software for finance, operations, inventory and business management.",
        icon: "Database",
        badge: "Enterprise Operations",
        features: [
          "Unified multi-entity accounting & financial ledger",
          "Real-time inventory, procurement & supply chain tracking",
          "Human resources, payroll & workforce performance modules",
          "Custom manufacturing & shop-floor production planning",
          "Granular role-based security & audit logging",
          "Automated financial close & statutory tax reporting"
        ],
        benefits: [
          { value: "-60%", label: "Manual Reconciliation Time" },
          { value: "Real-time", label: "Global Inventory Visibility" },
          { value: "100%", label: "Audit & Compliance Confidence" }
        ]
      },
      {
        slug: "crm-software",
        title: "CRM Software",
        shortDesc: "Customer relationship management systems for sales, support and customer growth.",
        icon: "Users",
        badge: "Sales Pipeline & Retention",
        features: [
          "Bespoke CRM engineering & HubSpot/Salesforce integrations",
          "Visual sales pipeline stages & deal velocity tracking",
          "Omnichannel customer interaction history timeline",
          "Automated lead scoring & smart task delegation",
          "Customer support ticket routing & SLA escalation",
          "Predictive revenue forecasting & rep performance dashboards"
        ],
        benefits: [
          { value: "+35%", label: "Sales Rep Close Rate Lift" },
          { value: "360°", label: "Unified Customer View" },
          { value: "0", label: "Dropped Lead Opportunities" }
        ]
      },
      {
        slug: "saas-solutions",
        title: "SaaS Solutions",
        shortDesc: "Cloud-based software products designed for recurring digital business models.",
        icon: "Layers",
        badge: "Multi-Tenant Cloud SaaS",
        features: [
          "Isolated multi-tenant database & workspace partitioning",
          "Recurring subscription billing (Stripe Billing, Paddle)",
          "Self-serve customer onboarding & tour workflows",
          "Usage-based metering, tier limits & feature flags",
          "Public developer APIs, webhooks & documentation portals",
          "Comprehensive product telemetry & cohort retention metrics"
        ],
        benefits: [
          { value: "99.99%", label: "High Availability Architecture" },
          { value: "Zero", label: "Tenant Data Cross-Bleed" },
          { value: "Fast", label: "MVP-to-Scale Path" }
        ]
      },
      {
        slug: "cloud-solutions",
        title: "Cloud Solutions",
        shortDesc: "Scalable cloud infrastructure, deployment and technology solutions.",
        icon: "Cloud",
        badge: "AWS / Google Cloud / Azure",
        features: [
          "Infrastructure as Code (Terraform, Pulumi)",
          "Serverless computing & auto-scaling microservices",
          "Cloud security posture management & zero-trust IAM",
          "Multi-region disaster recovery & automated failover",
          "FinOps cloud cost audits & container rightsizing",
          "Kubernetes (EKS/GKE) orchestration & service mesh"
        ],
        benefits: [
          { value: "-42%", label: "Monthly Cloud Bill Reduction" },
          { value: "Zero", label: "Single Points of Failure" },
          { value: "<50ms", label: "Global Edge Latency" }
        ]
      },
      {
        slug: "custom-software-development",
        title: "Custom Software Development",
        shortDesc: "Business-specific software designed to solve unique operational challenges.",
        icon: "Code2",
        badge: "Tailored Architecture",
        features: [
          "Deconstructed business requirements & software modeling",
          "Modular clean architecture with type-safe languages",
          "Internal workflow automation tools & admin control panels",
          "Legacy code refactoring & modern API bridge wrappers",
          "Strict IP ownership transfer & complete source code delivery",
          "Post-launch warranty, documentation & engineer handover"
        ],
        benefits: [
          { value: "100%", label: "Bespoke to Your Workflow" },
          { value: "Full IP", label: "No Ongoing Licensing Fees" },
          { value: "Infinite", label: "Tailored Extensibility" }
        ]
      }
    ]
  }
];

// Helper to find service by slug across all categories
export function getServiceBySlug(slug) {
  for (const cat of serviceCategories) {
    const srv = cat.services.find(s => s.slug === slug);
    if (srv) {
      return { ...srv, categoryData: cat };
    }
  }
  return null;
}

// All flat services list
export const allServices = serviceCategories.flatMap(cat => 
  cat.services.map(srv => ({ ...srv, categoryData: cat }))
);
