// ========================================
// Green Door Coffee
// app.js - 主程式
// 整合 processFilter 同 recipeRenderer
// 自動更新（無需 Generate 按鈕）
// ========================================

// DOM 元素
let brewTypeSelect;
let processFilterSelect;
let coffeeSelect;
let flavorSelect;
let resultDiv;
let resultPlaceholder;

// 當前選中嘅 coffee object
let currentCoffee = null;

// ========================================
// 初始化
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  // 獲取 DOM 元素
  brewTypeSelect = document.getElementById("brewType");
  processFilterSelect = document.getElementById("processFilter");
  coffeeSelect = document.getElementById("coffeeSelect");
  flavorSelect = document.getElementById("flavorSelect");
  resultDiv = document.getElementById("result");
  resultPlaceholder = document.getElementById("resultPlaceholder");

  // 檢查必要元素是否存在
  if (!brewTypeSelect || !processFilterSelect || !coffeeSelect || !flavorSelect) {
    console.error("Missing required DOM elements");
    return;
  }

  // 初始化 coffeeSelect（根據當前 brewType 同 processFilter）
  updateCoffeeList();

  // 生成初始 recipe（如果有預設 coffee）
  const initialCoffee = getSelectedCoffee();
  if (initialCoffee) {
    currentCoffee = initialCoffee;
    updateRecipe();
  }

  // 監聽 brewType 改變
  brewTypeSelect.addEventListener("change", () => {
    updateCoffeeList();
    const newCoffee = getSelectedCoffee();
    if (newCoffee) {
      currentCoffee = newCoffee;
      updateRecipe();
    } else {
      clearResult();
    }
  });

  // 監聽 processFilter 改變
  processFilterSelect.addEventListener("change", () => {
    updateCoffeeList();
    const newCoffee = getSelectedCoffee();
    if (newCoffee) {
      currentCoffee = newCoffee;
      updateRecipe();
    } else {
      clearResult();
    }
  });

  // 監聽 coffeeSelect 改變（即時更新）
  coffeeSelect.addEventListener("change", () => {
    const selectedCoffee = getSelectedCoffee();
    if (selectedCoffee) {
      currentCoffee = selectedCoffee;
      updateRecipe();
    } else {
      clearResult();
    }
  });

  // 監聽 flavorSelect 改變（即時更新）
  flavorSelect.addEventListener("change", () => {
    if (currentCoffee) {
      updateRecipe();
    }
  });
});

// ========================================
// 更新咖啡豆列表（根據 brewType 同 processFilter）
// ========================================
function updateCoffeeList() {
  if (!brewTypeSelect || !processFilterSelect || !coffeeSelect) return;

  const brewTypeValue = brewTypeSelect.value;
  const processValue = processFilterSelect.value;

  // 使用 processFilter.js 嘅函數
  if (typeof updateCoffeeSelectOptions === "function") {
    updateCoffeeSelectOptions(coffeeSelect, coffees, brewTypeValue, processValue);
  } else {
    // Fallback：如果 function 唔存在，手動處理
    console.warn("updateCoffeeSelectOptions not found, using fallback");
    const filtered = coffees.filter(c => c.type === brewTypeValue);
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
// 獲取當前選中嘅 coffee object
// ========================================
function getSelectedCoffee() {
  if (!coffeeSelect || !coffeeSelect.value) return null;

  const coffeeId = coffeeSelect.value;
  return coffees.find(c => c.id === coffeeId);
}

// ========================================
// 更新 recipe（生成並顯示）
// ========================================
function updateRecipe() {
  if (!currentCoffee) {
    clearResult();
    return;
  }

  const intention = flavorSelect.value;

  // Debug: 檢查 function 是否存在
  console.log("generateRecipeHTML exists?", typeof generateRecipeHTML);

  let recipeHTML = "";
  if (typeof generateRecipeHTML === "function") {
    recipeHTML = generateRecipeHTML(currentCoffee, intention);
  } else {
    recipeHTML = "<p>Error: Recipe renderer not loaded. Please check console.</p>";
  }

  if (resultDiv && resultPlaceholder) {
    resultDiv.innerHTML = recipeHTML;
    resultPlaceholder.style.display = "none";
    resultDiv.style.display = "block";
  }
}

// ========================================
// 清空結果，顯示 placeholder
// ========================================
function clearResult() {
  if (resultDiv && resultPlaceholder) {
    resultDiv.innerHTML = "";
    resultDiv.style.display = "none";
    resultPlaceholder.style.display = "block";
  }
}

// 手動 expose 全域（供 debugging 用）
if (typeof window !== "undefined") {
  window.updateCoffeeList = updateCoffeeList;
  window.getSelectedCoffee = getSelectedCoffee;
  window.updateRecipe = updateRecipe;
  window.clearResult = clearResult;
}