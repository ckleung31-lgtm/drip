// ========================================
// Green Door Coffee
// recipeRenderer.js
// Filter + Espresso Recipe Engine
// Clean Version
// ========================================

// ========================================
// 研磨度中英對照
// ========================================
function getBilingualGrind(grindEn) {

  const translations = {
    "Between table salt and white sugar":"食鹽與砂糖之間 · Between table salt and white sugar",
    "White sugar-like":"砂糖粗幼 · White sugar-like",
    "Between white sugar and coarse sugar":"砂糖與粗砂糖之間 · Between white sugar and coarse sugar",
    "Table salt-like":"食鹽粗幼 · Table salt-like",
    "Fine table salt-like":"幼食鹽粗幼 · Fine table salt-like"
  };

  return translations[grindEn] || grindEn;
}

// ========================================
// 注水步驟中英對照
// ========================================
function getBilingualPourTitle(title) {

  const translations = {
    "Bloom Saturation":"注水悶蒸 · Bloom Saturation",
    "Main Extraction":"主萃取 · Main Extraction",
    "Sweetness Development":"甜感發展 · Sweetness Development",
    "Finishing Pour":"收尾注水 · Finishing Pour",
    "Bloom":"悶蒸 · Bloom",
    "Main Pour":"主注水 · Main Pour",
    "Sweet Finish":"甜感收尾 · Sweet Finish",
    "Controlled Bloom":"控制悶蒸 · Controlled Bloom",
    "Body Development":"口感發展 · Body Development",
    "Extended Bloom":"延長悶蒸 · Extended Bloom",
    "Clarity Finish":"清澈收尾 · Clarity Finish",
    "Fruit Development":"果味發展 · Fruit Development",
    "Fruit Layering":"果味層疊 · Fruit Layering",
    "Texture Development":"質感發展 · Texture Development"
  };

  return translations[title] || title;
}

// ========================================
// 計算總注水量
// ========================================
function calculateTotalWater(pours) {
  let total = 0;
  pours.forEach(p => {
    total += parseFloat(p.amount);
  });
  return total;
}

// ========================================
// FILTER RECIPE
// ========================================
function renderFilterRecipe(coffee, intention) {

  let temp = coffee.brewBias.temp;
  let ratio = coffee.brewBias.ratio;
  let grind = coffee.brewBias.grind;
  let flow = coffee.brewBias.flow;
  let pours = [...coffee.brewBias.pours];

  let philosophy = "";
  let intentionTitle = "";
  let intentionEn = "";

  let bypassAmount = 0;
  let bypassType = "";

  let suggestedDose = 15.5;
  let totalWater = 250;

  // ========================================
  // CLARITY
  // ========================================
  if (intention === "clarity") {
    temp += 1;
    ratio = "1:16";
    flow = "低擾動／中心注水 · Low agitation / gentle centre pour";
    intentionTitle = "花香／茶感 · 清澈";
    intentionEn = "Floral / Tea-like Clarity";
    philosophy = `
      本配方優先呈現風味清晰度與香氣透明感。
      <br><br>
      This recipe prioritises floral clarity
      and elegant tea-like structure.
    `;
    pours = [
      {
        title: "Bloom Saturation",
        amount: "50ml",
        timing: "0:00 – 0:40",
        note: "Minimal agitation for floral clarity."
      },
      {
        title: "Main Extraction",
        amount: "100ml",
        timing: "0:40 – 1:20",
        note: "Stable centre pour."
      },
      {
        title: "Sweetness Development",
        amount: "80ml",
        timing: "1:20 – 2:00",
        note: "Maintain gentle turbulence."
      },
      {
        title: "Finishing Pour",
        amount: "50ml",
        timing: "2:00 – 2:30",
        note: "Lower agitation for clean finish."
      }
    ];

    totalWater = 280;
    suggestedDose = 17.5;
  }

  // ========================================
  // BALANCED
  // ========================================
  else if (intention === "balanced") {
    intentionTitle = "平衡甜感";
    intentionEn = "Balanced Sweetness";
    philosophy = `
      本配方平衡甜感、酸質與口感結構。
      <br><br>
      This recipe balances sweetness,
      acidity and tactile structure.
    `;
    pours = [
      {
        title: "Bloom",
        amount: "50ml",
        timing: "0:00 – 0:35",
        note: "Even saturation."
      },
      {
        title: "Main Pour",
        amount: "120ml",
        timing: "0:35 – 1:15",
        note: "Maintain stable flow."
      },
      {
        title: "Sweet Finish",
        amount: "80ml",
        timing: "1:15 – 1:55",
        note: "Reduce turbulence near finish."
      }
    ];

    totalWater = 250;
    suggestedDose = 16.1;
  }

  // ========================================
  // BODY
  // ========================================
  else if (intention === "body") {
    temp -= 1;
    ratio = "1:15";
    grind = "Between table salt and white sugar";
    flow = "中度擾動／低水流阻力 · Medium agitation";
    intentionTitle = "厚重口感／朱古力";
    intentionEn = "Heavy Body / Chocolate";
    philosophy = `
      本配方增加甜感密度與厚重口感。
      <br><br>
      This recipe increases tactile structure
      and syrupy sweetness.
    `;
    pours = [
      {
        title: "Bloom",
        amount: "50ml",
        timing: "0:00 – 0:30",
        note: "Reduce turbulence."
      },
      {
        title: "Main Extraction",
        amount: "120ml",
        timing: "0:30 – 1:10",
        note: "Stable water level."
      },
      {
        title: "Texture Development",
        amount: "80ml",
        timing: "1:10 – 1:50",
        note: "Slow controlled finish."
      }
    ];

    totalWater = 250;
    suggestedDose = 16.7;
  }

  // ========================================
  // FUNKY
  // ========================================
  else if (intention === "funky") {
    temp -= 1;
    ratio = "1:15";
    flow = "控制性低擾動 · Controlled low agitation";
    intentionTitle = "發酵感／酒香";
    intentionEn = "Funky / Fermentation Forward";
    philosophy = `
      本配方突顯發酵感、水果飽滿度與酒香結構。
      <br><br>
      This recipe highlights fermentation character
      and expressive sweetness.
    `;

    pours = [
      {
        title: "Controlled Bloom",
        amount: "50ml",
        timing: "0:00 – 0:35",
        note: "Avoid excessive turbulence."
      },
      {
        title: "Sweetness Extraction",
        amount: "100ml",
        timing: "0:35 – 1:10",
        note: "Stable extraction."
      },
      {
        title: "Body Development",
        amount: "80ml",
        timing: "1:10 – 1:50",
        note: "Slow syrupy finish."
      }
    ];

    totalWater = 230;
    suggestedDose = 15.3;
  }

  // ========================================
  // CLARITY SWEET
  // ========================================
  else if (intention === "clarity-sweet") {
    temp += 1;
    ratio = "1:14.2 + bypass";
    grind = "細 · Fine (比正常幼半格)";
    flow = "低擾動、中心注水 + Bypass · Low agitation, center pour + Bypass";
    intentionTitle = "清澈甜感";
    intentionEn = "Clean & Sweet (Bypass)";
    philosophy = `
      本配方核心為高甜感萃取 + 控制性 bypass。
      <br><br>
      Fine grind increases sweetness extraction,
      while small bypass softens texture
      without losing clarity.
    `;
    pours = [
      {
        title: "Bloom Saturation",
        amount: "40ml",
        timing: "0:00 – 0:35",
        note: "Slow center pour. Minimal agitation."
      },
      {
        title: "Main Extraction",
        amount: "100ml",
        timing: "0:35 – 1:10",
        note: "Maintain stable coffee bed."
      },
      {
        title: "Finishing Pour",
        amount: "80ml",
        timing: "1:10 – 1:30",
        note: "Gentle center finish."
      }
    ];

    totalWater = 220;
    suggestedDose = 15.5;
    bypassAmount = 20;
    bypassType = "water";
  }

  // ========================================
  // ICED DRIP
  // ========================================
  else if (intention === "iced-drip") {
    temp = 92;
    ratio = "Hot Brew 1:10.6 · Final ~1:15";
    grind = "比正常手沖幼半格 · Slightly finer than normal";
    flow = "低擾動、中心注水 · Low agitation, center pour";
    intentionTitle = "凍滴濾泡 · 清爽甜感";
    intentionEn = "Iced Drip Coffee";
    philosophy = `
      本配方採用高濃度熱萃取，
      再利用冰塊 bypass 稀釋。

      <br><br>

      This recipe uses concentrated extraction
      followed by ice dilution,
      producing a sweet and refreshing iced filter coffee.
    `;

    pours = [

      {
        title: "Bloom",
        amount: "40ml",
        timing: "0:00 – 0:35",
        note: "中心細水流，低擾動悶蒸。"
      },

      {
        title: "Main Extraction",
        amount: "90ml",
        timing: "0:35 – 1:05",
        note: "保持低水位與穩定粉床。"
      },

      {
        title: "Finishing Pour",
        amount: "40ml",
        timing: "1:05 – 1:25",
        note: "中心收尾，避免過度攪動。"
      }

    ];
    totalWater = 170;
    suggestedDose = 16;
    bypassAmount = 70;
    bypassType = "ice";
  }

  // ========================================
  // Extra Recipe Items
  // ========================================
  let extraRecipeItems = "";

  // ICED
  if (intention === "iced-drip") {

    extraRecipeItems = `

      <div class="recipe-item">
        <h3>建議粉量 · Coffee Dose</h3>
        <p>${suggestedDose}g</p>
      </div>

      <div class="recipe-item">
        <h3>通過粉床水量 · Water Through Bed</h3>
        <p>${totalWater}ml</p>
      </div>

      <div class="recipe-item">
        <h3>冰塊 · Ice Bypass</h3>
        <p>${bypassAmount}g</p>
      </div>

      <div class="recipe-item">
        <h3>最終飲品量 · Final Beverage</h3>
        <p>約 ${totalWater + bypassAmount}ml</p>
      </div>

    `;
  }

  // CLARITY SWEET
  else if (intention === "clarity-sweet") {

    extraRecipeItems = `

      <div class="recipe-item">
        <h3>建議粉量 · Coffee Dose</h3>
        <p>${suggestedDose}g</p>
      </div>

      <div class="recipe-item">
        <h3>通過粉床水量 · Water Through Bed</h3>
        <p>${totalWater}ml</p>
      </div>

      <div class="recipe-item">
        <h3>Bypass 水量 · Bypass Water</h3>
        <p>${bypassAmount}ml</p>
      </div>

      <div class="recipe-item">
        <h3>最終杯量 · Final Beverage</h3>
        <p>約 ${totalWater + bypassAmount}ml</p>
      </div>

    `;
  }

  // NORMAL
  else {

    extraRecipeItems = `

      <div class="recipe-item">
        <h3>建議粉量 · Coffee Dose</h3>
        <p>${suggestedDose}g</p>
      </div>

      <div class="recipe-item">
        <h3>總注水量 · Total Water</h3>
        <p>${totalWater}ml</p>
      </div>

    `;
  }

  // ========================================
  // Notes
  // ========================================
  const notesHTML =
    coffee.notes
      .map(note => `<div class="tag">${note}</div>`)
      .join("");

  // ========================================
  // Pours
  // ========================================
  const poursHTML = pours.map(pour => {

    const bilingualTitle =
      getBilingualPourTitle(pour.title);

    return `

      <div class="pour-step">

        <div class="pour-title">
          ${bilingualTitle}
        </div>

        <div class="pour-detail">

          ${pour.amount}
          ·
          ${pour.timing}

          <br><br>

          ${pour.note}

        </div>

      </div>

    `;

  }).join("");

  // ========================================
  // Bypass HTML
  // ========================================
  const bypassHTML = bypassAmount > 0 ? `

    <div class="pour-step" style="background: #e8efe2;">

      <div class="pour-title">

        ${
          bypassType === "ice"
            ? "❄️ 冰塊稀釋 · Ice Dilution"
            : "✨ Bypass 溝水 · Bypass"
        }

      </div>

      <div class="pour-detail">

        ${
          bypassType === "ice"

            ? `
              先於分享壺加入 ${bypassAmount}g 冰塊。
              <br><br>
              Place ${bypassAmount}g ice in server before brewing.
              <br><br>
              咖啡直接萃取落冰塊上，自然融冰降溫。
            `

            : `
              加入 ${bypassAmount}ml 純水於分享壺中。
              <br><br>
              Add ${bypassAmount}ml clean water into server.
              <br><br>
              直接倒入咖啡液中，輕輕攪拌均勻。
            `
        }

      </div>

    </div>

  ` : "";

  // ========================================
  // Render
  // ========================================
  return `

    <div class="result-section">

      <div class="coffee-name">
        ${coffee.shortName}
      </div>

      <div class="coffee-meta">
        ${coffee.origin}
        ·
        ${coffee.process}
        ·
        ${coffee.roast}
      </div>

      <div class="tag-list">
        ${notesHTML}
      </div>

    </div>

    <div class="result-section">

      <div class="section-title">
        沖煮意向 · Brewing Intention
      </div>

      <div class="analysis-highlight">
        ${intentionTitle}
        ·
        ${intentionEn}
      </div>

    </div>

    <div class="result-section">

      <div class="section-title">
        沖煮參數 · Brewing Recipe
      </div>

      <div class="recipe-grid">

        <div class="recipe-item">
          <h3>水溫 · Water Temperature</h3>
          <p>${temp}°C</p>
        </div>

        <div class="recipe-item">
          <h3>粉水比 · Brew Ratio</h3>
          <p>${ratio}</p>
        </div>

        ${extraRecipeItems}

        <div class="recipe-item">
          <h3>研磨度 · Grind</h3>
          <p>${getBilingualGrind(grind)}</p>
        </div>

        <div class="recipe-item">
          <h3>注水方式 · Flow Style</h3>
          <p>${flow}</p>
        </div>

      </div>

    </div>

    <div class="result-section">

      <div class="section-title">
        注水結構 · Pour Structure
      </div>

      ${poursHTML}

      ${bypassHTML}

    </div>

    <div class="result-section">

      <div class="section-title">
        沖煮理念 · Brewing Philosophy
      </div>

      <div class="analysis">
        <p>${philosophy}</p>
      </div>

    </div>
  `;
}

// ========================================
// ESPRESSO
// ========================================
function renderEspressoRecipe(coffee, intention) {
  return `
    <div class="result-section">
      <div class="coffee-name">
        ${coffee.shortName}
      </div>

      <div class="coffee-meta">
        ${coffee.origin}
        ·
        ${coffee.process}
        ·
        ${coffee.roast}
      </div>

      <div class="analysis-highlight">
        Espresso recipe coming soon.
      </div>
    </div>
  `;
}

// ========================================
// MAIN
// ========================================
function generateRecipeHTML(coffee, intention) {
  if (!coffee) return "";
  if (coffee.type === "filter") {
    return renderFilterRecipe(coffee, intention);
  }
  return renderEspressoRecipe(coffee, intention);
}

// ========================================
// Global expose
// ========================================
if (typeof window !== "undefined") {
  window.getBilingualGrind = getBilingualGrind;
  window.getBilingualPourTitle = getBilingualPourTitle;
  window.renderFilterRecipe = renderFilterRecipe;
  window.renderEspressoRecipe = renderEspressoRecipe;
  window.generateRecipeHTML = generateRecipeHTML;
}