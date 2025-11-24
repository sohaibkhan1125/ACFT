import React, { useState, useEffect, useCallback } from 'react';
import { calculateTotalScore, determinePassFail, validateInputs, getAgeGroups, timeStringToSeconds, secondsToTimeString } from '../utils/scoringLogic';
import { calculateTotalScoreOfficial, determinePassFailOfficial, getDebugInfo } from '../utils/officialScoringLogic';
import { getDefaultValues, getSliderRanges } from '../utils/defaultValues';
import ModernSlider from './ModernSlider';
import EventCard from './EventCard';

const Calculator = () => {
  const [formData, setFormData] = useState({
    sex: '',
    ageGroup: '',
    mdl: 80,
    spt: 4.0,
    hrp: 4,
    sdc: 180,
    plk: 0,
    twoMR: 1440
  });

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [livePreview, setLivePreview] = useState(true);

  const ageGroups = getAgeGroups();

  // Update form data when sex or age group changes
  useEffect(() => {
    if (formData.sex && formData.ageGroup) {
      const defaultValues = getDefaultValues(formData.sex, formData.ageGroup);
      setFormData(prev => ({
        ...prev,
        ...defaultValues
      }));
    }
  }, [formData.sex, formData.ageGroup]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('acft-calculator-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('acft-calculator-data', JSON.stringify(formData));
  }, [formData]);

  // Real-time scoring calculation using official Army tables
  const calculateScore = useCallback(() => {
    if (formData.sex && formData.ageGroup) {
      const validation = validateInputs(formData);
      if (validation.isValid) {
        // Convert time values from seconds to minutes for scoring
        const calculationData = {
          ...formData,
          sdc: formData.sdc / 60, // Convert seconds to minutes
          plk: formData.plk / 60, // Convert seconds to minutes
          twoMR: formData.twoMR / 60 // Convert seconds to minutes
        };
        
        const scoreData = calculateTotalScoreOfficial(calculationData);
        const passFailData = determinePassFailOfficial(scoreData.totalScore, scoreData.eventPoints, 'Heavy');
        return { ...scoreData, ...passFailData };
      }
    }
    return null;
  }, [formData]);

  // Live preview calculation
  useEffect(() => {
    if (livePreview) {
      const scoreData = calculateScore();
      if (scoreData) {
        setResults(scoreData);
      }
    }
  }, [formData, livePreview, calculateScore]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Real-time scoring update
    if (livePreview) {
      const updatedData = { ...formData, [field]: value };
      const validation = validateInputs(updatedData);
      if (validation.isValid) {
        const calculationData = {
          ...updatedData,
          sdc: updatedData.sdc / 60,
          plk: updatedData.plk / 60,
          twoMR: updatedData.twoMR / 60
        };
        
        const scoreData = calculateTotalScore(calculationData);
        const passFailData = determinePassFail(scoreData.totalScore, scoreData.eventPoints, 'Heavy');
        setResults({ ...scoreData, ...passFailData });
      }
    }
  };

  const handleCalculate = () => {
    console.log('Calculate button clicked');
    console.log('Form data:', formData);
    
    const validation = validateInputs(formData);
    console.log('Validation result:', validation);
    
    if (!validation.isValid) {
      console.log('Validation failed:', validation.errors);
      setErrors(validation.errors);
      return;
    }

    // Convert time values from seconds to minutes for scoring
    const calculationData = {
      ...formData,
      sdc: formData.sdc / 60, // Convert seconds to minutes
      plk: formData.plk / 60, // Convert seconds to minutes
      twoMR: formData.twoMR / 60 // Convert seconds to minutes
    };

    console.log('Calculation data:', calculationData);

    const scoreData = calculateTotalScoreOfficial(calculationData);
    console.log('Score data:', scoreData);
    
    const passFailData = determinePassFailOfficial(scoreData.totalScore, scoreData.eventPoints, 'Heavy');
    console.log('Pass/fail data:', passFailData);
    
    const finalResults = { ...scoreData, ...passFailData };
    console.log('Final results:', finalResults);
    
    setResults(finalResults);
    setErrors({});
  };

  const handleShare = () => {
    if (!results) return;
    
    const shareText = `ACFT Score: ${results.totalScore}/600 - ${results.passed ? 'PASSED' : 'FAILED'} (Heavy Category)`;
    
    if (navigator.share) {
      navigator.share({
        title: 'ACFT Calculator Results',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ACFT Calculator</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your event results to calculate your ACFT score and determine if you meet the standards for your MOS category.
          </p>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Step 1:</strong> Select your sex and age group below, then adjust the sliders to match your performance, and click "Calculate My Score".
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sex *
              </label>
              <select
                value={formData.sex}
                onChange={(e) => handleInputChange('sex', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.sex ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Group *
              </label>
              <select
                value={formData.ageGroup}
                onChange={(e) => handleInputChange('ageGroup', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.ageGroup ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Age Group</option>
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
              {errors.ageGroup && <p className="text-red-500 text-sm mt-1">{errors.ageGroup}</p>}
            </div>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* MDL */}
          <EventCard
            icon={<span className="text-lg">🏋️</span>}
            title="MDL"
            subtitle="3-Repetition Maximum Deadlift"
            value={formData.mdl}
            unit="lbs."
            points={results ? results.eventPoints.MDL : 0}
          />

          {/* SPT */}
          <EventCard
            icon={<span className="text-lg">⚾</span>}
            title="SPT"
            subtitle="Standing Power Throw"
            value={formData.spt}
            unit="meters"
            points={results ? results.eventPoints.SPT : 0}
          />

          {/* HRP */}
          <EventCard
            icon={<span className="text-lg">💪</span>}
            title="HRP"
            subtitle="Hand Release Push-Up Arm Extension"
            value={formData.hrp}
            unit="reps."
            points={results ? results.eventPoints.HRP : 0}
          />

          {/* SDC */}
          <EventCard
            icon={<span className="text-lg">🏃</span>}
            title="SDC"
            subtitle="Sprint-Drag-Carry"
            value={formData.sdc}
            unit=""
            points={results ? results.eventPoints.SDC : 0}
            isTime={true}
          />

          {/* PLK */}
          <EventCard
            icon={<span className="text-lg">🤸</span>}
            title="PLK"
            subtitle="Plank"
            value={formData.plk}
            unit=""
            points={results ? results.eventPoints.PLK : 0}
            isTime={true}
          />

          {/* 2MR */}
          <EventCard
            icon={<span className="text-lg">🏃‍♂️</span>}
            title="2MR"
            subtitle="Two-Mile Run"
            value={formData.twoMR}
            unit=""
            points={results ? results.eventPoints['2MR'] : 0}
            isTime={true}
          />
        </div>

        {/* Sliders Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Adjust Your Performance</h3>
          
          <div className="space-y-6">
            {/* MDL */}
            <ModernSlider
              min={getSliderRanges(formData.sex, formData.ageGroup).mdl.min}
              max={getSliderRanges(formData.sex, formData.ageGroup).mdl.max}
              value={formData.mdl}
              onChange={(value) => handleSliderChange('mdl', value)}
              step={5}
              label="Maximum Deadlift"
              unit=" lbs"
            />

            {/* SPT */}
            <ModernSlider
              min={getSliderRanges(formData.sex, formData.ageGroup).spt.min}
              max={getSliderRanges(formData.sex, formData.ageGroup).spt.max}
              value={formData.spt}
              onChange={(value) => handleSliderChange('spt', value)}
              step={0.1}
              label="Standing Power Throw"
              unit=" meters"
            />

            {/* HRP */}
            <ModernSlider
              min={getSliderRanges(formData.sex, formData.ageGroup).hrp.min}
              max={getSliderRanges(formData.sex, formData.ageGroup).hrp.max}
              value={formData.hrp}
              onChange={(value) => handleSliderChange('hrp', value)}
              step={1}
              label="Hand Release Push-ups"
              unit=" reps"
            />

            {/* SDC */}
            <ModernSlider
              min={getSliderRanges(formData.sex, formData.ageGroup).sdc.min}
              max={getSliderRanges(formData.sex, formData.ageGroup).sdc.max}
              value={formData.sdc}
              onChange={(value) => handleSliderChange('sdc', value)}
              step={1}
              label="Sprint-Drag-Carry"
              isTime={true}
            />

            {/* PLK */}
            <ModernSlider
              min={getSliderRanges(formData.sex, formData.ageGroup).plk.min}
              max={getSliderRanges(formData.sex, formData.ageGroup).plk.max}
              value={formData.plk}
              onChange={(value) => handleSliderChange('plk', value)}
              step={1}
              label="Plank"
              isTime={true}
            />

            {/* 2MR */}
            <ModernSlider
              min={getSliderRanges(formData.sex, formData.ageGroup).twoMR.min}
              max={getSliderRanges(formData.sex, formData.ageGroup).twoMR.max}
              value={formData.twoMR}
              onChange={(value) => handleSliderChange('twoMR', value)}
              step={1}
              label="2-Mile Run"
              isTime={true}
            />
          </div>

          {/* Live Preview Toggle */}
          <div className="flex items-center justify-center mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <input
              type="checkbox"
              id="livePreview"
              checked={livePreview}
              onChange={(e) => setLivePreview(e.target.checked)}
              className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="livePreview" className="ml-3 text-sm font-medium text-green-800">
              🔄 Real-time scoring enabled - Points update as you move sliders
            </label>
          </div>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={handleCalculate}
            className="w-full bg-yellow-400 text-gray-900 py-4 px-6 rounded-lg font-bold text-xl hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl mt-6 border-2 border-yellow-500"
          >
            🧮 Calculate My Score
          </button>
          
          {/* Error Display */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
              <h4 className="font-bold text-sm mb-2 text-red-800">Please fix the following errors:</h4>
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-sm text-red-700">• {error}</p>
              ))}
            </div>
          )}
          
          {/* Debug Info */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h4 className="font-bold text-sm mb-2">Debug Info:</h4>
            <p className="text-xs">Sex: {formData.sex || 'Not selected'}</p>
            <p className="text-xs">Age Group: {formData.ageGroup || 'Not selected'}</p>
            <p className="text-xs">Results: {results ? 'Available' : 'Not calculated'}</p>
            {results && (
              <p className="text-xs">Total Score: {results.totalScore}</p>
            )}
          </div>

          {/* Official Scoring Debug Panel */}
          {results && results.debugInfo && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-sm mb-2 text-blue-800">Official Army AFT Scoring Debug:</h4>
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold">Sex:</span>
                  <span>{formData.sex}</span>
                  <span className="font-semibold">Age Group:</span>
                  <span>{formData.ageGroup}</span>
                </div>
                
                {Object.entries(results.debugInfo).map(([event, debug]) => (
                  <div key={event} className="border border-blue-200 rounded p-2 bg-white">
                    <div className="font-semibold text-blue-700">{event}:</div>
                    <div className="ml-2">
                      <div>Input: {debug.performance} {event === 'MDL' ? 'lbs' : event === 'SPT' ? 'meters' : event === 'HRP' ? 'reps' : 'minutes'}</div>
                      <div>Points: {debug.points}</div>
                      <div>Table Row: {debug.tableRow ? `${debug.tableRow.min}-${debug.tableRow.max} → ${debug.tableRow.points} pts` : 'N/A'}</div>
                      {debug.note && <div className="text-orange-600">Note: {debug.note}</div>}
                    </div>
                  </div>
                ))}
                
                <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
                  <div className="font-semibold text-green-800">Total Score: {results.totalScore}/600</div>
                  <div className="text-green-700">
                    Status: {results.passed ? 'PASSED' : 'FAILED'} 
                    {!results.passed && results.eventFailures.length > 0 && 
                      ` (Failed events: ${results.eventFailures.join(', ')})`
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Display */}
        {results && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Results</h3>
            
            <div className="space-y-6">
              {/* Total Score */}
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-gray-900">
                  Total Score: {results.totalScore}
                </div>
                <div className="text-lg font-semibold mb-2">
                  Results:
                </div>
                <div className={`text-lg font-semibold ${
                  results.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {results.passed ? 'Meets Army Minimum Standard' : 'Does Not Meet Army Minimum Standard'}
                </div>
              </div>

              {/* Event Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Event Scores:</h4>
                {Object.entries(results.eventPoints).map(([event, points]) => (
                  <div key={event} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium">{event}</span>
                    <span className={`font-bold ${
                      points >= 60 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {points} pts
                    </span>
                  </div>
                ))}
              </div>

              {/* Pass/Fail Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                <div className="space-y-1 text-sm">
                  <div className={`flex justify-between ${
                    results.totalPassed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>Total Score: {results.minimumRequired}+</span>
                    <span>{results.totalScore}/{results.minimumRequired}</span>
                  </div>
                  <div className={`flex justify-between ${
                    results.allEventsPassed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>All Events: 60+ points</span>
                    <span>{results.allEventsPassed ? '✓' : '✗'}</span>
                  </div>
                  {results.eventFailures.length > 0 && (
                    <div className="text-red-600">
                      Failed events: {results.eventFailures.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleShare}
                  className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Share Results
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Print Results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Calculator;
