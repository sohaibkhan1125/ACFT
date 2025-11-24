import React from 'react';
import { getMosCategories } from '../utils/scoringLogic';

const Standards = () => {
  const mosCategories = getMosCategories();

  return (
    <section id="standards" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ACFT Standards</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the Army Combat Fitness Test standards and MOS physical demand categories.
          </p>
        </div>

        {/* MOS Categories */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">MOS Physical Demand Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mosCategories.map((category) => (
              <div key={category.key} className="bg-gray-50 rounded-lg p-6 border-l-4 border-yellow-400">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{category.key} Category</h4>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Minimum Total Score:</span>
                    <span className="font-bold text-yellow-600">{category.minimumTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Per Event Minimum:</span>
                    <span className="font-bold text-yellow-600">{category.minimumPerEvent} pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Standards */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Event Standards</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Male Standards */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Male Standards (17-21)</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Maximum Deadlift (MDL)</h5>
                  <p className="text-sm text-gray-600 mb-2">3-rep maximum deadlift</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 140 lbs (60 pts)</div>
                    <div>Maximum: 211+ lbs (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Standing Power Throw (SPT)</h5>
                  <p className="text-sm text-gray-600 mb-2">Overhead backward throw of 10-lb medicine ball</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 6.0m (60 pts)</div>
                    <div>Maximum: 9.6m+ (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Hand Release Push-ups (HRP)</h5>
                  <p className="text-sm text-gray-600 mb-2">Maximum repetitions in 2 minutes</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 10 reps (60 pts)</div>
                    <div>Maximum: 46+ reps (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Sprint-Drag-Carry (SDC)</h5>
                  <p className="text-sm text-gray-600 mb-2">250m course with drag and carry</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 3:00 (60 pts)</div>
                    <div>Maximum: 1:30 (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Plank (PLK)</h5>
                  <p className="text-sm text-gray-600 mb-2">Maximum time in plank position</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 1:00 (60 pts)</div>
                    <div>Maximum: 4:36+ (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">2-Mile Run (2MR)</h5>
                  <p className="text-sm text-gray-600 mb-2">2-mile run for time</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 21:00 (60 pts)</div>
                    <div>Maximum: 13:39 (100 pts)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Female Standards */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Female Standards (17-21)</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Maximum Deadlift (MDL)</h5>
                  <p className="text-sm text-gray-600 mb-2">3-rep maximum deadlift</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 84 lbs (60 pts)</div>
                    <div>Maximum: 156+ lbs (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Standing Power Throw (SPT)</h5>
                  <p className="text-sm text-gray-600 mb-2">Overhead backward throw of 10-lb medicine ball</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 4.0m (60 pts)</div>
                    <div>Maximum: 7.6m+ (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Hand Release Push-ups (HRP)</h5>
                  <p className="text-sm text-gray-600 mb-2">Maximum repetitions in 2 minutes</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 10 reps (60 pts)</div>
                    <div>Maximum: 46+ reps (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Sprint-Drag-Carry (SDC)</h5>
                  <p className="text-sm text-gray-600 mb-2">250m course with drag and carry</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 3:00 (60 pts)</div>
                    <div>Maximum: 1:30 (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Plank (PLK)</h5>
                  <p className="text-sm text-gray-600 mb-2">Maximum time in plank position</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 1:00 (60 pts)</div>
                    <div>Maximum: 4:36+ (100 pts)</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">2-Mile Run (2MR)</h5>
                  <p className="text-sm text-gray-600 mb-2">2-mile run for time</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Minimum: 24:00 (60 pts)</div>
                    <div>Maximum: 16:54 (100 pts)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Scoring Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Point System</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Each event is worth 0-100 points</li>
                <li>• Total possible score: 600 points</li>
                <li>• Minimum 60 points per event required</li>
                <li>• Age and sex-specific standards apply</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Pass/Fail Criteria</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Meet minimum total score for MOS category</li>
                <li>• Score 60+ points in ALL events</li>
                <li>• Complete all events within time limits</li>
                <li>• Follow proper form and technique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Standards;
