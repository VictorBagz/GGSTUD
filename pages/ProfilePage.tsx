import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase, AppConstants } from '../lib/supabase';
import { SchoolDocument, PlayerDocument } from '../types';

const PlayerCard: React.FC<{ player: PlayerDocument }> = ({ player }) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (player.photo_path) {
            try {
                const { data } = supabase.storage.from(AppConstants.playerPhotosBucket).getPublicUrl(player.photo_path);
                setPhotoUrl(data.publicUrl);
            } catch (error) {
                console.error("Failed to get player photo preview:", error);
            }
        }
    }, [player.photo_path]);

    return (
        <div className="bg-gray-50 rounded-lg p-4 text-center shadow-md border border-gray-200">
            <img 
                src={photoUrl || 'https://picsum.photos/seed/player/100/100'} 
                alt={player.player_name} 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-secondary-yellow"
            />
            <h4 className="font-bold text-dark-gray">{player.player_name}</h4>
            <p className="text-sm text-gray-600">Age: {player.age}</p>
            <p className="text-sm text-gray-500">Class: {player.player_class}</p>
        </div>
    );
};


const ProfilePage: React.FC = () => {
    const { schoolId } = useParams<{ schoolId: string }>();
    const navigate = useNavigate();
    const [schoolData, setSchoolData] = useState<SchoolDocument | null>(null);
    const [players, setPlayers] = useState<PlayerDocument[]>([]);
    const [badgeUrl, setBadgeUrl] = useState<string | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Check if user is authenticated using Supabase v2 API
                const { data: { user }, error: userError } = await supabase.auth.getUser();
                if (userError || !user) {
                    navigate('/signin');
                    return;
                }
                
                if (!schoolId) {
                    throw new Error("School ID is missing.");
                }

                // Fetch school data
                const { data: school, error: schoolError } = await supabase
                    .from('schools')
                    .select('*')
                    .eq('id', schoolId)
                    .single();

                if (schoolError) throw schoolError;
                if (!school) throw new Error(`School with ID ${schoolId} not found.`);
                setSchoolData(school);

                // Fetch players for the school
                const { data: playerResponse, error: playerError } = await supabase
                    .from('players')
                    .select('*')
                    .eq('school_id', schoolId);

                if (playerError) throw playerError;
                setPlayers(playerResponse || []);

                // Fetch image previews
                if (school.badge_path) {
                    const { data } = supabase.storage.from(AppConstants.schoolBadgesBucket).getPublicUrl(school.badge_path);
                    setBadgeUrl(data.publicUrl);
                }
                
                if (school.admin_photo_path) {
                    const { data } = supabase.storage.from(AppConstants.adminProfilePhotosBucket).getPublicUrl(school.admin_photo_path);
                    setPhotoUrl(data.publicUrl);
                }

            } catch (e: any) {
                console.error("Failed to fetch profile:", e);
                if (e.code === 'PGRST116') { // This code indicates that `.single()` returned no rows
                    setError(`Profile with ID ${schoolId} not found.`);
                } else if (e.message.includes('Session not found')) {
                     navigate('/signin');
                } else {
                    setError(e.message || "Could not load profile data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [schoolId, navigate]);
    
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/signin');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-red"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <div>
                    <h2 className="text-2xl font-bold text-red-500">Error</h2>
                    <p className="text-gray-600">{error}</p>
                    <Link to="/" className="mt-4 inline-block bg-primary-red text-white font-bold py-2 px-4 rounded">Go to Homepage</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-24">
                <div className="text-5xl mb-4" data-aos="zoom-in"><i className="fas fa-check-circle"></i></div>
                <h1 className="text-4xl font-extrabold" data-aos="fade-down">Registration Successful!</h1>
                <p className="mt-4 text-xl" data-aos="fade-up">Your school registration is under review.</p>
            </section>
            <div className="py-12 bg-light-gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg space-y-8" data-aos="fade-right">
                        <div>
                            <h3 className="text-xl font-bold text-primary-red border-b pb-2 mb-4">School Information</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                                <p><strong>School Name:</strong> {schoolData?.school_name}</p>
                                <p><strong>Centre Number:</strong> {schoolData?.center_number}</p>
                                <p><strong>Contact:</strong> {schoolData?.school_contact}</p>
                                <p><strong>Region:</strong> {schoolData?.region}</p>
                                <p><strong>District:</strong> {schoolData?.district}</p>
                                <p><strong>Email:</strong> {schoolData?.school_email}</p>
                            </div>
                            {badgeUrl && <div className="mt-4"><p className="font-semibold">School Badge:</p><img src={badgeUrl} alt="School Badge" className="h-20 mt-2 rounded" /></div>}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-primary-red border-b pb-2 mb-4">Representative Information</h3>
                             <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                                <p><strong>Full Name:</strong> {schoolData?.admin_name}</p>
                                <p><strong>NIN:</strong> {schoolData?.admin_nin}</p>
                                <p><strong>Contact:</strong> {schoolData?.admin_contact}</p>
                                <p><strong>Role:</strong> {schoolData?.admin_role}</p>
                                <p><strong>Education:</strong> {schoolData?.admin_education}</p>
                             </div>
                             {photoUrl && <div className="mt-4"><p className="font-semibold">Profile Photo:</p><img src={photoUrl} alt="Admin" className="h-20 w-20 mt-2 rounded-full object-cover" /></div>}
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-primary-red border-b pb-2 mb-4">Registered Players ({players.length})</h3>
                            {players.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {players.map(player => (
                                        <PlayerCard key={player.id} player={player} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No players registered yet.</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-left" data-aos-delay="100">
                            <h3 className="font-bold mb-2">Registration Status</h3>
                            <p className="text-yellow-500 font-semibold"><i className="fas fa-clock mr-2"></i>Under Review</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-left" data-aos-delay="200">
                            <h3 className="font-bold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link to={`/player-registration/${schoolId}`} className="block w-full text-center bg-primary-red text-white font-bold py-2 px-4 rounded-lg hover:bg-dark-red transition duration-300">
                                    <i className="fas fa-user-plus mr-2"></i>Register Player
                                </Link>
                                 <button onClick={handleSignOut} className="block w-full text-center bg-dark-gray text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;