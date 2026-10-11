import { SchoolProject } from '../types/project';

export const DEFAULT_PROJECTS: SchoolProject[] = [
  {
    id: 'proj-clean-energy',
    title: 'Harnessing Clean Energy: Hybrid Solar & Wind Microgrids',
    subject: 'Physics & Environmental Science',
    category: 'environmental',
    gradeLevel: 'Grade 10 / High School',
    studentName: 'Alex Rivera',
    schoolName: 'Oakridge High School',
    teacherName: 'Dr. Katherine Vance',
    dueDate: '2026-10-24',
    status: 'In Progress',
    abstract:
      'This research investigates the efficiency and reliability of dual-source hybrid renewable microgrids (photovoltaic panels paired with vertical-axis wind turbines) under varying meteorological conditions. By simulating diurnal irradiance shifts and variable wind gusts, we quantify battery charge conservation and peak grid stability.',
    hypothesis:
      'A combined photovoltaic and micro-wind generation system provides greater power output stability and reduces battery depth-of-discharge cycles by at least 34% compared to an isolated single-source setup during overcast daylight hours.',
    materials: [
      '12V 50W Monocrystalline Photovoltaic Panel',
      'Micro Vertical-Axis Wind Turbine (VAWT 100W)',
      '12V 20Ah Deep Cycle LiFePO4 Battery with BMS',
      'Digital True-RMS Multimeter & Current Shunts',
      'Arduino UNO with INA219 Voltage/Current Sensor Shield',
      'Variable Speed Laboratory Air Blower (3m/s – 12m/s)',
      'Adjustable Halogen Irradiance Array (200W–1000W/m²)'
    ],
    methodology: [
      'Calibrated baseline solar irradiance at angles between 15° and 65° in 5° increments under artificial standard testing conditions (STC).',
      'Logged voltage and amperage across a 10-ohm resistive load over 60-minute testing intervals.',
      'Introduced variable wind velocity cycles (4.5 m/s light breeze to 9.2 m/s moderate gale) to measure hybrid summation power.',
      'Monitored battery state-of-charge (SoC) replenishment and calculated overall system conversion efficiency.'
    ],
    keyFindings: [
      'Peak solar yield occurred at a 35° tilt angle, producing an average of 42.4W under 850 W/m² irradiance.',
      'Turbine cut-in wind speed was observed at 2.8 m/s; total power exceeded 80W when combining wind gusts with diffuse midday light.',
      'Hybrid power fluctuation standard deviation was 4.1W, compared to 14.8W for solar-alone during simulated cloud cover passes.'
    ],
    conclusion:
      'The experimental results strongly support the hypothesis. Complementary diurnal patterns of wind and solar substantially buffer output volatility, proving that hybrid localized microgrids are highly viable for distributed community resilience.',
    simulatorType: 'energy',
    slides: [
      {
        id: 's1',
        title: 'Hybrid Solar & Wind Microgrid Project',
        subtitle: 'Experimental Analysis of Dual-Source Energy Yields',
        bulletPoints: [
          'Investigating combined solar and wind energy under shifting weather patterns',
          'Primary metric: Continuous power generation and battery storage conservation',
          'Conducted for 10th Grade Honors Physics & Environmental Science'
        ],
        keyHighlight: 'Total Peak Combined Output: 128.6 Watts',
        speakerNotes: 'Welcome everyone. In this presentation, I explore how combining small wind turbines with solar arrays solves the intermittency problem of renewable power.'
      },
      {
        id: 's2',
        title: 'Hypothesis & Core Problem',
        subtitle: 'Can Dual Micro-Sources Outperform Single Solar Arrays?',
        bulletPoints: [
          'Solar power drops sharply by up to 75% during overcast or overcast-rainy conditions',
          'Wind speed frequently increases during stormy and overcast fronts',
          'Hypothesis: A hybrid microgrid reduces battery strain and keeps critical loads powered'
        ],
        keyHighlight: 'Target: Maintain >35W continuous minimum baseline',
        speakerNotes: 'Notice that storm clouds bring reduced solar radiation, but they simultaneously bring wind fronts. This natural complementarity was the foundation of my hypothesis.'
      },
      {
        id: 's3',
        title: 'Experimental Setup & Variable Testing',
        subtitle: 'Controlled Laboratory Conditions',
        bulletPoints: [
          'Controlled variables: Load resistance (10Ω), ambient room temp (21°C)',
          'Independent variables: Panel tilt angle (15°–65°), Wind airflow (3–10 m/s)',
          'Dependent variables: Current (Amperes), Voltage (Volts), Total Wattage'
        ],
        keyHighlight: '30 Trials Conducted Across 4 Weather Scenarios',
        speakerNotes: 'I used an Arduino with INA219 high-side current sensors to record data every 500 milliseconds for precise statistical curve fitting.'
      },
      {
        id: 's4',
        title: 'Key Findings & Real-Time Data',
        subtitle: 'Validation Through Quantitative Measurement',
        bulletPoints: [
          'Optimum panel tilt for latitude: 35° tilt delivered 94.2% of rated STC capacity',
          'Wind turbine generated 45W at 7.5 m/s, bridging overcast solar troughs',
          'System efficiency was 17.8% for solar and 28.4% aerodynamic Betz conversion for wind'
        ],
        keyHighlight: 'Power variance was dampened by 72% in hybrid configuration',
        speakerNotes: 'The graph clearly showed that when the solar line dropped, the wind turbine line rose, creating a remarkably steady baseline power curve.'
      },
      {
        id: 's5',
        title: 'Project Conclusion & Future Expansion',
        subtitle: 'Community Impact & Engineering Next Steps',
        bulletPoints: [
          'Hypothesis was confirmed by empirical data over 30 test cycles',
          'Small microgrids provide a practical decentralized solution for schools and rural clinics',
          'Future work: Incorporate supercapacitors for high momentary motor-surge starting loads'
        ],
        keyHighlight: 'Recommended for Science Fair State Exhibition',
        speakerNotes: 'Thank you for your attention. I would now like to demonstrate our interactive microgrid simulator and invite questions from the panel.'
      }
    ],
    citations: [
      {
        id: 'c1',
        type: 'journal',
        authors: 'Boyle, Godfrey',
        title: 'Renewable Energy: Power for a Sustainable Future',
        publicationOrPublisher: 'Oxford University Press',
        year: '2021',
        url: 'https://doi.org/10.1093/hesc/9780198759997.001.0001'
      },
      {
        id: 'c2',
        type: 'journal',
        authors: 'NREL Technical Review Board',
        title: 'Best Practices for Small Wind and Photovoltaic Hybrid Systems',
        publicationOrPublisher: 'National Renewable Energy Laboratory Reports',
        year: '2023',
        url: 'https://www.nrel.gov/docs/fy23osti/small-hybrid.pdf'
      },
      {
        id: 'c3',
        type: 'book',
        authors: 'Masters, Gilbert M.',
        title: 'Renewable and Efficient Electric Power Systems (2nd Edition)',
        publicationOrPublisher: 'Wiley-IEEE Press',
        year: '2020'
      }
    ],
    milestones: [
      {
        id: 'm1',
        title: 'Formulate Scientific Hypothesis & Teacher Approval',
        dueDate: '2026-09-15',
        completed: true,
        notes: 'Approved by Dr. Vance with suggestion to add quantitative load shunts.'
      },
      {
        id: 'm2',
        title: 'Assemble Testing Rig & Calibrate Current Sensors',
        dueDate: '2026-09-28',
        completed: true,
        notes: 'Sensors calibrated with standard resistor benchmark.'
      },
      {
        id: 'm3',
        title: 'Complete 30 Controlled Test Trials & Log Data',
        dueDate: '2026-10-08',
        completed: true,
        notes: 'Data stored in CSV and charted.'
      },
      {
        id: 'm4',
        title: 'Draft Science Presentation Slides & Poster Layout',
        dueDate: '2026-10-18',
        completed: true,
        notes: '5 presentation slides finalized with speaker commentary.'
      },
      {
        id: 'm5',
        title: 'Final Proofread & Oral Defense Rehearsal',
        dueDate: '2026-10-24',
        completed: false,
        notes: 'Rehearsing with timer for 8-minute presentation limit.'
      }
    ],
    rubric: [
      {
        id: 'r1',
        name: 'Scientific Inquiry & Hypothesis Formulation',
        maxPoints: 20,
        currentPoints: 20,
        description: 'Clear, testable hypothesis grounded in established physics and scientific literature.'
      },
      {
        id: 'r2',
        name: 'Experimental Methodology & Variable Isolation',
        maxPoints: 25,
        currentPoints: 24,
        description: 'Rigorous control of extraneous variables and precise measurement apparatus.'
      },
      {
        id: 'r3',
        name: 'Data Analysis & Quantitative Synthesis',
        maxPoints: 25,
        currentPoints: 24,
        description: 'Effective visual charts, error margin calculations, and statistical interpretation.'
      },
      {
        id: 'r4',
        name: 'Visual Presentation & Oral Defense Clarity',
        maxPoints: 15,
        currentPoints: 14,
        description: 'Professional slide deck, cohesive narrative structure, and articulate defense.'
      },
      {
        id: 'r5',
        name: 'Scholarly Citations & Ethical Research',
        maxPoints: 15,
        currentPoints: 15,
        description: 'Accurate APA/MLA formatting and thorough review of academic sources.'
      }
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'What is the theoretical maximum aerodynamic efficiency for a wind turbine according to Betz’s limit?',
        options: ['45.2%', '59.3%', '72.8%', '88.5%'],
        correctIndex: 1,
        explanation: 'Betz’s law proves that no turbine can capture more than 16/27 (59.3%) of the kinetic energy in wind.'
      },
      {
        id: 'q2',
        question: 'Which panel tilt angle produced the highest cumulative energy yield in our latitude testing?',
        options: ['15 degrees', '35 degrees', '60 degrees', '0 degrees (flat horizontal)'],
        correctIndex: 1,
        explanation: 'A 35-degree angle matched the local solar zenith profile, maximizing perpendicular photon flux.'
      },
      {
        id: 'q3',
        question: 'Why does combining solar with wind reduce the needed battery storage capacity?',
        options: [
          'Because wind generates alternating current directly into the battery',
          'Because wind velocity often peaks when solar radiation is obstructed by storms',
          'Because solar panels produce heat that increases wind speed',
          'Because batteries charge twice as fast with multiple wires'
        ],
        correctIndex: 1,
        explanation: 'Meteorological complementarity ensures that one resource often compensates for the temporary drop of the other.'
      }
    ]
  },
  {
    id: 'proj-photosynthesis',
    title: 'Photosynthetic Rate Kinetics: Light & Carbon Dioxide Dynamics',
    subject: 'AP Biology & Plant Physiology',
    category: 'biology',
    gradeLevel: 'Grade 11 / High School',
    studentName: 'Maya Lin',
    schoolName: 'Westlake Science Academy',
    teacherName: 'Prof. David Thorne',
    dueDate: '2026-11-04',
    status: 'Review Ready',
    abstract:
      'An empirical study exploring the limiting factors of photosynthesis in Elodea canadensis. By systematically modulating light intensity (lux) and bicarbonate concentration (CO2 availability), oxygen evolution rates were recorded using an inverted audiospectro-volumetric micro-respirometer.',
    hypothesis:
      'The rate of oxygen gas production will increase linearly with light intensity up to a saturation point of approximately 18,000 lux, beyond which carbon dioxide concentration becomes the overriding rate-limiting factor.',
    materials: [
      'Elodea canadensis aquatic specimens (uniform 8cm apical stems)',
      'Sodium Bicarbonate (NaHCO3) solutions (0.1% to 2.5% w/v)',
      'Full-spectrum LED Grow Lamp with dimmer control (0–30,000 lux)',
      'Graduated capillary tube manometer with dye droplet indicator',
      'Infrared thermometer & circulating heat-sink water bath'
    ],
    methodology: [
      'Submerged fresh Elodea cuttings in 0.5% NaHCO3 solution inside a sealed water jacket to maintain 22°C constant temperature.',
      'Adjusted LED illuminance from 2,000 to 24,000 lux at intervals of 4,000 lux.',
      'Counted evolved O2 microbubbles per minute and cross-validated with capillary dye meniscus displacement.',
      'Tested CO2 enrichment by incrementally raising NaHCO3 from 0.0% to 2.0% at constant saturating light.'
    ],
    keyFindings: [
      'Bubble production scaled linearly between 2,000 and 14,000 lux (r = 0.982).',
      'Light saturation occurred at 18,500 lux, producing 48 bubbles/minute with 0.5% bicarbonate.',
      'Elevating CO2 concentration from 0.5% to 1.5% pushed the maximum photosynthetic plateau by an additional 31%.'
    ],
    conclusion:
      'Blackman’s Principle of Limiting Factors was validated: increasing illuminance ceases to elevate photosynthetic rate once Calvin cycle enzymatic active sites become carbon-saturated.',
    simulatorType: 'photosynthesis',
    slides: [
      {
        id: 's1',
        title: 'Photosynthetic Kinetics & Limiting Factors',
        subtitle: 'Quantifying Oxygen Evolution in Elodea canadensis',
        bulletPoints: [
          'Investigation into photochemical reaction rates vs biochemical carbon fixation',
          'Testing light intensity and sodium bicarbonate chemical concentrations',
          '11th Grade AP Biology Lab Research Project'
        ],
        keyHighlight: 'Over 120 Data Points Measured Across 5 Trials',
        speakerNotes: 'Good afternoon. Photosynthesis fuels virtually all terrestrial and aquatic food webs. Today I present my findings on how environmental factors dictate its speed.'
      },
      {
        id: 's2',
        title: 'The Biochemical Background',
        subtitle: 'Light Reactions & The Calvin Cycle',
        bulletPoints: [
          'Light-dependent reactions in the thylakoid split H2O into O2, ATP, and NADPH',
          'Light-independent reactions (Calvin Cycle) in the stroma utilize CO2 and RuBisCO',
          'Hypothesis: Light drives early yield, but CO2 availability limits max throughput'
        ],
        keyHighlight: 'Equation: 6CO2 + 6H2O + Photons → C6H12O6 + 6O2',
        speakerNotes: 'Water is split via photolysis in photosystem II, liberating oxygen gas as a direct proxy for the rate of linear electron flow.'
      },
      {
        id: 's3',
        title: 'Experimental Data & Graphs',
        subtitle: 'Identification of the Saturation Threshold',
        bulletPoints: [
          'Under 14,000 lux, each 1,000 lux increase generated ~2.6 additional bubbles/min',
          'Plateau reached at 18,500 lux; further brightness caused mild photoinhibition',
          'Adding bicarbonate dissolved CO2 unlocked higher enzyme processing velocity'
        ],
        keyHighlight: 'Limiting Factor Pivot Point: 18,500 lux',
        speakerNotes: 'Notice the sharp flattening of the curve at 18,500 lux. Without extra dissolved carbon dioxide, RuBisCO cannot fix carbon any faster.'
      },
      {
        id: 's4',
        title: 'Ecological Implications & Conclusion',
        subtitle: 'Application to Marine Ecosystems & Agriculture',
        bulletPoints: [
          'Affirms Blackman’s Law: rate is governed by the factor in shortest supply',
          'Explains algal bloom dynamics in stratified agricultural runoff ponds',
          'Provides optimal light recipes for indoor vertical greenhouse farming'
        ],
        keyHighlight: 'Lab Grade Received: A+ (98/100)',
        speakerNotes: 'These kinetics demonstrate why greenhouse operators enrich CO2 levels up to 1,200 ppm to get maximum benefit from high-efficiency LED grow lamps.'
      }
    ],
    citations: [
      {
        id: 'c1',
        type: 'book',
        authors: 'Campbell, Neil A., and Lisa A. Urry',
        title: 'Campbell Biology (12th Edition)',
        publicationOrPublisher: 'Pearson Higher Education',
        year: '2020'
      },
      {
        id: 'c2',
        type: 'journal',
        authors: 'Taiz, Lincoln, and Eduardo Zeiger',
        title: 'Plant Physiology and Development',
        publicationOrPublisher: 'Sinauer Associates / Oxford University Press',
        year: '2022',
        url: 'https://academic.oup.com/treephys/article/plant-phys'
      }
    ],
    milestones: [
      {
        id: 'm1',
        title: 'Specimen preparation & micro-respirometer setup',
        dueDate: '2026-10-01',
        completed: true,
        notes: 'Elodea stems stabilized in temperature bath.'
      },
      {
        id: 'm2',
        title: 'Conduct illuminance & bicarbonate trials',
        dueDate: '2026-10-12',
        completed: true,
        notes: 'Logged all bubble intervals.'
      },
      {
        id: 'm3',
        title: 'Statistical regression & error bars',
        dueDate: '2026-10-20',
        completed: true,
        notes: 'Calculated standard deviation for each lux bracket.'
      },
      {
        id: 'm4',
        title: 'Submit final laboratory manuscript to instructor',
        dueDate: '2026-11-04',
        completed: false,
        notes: 'Ready for presentation defense.'
      }
    ],
    rubric: [
      {
        id: 'r1',
        name: 'Experimental Design & Controls',
        maxPoints: 25,
        currentPoints: 25,
        description: 'Precise isolation of independent variables with thermal heat-sinks.'
      },
      {
        id: 'r2',
        name: 'Quantitative Data Representation',
        maxPoints: 25,
        currentPoints: 24,
        description: 'Clarity of graphs, axis formatting, and statistical regression fit.'
      },
      {
        id: 'r3',
        name: 'Biological Conceptual Accuracy',
        maxPoints: 30,
        currentPoints: 30,
        description: 'Correct biochemical linkage between photolysis and Calvin cycle kinetics.'
      },
      {
        id: 'r4',
        name: 'Conclusion & Scientific Reflection',
        maxPoints: 20,
        currentPoints: 19,
        description: 'In-depth discussion of photoinhibition and experimental error sources.'
      }
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'What molecule is the direct source of oxygen gas released during photosynthesis?',
        options: ['Carbon dioxide (CO2)', 'Water (H2O)', 'Glucose (C6H12O6)', 'ATP'],
        correctIndex: 1,
        explanation: 'Oxygen is produced through the photolysis of water molecules at Photosystem II.'
      },
      {
        id: 'q2',
        question: 'What is the primary enzyme responsible for fixing carbon dioxide in the Calvin Cycle?',
        options: ['ATP Synthase', 'RuBisCO', 'Amylase', 'Catalase'],
        correctIndex: 1,
        explanation: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) catalyzes initial CO2 fixation.'
      }
    ]
  },
  {
    id: 'proj-silk-road',
    title: 'The Silk Road: Geopolitics, Technology & Cultural Diffusion',
    subject: 'World History & Cultural Geography',
    category: 'history',
    gradeLevel: 'Grade 9 / High School',
    studentName: 'Julian Chen',
    schoolName: 'St. Andrews Preparatory School',
    teacherName: 'Mrs. Eleanor Vance',
    dueDate: '2026-10-30',
    status: 'In Progress',
    abstract:
      'An analysis of trans-Eurasian exchange networks between 130 BCE and 1453 CE. This project examines how the movement of material commodities (silk, spices, porcelain) was eclipsed in historical significance by the transmission of intangible assets: paper-making, navigational compasses, religious philosophy, and bubonic pathogens.',
    hypothesis:
      'Technological diffusion (specifically Chinese papermaking and Islamic algebraic astronomy) via oasis city hubs such as Samarkand and Dunhuang had a greater long-term socio-economic impact on Western Eurasia than luxury goods trade volume.',
    materials: [
      'Primary source documents (Xuanzang’s Great Tang Records, Pegolotti’s Pratica della Mercatura)',
      'GIS cartographic boundary models of Han, Tang, and Mongol empires',
      'Archaeological excavation logs from Mogao Caves (Dunhuang)',
      'Digital numismatic collection of Sogdian and Byzantine coins'
    ],
    methodology: [
      'Comparative historical text analysis across European, Persian, and Chinese chroniclers.',
      'Mapped principal trading routes: Northern Oasis route, Southern Khotan route, and Maritime Silk Route.',
      'Synthesized economic price indices for silk bolts and paper quires from 7th to 14th century records.',
      'Constructed chronological diffusion timeline of key technological innovations.'
    ],
    keyFindings: [
      'The Battle of Talas (751 CE) triggered the transfer of Chinese papermaking technology to Samarkand, reducing book production costs by ~80% across the Abbasid Caliphate.',
      'Sogdian merchants acted as vital cultural interpreters, establishing multilingual caravan caravanserais every 25–30 kilometers.',
      'Pax Mongolica (13th century) unified Eurasia under single passport protections (Paiza), reducing transit time from Venice to Khanbaliq to under 9 months.'
    ],
    conclusion:
      'The Silk Road was fundamentally an information network disguised as a merchant highway. The enduring legacy was the decentralized transmission of ideas, which directly laid the foundations of the European Renaissance and the Islamic Golden Age.',
    simulatorType: 'energy',
    slides: [
      {
        id: 's1',
        title: 'The Silk Road: Networks of Civilization',
        subtitle: 'Beyond Silk and Spices: The Transmission of Ideas',
        bulletPoints: [
          'Trans-Eurasian trade corridors spanning over 6,400 kilometers',
          'Connecting Chang’an (Xi’an) with Rome, Constantinople, and Baghdad',
          'Grade 9 Honors World History Research Project'
        ],
        keyHighlight: 'Span: Over 1,500 Years of Active Trade (130 BCE – 1453 CE)',
        speakerNotes: 'When people hear "Silk Road", they imagine caravans of luxury textiles. But as my research demonstrates, the real revolution was intellectual and scientific.'
      },
      {
        id: 's2',
        title: 'Key Innovations Transmitted Westward',
        subtitle: 'The Catalyst of Global Modernity',
        bulletPoints: [
          'Papermaking: Replaced expensive animal parchment, sparking libraries across Baghdad and Cordoba',
          'Woodblock Printing & Gunpowder: Fundamentally reshaped European statehood and warfare',
          'Magnetic Compass: Enabled the Age of Exploration across the Atlantic and Indian Oceans'
        ],
        keyHighlight: 'Paper decreased manuscript reproduction costs by 80%',
        speakerNotes: 'Without the transmission of paper through Samarkand following the Battle of Talas in 751 CE, the preservation and translation of ancient classical Greek texts would not have been possible.'
      },
      {
        id: 's3',
        title: 'The Critical Role of Oasis Hubs',
        subtitle: 'Caravanserais, Samarkand & Dunhuang',
        bulletPoints: [
          'Caravanserais provided fortified shelter, water, and livestock fodder every 25–30 km',
          'Dunhuang Mogao Caves preserved 50,000 manuscripts in 15 different languages',
          'Sogdian merchant network acted as economic and diplomatic translators'
        ],
        keyHighlight: 'Over 50,000 Multi-Language Scrolls Preserved in Dunhuang',
        speakerNotes: 'Merchants rarely traveled the entire 6,000 km route themselves. Goods passed through relay networks centered around oasis cities in Central Asia.'
      },
      {
        id: 's4',
        title: 'Project Conclusion',
        subtitle: 'The Roots of Our Interconnected World',
        bulletPoints: [
          'The trade network stimulated the Islamic Golden Age and sparked the Renaissance',
          'Proves that open intercultural trade corridors accelerate scientific progress',
          'Modern parallels: The Digital Internet as the contemporary global information highway'
        ],
        keyHighlight: 'Final Project Grade: Outstanding Presentation Award',
        speakerNotes: 'In conclusion, the Silk Road was humanity’s first global internet—a decentralized network where the most valuable exchange was human knowledge.'
      }
    ],
    citations: [
      {
        id: 'c1',
        type: 'book',
        authors: 'Frankopan, Peter',
        title: 'The Silk Roads: A New History of the World',
        publicationOrPublisher: 'Bloomsbury Publishing',
        year: '2016'
      },
      {
        id: 'c2',
        type: 'book',
        authors: 'Hansen, Valerie',
        title: 'The Silk Road: A New History (2nd Edition)',
        publicationOrPublisher: 'Oxford University Press',
        year: '2017'
      },
      {
        id: 'c3',
        type: 'journal',
        authors: 'Beckwith, Christopher I.',
        title: 'Empires of the Silk Road: A History of Central Eurasia',
        publicationOrPublisher: 'Princeton University Press',
        year: '2011'
      }
    ],
    milestones: [
      {
        id: 'm1',
        title: 'Source collation from Mogao library archives',
        dueDate: '2026-09-20',
        completed: true,
        notes: 'Examined primary translations of Xuanzang.'
      },
      {
        id: 'm2',
        title: 'Draft geopolitical map overlay of trade corridors',
        dueDate: '2026-10-05',
        completed: true,
        notes: 'Mapped northern and southern oasis routes.'
      },
      {
        id: 'm3',
        title: 'Complete comparative paper on technological diffusion',
        dueDate: '2026-10-22',
        completed: true,
        notes: '2,500 word essay draft finished.'
      },
      {
        id: 'm4',
        title: 'Rehearse presentation with visual artifacts',
        dueDate: '2026-10-30',
        completed: false,
        notes: 'Include sample silk swatch and replica papyrus.'
      }
    ],
    rubric: [
      {
        id: 'r1',
        name: 'Historical Argumentation & Thesis Depth',
        maxPoints: 25,
        currentPoints: 25,
        description: 'Compelling thesis analyzing intangible intellectual diffusion.'
      },
      {
        id: 'r2',
        name: 'Primary Source Engagement',
        maxPoints: 25,
        currentPoints: 24,
        description: 'Appropriate citation and critical analysis of period documents.'
      },
      {
        id: 'r3',
        name: 'Geographic & Chronological Accuracy',
        maxPoints: 25,
        currentPoints: 25,
        description: 'Precise timeline spanning Han dynasty through Pax Mongolica.'
      },
      {
        id: 'r4',
        name: 'Visual Presentation & Scholarly Citations',
        maxPoints: 25,
        currentPoints: 24,
        description: 'High aesthetic quality and Chicago manual of style citations.'
      }
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Which historical battle in 751 CE led to the transmission of Chinese papermaking technology to the Islamic world?',
        options: ['Battle of Talas', 'Battle of Yarmouk', 'Battle of Hastings', 'Battle of Marathon'],
        correctIndex: 0,
        explanation: 'The Battle of Talas in 751 CE between the Tang Dynasty and the Abbasid Caliphate led to the capture of Chinese papermakers who established the first paper mills in Samarkand.'
      },
      {
        id: 'q2',
        question: 'What was the primary function of caravanserais along the Silk Road?',
        options: [
          'Military fortresses used solely for weapon storage',
          'Roadside inns providing safe lodging, food, and security for traveling merchants',
          'Monasteries strictly reserved for religious contemplation',
          'Toll booths managed by the Roman Emperor'
        ],
        correctIndex: 1,
        explanation: 'Caravanserais were strategically spaced roadside inns that supported trade caravans with fresh water, animal feed, and protected quarters.'
      }
    ]
  }
];
