import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../AuthContext';

interface SchoolData {
  id: string;
  school_name: string;
  center_number: string | null;
  school_contact: string | null;
  school_email: string;
  region: string | null;
  district: string | null;
  badge_path: string | null;
  admin_name: string;
  admin_nin: string | null;
  admin_contact: string | null;
  admin_role: string | null;
  admin_education: string | null;
  admin_photo_path: string | null;
  created_at: string;
}

const ProfilePage: React.FC = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!schoolId || !user) {
      navigate('/registration');
      return;
    }
    const fetchSchool = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('schools')
          .select('*')
          .eq('id', schoolId)
          .eq('user_id', user.id)
          .single();
        if (fetchError) throw fetchError;
        setSchoolData(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load profile.');
        console.error('Profile fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchSchool();
  }, [schoolId, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (error || !schoolData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'No profile found or access denied.'}</h1>
          <button onClick={() => navigate('/registration')} className="bg-primary-red text-white py-2 px-4 rounded">
            Back to Registration
          </button>
        </div>
      </div>
    );
  }

  const getPublicUrl = (bucket: string, path: string | null) => {
    if (!path) return null;
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  return (
    <div className="min-h-screen bg-light-gray py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">School Profile</h1>
        {/* School Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">School Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>School Name:</strong> {schoolData.school_name}</p>
            <p><strong>Center Number:</strong> {schoolData.center_number || 'N/A'}</p>
            <p><strong>School Contact:</strong> {schoolData.school_contact || 'N/A'}</p>
            <p><strong>School Email:</strong> {schoolData.school_email}</p>
            <p><strong>Region:</strong> {schoolData.region || 'N/A'}</p>
            <p><strong>District:</strong> {schoolData.district || 'N/A'}</p>
          </div>
          {getPublicUrl('school-badges', schoolData.badge_path) && (
            <div className="mt-4">
              <strong>School Badge:</strong>
              <img src={getPublicUrl('school-badges', schoolData.badge_path)!} alt="School Badge" className="w-32 h-32 object-cover rounded mt-2" />
            </div>
          )}
        </section>
        
        {/* Admin Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Administrator Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Admin Name:</strong> {schoolData.admin_name}</p>
            <p><strong>Admin NIN:</strong> {schoolData.admin_nin || 'N/A'}</p>
            <p><strong>Admin Contact:</strong> {schoolData.admin_contact || 'N/A'}</p>
            <p><strong>Admin Role:</strong> {schoolData.admin_role || 'N/A'}</p>
            <p><strong>Admin Education:</strong> {schoolData.admin_education || 'N/A'}</p>
          </div>
          {getPublicUrl('admin-photos', schoolData.admin_photo_path) && (
            <div className="mt-4">
              <strong>Admin Photo:</strong>
              <img src={getPublicUrl('admin-photos', schoolData.admin_photo_path)!} alt="Admin Photo" className="w-32 h-32 object-cover rounded-full mt-2" />
            </div>
          )}
        </section>
        
        <p className="text-sm text-gray-500 mt-4">Created: {new Date(schoolData.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ProfilePage;