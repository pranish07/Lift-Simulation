//Global Varibles
let numLifts, numFloors;
let lifts = [];

//Helper function to create a lift object
const createLift = (id, totalFloors) => ({
  id,
  currentFloor: 1,
  targetFloor: null,
  isMoving: false,
  isBusy: false,
  totalFloors,
  element: null,
});

//event listener for the start button
document.getElementById("start").addEventListener("click", () => {
  numFloors = parseInt(document.getElementById("floors").value);
  numLifts = parseInt(document.getElementById("lifts").value);

  if (numFloors >= 2 && numFloors <= 10 && numLifts >= 1 && numLifts <= 5) {
    document.getElementById("setup").style.display = "none";
    document.getElementById("simulation").style.display = "flex";
    initializeSimulation();
  } else {
    alert("Please enter valid numbers for floors (2-10) and lifts(1-5)");
  }
});

//Initialize the simulation
const initializeSimulation = () => {
  const building = document.getElementById("building");
  building.innerHTML = "";
  //create floors
  for (let i = numFloors; i >= 1; i--) {
    const floor = document.createElement("div");
    floor.className = "floor";
    floor.innerHTML = `
    <div>Floor${i}</div>
    <div>
    <button>▲</button>
    <button>▼</button>
    </div>
    `;
    building.appendChild(floor);
  }

  //create parent div to lift shafts
  const liftShaftsContainer = document.createElement("div");
  liftShaftsContainer.className = "lift-shafts-container";
  building.appendChild(liftShaftsContainer);

  //create lifts

  //set building height

  //add event listener to floor buttons
};

//call lift to a specific floor

//move a lift to a target floor

//open lift doors

//close lift doors
