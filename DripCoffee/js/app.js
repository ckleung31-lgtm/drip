
const brewTypeSelect = document.getElementById("brewType");
const coffeeSelect = document.getElementById("coffeeSelect");
const flavorSelect = document.getElementById("flavorSelect");
const result = document.getElementById("result");

function updateCoffeeList(){

  const brewType = brewTypeSelect.value;

  const filtered = coffees.filter(
    coffee => coffee.type === brewType
  );

  coffeeSelect.innerHTML = "";

  filtered.forEach(coffee => {

    const option = document.createElement("option");

    option.value = coffee.id;
    option.textContent = coffee.shortName;

    coffeeSelect.appendChild(option);

  });

  if(filtered.length > 0){
    coffeeSelect.selectedIndex = 0;
  }
}

function getSelectedCoffee(){

  return coffees.find(
    coffee => coffee.id === coffeeSelect.value
  );

}

function updateRecipe(){

  const coffee = getSelectedCoffee();

  if(!coffee){
    result.innerHTML = "";
    return;
  }

  result.innerHTML = renderRecipe(
    coffee,
    flavorSelect.value
  );

}

brewTypeSelect.addEventListener("change", () => {
  updateCoffeeList();
  updateRecipe();
});

coffeeSelect.addEventListener("change", updateRecipe);

flavorSelect.addEventListener("change", updateRecipe);

updateCoffeeList();
updateRecipe();
