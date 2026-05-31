// ========================================
// Green Door Coffee
// processFilter.js
// Coffee Process Filter
// ========================================

// ========================================
// UPDATE COFFEE OPTIONS
// ========================================
function updateCoffeeSelectOptions(
  coffeeSelect,
  coffees,
  processValue
) {

  // ======================================
  // CHECK
  // ======================================
  if (!coffeeSelect || !coffees) {
    return;
  }

  // ======================================
  // FILTERED RESULT
  // ======================================
  let filtered = coffees;

  // ======================================
  // ALL
  // ======================================
  if (processValue === "all") {
    filtered = coffees;
  }

  // ======================================
  // WASHED
  // ======================================
  else if (processValue === "washed") {

    filtered = coffees.filter(coffee => {

      return coffee.process
        .toLowerCase()
        .includes("washed");

    });

  }

  // ======================================
  // NATURAL
  // ======================================
  else if (processValue === "natural") {

    filtered = coffees.filter(coffee => {

      return coffee.process
        .toLowerCase()
        .includes("natural");

    });

  }

  // ======================================
  // HONEY
  // ======================================
  else if (processValue === "honey") {

    filtered = coffees.filter(coffee => {

      return coffee.process
        .toLowerCase()
        .includes("honey");

    });

  }

  // ======================================
  // ANAEROBIC
  // ======================================
  else if (processValue === "anaerobic") {

    filtered = coffees.filter(coffee => {

      return coffee.process
        .toLowerCase()
        .includes("anaerobic");

    });

  }

  // ======================================
  // CLEAR SELECT
  // ======================================
  coffeeSelect.innerHTML = "";

  // ======================================
  // BUILD OPTIONS
  // ======================================
  filtered.forEach(coffee => {

    const option =
      document.createElement("option");

    option.value =
      coffee.id;

    option.textContent =
      coffee.fullName;

    coffeeSelect.appendChild(option);

  });

}

// ========================================
// GET FILTERED COFFEES
// ========================================
function getFilteredCoffees(
  coffees,
  processValue
) {

  if (!coffees) return [];

  // all
  if (processValue === "all") {
    return coffees;
  }

  return coffees.filter(coffee => {

    return coffee.process
      .toLowerCase()
      .includes(
        processValue.toLowerCase()
      );

  });

}

// ========================================
// GLOBAL
// ========================================
if (typeof window !== "undefined") {

  window.updateCoffeeSelectOptions =
    updateCoffeeSelectOptions;

  window.getFilteredCoffees =
    getFilteredCoffees;

}