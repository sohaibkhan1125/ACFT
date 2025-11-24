import React, { useState, useEffect } from 'react';
import { db, doc, onSnapshot } from '../firebase/firebase';

const HomePageContact = () => {
  const [content, setContent] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase document reference
    const contactDocRef = doc(db, 'homepage', 'contactContent');

    // Set up real-time listener for changes
    const unsubscribe = onSnapshot(contactDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setContent(data.content || '');
        setIsVisible(data.isVisible !== false);
      } else {
        setIsVisible(false);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading contact content:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Don't render anything if loading, not visible, or no content
  if (loading || !isVisible || !content) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="homepage-contact-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default HomePageContact;
