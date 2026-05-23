// ========================================
// Green Door Coffee
// app.js - 主程式
// 整合 processFilter 同 recipeRenderer
// 自動更新（無需 Generate 按鈕）
// 支援總水量輸入
// ========================================

// DOM 元素
let brewTypeSelect;
let processFilterSelect;
let coffeeSelect;
let flavorSelect;
let totalWaterInput;
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
  totalWaterInput = document.getElementById("totalWater");
  resultDiv = document.getElementById("result");
  resultPlaceholder = document.getElementById("resultPlaceholder");

  // 檢查必要元素是否存在
  if (!brewTypeSelect || !processFilterSelect || !coffeeSelect || !flavorSelect || !totalWaterInput) {
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

  // 監聽 totalWater 改變（即時更新）
  totalWaterInput.addEventListener("change", () => {
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
// 獲取有效總水量（最少 150ml，最多 600ml）
// ========================================
function getValidTotalWater() {
  let totalWater = parseInt(totalWaterInput.value);
  if (isNaN(totalWater)) totalWater = 270;
  if (totalWater < 150) totalWater = 150;
  if (totalWater > 600) totalWater = 600;
  return totalWater;
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
  const totalWater = getValidTotalWater();

  // 同步更新 input 顯示值（如果超出範圍會被修正）
  if (totalWaterInput.value != totalWater) {
    totalWaterInput.value = totalWater;
  }

  // 更新粉量提示（顯示喺 HTML 嘅 hint 位置）
  updateDoseHint(currentCoffee, intention, totalWater);

  // 使用 recipeRenderer.js 嘅函數
  let recipeHTML = "";
  if (typeof generateRecipeHTML === "function") {
    recipeHTML = generateRecipeHTML(currentCoffee, intention, totalWater);
  } else {
    console.warn("generateRecipeHTML not found");
    recipeHTML = "<p>Error: Recipe renderer not loaded</p>";
  }

  // 顯示結果
  if (resultDiv && resultPlaceholder) {
    resultDiv.innerHTML = recipeHTML;
    resultPlaceholder.style.display = "none";
    resultDiv.style.display = "block";
  }
}

// ========================================
// 更新粉量提示（喺 HTML 嘅 hint 位置顯示）
// ========================================
function updateDoseHint(coffee, intention, totalWater) {
  const doseHint = document.getElementById("doseHint");
  if (!doseHint) return;

  // 獲取當前比例（需要從 coffee 同 intention 計算）
  let ratio = coffee.brewBias.ratio;

  // 根據 intention 調整比例（同 recipeRenderer 邏輯一致）
  if (intention === "clarity") {
    ratio = "1:16.5";
  } else if (intention === "body" || intention === "funky") {
    ratio = "1:15";
  } else if (intention === "clarity-sweet") {
    ratio = "1:16.5";
  }
  // balanced 保持原狀

  const ratioValue = parseFloat(ratio.split(":")[1]);
  const dose = totalWater / ratioValue;
  const roundedDose = Math.round(dose * 10) / 10;

  doseHint.innerHTML = `💡 粉量：約 ${roundedDose}g（按比例 ${ratio} 計算）`;
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
  window.getValidTotalWater = getValidTotalWater;
}