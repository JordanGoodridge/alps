import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  MapPin, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Plane, 
  Timer, 
  DollarSign, 
  Users, 
  Calendar, 
  Send, 
  Check, 
  Plus, 
  Trash2, 
  Search, 
  Info,
  Sliders,
  Maximize2,
  Minimize2,
  Utensils,
  Moon,
  Compass,
  ArrowRight,
  Clock,
  Lock,
  Music,
  Coffee
} from "lucide-react";

// Chalet Carousel Hotlinked Images
const CHALET_SLIDES = [
  {
    url: `${import.meta.env.BASE_URL}assets/.aistudio/exterior.jpg`,
    title: "Chalet Kalliste - Majestic Exterior",
    desc: "A stunning traditional multi-level chalet with stone and timber framing set against the snowy peaks of Les Allues."
  },
  {
    url: `${import.meta.env.BASE_URL}assets/.aistudio/living.jpg`,
    title: "Chalet Living Area - Alpine Opulence",
    desc: "Warm wooden beams, luxury plush seating, and beautiful natural alpine finishes throughout."
  },
  {
    url: `${import.meta.env.BASE_URL}assets/.aistudio/fireplace.jpg`,
    title: "The Warm Hearth - Cathedral Saloon",
    desc: "An expansive open fireplace and grand lounge perfect for relaxing by a roaring log fire after returning from the slopes."
  },
  {
    url: `${import.meta.env.BASE_URL}assets/.aistudio/hottub.jpg`,
    title: "Wellness Deck - Panoramic Hot Tub",
    desc: "Unwind on the spacious scenic balcony featuring our private steaming hot tub overlooking white alpine valleys."
  },
  {
    url: `${import.meta.env.BASE_URL}assets/.aistudio/kitchen.png`,
    title: "Epicurean Chef's Kitchen",
    desc: "A beautifully appointed gourmet cooking center engineered with high-spec appliances, a sprawling granite prep island, and oak finishes."
  }
];

// Resorts Data
const RESORTS_DATA = [
  {
    name: "MÃ©ribel",
    tag: "OUR HOME BASE",
    elevation: "1450m - 2952m",
    imgUrl: `${import.meta.env.BASE_URL}assets/.aistudio/meribel.jpg`,
    fallbackUrl: "https://images.unsplash.com/photo-1551698618-1ffdfe1700ff?auto=format&fit=crop&q=80&w=800",
    desc: "The heart of the system. Offers a diverse mix of wooded trails and wide open sunny slopes, ideal for intermediate exploration and central access to all valleys.",
    runs: { green: 8, blue: 24, red: 18, black: 6 },
    difficulty: "Balanced",
    peak: "Dent de Burgin (2730m)"
  },
  {
    name: "Courchevel",
    tag: "MOST GLAMOROUS",
    elevation: "1300m - 2738m",
    imgUrl: `${import.meta.env.BASE_URL}assets/.aistudio/courchevel.avif`,
    fallbackUrl: "https://images.unsplash.com/photo-1518098268026-4e43a1a009de?auto=format&fit=crop&q=80&w=800",
    desc: "Renowned for its north-facing slopes and world-class grooming. Offers some of the finest pisted runs in the world alongside steep, technical couloirs for experts.",
    runs: { green: 12, blue: 38, red: 28, black: 10 },
    difficulty: "Prestigious / Challenging",
    peak: "La Saulire (2738m)"
  },
  {
    name: "Val Thorens",
    tag: "HIGHEST IN EUROPE",
    elevation: "2300m - 3230m",
    imgUrl: `${import.meta.env.BASE_URL}assets/.aistudio/valthorens.webp`,
    fallbackUrl: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&q=80&w=800",
    desc: "High-altitude glacial skiing with guaranteed snow. Features expansive, bowl-like terrain and steep descents that remain crisp late into the season.",
    runs: { green: 5, blue: 33, red: 21, black: 8 },
    difficulty: "High Altitude Terrain",
    peak: "Cime de Caron (3200m)"
  },
  {
    name: "Les Menuires",
    tag: "BEST FOR INTERMEDIATES",
    elevation: "1850m - 2850m",
    imgUrl: `${import.meta.env.BASE_URL}assets/.aistudio/lesmenuires.jpg`,
    fallbackUrl: "https://images.unsplash.com/photo-1563841930606-67e2b64da2eb?auto=format&fit=crop&q=80&w=800",
    desc: "A massive variety of wide, high-speed cruising runs. Known for its accessibility and consistent vertical drop, making it a favorite for mileage-hungry skiers.",
    runs: { green: 10, blue: 40, red: 32, black: 7 },
    difficulty: "Intermediate Friendly",
    peak: "Mont de la Chambre (2850m)"
  },
  {
    name: "Saint-Martin-de-Belleville",
    tag: "AUTHENTIC SAVOYARD",
    elevation: "1400m",
    imgUrl: `${import.meta.env.BASE_URL}assets/.aistudio/stmartinbelleville.jpg`,
    fallbackUrl: "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&q=80&w=800",
    desc: "Offers long, scenic descents through rolling hills and quiet pastures, providing a more relaxed, authentic descent back to the valley floor.",
    runs: { green: 4, blue: 12, red: 10, black: 2 },
    difficulty: "Scenic & Easy-going",
    peak: "TougnÃ¨te (2434m)"
  },
  {
    name: "Orelle",
    tag: "THE SECRET BACK DOOR",
    elevation: "1350m",
    imgUrl: `${import.meta.env.BASE_URL}assets/.aistudio/orelle.jpg`,
    fallbackUrl: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=800",
    desc: "Provides access to the highest point in the 3 VallÃ©es. Characterized by stark, high-alpine scenery and long, sweeping red runs that feel worlds away from the crowds.",
    runs: { green: 2, blue: 11, red: 7, black: 4 },
    difficulty: "Wild & Vast",
    peak: "Bouchet Glacier (3230m)"
  }
];

// Interactive Map Sector Information
const SECTOR_INFO = [
  {
    id: "meribel",
    name: "MÃ©ribel Central",
    altitude: "1,450m - 2,730m",
    difficulty: "Balanced Intermediate Trails",
    peak: "Dent de Burgin",
    desc: "Our immediate home base! Features wide, high-speed intermediate gondolas and runs direct to the chalet.",
    transit: "From Chalet Kalliste: Ski down the intermediate green or blue trails directly to the town lift base. Take Saulire Express 1 & 2 directly to transit to Courchevel, or TougnÃ¨te 1 & 2 to descend into Les Menuires or Val Thorens."
  },
  {
    id: "valthorens",
    name: "Val Thorens Bowl",
    altitude: "2,300m - 3,230m",
    difficulty: "Glacier Powder / Steep Extreme",
    peak: "Cime de Caron",
    desc: "Europe's highest alpine resort bowl. High altitude glacier skiing ensures crystal-clear packed snow powder year-round.",
    transit: "Transition strategy: From MÃ©ribel base, board TougnÃ¨te 1 & 2, then ski down blue 'Gros Tougne' to Les Menuires. Board the Granges lift up, then take the Mont de la Chambre chairlift directly to cross over into the Val Thorens ski field."
  },
  {
    id: "courchevel",
    name: "Courchevel East",
    altitude: "1,300m - 2,738m",
    difficulty: "Meticulous Grooming & Premium Views",
    peak: "La Saulire",
    desc: "Famous for its sweeping sunny couloirs, pristine tree runs, luxurious dining huts, and north-facing powder preservation.",
    transit: "Transition strategy: Simply ride the Saulire Express 1 & 2 from MÃ©ribel center to the absolute peak crest at 2,738m. Glide down the majestic red 'Creux' or blue 'Pralong' directly into Courchevel 1850."
  },
  {
    id: "lesmenuires",
    name: "Les Menuires West",
    altitude: "1,850m - 2,850m",
    difficulty: "Cruising Speedways & Large Vertical",
    peak: "Mont de la Chambre",
    desc: "Known for consistent sunshine and high mileage cruising trails. Amazing long runs that challenge leg endurance.",
    transit: "Transition strategy: Ski up TougnÃ¨te 1 & 2 from the center valley. Traverse over the peak edge, and dive directly into the wide, sweeping blue pistes of 'Gros Tougne' to reach the sunny west-facing lifts."
  },
  {
    id: "saintmartin",
    name: "Saint Martin Scenic",
    altitude: "1,450m - 2,437m",
    difficulty: "Picturesque Old-World Village Trails",
    peak: "Biolley",
    desc: "Slightly quieter routes through historical, sun-drenched stone hamlets. Perfect for easy-going afternoons and tree runs.",
    transit: "Transition strategy: Access Biolley ridge via TougnÃ¨te, then ski down the long, sweeping blue run 'JÃ©rusalem' â€” legendary for its soft undulating shape â€” directly into the ancient village parish center."
  },
  {
    id: "latania",
    name: "La Tania Pine Forest",
    altitude: "1,400m - 2,200m",
    difficulty: "Sheltered Tree Glades",
    peak: "Col de la Loze",
    desc: "A stunning forest-locked retreat. Beautifully sheltered pines protect skiers and preserve superb visibility during high wind events.",
    transit: "Transition strategy: Make your way to the Col de la Loze (from MÃ©ribel or Courchevel side). Glide down the sweeping green 'Plan de l'Eau' or blue 'FolyÃ¨res' directly through dense alpine glades."
  }
];

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState("destination");

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(1); // Standard starts at 1
  const carouselInterval = useRef<NodeJS.Timeout | null>(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Resort Filtering Options
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [expandedResort, setExpandedResort] = useState<string | null>(null);
  const [activeLifestyleTab, setActiveLifestyleTab] = useState("midday");

  // Interactive Ski Map States
  const [mapZoomed, setMapZoomed] = useState(false);
  const [activeSectorId, setActiveSectorId] = useState<string>("meribel");

  // Dynamic Budget Calculator States
  const guestsCount = 12; // Flat 12 guests
  const nightsCount = 7;  // Flat 7 nights
  const [transitFee, setTransitFee] = useState(900); // Default JFK ticket cost estimate
  const [shuttleOption, setShuttleOption] = useState(85); // Default to Private Group Transfer Share ($85/person)
  const [rentalTier, setRentalTier] = useState<"beginner" | "expert">("expert");
  const [bootRentalOption, setBootRentalOption] = useState<"skis_and_boots" | "skis_only">("skis_and_boots");

  const RENTAL_TIERS = {
    beginner: { skis_and_boots: 160, skis_only: 120 },
    expert: { skis_and_boots: 260, skis_only: 190 },
  };
  const rentalPack = RENTAL_TIERS[rentalTier][bootRentalOption];
  const [chaletSurcharge, setChaletSurcharge] = useState(1029); // Fixed USD chalet cost share ($12,346.59 / 12)

  // Timer: Count down to Jan 23, 2027 (takeoff date)
  useEffect(() => {
    const targetDate = new Date("2027-01-23T09:00:00Z").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle Carousel Rotation
  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % CHALET_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + CHALET_SLIDES.length) % CHALET_SLIDES.length);
  };

  const handleDotClick = (idx: number) => {
    setCarouselIndex(idx);
  };

  // Financial Estimates Calculator output
  const totalIndividualEstimate = chaletSurcharge + 440 + rentalPack + shuttleOption + (transitFee / 1);
  const totalExpeditionGroupEstimate = totalIndividualEstimate * guestsCount;

  // Filter Resorts
  const filteredResorts = RESORTS_DATA.filter((resort) => {
    const matchesSearch = resort.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resort.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-background-dark font-sans text-[#e1e3e4] overflow-x-hidden selection:bg-[#e9c349] selection:text-[#0c1322]">
      
      {/* Dynamic Grid Overlay lines for precision layout */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] grid grid-cols-4 md:grid-cols-12 gap-6 px-5 md:px-16">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-full border-r border-[#e9c349]"></div>
        ))}
      </div>

      {/* Header / Top Navigation Bar */}
      <header className="fixed top-0 w-full bg-[#0c0e14]/90 border-b border-[#e9c349]/30 backdrop-blur-md z-40">
        <div className="flex justify-between items-center px-6 md:px-16 py-3 max-w-7xl mx-auto font-sans">
          {/* Logo */}
          <div className="font-display text-2xl md:text-3xl tracking-widest text-[#e9c349] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#e9c349] inline-block rounded-full"></span>
            LES 3 VALLÃ‰ES 2027
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <a 
              href="#hero" 
              onClick={() => setActiveTab("destination")}
              className={`font-display text-sm tracking-widest uppercase transition-colors py-1 relative ${
                activeTab === "destination" ? "text-[#e9c349]" : "text-[#c4c6cf] hover:text-[#e9c349]"
              }`}
            >
              The Destination
              {activeTab === "destination" && (
                <motion.span layoutId="under" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e9c349]" />
              )}
            </a>
            <a 
              href="#chalet" 
              onClick={() => setActiveTab("chalet")}
              className={`font-display text-sm tracking-widest uppercase transition-colors py-1 relative ${
                activeTab === "chalet" ? "text-[#e9c349]" : "text-[#c4c6cf] hover:text-[#e9c349]"
              }`}
            >
              Chalet
              {activeTab === "chalet" && (
                <motion.span layoutId="under" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e9c349]" />
              )}
            </a>
            <a 
              href="#the-mountain" 
              onClick={() => setActiveTab("mountain")}
              className={`font-display text-sm tracking-widest uppercase transition-colors py-1 relative ${
                activeTab === "mountain" ? "text-[#e9c349]" : "text-[#c4c6cf] hover:text-[#e9c349]"
              }`}
            >
              The Mountain
              {activeTab === "mountain" && (
                <motion.span layoutId="under" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e9c349]" />
              )}
            </a>
            <a 
              href="#piste-map" 
              onClick={() => setActiveTab("pistemap")}
              className={`font-display text-sm tracking-widest uppercase transition-colors py-1 relative ${
                activeTab === "pistemap" ? "text-[#e9c349]" : "text-[#c4c6cf] hover:text-[#e9c349]"
              }`}
            >
              3 VallÃ©es Map
              {activeTab === "pistemap" && (
                <motion.span layoutId="under" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e9c349]" />
              )}
            </a>
            <a 
              href="#logistics" 
              onClick={() => setActiveTab("logistics")}
              className={`font-display text-sm tracking-widest uppercase transition-colors py-1 relative ${
                activeTab === "logistics" ? "text-[#e9c349]" : "text-[#c4c6cf] hover:text-[#e9c349]"
              }`}
            >
              Logistics
              {activeTab === "logistics" && (
                <motion.span layoutId="under" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e9c349]" />
              )}
            </a>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            <a 
              href="https://partiful.com/e/OTJC8p2jW3qjwJDjhT84?c=R0xhMUpZ" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-1.5 font-display text-xs tracking-widest uppercase border border-[#e9c349] bg-[#e9c349] text-[#0c0e14] hover:bg-[#0c0e14] hover:text-[#e9c349] transition-all rounded-lg block text-center"
            >
              RSVP ON PARTIFUL
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex flex-col justify-end pt-28 pb-16 px-6 md:px-16 bg-gradient-to-b from-[#0c0e14]/70 via-[#0c0e14]/80 to-[#0c0e14] overflow-hidden"
      >
        {/* Background Image of high altitude pristine weather */}
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale-[35%] contrast-[1.2] brightness-[0.4]"
            src={`${import.meta.env.BASE_URL}assets/.aistudio/hero.jpg`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const fallback = "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2952&auto=format&fit=crop";
              if (target.src !== fallback) {
                target.src = fallback;
              }
            }}
            alt="Majestic mountains on Bluebird sky expedition"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-[#0c0e14]/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-12 pb-10 border-b border-[#e9c349]/20">
            <div>
              <p className="font-display text-sm text-[#e9c349] uppercase tracking-[0.25em] mb-4">
                Les 3 VallÃ©es 2027 Group Expedition
              </p>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-widest leading-none select-none uppercase">
                LES 3 VALLÃ‰ES
              </h1>
            </div>

            {/* Live Countdown Clock */}
            <div className="p-6 border border-[#e9c349]/20 bg-[#141822]/95 backdrop-blur-md w-full max-w-md rounded-xl shadow-xl">
              <div className="text-center font-display text-xs text-[#e9c349] tracking-widest uppercase mb-4 flex items-center gap-2 justify-center">
                <Timer size={14} />
                Expedition Departure Countdown
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-2 bg-[#0c0e14] border border-[#e9c349]/10 rounded-lg">
                  <span className="block font-timer text-3xl font-light text-[#e9c349]">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-display text-[#c4c6cf] tracking-widest block mt-1">Days</span>
                </div>
                <div className="text-center p-2 bg-[#0c0e14] border border-[#e9c349]/10 rounded-lg">
                  <span className="block font-timer text-3xl font-light text-[#e9c349]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-display text-[#c4c6cf] tracking-widest block mt-1">Hours</span>
                </div>
                <div className="text-center p-2 bg-[#0c0e14] border border-[#e9c349]/10 rounded-lg">
                  <span className="block font-timer text-3xl font-light text-[#e9c349]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-display text-[#c4c6cf] tracking-widest block mt-1">Mins</span>
                </div>
                <div className="text-center p-2 bg-[#0c0e14] border border-[#e9c349]/10 rounded-lg">
                  <span className="block font-timer text-3xl font-light text-[#e9c349] animate-pulse">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-display text-[#c4c6cf] tracking-widest block mt-1">Secs</span>
                </div>
              </div>
              <p className="text-center text-[11px] text-[#c4c6cf] italic mt-3 font-sans">
                Target: January 23, 2027 in Les Allues, Savoie
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 font-sans">
            <div className="p-4 border-l-4 border-[#e9c349] bg-[#141822]/45 hover:bg-[#141822]/65 rounded-r-lg transition-all shadow-md">
              <span className="font-display text-4xl text-[#e9c349] tracking-normal inline-flex items-baseline">
                600<span className="text-lg uppercase text-white tracking-widest font-sans font-light ml-1 font-sans">km</span>
              </span>
              <span className="block font-display text-xs text-[#c4c6cf] tracking-widest uppercase mt-2">Runs Available</span>
            </div>
            <div className="p-4 border-l-4 border-[#e9c349] bg-[#141822]/45 hover:bg-[#141822]/65 rounded-r-lg transition-all shadow-md">
              <span className="font-display text-4xl text-[#e9c349] tracking-normal">
                156
              </span>
              <span className="block font-display text-xs text-[#c4c6cf] tracking-widest uppercase mt-2">Active Lifts</span>
            </div>
            <div className="p-4 border-l-4 border-[#e9c349] bg-[#141822]/45 hover:bg-[#141822]/65 rounded-r-lg transition-all shadow-md">
              <span className="font-display text-4xl text-[#e9c349] tracking-normal">
                7
              </span>
              <span className="block font-display text-xs text-[#c4c6cf] tracking-widest uppercase mt-2">Interconnected Resorts</span>
            </div>
            <div className="p-4 border-l-4 border-[#e9c349] bg-[#141822]/45 hover:bg-[#141822]/65 rounded-r-lg transition-all shadow-md">
              <span className="font-display text-4xl text-[#e9c349] tracking-normal inline-flex items-baseline">
                3230<span className="text-lg uppercase text-white tracking-widest font-sans font-light ml-1 font-sans">m</span>
              </span>
              <span className="block font-display text-xs text-[#c4c6cf] tracking-widest uppercase mt-2">Summit Peak</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chalet Section (Residence) */}
      <section id="chalet" className="py-24 px-6 md:px-16 bg-[#0c0e14] relative">
        <div className="absolute top-8 right-6 md:right-16 font-display text-xs text-[#e9c349]/40 tracking-[0.3em] uppercase">
          SEC. 01 / 04
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story & Reservation Controls (Col 5) */}
            <div className="lg:col-span-5 flex flex-col order-2 lg:order-1 pr-0 lg:pr-8">
              <p className="font-display text-xs text-[#e9c349] uppercase tracking-[0.25em] mb-4">
                The Residence
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide uppercase mb-6">
                CHALET KALLISTE
              </h2>
              <p className="text-lg leading-relaxed text-[#c4c6cf] mb-8 font-sans">
                Our base for the week is <strong className="text-white font-normal">Chalet Kalliste</strong> &mdash; a spacious, luxury-certified alpine chalet located in the magnificent MÃ©ribel valley. Tucked elegantly in Les Allues with an effortless 6-minute walk to the Olympe 3 gondola, it comfortably accommodates our 12 adventurers with a stunning wood fireplace, high-spec professional kitchen, and local outdoor therapeutic hot tub. 
              </p>

              {/* Core Amenities */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 border-b border-[#e9c349]/20 pb-2">
                  <Flame size={18} className="text-[#e9c349]" />
                  <span className="font-display text-xs uppercase tracking-widest text-white">Grand Wood Fireplace</span>
                </div>
                <div className="flex items-center gap-4 border-b border-[#e9c349]/20 pb-2">
                  <Compass size={18} className="text-[#e9c349]" />
                  <span className="font-display text-xs uppercase tracking-widest text-white">Outdoor Therapeutic Hot Tub</span>
                </div>
                <div className="flex items-center gap-4 border-b border-[#e9c349]/20 pb-2">
                  <MapPin size={18} className="text-[#e9c349]" />
                  <span className="font-display text-xs uppercase tracking-widest text-white">6-Min Walk to Olympe Gondola</span>
                </div>
              </div>

              {/* Reservation Details Component */}
              <div className="p-6 border border-[#e9c349]/15 bg-[#141822]/85 backdrop-blur-md mb-8 rounded-xl shadow-xl">
                <h3 className="font-display text-lg text-[#e9c349] mb-4 tracking-wider uppercase">
                  Reservation Details
                </h3>

                <ul className="font-sans text-sm text-[#c4c6cf] space-y-2">
                  <li className="flex justify-between border-b border-[#e9c349]/10 pb-1 font-sans">
                    <span>Dates Scheduled:</span>
                    <span className="text-white">Jan 23, 2027 - Jan 30, 2027</span>
                  </li>
                  <li className="flex justify-between border-b border-[#e9c349]/10 pb-1 font-sans">
                    <span>Check-In:</span>
                    <span className="text-white">17:00 PM (Les Allues)</span>
                  </li>
                  <li className="flex justify-between border-b border-[#e9c349]/10 pb-1 font-sans">
                    <span>Check-out:</span>
                    <span className="text-white">10:00 AM</span>
                  </li>
                  <li className="flex justify-between border-b border-[#e9c349]/10 pb-1 font-sans">
                    <span>Total Chalet Rental Price (USD):</span>
                    <span className="text-white">$12,346.59</span>
                  </li>
                  <li className="flex justify-between pt-1 font-sans">
                    <span className="font-semibold text-white">Chalet Share Per Head:</span>
                    <span className="text-[#e9c349] font-display text-base font-semibold">
                      ${chaletSurcharge}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Price Details */}
              <div className="flex flex-col gap-1 mb-6 font-sans">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl text-[#e9c349]">
                    ${chaletSurcharge}
                  </span>
                  <span className="font-display text-xs text-[#c4c6cf] tracking-widest uppercase">
                    / person ($147 / night)
                  </span>
                </div>
                <span className="text-xs text-[#c4c6cf]">
                  Fixed share based on 12-guest group split for 7 nights. Room allocations finalized.
                </span>
              </div>

              {/* VRBO link integration */}
              <a 
                href="https://www.vrbo.com/2582868a?regionId=6339399" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#e9c349] text-[#0c0e14] font-display text-sm uppercase tracking-widest border border-[#e9c349] hover:bg-transparent hover:text-[#e9c349] transition-all duration-250 block text-center rounded-lg shadow-lg"
              >
                VIEW ORIGINAL VRBO CHALET LISTING
              </a>
            </div>

            {/* Carousel display (Col 7) */}
            <div className="lg:col-span-7 h-[500px] md:h-[600px] border border-[#e9c349]/20 p-2.5 relative order-1 lg:order-2 bg-[#141822]/60 shadow-2xl rounded-xl backdrop-blur-sm">
              <div className="relative w-full h-full overflow-hidden border border-[#e9c349]/15 rounded-lg">
                
                {/* Active Image with absolute animation */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={carouselIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      alt={CHALET_SLIDES[carouselIndex].title} 
                      className="w-full h-full object-cover grayscale-[20%] contrast-[1.1] brightness-[0.85]" 
                      src={CHALET_SLIDES[carouselIndex].url}
                      referrerPolicy="no-referrer"
                    />

                    {/* Image Caption overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 pt-16 z-10 flex flex-col justify-end">
                      <h4 className="font-display text-xl text-[#e9c349] uppercase tracking-wide">
                        {CHALET_SLIDES[carouselIndex].title}
                      </h4>
                      <p className="text-sm font-sans text-gray-200 mt-1 max-w-lg">
                        {CHALET_SLIDES[carouselIndex].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left Trigger button */}
                <button 
                  onClick={handlePrevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/60 border border-[#e9c349]/30 hover:border-[#e9c349] text-[#e9c349] flex items-center justify-center rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Right Trigger button */}
                <button 
                  onClick={handleNextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/60 border border-[#e9c349]/30 hover:border-[#e9c349] text-[#e9c349] flex items-center justify-center rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Location Pin Indicator */}
                <div className="absolute top-4 left-4 z-20 bg-black/70 border border-[#e9c349]/30 px-3 py-1 font-display text-[10px] tracking-widest uppercase text-[#e9c349] flex items-center gap-1.5 backdrop-blur-sm">
                  <MapPin size={10} />
                  Savoie, France Altitude: 1,450m
                </div>

                {/* Carousel Progress indicators */}
                <div className="absolute top-4 right-4 z-20 bg-black/70 border border-[#e9c349]/30 px-3 py-1 font-display text-[10px] tracking-widest uppercase text-white backdrop-blur-sm">
                  Slide {carouselIndex + 1} / {CHALET_SLIDES.length}
                </div>

                {/* Bottom Dot controller */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {CHALET_SLIDES.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`w-3 h-1 bg-[#e9c349] transition-all ${
                        carouselIndex === idx ? "opacity-100 w-6" : "opacity-30"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resorts / Pure Mountain Section */}
      <section id="the-mountain" className="py-24 px-6 md:px-16 bg-white border-y border-slate-100 relative">
        <div className="absolute top-8 right-6 md:right-16 font-display text-xs text-slate-400 tracking-[0.3em] uppercase">
          SEC. 02 / 04
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header intro */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-slate-200">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="text-amber-600" />
                <h2 className="font-display text-3xl md:text-5xl text-slate-900 tracking-widest uppercase">
                  600 KM OF PURE MOUNTAIN
                </h2>
              </div>
              <p className="text-lg text-slate-600 font-sans leading-relaxed">
                Seven resorts. One single lift pass. The world's largest custom ski area, with high altitude terrains tailored to precision, from majestic introductory green slopes to legendary technical off-piste trails.
              </p>
            </div>
            
            <div className="max-w-md bg-slate-50 p-6 border-l-4 border-amber-500 rounded-r-lg shadow-md border-y border-r border-slate-200">
              <p className="text-sm font-sans text-slate-700 italic">
                &ldquo;Les 3 VallÃ©es &mdash; Know Your Playground. From our chalet in Les Allues, you're positioned at the geographical heart of the whole system. Every valley is within reach on a single day &mdash; ski to Courchevel for lunch, push through to Val Thorens in the afternoon, and be back for hot tub in MÃ©ribel.&rdquo;
              </p>
            </div>
          </div>

          {/* Search, Categorisation and Interactive Filters */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 border border-slate-200/80 rounded-xl shadow-md font-sans">
            <div className="relative flex-grow max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={14} />
              </span>
              <input 
                type="text" 
                placeholder="Search resort parameters (e.g. resort name or style tag)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 font-sans text-sm text-slate-800 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <span className="text-xs uppercase font-display text-slate-500 tracking-wider">Difficulty Focus:</span>
              <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
                {["All", "Balanced", "High Altitude", "Intermediate", "Scenic"].map((diff) => (
                  <button 
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1 text-xs font-display tracking-widest border transition-all rounded-lg whitespace-nowrap ${
                      selectedDifficulty === diff 
                        ? "bg-amber-550 bg-amber-500 text-white border-amber-500 shadow-md font-medium" 
                        : "border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-white shadow-sm"
                    }`}
                  >
                    {diff.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resorts Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResorts
              .filter(r => selectedDifficulty === "All" || r.difficulty.toLowerCase().includes(selectedDifficulty.toLowerCase()))
              .map((resort, idx) => {
                const isExpanded = expandedResort === resort.name;
                return (
                  <motion.article 
                    layout
                    key={resort.name}
                    className="border border-slate-200 bg-white hover:border-amber-500/40 hover:shadow-2xl transition-all duration-300 shadow-lg flex flex-col h-full rounded-2xl overflow-hidden"
                  >
                    {/* resort cover image */}
                    <div className="h-56 relative overflow-hidden group">
                      <img 
                        src={resort.imgUrl} 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== resort.fallbackUrl) {
                            target.src = resort.fallbackUrl;
                          }
                        }}
                        alt={resort.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 z-10 bg-slate-900 border border-amber-400/20 px-2.5 py-1 font-display text-[10px] tracking-widest text-[#e9c349] rounded-lg shadow-md">
                        {resort.elevation}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-display text-2xl text-slate-800 uppercase tracking-wider">
                            {resort.name}
                          </h3>
                        </div>
                        <p className="font-display text-[10px] text-amber-600 font-semibold tracking-[0.2em] mb-4">
                          {resort.tag}
                        </p>
                        <p className="text-sm text-slate-600 font-sans leading-relaxed mb-6">
                          {resort.desc}
                        </p>
                      </div>

                      {/* Run difficult index visualizer */}
                      <div className="border-t border-slate-100 pt-4 mt-auto">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] uppercase font-display text-slate-400 tracking-widest">Piste Difficulty metrics:</span>
                          <span className="text-xs text-slate-700 font-sans font-medium">{resort.difficulty}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                          <div className="bg-emerald-50 border border-emerald-200 p-1.5 text-emerald-700 rounded-lg shadow-xs">
                            <span className="block font-semibold text-xs">{resort.runs.green}</span>
                            <span className="text-[9px]">GREEN</span>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 p-1.5 text-blue-700 rounded-lg shadow-xs font-sans">
                            <span className="block font-semibold text-xs">{resort.runs.blue}</span>
                            <span className="text-[9px]">BLUE</span>
                          </div>
                          <div className="bg-rose-50 border border-rose-200 p-1.5 text-rose-700 rounded-lg shadow-xs">
                            <span className="block font-semibold text-xs">{resort.runs.red}</span>
                            <span className="text-[9px]">RED</span>
                          </div>
                          <div className="bg-slate-105 bg-slate-50 border border-slate-200 p-1.5 text-slate-700 rounded-lg shadow-xs">
                            <span className="block font-semibold text-xs">{resort.runs.black}</span>
                            <span className="text-[9px]">BLACK</span>
                          </div>
                        </div>

                        {/* Expand Details Trigger */}
                        <button 
                          onClick={() => setExpandedResort(isExpanded ? null : resort.name)}
                          className="w-full text-center text-[10px] uppercase font-display tracking-widest text-amber-700 hover:text-slate-900 mt-4 pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 font-semibold"
                        >
                          {isExpanded ? "Close Technical Specifications" : "View Technical Specifications"}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 pb-6 pt-3 border-t border-slate-100 bg-slate-50 text-xs font-sans space-y-2.5 overflow-hidden"
                        >
                          <div className="flex justify-between border-b border-slate-150 pb-1.5 font-sans">
                            <span className="text-slate-500">Key Recommended Target Peak:</span>
                            <span className="text-amber-700 font-semibold">{resort.peak}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-150 pb-1.5 font-sans">
                            <span className="text-slate-500">Altitude Base Level:</span>
                            <span className="text-slate-800 font-medium">{resort.elevation.split(" - ")[0]}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-150 pb-1.5 font-sans">
                            <span className="text-slate-500">Total Runs in This Sector:</span>
                            <span className="text-slate-800 font-medium">
                              {resort.runs.green + resort.runs.blue + resort.runs.red + resort.runs.black} slopes
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 italic">
                            * Recommended deployment coordinate for intermediate-to-expert skiers seeking high snow preservation.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
          </div>
        </div>
      </section>

      {/* 3 VallÃ©es Interactive Piste Map Section */}
      <section id="piste-map" className="py-24 px-6 md:px-16 bg-[#0c0e14] border-t border-[#e9c349]/10 relative">
        <div className="absolute top-8 right-6 md:right-16 font-display text-xs text-[#e9c349]/40 tracking-[0.3em] uppercase">
          Core Sector Network
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header intro */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#e9c349]/20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Sliders className="text-[#e9c349]" />
                <h2 className="font-display text-3xl md:text-5xl text-white tracking-widest uppercase">
                  NETWORK PISTE MAP
                </h2>
              </div>
              <p className="text-lg text-[#c4c6cf] font-sans">
                600km of connected slope navigation at your fingertips. Spot your lines, plan high-speed crossings, and master the system's key lift terminal transitions.
              </p>
            </div>
            
            <div className="max-w-md bg-[#141822]/85 p-6 border-l-4 border-[#e9c349] rounded-r-lg shadow-md">
              <p className="text-xs font-sans text-gray-400">
                ðŸ’¡ <strong className="text-white">Central Positioning Tip:</strong> Because Chalet Kalliste is situated centrally in Les Allues (MÃ©ribel Valley), you are perfectly centered to reach all 3 valleys in a single morning. Select a sector below for tactical crossover guides.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Map Card (Col 7) */}
            <div className="lg:col-span-7 border border-[#e9c349]/15 p-2 bg-[#141822]/60 shadow-2xl relative group rounded-xl backdrop-blur-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#e9c349]/10 bg-black rounded-lg">
                <img 
                   alt="Les 3 VallÃ©es Piste Map" 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.01] transition-transform duration-700 cursor-zoom-in" 
                  src={`${import.meta.env.BASE_URL}assets/.aistudio/skimap.jpg`}
                  onClick={() => setMapZoomed(true)}
                  referrerPolicy="no-referrer"
                />

                {/* Map Overlay Banner */}
                <div 
                  onClick={() => setMapZoomed(true)}
                  className="absolute inset-0 bg-black/40 opacity-100 group-hover:bg-black/10 transition-colors flex flex-col items-center justify-center cursor-zoom-in"
                >
                  <button className="px-4 py-2 bg-black/80 border border-[#e9c349] text-[#e9c349] font-display text-xs tracking-widest uppercase hover:bg-[#e9c349] hover:text-[#0c0e14] transition-all flex items-center gap-2 rounded-lg">
                    <Maximize2 size={13} />
                    EXPAND AND ZOOM MAP
                  </button>
                  <span className="text-[10px] text-gray-300 font-mono mt-2 tracking-widest">
                    CLICK TO ACTIVATE FULL INTERACTIVE RESOLUTION
                  </span>
                </div>

                {/* Left sector count tag */}
                <div className="absolute top-4 left-4 bg-black/80 border border-[#e9c349]/20 px-3 py-1 text-[10px] font-display tracking-wider text-white uppercase backdrop-blur-sm rounded-lg">
                  Official 3 VallÃ©es Network
                </div>
              </div>
            </div>

            {/* Right: Sector Details & Transit Directions (Col 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Sector Selector Chips */}
              <div className="bg-[#141822]/85 border border-slate-800 p-4 rounded-xl shadow-md font-sans">
                <h3 className="font-display text-xs text-[#e9c349] uppercase tracking-widest mb-3">
                  Select Sector Crossover Guide:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {SECTOR_INFO.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectorId(sec.id)}
                      className={`px-3 py-2 text-left border transition-all text-xs font-display flex flex-col justify-between rounded-lg ${
                        activeSectorId === sec.id 
                          ? "bg-[#e9c349]/10 border-[#e9c349] text-white" 
                          : "border-slate-800 bg-[#0c0e14]/55 text-gray-400 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      <span className="font-semibold">{sec.name.toUpperCase()}</span>
                      <span className="text-[9px] text-[#e9c349]/60 font-mono tracking-tighter">{sec.altitude.split(" - ")[1] || sec.altitude}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Sector Content Card */}
              <AnimatePresence mode="wait">
                {activeSectorId && (
                  <motion.div
                    key={activeSectorId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border border-[#e9c349]/15 bg-[#141822]/90 p-6 shadow-xl relative rounded-xl overflow-hidden font-sans"
                  >
                    {/* Golden angle visual decoration */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#e9c349]/30"></div>
                    
                    {/* Sector Header */}
                    <div className="mb-4">
                      <span className="text-[10px] bg-[#e9c349]/10 border border-[#e9c349]/20 text-[#e9c349] px-2.5 py-1 font-display tracking-widest uppercase rounded-lg">
                        {SECTOR_INFO.find(s => s.id === activeSectorId)?.difficulty}
                      </span>
                      <h3 className="font-display text-2xl text-white uppercase tracking-wider mt-3.5">
                        {SECTOR_INFO.find(s => s.id === activeSectorId)?.name}
                      </h3>
                      <div className="flex gap-4 text-[10px] text-gray-400 font-mono mt-1">
                        <span>Elevation: {SECTOR_INFO.find(s => s.id === activeSectorId)?.altitude}</span>
                        <span>â€¢</span>
                        <span>Peak: {SECTOR_INFO.find(s => s.id === activeSectorId)?.peak}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 font-sans leading-relaxed mb-5 pb-5 border-b border-slate-800">
                      {SECTOR_INFO.find(s => s.id === activeSectorId)?.desc}
                    </p>

                    {/* Transit Strategy Directions */}
                    <div>
                      <h4 className="font-display text-xs text-[#e9c349] uppercase tracking-widest mb-2 flex items-center gap-1.5 font-sans">
                        <Flame size={12} className="animate-pulse" />
                        Valley-to-Valley Transition:
                      </h4>
                      <p className="text-xs text-gray-200 font-sans bg-[#0c0e14] p-4 border border-slate-800 leading-relaxed italic rounded-lg shadow-inner">
                        &rdquo;{SECTOR_INFO.find(s => s.id === activeSectorId)?.transit}&ldquo;
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* PISTE MAP FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {mapZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-6"
          >
            {/* Header toolbar */}
            <div className="flex justify-between items-center max-w-7xl mx-auto w-full border-b border-gray-800 pb-4">
              <div>
                <h3 className="font-display text-lg text-white uppercase tracking-widest">
                  Les 3 VallÃ©es Ski Map
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider">
                  HIGH-DEFINITION RESOLUTION ACTIVE ({SECTOR_INFO.length} SKI SECTORS DETAILED)
                </span>
              </div>
              <button 
                onClick={() => setMapZoomed(false)}
                className="px-4 py-2 border border-[#e9c349] text-[#e9c349] hover:bg-[#e9c349] hover:text-black font-display text-xs tracking-widest transition-all"
              >
                CLOSE VIEW
              </button>
            </div>

            {/* Main scrollable high density picture map panel */}
            <div className="flex-grow flex items-center justify-center overflow-auto my-6 p-4">
              <div className="max-w-[1700px] w-full max-h-[85vh] overflow-auto select-none bg-black border border-gray-800 group relative">
                <img 
                  src={`${import.meta.env.BASE_URL}assets/.aistudio/skimap.jpg`}
                  alt="High Res Piste Map"
                  className="w-full h-auto min-w-[1200px] object-contain cursor-grab active:cursor-grabbing"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Footer zoom guides */}
            <div className="max-w-4xl mx-auto w-full text-center border-t border-gray-800 pt-4 flex flex-col gap-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                ðŸ’¡ Navigation Tip: On desktops, use your trackpad or scrollbars to pan left, right, and zoom closely into separate chairlift paths.
              </p>
              <div className="flex justify-center gap-6 text-[10px] font-mono text-[#e9c349]/70">
                <span>Central Valley: MÃ©ribel (1,450m)</span>
                <span>â€¢</span>
                <span>Left Sector: Courchevel (1,850m)</span>
                <span>â€¢</span>
                <span>Right Sector: Les Menuires & Val Thorens (2,300m)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Off-Slopes & Lifestyle Guide Section */}
      <section id="lifestyle" className="py-24 px-6 md:px-16 bg-white border-y border-slate-100 relative overflow-hidden">
        {/* Subtle background geographic contours */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M-10,30 C30,20 60,40 110,15 M-10,50 C20,65 70,45 110,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="absolute top-8 right-6 md:right-16 font-display text-xs text-slate-400 tracking-[0.3em] uppercase">
          SEC. 03 / 04
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-display text-xs text-amber-600 font-bold uppercase tracking-[0.25em] mb-3">
              The Alpine Escape Experience
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-slate-900 tracking-widest uppercase">
              MÃ‰RIBEL OFF-SLOPES & LIFE
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto font-sans">
              An expedition is about more than just carving down slopes. Experience a fluid, friction-free day of luxury, culinary mastery, and carefree town strolls.
            </p>
            <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-6"></div>
          </div>

          {/* Interactive Swiss-style Timetable Selector */}
          <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-4 border-b border-slate-100 pb-6">
            {[
              { id: "morning", time: "08:30", label: "Alpine Launch", desc: "Slopes Connection" },
              { id: "midday", time: "12:30", label: "Valley Town Safaris", desc: "Easy Strolls & Sneaker Swaps" },
              { id: "afternoon", time: "16:00", label: "AprÃ¨s & High Life", desc: "Music & Beats" },
              { id: "evening", time: "19:30", label: "Savoyard Recovery", desc: "Fondue & Fireside" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveLifestyleTab(tab.id)}
                className={`flex flex-col items-center text-center px-4 md:px-6 py-3.5 rounded-2xl border transition-all duration-300 min-w-[140px] md:min-w-[180px] font-sans ${
                  activeLifestyleTab === tab.id
                    ? "bg-amber-500 border-amber-500 text-white shadow-xl shadow-amber-500/10 hover:shadow-2xl"
                    : "bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100/80 hover:border-slate-300"
                }`}
              >
                <span className={`text-[11px] font-mono tracking-widest font-bold mb-1 ${
                  activeLifestyleTab === tab.id ? "text-amber-100" : "text-amber-600"
                }`}>
                  {tab.time}
                </span>
                <span className="text-xs md:text-sm font-display uppercase tracking-wider font-bold">
                  {tab.label}
                </span>
                <span className={`text-[10px] sm:hidden md:block mt-1 ${
                  activeLifestyleTab === tab.id ? "text-amber-100/80" : "text-slate-400"
                }`}>
                  {tab.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Dynamic Content Pane with Smooth Entry */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLifestyleTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              {/* MORNING ALPINE LAUNCH */}
              {activeLifestyleTab === "morning" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
                  {/* Left Column: Connection Info */}
                  <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-amber-600 mb-4">
                        <Clock size={16} />
                        <span className="font-mono text-xs uppercase tracking-wider">08:30 â€” Seamless Dawn Departure</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-slate-800 uppercase tracking-wider mb-4">
                        DIRECT CONNECTIVITY TO WORLD'S BIGGEST PLAYGROUND
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        Wake up to fresh coffee in Les Allues, slip on your ski gear directly in our heated boots locker setup, and take a quick 12-minute ride straight to the heart of MÃ©ribel via the high-capacity Olympe gondola. There's no traffic, no parking stress, and no long queuing linesâ€”just direct access to fresh, crisp corduroy pistes.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
                          <h4 className="font-display text-xs text-slate-800 uppercase tracking-widest mb-1.5 font-bold">
                            LES ALLUES GONDOLA
                          </h4>
                          <p className="text-slate-500 text-xs">
                            A mere 12-minute quiet ride with heated cabins connecting Les Allues directly to MÃ©ribel Centerâ€™s main ski lifts.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
                          <h4 className="font-display text-xs text-slate-800 uppercase tracking-widest mb-1.5 font-bold">
                            PRIVATE VIP CHALET SHUTTLE
                          </h4>
                          <p className="text-slate-500 text-xs">
                            Whenever our group chooses to bypass the lift, a swift private van is available for seamless transit loops to slope runs.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold font-sans">
                        <Sparkles size={14} className="text-amber-600" />
                        Altitude Advantage: Les Allues offers standard authentic mountain village charm combined with zero-friction direct linkages.
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Packing Interactive Checklist */}
                  <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-xs text-amber-400 uppercase tracking-widest mb-2 font-bold select-none">
                        âš™ï¸ GEAR UP PROTOCOL
                      </h4>
                      <h3 className="font-display text-xl text-white uppercase tracking-wider mb-4">
                        PRE-SLOPE CHECKLIST
                      </h3>
                      <p className="text-xs text-gray-400 mb-6 font-sans">
                        Ski with perfect confidence. Review our recommended morning packing setup before clicking in:
                      </p>

                      <div className="space-y-3.5">
                        {[
                          { text: "Ski Lift Pass secure in your left sleeve pocket (for hands-free RFID gating)", tag: "Essential" },
                          { text: "Lightweight walking shoes in your ski backpack (crucial for town safaris!)", tag: "Safari Code" },
                          { text: "Sunglasses + High UV ski goggles for sharp bluebird trail clarity", tag: "Gear" },
                          { text: "Chalet locker check-out: Skis and poles locked and compiled", tag: "Safety" },
                          { text: "SPF 50 Alpine sunscreen applied (very high glare at 2,700m)", tag: "Skin Protection" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-2.5 bg-slate-800/80 border border-slate-700/50 rounded-xl">
                            <input
                              type="checkbox"
                              defaultChecked={i === 0 || i === 1}
                              className="accent-amber-500 mt-1 cursor-pointer w-4 h-4 rounded border-slate-600"
                            />
                            <div className="font-sans">
                              <p className="text-xs text-gray-200 leading-tight">{item.text}</p>
                              <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block mt-0.5 font-bold">
                                {item.tag}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-3 bg-slate-800 rounded-xl border border-slate-700">
                      <p className="text-[10px] text-gray-400 text-center font-mono uppercase tracking-wider">
                        â˜… Morning conditions update: 8:15 AM
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TIMELINE TAB: MIDDAY VALLEY TOWN SAFARIS & SLOPESIDE LUNCHES */}
              {activeLifestyleTab === "midday" && (
                <div className="space-y-8 font-sans">
                  {/* Highly Prominent Intro Header with Golden Crest accent */}
                  <div className="border border-amber-500/30 bg-amber-50/20 p-8 rounded-2xl shadow-xl relative overflow-hidden backdrop-blur-sm">
                    <span className="absolute top-4 right-4 text-[9px] font-mono text-amber-700/60 uppercase tracking-[0.25em] font-bold">
                      â˜… EXPEDITION SPECIALTY
                    </span>

                    <div className="max-w-4xl">
                      <div className="p-2 bg-amber-100 border border-amber-200 text-amber-800 inline-flex rounded-xl mb-4">
                        <Compass className="animate-spin-slow" size={24} />
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl text-amber-800 uppercase tracking-widest mb-3 font-extrabold">
                        INTER-VALLEY TOWN SAFARIS & SLOPE LUNCHES
                      </h3>
                      <p className="text-sm text-slate-800 leading-relaxed font-semibold max-w-3xl">
                        Skiing to neighboring valleys to stroll and explore other towns is incredibly easy. Skip carrying heavy gear or clonking around on cobblestones in stiff, painful ski boots! Discover the ultimate, light-footed way to experience Savoie village charm.
                      </p>
                    </div>

                    {/* How It Works Diagrammatic Flow */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-amber-200">
                      <div className="bg-white p-4 rounded-xl border border-amber-200/60 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-display text-xs font-bold text-amber-800 mb-2.5">
                          01
                        </div>
                        <h4 className="font-sans text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                          Ski Directly In
                        </h4>
                        <p className="text-xs text-slate-600 leading-normal">
                          Slide down beautiful, sunny groomed trails right into central Courchevel 1850 or historic Saint-Martin town fronts.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-amber-200/60 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-display text-xs font-bold text-amber-800 mb-2.5">
                          02
                        </div>
                        <h4 className="font-sans text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                          Drop Boots in Heated Lockers
                        </h4>
                        <p className="text-xs text-slate-600 leading-normal">
                          Stash your skis, poles, and heavy plastic ski boots in dry, heated locker compartments right next to the snow front.
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-amber-200/60 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-display text-xs font-bold text-amber-800 mb-2.5">
                          03
                        </div>
                        <h4 className="font-sans text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                          Stroll in Cozy Sneakers
                        </h4>
                        <p className="text-xs text-slate-600 leading-normal">
                          Slip into your comfortable, lightweight sneakers from your backpack. Stroll boutique alleys inside ancient stone hamlets in absolute luxury.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Town Spotlight Tabs & Slopeside Eateries */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* Left Panel: Slopeside Dining Gem */}
                    <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-lg flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-amber-600 mb-4 font-semibold">
                          <Utensils size={16} />
                          <span className="font-mono text-xs uppercase tracking-wider">Culinary Spotlight</span>
                        </div>
                        <h4 className="font-display text-2xl text-slate-800 uppercase tracking-widest mb-1.5 font-bold">
                          LE CLOS BERNARD
                        </h4>
                        <span className="text-[10px] font-mono text-amber-600 tracking-widest block uppercase mb-4">
                          â˜… Forest Sanctuary Pitstop â€” Altiport fir woods
                        </span>
                        
                        <p className="text-xs text-slate-600 leading-relaxed mb-6">
                          Secluded deep in the Altiport spruce forest, this cozy log cabin is legendary. You can ski directly in by day via the pines or take a horse-drawn sleigh ride under a canopy of starlit spruce branches by night. 
                        </p>

                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 font-sans">
                          <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs text-slate-500">Signature dish:</span>
                            <span className="text-xs text-slate-800 font-bold">CÃ´te de BÅ“uf (Wood-Fire open hearth)</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs text-slate-500">Vibe:</span>
                            <span className="text-xs text-slate-800 font-bold">Log Cabin warmth with fur throws</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Access:</span>
                            <span className="text-xs text-slate-800 font-bold">Green trail "Piste de l'Altiport" or horse-sleigh</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-3 bg-white border border-slate-200 rounded-xl text-center">
                        <span className="text-xs text-slate-700 italic font-sans block">
                          &ldquo;Skiing through the pines and walking into a roaring indoor wooden fire while smelling master wood grill steaks over alpine cherry twigs is irreplaceable.&rdquo;
                        </span>
                      </div>
                    </div>

                    {/* Right Panel: Town Safari Spots selector */}
                    <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-2 text-amber-600 mb-6 font-semibold">
                        <MapPin size={16} />
                        <span className="font-mono text-xs uppercase tracking-wider">Valley Town destinations</span>
                      </div>
                      <h4 className="font-display text-xl text-slate-800 uppercase tracking-wider mb-1 font-bold">
                        EXPLORE INTER-VALLEY TOWNS
                      </h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Click the high-altitude towns below to check out their unique layouts and tips:
                      </p>

                      <div className="space-y-4">
                        {[
                          {
                            town: "St. Martin de Belleville",
                            vibe: "Historic Stone Hamlet & Romanesque Churches",
                            desc: "An incredibly gorgeous, quiet, ancient farming town with preserved wooden barns, old family restaurants, and narrow streets. Perfect for local cheese tasting at boutique creameries.",
                            tip: "Store your ski boots at the main 'St. Martin Gondola' base locker row. Explore ancient cellars in sneakers!"
                          },
                          {
                            town: "Courchevel 1850",
                            vibe: "Luxury Alpine Boutiques & High-End CafÃ©s",
                            desc: "The world-famous luxury row with upscale boutique shops, beautiful outdoor coffee stalls, and pristine people watching. Direct wide ski-in slopes that lead right to the village center.",
                            tip: "Ski straight to 'La Croisette', deposit skis in the premium snow terrace racks, swap boots inside the ski center, and stroll."
                          },
                          {
                            town: "Le Praz (Courchevel 1300)",
                            vibe: "Traditional Savoyard Alpine Slopes",
                            desc: "A stunning pine forests village set near a quiet alpine lake. Famous for dynamic ski jumps, historic wood chalets, and a deeply peaceful atmospheric lifestyle.",
                            tip: "Eat a long lunch at Bistrot de l'Alpage, stroll the tranquil quiet lake, then take the fast gondola right back to upper ridges."
                          }
                        ].map((spot, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                                {spot.town}
                              </span>
                              <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-0.5 rounded-full font-bold">
                                {spot.vibe}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-normal font-sans">
                              {spot.desc}
                            </p>
                            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2">
                              <span className="text-[9px] bg-amber-600 text-white px-1.5 py-0.5 rounded font-mono font-bold uppercase shrink-0">
                                PRO TIP
                              </span>
                              <p className="text-[10px] text-slate-500 font-sans italic leading-tight">
                                {spot.tip}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TIMELINE TAB: AFTERNOON APRÃˆS-SKI CABARETS */}
              {activeLifestyleTab === "afternoon" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
                  {/* Left Column: Image Card */}
                  <div className="lg:col-span-6 bg-slate-950 text-white p-2 flex flex-col justify-end relative h-[450px] min-h-[400px] overflow-hidden group rounded-2xl shadow-xl border border-slate-800">
                    <img
                      src={`${import.meta.env.BASE_URL}assets/.aistudio/lafolie.jpg`}
                      alt="MÃ©ribel vibrant aprÃ¨s-ski scene"
                      referrerPolicy="no-referrer"
                      className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-xl opacity-60 group-hover:opacity-75 transition-all duration-700"
                    />
                    <div className="absolute inset-2 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 rounded-xl" />
                    
                    <div className="relative z-20 p-6 max-w-xl">
                      <div className="flex items-center gap-2 text-amber-400 mb-3 font-semibold text-xs">
                        <Music size={14} className="animate-bounce" />
                        <span>CABARET BEATS AT 2,000M</span>
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl text-white tracking-wide uppercase mb-3">
                        LA FOLIE DOUCE CABARET
                      </h3>
                      <p className="text-xs text-gray-300 border-l-2 border-amber-400 pl-4 leading-relaxed font-sans">
                        Settle on open air wooden terraces under beautiful bluebird alpine skies. As the custom clock strikes 3 PM, watch the scene explode with high-energy champagne sprays, exceptional live saxophonists, aerial acrobats, and dancers on tables. This is world-renowned aprÃ¨s luxury at its peak.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Vibe Simulator and Energy selector */}
                  <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-amber-600 mb-4 font-semibold">
                        <Music size={16} />
                        <span className="font-mono text-xs uppercase tracking-wider">Interactive AprÃ¨s Vibe selector</span>
                      </div>
                      <h4 className="font-display text-2xl text-slate-800 uppercase tracking-widest mb-1.5 font-bold">
                        CHOOSE YOUR AFTERNOON MODE
                      </h4>
                      <p className="text-xs text-slate-500 mb-6">
                        Alpine aprÃ¨s ranges from electric high-energy outdoor dances to relaxing luxury lounge hearth fires. Click a vibe category to see our recommended group plan:
                      </p>

                      <div className="space-y-4 font-sans">
                        {[
                          {
                            mode: "Vibrant Cabaret Spot (15:00 - 17:00)",
                            place: "La Folie Douce (Slope ridge)",
                            desc: "High energy, live musicians on tables, snow champagne showers, full performance cabaret. Perfect for sunny ski days with big group laughs.",
                            emoji: "ðŸŽ·",
                            drink: "Chilled French RosÃ© or Champagne"
                          },
                          {
                            mode: "Cozy Fireside Piano Lounge (17:00 - 19:00)",
                            place: "Le Kaila Hotel or Chalet Cathedral Saloon",
                            desc: "Crackling grand stone wood-hearth fires, cozy cashmere rugs, soft acoustic guitar, stellar craft cocktails, and high-end local Savoie charcuterie plates.",
                            emoji: "ðŸ”¥",
                            drink: "Spiced Hot Toddy or Smoked Old Fashioned"
                          },
                          {
                            mode: "The Irish Tavern (18:30 - Late)",
                            place: "O'Sullivans Irish Pub (Vieux Moulin)",
                            desc: "Awesome energetic live cover bands, dynamic drafts, burgers, pool tables, and deep wooden cellar architecture. Perfect flat-out fun mood after dark.",
                            emoji: "ðŸº",
                            drink: "Local draft IPA or Guinness pints"
                          }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-xs hover:border-amber-500/40 transition-colors">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                                <span>{item.emoji}</span> {item.mode}
                              </span>
                              <span className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200 px-2 rounded">
                                {item.place}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-normal font-sans">
                              {item.desc}
                            </p>
                            <span className="text-[10px] text-slate-500 font-mono block mt-2 text-right">
                              ðŸ¹ Recommended pairing: <strong className="text-slate-800">{item.drink}</strong>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-center gap-2">
                      <Sparkles size={14} className="shrink-0" />
                      <p className="text-[10px] font-sans">
                        <strong>Group Coordination:</strong> Direct ski-runs lead straight from sloped aprÃ¨s hubs down into Les Allues villages for total safety. No driving keys needed!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TIMELINE TAB: COZY SAVOYARD RECOVERY & NIGHTS */}
              {activeLifestyleTab === "evening" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
                  {/* Left Column: Savoyard Dining Overview */}
                  <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-amber-600 mb-4 font-semibold">
                        <Utensils size={16} />
                        <span className="font-mono text-xs uppercase tracking-wider">SAVOYARD GASTRONOMY</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-slate-800 uppercase tracking-wider mb-4">
                        SAVOYARD FEASTS & FIRESIDE CHALET RECOVERY
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                        Evenings in Savoie are dedicated to relaxation and comfort. Gather together around Chalet Kallisteâ€™s majestic grand wood fireplace or in our deluxe designer kitchen. Alternate between cozy cooking sessions of local ribeyes, ordering custom local luxury fondue and cheese platters straight to the door, or booking legendary spot reviews like **Chez Kiki** to watch open fireplace spit grills!
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                          <Check className="text-amber-500 shrink-0 mt-0.5" size={16} />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Chez Kiki Steak Grill</h4>
                            <p className="text-[11px] text-slate-500 leading-normal">
                              The master butcher fires dry-aged prime steaks directly in front of cozy wooden logs. A fantastic culinary institution.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                          <Check className="text-amber-500 shrink-0 mt-0.5" size={16} />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">The Outdoor Hot Tub Rest</h4>
                            <p className="text-[11px] text-slate-500 leading-normal">
                              Soak sore leg muscles in our private timber hot tub, look through spruce pine branches at the starlit Milky Way, and let alpine snow drift around you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 italic block">
                      * Cooking logs: Local bio markets are dynamic and easily accessible in nearby MoÃ»tiers bases for fresh ingredients.
                    </div>
                  </div>

                  {/* Right Column: Interactive Fondue Builder Sandbox (The "More than Cards" widget!) */}
                  <div className="lg:col-span-6 bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between border border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 text-amber-400 mb-4 font-bold select-none">
                        <Coffee size={16} />
                        <span className="font-mono text-xs uppercase tracking-wider">Savoyard Fondue Blueprint Builder</span>
                      </div>
                      <h4 className="font-display text-xl text-white uppercase tracking-wider mb-2">
                        SAVOYARD CHEESE FONDUE BLUEPRINT
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-6 font-sans">
                        Build the ultimate Savoyard bubbling cheese pot. Tap the three fundamental alpine cheeses to compile the dream blend:
                      </p>

                      <div className="space-y-4 font-sans">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-slate-800 p-3 rounded-xl border-2 border-amber-500 text-center shadow-md">
                            <span className="block text-lg">ðŸ§€</span>
                            <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider">Beaufort</span>
                            <span className="text-[8px] text-gray-400 block mt-0.5">Creamy, rich flavor</span>
                          </div>
                          <div className="bg-slate-800 p-3 rounded-xl border-2 border-amber-500 text-center shadow-md">
                            <span className="block text-lg">ðŸ§€</span>
                            <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider">ComtÃ© Aged</span>
                            <span className="text-[8px] text-gray-400 block mt-0.5">Nutty complexity</span>
                          </div>
                          <div className="bg-slate-800 p-3 rounded-xl border-2 border-amber-500/40 text-center opacity-90 select-none">
                            <span className="block text-lg">ðŸ§€</span>
                            <span className="block text-[10px] font-bold text-amber-400/80 uppercase tracking-wider">Abondance</span>
                            <span className="text-[8px] text-gray-400 block mt-0.5">Fruity sharp finish</span>
                          </div>
                        </div>

                        {/* Interactive pairings sheet */}
                        <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl space-y-3">
                          <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-700">
                            <span className="text-gray-400">ðŸ¥‚ Perfect Wine match:</span>
                            <span className="text-amber-400 font-bold font-mono">Chignin-Bergeron or Apremont</span>
                          </div>
                          <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-700">
                            <span className="text-gray-400">ðŸ¥ƒ Post-digestif traditional:</span>
                            <span className="text-amber-400 font-bold font-mono">Traditional GenÃ©pi liqueur</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">ðŸ’¡ Traditional Savoyard Tip:</span>
                            <span className="text-[11px] text-amber-400 font-sans italic">Rub the pot interior with a fresh garlic clove before melting.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-3 bg-amber-500/10 border border-amber-400/20 rounded-xl flex items-center gap-2">
                      <Sparkles className="text-amber-400 shrink-0" size={14} />
                      <p className="text-[10px] text-amber-100 font-sans leading-normal">
                        <strong>Pre-order arrangements:</strong> Local farm shops in Les Allues village wrap ready-to-melt grated cheese bags with accurate wine ratios for super simple, cozy chalet dinners.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Day Trips & Culture Base Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 font-sans border-t border-slate-100 pt-10">
            {/* Day Trips Box */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]">
              <div>
                <h3 className="font-display text-sm text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 font-bold border-b border-slate-200 pb-2.5">
                  <MapPin size={15} className="text-slate-500" />
                  DAY TRIPS & REST DAYS (BY VEHICLE)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <h4 className="font-sans text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Annecy (Venetian Alps)
                    </h4>
                    <p className="text-slate-500 text-[11px] font-sans leading-normal">
                      Stunning canals, clear azure lake views, and historic castle bridges. Only a 1h 45m transit away.
                    </p>
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <h4 className="font-sans text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      MoÃ»tiers Cheese Circuit
                    </h4>
                    <p className="text-slate-500 text-[11px] font-sans leading-normal">
                      Tour native Beaufort cheese manufacturing plants, followed by a street art trek through alleys.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subterranean nightlife box */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]">
              <div className="flex gap-4">
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl shrink-0 h-12 w-12 flex items-center justify-center">
                  <Moon size={24} />
                </div>
                <div>
                  <h3 className="font-display text-sm text-slate-800 uppercase tracking-widest mb-2.5 font-bold border-b border-slate-200 pb-2.5">
                    HIGH-ALTITUDE NIGHTLIFE
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    From late-night moonlit sledge rides in the local village center down to the deep, subterranean, world-famous nightclub energy of **Le Malaysia** in Val Thorens (which has a giant 1,000-person underground dance vault disguised as a small snow hut at the surface level!).
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Logistics & Ledger Section (Elegant Travel Ledger & Estimator) */}
      <section id="logistics" className="py-24 px-6 md:px-16 bg-[#0c0e14] border-t border-[#e9c349]/10 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <header className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-[#e9c349] font-sans text-xs uppercase tracking-[0.25em] font-bold block mb-3">
              Expedition Planning &amp; Costs
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide uppercase mb-4">
              LOGISTICS &amp; LEISURE ESTIMATES
            </h2>
            <p className="text-base text-slate-300 font-sans leading-relaxed">
              Understand estimated costs, flight connections, and equipment hire structures. Use the interactive calculator below to personalize your chalet share, ski pass, and equipment hire settings.
            </p>
            <div className="w-16 h-0.5 bg-[#e9c349] mx-auto mt-6"></div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEDGER ESTIMATOR CABINET: Right balance of clean aesthetics and utility */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <div className="bg-[#141822]/85 border border-[#e9c349]/15 p-6 md:p-8 rounded-xl shadow-xl backdrop-blur-md">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/60 pb-4 mb-6 gap-2">
                  <div>
                    <h3 className="text-base font-sans font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Sliders size={18} className="text-[#e9c349]" />
                      Interactive Cost Estimator
                    </h3>
                    <p className="text-[11px] text-[#e9c349]/70 font-sans mt-1">
                      *Note: All rates, package options, and ski fees listed below are seasonal estimates.
                    </p>
                  </div>
                  <span className="text-xs text-[#e9c349] font-bold bg-[#e9c349]/10 px-3 py-1 rounded-full uppercase font-sans tracking-wide border border-[#e9c349]/10">
                    Estimated Rates
                  </span>
                </div>

                {/* Ledger Itemize Columns */}
                <div className="space-y-6">
                  
                  {/* Row 01: Chalet accommodation */}
                  <div className="flex justify-between items-start border-b border-slate-800/60 pb-4">
                    <div>
                      <div className="text-white font-semibold text-base">Chalet Accommodation Share (Estimated)</div>
                      <div className="text-sm text-slate-300 font-sans mt-1 leading-relaxed">
                        7 nights at Chalet Kalliste. Individual flat 1/12th split of the private luxury chalet.
                      </div>
                    </div>
                    <div className="text-right font-sans font-bold text-base text-white shrink-0 pl-4 mt-0.5">
                      ${chaletSurcharge}.05
                    </div>
                  </div>

                  {/* Row 02: Piste Ski Pass */}
                  <div className="flex justify-between items-start border-b border-slate-800/60 pb-4">
                    <div>
                      <div className="text-white font-semibold text-base border-none">6-Day Three VallÃ©es Lift Pass (Estimated Rate)</div>
                      <div className="text-sm text-slate-300 font-sans mt-1 leading-relaxed">
                        Full, unrestricted lift access across all 600km of local slopes, peaks, and transitions.
                      </div>
                    </div>
                    <div className="text-right font-sans font-bold text-base text-white shrink-0 pl-4 mt-0.5">
                      $440.00
                    </div>
                  </div>

                  {/* Row 03: Rental Selection Block */}
                  <div className="border-b border-slate-800/60 pb-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-white font-semibold text-base">Ski &amp; Snowboard Rental Pack (Estimated Rate)</div>
                        <div className="text-sm text-slate-300 font-sans mt-1 leading-relaxed">
                          Select your ski equipment performance tier and specify if boots are required.
                        </div>
                      </div>
                      <div className="text-right font-sans font-bold text-base text-[#e9c349] shrink-0 pl-4 mt-0.5">
                        ${rentalPack}.00
                      </div>
                    </div>

                    {/* Integrated Equipment Matrix Toggles */}
                    <div className="space-y-4 mt-4">
                      {/* Boot Choice Toggle */}
                      <div className="flex bg-[#0c0e14] p-1 rounded-xl border border-[#e9c349]/15">
                        <button
                          type="button"
                          onClick={() => setBootRentalOption("skis_and_boots")}
                          className={`flex-1 py-2 px-3 text-center text-xs font-semibold tracking-wide transition-colors rounded-lg ${
                            bootRentalOption === "skis_and_boots"
                              ? "bg-[#e9c349] text-[#0c0e14] shadow-none font-bold"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          Complete Pack (Skis + Boots)
                        </button>
                        <button
                          type="button"
                          onClick={() => setBootRentalOption("skis_only")}
                          className={`flex-1 py-2 px-3 text-center text-xs font-semibold tracking-wide transition-colors rounded-lg ${
                            bootRentalOption === "skis_only"
                              ? "bg-[#e9c349] text-[#0c0e14] shadow-none font-bold"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          Skis Only (Bringing Boots)
                        </button>
                      </div>

                      {/* Beginner and Expert Tiers Toggles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { title: "BEGINNER TIER", desc: "Forgiving, easy-carving rental skis", tier: "beginner" as const },
                          { title: "EXPERT TIER", desc: "High-performance expert & freeride skis", tier: "expert" as const },
                        ].map((pack) => {
                          const packPrice = RENTAL_TIERS[pack.tier][bootRentalOption];
                          const isActive = rentalTier === pack.tier;
                          return (
                            <button 
                              key={pack.title}
                              type="button"
                              onClick={() => setRentalTier(pack.tier)}
                              className={`p-4 text-left border flex flex-col justify-between rounded-xl transition-all ${
                                isActive 
                                  ? "bg-[#e9c349]/10 border-[#e9c349] ring-1 ring-[#e9c349]" 
                                  : "border-[#e9c349]/10 hover:border-[#e9c349]/30 bg-[#0c0e14]/60"
                              }`}
                            >
                              <div>
                                <div className={`text-xs font-bold ${isActive ? "text-[#e9c349]" : "text-white"}`}>
                                  {pack.title}
                                </div>
                                <div className="text-xs text-slate-300 mt-1.5 leading-normal">{pack.desc}</div>
                              </div>
                              <div className="text-xs font-bold text-white text-right w-full mt-3">
                                ${packPrice}.00 <span className="text-[10px] text-slate-400 font-normal">est.</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Row 4: VIP Group Shuttle Transfer */}
                  <div className="border-b border-slate-800/60 pb-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-white font-semibold text-base">Airport Private Shuttle Share (Estimated)</div>
                        <div className="text-sm text-slate-300 font-sans mt-1 leading-relaxed">
                          Standard luxury sprinter minibus charge ($1,020 roundtrip split flat by 12 skiers).
                        </div>
                      </div>
                      <div className="text-right font-sans font-bold text-base text-white shrink-0 pl-4 mt-0.5">
                        ${shuttleOption}.00
                      </div>
                    </div>
                    {/* Information Stripe */}
                    <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex justify-between items-center rounded-xl">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse font-sans"></span>
                        Minibus Booked for 12 Seats
                      </span>
                      <span className="text-slate-300 text-[11px]">Geneva Airport direct to Chalet</span>
                    </div>
                  </div>

                  {/* Row 5: Flights */}
                  <div className="border-b border-slate-800/60 pb-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-white font-semibold text-base">Estimated Trans-Atlantic Flight Cost</div>
                        <div className="text-sm text-slate-300 font-sans mt-1 leading-relaxed">
                          Select a typical airfare standard or omit if you plan to book with reward miles.
                        </div>
                      </div>
                      <div className="text-right font-sans font-bold text-base text-[#e9c349] shrink-0 pl-4 mt-0.5">
                        ${transitFee}.00
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { title: "JFK Airport (Nonstop) *est.", price: 950 },
                        { title: "Seattle-Tacoma (Hub) *est.", price: 1250 },
                        { title: "Points / Own Flight", price: 0 }
                      ].map((flight) => (
                        <button 
                          key={flight.title}
                          type="button"
                          onClick={() => setTransitFee(flight.price)}
                          className={`p-3 text-center border rounded-xl transition-all ${
                            transitFee === flight.price 
                              ? "bg-[#e9c349] text-[#0c0e14] border-[#e9c349] font-bold" 
                              : "border-[#e9c349]/10 hover:border-[#e9c349]/30 bg-[#0c0e14]/60 text-slate-300"
                          }`}
                        >
                          <div className="text-xs font-semibold">{flight.title}</div>
                          <div className={`text-xs mt-1.5 font-bold ${transitFee === flight.price ? "text-[#0c0e14]" : "text-[#e9c349]"}`}>
                            ${flight.price}.00
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ELEGANT SUMMARY INVOICE BOX */}
                  <div className="bg-[#1c2234]/60 border border-[#e9c349]/20 p-6 rounded-xl relative overflow-hidden font-sans shadow-lg shadow-black/20">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e9c349]/10 to-transparent pointer-events-none" />
                    
                    <div className="text-xs text-[#e9c349] font-bold tracking-wider border-b border-slate-800 pb-3 mb-4 uppercase font-sans">
                      Estimated Travel Invoice Summary (Per Person)
                    </div>
                    
                    <div className="space-y-3.5 text-sm text-slate-200">
                      <div className="flex justify-between">
                        <span>Chalet Accommodation Share (Estimated)</span>
                        <span className="font-semibold text-white">${chaletSurcharge}.05</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Three VallÃ©es Lift Pass (Estimated)</span>
                        <span className="font-semibold text-white">$440.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ski Kit Rental (Estimated {rentalTier.toUpperCase()} Pack)</span>
                        <span className="font-semibold text-white">${rentalPack}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minivan Transfer Share (Estimated)</span>
                        <span className="font-semibold text-white">$85.00</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-3">
                        <span>Flight Transit Estimate</span>
                        <span className="font-semibold text-white">${transitFee}.00</span>
                      </div>
                      
                      <div className="flex justify-between items-baseline text-white font-bold text-lg pt-2">
                        <span className="text-[#e9c349]">Estimated Personal Total:</span>
                        <span className="text-[#e9c349] text-3xl">${totalIndividualEstimate}.05</span>
                      </div>
                      
                      <div className="flex justify-between text-xs text-slate-400 pt-1">
                        <span>Expedition Group Spend ({guestsCount} Person Share):</span>
                        <span>${totalExpeditionGroupEstimate}.60 total est.</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* FLIGHT DISPATCH MODULE: Crisp Travel Route & Epic Pass Card */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-6">
              
              <div className="bg-[#141822]/85 border border-[#e9c349]/15 p-6 md:p-8 rounded-xl shadow-xl backdrop-blur-md space-y-6 font-sans">
                <h3 className="text-base font-sans font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-4 border-b border-[#e9c349]/10">
                  <Plane size={18} className="text-[#e9c349]" />
                  Estimated Transit Paths
                </h3>
                
                <div className="space-y-6 text-sm">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#e9c349]/10 text-[#e9c349] border border-[#e9c349]/20 px-2.5 py-0.5 rounded text-xs font-bold uppercase font-sans">
                      Arrival Hub: Geneva (GVA)
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      Geneva Airport (GVA) is our primary direct flight target. A reserved private sprinter minibus coordinates overland travel from GVA straight to Chalet Kalliste in Les Allues with a scenic 2-hour alpine trip.
                    </p>
                  </div>
                  
                  <div className="border-t border-[#e9c349]/10 pt-4 space-y-2">
                    <span className="inline-block bg-slate-800 text-white px-2.5 py-0.5 rounded text-xs font-bold uppercase font-sans border border-slate-700">
                      East Coast Transit (SWISS)
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      We recommend Swiss Air's overnight non-stop routes departing from JFK to Geneva. Aim for a flight land time on the morning of January 23 to coordinate with the group transfer bus.
                    </p>
                  </div>

                  <div className="border-t border-[#e9c349]/10 pt-4 space-y-2">
                    <span className="inline-block bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded text-xs font-bold uppercase font-sans border border-slate-700">
                      West Coast Transit (SEA)
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed font-sans">
                      Lufthansa, Air France, and British Airways provide single-stop routes from Seattle-Tacoma into Geneva Airport. Check alliance point integrations before booking!
                    </p>
                  </div>
                </div>
              </div>

              {/* Epic Pass Recommendation Card - Rounded, Clean, Non-techy */}
              <div className="bg-[#e9c349] text-[#0c0e14] p-6 rounded-xl font-sans shadow-lg shadow-[#e9c349]/10">
                <div className="flex gap-4">
                  <Info className="shrink-0 mt-0.5 text-[#0c0e14]" size={20} />
                  <div className="space-y-2">
                    <span className="block font-bold text-sm uppercase tracking-wide">
                      Travel Pro-Tip: Epic Pass Holders
                    </span>
                    <p className="text-xs leading-relaxed font-medium text-[#0c0e14]/90 font-sans">
                      The active, international **Epic Ski Pass** offers unrestricted slope privileges for the whole Les 3 VallÃ©es system. If you already hold a stateside resort Epic Pass, you do not need to buy any local ticket pass. (These rates are local resort estimates).
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer / Credits */}
      <footer className="bg-[#0c0f10] border-t border-[#e9c349] py-12 px-6 md:px-16 text-xs text-gray-400 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl tracking-widest text-[#e9c349]">
            LES 3 VALLÃ‰ES EXPEDITION
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-display text-[10px] tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact dispatch</a>
            <a href="#" className="hover:text-white transition-colors">Expedition Press Kit</a>
          </div>

          <div className="font-normal text-slate-400">
            &copy; 2027 LES 3 VALLÃ‰ES EXPEDITION. ALL RIGHTS RESERVED. SAVOIE DEPLOYMENT.
          </div>
        </div>
      </footer>

    </div>
  );
}
