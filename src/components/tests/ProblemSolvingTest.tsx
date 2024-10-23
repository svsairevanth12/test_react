import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ProblemSolvingTest = () => {
  const [phase, setPhase] = useState<'trail' | 'pattern' | 'sequence'>('trail');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ trail: 0, pattern: 0, sequence: 0 });
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    if (phase === 'trail' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw numbered circles
      const circles = Array.from({ length: 12 }, (_, i) => ({
        x: Math.random() * (canvas.width - 50) + 25,
        y: Math.random() * (canvas.height - 50) + 25,
        number: i + 1
      }));

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(({ x, y, number }) => {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#E0E7FF';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(number.toString(), x, y);
      });
    }
  }, [phase]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is near the current number
    // Implementation details...
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {phase === 'trail' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Trail Making Test</h3>
          <p className="mb-4">Connect the numbers in order from 1 to 12</p>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onClick={handleCanvasClick}
            className="border rounded-lg mx-auto"
          />
          <p className="mt-2 text-gray-600">Current number: {currentNumber}</p>
        </div>
      )}

      {phase === 'pattern' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Pattern Completion</h3>
          {/* Pattern completion implementation */}
        </div>
      )}

      {phase === 'sequence' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Number Sequence</h3>
          {/* Number sequence implementation */}
        </div>
      )}

      <div className="bg-indigo-50 p-4 rounded-lg">
        <p>Trail Making Score: {score.trail}</p>
        <p>Pattern Score: {score.pattern}</p>
        <p>Sequence Score: {score.sequence}</p>
      </div>
    </motion.div>
  );
};