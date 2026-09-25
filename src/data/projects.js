export const projectsData = [
  {
    id: "aetheria-ai",
    title: "Aetheria Cloud AI",
    category: "AI & Cloud Infrastructure",
    year: "2025",
    client: "Aetheria Systems",
    industry: "Enterprise SaaS & Artificial Intelligence",
    services: ["AI Integration", "Cloud Architecture", "UI/UX Design", "React Web Platform"],
    description: "Architected an autonomous multi-modal intelligence orchestration platform processing 14M+ daily token streams with sub-35ms pipeline latency.",
    challenge: "Aetheria needed a high-bandwidth visual monitoring console capable of rendering complex real-time neural workflows and agent interactions without dropping below 60fps.",
    solution: "We engineered a WebGL-accelerated canvas interface powered by Next.js and custom Three.js nodes, connected via WebSockets to distributed inference clusters.",
    results: [
      { label: "Pipeline Latency", value: "< 35ms" },
      { label: "Daily Token Load", value: "14.2M" },
      { label: "Enterprise Retention", value: "98.4%" },
      { label: "Series B Funding", value: "$42M" }
    ],
    techStack: ["Next.js", "Three.js", "Python / PyTorch", "Supabase", "Tailwind CSS", "Docker"],
    themeColor: "from-cyan-500/20 to-blue-600/20",
    accentColor: "#00f0ff",
    mockupType: "ai-dashboard",
    linkText: "View Case Study"
  },
  {
    id: "novafin",
    title: "NovaFin Capital",
    category: "Fintech & Web Application",
    year: "2025",
    client: "NovaFin Holdings Ltd.",
    industry: "Institutional Digital Assets & Banking",
    services: ["Fintech Platform", "Security Architecture", "Web Application", "Design System"],
    description: "Next-generation institutional wealth allocation platform featuring multi-signature custody, algorithmic rebalancing, and real-time ledger settlement.",
    challenge: "Legacy banking interfaces were unintuitive and slow, creating operational bottlenecking for institutional asset managers handling nine-figure order books.",
    solution: "Built a military-grade encrypted web application utilizing reactive state machines, micro-frontend architecture, and zero-latency WebSocket streaming feeds.",
    results: [
      { label: "Assets Under Mgmt", value: "$2.4B+" },
      { label: "Settlement Speed", value: "< 2.1s" },
      { label: "Security Audit", value: "100% Pass" },
      { label: "User Adoption", value: "+320%" }
    ],
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Web3 / Cryptography", "Tailwind CSS"],
    themeColor: "from-purple-500/20 to-indigo-600/20",
    accentColor: "#8a2be2",
    mockupType: "fintech-app",
    linkText: "View Case Study"
  },
  {
    id: "kinetics-health",
    title: "Kinetics Autonomous Health",
    category: "Mobile & IoT Platform",
    year: "2024",
    client: "Kinetics Medical Labs",
    industry: "HealthTech & Wearable Biosensors",
    services: ["Mobile App Development", "IoT Bluetooth Sync", "Biometric Visuals", "Backend APIs"],
    description: "Real-time biometric analytics ecosystem connecting continuous glucose monitors and PPG rings to predictive metabolic guidance algorithms.",
    challenge: "Streaming continuous Bluetooth Low Energy (BLE) packet telemetry without draining phone battery, while visualizing physiological metrics gracefully.",
    solution: "Designed and engineered an ultra-optimized cross-platform mobile engine featuring background BLE synchronization, offline storage, and interactive 3D anatomy models.",
    results: [
      { label: "Active Mobile Users", value: "480K+" },
      { label: "Battery Overhead", value: "< 2.3%/day" },
      { label: "App Store Rating", value: "4.9 ★" },
      { label: "Early Detection Rate", value: "+74%" }
    ],
    techStack: ["React Native", "TypeScript", "Express", "MongoDB", "Bluetooth LE", "Framer Motion"],
    themeColor: "from-emerald-500/20 to-cyan-600/20",
    accentColor: "#10b981",
    mockupType: "mobile-health",
    linkText: "View Case Study"
  },
  {
    id: "aura-luxury",
    title: "Aura Atelier",
    category: "E-commerce & 3D Interactive",
    year: "2024",
    client: "Aura Haute Horlogerie",
    industry: "Luxury Goods & High Horology",
    services: ["3D Product Configurator", "Headless E-commerce", "Brand Identity", "SEO Strategy"],
    description: "Immersive 3D digital flagship featuring photorealistic WebGL watch configurators, micro-mechanical exploded views, and global boutique concierge booking.",
    challenge: "Elevating the digital watch buying experience to rival a private Geneva salon visit with instantaneous 3D material customization.",
    solution: "Engineered a custom Three.js PBR shader pipeline with real-time anisotropic reflections and a headless commerce backend supporting multi-currency checkout.",
    results: [
      { label: "Conversion Lift", value: "+186%" },
      { label: "Avg Session Time", value: "6m 42s" },
      { label: "Global Boutiques", value: "28 Connected" },
      { label: "Awwwards Winner", value: "Site of the Day" }
    ],
    techStack: ["Next.js", "Three.js", "WebGL Shaders", "Tailwind CSS", "WooCommerce Headless"],
    themeColor: "from-amber-500/20 to-rose-600/20",
    accentColor: "#f59e0b",
    mockupType: "luxury-watch",
    linkText: "View Case Study"
  }
];
