// ========================================
// Green Door Coffee
// recipeRenderer.js - 食譜渲染引擎
// 支援 Filter 同 Espresso
// 注水步驟中英對照 · 研磨度統一翻譯
// ========================================

// ========================================
// 輔助函數：研磨度中英對照
// ========================================
function getBilingualGrind(grindEn) {
  const translations = {
    "Between table salt and white sugar": "食鹽與砂糖之間 · Between table salt and white sugar",
    "White sugar-like": "砂糖粗幼 · White sugar-like",
    "Between white sugar and coarse sugar": "砂糖與粗砂糖之間 · Between white sugar and coarse sugar",
    "Table salt-like": "食鹽粗幼 · Table salt-like",
    "Fine table salt-like": "幼食鹽粗幼 · Fine table salt-like"
  };
  return translations[grindEn] || grindEn;
}

// ========================================
// 輔助函數：注水步驟標題中英對照
// ========================================
function getBilingualPourTitle(title) {
  const translations = {
    "Bloom Saturation": "注水悶蒸 · Bloom Saturation",
    "Main Extraction": "主萃取 · Main Extraction",
    "Sweetness Development": "甜感發展 · Sweetness Development",
    "Finishing Pour": "收尾注水 · Finishing Pour",
    "Bloom": "悶蒸 · Bloom",
    "Main Pour": "主注水 · Main Pour",
    "Sweet Finish": "甜感收尾 · Sweet Finish",
    "Controlled Bloom": "控制悶蒸 · Controlled Bloom",
    "Body Development": "口感發展 · Body Development",
    "Extended Bloom": "延長悶蒸 · Extended Bloom",
    "Clarity Finish": "清澈收尾 · Clarity Finish",
    "Fruit Development": "果味發展 · Fruit Development",
    "Fruit Layering": "果味層疊 · Fruit Layering",
    "Texture Development": "質感發展 · Texture Development"
  };
  return translations[title] || `${title}`;
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

  // CLARITY
  if (intention === "clarity") {
    temp += 1;
    ratio = "1:16.5";
    flow = "低擾動／中心注水 · Low agitation / gentle centre pour";
    intentionTitle = "花香／茶感 · 清澈";
    intentionEn = "Floral / Tea-like Clarity";
    philosophy = `
      This recipe prioritises cup clarity, aromatic transparency, and elegant acidity structure.
      Lower turbulence and extended extraction help preserve delicate florals and tea-like texture.
      <br><br>
      本配方優先呈現風味清晰度、香氣透明感與優雅酸質結構。
      低擾動與延長萃取有助於保留細膩花香與茶感質地。
    `;
  }

  // BALANCED
  if (intention === "balanced") {
    intentionTitle = "平衡甜感";
    intentionEn = "Balanced Sweetness";
    philosophy = `
      This recipe aims to balance sweetness, acidity, and tactile structure.
      Moderate agitation maintains both flavour clarity and body development.
      <br><br>
      本配方旨在平衡甜感、酸質與口感結構。
      中度擾動同時維持風味清晰度與醇厚感發展。
    `;
  }

  // BODY
  if (intention === "body") {
    temp -= 1;
    ratio = "1:15";
    flow = "中度擾動／低水流阻力 · Medium agitation / lower flow resistance";
    grind = "Between table salt and white sugar";
    intentionTitle = "厚重口感／朱古力";
    intentionEn = "Heavy Body / Chocolate";
    philosophy = `
      This recipe increases tactile structure and sweetness density.
      Slightly lower ratio and stronger extraction encourage syrupy mouthfeel and heavier body expression.
      <br><br>
      本配方增強口感結構與甜感濃度。
      稍低的粉水比與更強萃取帶來糖漿般口感與更厚重風味表現。
    `;
  }

  // FUNKY
  if (intention === "funky") {
    temp -= 1;
    ratio = "1:15";
    flow = "控制性低擾動 · Controlled low agitation";
    intentionTitle = "發酵感／酒香";
    intentionEn = "Funky / Fermentation Forward";
    philosophy = `
      This recipe highlights fermentation character, fruit saturation, and expressive sweetness.
      Controlled agitation prevents excessive harshness while allowing funkier notes to remain vivid.
      <br><br>
      本配方突顯發酵風味、水果飽滿度與奔放甜感。
      控制性擾動避免過度刺激，同時保留發酵感的鮮明度。
    `;
  }

  // 研磨度中英對照
  const grindDisplay = getBilingualGrind(grind);

  // NOTES
  const notesHTML = coffee.notes.map(note => `<div class="tag">${note}</div>`).join("");

  // POURS
  const poursHTML = pours.map(pour => {
    const bilingualTitle = getBilingualPourTitle(pour.title);
    return `
      <div class="pour-step">
        <div class="pour-title">${bilingualTitle}</div>
        <div class="pour-detail">
          ${pour.amount} · ${pour.timing}
          <br><br>
          ${pour.note}
        </div>
      </div>
    `;
  }).join("");

  // RENDER
  return `
    <div class="result-section">
      <div class="coffee-name">${coffee.shortName}</div>
      <div class="coffee-meta">
        ${coffee.origin} · ${coffee.process} · ${coffee.roast}
      </div>
      <div class="tag-list">${notesHTML}</div>
    </div>

    <div class="result-section">
      <div class="section-title">沖煮意向 · Brewing Intention</div>
      <div class="analysis-highlight">
        ${intentionTitle} · ${intentionEn}
      </div>
    </div>

    <div class="result-section">
      <div class="section-title">沖煮參數 · Brewing Recipe</div>
      <div class="recipe-grid">
        <div class="recipe-item">
          <h3>水溫 · Water Temperature</h3>
          <p>${temp}°C</p>
        </div>
        <div class="recipe-item">
          <h3>粉水比 · Brew Ratio</h3>
          <p>${ratio}</p>
        </div>
        <div class="recipe-item">
          <h3>研磨度 · Grind</h3>
          <p>${grindDisplay}</p>
        </div>
        <div class="recipe-item">
          <h3>注水方式 · Flow Style</h3>
          <p>${flow}</p>
        </div>
      </div>
    </div>

    <div class="result-section">
      <div class="section-title">注水結構 · Pour Structure</div>
      ${poursHTML}
    </div>

    <div class="result-section">
      <div class="section-title">沖煮理念 · Brewing Philosophy</div>
      <div class="analysis">
        <p>${philosophy}</p>
        <div class="analysis-highlight">
          ${coffee.shortName} 適合穩定萃取水流與平穩濾床動力學。<br>
          ${coffee.shortName} performs best with controlled extraction flow and stable bed dynamics.
        </div>
      </div>
    </div>
  `;
}

// ========================================
// ESPRESSO RECIPE
// ========================================
function renderEspressoRecipe(coffee, intention) {
  let ratio = coffee.brewBias.ratio;
  let shotTime = coffee.brewBias.shotTime;
  let philosophy = "";
  let intentionTitle = "";
  let intentionEn = "";

  // CLARITY
  if (intention === "clarity") {
    ratio = "1:2.3";
    shotTime = "24 – 28 秒 · seconds";
    intentionTitle = "花香／茶感 · 清澈";
    intentionEn = "Floral / Tea-like Clarity";
    philosophy = `
      Higher yield ratio promotes flavour separation and cleaner finish.
      <br><br>
      較高萃取比例促進風味分離與更乾淨的收尾。
    `;
  }

  // BALANCED
  if (intention === "balanced") {
    intentionTitle = "平衡甜感";
    intentionEn = "Balanced Sweetness";
    philosophy = `
      This recipe balances body, sweetness, and finish clarity.
      <br><br>
      本配方平衡醇厚度、甜感與收尾清晰度。
    `;
  }

  // BODY
  if (intention === "body") {
    ratio = "1:1.8";
    shotTime = "30 – 34 秒 · seconds";
    intentionTitle = "厚重口感／朱古力";
    intentionEn = "Heavy Body / Chocolate";
    philosophy = `
      Lower yield ratio increases crema density and tactile sweetness.
      <br><br>
      較低萃取比例增加 Crema 密度與口感甜感。
    `;
  }

  // FUNKY
  if (intention === "funky") {
    ratio = "1:2";
    shotTime = "26 – 30 秒 · seconds";
    intentionTitle = "發酵感／酒香";
    intentionEn = "Funky / Fermentation Forward";
    philosophy = `
      This recipe allows fruit-forward character and fermentation complexity to remain expressive.
      <br><br>
      本配方讓水果調性與發酵複雜度保持奔放。
    `;
  }

  // 研磨度中英對照
  const grindDisplay = getBilingualGrind(coffee.brewBias.grind);

  // 溫度處理（確保係 number）
  let tempValue = coffee.brewBias.temp;
  if (typeof tempValue === "string") {
    const match = tempValue.match(/(\d+)/);
    if (match) tempValue = parseInt(match[0], 10);
    else tempValue = 93;
  }

  // NOTES
  const notesHTML = coffee.notes.map(note => `<div class="tag">${note}</div>`).join("");

  // RENDER
  return `
    <div class="result-section">
      <div class="coffee-name">${coffee.shortName}</div>
      <div class="coffee-meta">
        ${coffee.origin} · ${coffee.process} · ${coffee.roast}
      </div>
      <div class="tag-list">${notesHTML}</div>
    </div>

    <div class="result-section">
      <div class="section-title">沖煮意向 · Brewing Intention</div>
      <div class="analysis-highlight">
        ${intentionTitle} · ${intentionEn}
      </div>
    </div>

    <div class="result-section">
      <div class="section-title">濃縮參數 · Espresso Recipe</div>
      <div class="recipe-grid">
        <div class="recipe-item">
          <h3>水溫 · Water Temperature</h3>
          <p>${tempValue}°C</p>
        </div>
        <div class="recipe-item">
          <h3>粉水比 · Brew Ratio</h3>
          <p>${ratio}</p>
        </div>
        <div class="recipe-item">
          <h3>研磨度 · Grind</h3>
          <p>${grindDisplay}</p>
        </div>
        <div class="recipe-item">
          <h3>萃取時間 · Shot Time</h3>
          <p>${shotTime}</p>
        </div>
      </div>
    </div>

    <div class="result-section">
      <div class="section-title">沖煮理念 · Brewing Philosophy</div>
      <div class="analysis">
        <p>${philosophy}</p>
        <div class="analysis-highlight">
          ${coffee.shortName} 適合穩定水流阻力與控制性萃取發展。<br>
          ${coffee.shortName} performs best with stable flow resistance and controlled extraction development.
        </div>
      </div>
    </div>
  `;
}

// ========================================
// MAIN GENERATOR
// ========================================
function generateRecipeHTML(coffee, intention) {
  if (!coffee) return "";
  if (coffee.type === "filter") {
    return renderFilterRecipe(coffee, intention);
  } else {
    return renderEspressoRecipe(coffee, intention);
  }
}

// 全域 expose
if (typeof window !== "undefined") {
  window.getBilingualGrind = getBilingualGrind;
  window.getBilingualPourTitle = getBilingualPourTitle;
  window.renderFilterRecipe = renderFilterRecipe;
  window.renderEspressoRecipe = renderEspressoRecipe;
  window.generateRecipeHTML = generateRecipeHTML;
}