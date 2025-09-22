import React, { useState } from 'react';
import { Users, Calendar, CheckCircle, Clock, AlertCircle, MessageSquare, TrendingUp, Stethoscope, BookOpen, Eye, FileText } from 'lucide-react';
import { PatientDetailsModal } from './PatientDetailsModal';
import { DietChartModal } from './DietChartModal';
import ChatBot from './chatbot';

const mockPatients = [
  {
    id: '1',
    name: 'Priya Sharma',
    dateOfBirth: '1992-03-15',
    age: 32,
    gender: 'female',
    lastVisit: '2024-01-15',
    constitution: 'Vata-Pitta',
    status: 'active',
    weight: 65,
    height: 165,
    bloodGroup: 'O+',
    allergies: 'Nuts, Dairy',
    medicalHistory: 'Hypothyroidism, Anxiety',
    dietaryRestrictions: 'Vegetarian',
    contactNumber: '+91 9876543210',
    address: '123 Green Street, Mumbai, Maharashtra',
    emergencyContact: 'Raj Sharma - +91 9876543211'
  },
  {
    id: '2',
    name: 'Arjun Patel',
    dateOfBirth: '1996-07-22',
    age: 28,
    gender: 'male',
    lastVisit: '2024-01-12',
    constitution: 'Pitta-Kapha',
    status: 'active',
    weight: 78,
    height: 175,
    bloodGroup: 'A+',
    allergies: 'Shellfish',
    medicalHistory: 'Hypertension',
    dietaryRestrictions: 'Low sodium',
    contactNumber: '+91 9876543212',
    address: '456 Blue Avenue, Delhi, Delhi',
    emergencyContact: 'Meera Patel - +91 9876543213'
  },
  {
    id: '3',
    name: 'Meera Singh',
    dateOfBirth: '1979-11-08',
    age: 45,
    gender: 'female',
    lastVisit: '2024-01-10',
    constitution: 'Kapha-Vata',
    status: 'follow-up',
    weight: 70,
    height: 160,
    bloodGroup: 'B+',
    allergies: 'Gluten',
    medicalHistory: 'Diabetes Type 2, Arthritis',
    dietaryRestrictions: 'Gluten-free, Low sugar',
    contactNumber: '+91 9876543214',
    address: '789 Red Road, Bangalore, Karnataka',
    emergencyContact: 'Vikram Singh - +91 9876543215'
  }
];

const mockRequests = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Priya Sharma',
    title: 'Weight Management Plan',
    description: 'Looking for a personalized Ayurvedic diet plan to help with healthy weight management and increased energy levels.',
    healthGoals: 'Lose 5kg in 3 months, increase energy, improve digestion',
    currentSymptoms: 'Low energy, irregular digestion, cravings for sweets',
    status: 'completed',
    createdAt: '2024-01-10',
    assignedDoctorId: '2',
    response: 'Based on your Vata-Pitta constitution, I recommend warm, cooked foods with mild spices.'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Arjun Patel',
    title: 'Digestive Health Consultation',
    description: 'Experiencing digestive issues and would like an Ayurvedic approach to improve gut health.',
    healthGoals: 'Better digestion, reduced bloating, regular bowel movements',
    currentSymptoms: 'Bloating after meals, irregular bowel movements, acid reflux',
    status: 'pending',
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Meera Singh',
    title: 'Energy and Vitality Enhancement',
    description: 'Feeling constantly tired and looking for natural ways to boost energy through nutrition.',
    healthGoals: 'Increase energy levels, better sleep quality, mental clarity',
    currentSymptoms: 'Chronic fatigue, poor sleep, mental fog',
    status: 'in-review',
    createdAt: '2024-01-14'
  }
];

export function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState(mockRequests);
  const [patients, setPatients] = useState(mockPatients);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDietChart, setShowDietChart] = useState(false);
  const [response, setResponse] = useState('');

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(requests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    ));
  };

  const handleSubmitResponse = (e) => {
    e.preventDefault();
    if (selectedRequest && response.trim()) {
      setRequests(requests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, response: response.trim(), status: 'completed' }
          : req
      ));
      setSelectedRequest(null);
      setResponse('');
    }
  };

  const handlePatientUpdate = (updatedPatient) => {
    setPatients(patients.map(p =>
      p.id === updatedPatient.id ? updatedPatient : p
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-badge status-completed';
      case 'in-review':
        return 'status-badge status-in-review';
      default:
        return 'status-badge status-pending';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, Dr. Kumar</h1>
        <p className="text-gray-600">Your patients' wellness journey continues with your guidance</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div>
            <p className="stat-label">Total Patients</p>
            <p className="stat-value">124</p>
          </div>
          <Users className="w-8 h-8" style={{ opacity: 0.8 }} />
        </div>

        <div className="stat-card secondary">
          <div>
            <p className="stat-label text-gray-600">Pending Requests</p>
            <p className="stat-value text-gray-900">
              {requests.filter(r => r.status === 'pending').length}
            </p>
          </div>
          <MessageSquare className="w-8 h-8 text-blue-400" />
        </div>

        <div className="stat-card secondary">
          <div>
            <p className="stat-label text-gray-600">Today's Appointments</p>
            <p className="stat-value text-gray-900">8</p>
          </div>
          <Calendar className="w-8 h-8 text-purple-400" />
        </div>

        <div className="stat-card secondary">
          <div>
            <p className="stat-label text-gray-600">Success Rate</p>
            <p className="stat-value text-gray-900">92%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-400" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-container">
        <div className="tab-list">
          <button
            onClick={() => setActiveTab('requests')}
            className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
          >
            Diet Consultation Requests
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
          >
            Patient Management
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'requests' ? (
        <div className="grid lg-grid-cols-3 gap-8">
          {/* Diet Consultation Requests */}
          <div className="lg-col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Diet Consultation Requests</h2>

              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="card-hover border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{request.title}</h3>
                        <p className="text-sm text-gray-600">Patient: {request.patientName}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={getStatusClass(request.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(request.status)}
                            <span className="capitalize">{request.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">{request.description}</p>

                    <div className="grid md-grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <span className="text-gray-500">Health Goals:</span>
                        <p className="text-gray-700">{request.healthGoals}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Current Symptoms:</span>
                        <p className="text-gray-700">{request.currentSymptoms}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {request.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(request.id, 'in-review')}
                            className="btn btn-warning text-xs"
                          >
                            Start Review
                          </button>
                        )}
                        {request.status === 'in-review' && (
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="btn btn-primary text-xs"
                          >
                            Add Response
                          </button>
                        )}
                        {request.status === 'completed' && request.response && (
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="btn btn-secondary text-xs"
                          >
                            View Response
                          </button>
                        )}
                      </div>
                    </div>

                    {request.response && request.status === 'completed' && (
                      <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <p className="text-sm text-emerald-800">
                          <strong>Your Response:</strong> {request.response}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Patients */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Patients</h3>
              <div className="space-y-3">
                {mockPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                      <p className="text-xs text-gray-500">{patient.constitution} • Age {patient.age}</p>
                    </div>
                    <div className={`status-badge ${patient.status === 'active' ? 'status-active' : 'status-follow-up'}`}>
                      {patient.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-emerald-50 hover-bg-emerald-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-800">Schedule Consultation</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-blue-50 hover-bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">View Treatment Plans</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Ayurvedic Tip */}
            <div className="bg-gradient-amber rounded-xl p-6 border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-3">Daily Ayurvedic Wisdom</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need." - Ayurvedic Proverb
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Patient Management Tab */
        <div className="grid lg-grid-cols-3 gap-8">
          <div className="lg-col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Management</h2>

              <div className="space-y-4">
                {patients.map((patient) => (
                  <div key={patient.id} className="card-hover border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{patient.name}</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>Age: {patient.age} • {patient.gender}</div>
                          <div>Constitution: {patient.constitution}</div>
                          <div>Blood Group: {patient.bloodGroup}</div>
                          <div>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className={`status-badge ${patient.status === 'active' ? 'status-active' : 'status-follow-up'}`}>
                        {patient.status}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="btn btn-secondary text-xs flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setShowDietChart(true);
                        }}
                        className="btn btn-primary text-xs flex items-center space-x-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Create Diet Chart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Stats Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Patient Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Patients</span>
                  <span className="text-sm font-medium">{patients.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active</span>
                  <span className="text-sm font-medium">{patients.filter(p => p.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Follow-up</span>
                  <span className="text-sm font-medium">{patients.filter(p => p.status === 'follow-up').length}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Constitution Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Vata-Pitta</span>
                  <span>33%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pitta-Kapha</span>
                  <span>33%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Kapha-Vata</span>
                  <span>34%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {selectedRequest && !showDietChart && (
        <div className="modal-overlay">
          <div className="modal-content max-w-3xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedRequest.status === 'completed' ? 'View Response' : 'Add Response'} - {selectedRequest.title}
              </h2>

              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Patient: {selectedRequest.patientName}</h3>
                <div className="grid md-grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Health Goals:</span>
                    <p className="text-gray-900">{selectedRequest.healthGoals}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Symptoms:</span>
                    <p className="text-gray-900">{selectedRequest.currentSymptoms}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">Description:</span>
                  <p className="text-gray-900">{selectedRequest.description}</p>
                </div>
              </div>

              {selectedRequest.status === 'completed' && selectedRequest.response ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg mb-4">
                  <h4 className="font-medium text-emerald-900 mb-2">Your Response:</h4>
                  <p className="text-emerald-800">{selectedRequest.response}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitResponse}>
                  <div className="form-group mb-4">
                    <label className="form-label">
                      Your Professional Response & Recommendations
                    </label>
                    <textarea
                      required
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      rows={8}
                      placeholder="Provide detailed Ayurvedic consultation response, including dietary recommendations, lifestyle suggestions, and treatment plan..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRequest(null);
                        setResponse('');
                      }}
                      className="px-4 py-2 text-gray-600 hover-text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-6 py-2"
                    >
                      Submit Response
                    </button>
                  </div>
                </form>
              )}

              {selectedRequest.status === 'completed' && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="btn btn-secondary px-6 py-2"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && !showDietChart && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onUpdate={handlePatientUpdate}
        />
      )}

      {/* Diet Chart Modal */}
      {showDietChart && selectedPatient && (
        <DietChartModal
          patient={selectedPatient}
          onClose={() => {
            setShowDietChart(false);
            setSelectedPatient(null);
          }}
        />
      )}
      <ChatBot />
    </div>
  );
}
export default DoctorDashboard;