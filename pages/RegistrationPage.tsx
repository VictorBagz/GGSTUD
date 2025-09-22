import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationFormData } from '../types';
import FileUploadInput from '../components/FileUploadInput';
import { account, databases, storage, AppwriteConfig, ID } from '../lib/appwrite';

declare const feather: any;

const ProgressStep: React.FC<{ icon: string, step: number, currentStep: number }> = ({ icon, step, currentStep }) => {
    const isCompleted = currentStep > step;
    const isActive = currentStep === step;

    return (
        <div
            className={`progress-step bg-gray-200 text-gray-400 ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            style={{
                backgroundColor: (isActive || isCompleted) ? '#ef4444' : '#e5e7eb',
                color: (isActive || isCompleted) ? 'white' : '#9ca3af',
            }}
        >
            <i data-feather={icon}></i>
        </div>
    );
};

const RegistrationPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RegistrationFormData>({
        schoolName: '', centerNumber: '', officeContact: '', region: '', district: '', schoolBadge: null,
        adminFullName: '', adminNin: '', adminContact: '', adminEmail: '', adminRole: '', adminEducation: '', adminPassword: '', adminProfilePhoto: null
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        feather.replace();
    }, [currentStep, passwordVisible]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (name: keyof RegistrationFormData, file: File | null) => {
        setFormData(prev => ({ ...prev, [name]: file }));
    };

    const navigateTo = (step: number) => {
        setCurrentStep(step);
        window.scrollTo(0, 0);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    const getPreviewUrl = (file: File | null) => {
        if (!file) return '';
        return URL.createObjectURL(file);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Step 1: Create the User Account
            const user = await account.create(ID.unique(), formData.adminEmail, formData.adminPassword, formData.adminFullName);

            // Step 2: Immediately create a session for the new user (Log In)
            await account.createEmailPasswordSession(formData.adminEmail, formData.adminPassword);

            // Now authenticated, proceed with file uploads and database creation
            // Step 3: Upload Files
            let schoolBadgeId: string | null = null;
            if (formData.schoolBadge) {
                const badgeFile = await storage.createFile(AppwriteConfig.schoolBadgesBucketId, ID.unique(), formData.schoolBadge);
                schoolBadgeId = badgeFile.$id;
            }

            let adminProfilePhotoId: string | null = null;
            if (formData.adminProfilePhoto) {
                const photoFile = await storage.createFile(AppwriteConfig.adminProfilePhotosBucketId, ID.unique(), formData.adminProfilePhoto);
                adminProfilePhotoId = photoFile.$id;
            }

            // Step 4: Create Database Document with matching attribute names
            const schoolData = {
                userId: user.$id,
                schoolName: formData.schoolName,
                centerNumber: formData.centerNumber,
                schoolContact: formData.officeContact,
                Region: formData.region,
                District: formData.district,
                schoolEmail: formData.adminEmail,
                badgeId: schoolBadgeId,
                admin_name: formData.adminFullName,
                admin_nin: formData.adminNin,
                admin_contact: formData.adminContact,
                admin_role: formData.adminRole,
                admin_education: formData.adminEducation,
                admin_photoId: adminProfilePhotoId,
            };

            const schoolDocument = await databases.createDocument(
                AppwriteConfig.databaseId,
                AppwriteConfig.schoolCollectionId,
                ID.unique(),
                schoolData
            );
            
            // Step 5: Redirect to Profile Page
            navigate(`/profile/${schoolDocument.$id}`);

        } catch (e: any) {
            setError(e.message || "An unexpected error occurred. Please try again.");
            console.error("Registration failed:", e);
            // Clean up failed session if user was created but session failed
            try { await account.deleteSession('current'); } catch (_) {}
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-gray-50 min-h-screen py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden" data-aos="fade-up">
                    <div className="px-8 py-6 bg-red-50">
                        <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-20 md:space-x-32 relative">
                                <ProgressStep icon="home" step={1} currentStep={currentStep} />
                                <ProgressStep icon="user" step={2} currentStep={currentStep} />
                                <ProgressStep icon="check-circle" step={3} currentStep={currentStep} />
                                <div className="absolute top-1/2 -translate-y-1/2 left-5 w-[calc(100%-40px)] h-0.5 bg-gray-200">
                                    <div className="h-full bg-red-600 transition-all duration-500" style={{width: `${((currentStep-1)/2)*100}%`}}></div>
                                </div>
                            </div>
                            <h2 className="text-lg md:text-xl font-bold text-red-600">School Registration</h2>
                        </div>
                    </div>

                    <div className="p-8">
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
                        {/* Step 1: School Information */}
                        <div className={`form-section ${currentStep === 1 ? 'block' : 'hidden'}`}>
                            <h3 className="text-2xl font-semibold text-red-700 mb-6 flex items-center">
                                <i data-feather="home" className="mr-2"></i> School Information
                            </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">School Name</label>
                                    <input type="text" name="schoolName" value={formData.schoolName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Enter school name" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Center Number</label>
                                    <input type="text" name="centerNumber" value={formData.centerNumber} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Enter center number" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Office Contact</label>
                                    <input type="tel" name="officeContact" value={formData.officeContact} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Enter contact number" />
                                </div>
                                 <div>
                                    <label className="block text-gray-700 mb-2">Region</label>
                                    <select name="region" value={formData.region} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 bg-white">
                                        <option value="">Select region</option>
                                        <option>Northern</option>
                                        <option>Central</option>
                                        <option>Eastern</option>
                                        <option>Western</option>
                                    </select>
                                </div>
                                 <div>
                                    <label className="block text-gray-700 mb-2">District</label>
                                    <input type="text" name="district" value={formData.district} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Enter district" />
                                </div>
                                <FileUploadInput id="schoolBadge" label="School Badge" onFileChange={(file) => handleFileChange('schoolBadge', file)} />
                            </div>
                            <div className="flex justify-end mt-8">
                                <button onClick={() => navigateTo(2)} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center">
                                    Next <i data-feather="arrow-right" className="ml-2 w-5 h-5"></i>
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Administrator Information */}
                        <div className={`form-section ${currentStep === 2 ? 'block' : 'hidden'}`}>
                             <h3 className="text-2xl font-semibold text-red-700 mb-6 flex items-center">
                                <i data-feather="user" className="mr-2"></i> Administrator Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">Full Name</label>
                                    <input type="text" name="adminFullName" value={formData.adminFullName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Enter full name" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">National ID (NIN)</label>
                                    <input type="text" name="adminNin" value={formData.adminNin} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Enter NIN" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Contact Number</label>
                                    <input type="tel" name="adminContact" value={formData.adminContact} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Enter contact number" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Administrator Email</label>
                                    <input type="email" name="adminEmail" value={formData.adminEmail} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Enter a valid email" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Role</label>
                                    <select name="adminRole" value={formData.adminRole} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 bg-white">
                                        <option value="">Select role</option>
                                        <option>Head Teacher</option><option>Deputy Head</option><option>Administrator</option><option>Bursar</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Level of Education</label>
                                    <select name="adminEducation" value={formData.adminEducation} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 bg-white">
                                        <option value="">Select level</option>
                                        <option>Primary</option><option>Secondary</option><option>Vocational</option><option>University</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <input type={passwordVisible ? "text" : "password"} name="adminPassword" value={formData.adminPassword} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1" placeholder="Minimum 8 characters" minLength={8} />
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                            <i data-feather={passwordVisible ? "eye-off" : "eye"}></i>
                                        </button>
                                    </div>
                                </div>
                                 <FileUploadInput id="adminProfilePhoto" label="Profile Photo" onFileChange={(file) => handleFileChange('adminProfilePhoto', file)} previewShape="circle" />
                            </div>
                            <div className="flex justify-between mt-8">
                                <button onClick={() => navigateTo(1)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 flex items-center">
                                    <i data-feather="arrow-left" className="mr-2 w-5 h-5"></i> Back
                                </button>
                                <button onClick={() => navigateTo(3)} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center">
                                    Next <i data-feather="arrow-right" className="ml-2 w-5 h-5"></i>
                                </button>
                            </div>
                        </div>

                        {/* Step 3: Summary & Submission */}
                        <div className={`form-section ${currentStep === 3 ? 'block' : 'hidden'}`}>
                             <h3 className="text-2xl font-semibold text-red-700 mb-6 flex items-center">
                                <i data-feather="check-circle" className="mr-2"></i> Review & Submit
                            </h3>
                            <div className="bg-red-50 rounded-lg p-6 mb-8">
                                <h4 className="text-lg font-medium text-red-700 mb-4 flex items-center"><i data-feather="home" className="mr-2"></i> School Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div><p className="text-sm text-gray-500">School Name</p><p className="font-medium">{formData.schoolName || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Center Number</p><p className="font-medium">{formData.centerNumber || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Office Contact</p><p className="font-medium">{formData.officeContact || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Region/District</p><p className="font-medium">{formData.region && formData.district ? `${formData.region}, ${formData.district}` : '-'}</p></div>
                                </div>
                                {formData.schoolBadge && <div className="mt-4"><p className="text-sm text-gray-500">School Badge</p><img src={getPreviewUrl(formData.schoolBadge)} alt="Badge" className="h-16 mt-2 rounded" /></div>}
                            </div>
                            <div className="bg-red-50 rounded-lg p-6 mb-8">
                                <h4 className="text-lg font-medium text-red-700 mb-4 flex items-center"><i data-feather="user" className="mr-2"></i> Administrator Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{formData.adminFullName || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">National ID</p><p className="font-medium">{formData.adminNin || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Contact Number</p><p className="font-medium">{formData.adminContact || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{formData.adminEmail || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Role</p><p className="font-medium">{formData.adminRole || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Level of Education</p><p className="font-medium">{formData.adminEducation || '-'}</p></div>
                                </div>
                                {formData.adminProfilePhoto && <div className="mt-4"><p className="text-sm text-gray-500">Profile Photo</p><img src={getPreviewUrl(formData.adminProfilePhoto)} alt="Profile" className="h-16 w-16 rounded-full mt-2 object-cover" /></div>}
                            </div>
                            <div className="mb-8">
                                <label htmlFor="termsCheck" className="flex items-start text-gray-700"><input type="checkbox" id="termsCheck" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mt-1 mr-3 h-4 w-4" />I agree to the <a href="#" className="text-red-600 hover:underline ml-1">Terms and Conditions</a> and confirm that all information provided is accurate.</label>
                            </div>
                            <div className="flex justify-between">
                                <button onClick={() => navigateTo(2)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 flex items-center">
                                    <i data-feather="arrow-left" className="mr-2 w-5 h-5"></i> Back
                                </button>
                                <button disabled={!termsAccepted || isLoading} onClick={handleSubmit} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : <><i data-feather="send" className="mr-2 w-5 h-5"></i> Submit Registration</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;