import { useState, useEffect } from 'react';

const Track = ({ totalLaps = 55, framesPerLap = 120 }) => {
  const [lap, setLap] = useState(0);
  const [frame, setFrame] = useState(0);
  const [cars, setCars] = useState([]);
  const [laps, setLaps] = useState([]);

  return <div className="pt-8">Track</div>;
};

export default Track;
