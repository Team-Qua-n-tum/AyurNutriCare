import React, { useState } from 'react';
import { X, Download, Plus, Minus } from 'lucide-react';
import jsPDF from 'jspdf';

export function DietChartModal({ patient, onClose }) {
  const [dietChart, setDietChart] = useState({
    constitution: patient.constitution,
    healthGoals: '',
    restrictions: patient.dietaryRestrictions || '',
    meals: {
      breakfast: {
        foods: [''],
        timing: '7:00 - 8:00 AM',
        preparation: '',
        benefits: ''
      },
      lunch: {
        foods: [''],
        timing: '12:00 - 1:00 PM',
        preparation: '',
        benefits: ''
      },
      dinner: {
        foods: [''],
        timing: '7:00 - 8:00 PM',
        preparation: '',
        benefits: ''
      },
      snacks: {
        foods: [''],
        timing: '4:00 - 5:00 PM',
        preparation: '',
        benefits: ''
      }
    },
    guidelines: [''],
    herbs: [''],
    lifestyle: [''],
    duration: '4 weeks',
    followUp: '2 weeks'
  });

  const handleMealChange = (mealType, field, value) => {
    setDietChart(prev => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealType]: {
          ...prev.meals[mealType],
          [field]: value
        }
      }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setDietChart(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleMealArrayChange = (mealType, index, value) => {
    setDietChart(prev => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealType]: {
          ...prev.meals[mealType],
          foods: prev.meals[mealType].foods.map((item, i) => i === index ? value : item)
        }
      }
    }));
  };

  const addArrayItem = (field) => {
    setDietChart(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setDietChart(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addMealItem = (mealType) => {
    setDietChart(prev => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealType]: {
          ...prev.meals[mealType],
          foods: [...prev.meals[mealType].foods, '']
        }
      }
    }));
  };

  const removeMealItem = (mealType, index) => {
    setDietChart(prev => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealType]: {
          ...prev.meals[mealType],
          foods: prev.meals[mealType].foods.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let yPosition = 20;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(5, 150, 105); // Emerald color
    doc.text('AyurNutriCare', margin, yPosition);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Personalized Ayurvedic Diet Chart', margin, yPosition + 8);
    
    yPosition += 25;

    // Patient Information
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Patient Information', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.text(`Name: ${patient.name}`, margin, yPosition);
    doc.text(`Age: ${patient.age}`, margin + 100, yPosition);
    yPosition += 8;
    doc.text(`Constitution: ${dietChart.constitution}`, margin, yPosition);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, margin + 100, yPosition);
    yPosition += 15;

    // Health Goals
    if (dietChart.healthGoals) {
      doc.setFontSize(14);
      doc.text('Health Goals:', margin, yPosition);
      yPosition += 8;
      doc.setFontSize(11);
      const goalLines = doc.splitTextToSize(dietChart.healthGoals, pageWidth - 2 * margin);
      doc.text(goalLines, margin, yPosition);
      yPosition += goalLines.length * 6 + 10;
    }

    // Meal Plans
    doc.setFontSize(16);
    doc.text('Daily Meal Plan', margin, yPosition);
    yPosition += 15;

    Object.entries(dietChart.meals).forEach(([mealType, meal]) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(5, 150, 105);
      doc.text(mealType.charAt(0).toUpperCase() + mealType.slice(1), margin, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += 8;

      doc.setFontSize(11);
      doc.text(`Timing: ${meal.timing}`, margin + 5, yPosition);
      yPosition += 6;

      if (meal.foods.filter(f => f.trim()).length > 0) {
        doc.text('Foods:', margin + 5, yPosition);
        yPosition += 6;
        meal.foods.filter(f => f.trim()).forEach(food => {
          doc.text(`• ${food}`, margin + 10, yPosition);
          yPosition += 6;
        });
      }

      if (meal.preparation) {
        doc.text('Preparation:', margin + 5, yPosition);
        yPosition += 6;
        const prepLines = doc.splitTextToSize(meal.preparation, pageWidth - 2 * margin - 10);
        doc.text(prepLines, margin + 10, yPosition);
        yPosition += prepLines.length * 6;
      }

      if (meal.benefits) {
        doc.text('Benefits:', margin + 5, yPosition);
        yPosition += 6;
        const benefitLines = doc.splitTextToSize(meal.benefits, pageWidth - 2 * margin - 10);
        doc.text(benefitLines, margin + 10, yPosition);
        yPosition += benefitLines.length * 6;
      }

      yPosition += 10;
    });

    // Guidelines
    if (dietChart.guidelines.filter(g => g.trim()).length > 0) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setTextColor(5, 150, 105);
      doc.text('Dietary Guidelines', margin, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += 10;

      doc.setFontSize(11);
      dietChart.guidelines.filter(g => g.trim()).forEach(guideline => {
        doc.text(`• ${guideline}`, margin + 5, yPosition);
        yPosition += 8;
      });
      yPosition += 10;
    }

    // Herbs
    if (dietChart.herbs.filter(h => h.trim()).length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(5, 150, 105);
      doc.text('Recommended Herbs', margin, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += 10;

      doc.setFontSize(11);
      dietChart.herbs.filter(h => h.trim()).forEach(herb => {
        doc.text(`• ${herb}`, margin + 5, yPosition);
        yPosition += 8;
      });
      yPosition += 10;
    }

    // Lifestyle
    if (dietChart.lifestyle.filter(l => l.trim()).length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(5, 150, 105);
      doc.text('Lifestyle Recommendations', margin, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += 10;

      doc.setFontSize(11);
      dietChart.lifestyle.filter(l => l.trim()).forEach(lifestyle => {
        doc.text(`• ${lifestyle}`, margin + 5, yPosition);
        yPosition += 8;
      });
      yPosition += 10;
    }

    // Footer
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(12);
    doc.text(`Duration: ${dietChart.duration}`, margin, yPosition);
    doc.text(`Follow-up: ${dietChart.followUp}`, margin, yPosition + 10);

    yPosition += 30;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Prepared by: Dr. Rajesh Kumar', margin, yPosition);
    doc.text('AyurNutriCare - Holistic Wellness Platform', margin, yPosition + 8);

    // Save the PDF
    doc.save(`${patient.name.replace(/\s+/g, '_')}_Diet_Chart.pdf`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-4xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create Diet Chart</h2>
              <p className="text-gray-600">Patient: {patient.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={generatePDF}
                className="btn btn-success flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Generate PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover-text-gray-600 hover-bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md-grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Constitution</label>
                  <input
                    type="text"
                    value={dietChart.constitution}
                    onChange={(e) => setDietChart(prev => ({ ...prev, constitution: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="form-label">Health Goals</label>
                  <textarea
                    rows={3}
                    value={dietChart.healthGoals}
                    onChange={(e) => setDietChart(prev => ({ ...prev, healthGoals: e.target.value }))}
                    placeholder="Patient's health and wellness goals"
                  />
                </div>
                <div>
                  <label className="form-label">Dietary Restrictions</label>
                  <textarea
                    rows={2}
                    value={dietChart.restrictions}
                    onChange={(e) => setDietChart(prev => ({ ...prev, restrictions: e.target.value }))}
                    placeholder="Any dietary restrictions or allergies"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Duration</label>
                    <select
                      value={dietChart.duration}
                      onChange={(e) => setDietChart(prev => ({ ...prev, duration: e.target.value }))}
                    >
                      <option value="2 weeks">2 weeks</option>
                      <option value="4 weeks">4 weeks</option>
                      <option value="6 weeks">6 weeks</option>
                      <option value="8 weeks">8 weeks</option>
                      <option value="12 weeks">12 weeks</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Follow-up</label>
                    <select
                      value={dietChart.followUp}
                      onChange={(e) => setDietChart(prev => ({ ...prev, followUp: e.target.value }))}
                    >
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="4 weeks">4 weeks</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Plans */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Meal Plans</h3>
              <div className="space-y-6">
                {Object.entries(dietChart.meals).map(([mealType, meal]) => (
                  <div key={mealType} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3 capitalize">{mealType}</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="form-label">Timing</label>
                        <input
                          type="text"
                          value={meal.timing}
                          onChange={(e) => handleMealChange(mealType, 'timing', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="form-label">Foods</label>
                        {meal.foods.map((food, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={food}
                              onChange={(e) => handleMealArrayChange(mealType, index, e.target.value)}
                              placeholder="Enter food item"
                            />
                            {meal.foods.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeMealItem(mealType, index)}
                                className="p-1 text-red-500 hover:text-red-700"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addMealItem(mealType)}
                          className="btn btn-secondary text-xs flex items-center space-x-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Food</span>
                        </button>
                      </div>
                      <div>
                        <label className="form-label">Preparation</label>
                        <textarea
                          rows={2}
                          value={meal.preparation}
                          onChange={(e) => handleMealChange(mealType, 'preparation', e.target.value)}
                          placeholder="Preparation instructions"
                        />
                      </div>
                      <div>
                        <label className="form-label">Benefits</label>
                        <textarea
                          rows={2}
                          value={meal.benefits}
                          onChange={(e) => handleMealChange(mealType, 'benefits', e.target.value)}
                          placeholder="Health benefits"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Dietary Guidelines</h3>
              <div className="space-y-2">
                {dietChart.guidelines.map((guideline, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={guideline}
                      onChange={(e) => handleArrayChange('guidelines', index, e.target.value)}
                      placeholder="Enter dietary guideline"
                    />
                    {dietChart.guidelines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('guidelines', index)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('guidelines')}
                  className="btn btn-secondary text-xs flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Guideline</span>
                </button>
              </div>
            </div>

            {/* Herbs and Lifestyle */}
            <div className="space-y-6">
              {/* Herbs */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Recommended Herbs</h3>
                <div className="space-y-2">
                  {dietChart.herbs.map((herb, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={herb}
                        onChange={(e) => handleArrayChange('herbs', index, e.target.value)}
                        placeholder="Enter herb recommendation"
                      />
                      {dietChart.herbs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('herbs', index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('herbs')}
                    className="btn btn-secondary text-xs flex items-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Herb</span>
                  </button>
                </div>
              </div>

              {/* Lifestyle */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Lifestyle Recommendations</h3>
                <div className="space-y-2">
                  {dietChart.lifestyle.map((lifestyle, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={lifestyle}
                        onChange={(e) => handleArrayChange('lifestyle', index, e.target.value)}
                        placeholder="Enter lifestyle recommendation"
                      />
                      {dietChart.lifestyle.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('lifestyle', index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('lifestyle')}
                    className="btn btn-secondary text-xs flex items-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Recommendation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}