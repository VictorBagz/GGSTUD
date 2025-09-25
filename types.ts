
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

export interface RegistrationFormData {
  school_name: string;
  center_number: string;
  office_contact: string;
  region: string;
  district: string;
  school_badge: File | null;
  admin_full_name: string;
  admin_nin: string;
  admin_contact: string;
  admin_email: string;
  admin_role: string;
  admin_education: string;
  admin_password: string;
  admin_confirm_password: string;
  admin_profile_photo: File | null;
}

// Corresponds to 'schools' table in Supabase
export interface SchoolDocument {
    id?: string;
    user_id: string;
    school_name: string;
    center_number: string;
    school_contact: string;
    school_email: string;
    region: string;
    district: string;
    badge_path?: string;
    admin_name: string;
    admin_nin: string;
    admin_contact: string;
    admin_role: string;
    admin_education: string;
    admin_photo_path?: string;
}

// Corresponds to 'players' table in Supabase
export interface PlayerDocument {
    id?: string;
    school_id: string;
    player_name: string;
    date_of_birth: string;
    age: number;
    gender: string;
    next_of_kin_relationship: string;
    next_of_kin_contact: string;
    lin: string;
    player_class: string;
    photo_path?: string;
}