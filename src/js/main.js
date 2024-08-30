// Global variables
let numFloors, numLifts;
let lifts = [];

// Helper function to create a lift object
const createLift = (id, totalFloors) => ({
  id,
  currentFloor: 1,
  targetFloor: null,
  isMoving: false,
  isBusy: false,
  totalFloors,
  element: null,
});

// Event listener for the start button
document.getElementById("start").addEventListener("click", () => {
  numFloors = parseInt(document.getElementById("floors").value);
  numLifts = parseInt(document.getElementById("lifts").value);

  if (numFloors >= 2 && numFloors <= 10 && numLifts >= 1 && numLifts <= 5) {
    document.getElementById("setup").style.display = "none";
    document.getElementById("simulation").style.display = "flex";
    initializeSimulation();
  } else {
    alert("Please enter valid numbers for floors (2-10) and lifts (1-5).");
  }
});

// Initialize the simulation
const initializeSimulation = () => {
  const building = document.getElementById("building");
  building.innerHTML = "";

  // Create floors
  for (let i = numFloors; i >= 1; i--) {
    const floor = document.createElement("div");
    floor.className = "floor";
    floor.innerHTML = `
            <div class="floor-label">Floor ${i}</div>
            <div class="floor-buttons">
                ${
                  i !== numFloors
                    ? `<button class="floor-button up" data-floor="${i}" data-direction="up">▲</button>`
                    : ""
                }
                ${
                  i !== 1
                    ? `<button class="floor-button down" data-floor="${i}" data-direction="down">▼</button>`
                    : ""
                }
            </div>
        `;
    building.appendChild(floor);
  }

  // Create parent div for lift shafts
  const liftShaftsContainer = document.createElement("div");
  liftShaftsContainer.className = "lift-shafts-container";
  building.appendChild(liftShaftsContainer);

  // Create lifts
  for (let i = 0; i < numLifts; i++) {
    const lift = createLift(i, numFloors);
    const liftShaft = document.createElement("div");
    liftShaft.className = "lift-shaft";
    liftShaft.innerHTML = `
            <div class="lift" id="lift-${i}">
                <div class="lift-door left"></div>
                <div class="lift-door right"></div>
            </div>
        `;
    liftShaftsContainer.appendChild(liftShaft);
    lift.element = liftShaft.querySelector(".lift");
    lifts.push(lift);
  }


  // Add event listeners to floor buttons
  const floorButtons = document.querySelectorAll(".floor-button");
  floorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const floor = parseInt(button.dataset.floor);
      callLift(floor);
    });
  });
};

// Call a lift to a specific floor
const callLift = (targetFloor) => {
  const availableLifts = lifts.filter((lift) => !lift.isBusy && !lift.isMoving);
  if (availableLifts.length === 0) return;

  const nearestLift = availableLifts.reduce((nearest, lift) => {
    const distanceCurrent = Math.abs(lift.currentFloor - targetFloor);
    const distanceNearest = Math.abs(nearest.currentFloor - targetFloor);
    return distanceCurrent < distanceNearest ? lift : nearest;
  });

  moveLift(nearestLift, targetFloor);
};

// Move a lift to a target floor
const moveLift = (lift, targetFloor) => {
  if (lift.isMoving || lift.isBusy) return;
  lift.isMoving = true;
  lift.targetFloor = targetFloor;
  lift.element.style.transition = `bottom ${
    Math.abs(lift.currentFloor - targetFloor) * 0.5
  }s ease-in-out`;
  lift.element.style.bottom = `${(targetFloor - 1) * 70}px`;
  setTimeout(() => {
    lift.currentFloor = targetFloor;
    lift.isMoving = false;
    openLiftDoors(lift);
  }, Math.abs(lift.currentFloor - targetFloor) * 2000);
};

// Open lift doors
const openLiftDoors = (lift) => {
  lift.isBusy = true;
  const leftDoor = lift.element.querySelector(".lift-door.left");
  const rightDoor = lift.element.querySelector(".lift-door.right");
  leftDoor.classList.add("open");
  rightDoor.classList.add("open");
  setTimeout(() => closeLiftDoors(lift), 2000);
};

// Close lift doors
const closeLiftDoors = (lift) => {
  const leftDoor = lift.element.querySelector(".lift-door.left");
  const rightDoor = lift.element.querySelector(".lift-door.right");
  leftDoor.classList.remove("open");
  rightDoor.classList.remove("open");
  setTimeout(() => {
    lift.isBusy = false;
    lift.targetFloor = null;
  }, 500);
};
