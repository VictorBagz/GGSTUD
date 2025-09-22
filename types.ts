
export interface Member {
  name: string;
  title: string;
  school: string;
  region: string;
  email?: string;
  phone?: string;
  photo?: string;
}

export interface Committee {
  name: string;
  members: Member[];
}

export interface RegionalCommittee {
    name: string;
    zones: Zone[];
}

export interface Zone {
    name: string;
    members: Member[];
}

export enum EventCategory {
    ALL = 'all',
    TOURNAMENT = 'tournaments',
    MEETING = 'meetings',
    NATIONAL = 'national',
    INTERNATIONAL = 'international',
    SPECIAL = 'special'
}

export enum EventTimeline {
    UPCOMING = 'upcoming',
    PAST = 'past',
    CURRENT = 'current',
    ALL = 'all'
}

export interface Event {
  id: number;
  title: string;
  date: string;
  targetDate?: string;
  location: string;
  description: string;
  category: EventCategory;
  timeline: EventTimeline;
  badge: string;
  image: string;
  responsible: string;
  leagues?: string[];
}