import { useState, useEffect } from 'react';
import Intrepretor from '@/lib/Intrepretor';

const Track = ({ totalLaps = 55, framesPerLap = 120 }) => {
  const [intrepretor] = useState(() => new Intrepretor());

  // add the cars
  useEffect(() => {
   
    intre
  }, []);


  return <div className="pt-8">Track</div>;
};

export default Track;
