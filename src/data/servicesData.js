const makeService = (slug, title, icon, badge, shortDesc, features) => ({
  slug,
  title,
  icon,
  badge,
  shortDesc,
  features,
  benefits: [
    { value: "Clear scope", label: "Priorities agreed together" },
    { value: "For your audience", label: "Designed around real needs" },
    { value: "Room to grow", label: "Next steps considered" }
  ]
});

export const serviceCategories = [
  {
    id: "development",
    number: "01",
    title: "Websites, Apps & E-commerce",
    description: "Plan and build a useful digital experience for your business, from a clear website to a custom application or online store.",
    accent: "cyan",
    accentColor: "#00f0ff",
    services: [
      makeService("website-development", "Website Development", "Globe", "Business websites", "Responsive websites with clear content, considered design and an easy path to get in touch.", ["Page structure and navigation", "Responsive page design", "Content and contact paths", "Search-friendly foundations", "Launch preparation"]),
      makeService("mobile-app-development", "Mobile App Development", "Smartphone", "iOS & Android", "Mobile experiences shaped around the people who will use them and the tasks they need to complete.", ["User flows and screen design", "Platform-aware layouts", "Feature and content planning", "Development approach", "Release preparation"]),
      makeService("web-applications", "Web Applications", "LayoutGrid", "Web products", "Custom web tools for teams and customers, planned around your workflows and day-to-day needs.", ["User roles and journeys", "Interface and feature planning", "Data and integration needs", "Responsive layouts", "Documentation and handover"]),
      makeService("ecommerce-solutions", "E-commerce Solutions", "ShoppingBag", "Online stores", "Online stores that make products easy to discover, understand and purchase.", ["Product and category structure", "Storefront design", "Cart and checkout planning", "Payment and shipping needs", "Store content and launch checklist"]),
      makeService("website-maintenance", "Website Maintenance", "ShieldCheck", "Ongoing support", "Practical updates and maintenance to help keep your website current after launch.", ["Content and page updates", "Routine site checks", "Plugin and platform updates", "Backup planning", "A clear support process"]),
    ]
  },
  {
    id: "marketing",
    number: "02",
    title: "Digital Marketing",
    description: "Reach the right people with useful content and a marketing plan that fits your brand and business priorities.",
    accent: "blue",
    accentColor: "#38bdf8",
    services: [
      makeService("seo-services", "SEO Services", "Search", "Organic search", "Improve how your website is organized and presented for people searching for what you offer.", ["Technical and page review", "Search intent and keyword research", "Page titles and content structure", "Internal linking recommendations", "A prioritized improvement plan"]),
      makeService("google-business-profile", "Google Business Profile", "MapPin", "Local presence", "Keep your local business information clear and consistent across search and maps.", ["Business details and categories", "Service and location information", "Photo and update guidance", "Review response planning", "Local visibility recommendations"]),
      makeService("social-media-marketing", "Social Media Marketing", "Share2", "Social content", "Plan a recognizable social presence with content that fits your brand and speaks to your audience.", ["Platform and audience selection", "Content themes and calendar", "Post and campaign concepts", "Brand voice guidance", "Review and refinement"]),
      makeService("google-meta-ads", "Google & Meta Ads", "Target", "Paid media", "Create and refine paid campaigns across search and social based on agreed goals.", ["Campaign and audience planning", "Ad copy and creative direction", "Landing page alignment", "Budget and placement setup", "Regular performance review"]),
      makeService("email-marketing", "Email Marketing", "Mail", "Email campaigns", "Use email to share useful updates, introduce offers and stay connected with your audience.", ["Audience and list planning", "Email templates and visual design", "Campaign content and schedule", "Signup and preference flows", "Results and content review"]),
      makeService("whatsapp-marketing", "WhatsApp Marketing", "MessageCircle", "Customer messaging", "Plan customer messages and updates that are timely, useful and aligned with your communication preferences.", ["Use case and audience planning", "Message and template writing", "Opt-in and consent considerations", "Customer support flow planning", "Review and improvement"]),
      makeService("ppc-marketing", "Lead Generation & Paid Campaigns", "TrendingUp", "Paid campaigns", "Plan search and social campaigns around your offer, audience and lead goals.", ["Campaign goals and audience", "Keyword and placement planning", "Ad copy and creative direction", "Landing page recommendations", "Results review and next steps"])
    ]
  },
  {
    id: "creative",
    number: "03",
    title: "Branding & Design",
    description: "Build a visual identity and a set of creative materials that make your business easier to recognize and remember.",
    accent: "violet",
    accentColor: "#8a2be2",
    services: [
      makeService("branding-solutions", "Brand Strategy & Branding", "Sparkles", "Brand identity", "Define how your brand looks, sounds and shows up across customer touchpoints.", ["Brand discovery and positioning", "Visual direction", "Color and typography system", "Voice and messaging guidance", "Usage examples"]),
      makeService("graphic-design", "Graphic Design", "Palette", "Digital & print", "Create clear, consistent graphics for digital channels, presentations and print.", ["Campaign and social graphics", "Presentation and document design", "Print-ready layouts", "Reusable visual templates", "File preparation"]),
      makeService("packaging-product-design", "Packaging & Product Design", "Package", "Packaging", "Shape packaging and product visuals that communicate what makes your offer distinctive.", ["Product and audience context", "Packaging layout concepts", "Label and information hierarchy", "Visual direction", "Production-ready artwork planning"]),
      makeService("reels-video-marketing", "Reels & Video Marketing", "Video", "Short-form video", "Develop video ideas and creative assets for social channels, product pages and campaigns.", ["Content concepts and scripts", "Shot and asset planning", "Short-form edit direction", "Captions and on-screen copy", "Channel-ready variations"]),
      makeService("logo-branding", "Logo & Branding", "PenTool", "Logo systems", "Create a distinctive logo and practical brand assets that work across everyday uses.", ["Logo direction and exploration", "Primary and alternate marks", "Color and type choices", "Digital and print exports", "Simple usage guidance"])
    ]
  },
  {
    id: "business",
    number: "04",
    title: "Digital Business Tools",
    description: "Explore software and cloud options that can support the way your team works and serves customers.",
    accent: "indigo",
    accentColor: "#6366f1",
    services: [
      makeService("erp-solutions", "ERP Solutions", "Database", "Business operations", "Map your operational needs and plan software that helps teams work with shared information.", ["Workflow and user review", "Module and feature priorities", "Data and integration needs", "Implementation options", "Rollout and training plan"]),
      makeService("crm-software", "CRM Software", "Users", "Customer relationships", "Organize customer and sales information in a tool that fits your team’s process.", ["Contact and pipeline needs", "Team roles and permissions", "Follow-up workflows", "Reporting requirements", "Setup and adoption plan"]),
      makeService("saas-solutions", "SaaS Solutions", "Layers", "Software products", "Plan and build a web product around its audience, core features and delivery model.", ["Product goals and user needs", "Feature and release planning", "Interface and account flows", "Platform and integration choices", "Product roadmap"]),
      makeService("cloud-solutions", "Cloud Solutions", "Cloud", "Cloud planning", "Review hosting and cloud needs, then choose an approach that fits your product and team.", ["Current setup review", "Hosting and storage needs", "Access and backup planning", "Migration considerations", "Operations handover"]),
      makeService("custom-software-development", "Custom Software Development", "Code2", "Custom software", "Turn a specific business need into a considered software plan and a usable digital tool.", ["Problem and user discovery", "Feature and interface planning", "Integration requirements", "Development and review", "Documentation and handover"])
    ]
  }
];

export function getServiceBySlug(slug) {
  for (const category of serviceCategories) {
    const service = category.services.find((item) => item.slug === slug);
    if (service) return { ...service, categoryData: category };
  }
  return null;
}

export const allServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({ ...service, categoryData: category }))
);
