import { useState, useEffect } from 'react';
import Intrepretor from '@/lib/Intrepretor';
import styles from './Track.module.scss';

import {
  sampleCar,
  sampleDriver,
  sampleTrack,
} from '@/lib/Intrepretor/samples';

const Track = () => {
  const [intrepretor] = useState(() => new Intrepretor());
  const [currentLap, setCurrentLap] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [score, setScore] = useState([]);
  const [track, setTrack] = useState([]);
  const [start, setStart] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // setup the track
  useEffect(() => {
    let track = [];
    for (let i = 0; i < sampleTrack.laps; i++) {
      track.push(sampleTrack.frames);
    }
    setTrack(track);
  }, []);

  //setup the scoreboard
  // we're just using one smaple car for this demo
  useEffect(() => {
    let score = [];
    let teamOne = { car: sampleCar, distance: 0 };
    score.push(teamOne);
    setScore(score);
  }, []);

  // Test
  // Timer + emulate sample race
  // useEffect(() => {
  //   let interval = null;
  //   if (!score) return;

  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds((seconds) => seconds + 1);
  //       // just testing here...
  //       const movedCar = { ...score[0], distance: score[0].distance + 0.5 };
  //       setScore([movedCar]);
  //     }, 50);
  //   } else if (!isActive && seconds !== 0) {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive, seconds, score]);

  // this checks for any cars that may be in this frame and
  // place it down appropriately.
  // TODO: each car has its own lane - build the renderer
  // with that concept in mind.
  const getCarsInFrame = (lapNumber, frameNumber) => {
    const carsInFrame = score.map((score) => {
      const distance = score.distance;
      const fpl = sampleTrack.framesPerLap;
      const inLap = Math.floor(distance / fpl);
      const distanceInCurrentLap = distance - fpl * inLap;
      const inFrame = Math.floor(distanceInCurrentLap / 1);
      const progressInFrame = (distanceInCurrentLap % 1).toFixed(2);

      if (inLap != lapNumber) return;
      if (inFrame != frameNumber) return;

      return { car: score.car, progressInFrame };
    });

    if (carsInFrame && carsInFrame.length > 0) {
      console.log('carsInFrame', carsInFrame);

      // return the cars with appropriate positions
      return carsInFrame.map((s) => {
        if (!s) return null;

        return (
          <div className={styles.car}>
            <img
              src={s.car.design.cutout.src}
              style={{ right: `${s.progressInFrame * 100}%` }}
            />
          </div>
        );
      });
    }

    return null;
  };

  const renderFrame = (lap, lapNumber, frameNumber) => {
    return lap.map((f) => (
      <div className={styles.frame}>
        {getCarsInFrame(lapNumber, frameNumber)}
      </div>
    ));
  };

  // This should render the cars in the right frames.
  const renderLap = (lap, ln) => {
    return lap.map((f, fn) => (
      <div className={styles.frame}>{renderFrame(lap, ln, fn)}</div>
    ));
  };

  const renderTrack = (track) => {
    console.log('sampleTrack', track);
    return track.map((lap, i) => (
      <div className={styles.lap}>
        <div className={styles.label}>Lap {i + 1}</div>
        {renderLap(lap, i)}
      </div>
    ));
  };

  return (
    <>
      <div className="pt-8">
        <div className="">Web 3.0 Racing Championship • Demo alpha.0.0.3</div>
        <div className={styles.track}>{renderTrack(track)}</div>
      </div>

      <div className="pt-4 text-sm text-gray-400">
        Credits to{' '}
        <a href="https://www.reddit.com/r/formula1/comments/b1ui1c/pixelart_of_2019_grid/">
          u/Racing21187
        </a>{' '}
        for car designs. Unlicensed for this demo.
      </div>
    </>
  );
};

export default Track;
