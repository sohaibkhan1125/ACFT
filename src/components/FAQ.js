import React, { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqItems = [
    {
      question: "What is the ACFT?",
      answer: "The Army Combat Fitness Test (ACFT) is the Army's new physical fitness test that measures functional fitness and combat readiness. It consists of six events designed to assess strength, power, endurance, and agility."
    },
    {
      question: "How often do I need to take the ACFT?",
      answer: "Active duty soldiers must take the ACFT twice per year, with at least 4 months between tests. Reserve and National Guard soldiers must take it once per year."
    },
    {
      question: "What are the minimum requirements to pass?",
      answer: "To pass the ACFT, you must score at least 60 points in each event and meet the minimum total score for your MOS physical demand category: Heavy (440+), Significant (400+), or Moderate (360+)."
    },
    {
      question: "Can I retake the ACFT if I fail?",
      answer: "Yes, you can retake the ACFT if you fail. However, you must wait at least 24 hours between attempts and complete all events in the same session."
    },
    {
      question: "What happens if I fail the ACFT?",
      answer: "If you fail the ACFT, you may be subject to counseling, additional physical training, and potential administrative action. Multiple failures can result in separation from the Army."
    },
    {
      question: "Are there age and sex-specific standards?",
      answer: "Yes, the ACFT uses age and sex-specific scoring tables. Standards are adjusted based on your age group and biological sex to ensure fair evaluation."
    },
    {
      question: "What equipment is needed for the ACFT?",
      answer: "The ACFT requires a hex bar, weight plates, 10-pound medicine ball, 90-pound sled, 40-pound kettlebell, stopwatch, and a measured course for the 2-mile run."
    },
    {
      question: "How long does the ACFT take to complete?",
      answer: "The ACFT typically takes 50-70 minutes to complete, including warm-up, event execution, and rest periods between events."
    },
    {
      question: "Can I use this calculator for official scoring?",
      answer: "This calculator is for training and planning purposes only. Official ACFT scoring must be conducted by certified test administrators using approved equipment and procedures."
    },
    {
      question: "What if I have a medical condition or injury?",
      answer: "If you have a medical condition or injury that prevents you from taking the ACFT, you may be eligible for a medical exemption or alternate events. Consult with your medical provider and chain of command."
    },
    {
      question: "How can I improve my ACFT score?",
      answer: "Focus on functional fitness training including deadlifts, overhead throws, push-ups, running, and core exercises. Practice the specific events and work on your weakest areas."
    },
    {
      question: "What is the difference between MOS categories?",
      answer: "MOS categories are based on the physical demands of your job: Heavy (combat arms), Significant (moderate physical demands), and Moderate (lower physical demands). Each category has different minimum score requirements."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Common questions about the Army Combat Fitness Test
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                aria-expanded={openItems.has(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openItems.has(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Official Army Resources</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Army Physical Fitness School</li>
                <li>• ACFT Training Guide</li>
                <li>• MOS Physical Demand Categories</li>
                <li>• Medical Exemption Procedures</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Training Resources</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Functional Fitness Training</li>
                <li>• Event-Specific Workouts</li>
                <li>• Nutrition and Recovery</li>
                <li>• Mental Preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
