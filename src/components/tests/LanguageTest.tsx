import React, { useState } from 'react';
import { motion } from 'framer-motion';

const OBJECTS = ['clock', 'key', 'umbrella', 'flower', 'bicycle'];
const SENTENCES = [
  'The sky is ___',
  'A dog likes to ___',
  'In winter it gets ___'
];

export const LanguageTest = () => {
  const [phase, setPhase] = useState<'naming' | 'completion' | 'fluency'>('naming');
  const [currentItem, setCurrentItem] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState({ naming: 0, completion: 0, fluency: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phase === 'naming') {
      if (userInput.toLowerCase() === OBJECTS[currentItem]) {
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

    setUserInput('');
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
              src={`https://source.unsplash.com/400x300/?${OBJECTS[currentItem]}`}
              alt={`Name this object`}
              className="mx-auto rounded-lg mb-4"
            />
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
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
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Complete the sentence"
            />
            <button type="submit" className="btn-primary">Submit</button>
          </form>
        </div>
      )}

      {phase === 'fluency' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Verbal Fluency</h3>
          <p className="mb-4">Generate words that start with the letter "S"</p>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-3 border rounded-lg"
            rows={4}
            placeholder="Enter words separated by commas"
          />
        </div>
      )}

      <div className="bg-indigo-50 p-4 rounded-lg">
        <p>Naming Score: {score.naming}</p>
        <p>Completion Score: {score.completion}</p>
        <p>Fluency Score: {score.fluency}</p>
      </div>
    </motion.div>
  );
};