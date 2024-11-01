import React, { useEffect, useState, useRef } from 'react';
import InputSlider from 'react-input-slider';

const AudioEqualizer = ({ audioRef }) => {
  const [frequencies, setFrequencies] = useState({
    60: 0,
    150: 0,
    400: 0,
    1000: 0,
    2400: 0,
    15000: 0,
  });

  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodesRef = useRef({});

  useEffect(() => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!sourceNodeRef.current) {
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
    }

    const updateGainNodes = () => {
      Object.entries(frequencies).forEach(([frequency, value]) => {
        const gainNode = gainNodesRef.current[frequency];
        gainNode.gain.value = value / 100;
      });
    };

    Object.keys(frequencies).forEach((frequency) => {
      if (!gainNodesRef.current[frequency]) {
        const gainNode = audioContextRef.current.createGain();
        gainNodesRef.current[frequency] = gainNode;
        sourceNodeRef.current.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
      }
    });

    updateGainNodes();

    return () => {
      sourceNodeRef.current.disconnect();
      Object.values(gainNodesRef.current).forEach((gainNode) => gainNode.disconnect());
    };
  }, [audioRef, frequencies]);

  const handleFrequencyChange = (frequency, value) => {
    setFrequencies((prevFrequencies) => ({
      ...prevFrequencies,
      [frequency]: value,
    }));
  };

  return (
    <div>
      <h3>Audio Equalizer</h3>
      {Object.entries(frequencies).map(([frequency, value]) => (
        <div key={frequency}>
          <label>{frequency} Hz</label>
          <InputSlider
            axis="x"
            x={value}
            xmin={-12}
            xmax={12}
            onChange={({ x }) => handleFrequencyChange(frequency, x)}
          />
        </div>
      ))}
    </div>
  );
};

export default AudioEqualizer;
