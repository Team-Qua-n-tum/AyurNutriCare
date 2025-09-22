import React, { useState } from 'react';
import { Edit3, User, Heart } from 'lucide-react';
import ProfileForm from './ProfileForm';

const PatientSettings = () => {
    const [isEditing, setIsEditing] = useState(false);

    const patientData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        age: 32,
        gender: 'Male',
        medicalHistory: 'Hypertension (controlled with medication), seasonal allergies, no known drug allergies. Family history of diabetes.',
        bio: 'Health-conscious individual seeking holistic wellness and preventive care. Actively interested in maintaining a balanced lifestyle through proper nutrition and regular exercise.',
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = (data) => {
        console.log('Saving patient data:', data);
        setIsEditing(false);
        // Handle save logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Patient Profile</h1>
                                <p className="text-gray-600 mt-1">Keep your health information up to date</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${isEditing
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                        >
                            <Edit3 className="w-4 h-4" />
                            {isEditing ? 'Exit Edit Mode' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Profile Form */}
                <ProfileForm
                    data={patientData}
                    isEditing={isEditing}
                    role="patient"
                    onCancel={handleCancel}
                    onSave={handleSave}
                />

                {/* Health Summary */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-red-500" />
                            Health Status
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Blood pressure monitoring required</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Regular check-ups up to date</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" />
                            Profile Completion
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Profile completeness</span>
                                <span className="text-sm font-medium text-green-600">95%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientSettings;