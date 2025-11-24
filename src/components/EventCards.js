import React from 'react';

const EventCards = () => {
  const events = [
    {
      id: 'MDL',
      name: 'Maximum Deadlift',
      description: '3-rep maximum deadlift using a hex bar',
      equipment: 'Hex bar, weight plates, platform',
      measurement: 'Weight in pounds (lbs)',
      tips: 'Focus on proper form, use your legs and hips, keep your back straight',
      icon: '🏋️'
    },
    {
      id: 'SPT',
      name: 'Standing Power Throw',
      description: 'Overhead backward throw of a 10-pound medicine ball',
      equipment: '10-pound medicine ball, measuring tape',
      measurement: 'Distance in meters (m)',
      tips: 'Use your entire body, follow through with your arms, maintain balance',
      icon: '⚾'
    },
    {
      id: 'HRP',
      name: 'Hand Release Push-ups',
      description: 'Maximum repetitions in 2 minutes with hand release',
      equipment: 'Stopwatch, mat',
      measurement: 'Number of repetitions',
      tips: 'Maintain proper form, full range of motion, pace yourself',
      icon: '💪'
    },
    {
      id: 'SDC',
      name: 'Sprint-Drag-Carry',
      description: '250-meter course with drag and carry components',
      equipment: '90-pound sled, 40-pound kettlebell, stopwatch',
      measurement: 'Time in minutes:seconds (mm:ss)',
      tips: 'Pace yourself, use proper lifting technique, maintain momentum',
      icon: '🏃'
    },
    {
      id: 'PLK',
      name: 'Plank',
      description: 'Maximum time in plank position',
      equipment: 'Stopwatch, mat',
      measurement: 'Time in minutes:seconds (mm:ss)',
      tips: 'Keep your body straight, engage your core, breathe normally',
      icon: '🤸'
    },
    {
      id: '2MR',
      name: '2-Mile Run',
      description: '2-mile run for time on a track or measured course',
      equipment: 'Stopwatch, measured course',
      measurement: 'Time in minutes:seconds (mm:ss)',
      tips: 'Pace yourself, maintain steady rhythm, finish strong',
      icon: '🏃‍♂️'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ACFT Events</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about each event in the Army Combat Fitness Test, including equipment, measurement, and training tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{event.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
                <div className="text-sm text-yellow-600 font-semibold">{event.id}</div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Description</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Equipment</h4>
                  <p className="text-sm text-gray-600">{event.equipment}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Measurement</h4>
                  <p className="text-sm text-gray-600">{event.measurement}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Training Tips</h4>
                  <p className="text-sm text-gray-600">{event.tips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Sequence */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Event Sequence</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">1</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Maximum Deadlift</h4>
              <p className="text-sm text-gray-600">3-rep maximum</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">2</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Standing Power Throw</h4>
              <p className="text-sm text-gray-600">Overhead backward throw</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">3</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Hand Release Push-ups</h4>
              <p className="text-sm text-gray-600">2-minute maximum</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Sprint-Drag-Carry</h4>
              <p className="text-sm text-gray-600">250-meter course</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">5</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Plank</h4>
              <p className="text-sm text-gray-600">Maximum time</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">6</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">2-Mile Run</h4>
              <p className="text-sm text-gray-600">Timed run</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCards;
