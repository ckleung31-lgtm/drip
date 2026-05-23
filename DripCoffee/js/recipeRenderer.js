// ========================================
// Green Door Coffee
// recipeRenderer.js - 食譜渲染引擎
// 支援 Filter / Espresso / Iced Coffee
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

  // 額外顯示變量（for bypass / iced）
  let extraRecipeItems = "";
  let bypassAmount = 0;
  if (intention === "iced-drip") {
    bypassAmount = 100;
  }

  // CLARITY
  if (intention === "clarity-sweet" || intention === "iced-drip"){
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

  // ======================================
  // CLARITY SWEET (BYPASS)
  // ======================================
  if (intention === "clarity-sweet") {
    temp += 1;
    ratio = "1:16.5";
    grind = "細 · Fine (比正常幼半格)";
    flow = "低擾動、中心注水 + Bypass · Low agitation, center pour + Bypass";
    intentionTitle = "清澈甜感";
    intentionEn = "Clean & Sweet (Bypass)";
    philosophy = `
      This recipe uses fine grind + low agitation + bypass.
      Fine grind increases sweetness and extraction,
      while bypass prevents over-extraction of fines.
      <br><br>
      本配方採用幼研磨 + 低擾動 + Bypass 溝水。
      幼研磨提升甜感與萃取率，
      Bypass 則避免細粉過萃帶嚟嘅苦澀。
    `;

    pours = [
      { title: "Bloom Saturation", amount: "50ml", timing: "0:00 – 0:35", note: "Slow center pour, minimal agitation." },
      { title: "Main Extraction", amount: "120ml", timing: "0:35 – 1:10", note: "Stable center pour." },
      { title: "Finishing Pour", amount: "80ml", timing: "1:10 – 1:30", note: "Last water through coffee bed." }
    ];

    const totalWater = 280;
    const suggestedDose = 16.7;

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

    bypassAmount = 30;
  }

  if (intention === "iced-drip") {

      temp = 93;

      ratio = "1:13";

      grind =
        "White sugar-like";

      flow =
        "Low agitation / slow center pour";

      intentionTitle =
        "凍滴濾泡";

      intentionEn =
        "Iced Drip Coffee";

      philosophy = `
        This recipe uses concentrated hot extraction
        with controlled ice dilution.

        Low agitation preserves clarity while
        bypass ice tightens texture and sweetness.

        <br><br>

        本配方使用高濃度熱萃取配合冰塊稀釋。

        低擾動保留清晰度，
        冰塊後段稀釋令口感更緊緻、甜感更集中。
      `;

      pours = [

        {
          title: "Bloom Saturation",
          amount: "40g",
          timing: "0:00 – 0:35",
          note: "Gentle bloom with minimal agitation."
        },

        {
          title: "Main Extraction",
          amount: "80g",
          timing: "0:35 – 1:05",
          note: "Slow center pour."
        },

        {
          title: "Finish Pour",
          amount: "40g",
          timing: "1:05 – 1:25",
          note: "Maintain stable bed dynamics."
        }

      ];

      extraRecipeItems = `
        <div class="recipe-item">
          <h3>咖啡粉量 · Coffee Dose</h3>
          <p>16g</p>
        </div>

        <div class="recipe-item">
          <h3>熱水量 · Brew Water</h3>
          <p>160g</p>
        </div>

        <div class="recipe-item">
          <h3>冰量 · Ice</h3>
          <p>100g</p>
        </div>

        <div class="recipe-item">
          <h3>最終飲品量 · Final Beverage</h3>
          <p>260g</p>
        </div>
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

  // 製作 bypass HTML（只有 clarity-sweet 先有）
  const bypassHTML = bypassAmount > 0 ? `
    <div class="pour-step" style="background: #e8efe2;">
      <div class="pour-title">✨ Bypass 溝水 · Bypass</div>
      <div class="pour-detail">
        加入 ${bypassAmount}ml 純水 · Add ${bypassAmount}ml clean water
        <br><br>
        直接倒入咖啡液中，輕輕攪拌均勻。
      </div>
    </div>
  ` : "";

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
        ${extraRecipeItems}
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
      ${bypassHTML}
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