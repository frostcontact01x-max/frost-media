/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  iconName: string; // Lucide icon name
  title: string;
  description: string;
  features: string[];
}

export interface CaseStudy {
  id: string;
  clientName: string;
  company?: string;
  title?: string;
  shortDescription?: string;
  industry: string;
  services: string[];
  overview: string;
  displays: string[];
  heroImage: string;
  category: string;
  isActiveClient?: boolean;
  profileImage?: string;
  badge?: string;
  keyOutcome?: string;
  growthStats?: {
    starting: string;
    current: string;
    timeline: string;
  };
  resultsShowcase?: {
    followerGrowth: string;
    reachGrowth: string;
    engagementImprovement: string;
    contentOutput: string;
    keyWin: string;
    before?: string;
    after?: string;
  };
  projectNote?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface Collaboration {
  id: string;
  clientName: string;
  projectCompleted: string;
  servicesProvided: string[];
  activeStatus: boolean;
  videoSampleUrl: string;
  industry: string;
  youtubeEmbedUrl?: string;
  profileImage?: string;
  title?: string;
  company?: string;
  shortDescription?: string;
  badge?: string;
  keyOutcome?: string;
}
