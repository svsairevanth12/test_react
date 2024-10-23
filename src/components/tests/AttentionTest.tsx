import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FORWARD_SEQUENCES = ['5-8-2', '6-9-4', '7-2-8-6'];
const BACKWARD_SEQUENCES = ['3-6-9', '4-7-1', '8-5-2-9'];

export const AttentionTest = () => {
  const [phase, setPhase] = useState<'forward' | 'backward' | 'cpt'>('forward');
  const [currentSequence, setCurrentSequence] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState({ forward: 0, backward: 0, cpt: 0 });
  const [showSequence, setShowSequence] = useState(true);

  useEffect(() => {
    if (showSequence) {
      const timer = setTimeout(() => setShowSequence(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSequence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sequences = phase === 'forward' ? FORWARD_SEQUENCES : BACKWARD_SEQUENCES;
    
    if (userInput === sequences[currentSequence]) {
      setScore(prev => ({
        ...prev,
        [phase]: prev[phase as keyof typeof prev] + 1
      }));
    }

    if (currentSequence < sequences.length - 1) {
      setCurrentSequence(prev => prev + 1);
    } else if (phase === 'forward') {
      setPhase('backward');
      setCurrentSequence(0);
    } else {
      setPhase('cpt');
    }

    setUserInput('');
    setShowSequence(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {(phase === 'forward' || phase === 'backward') && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {phase === 'forward' ? 'Forward' : 'Backward'} Digit Span
          </h3>
          {showSequence ? (
            <div className="text-center text-2xl font-bold">
              {phase === 'forward' 
                ? FORWARD_SEQUENCES[currentSequence]
                : BACKWARD_SEQUENCES[currentSequence]}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter the sequence"
              />
              <button type="submit" className="btn-primary">Submit</button>
            </form>
          )}
        </div>
      )}

      {phase === 'cpt' && (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Continuous Performance Task</h3>
          <p>Press the button when you see 'X'</p>
          {/* CPT implementation */}
        </div>
      )}

      <div className="bg-indigo-50 p-4 rounded-lg">
        <p>Forward Score: {score.forward}</p>
        <p>Backward Score: {score.backward}</p>
        <p>CPT Score: {score.cpt}</p>
      </div>
    </motion.div>
  );
};