import Team from "./Team";

class NetRaceIntrepretor {
  track;
  teams;
  environment;
  laps = 60;

  constructor(teams, track, environment, laps) {
    this.state = {
      timestep: 1000,
      tick: 0, // number of timesteps elapsed
      currentLap: 0,
      currentFrame: 0,
      teams:[],
      track: null,
      laps: 60,
      environment: null, 
      timestamp: Date.now(),
    };
  }

  addTeam(car, driver) {
    const driverInCar = new Team(car, driver);

    this.state.teams = [...this.state.teams, driverInCar];

    return this.state.teams;
  }

  step(){

  }

  simulateStepForTeam(frame, team){

    const a = car.acceleration;
    const maxV = car.maxSpeed; 
    const u = car.getVelocity();
    const v = u + a(1);
    const d = (u + v) / 2

    // distance travelled in tick
    // velocity at end of tick
    return { 
      distance: d,
      velocity: d,
    }
  }
}

export default NetRaceIntrepretor;
