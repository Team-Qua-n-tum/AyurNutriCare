import React from 'react';
import { User, Mail, Phone, Stethoscope, Car as IdCard, Calendar, UserCheck, FileText, Heart, Save, X } from 'lucide-react';

const ProfileForm = ({ data, isEditing, role, onCancel, onSave }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave(data);
        }
    };

    const inputClassName = `w-full px-4 py-3 border rounded-lg transition-all duration-200 ${isEditing
        ? 'border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white'
        : 'border-gray-200 bg-gray-50 text-gray-600'
        }`;

    const textareaClassName = `w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none ${isEditing
        ? 'border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white'
        : 'border-gray-200 bg-gray-50 text-gray-600'
        }`;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="p-8">
                <div className="grid gap-6">
                    {/* Basic Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100">
                            <User className="w-5 h-5 text-blue-600" />
                            Basic Information
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={data.fullName}
                                    disabled={!isEditing}
                                    className={inputClassName}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    defaultValue={data.email}
                                    disabled={!isEditing}
                                    className={inputClassName}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Phone className="w-4 h-4" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    defaultValue={data.phone}
                                    disabled={!isEditing}
                                    className={inputClassName}
                                />
                            </div>

                            {role === 'patient' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Calendar className="w-4 h-4" />
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={data.age}
                                            disabled={!isEditing}
                                            className={inputClassName}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <UserCheck className="w-4 h-4" />
                                            Gender
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data.gender}
                                            disabled={!isEditing}
                                            className={inputClassName}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Professional Information (Doctor only) */}
                    {role === 'doctor' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100">
                                <Stethoscope className="w-5 h-5 text-green-600" />
                                Professional Information
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Stethoscope className="w-4 h-4" />
                                        Specialization
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={data.specialization}
                                        disabled={!isEditing}
                                        className={inputClassName}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <IdCard className="w-4 h-4" />
                                        License Number
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={data.license}
                                        disabled={!isEditing}
                                        className={inputClassName}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-1">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Calendar className="w-4 h-4" />
                                        Years of Experience
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={data.experience}
                                        disabled={!isEditing}
                                        className={inputClassName}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Medical History (Patient only) */}
                    {role === 'patient' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100">
                                <Heart className="w-5 h-5 text-red-500" />
                                Medical Information
                            </h3>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <FileText className="w-4 h-4" />
                                    Medical History
                                </label>
                                <textarea
                                    rows="3"
                                    defaultValue={data.medicalHistory}
                                    disabled={!isEditing}
                                    className={textareaClassName}
                                    placeholder="Enter medical history, allergies, current medications, etc."
                                />
                            </div>
                        </div>
                    )}

                    {/* Bio Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100">
                            <FileText className="w-5 h-5 text-purple-600" />
                            About
                        </h3>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FileText className="w-4 h-4" />
                                Bio
                            </label>
                            <textarea
                                rows="4"
                                defaultValue={data.bio}
                                disabled={!isEditing}
                                className={textareaClassName}
                                placeholder="Tell us about yourself, your approach to healthcare, interests, etc."
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;