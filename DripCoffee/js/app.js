// ========================================
// Green Door Coffee
// app.js - 主程式
// 最簡潔版本，無任何多餘 code
// ========================================

// 等待 DOM 載入完成
document.addEventListener("DOMContentLoaded", function() {

  // 獲取 DOM 元素
  const brewTypeSelect = document.getElementById("brewType");
  const processFilterSelect = document.getElementById("processFilter");
  const coffeeSelect = document.getElementById("coffeeSelect");
  const flavorSelect = document.getElementById("flavorSelect");
  const resultDiv = document.getElementById("result");
  const resultPlaceholder = document.getElementById("resultPlaceholder");

  // 當前選擇嘅咖啡
  let currentCoffee = null;

  // ========================================
  // 更新咖啡豆列表
  // ========================================
  function updateCoffeeList() {
    const brewType = brewTypeSelect.value;
    const processValue = processFilterSelect.value;

    // 用 processFilter.js 嘅函數
    if (typeof updateCoffeeSelectOptions === "function") {
      updateCoffeeSelectOptions(coffeeSelect, coffees, brewType, processValue);
    } else {
      // 簡單 fallback
      const filtered = coffees.filter(c => c.type === brewType);
      coffeeSelect.innerHTML = "";
      filtered.forEach(coffee => {
        const option = document.createElement("option");
        option.value = coffee.id;
        option.textContent = coffee.shortName;
        coffeeSelect.appendChild(option);
      });
    }
  }

  // ========================================
  // 獲取當前選擇嘅咖啡
  // ========================================
  function getSelectedCoffee() {
    if (!coffeeSelect.value) return null;
    return coffees.find(c => c.id === coffeeSelect.value);
  }

  // ========================================
  // 更新沖煮結果
  // ========================================
  function updateRecipe() {
    if (!currentCoffee) {
      resultDiv.innerHTML = "";
      resultPlaceholder.style.display = "block";
      resultDiv.style.display = "none";
      return;
    }

    const intention = flavorSelect.value;

    if (typeof generateRecipeHTML === "function") {
      const html = generateRecipeHTML(currentCoffee, intention);
      resultDiv.innerHTML = html;
      resultPlaceholder.style.display = "none";
      resultDiv.style.display = "block";
    } else {
      resultDiv.innerHTML = "<p>Error: Recipe renderer not loaded</p>";
      resultPlaceholder.style.display = "none";
      resultDiv.style.display = "block";
    }
  }

  // ========================================
  // 事件監聽
  // ========================================

  // 沖煮方式改變
  brewTypeSelect.addEventListener("change", function() {
    updateCoffeeList();
    currentCoffee = getSelectedCoffee();
    updateRecipe();
  });

  // 處理法改變
  processFilterSelect.addEventListener("change", function() {
    updateCoffeeList();
    currentCoffee = getSelectedCoffee();
    updateRecipe();
  });

  // 咖啡豆改變
  coffeeSelect.addEventListener("change", function() {
    currentCoffee = getSelectedCoffee();
    updateRecipe();
  });

  // 沖煮意向改變
  flavorSelect.addEventListener("change", function() {
    updateRecipe();
  });

  // ========================================
  // 初始化
  // ========================================
  updateCoffeeList();
  currentCoffee = getSelectedCoffee();
  updateRecipe();

});