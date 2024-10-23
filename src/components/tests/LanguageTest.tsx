import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OBJECTS = [
  { name: 'clock', imageUrl: 'https://source.unsplash.com/400x300/?clock' },
  { name: 'key', imageUrl: 'https://source.unsplash.com/400x300/?key' },
  { name: 'umbrella', imageUrl: 'https://source.unsplash.com/400x300/?umbrella' },
  { name: 'flower', imageUrl: 'https://source.unsplash.com/400x300/?flower' },
  { name: 'bicycle', imageUrl: 'https://source.unsplash.com/400x300/?bicycle' },
  { name: 'apple', imageUrl: 'https://www.jiomart.com/images/product/original/590004487/apple-indian-6-pcs-pack-approx-750-g-950-g-product-images-o590004487-p590004487-0-202203170227.jpg?im=Resize=(1000,1000)' },
  { name: 'football', imageUrl: 'https://cdn.britannica.com/68/195168-050-BBAE019A/football.jpg' },
];

const SENTENCES = [
  'The sky is ___',
  'A dog likes to ___',
  'In winter it gets ___'
];

export const LanguageTest = () => {
  const [phase, setPhase] = useState<'naming' | 'completion' | 'fluency'>('naming');
  const [currentItem, setCurrentItem] = useState(0);
  const [userInput, setUser Input] = useState('');
  const [score, setScore] = useState({ naming: 0, completion: 0, fluency: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phase === 'naming') {
      if (userInput.toLowerCase() === OBJECTS[currentItem].name) {
        setScore(prev => ({ ...prev, naming: prev.naming + 1 }));
      }
      if (currentItem < OBJECTS.length - 1) {
        setCurrentItem(prev => prev + 1);
      } else {
        setPhase('completion');
        setCurrentItem(0);
      }
    } else if (phase === 'completion') {
      setScore(prev => ({ ...prev, completion: prev.completion + 1 }));
      if (currentItem < SENTENCES.length - 1) {
        setCurrentItem(prev => prev + 1);
      } else {
        setPhase('fluency');
      }
    }

    setUser Input('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {phase === 'naming' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Object Naming</h3>
          <div className="text-center">
            <img
              src={OBJECTS[currentItem].imageUrl}
              alt={`Name this object`}
              className="mx-auto rounded-lg mb-4"
              onError={(e) => { e.currentTarget.src = 'path/to/fallback-image.jpg'; }} // Add a fallback image if needed
            />
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUser Input(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Name this object"
              />
              <button type="submit" className="btn-primary">Submit</button>
            </form>
          </div>
        </div>
      )}

      {phase === 'completion' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Sentence Completion</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-lg mb-2">{SENTENCES[currentItem]}</p>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUser Input(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Complete the sentence"
            />
            <button type="submit" className="btn-primary">Submit</button>
          </form>
        </div>
      )}
    </motion.div>
  );
};