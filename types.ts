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
  schoolName: string;
  centerNumber: string;
  officeContact: string;
  region: string;
  district: string;
  schoolBadge: File | null;
  adminFullName: string;
  adminNin: string;
  adminContact: string;
  adminEmail: string;
  adminRole: string;
  adminEducation: string;
  adminPassword: string;
  adminProfilePhoto: File | null;
}

// This interface must exactly match your Appwrite 'schools' collection attributes
export interface SchoolDocument {
    userId: string;
    schoolName: string;
    centerNumber: string;
    schoolContact: string;
    schoolEmail: string;
    Region: string;
    District: string;
    badgeId?: string;
    admin_name: string;
    admin_nin: string;
    admin_contact: string;
    admin_role: string;
    admin_education: string;
    admin_photoId?: string;
}

export interface PlayerDocument {
    schoolId: string;
    playerName: string;
    dateOfBirth: string;
    age: number;
    nextOfKinContact: string;
    lin: string;
    playerClass: string;
    photoId?: string;
}