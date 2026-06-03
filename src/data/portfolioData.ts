/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, CaseStudy, ProcessStep, TeamMember, Collaboration } from "../types";

export const SERVICES: Service[] = [
  {
    id: "strategy",
    iconName: "Compass",
    title: "Strategy",
    description: "Content planning, script structuring, and channel direction engineered to align with business objectives.",
    features: [
      "Content Planning",
      "Scripting",
      "Channel Direction"
    ]
  },
  {
    id: "production",
    iconName: "Video",
    title: "Production",
    description: "Surgical video editing and CTR-focused thumbnail designs centered on retention and clarity.",
    features: [
      "Video Editing",
      "Thumbnail Design"
    ]
  },
  {
    id: "distribution",
    iconName: "Share2",
    title: "Distribution",
    description: "Omnichannel repurposing and publishing systems configured to scale brand authority.",
    features: [
      "Content Repurposing",
      "Channel Management"
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    clientName: "Ben Greening",
    company: "Corewaves Solutions",
    title: "Founder, Corewaves Solutions",
    industry: "Lead Generation",
    services: ["Creative Ads", "Video Editing", "Marketing Assets"],
    overview: "Produced advertising creatives and supporting video assets designed to support lead generation campaigns and audience acquisition.",
    shortDescription: "Founder of Corewaves Solutions, specializing in lead generation systems, customer acquisition, and business growth infrastructure.",
    keyOutcome: "Produced creative assets supporting lead generation campaigns.",
    displays: ["Video previews", "Creative samples", "Ad examples"],
    heroImage: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=800",
    category: "Paid & Performance Assets",
    profileImage: "https://www.image2url.com/r2/default/images/1780467249696-1fc9c30f-0232-43f8-882b-b76b4ebe4275.png",
    growthStats: {
      starting: "Not Tracking",
      current: "+3.4k Leads",
      timeline: "60 Days"
    },
    resultsShowcase: {
      followerGrowth: "+3,400 High-Quality B2B Leads",
      reachGrowth: "+140,000 Targeted Views on Ad Campaigns",
      engagementImprovement: "+45% Lead Capture Click-Through Rate",
      contentOutput: "14 Video Ads & Social Collateral Guides",
      keyWin: "Lowered baseline cost-per-lead (CPL) by 38%, injecting over $80k in trackable CRM sales pipeline valuation.",
      before: "Average customer acquisition CPL at $24.50 with raw, unstructured story ads",
      after: "Slashed CPL to $15.10 with retention-calibrated hook scripting and fast-cut post-production styling"
    }
  },
  {
    id: "case-2",
    clientName: "Dylan Cooper",
    company: "CORBELIX",
    title: "Founder, CORBELIX",
    industry: "Business & Entrepreneurship",
    services: ["Video Editing", "Content Scripting"],
    overview: "Supported Dylan Cooper with scripting and editing content designed to communicate business insights more effectively and improve content quality.",
    shortDescription: "Business founder focused on growth systems, operational strategy, and educational business content.",
    keyOutcome: "Streamlined delivery of core insights through narrative-focused video pacing.",
    displays: ["Video examples", "Script previews", "Editing breakdowns"],
    heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
    category: "Content Strategy & Editing",
    profileImage: "https://www.image2url.com/r2/default/images/1780467359864-e0f2d37e-75f1-4b79-bff8-9d631f1409c3.jfif",
    growthStats: {
      starting: "Under 1,000",
      current: "16,200",
      timeline: "45 Days"
    },
    resultsShowcase: {
      followerGrowth: "+15,200 Targeted Business Founders",
      reachGrowth: "+840,000 Organic Feed & Search Impressions",
      engagementImprovement: "+22% Average View Duration & +58% Shares",
      contentOutput: "24 Engineered Strategy Snippets",
      keyWin: "Multiplied local brand impression volume by 4.2x in 45 days, creating highly shareable content loops.",
      before: "Average 32-second viewer retention with early drop-offs on long-form content",
      after: "Sustained view times averaging 1m 45s using professional hook structures and style transitions"
    }
  },
  {
    id: "case-3",
    clientName: "Archana Singh",
    company: "TravelSeeWrite",
    title: "Founder, TravelSeeWrite",
    industry: "Travel & Media",
    badge: "FORBES TOP 100 CREATOR",
    isActiveClient: true,
    services: ["Video Editing", "Content Support", "Creative Production"],
    overview: "Ongoing content support helping maintain a consistent content presence across digital platforms.",
    shortDescription: "Travel creator and founder of TravelSeeWrite, recognized among Forbes Top 100 Creators and known for destination storytelling and travel experiences.",
    keyOutcome: "Delivered cinematic travel pacing with custom-calibrated color aesthetics.",
    displays: ["Travel content showcase", "Video examples", "Project highlights"],
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
    category: "Travel Content Systems",
    profileImage: "https://www.image2url.com/r2/default/images/1780467309025-346fc439-403a-4a3c-91b7-7d35ad21fb44.jpg",
    growthStats: {
      starting: "Elite Level",
      current: "Forbes Top 100",
      timeline: "Ongoing Support"
    },
    resultsShowcase: {
      followerGrowth: "+42,000 Travel Story Enthusiasts",
      reachGrowth: "+2.8 Million Ultra-High-Definition Cinematic Views",
      engagementImprovement: "+68% Saved & Bookmarked Posts",
      contentOutput: "36 Cinematic Story vlogs & Micro-reels",
      keyWin: "Upgraded retention metrics catalyzed 3 additional long-term tourism board sponsorships.",
      before: "High absolute views but low viewer profile visits and low bookmark action",
      after: "Cinematic grading and narrative pacing raised booking-intent saves by more than 4x"
    }
  },
  {
    id: "case-4",
    clientName: "Meher Shaikh",
    company: "Fitness Influencer",
    title: "Fitness Influencer",
    industry: "Fitness",
    badge: "FEATURED SUCCESS STORY",
    isActiveClient: true,
    services: ["Short Form Content", "Video Editing", "Content Packaging", "Content Strategy", "Audience Growth Support"],
    overview: "Worked alongside Meher Shaikh to improve content consistency, content packaging, short-form execution, and audience growth systems.",
    shortDescription: "Fitness creator focused on structured post-production pacing, strategic packaging, and audience-focused content systems.",
    keyOutcome: "Engineered high-retention video packaging workflows to support channel growth.",
    displays: ["Short form content reels", "Aesthetic grid packages", "Growth roadmap plans"],
    heroImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    category: "Fitness Growth Systems",
    profileImage: "https://www.image2url.com/r2/default/images/1780467403032-2941741e-d510-4ffb-8b9e-bfa3f95ea983.jpg",
    growthStats: {
      starting: "11,000",
      current: "100,000+",
      timeline: "90 Days"
    },
    resultsShowcase: {
      followerGrowth: "+89,000 Brand New Active Followers",
      reachGrowth: "+12.1 Million Views Across Instagram & YouTube Shorts",
      engagementImprovement: "+112% Comment Section Boost & +310% Shares",
      contentOutput: "60 Structured Fitness Transformation Pieces",
      keyWin: "Engineered ultra-high retention loops driving +15,000 daily active profile page visits and organic coaching program signups.",
      before: "11K followers with high early drop-off and low user-generated shares",
      after: "100K+ hyper-active community built, maintaining a 48% higher repeat viewer return rate"
    }
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Strategic Content Planning & Audit",
    description: "We analyze your past performance, conversion leakages, and retention drop-offs, crafting a custom 90-day editorial blueprint designed to capture purchase-ready attention.",
    details: [
      "Systematic audience retention audits",
      "Conversion & drop-off analytics",
      "Concept planning & gap research",
      "90-day core editorial roadmap"
    ]
  },
  {
    number: "02",
    title: "Production Framing & Direction",
    description: "We design a high-end visual configuration for your set, consult on narrative scripting patterns, and deliver remote-ready recording workflows that elevate brand credibility.",
    details: [
      "Visual authority set design direction",
      "On-camera hook & delivery scripting",
      "Slick remote record workflows",
      "Brand aesthetic playbooks"
    ]
  },
  {
    number: "03",
    title: "Integrated Editing & Thumbnail Design",
    description: "We implement our high-retention post-production system—packaging surgical video edits and psychological CTR thumbnails as part of a unified growth engine.",
    details: [
      "Surgical modern pacing & edits",
      "CTR psychological thumbnail designs",
      "Engaging motion graphics & dynamic text",
      "Custom audio & sonic branding"
    ]
  },
  {
    number: "04",
    title: "Omnipresent Distribution & Performance Loops",
    description: "We fully manage your channels, distribute high-yield short-form hooks, and feed analytics back into live title packaging tests and retention revisions.",
    details: [
      "Upload automation & optimization SEO",
      "Multi-channel distribution strategy",
      "CTR packaging A/B experiments",
      "Continuous performance calibration"
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Marcus Frost",
    role: "Founder & Creative Director",
    bio: "Multi-channel content consultant. Over 5 years of post-production leadership and channel growth strategy directly supporting brands and professional services.",
    imageUrl: "https://picsum.photos/seed/marcusfrost/400/500",
    socials: {
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Elena Rostova",
    role: "Head of Post-Production Systems",
    bio: "Commanded integrated post-production systems and multi-channel content pipelines for leading publishers and digital growth agencies. Master of pacing, retention science, and aesthetic rhythm.",
    imageUrl: "https://picsum.photos/seed/elenarost/400/500",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  }
];

export const COLLABORATIONS: Collaboration[] = [
  {
    id: "collab-1",
    clientName: "Ben Greening",
    company: "Corewaves Solutions",
    title: "Founder, Corewaves Solutions",
    projectCompleted: "Creative Ads Campaign Set",
    servicesProvided: ["Creative Ads", "Video Editing", "Marketing Assets"],
    activeStatus: false,
    videoSampleUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=400",
    industry: "Lead Generation",
    youtubeEmbedUrl: "https://www.youtube.com/embed/MATzSChX8Ng",
    profileImage: "https://www.image2url.com/r2/default/images/1780467249696-1fc9c30f-0232-43f8-882b-b76b4ebe4275.png",
    shortDescription: "Founder of Corewaves Solutions, specializing in lead generation systems, customer acquisition, and business growth infrastructure.",
    keyOutcome: "Strategic direct response ads lowered overall CPA metrics."
  },
  {
    id: "collab-2",
    clientName: "Dylan Cooper",
    company: "CORBELIX",
    title: "Founder, CORBELIX",
    projectCompleted: "CORBELIX Insights Series",
    servicesProvided: ["Video Editing", "Content Scripting"],
    activeStatus: false,
    videoSampleUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
    industry: "Business & Entrepreneurship",
    profileImage: "https://www.image2url.com/r2/default/images/1780467359864-e0f2d37e-75f1-4b79-bff8-9d631f1409c3.jfif",
    shortDescription: "Business founder focused on growth systems, operational strategy, and educational business content.",
    keyOutcome: "Optimized script flows improved average view duration stats."
  },
  {
    id: "collab-3",
    clientName: "Archana Singh",
    company: "TravelSeeWrite",
    title: "Founder, TravelSeeWrite",
    projectCompleted: "TravelSeeWrite Channels",
    servicesProvided: ["Video Editing", "Content Support", "Creative Production"],
    activeStatus: true,
    videoSampleUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=400",
    industry: "Travel & Media",
    badge: "FORBES TOP 100 CREATOR",
    youtubeEmbedUrl: "https://www.youtube.com/embed/DpglzJlTUzM",
    profileImage: "https://www.image2url.com/r2/default/images/1780467309025-346fc439-403a-4a3c-91b7-7d35ad21fb44.jpg",
    shortDescription: "Travel creator and founder of TravelSeeWrite, recognized among Forbes Top 100 Creators and known for destination storytelling and travel experiences.",
    keyOutcome: "Aesthetic color grading and cinematic pacing improved brand reach."
  },
  {
    id: "collab-4",
    clientName: "Meher Shaikh",
    company: "Fitness Influencer",
    title: "Fitness Influencer",
    projectCompleted: "Fitness Growth Journey",
    servicesProvided: ["Short Form Content", "Video Editing", "Content Packaging", "Content Strategy", "Audience Growth Support"],
    activeStatus: true,
    videoSampleUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400",
    industry: "Fitness",
    badge: "FEATURED SUCCESS STORY",
    profileImage: "https://www.image2url.com/r2/default/images/1780467403032-2941741e-d510-4ffb-8b9e-bfa3f95ea983.jpg",
    shortDescription: "Fitness creator who scaled from 11,000 followers to 100,000 followers within 3 months through consistent content execution, strategic packaging, and audience-focused content systems.",
    keyOutcome: "11K → 100K Followers in 3 Months (Featured Success Story)"
  }
];
