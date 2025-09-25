
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationFormData } from '../types';
import FileUploadInput from '../components/FileUploadInput';
import { supabase } from '../lib/supabase';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

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
            <i className={`fas fa-${icon}`}></i>
        </div>
    );
};

const RegistrationPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RegistrationFormData>({
        school_name: '', center_number: '', office_contact: '', region: '', district: '', school_badge: null,
        admin_full_name: '', admin_nin: '', admin_contact: '', admin_email: '', admin_role: '', admin_education: '', admin_password: '', admin_confirm_password: '', admin_profile_photo: null
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof RegistrationFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleFileChange = (name: keyof RegistrationFormData, file: File | null) => {
        setFormData(prev => ({ ...prev, [name]: file }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const navigateTo = (step: number) => {
        setCurrentStep(step);
        window.scrollTo(0, 0);
    };

    const validateStep = (step: number) => {
        const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};
        if (step === 1) {
            if (!formData.school_name) newErrors.school_name = 'School Name is required.';
            if (!formData.office_contact) newErrors.office_contact = 'School Contact is required.';
            if (!formData.region) newErrors.region = 'Region is required.';
            if (!formData.district) newErrors.district = 'District is required.';
            if (!formData.school_badge) newErrors.school_badge = 'School Badge is required.';
        } else if (step === 2) {
            if (!formData.admin_full_name) newErrors.admin_full_name = 'Admin Name is required.';
            if (!formData.admin_contact) newErrors.admin_contact = 'Contact Number is required.';
            if (!formData.admin_email) {
                newErrors.admin_email = 'School Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(formData.admin_email)) {
                newErrors.admin_email = 'School Email address is invalid.';
            }
            if (!formData.admin_role) newErrors.admin_role = 'Role is required.';
            if (!formData.admin_education) newErrors.admin_education = 'Level of Education is required.';
            if (!formData.admin_password) {
                newErrors.admin_password = 'Password is required.';
            } else if (formData.admin_password.length < 8) {
                newErrors.admin_password = 'Password must be at least 8 characters long.';
            }
            if (formData.admin_confirm_password && formData.admin_password !== formData.admin_confirm_password) {
                newErrors.admin_confirm_password = 'Passwords do not match.';
            }
            if (!formData.admin_profile_photo) newErrors.admin_profile_photo = 'Profile Photo is required.';
        }
        return newErrors;
    };

    const handleStep1Next = () => {
        const stepErrors = validateStep(1);
        setErrors(stepErrors);
        if (Object.keys(stepErrors).length === 0) {
            navigateTo(2);
        }
    };

    const handleStep2Next = () => {
        const stepErrors = validateStep(2);
        setErrors(stepErrors);
        if (Object.keys(stepErrors).length === 0) {
            navigateTo(3);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    const getPreviewUrl = (file: File | null) => {
        if (!file) return '';
        return URL.createObjectURL(file);
    };

    const handleSubmit = async () => {
        // Final validation before submit
        const finalErrors = validateStep(2);
        if (Object.keys(finalErrors).length > 0) {
            setErrors(finalErrors);
            setCurrentStep(2);
            window.scrollTo(0, 0);
            return;
        }
        if (!termsAccepted) {
            setError('You must accept the terms and conditions to proceed.');
            return;
        }

        setIsLoading(true);
        setError(null);
    
        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.admin_email,
                password: formData.admin_password,
                options: {
                    data: {
                        full_name: formData.admin_full_name,
                    }
                }
            });
    
            if (authError) throw new Error(`Auth error: ${authError.message}`);
            if (!data.user) throw new Error("User not created. Please try again.");
            const user = data.user;
    
            let badgePath: string | undefined;
            if (formData.school_badge) {
                const fileName = `public/${user.id}-${Date.now()}-${formData.school_badge.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('school-badges')
                    .upload(fileName, formData.school_badge, { upsert: true });
                if (uploadError) throw new Error(`Badge upload failed: ${uploadError.message}`);
                badgePath = fileName;
            }
    
            let adminPhotoPath: string | undefined;
            if (formData.admin_profile_photo) {
                const fileName = `public/${user.id}-${Date.now()}-${formData.admin_profile_photo.name}`;
                const { error: uploadError } = await supabase.storage
                    .from('admin-photos')
                    .upload(fileName, formData.admin_profile_photo, { upsert: true });
                if (uploadError) throw new Error(`Photo upload failed: ${uploadError.message}`);
                adminPhotoPath = fileName;
            }

            const schoolData = {
                user_id: user.id,
                school_name: formData.school_name,
                center_number: formData.center_number || null,
                school_contact: formData.office_contact,
                school_email: formData.admin_email,
                region: formData.region,
                district: formData.district,
                badge_path: badgePath || null,
                admin_name: formData.admin_full_name,
                admin_nin: formData.admin_nin || null,
                admin_contact: formData.admin_contact,
                admin_role: formData.admin_role,
                admin_education: formData.admin_education,
                admin_photo_path: adminPhotoPath || null,
            };

            const { data: schoolDocument, error: dbError } = await supabase
                .from('schools')
                .insert(schoolData)
                .select('id')
                .single();

            if (dbError) throw new Error(`Database error: ${dbError.message}`);
            if (!schoolDocument) throw new Error("School profile could not be created.");
            
            navigate(`/profile/${schoolDocument.id}`);
    
        } catch (e: any) {
            setError(e.message || "An unexpected error occurred. Please try again.");
            console.error("Registration failed:", e);
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
                                <i className="fas fa-home mr-2"></i> School Information
                            </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">School Name *</label>
                                    <input type="text" name="school_name" value={formData.school_name} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors.school_name ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`} placeholder="Enter school name" />
                                    {errors.school_name && <p className="text-red-500 text-xs mt-1">{errors.school_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Center Number</label>
                                    <input type="text" name="center_number" value={formData.center_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-red" placeholder="Enter center number" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">School Contact *</label>
                                    <input type="tel" name="office_contact" value={formData.office_contact} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors.office_contact ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`} placeholder="Enter contact number" />
                                    {errors.office_contact && <p className="text-red-500 text-xs mt-1">{errors.office_contact}</p>}
                                </div>
                                 <div>
                                    <label className="block text-gray-700 mb-2">Region *</label>
                                    <select name="region" value={formData.region} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 bg-white ${errors.region ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`}>
                                        <option value="">Select region</option>
                                        <option>Northern</option>
                                        <option>Central</option>
                                        <option>Eastern</option>
                                        <option>Western</option>
                                    </select>
                                    {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
                                </div>
                                 <div>
                                    <label className="block text-gray-700 mb-2">District *</label>
                                    <input type="text" name="district" value={formData.district} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors.district ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`} placeholder="Enter district" />
                                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                                </div>
                                <FileUploadInput id="schoolBadge" label="School Badge *" onFileChange={(file) => handleFileChange('school_badge', file)} error={errors.school_badge} />
                            </div>
                            <div className="flex justify-end mt-8">
                                <button onClick={handleStep1Next} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center">
                                    Next <i className="fas fa-arrow-right ml-2 w-5 h-5"></i>
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Administrator Information */}
                        <div className={`form-section ${currentStep === 2 ? 'block' : 'hidden'}`}>
                             <h3 className="text-2xl font-semibold text-red-700 mb-6 flex items-center">
                                <i className="fas fa-user mr-2"></i> Administrator Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 mb-2">Admin Name *</label>
                                    <input type="text" name="admin_full_name" value={formData.admin_full_name} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors.admin_full_name ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`} placeholder="Enter full name" />
                                    {errors.admin_full_name && <p className="text-red-500 text-xs mt-1">{errors.admin_full_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">National ID (NIN)</label>
                                    <input type="text" name="admin_nin" value={formData.admin_nin} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-red" placeholder="Enter NIN" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Contact Number *</label>
                                    <input type="tel" name="admin_contact" value={formData.admin_contact} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors.admin_contact ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`} placeholder="Enter contact number" />
                                    {errors.admin_contact && <p className="text-red-500 text-xs mt-1">{errors.admin_contact}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">School Email *</label>
                                    <input type="email" name="admin_email" value={formData.admin_email} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors.admin_email ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`} placeholder="Enter a valid email" />
                                    {errors.admin_email && <p className="text-red-500 text-xs mt-1">{errors.admin_email}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Role *</label>
                                    <select name="admin_role" value={formData.admin_role} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 bg-white ${errors.admin_role ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`}>
                                        <option value="">Select role</option>
                                        <option>Head Teacher</option><option>Deputy Head</option><option>Administrator</option><option>Bursar</option>
                                    </select>
                                    {errors.admin_role && <p className="text-red-500 text-xs mt-1">{errors.admin_role}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Level of Education *</label>
                                    <select name="admin_education" value={formData.admin_education} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 bg-white ${errors.admin_education ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`}>
                                        <option value="">Select level</option>
                                        <option>Primary</option><option>Secondary</option><option>Vocational</option><option>University</option>
                                    </select>
                                    {errors.admin_education && <p className="text-red-500 text-xs mt-1">{errors.admin_education}</p>}
                                </div>
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Password *</label>
                                        <div className="relative">
                                            <input type={passwordVisible ? "text" : "password"} name="admin_password" value={formData.admin_password} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors.admin_password ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`} placeholder="Minimum 8 characters" />
                                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                                                <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
                                            </button>
                                        </div>
                                        {errors.admin_password && <p className="text-red-500 text-xs mt-1">{errors.admin_password}</p>}
                                        <PasswordStrengthMeter password={formData.admin_password} />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Confirm Password *</label>
                                        <input type="password" name="admin_confirm_password" value={formData.admin_confirm_password} onChange={handleInputChange} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors.admin_confirm_password ? 'border-red-500 ring-red-500' : 'focus:ring-primary-red'}`} placeholder="Confirm password" />
                                        {errors.admin_confirm_password && <p className="text-red-500 text-xs mt-1">{errors.admin_confirm_password}</p>}
                                    </div>
                                </div>
                                <FileUploadInput id="adminProfilePhoto" label="Profile Photo *" onFileChange={(file) => handleFileChange('admin_profile_photo', file)} previewShape="circle" error={errors.admin_profile_photo} />
                            </div>
                            <div className="flex justify-between mt-8">
                                <button onClick={() => navigateTo(1)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 flex items-center">
                                    <i className="fas fa-arrow-left mr-2 w-5 h-5"></i> Back
                                </button>
                                <button onClick={handleStep2Next} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center">
                                    Next <i className="fas fa-arrow-right ml-2 w-5 h-5"></i>
                                </button>
                            </div>
                        </div>

                        {/* Step 3: Summary & Submission */}
                        <div className={`form-section ${currentStep === 3 ? 'block' : 'hidden'}`}>
                             <h3 className="text-2xl font-semibold text-red-700 mb-6 flex items-center">
                                <i className="fas fa-check-circle mr-2"></i> Review & Submit
                            </h3>
                            <div className="bg-red-50 rounded-lg p-6 mb-8">
                                <h4 className="text-lg font-medium text-red-700 mb-4 flex items-center"><i className="fas fa-home mr-2"></i> School Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div><p className="text-sm text-gray-500">School Name</p><p className="font-medium">{formData.school_name || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Center Number</p><p className="font-medium">{formData.center_number || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">School Contact</p><p className="font-medium">{formData.office_contact || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Region/District</p><p className="font-medium">{formData.region && formData.district ? `${formData.region}, ${formData.district}` : '-'}</p></div>
                                </div>
                                {formData.school_badge && <div className="mt-4"><p className="text-sm text-gray-500">School Badge</p><img src={getPreviewUrl(formData.school_badge)} alt="Badge" className="h-16 mt-2 rounded" /></div>}
                            </div>
                            <div className="bg-red-50 rounded-lg p-6 mb-8">
                                <h4 className="text-lg font-medium text-red-700 mb-4 flex items-center"><i className="fas fa-user mr-2"></i> Administrator Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div><p className="text-sm text-gray-500">Admin Name</p><p className="font-medium">{formData.admin_full_name || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">National ID</p><p className="font-medium">{formData.admin_nin || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Contact Number</p><p className="font-medium">{formData.admin_contact || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">School Email</p><p className="font-medium">{formData.admin_email || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Role</p><p className="font-medium">{formData.admin_role || '-'}</p></div>
                                    <div><p className="text-sm text-gray-500">Level of Education</p><p className="font-medium">{formData.admin_education || '-'}</p></div>
                                </div>
                                {formData.admin_profile_photo && <div className="mt-4"><p className="text-sm text-gray-500">Profile Photo</p><img src={getPreviewUrl(formData.admin_profile_photo)} alt="Profile" className="h-16 w-16 rounded-full mt-2 object-cover" /></div>}
                            </div>
                            <div className="mb-8">
                                <label htmlFor="termsCheck" className="flex items-start text-gray-700"><input type="checkbox" id="termsCheck" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mt-1 mr-3 h-4 w-4" />I agree to the <a href="#" className="text-red-600 hover:underline ml-1">Terms and Conditions</a> and confirm that all information provided is accurate.</label>
                            </div>
                            <div className="flex justify-between">
                                <button onClick={() => navigateTo(2)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300 flex items-center">
                                    <i className="fas fa-arrow-left mr-2 w-5 h-5"></i> Back
                                </button>
                                <button disabled={!termsAccepted || isLoading} onClick={handleSubmit} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : <><i className="fas fa-paper-plane mr-2 w-5 h-5"></i> Submit Registration</>}
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