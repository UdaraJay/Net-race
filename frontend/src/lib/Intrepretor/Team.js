class Team {
  car;
  driver;
  position;
  
  constructor(car, driver) {
    this.car = car;
    this.driver = driver;
    this.position = {
      frame: 0,
      lap: 0,
      currentVelocity: 0,
      distanceTravelled: 0
    };
  }

  get car(){ 
    return this.car
  }

  get driver(){ 
    return this.driver
  }
}

export default Team;
