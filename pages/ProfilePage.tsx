import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

interface PlayerData {
  id: string;
  player_name: string;
  age: number;
  player_class: string;
  lin: string;
  gender: string;
  photo_path: string | null;
}

const getPublicUrl = (bucket: string, path: string | null) => {
  if (!path) return null;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
};

const PlayerTable: React.FC<{ title: string; players: PlayerData[] }> = ({ title, players }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-dark-gray mb-4">{title} ({players.length})</h3>
      {players.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Photo</th>
                <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Player Name</th>
                <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Age</th>
                <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</th>
                <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">LIN</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {players.map(player => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">
                    <img 
                      src={getPublicUrl('player-photos', player.photo_path) || '/img/placeholder-player.png'} 
                      alt={player.player_name} 
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4 border-b font-medium">{player.player_name}</td>
                  <td className="py-3 px-4 border-b">{player.age}</td>
                  <td className="py-3 px-4 border-b">{player.player_class}</td>
                  <td className="py-3 px-4 border-b">{player.lin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 px-4 bg-gray-100 rounded-lg">
          <p className="text-gray-500">No players in this category.</p>
        </div>
      )}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('boys');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    if (!schoolId) {
      setError("School ID is missing.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: schoolResult, error: schoolError } = await supabase
          .from('schools')
          .select('*')
          .eq('id', schoolId)
          .eq('user_id', user.id)
          .single();

        if (schoolError) {
          if (schoolError.code === 'PGRST116') throw new Error('No profile found or you do not have permission to view it.');
          throw schoolError;
        }
        setSchoolData(schoolResult);

        const { data: playersResult, error: playersError } = await supabase
            .from('players')
            .select('*')
            .eq('school_id', schoolId)
            .order('created_at', { ascending: false });
        
        if (playersError) console.error("Failed to fetch players:", playersError);
        else setPlayers(playersResult || []);

      } catch (e: any) {
        setError(e.message || 'Failed to load profile data.');
        console.error('Profile fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [schoolId, user, navigate]);

  const categorizedPlayers = useMemo(() => {
    const categories = {
      boys: { u20: [] as PlayerData[], u17: [] as PlayerData[], u15: [] as PlayerData[] },
      girls: { u20: [] as PlayerData[], u17: [] as PlayerData[], u15: [] as PlayerData[] },
    };

    players.forEach(player => {
        const group = player.gender === 'Male' ? categories.boys : categories.girls;
        if (player.age >= 17 && player.age < 20) {
            group.u20.push(player);
        } else if (player.age >= 15 && player.age < 17) {
            group.u17.push(player);
        } else if (player.age < 15) {
            group.u15.push(player);
        }
    });
    return categories;
  }, [players]);
  
  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      setError('Failed to sign out. Please try again.');
      console.error('Sign out error:', error);
    }
  };


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
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'Could not load profile.'}</h1>
          <button onClick={() => navigate('/')} className="bg-primary-red text-white py-2 px-4 rounded hover:bg-dark-red transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray pt-24 pb-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-dark-gray">School Dashboard</h1>
            <p className="text-gray-500">Welcome, {schoolData.admin_name}</p>
        </div>

        {/* School Information */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-primary-red mb-4 flex items-center gap-3"><i className="fas fa-school"></i>School Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div><strong className="text-gray-500 block">School Name:</strong> <span className="text-lg">{schoolData.school_name}</span></div>
            <div><strong className="text-gray-500 block">Center Number:</strong> <span className="text-lg">{schoolData.center_number || 'N/A'}</span></div>
            <div><strong className="text-gray-500 block">School Contact:</strong> <span className="text-lg">{schoolData.school_contact || 'N/A'}</span></div>
            <div><strong className="text-gray-500 block">School Email:</strong> <span className="text-lg">{schoolData.school_email}</span></div>
            <div><strong className="text-gray-500 block">Region:</strong> <span className="text-lg">{schoolData.region || 'N/A'}</span></div>
            <div><strong className="text-gray-500 block">District:</strong> <span className="text-lg">{schoolData.district || 'N/A'}</span></div>
          </div>
          {getPublicUrl('school-badges', schoolData.badge_path) && (
            <div className="mt-6">
              <strong className="text-gray-500">School Badge:</strong>
              <img src={getPublicUrl('school-badges', schoolData.badge_path)!} alt="School Badge" className="w-24 h-24 object-contain rounded mt-2 border p-1" />
            </div>
          )}
        </section>
        
        {/* Admin Information */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-primary-red mb-4 flex items-center gap-3"><i className="fas fa-user-shield"></i>Administrator Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div><strong className="text-gray-500 block">Admin Name:</strong> <span className="text-lg">{schoolData.admin_name}</span></div>
            <div><strong className="text-gray-500 block">Admin NIN:</strong> <span className="text-lg">{schoolData.admin_nin || 'N/A'}</span></div>
            <div><strong className="text-gray-500 block">Admin Contact:</strong> <span className="text-lg">{schoolData.admin_contact || 'N/A'}</span></div>
            <div><strong className="text-gray-500 block">Admin Role:</strong> <span className="text-lg">{schoolData.admin_role || 'N/A'}</span></div>
            <div className="md:col-span-2"><strong className="text-gray-500 block">Admin Education:</strong> <span className="text-lg">{schoolData.admin_education || 'N/A'}</span></div>
          </div>
           {getPublicUrl('admin-photos', schoolData.admin_photo_path) && (
            <div className="mt-6">
              <strong className="text-gray-500">Admin Photo:</strong>
              <img src={getPublicUrl('admin-photos', schoolData.admin_photo_path)!} alt="Admin Photo" className="w-24 h-24 object-cover rounded-full mt-2 border-2 border-primary-red p-1" />
            </div>
          )}
        </section>
        
        {/* Player Management Section */}
        <section className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-primary-red flex items-center gap-3">
                    <i className="fas fa-users"></i>Player Management
                </h2>
                <Link
                    to={`/player-registration/${schoolData.id}`}
                    className="bg-secondary-yellow text-white font-bold py-3 px-6 rounded-full hover:bg-dark-yellow transition duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                    <i className="fas fa-user-plus"></i> Register New Player
                </Link>
            </div>
            
            <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('boys')} className={`${activeTab === 'boys' ? 'border-primary-red text-primary-red' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>
                        Boys Teams
                    </button>
                    <button onClick={() => setActiveTab('girls')} className={`${activeTab === 'girls' ? 'border-primary-red text-primary-red' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>
                        Girls Teams
                    </button>
                </nav>
            </div>

            <div className={activeTab === 'boys' ? 'space-y-8' : 'hidden'}>
                <PlayerTable title="Under 20 Boys" players={categorizedPlayers.boys.u20} />
                <PlayerTable title="Under 17 Boys" players={categorizedPlayers.boys.u17} />
                <PlayerTable title="Under 15 Boys" players={categorizedPlayers.boys.u15} />
            </div>

            <div className={activeTab === 'girls' ? 'space-y-8' : 'hidden'}>
                <PlayerTable title="Under 20 Girls" players={categorizedPlayers.girls.u20} />
                <PlayerTable title="Under 17 Girls" players={categorizedPlayers.girls.u17} />
                <PlayerTable title="Under 15 Girls" players={categorizedPlayers.girls.u15} />
            </div>
        </section>

        <p className="text-sm text-center text-gray-400 mt-8">Profile created on: {new Date(schoolData.created_at).toLocaleDateString()}</p>
        <div className="mt-8 border-t pt-6 flex justify-center">
            <button 
              onClick={handleSignOut}
              className="bg-dark-red text-white font-bold py-3 px-8 rounded-full hover:bg-red-800 transition duration-300 flex items-center gap-2"
            >
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;