import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle, AlertCircle, Download, Heart, Activity, Target, FileText, Trash2 } from 'lucide-react';
import ChatBot from './chatbot';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const mockRequests = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Mukesh',
    title: 'Weight Management Plan',
    description: 'Looking for a personalized Ayurvedic diet plan to help with healthy weight management and increased energy levels.',
    healthGoals: 'Lose 5kg in 3 months, increase energy, improve digestion',
    currentSymptoms: 'Low energy, irregular digestion, cravings for sweets',
    status: 'completed',
    createdAt: '2024-01-10',
    assignedDoctorId: '2',
    response: 'Based on your Vata-Pitta constitution, I recommend warm, cooked foods with mild spices. Follow the detailed meal plan attached.'
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'Mukesh',
    title: 'Digestive Health Consultation',
    description: 'Experiencing digestive issues and would like an Ayurvedic approach to improve gut health.',
    healthGoals: 'Better digestion, reduced bloating, regular bowel movements',
    currentSymptoms: 'Bloating after meals, irregular bowel movements, acid reflux',
    status: 'in-review',
    createdAt: '2024-01-15',
    assignedDoctorId: '2'
  }
];

export function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState(mockRequests);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    healthGoals: '',
    currentSymptoms: ''
  });

  const [form, setForm] = useState({
    water: '',
    pressure: '',
    time: '',
    sugar: '',
  });

  const [entries, setEntries] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const calculateImprovements = ({ water, pressure, time, sugar }) => {
    let score = 0;
    if (Number(water) >= 2000) score += 25;
    if (Number(time) >= 1) score += 25;
    if (Number(pressure) >= 90 && Number(pressure) <= 120) score += 25;
    if (Number(sugar) >= 70 && Number(sugar) <= 130) score += 25;

    if (score === 100) return 'Good';
    if (score >= 50) return 'Improvement Needed';
    return 'Poor';
  };

  const handleSubmit = () => {
    if (!form.water && !form.pressure && !form.time && !form.sugar) return;

    const improvements = calculateImprovements(form);

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...form,
      improvements,
    };

    setEntries([newEntry, ...entries]);
    setForm({ water: '', pressure: '', time: '', sugar: '' });
  };

  const getImprovementStyles = (comment) => {
    if (comment === 'Good') return 'bg-green-100 text-green-800 font-semibold';
    if (comment === 'Improvement Needed') return 'bg-yellow-100 text-yellow-800 font-semibold';
    return 'bg-red-100 text-red-800 font-semibold';
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const downloadPDF = () => {
    if (entries.length === 0) return;

    const doc = new jsPDF();
    doc.text('Health Tracker Summary', 14, 10);

    const tableColumn = [
      'Date',
      'Water Intake (ml)',
      'Blood Pressure',
      'Exercise (hrs)',
      'Blood Sugar (mg/dL)',
      'Improvements',
    ];

    const tableRows = entries.map((e) => [
      e.date,
      e.water,
      e.pressure,
      e.time,
      e.sugar,
      e.improvements,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('HealthSummary.pdf');
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const request = {
      id: Date.now().toString(),
      patientId: '1',
      patientName: 'Priya Sharma',
      ...newRequest,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRequests([request, ...requests]);
    setNewRequest({ title: '', description: '', healthGoals: '', currentSymptoms: '' });
    setShowNewRequest(false);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Mukesh</h1>
        <p className="text-gray-600">Your journey to holistic wellness continues here</p>
      </div>

      {/* Health Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div>
            <p className="stat-label">Active Requests</p>
            <p className="stat-value">2</p>
          </div>
          <FileText className="w-8 h-8" style={{ opacity: 0.8 }} />
        </div>

        <div className="stat-card secondary">
          <div>
            <p className="stat-label text-gray-600">Health Score</p>
            <p className="stat-value text-gray-900">85%</p>
          </div>
          <Heart className="w-8 h-8 text-red-400" />
        </div>

        <div className="stat-card secondary">
          <div>
            <p className="stat-label text-gray-600">Energy Level</p>
            <p className="stat-value text-gray-900">Good</p>
          </div>
          <Activity className="w-8 h-8 text-blue-400" />
        </div>

        <div className="stat-card secondary">
          <div>
            <p className="stat-label text-gray-600">Goals Met</p>
            <p className="stat-value text-gray-900">3/4</p>
          </div>
          <Target className="w-8 h-8 text-purple-400" />
        </div>
      </div>

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
            Daily Tracker
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'requests' ? (
        <div className="grid lg-grid-cols-3 gap-8">
          {/* Diet Requests */}
          <div className="lg-col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Diet Consultation Requests</h2>
                <button
                  onClick={() => setShowNewRequest(true)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Request</span>
                </button>
              </div>

              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="card-hover border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-900">{request.title}</h3>
                      <div className={getStatusClass(request.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                      {request.assignedDoctorId && (
                        <span>Assigned to Dr. Rajesh Kumar</span>
                      )}
                    </div>
                    {request.response && (
                      <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <p className="text-sm text-emerald-800">
                          <strong>Doctor's Response:</strong> {request.response}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Today's Wellness Tip</h3>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Start your day with warm lemon water to kindle your digestive fire (Agni) and support natural detoxification. 🍋
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Your Constitution</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Vata</span>
                  <div className="progress-bar w-24">
                    <div className="progress-fill progress-vata" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pitta</span>
                  <div className="progress-bar w-24">
                    <div className="progress-fill progress-pitta" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Kapha</span>
                  <div className="progress-bar w-24">
                    <div className="progress-fill progress-kapha" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Primary: Vata-Pitta</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-lime-50 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-8 h-8 text-green-600" />
                <h1 className="text-4xl font-bold text-gray-800">Health Tracker</h1>
              </div>
              <p className="text-gray-600">Monitor and improve your daily health habits</p>
            </div>

            {/* Input Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="water" className="block text-sm font-semibold text-gray-700 mb-2">
                    Water Intake (ml)
                  </label>
                  <input
                    id="water"
                    type="number"
                    value={form.water}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter water intake"
                  />
                </div>

                <div>
                  <label htmlFor="pressure" className="block text-sm font-semibold text-gray-700 mb-2">
                    Blood Pressure
                  </label>
                  <input
                    id="pressure"
                    type="number"
                    value={form.pressure}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter blood pressure"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                    Meditation/Exercise (hrs)
                  </label>
                  <input
                    id="time"
                    type="number"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter exercise hours"
                  />
                </div>

                <div>
                  <label htmlFor="sugar" className="block text-sm font-semibold text-gray-700 mb-2">
                    Blood Sugar (mg/dL)
                  </label>
                  <input
                    id="sugar"
                    type="number"
                    value={form.sugar}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter blood sugar level"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors duration-300 transform hover:scale-105"
                >
                  Submit Entry
                </button>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Water Intake (ml)</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Blood Pressure</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Exercise (hrs)</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Blood Sugar (mg/dL)</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                          No health records yet! Add your first entry above.
                        </td>
                      </tr>
                    ) : (
                      entries.map((entry, index) => (
                        <tr key={entry.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 text-sm text-gray-800 border-b">{entry.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-800 border-b">{entry.water}</td>
                          <td className="px-6 py-4 text-sm text-gray-800 border-b">{entry.pressure}</td>
                          <td className="px-6 py-4 text-sm text-gray-800 border-b">{entry.time}</td>
                          <td className="px-6 py-4 text-sm text-gray-800 border-b">{entry.sugar}</td>
                          <td className="px-6 py-4 border-b">
                            <span className={`px-3 py-1 rounded-full text-sm ${getImprovementStyles(entry.improvements)}`}>
                              {entry.improvements}
                            </span>
                          </td>
                          <td className="px-6 py-4 border-b">
                            <button
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                              onClick={() => handleDelete(entry.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Download PDF Button */}
            {entries.length > 0 && (
              <div className="text-center">
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download PDF Report
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* New Request Modal */}
      {showNewRequest && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">New Diet Consultation Request</h2>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="form-group">
                  <label className="form-label">
                    Consultation Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                    placeholder="e.g., Weight Management Plan"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Description
                  </label>
                  <textarea
                    required
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                    rows={3}
                    placeholder="Describe your consultation needs..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Health Goals
                  </label>
                  <textarea
                    required
                    value={newRequest.healthGoals}
                    onChange={(e) => setNewRequest({ ...newRequest, healthGoals: e.target.value })}
                    rows={2}
                    placeholder="What are your health and wellness goals?"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Current Symptoms
                  </label>
                  <textarea
                    required
                    value={newRequest.currentSymptoms}
                    onChange={(e) => setNewRequest({ ...newRequest, currentSymptoms: e.target.value })}
                    rows={2}
                    placeholder="Any current symptoms or concerns?"
                  />
                </div>

                <div className="flex justify-end space-x-3" style={{ paddingTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowNewRequest(false)}
                    className="px-4 py-2 text-gray-600 hover-text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-6 py-2"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ChatBot />
    </div>
  );
}
export default PatientDashboard;