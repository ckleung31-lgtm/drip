// ========================================
// Green Door Coffee
// app.js
// Main Application
// Hand Brew Philosophy
// ========================================

// ========================================
// DOM
// ========================================
let processFilterSelect;
let coffeeSelect;
let flavorSelect;
let resultDiv;
let resultPlaceholder;

// ========================================
// Current Coffee
// ========================================
let currentCoffee = null;

// ========================================
// INIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {

  // ======================================
  // GET ELEMENTS
  // ======================================
  processFilterSelect = document.getElementById("processFilter");
  coffeeSelect = document.getElementById("coffeeSelect");
  flavorSelect = document.getElementById("flavorSelect");
  resultDiv = document.getElementById("result");
  resultPlaceholder = document.getElementById("resultPlaceholder");

  // ======================================
  // CHECK
  // ======================================
  if (
    !processFilterSelect ||
    !coffeeSelect ||
    !flavorSelect
  ) {
    console.error("Missing DOM elements");
    return;
  }

  // ======================================
  // INITIALISE COFFEE LIST
  // ======================================
  updateCoffeeList();

  // ======================================
  // INITIAL RECIPE
  // ======================================
  const initialCoffee = getSelectedCoffee();

  if (initialCoffee) {
    currentCoffee = initialCoffee;
    updateRecipe();
  }

  // ======================================
  // PROCESS FILTER CHANGE
  // ======================================
  processFilterSelect.addEventListener(
    "change",
    () => {

      updateCoffeeList();

      const selectedCoffee =
        getSelectedCoffee();

      if (selectedCoffee) {
        currentCoffee = selectedCoffee;
        updateRecipe();
      }

      else {
        clearResult();
      }

    }
  );

  // ======================================
  // COFFEE CHANGE
  // ======================================
  coffeeSelect.addEventListener(
    "change",
    () => {

      const selectedCoffee =
        getSelectedCoffee();

      if (selectedCoffee) {
        currentCoffee = selectedCoffee;
        updateRecipe();
      }

      else {
        clearResult();
      }

    }
  );

  // ======================================
  // FLAVOR CHANGE
  // ======================================
  flavorSelect.addEventListener(
    "change",
    () => {

      if (currentCoffee) {
        updateRecipe();
      }

    }
  );

});

// ========================================
// UPDATE COFFEE LIST
// ========================================
function updateCoffeeList() {

  if (
    !processFilterSelect ||
    !coffeeSelect
  ) return;

  const processValue = processFilterSelect.value;

  // ======================================
  // FILTER
  // ======================================
  let filteredCoffees = coffees;

  // all
  if (processValue === "all") {
    filteredCoffees = coffees;
  }

  // washed
  else if (processValue === "washed") {

    filteredCoffees =
      coffees.filter(coffee =>
        coffee.process
          .toLowerCase()
          .includes("washed")
      );
  }

  // natural
  else if (processValue === "natural") {

    filteredCoffees =
      coffees.filter(coffee =>
        coffee.process
          .toLowerCase()
          .includes("natural")
      );
  }

  // honey
  else if (processValue === "honey") {

    filteredCoffees =
      coffees.filter(coffee =>
        coffee.process
          .toLowerCase()
          .includes("honey")
      );
  }

  // anaerobic
  else if (processValue === "anaerobic") {

    filteredCoffees =
      coffees.filter(coffee =>
        coffee.process
          .toLowerCase()
          .includes("anaerobic")
      );
  }

  // ======================================
  // CLEAR SELECT
  // ======================================
  coffeeSelect.innerHTML = "";

  // ======================================
  // BUILD OPTIONS
  // ======================================
  filteredCoffees.forEach(coffee => {
    const option = document.createElement("option");
    option.value = coffee.id;
    option.textContent = coffee.shortName;
    coffeeSelect.appendChild(option);
  });

}

// ========================================
// GET SELECTED COFFEE
// ========================================
function getSelectedCoffee() {

  if (
    !coffeeSelect ||
    !coffeeSelect.value
  ) {
    return null;
  }

  return coffees.find(
    coffee =>
      coffee.id === coffeeSelect.value
  );

}

// ========================================
// UPDATE RECIPE
// ========================================
function updateRecipe() {

  if (!currentCoffee) {
    clearResult();
    return;
  }

  const intention = flavorSelect.value;
  let recipeHTML = "";

  // ======================================
  // GENERATE
  // ======================================
  if (
    typeof generateRecipeHTML ===
    "function"
  ) {
    recipeHTML =
      generateRecipeHTML(
        currentCoffee,
        intention
      );
  }
  else {
    console.error(
      "generateRecipeHTML not found"
    );
    recipeHTML = `
      <div class="analysis-highlight">
        Recipe Renderer Not Loaded
      </div>
    `;
  }

  // ======================================
  // DISPLAY
  // ======================================
  resultDiv.innerHTML =
    recipeHTML;

  resultPlaceholder.style.display =
    "none";

  resultDiv.style.display =
    "block";

}

// ========================================
// CLEAR
// ========================================
function clearResult() {

  resultDiv.innerHTML = "";

  resultDiv.style.display =
    "none";

  resultPlaceholder.style.display =
    "block";

}

// ========================================
// GLOBAL
// ========================================
if (typeof window !== "undefined") {

  window.updateCoffeeList =
    updateCoffeeList;

  window.getSelectedCoffee =
    getSelectedCoffee;

  window.updateRecipe =
    updateRecipe;

  window.clearResult =
    clearResult;

}