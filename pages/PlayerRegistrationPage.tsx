import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase, AppConstants } from '../lib/supabase';
import FileUploadInput from '../components/FileUploadInput';

const PlayerRegistrationPage: React.FC = () => {
    const { schoolId } = useParams<{ schoolId: string }>();
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [age, setAge] = useState('');
    const [nextOfKinContact, setNextOfKinContact] = useState('');
    const [lin, setLin] = useState('');
    const [playerClass, setPlayerClass] = useState('');
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!schoolId) {
            setError("School identifier is missing. Cannot register player.");
            return;
        }
        setIsLoading(true);
        setError(null);
        
        try {
            let photoPath: string | undefined = undefined;
            if (profilePhoto) {
                const filePath = `public/${schoolId}-${Date.now()}-${profilePhoto.name}`;
                const { error: uploadError } = await supabase.storage.from(AppConstants.playerPhotosBucket).upload(filePath, profilePhoto);
                if (uploadError) throw uploadError;
                photoPath = filePath;
            }

            const playerData = {
                school_id: schoolId,
                player_name: playerName,
                date_of_birth: dateOfBirth,
                age: Number(age),
                next_of_kin_contact: nextOfKinContact,
                lin: lin,
                player_class: playerClass,
                photo_path: photoPath,
            };

            const { error: dbError } = await supabase.from('players').insert(playerData);
            if (dbError) throw dbError;
            
            navigate(`/profile/${schoolId}`);

        } catch (e: any) {
             setError(e.message || "An unexpected error occurred. Please try again.");
            console.error("Player registration failed:", e);
        } finally {
            setIsLoading(false);
        }
    };


    return (
    <>
        <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-24">
            <h1 className="text-5xl font-extrabold" data-aos="fade-down"><i className="fas fa-user-plus mr-4"></i>Player Registration</h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto" data-aos="fade-up">Register a new player for your school's rugby team.</p>
        </section>

        <div className="py-20 max-w-4xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl" data-aos="fade-up">
                 {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <FileUploadInput id="playerProfilePhoto" label="Player Profile Photo" onFileChange={setProfilePhoto} previewShape="circle" />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Player Name *</label>
                            <input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-red" required/>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Date of Birth *</label>
                            <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-red" required/>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Age *</label>
                            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-red" required/>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Next of Kin Contact *</label>
                            <input type="tel" value={nextOfKinContact} onChange={e => setNextOfKinContact(e.target.value)} placeholder="+256..." className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-red" required/>
                        </div>
                         <div>
                            <label className="block text-gray-700 mb-2">Learner ID Number (LIN) *</label>
                            <input type="text" value={lin} onChange={e => setLin(e.target.value)} placeholder="LIN" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-red" required/>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Class *</label>
                            <select value={playerClass} onChange={e => setPlayerClass(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-red" required>
                                <option value="">Select Class</option>
                                <option>S1</option>
                                <option>S2</option>
                                <option>S3</option>
                                <option>S4</option>
                                <option>S5</option>
                                <option>S6</option>
                            </select>
                        </div>
                     </div>
                    <div className="flex justify-between items-center pt-4">
                        <Link to={`/profile/${schoolId}`} className="text-gray-600 hover:text-dark-red font-semibold">Cancel</Link>
                         <button type="submit" disabled={isLoading} className="bg-primary-red text-white font-bold py-3 px-8 rounded-full hover:bg-dark-red transition duration-300 flex items-center disabled:opacity-50">
                             {isLoading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : 'Register Player'}
                         </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
};

export default PlayerRegistrationPage;