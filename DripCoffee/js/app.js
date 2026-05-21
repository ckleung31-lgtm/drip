// ========================================
// Green Door Coffee
// app.js
// Dynamic Brewing Engine
// ========================================

const brewType =
  document.getElementById("brewType");

const coffeeSelect =
  document.getElementById("coffeeSelect");

const flavorSelect =
  document.getElementById("flavorSelect");

const generateBtn =
  document.getElementById("generateBtn");

const result =
  document.getElementById("result");


// ========================================
// INIT
// ========================================

populateCoffees();
generateRecipe();

brewType.addEventListener(
  "change",
  () => {

    populateCoffees();
    generateRecipe();

  }
);

generateBtn.addEventListener(
  "click",
  generateRecipe
);


// ========================================
// POPULATE COFFEE LIST
// ========================================

function populateCoffees(){

  coffeeSelect.innerHTML = "";

  const filtered =
    coffees.filter(coffee =>
      coffee.type === brewType.value
    );

  filtered.forEach(coffee => {

    const option =
      document.createElement("option");

    option.value =
      coffee.id;

    option.innerText =
      coffee.fullName;

    coffeeSelect.appendChild(option);

  });

}


// ========================================
// MAIN GENERATOR
// ========================================

function generateRecipe(){

  document
    .getElementById("resultPlaceholder")
    .style.display = "none";

  const coffee =
    coffees.find(c =>
      c.id === coffeeSelect.value
    );

  if(!coffee) return;

  const intention =
    flavorSelect.value;

  if(coffee.type === "filter"){

    renderFilterRecipe(
      coffee,
      intention
    );

  } else {

    renderEspressoRecipe(
      coffee,
      intention
    );

  }

}


// ========================================
// FILTER ENGINE
// ========================================

function renderFilterRecipe(
  coffee,
  intention
){

  let temp =
    coffee.brewBias.temp;

  let ratio =
    coffee.brewBias.ratio;

  let grind =
    coffee.brewBias.grind;

  let flow =
    coffee.brewBias.flow;

  let philosophy =
    "";

  let intentionTitle =
    "";

  let pours =
    [...coffee.brewBias.pours];


  // ======================================
  // CLARITY
  // ======================================

  if(intention === "clarity"){

    temp += 1;

    ratio = "1:16.5";

    flow =
      "Low agitation / gentle centre pour";

    intentionTitle =
      "Floral / Tea-like Clarity";

    philosophy = `

      This recipe prioritises cup clarity,
      aromatic transparency,
      and elegant acidity structure.

      Lower turbulence and extended extraction
      help preserve delicate florals
      and tea-like texture.

    `;

  }


  // ======================================
  // BALANCED
  // ======================================

  if(intention === "balanced"){

    intentionTitle =
      "Balanced Sweetness";

    philosophy = `

      This recipe aims to balance sweetness,
      acidity,
      and tactile structure.

      Moderate agitation maintains both
      flavour clarity and body development.

    `;

  }


  // ======================================
  // BODY
  // ======================================

  if(intention === "body"){

    temp -= 1;

    ratio = "1:15";

    flow =
      "Medium agitation / lower flow resistance";

    grind =
      "Between table salt and white sugar";

    intentionTitle =
      "Heavy Body / Chocolate";

    philosophy = `

      This recipe increases tactile structure
      and sweetness density.

      Slightly lower ratio and stronger extraction
      encourage syrupy mouthfeel
      and heavier body expression.

    `;

  }


  // ======================================
  // FUNKY
  // ======================================

  if(intention === "funky"){

    temp -= 1;

    ratio = "1:15";

    flow =
      "Controlled low agitation";

    intentionTitle =
      "Funky / Fermentation Forward";

    philosophy = `

      This recipe highlights fermentation character,
      fruit saturation,
      and expressive sweetness.

      Controlled agitation prevents excessive harshness
      while allowing funkier notes
      to remain vivid.

    `;

  }


  // ======================================
  // NOTES
  // ======================================

  const notesHTML =
    coffee.notes.map(note => {

      return `
        <div class="tag">
          ${note}
        </div>
      `;

    }).join("");


  // ======================================
  // POUR STRUCTURE
  // ======================================

  const poursHTML =
    pours.map(pour => {

      return `

        <div class="pour-step">

          <div class="pour-title">

            ${pour.title}

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


  // ======================================
  // RENDER
  // ======================================

  result.innerHTML = `

    <div class="result-section">

      <div class="coffee-name">
        ${coffee.fullName}
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

        Brewing Intention

      </div>

      <div class="analysis-highlight">

        ${intentionTitle}

      </div>

    </div>



    <div class="result-section">

      <div class="section-title">

        Brewing Recipe

      </div>

      <div class="recipe-grid">


        <div class="recipe-item">

          <h3>
            Water Temperature
          </h3>

          <p>
            ${temp}°C
          </p>

        </div>


        <div class="recipe-item">

          <h3>
            Brew Ratio
          </h3>

          <p>
            ${ratio}
          </p>

        </div>


        <div class="recipe-item">

          <h3>
            Grind
          </h3>

          <p>
            ${grind}
          </p>

        </div>


        <div class="recipe-item">

          <h3>
            Flow Style
          </h3>

          <p>
            ${flow}
          </p>

        </div>

      </div>

    </div>



    <div class="result-section">

      <div class="section-title">

        Pour Structure

      </div>

      ${poursHTML}

    </div>



    <div class="result-section">

      <div class="section-title">

        Brewing Philosophy

      </div>

      <div class="analysis">

        <p>

          ${philosophy}

        </p>

        <div class="analysis-highlight">

          ${coffee.fullName}
          performs best with controlled extraction flow
          and stable bed dynamics.

        </div>

      </div>

    </div>

  `;

}



// ========================================
// ESPRESSO ENGINE
// ========================================

function renderEspressoRecipe(
  coffee,
  intention
){

  let ratio =
    coffee.brewBias.ratio;

  let shotTime =
    coffee.brewBias.shotTime;

  let philosophy =
    "";

  let intentionTitle =
    "";


  // ======================================
  // CLARITY
  // ======================================

  if(intention === "clarity"){

    ratio = "1:2.3";

    shotTime =
      "24 – 28 seconds";

    intentionTitle =
      "Floral / Clarity Focus";

    philosophy = `

      Higher yield ratio promotes flavour separation
      and cleaner finish.

    `;

  }


  // ======================================
  // BALANCED
  // ======================================

  if(intention === "balanced"){

    intentionTitle =
      "Balanced Sweetness";

    philosophy = `

      This recipe balances body,
      sweetness,
      and finish clarity.

    `;

  }


  // ======================================
  // BODY
  // ======================================

  if(intention === "body"){

    ratio = "1:1.8";

    shotTime =
      "30 – 34 seconds";

    intentionTitle =
      "Heavy Body / Chocolate";

    philosophy = `

      Lower yield ratio increases crema density
      and tactile sweetness.

    `;

  }


  // ======================================
  // FUNKY
  // ======================================

  if(intention === "funky"){

    ratio = "1:2";

    shotTime =
      "26 – 30 seconds";

    intentionTitle =
      "Fermentation Forward";

    philosophy = `

      This recipe allows fruit-forward character
      and fermentation complexity
      to remain expressive.

    `;

  }


  // ======================================
  // NOTES
  // ======================================

  const notesHTML =
    coffee.notes.map(note => {

      return `
        <div class="tag">
          ${note}
        </div>
      `;

    }).join("");


  // ======================================
  // RENDER
  // ======================================

  result.innerHTML = `

    <div class="result-section">

      <div class="coffee-name">
        ${coffee.fullName}
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

        Brewing Intention

      </div>

      <div class="analysis-highlight">

        ${intentionTitle}

      </div>

    </div>



    <div class="result-section">

      <div class="section-title">

        Espresso Recipe

      </div>

      <div class="recipe-grid">


        <div class="recipe-item">

          <h3>
            Water Temperature
          </h3>

          <p>
            ${coffee.brewBias.temp}
          </p>

        </div>


        <div class="recipe-item">

          <h3>
            Brew Ratio
          </h3>

          <p>
            ${ratio}
          </p>

        </div>


        <div class="recipe-item">

          <h3>
            Grind
          </h3>

          <p>
            ${coffee.brewBias.grind}
          </p>

        </div>


        <div class="recipe-item">

          <h3>
            Shot Time
          </h3>

          <p>
            ${shotTime}
          </p>

        </div>

      </div>

    </div>



    <div class="result-section">

      <div class="section-title">

        Brewing Philosophy

      </div>

      <div class="analysis">

        <p>

          ${philosophy}

        </p>

        <div class="analysis-highlight">

          ${coffee.fullName}
          performs best with stable flow resistance
          and controlled extraction development.

        </div>

      </div>

    </div>

  `;

}