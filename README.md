# Net Racing Rulebook

> The Web 3 Racing Championship.

The Net Race is an internet racing event for virtual cars, drivers and tracks. This rulebook defines how these races work, and the rules and specifications that makeup the championship and ecosystem.

First and foremost this document provides a consistent framework for thinking about races. It is meant to be improved and developed by the community as needed.

1. [Car](#car)
2. [Driver](#driver)
3. [Track](#track)
4. [Intrepretor](#intrepretor) (Simulator)
5. [Environment](#environment) (Oracle for real-time, real-world data)
6. [Renderers](#renderer) (Generate race animation / UI)
7. [Championships](#championships)
8. Race rules

Note: unless otherwise specified, units of measurement are in metric.

- kg for weight
- cm for physical dimensions
- frames for track/lap length (represents distance)
- frames per timestep (represents velocity)

## Car

The following properties are required to define a car.
Cars are generated based on the user's wallet address as a seed value. Every player can get their own (synthetic) car generated from their wallet address.

The algorithm that generates new cars, also known as the manufacturer, should be a pure function, such that it always generates the same car given a wallet address.

```js
// Car

{
  id: 1,
  owner: "0x00",
  manufacturer: {
    algo: x, // algorithm used to generate car, can be a contract
    contract: x // for minted cars
  },
  category: "S", // S,1,2,3,4,5,R
  weight: 1020, // kg
  height: 93, // cm
  width: 170, // cm
  length: 570, // cm
  powerScore: 1, // 0.00 - 1.00
  aerodynamicScore: 1, // 0.00 - 1.00
  accelerationScore: 1, // 0.00 - 1.00
  decelerationScore: 1, // 0.00 - 1.00
  maxSpeed: 120,
  design: {
    // artwork can be created by anyone
    artwork: "ipfs/url",
    cutout: "ipfs/url",
    designer: 0x00,
    designerRoyalty: 5 // %
  }
}
```

```js
// Car Categories & probability

S (super): 0.06
1: 0.1
2: 0.2
3: 0.3
4: 0.2
5: 0.1
R (rare): 0.04
```

### How cars are generated

```js
// input: user wallet address
seed = walletAddress 

// eg. if the 3rd character of walletAddress is the letter 's', category = super (S)
// There might be neater ways to do this [?]
category = getCategory(seed, criteria)
categroy
```

The categories define bands for each parameter. For example, the max and min power the car needs to be. 

> Parameters banded by category include: `weight`, `power`, `accelerationScore`, `decelerationScore`, `aerodynamicScore` and `maxSpeed`.

```js
// use category and other [criteria] to define all of the parameters on the car.
generateCarFromCategory(seed, category) {
  car = useCriteria(seed)
  car = category(car)

  // fix the car since some properties need to be a certain 
  // way to make sense. 
  car = garage(car)
  car
} 
```

## Driver

Drivers have several traits that act as modifiers on the cars and their performance on track. Every player is entitled to one unique driver generated from their wallet adddress.

```js
{
  id: 1,
  name: "John",
  owner: "0x00",
  modifiers: [], // future
  performance: 1, // 0.00 - 1.00
  experience: 1,
  error: 1,
  risk: 1,
  design: {
    artwork: "ipfs/url",
    cutout: "ipfs/url",
    designer: 0x00,
    designerRoyalty: 5 // %
  }
}
```

> In the case of both cars and drivers, the artwork/design that represents them are upto the owner or creator. This may lead to unrealistic and unpredictable designs for cars and drivers, the hope is that the community recognizes the value of designs complementing the specifications of the car. Designs for cars can be unique assets that are also tradeable.

> Given cars and drivers can be bought/sold/traded, designers can receieve a royalty for their designs in such transactions.

## Track

A track is made up of what we call frames. If a track is 60 frames long, this means that each lap is divided up into 60 pieces and the simulation is run 60 times per lap.

Each frame of the track can have variations in properties that affect the performance of cars and drivers.

```js
{
  name: 'world-stage',
  totalFrames: 60
  frames: [
    {
      frame: 1,
      complexityMultiplier: 1,
      errorMultiplier: 1,
      experienceBonus: 1,
      width: 300 // cm
    },
    ...
  ]
}
```
> Each frame can be thought of as a discrete instance of the race. 

Different tracks are made up of varying number of frames and varying numbers of laps per race. The community if free to develop and extend tracks however they want. 

## Intrepretor

This is the program that takes `cars, drivers, tracks, environment` to simulate the race and return the `velocitym position, status` of each car for every step in the race. 

This information can also be used by the `renderer` to generate a real-time animation of the race.

There will be an offical `NetRace Intrepretor` for the `NetRace Championship`, but anyone can make intrepretors for however they want to execute a race. Intrepretors are developed and improved over-time.

In a sense, the intrepretor runs a physics simulation. It calculates the cars overall performance on a given frame in the track. 

```js
// setup the intrepretor
intrepretor = Intrepretor({
  timestep: 1000,
  track: Track
  environment: Oracle,
})

// add racers
intrepretor.add({car, driver})

// simulate for 1 frame
result = intrepretor.step()
```

The intrepretor uses an integrator (verlet for now) as it steps through the simulation to calculate to resulting forces that are carried onto the next step.

```js
// update the velocities and positions of all cars according to timestep dt

return {
  velocities: (cars, dt) {},
  positions: (cars, dt) {},
  statuses: (cars, dt) {} // collisons, tyre wear etc.
};
```

**Performance**: We will think of performance as an integer between (0-10) that defines how many frames the car can move forward in one tick of the simulation. This means that the car may skip a few (0-10) frames per tick depending on its performance.

The intrepretor can make use of an oracle to receieve real-time, real-world weather and enviroment data to enrich the race dynamics.

## Environment

This is a separate service, possibly an Ethereum Oracle, that provides trustable, real-world, real-time data to enrich races. This provides an additional dynamic and some randomness to Net racing.

## Renderer

A universal front-end that takes cars, tracks, drivers and intrepretors to generate a real-time visualization of the race. This is currently a react app that runs on the web.

The front-end is unopionated and has no effect on the outcome of the race. It's meant to be a tool for visualizing races. 

```js
cars = [{car: 1, driver: 1}]

camera(cars, track, intrepretor){
  returns [{car:1, frame: 2},...]
}
```

## Championships

1. Open Net Racing Championship (allows synthetics cars + drivers)
2. Minted Net Racing Championship (minted cars + drivers only)
