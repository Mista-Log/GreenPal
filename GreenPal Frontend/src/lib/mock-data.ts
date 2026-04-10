export type Tip = {
  id: string;
  title: string;
  duration_minutes: number;
  category: string;
  image: string;
  slug: string;
};

export const tipCategories = [
  "Soil Care",
  "Crop Planting",
  "Irrigation",
  "Pest Control",
  "Weed Control",
  "Fertilizers",
  "Composting",
  "Crop Rotation",
  "Harvesting",
  "Organic Farming",
];



export const tipsFeatured: Tip[] = [
  {
    id: "tip_feat_001",
    title: "Best Planting Time",
    duration_minutes: 5,
    category: "Crop Planting",
    image: "/figma/tips-card-1.png",
    slug: "best-planting-time",
  },
  {
    id: "tip_feat_002",
    title: "Irrigation Advice",
    duration_minutes: 5,
    category: "Irrigation",
    image: "/figma/tips-card-2.png",
    slug: "irrigation-advice",
  },
  {
    id: "tip_feat_003",
    title: "Pest Control Basics",
    duration_minutes: 7,
    category: "Pest Control",
    image: "/figma/tips-card-3.png",
    slug: "pest-control-basics",
  },
  {
    id: "tip_feat_004",
    title: "Weed Control Guide",
    duration_minutes: 6,
    category: "Weed Control",
    image: "/figma/tips-card-4.png",
    slug: "weed-control-guide",
  },
];

export const tipsSoilCare: Tip[] = [
  {
    id: "tip_soil_001",
    title: "Soil Testing with NPK",
    duration_minutes: 5,
    category: "Soil Care",
    image: "/figma/tips-frame-7.png",
    slug: "soil-testing-with-npk",
  },
  {
    id: "tip_soil_002",
    title: "Soil Moisture Management",
    duration_minutes: 10,
    category: "Soil Care",
    image: "/figma/tips-frame-8.png",
    slug: "soil-moisture-management",
  },
  {
    id: "tip_soil_003",
    title: "Composting",
    duration_minutes: 10,
    category: "Composting",
    image: "/figma/tips-frame-9.png",
    slug: "composting-guide",
  },
  {
    id: "tip_soil_004",
    title: "10 tips perfect Mulching in your Farm",
    duration_minutes: 10,
    category: "Soil Care",
    image: "/figma/tips-frame-10.png",
    slug: "perfect-mulching-tips",
  },
  {
    id: "tip_soil_005",
    title: "Soil Moisture Management",
    duration_minutes: 10,
    category: "Soil Care",
    image: "/figma/tips-frame-11.png",
    slug: "advanced-soil-moisture-management",
  },
];

export const tipsOrganic: Tip[] = [
  {
    id: "tip_org_001",
    title: "Encourage Beneficial Insects",
    duration_minutes: 5,
    category: "Organic Farming",
    image: "/figma/tips-frame-12.png",
    slug: "beneficial-insects-guide",
  },
  {
    id: "tip_org_002",
    title: "Use Natural Compost",
    duration_minutes: 10,
    category: "Organic Farming",
    image: "/figma/tips-frame-13.png",
    slug: "natural-compost-usage",
  },
  {
    id: "tip_org_003",
    title: "Crop Rotation",
    duration_minutes: 10,
    category: "Crop Rotation",
    image: "/figma/tips-frame-14.png",
    slug: "crop-rotation-explained",
  },
  {
    id: "tip_org_004",
    title: "Avoid Chemical Fertilizers",
    duration_minutes: 10,
    category: "Organic Farming",
    image: "/figma/tips-frame-15.png",
    slug: "avoiding-chemical-fertilizers",
  },
  {
    id: "tip_org_005",
    title: "Healthy Living Soil",
    duration_minutes: 10,
    category: "Soil Care",
    image: "/figma/tips-frame-16.png",
    slug: "healthy-living-soil",
  },
];

export type QuickAction = {
  id: string;
  label: string;
  icon: string;
  action: string;
};

export const homeQuickActions: QuickAction[] = [
  { id: "qa_chat", label: "Chat", icon: "auto_awesome", action: "/chat" },
  { id: "qa_tips", label: "Tips", icon: "lightbulb", action: "/tips" },
  { id: "qa_history", label: "History", icon: "history", action: "history" },
  { id: "qa_bookmarks", label: "Bookmarks", icon: "bookmark", action: "/bookmarks" },
];

export type RecentActivity = {
  id: string;
  type: "scan" | "tip" | "question";
  title: string;
  occurred_at: string;
  confidence: number | null;
};

export const homeRecentActivity: RecentActivity[] = [
  {
    id: "act_001",
    type: "scan",
    title: "Cassava Mosaic Disease",
    occurred_at: "2 hours ago",
    confidence: 92,
  },
  {
    id: "act_002",
    type: "tip",
    title: "Best Planting Time",
    occurred_at: "Yesterday",
    confidence: null,
  },
  {
    id: "act_003",
    type: "question",
    title: "Asked about irrigation",
    occurred_at: "2 days ago",
    confidence: null,
  },
];

export type WeatherSnapshot = {
  temperature: string;
  location: string;
  condition: string;
  icon: string;
};

export const homeWeather: WeatherSnapshot = {
  temperature: "28°",
  location: "Kano",
  condition: "Sunny",
  icon: "sunny",
};

export type ProfileSummary = {
  name: string;
  monogram: string;
  joinedYear: string;
  email: string;
};

export const profileSummary: ProfileSummary = {
  name: "Oluwasegun O.",
  monogram: "O",
  joinedYear: "2025",
  email: "oluwasegun@greenpal.com",
};
export type GoalMilestone = {
  id: string;
  title: string;
  isCompleted: boolean;
  reasoning: string;
};

export type FarmGoal = {
  id: string;
  title: string;
  category: "Crops" | "Livestock" | "Soil Health" | "Business";
  currentValue: number;
  targetValue: number;
  unit: string;
  icon: string;
  imageUrl: string;
  status: "active" | "completed";
  milestones: GoalMilestone[];
};

export const farmGoals: FarmGoal[] = [
  {
    id: "goal_maize_yield",
    title: "Maize Harvest Target",
    category: "Crops",
    currentValue: 4.2,
    targetValue: 5.0,
    unit: "Tons/Ha",
    icon: "agriculture",
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "m1", title: "Soil Nitrogen Testing", isCompleted: true, reasoning: "Essential for accurate fertilizer application, preventing leaching and saving costs." },
      { id: "m2", title: "Pre-planting Pest Scan", isCompleted: true, reasoning: "Detects larvae early, reducing the need for heavy chemical intervention later." },
      { id: "m3", title: "Early Sprouting Monitoring", isCompleted: true, reasoning: "Ensures germination percentage is sufficient to meet total harvest projections." },
      { id: "m4", title: "Harvest Humidity Check", isCompleted: false, reasoning: "Grains must be <14% moisture to prevent post-harvest mold and market loss." },
    ],
  },
  {
    id: "goal_broiler_weight",
    title: "Broiler Weight Gain",
    category: "Livestock",
    currentValue: 1.8,
    targetValue: 2.2,
    unit: "Kg",
    icon: "pets",
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "b1", title: "Chicks Quality Inspection", isCompleted: true, reasoning: "Starting with healthy stock reduces mortality and ensures uniform growth." },
      { id: "b2", title: "Optimal Feed Rationing", isCompleted: true, reasoning: "Precise nutrients per week maximize muscle gain and minimize expensive feed waste." },
      { id: "b3", title: "Health Check (Week 4)", isCompleted: false, reasoning: "Crucial for identifying respiratory issues before the final finishing phase." },
    ],
  },
  {
    id: "goal_profit_target",
    title: "Monthly Profit Goal",
    category: "Business",
    currentValue: 125000,
    targetValue: 200000,
    unit: "NGN",
    icon: "payments",
    imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "p1", title: "Log Daily Labor Costs", isCompleted: true, reasoning: "Identifies hidden labor leaks that eat into the bottom line monthly." },
      { id: "p2", title: "Direct-to-Vendor Sales", isCompleted: false, reasoning: "Bypassing middlemen adds 15-20% margin back to the farm's profit." },
    ],
  },
  {
    id: "goal_soil_organic",
    title: "Organic Matter Index",
    category: "Soil Health",
    currentValue: 3.2,
    targetValue: 4.5,
    unit: "%",
    icon: "compost",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "s1", title: "Baseline Carbon Test", isCompleted: true, reasoning: "Establishes the starting point for soil health improvements." },
      { id: "s2", title: "Cover Crop Implementation", isCompleted: false, reasoning: "Increases biomass and nitrogen fixation in the off-season." },
    ],
  },
  {
    id: "goal_water_efficiency",
    title: "Irrigation Efficiency",
    category: "Crops",
    currentValue: 92,
    targetValue: 100,
    unit: "%",
    icon: "water_drop",
    imageUrl: "https://images.unsplash.com/photo-1563514223300-b3b3dce675c9?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "w1", title: "Drip Line Pressure Check", isCompleted: true, reasoning: "Prevents localized flooding and underwatering at the end of runs." },
      { id: "w2", title: "Evapotranspiration Tracking", isCompleted: true, reasoning: "Matches watering exactly to plant needs based on daily sunshine." },
    ],
  },
  {
    id: "goal_poultry_mortality",
    title: "Poultry Survival Rate",
    category: "Livestock",
    currentValue: 97,
    targetValue: 99,
    unit: "%",
    icon: "health_and_safety",
    imageUrl: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "h1", title: "Biosecurity Footbaths", isCompleted: true, reasoning: "Prevents external pathogens from entering the flock area via worker traffic." },
      { id: "h2", title: "Vaccination Schedule Audit", isCompleted: false, reasoning: "Ensures no birds were missed during the Week 2 Newscastle round." },
    ],
  },
  {
    id: "goal_market_readiness",
    title: "Market Price Readiness",
    category: "Business",
    currentValue: 1,
    targetValue: 1,
    unit: "Status",
    icon: "trending_up",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    status: "completed",
    milestones: [
      { id: "br1", title: "Broker Negotiation", isCompleted: true, reasoning: "Secured pricing Floor to protect against mid-season market crashes." },
    ],
  },
  {
    id: "goal_pest_monitoring",
    title: "Pest Monitoring Frequency",
    category: "Crops",
    currentValue: 3,
    targetValue: 5,
    unit: "days/week",
    icon: "bug_report",
    imageUrl: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "pm1", title: "Pheromone Trap Setup", isCompleted: true, reasoning: "Detects pest arrival before visible crop damage occurs." },
    ],
  },
  {
    id: "goal_egg_production",
    title: "Daily Egg Yield",
    category: "Livestock",
    currentValue: 450,
    targetValue: 550,
    unit: "Eggs",
    icon: "egg",
    imageUrl: "https://images.unsplash.com/photo-1516734006093-de50f2526f43?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "e1", title: "Light Duration Optimization", isCompleted: true, reasoning: "Simulating 16 hours of day-light maintains peak laying cycle." },
    ],
  },
  {
    id: "goal_compost_quality",
    title: "Compost Maturity Index",
    category: "Soil Health",
    currentValue: 6,
    targetValue: 10,
    unit: "Index",
    icon: "recycling",
    imageUrl: "https://images.unsplash.com/photo-1591193680689-543166946654?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "c1", title: "Turning Schedule Compliance", isCompleted: true, reasoning: "Aerate the core to speed up aerobic decomposition of stems." },
    ],
  },
  {
    id: "goal_poultry_feed",
    title: "Feed Conversion optimization",
    category: "Livestock",
    currentValue: 1.6,
    targetValue: 1.5,
    unit: "Ratio",
    icon: "nutrition",
    imageUrl: "https://images.unsplash.com/photo-1549443105-df85764f6976?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "f1", title: "Protein Analysis of Feed", isCompleted: true, reasoning: "Ensures the supplier is delivering the promised 21% crude protein." },
    ],
  },
  {
    id: "goal_logistics_cost",
    title: "Produce Transport Cost",
    category: "Business",
    currentValue: 12000,
    targetValue: 8000,
    unit: "NGN/Trip",
    icon: "local_shipping",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "l1", title: "Route Optimization Plan", isCompleted: true, reasoning: "Consolidating trips saves fuel and reduces vehicle wear." },
    ],
  },
  {
    id: "goal_organic_certification",
    title: "Organic Certification Progress",
    category: "Soil Health",
    currentValue: 2,
    targetValue: 8,
    unit: "Steps",
    icon: "verified",
    imageUrl: "https://images.unsplash.com/photo-1621570168393-27cf7d5c5890?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "o1", title: "Transition Year 1 Log", isCompleted: true, reasoning: "Formal documentation required by inspectors to prove no chemicals used." },
    ],
  },
  {
    id: "goal_worker_efficiency",
    title: "Labor Efficiency Index",
    category: "Business",
    currentValue: 85,
    targetValue: 95,
    unit: "%",
    icon: "groups",
    imageUrl: "https://images.unsplash.com/photo-1563514223300-b3b3dce675c9?auto=format&fit=crop&w=800&q=80",
    status: "active",
    milestones: [
      { id: "w1", title: "Task Completion Tracking", isCompleted: true, reasoning: "Identifies bottlenecks in morning harvest routines." },
    ],
  },
];
