import React, { useState } from 'react';
import { Edit3, UserCheck, Shield } from 'lucide-react';
import ProfileForm from './ProfileForm';

const DoctorSettings = () => {
    const [isEditing, setIsEditing] = useState(false);

    const doctorData = {
        fullName: 'Dr. Ayurveda Practitioner',
        email: 'dr.ayurveda@example.com',
        phone: '+91 9876543210',
        specialization: 'Ayurvedic Nutrition & Diet',
        license: 'AYU-2024-001234',
        experience: 8,
        bio: 'Experienced Ayurvedic practitioner specializing in nutritional therapy and holistic wellness. Committed to helping patients achieve optimal health through traditional healing methods combined with modern medical understanding.',
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = (data) => {
        console.log('Saving doctor data:', data);
        setIsEditing(false);
        // Handle save logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Doctor Profile</h1>
                                <p className="text-gray-600 mt-1">Manage your professional information and credentials</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${isEditing
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            <Edit3 className="w-4 h-4" />
                            {isEditing ? 'Exit Edit Mode' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Profile Form */}
                <ProfileForm
                    data={doctorData}
                    isEditing={isEditing}
                    role="doctor"
                    onCancel={handleCancel}
                    onSave={handleSave}
                />

                {/* Status Indicator */}
                <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">
                            Profile status: <span className="font-medium text-green-600">Active & Verified</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorSettings;