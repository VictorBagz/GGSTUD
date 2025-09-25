
import { createClient } from '@supabase/supabase-js';

// The user has provided these keys to fix the initialization error.
const supabaseUrl = 'https://baoxgclgzieuulpxljwv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhb3hnY2xnemlldXVscHhsand2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjY1NzgsImV4cCI6MjA3NDIwMjU3OH0.QsNAp4oJ5OClsEgO66kjtnxiLG8qeuV7CLQNjfWy2Kc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const AppConstants = {
    schoolBadgesBucket: 'school-badges',
    adminProfilePhotosBucket: 'admin-photos',
    playerPhotosBucket: 'player-photos',
};