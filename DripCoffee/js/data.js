// ========================================
// Coffee Knowledge Base
// data.js
// ========================================



// ========================================
// ORIGINS
// ========================================

const origins = {

  ethiopia: {

    name: "Ethiopia",

    notes: [
      "Floral",
      "Citrus",
      "Tea-like"
    ],

    analysis: `
      Ethiopian coffees are often
      high-density, floral and elegant.

      High-grown regions such as
      Yirgacheffe and Guji usually
      perform well under higher extraction.
    `,

    profile: {
      acidity: 9,
      sweetness: 8,
      body: 3,
      clarity: 9,
      funkiness: 4
    },

    commonProcesses: [
      "washed",
      "natural",
      "anaerobic-natural"
    ]

  },



  kenya: {

    name: "Kenya",

    notes: [
      "Berry",
      "Juicy",
      "Bright"
    ],

    analysis: `
      Kenyan coffees typically show
      vibrant acidity and juicy structure.

      Washed processing is dominant
      and often pairs well with
      higher extraction brewing styles.
    `,

    profile: {
      acidity: 10,
      sweetness: 7,
      body: 5,
      clarity: 8,
      funkiness: 2
    },

    commonProcesses: [
      "washed",
      "double-washed"
    ]

  },



  panama: {

    name: "Panama",

    notes: [
      "Jasmine",
      "Stone Fruit",
      "Elegant"
    ],

    analysis: `
      Panama is famous for highly aromatic
      coffees with exceptional clarity.

      Modern fermentation techniques
      are commonly used in competition-level lots.
    `,

    profile: {
      acidity: 8,
      sweetness: 9,
      body: 4,
      clarity: 10,
      funkiness: 5
    },

    commonProcesses: [
      "washed",
      "anaerobic-natural",
      "carbonic",
      "thermal-shock"
    ]

  },



  colombia: {

    name: "Colombia",

    notes: [
      "Balanced",
      "Caramel",
      "Red Fruit"
    ],

    analysis: `
      Colombian coffees are often sweet,
      balanced and versatile.

      Recent experimental fermentation
      styles are increasingly popular.
    `,

    profile: {
      acidity: 7,
      sweetness: 8,
      body: 6,
      clarity: 7,
      funkiness: 5
    },

    commonProcesses: [
      "washed",
      "honey",
      "anaerobic-washed"
    ]

  },



  brazil: {

    name: "Brazil",

    notes: [
      "Chocolate",
      "Nutty",
      "Low Acidity"
    ],

    analysis: `
      Brazilian coffees usually emphasize
      sweetness, body and comfort.

      Lower acidity coffees often benefit
      from balanced extraction approaches.
    `,

    profile: {
      acidity: 3,
      sweetness: 7,
      body: 8,
      clarity: 4,
      funkiness: 2
    },

    commonProcesses: [
      "natural",
      "honey"
    ]

  },



  indonesia: {

    name: "Indonesia",

    notes: [
      "Earthy",
      "Spice",
      "Heavy Body"
    ],

    analysis: `
      Indonesian coffees often present
      syrupy body and earthy character.

      Wet Hulled processing creates
      dense texture and lower clarity.
    `,

    profile: {
      acidity: 2,
      sweetness: 6,
      body: 10,
      clarity: 2,
      funkiness: 5
    },

    commonProcesses: [
      "wet-hulled",
      "natural"
    ]

  },



  uganda: {

    name: "Uganda",

    notes: [
      "Dark Fruit",
      "Chocolate",
      "Dense"
    ],

    analysis: `
      Ugandan coffees can show
      deep sweetness and dense body.

      Natural processing is becoming
      increasingly common in specialty lots.
    `,

    profile: {
      acidity: 5,
      sweetness: 7,
      body: 7,
      clarity: 5,
      funkiness: 4
    },

    commonProcesses: [
      "washed",
      "natural"
    ]

  },



  honduras: {

    name: "Honduras",

    notes: [
      "Brown Sugar",
      "Stone Fruit",
      "Balanced"
    ],

    analysis: `
      Honduran coffees often balance
      sweetness and approachable acidity.

      Honey and natural processes
      are increasingly common.
    `,

    profile: {
      acidity: 6,
      sweetness: 8,
      body: 6,
      clarity: 6,
      funkiness: 4
    },

    commonProcesses: [
      "washed",
      "natural",
      "honey"
    ]

  },



  "costa-rica": {

    name: "Costa Rica",

    notes: [
      "Sweet",
      "Clean",
      "Bright"
    ],

    analysis: `
      Costa Rican coffees are known for
      clean sweetness and structured acidity.

      Honey process is especially iconic.
    `,

    profile: {
      acidity: 7,
      sweetness: 8,
      body: 5,
      clarity: 8,
      funkiness: 4
    },

    commonProcesses: [
      "washed",
      "honey",
      "anaerobic-washed"
    ]

  },



  bolivia: {

    name: "Bolivia",

    notes: [
      "Tea-like",
      "Elegant",
      "Soft Citrus"
    ],

    analysis: `
      Bolivian coffees are often delicate,
      elegant and tea-like.

      Lower agitation brewing styles
      can help preserve subtle aromatics.
    `,

    profile: {
      acidity: 6,
      sweetness: 7,
      body: 5,
      clarity: 8,
      funkiness: 3
    },

    commonProcesses: [
      "washed",
      "natural"
    ]

  }

};



// ========================================
// PROCESSES
// ========================================

const processes = {

  washed: {

    name: "Washed",

    analysis: `
      Washed coffees usually emphasize
      clarity, acidity and clean finish.

      They generally tolerate
      higher extraction strategies well.
    `,

    modifiers: {
      clarity: 3,
      sweetness: 1,
      funkiness: -2
    },

    brewAdjustments: {
      temp: 1,
      agitation: 1
    }

  },



  "double-washed": {

    name: "Double Washed",

    analysis: `
      Double Washed coffees often show
      extra cleanliness and transparency.

      Over-extraction may reduce sweetness.
    `,

    modifiers: {
      clarity: 4,
      sweetness: 0,
      funkiness: -3
    },

    brewAdjustments: {
      temp: 2,
      agitation: 0
    }

  },



  natural: {

    name: "Natural",

    analysis: `
      Natural coffees usually increase
      fruit intensity, sweetness and body.

      Excessive agitation may create muddiness.
    `,

    modifiers: {
      sweetness: 3,
      body: 2,
      funkiness: 3
    },

    brewAdjustments: {
      temp: -1,
      agitation: -1
    }

  },



  honey: {

    name: "Honey",

    analysis: `
      Honey processing often creates
      rounded sweetness and smooth texture.

      Balanced extraction usually works well.
    `,

    modifiers: {
      sweetness: 3,
      body: 1,
      clarity: 1
    },

    brewAdjustments: {
      temp: 0,
      agitation: 0
    }

  },



  "wet-hulled": {

    name: "Wet Hulled (Giling Basah)",

    analysis: `
      Wet Hulled coffees often show
      earthy, spicy and syrupy character.

      Lower temperature and lower agitation
      help reduce muddy texture.
    `,

    modifiers: {
      body: 5,
      clarity: -3,
      funkiness: 2
    },

    brewAdjustments: {
      temp: -2,
      agitation: -1
    }

  },



  "anaerobic-washed": {

    name: "Anaerobic Washed",

    analysis: `
      Anaerobic Washed coffees often
      increase sweetness and fermentation complexity.

      Over-extraction may exaggerate alcohol notes.
    `,

    modifiers: {
      sweetness: 4,
      funkiness: 5,
      acidity: 2
    },

    brewAdjustments: {
      temp: -1,
      agitation: -2
    }

  },



  "anaerobic-natural": {

    name: "Anaerobic Natural",

    analysis: `
      Anaerobic Natural coffees can become
      extremely fruit-forward and intense.

      Gentle extraction helps preserve balance.
    `,

    modifiers: {
      sweetness: 5,
      funkiness: 6,
      body: 2
    },

    brewAdjustments: {
      temp: -2,
      agitation: -2
    }

  },



  carbonic: {

    name: "Carbonic Maceration",

    analysis: `
      Carbonic Maceration often produces
      explosive aromatics and juicy acidity.

      Excessive extraction may flatten aroma separation.
    `,

    modifiers: {
      sweetness: 5,
      funkiness: 7,
      clarity: 2
    },

    brewAdjustments: {
      temp: -1,
      agitation: -1
    }

  },



  "thermal-shock": {

    name: "Thermal Shock",

    analysis: `
      Thermal Shock processing often enhances
      aroma clarity and sweetness intensity.

      Cleaner brewing approaches
      usually perform best.
    `,

    modifiers: {
      sweetness: 4,
      clarity: 3,
      aroma: 5
    },

    brewAdjustments: {
      temp: 1,
      agitation: 0
    }

  }

};



// ========================================
// BREW PHILOSOPHIES
// ========================================

const brewStyles = {

  japanese: {

    name: "Japanese Clean Cup",

    philosophy: `
      Focus on clarity,
      delicate mouthfeel
      and transparent sweetness.
    `,

    intent: [
      "Increase clarity",
      "Reduce agitation",
      "Preserve tea-like finish"
    ],

    adjustments: {
      temp: -1,
      agitation: -2,
      ratio: "1:16"
    },

    pours: [

      {
        en: "Bloom",
        zh: "悶蒸",
        water: "40g",
        time: "0:00 - 0:30"
      },

      {
        en: "Center Pour",
        zh: "中心注水",
        water: "120g",
        time: "0:30 - 0:50"
      },

      {
        en: "Gentle Pulse Pour",
        zh: "輕柔分段注水",
        water: "200g",
        time: "1:00 - 1:20"
      },

      {
        en: "Final Pour",
        zh: "尾段注水",
        water: "300g",
        time: "1:30 - 1:50"
      }

    ]

  },



  nordic: {

    name: "Nordic High Extraction",

    philosophy: `
      Push extraction while preserving
      vibrant acidity and juicy sweetness.
    `,

    intent: [
      "Increase extraction",
      "Enhance acidity",
      "Maximize sweetness"
    ],

    adjustments: {
      temp: 2,
      agitation: 2,
      ratio: "1:15"
    },

    pours: [

      {
        en: "Bloom",
        zh: "悶蒸",
        water: "50g",
        time: "0:00 - 0:45"
      },

      {
        en: "Fast Center Pour",
        zh: "快速中心注水",
        water: "180g",
        time: "0:45 - 1:10"
      },

      {
        en: "Final Extraction Pour",
        zh: "尾段萃取注水",
        water: "320g",
        time: "1:20 - 1:45"
      }

    ]

  },



  competition: {

    name: "Competition Style",

    philosophy: `
      Maximize complexity,
      sweetness layering
      and flavor separation.
    `,

    intent: [
      "Maximize flavor complexity",
      "Increase sweetness",
      "Control extraction curve"
    ],

    adjustments: {
      temp: 1,
      agitation: 1,
      ratio: "1:15"
    },

    pours: [

      {
        en: "Bloom",
        zh: "悶蒸",
        water: "60g",
        time: "0:00 - 0:40"
      },

      {
        en: "Pulse Pour",
        zh: "分段注水",
        water: "140g",
        time: "0:40 - 1:00"
      },

      {
        en: "Pulse Pour",
        zh: "分段注水",
        water: "220g",
        time: "1:00 - 1:20"
      },

      {
        en: "Pulse Pour",
        zh: "分段注水",
        water: "280g",
        time: "1:20 - 1:40"
      },

      {
        en: "Bypass",
        zh: "稀釋注水",
        water: "40g",
        time: "After Drawdown"
      }

    ]

  },



  cafe: {

    name: "Cafe Balance",

    philosophy: `
      Prioritize sweetness,
      comfort and everyday drinkability.
    `,

    intent: [
      "Maintain balance",
      "Increase sweetness",
      "Improve consistency"
    ],

    adjustments: {
      temp: 0,
      agitation: 0,
      ratio: "1:15.5"
    },

    pours: [

      {
        en: "Bloom",
        zh: "悶蒸",
        water: "40g",
        time: "0:00 - 0:30"
      },

      {
        en: "Main Pour",
        zh: "主段注水",
        water: "150g",
        time: "0:30 - 0:55"
      },

      {
        en: "Final Pour",
        zh: "尾段注水",
        water: "300g",
        time: "1:10 - 1:40"
      }

    ]

  },



  hybrid: {

    name: "Hybrid Modern",

    philosophy: `
      Blend clarity,
      sweetness and modern extraction styles.
    `,

    intent: [
      "Balance clarity and body",
      "Control fermentation",
      "Enhance sweetness"
    ],

    adjustments: {
      temp: 1,
      agitation: 0,
      ratio: "1:15.5"
    },

    pours: [

      {
        en: "Bloom",
        zh: "悶蒸",
        water: "50g",
        time: "0:00 - 0:40"
      },

      {
        en: "Center Pour",
        zh: "中心注水",
        water: "160g",
        time: "0:40 - 1:00"
      },

      {
        en: "Gentle Spiral Pour",
        zh: "柔和繞圈注水",
        water: "260g",
        time: "1:00 - 1:30"
      },

      {
        en: "Bypass",
        zh: "稀釋注水",
        water: "30g",
        time: "After Drawdown"
      }

    ]

  }

};



// ========================================
// FLAVOR TARGETS
// ========================================

const flavorTargets = {

  floral: {

    name: "花香果調",

    intent: [
      "Increase clarity",
      "Highlight floral aroma",
      "Enhance delicate acidity"
    ],

    adjustments: {
      temp: 1,
      grind: "Fine",
      ratio: "1:15"
    }

  },



  bright: {

    name: "明亮酸質",

    intent: [
      "Increase acidity",
      "Enhance juicy structure",
      "Maintain clean finish"
    ],

    adjustments: {
      temp: 2,
      grind: "Medium Fine",
      ratio: "1:15"
    }

  },



  balanced: {

    name: "圓潤平衡",

    intent: [
      "Balance sweetness and acidity",
      "Maintain comfort",
      "Improve drinkability"
    ],

    adjustments: {
      temp: 0,
      grind: "Medium",
      ratio: "1:15.5"
    }

  },



  nutty: {

    name: "朱古力堅果",

    intent: [
      "Increase body",
      "Reduce acidity",
      "Enhance chocolate sweetness"
    ],

    adjustments: {
      temp: -1,
      grind: "Medium Coarse",
      ratio: "1:16"
    }

  },



  syrupy: {

    name: "醇厚焦糖",

    intent: [
      "Increase syrupy texture",
      "Enhance caramel sweetness",
      "Reduce sharp acidity"
    ],

    adjustments: {
      temp: -2,
      grind: "Coarse",
      ratio: "1:16.5"
    }

  }

};