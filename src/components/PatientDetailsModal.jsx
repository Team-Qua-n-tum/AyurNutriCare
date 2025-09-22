import React, { useState } from 'react';
import { X, Edit2, Save, User, Phone, MapPin, Heart, Activity } from 'lucide-react';

export function PatientDetailsModal({ patient, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState({ ...patient });

  const handleSave = () => {
    // Calculate age from date of birth
    const today = new Date();
    const birthDate = new Date(editedPatient.dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      editedPatient.age = age - 1;
    } else {
      editedPatient.age = age;
    }

    onUpdate(editedPatient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPatient({ ...patient });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedPatient(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-3xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEditing ? 'Edit Patient Details' : 'Patient Details'}
                </h2>
                <p className="text-gray-600">{patient.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="btn btn-success flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover-text-gray-600 hover-bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Patient Information */}
          <div className="grid md-grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-emerald-600" />
                <span>Personal Information</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPatient.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.name}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedPatient.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Age</label>
                  <p className="text-gray-900">{isEditing ? editedPatient.age : patient.age} years</p>
                </div>
                <div>
                  <label className="form-label">Gender</label>
                  {isEditing ? (
                    <select
                      value={editedPatient.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 capitalize">{patient.gender}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>Contact Information</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedPatient.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.contactNumber}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Address</label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editedPatient.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.address}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Emergency Contact</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedPatient.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.emergencyContact}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Physical Information */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <span>Physical Information</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Weight (kg)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedPatient.weight}
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.weight} kg</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Height (cm)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedPatient.height}
                      onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.height} cm</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Blood Group</label>
                  {isEditing ? (
                    <select
                      value={editedPatient.bloodGroup}
                      onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{patient.bloodGroup}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Constitution</label>
                  {isEditing ? (
                    <select
                      value={editedPatient.constitution}
                      onChange={(e) => handleInputChange('constitution', e.target.value)}
                    >
                      <option value="Vata">Vata</option>
                      <option value="Pitta">Pitta</option>
                      <option value="Kapha">Kapha</option>
                      <option value="Vata-Pitta">Vata-Pitta</option>
                      <option value="Pitta-Kapha">Pitta-Kapha</option>
                      <option value="Kapha-Vata">Kapha-Vata</option>
                      <option value="Tridosha">Tridosha</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{patient.constitution}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-600" />
                <span>Medical Information</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Allergies</label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={editedPatient.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      placeholder="List any known allergies"
                    />
                  ) : (
                    <p className="text-gray-900">{patient.allergies || 'None reported'}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Medical History</label>
                  {isEditing ? (
                    <textarea
                      rows={3}
                      value={editedPatient.medicalHistory}
                      onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                      placeholder="Previous medical conditions, surgeries, etc."
                    />
                  ) : (
                    <p className="text-gray-900">{patient.medicalHistory || 'No significant history'}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Dietary Restrictions</label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={editedPatient.dietaryRestrictions}
                      onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                      placeholder="Vegetarian, vegan, gluten-free, etc."
                    />
                  ) : (
                    <p className="text-gray-900">{patient.dietaryRestrictions || 'None'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* BMI Calculation */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Health Metrics</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">BMI:</span>
                <p className="font-medium text-blue-900">
                  {((patient.weight / ((patient.height / 100) ** 2)).toFixed(1))}
                </p>
              </div>
              <div>
                <span className="text-blue-700">Status:</span>
                <p className="font-medium text-blue-900 capitalize">{patient.status}</p>
              </div>
              <div>
                <span className="text-blue-700">Last Visit:</span>
                <p className="font-medium text-blue-900">{new Date(patient.lastVisit).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}