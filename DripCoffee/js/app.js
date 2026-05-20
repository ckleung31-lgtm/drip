// ========================================
// Coffee Brewing Philosophy
// app.js
// ========================================


const brewBtn = document.getElementById("brewBtn");

brewBtn.addEventListener("click", generateRecipe);


// ========================================
// MAIN
// ========================================

function generateRecipe(){

  const originKey =
    document.getElementById("origin").value;

  const processKey =
    document.getElementById("process").value;

  const roast =
    document.getElementById("roast").value;

  const brewStyleKey =
    document.getElementById("brewStyle").value;

  const flavorKey =
    document.getElementById("targetFlavor").value;


  const origin =
    origins[originKey];

  const process =
    processes[processKey];

  const brewStyle =
    brewStyles[brewStyleKey];

  const flavor =
    flavorTargets[flavorKey];


  // ========================================
  // BASE RECIPE
  // ========================================

  let waterTemp = 92;
  let ratio = "1:15";
  let grind = "Medium Fine";


  // ========================================
  // ROAST ADJUSTMENT
  // ========================================

  if(roast === "light"){
    waterTemp += 2;
    grind = "Medium Fine";
  }

  if(roast === "medium"){
    waterTemp += 0;
    grind = "Medium";
  }

  if(roast === "dark"){
    waterTemp -= 3;
    grind = "Medium Coarse";
    ratio = "1:16";
  }


  // ========================================
  // PROCESS ADJUSTMENT
  // ========================================

  waterTemp += process.brewAdjustments.temp;


  // ========================================
  // BREW STYLE ADJUSTMENT
  // ========================================

  waterTemp += brewStyle.adjustments.temp;

  ratio = brewStyle.adjustments.ratio;


  // ========================================
  // FLAVOR TARGET ADJUSTMENT
  // ========================================

  waterTemp += flavor.adjustments.temp;

  grind = flavor.adjustments.grind;

  ratio = flavor.adjustments.ratio;


  // ========================================
  // WARNING SYSTEM
  // ========================================

  let warning = "";

  if(
    !origin.commonProcesses.includes(processKey)
  ){

    warning = `
      ⚠ ${origin.name} 較少使用
      ${process.name}，
      風味可能與典型產區表現不同。
    `;

  }


  // ========================================
  // ANALYSIS
  // ========================================

  const beanAnalysis = `
    ${origin.name} 通常具有
    ${origin.notes.join("、")}
    等特性。

    ${process.name}
    會進一步影響甜感、
    clarity 與發酵感表現。
  `;


  const philosophyAnalysis = `
    ${brewStyle.name}
    傾向透過注水節奏、
    擾流與 extraction strategy
    去控制風味走向。
  `;


  // ========================================
  // SYSTEM CONCLUSION
  // ========================================

  let conclusion = `
    系統目前傾向提升
    clarity 與 sweetness balance，
    並控制尾段 extraction，
    避免風味混濁。
  `;


  if(processKey.includes("anaerobic")){

    conclusion = `
      由於厭氧處理本身具有較高發酵感，
      系統降低攪動程度，
      避免酒感與過熟水果感過強。
    `;

  }


  if(processKey === "wet-hulled"){

    conclusion = `
      Wet Hulled 豆子通常具有厚重 body
      與 earthy character。

      系統降低水溫與擾流，
      避免 muddy mouthfeel。
    `;

  }


  if(
    brewStyleKey === "nordic"
    &&
    roast === "light"
  ){

    conclusion = `
      Nordic 高萃取風格配合淺焙，
      將提高透明感與明亮酸質。

      建議控制尾段 extraction，
      避免乾澀感。
    `;

  }


  // ========================================
  // BREWING ADVICE
  // ========================================

  const advice = [

    {
      issue: "如果過酸",
      fix: `
        研磨略細、
        提高 1°C 水溫，
        或延長尾段注水。
      `
    },

    {
      issue: "如果過苦",
      fix: `
        降低攪動、
        略粗研磨，
        或減少尾段 extraction。
      `
    },

    {
      issue: "如果甜感不足",
      fix: `
        延長 bloom 5-10 秒，
        並保持穩定中心注水。
      `
    }

  ];


  // ========================================
  // RENDER
  // ========================================

  renderResult({

    waterTemp,
    ratio,
    grind,

    pours:
      brewStyle.pours,

    warning,

    beanAnalysis,
    philosophyAnalysis,
    conclusion,

    advice,

    flavor,

    brewStyle

  });

}



// ========================================
// RENDER RESULT
// ========================================

function renderResult(data){

  const result =
    document.getElementById("result");

  const warningBox =
    document.getElementById("warning");


  // ========================================
  // WARNING
  // ========================================

  if(data.warning){

    warningBox.innerHTML = `
      <div class="warning">
        ${data.warning}
      </div>
    `;

  }else{

    warningBox.innerHTML = "";

  }


  // ========================================
  // HTML
  // ========================================

  result.innerHTML = `

    <!-- TITLE -->

    <h2 class="section-title">
      ☕ Brewing Recipe
    </h2>



    <!-- RECIPE GRID -->

    <div class="recipe-grid">

      <div class="recipe-item">

        <h3>
          Water Temperature
        </h3>

        <p>
          ${data.waterTemp}°C
        </p>

      </div>


      <div class="recipe-item">

        <h3>
          Brew Ratio
        </h3>

        <p>
          ${data.ratio}
        </p>

      </div>


      <div class="recipe-item">

        <h3>
          Grind Size
        </h3>

        <p>
          ${data.grind}
        </p>

      </div>


      <div class="recipe-item">

        <h3>
          Brewing Philosophy
        </h3>

        <p>
          ${data.brewStyle.name}
        </p>

      </div>

    </div>



    <!-- POUR STRUCTURE -->

    <h2 class="section-title">
      Pour Structure 注水結構
    </h2>


  ${data.pours.map(pour => `
  
    <div class="pour-step">
  
      <div class="pour-title">
  
        ${pour.en}
        ${pour.zh}
  
      </div>
  
      <div class="pour-detail">
  
        ${pour.water}
        ｜
        ${pour.time}
  
      </div>
  
    </div>
  
  `).join("")}



    <!-- EXTRACTION INTENT -->

    <h2 class="section-title">
      Extraction Intent 萃取方向
    </h2>

    <div class="intent-list">

      <div class="intent-item">
        ✓ 提升透明感 Clarity
      </div>

      <div class="intent-item">
        ✓ 控制尾段萃取
      </div>

      <div class="intent-item">
        ✓ 保持甜感平衡
      </div>

    </div>



    <!-- ANALYSIS -->

    <h2 class="section-title">
      Coffee Analysis 咖啡分析
    </h2>


    <div class="analysis-card">

      <p>
        ${data.beanAnalysis}
      </p>

      <p>
        ${data.philosophyAnalysis}
      </p>

      <div class="analysis-highlight">

        ${data.conclusion}

      </div>

    </div>



    <!-- FLAVOR TARGET -->

    <h2 class="section-title">
      Flavor Direction 風味方向
    </h2>


    <div class="tag">

      ${data.flavor.name}

    </div>



    <!-- BREWING ADVICE -->

    <h2 class="section-title">
      Brewing Advice 沖煮修正
    </h2>


    <div class="advice-card">

      ${data.advice.map(item => `

        <div class="advice-item">

          <strong>
            ${item.issue}
          </strong>

          <div>
            ${item.fix}
          </div>

        </div>

      `).join("")}

    </div>



    <!-- NOTES -->

    <h2 class="section-title">
      Brewing Notes 沖煮備註
    </h2>


    <div class="notes">

      系統會根據：
      豆子特性、
      處理法、
      烘焙度、
      沖煮哲學與目標風味，
      動態調整 extraction strategy。

      建議實際沖煮時，
      再按 grinder、
      水質與咖啡新鮮度微調。

    </div>

  `;

}