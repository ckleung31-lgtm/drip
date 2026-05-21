// ========================================
// Green Door Coffee
// processFilter.js - 處理法過濾系統
// 支援：washed, natural, honey, anaerobic
// Espresso Blend (Mixed Washed / Natural) 會同時出現喺 washed 同 natural
// ========================================

// 將 process string 轉換成 categories array
function getProcessCategories(processStr) {
  if (!processStr) return [];

  const lower = processStr.toLowerCase();
  const categories = [];

  if (lower.includes("washed")) categories.push("washed");
  if (lower.includes("natural")) categories.push("natural");
  if (lower.includes("honey")) categories.push("honey");
  if (lower.includes("anaerobic")) categories.push("anaerobic");
  if (lower.includes("ea decaf")) categories.push("washed");
  if (lower.includes("dried on the tree")) categories.push("natural");

  if (categories.length === 0) categories.push("washed");

  return categories;
}

// 檢查一隻豆是否符合所選 process filter
function matchesProcessFilter(coffee, processValue) {
  if (processValue === "all") return true;

  const processLower = coffee.process.toLowerCase();

  switch(processValue) {
    case "washed":
      return processLower.includes("washed") || processLower.includes("ea decaf");
    case "natural":
      return processLower.includes("natural") || processLower.includes("dried on the tree");
    case "honey":
      return processLower.includes("honey");
    case "anaerobic":
      return processLower.includes("anaerobic");
    default:
      return false;
  }
}

// 主函數：根據 brewType 同 processFilter 過濾咖啡豆
function filterCoffeesByProcess(coffees, brewTypeValue, processValue) {
  let filtered = coffees.filter(coffee => coffee.type === brewTypeValue);

  if (processValue !== "all") {
    filtered = filtered.filter(coffee => matchesProcessFilter(coffee, processValue));
  }

  return filtered;
}

// 拎咖啡豆嘅 display name（用 fullName）
function getCoffeeDisplayName(coffee) {
  const countryEmojis = {
    "Bolivia": "🇧🇴",
    "Colombia": "🇨🇴",
    "Costa Rica": "🇨🇷",
    "El Salvador": "🇸🇻",
    "Ethiopia": "🇪🇹",
    "Panama": "🇵🇦",
    "Peru": "🇵🇪",
    "Rwanda": "🇷🇼",
    "Brazil": "🇧🇷",
    "Blend": "🌍"
  };

  const emoji = countryEmojis[coffee.origin] || "📍";
  return `${emoji} ${coffee.fullName}`;
}

// 更新 coffeeSelect 嘅 options
function updateCoffeeSelectOptions(coffeeSelectEl, coffees, brewTypeValue, processValue) {
  if (!coffeeSelectEl) return;

  const filtered = filterCoffeesByProcess(coffees, brewTypeValue, processValue);

  coffeeSelectEl.innerHTML = "";

  if (filtered.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.disabled = true;
    option.selected = true;
    option.textContent = "── 沒有符合的咖啡豆 · No coffee matches ──";
    coffeeSelectEl.appendChild(option);
    return;
  }

  filtered.forEach(coffee => {
    const option = document.createElement("option");
    option.value = coffee.id;
    option.textContent = getCoffeeDisplayName(coffee);
    coffeeSelectEl.appendChild(option);
  });
}

// 全域 expose
if (typeof window !== "undefined") {
  window.getProcessCategories = getProcessCategories;
  window.matchesProcessFilter = matchesProcessFilter;
  window.filterCoffeesByProcess = filterCoffeesByProcess;
  window.getCoffeeDisplayName = getCoffeeDisplayName;
  window.updateCoffeeSelectOptions = updateCoffeeSelectOptions;
}