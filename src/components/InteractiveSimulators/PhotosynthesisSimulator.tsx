import React, { useState, useEffect } from 'react';
import { Sparkles, Thermometer, Sun, Activity, RotateCcw } from 'lucide-react';

export const PhotosynthesisSimulator: React.FC = () => {
  const [lightLux, setLightLux] = useState<number>(14000);
  const [co2Percent, setCo2Percent] = useState<number>(0.8);
  const [tempCelsius, setTempCelsius] = useState<number>(24);
  const [bubbleCount, setBubbleCount] = useState<number>(0);

  // Biological kinetics calculation
  // 1. Light reaction limitation
  const lightFactor = Math.min(1.0, lightLux / 18500);

  // 2. Carbon dioxide limitation (RuBisCO saturation ~1.5%)
  const co2Factor = Math.min(1.0, co2Percent / 1.5);

  // 3. Thermal bell curve (optimal around 25-28C, drops sharply above 38C due to enzyme denaturation)
  let tempFactor = 1.0;
  if (tempCelsius < 25) {
    tempFactor = Math.max(0.2, (tempCelsius - 5) / 20);
  } else if (tempCelsius > 32) {
    tempFactor = Math.max(0.05, 1.0 - Math.pow((tempCelsius - 32) / 10, 2));
  }

  // Combined rate (bubbles per minute, max ~56)
  const baseRate = Math.min(lightFactor, co2Factor);
  const rawRate = 56 * baseRate * tempFactor;
  const bubblesPerMinute = Math.max(0, Math.round(rawRate));
  const glucoseYield = (bubblesPerMinute * 0.12).toFixed(2); // mg/hr

  // Determine current limiting factor
  let limitingFactor = 'None (Balanced Equilibrium)';
  if (tempCelsius > 38) {
    limitingFactor = 'Enzyme Denaturation (High Temperature)';
  } else if (tempCelsius < 15) {
    limitingFactor = 'Kinetic Molecular Slowdown (Low Temperature)';
  } else if (lightFactor < co2Factor) {
    limitingFactor = 'Light Illuminance (Photolysis Limited)';
  } else if (co2Factor < lightFactor) {
    limitingFactor = 'Carbon Dioxide Availability (Calvin Cycle Limited)';
  }

  // Bubble animation ticker
  useEffect(() => {
    if (bubblesPerMinute === 0) return;
    const intervalTime = Math.max(150, Math.round(60000 / bubblesPerMinute));
    const interval = setInterval(() => {
      setBubbleCount((prev) => (prev + 1) % 9999);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [bubblesPerMinute]);

  const handleReset = () => {
    setLightLux(14000);
    setCo2Percent(0.8);
    setTempCelsius(24);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-stone-50/50">
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            Photosynthetic Rate & Limiting Factors Laboratory
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
            <span>Elodea canadensis Aquatic Model</span>
            <span aria-hidden="true">·</span>
            <span>Blackman’s Law Validation</span>
            <span aria-hidden="true">·</span>
            <span>Enzyme Kinetics</span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
          <span>Reset Standard Baseline</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Visual Chamber (7 cols) */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-stone-200 bg-stone-50/30 flex flex-col justify-between">
          {/* Glass Beaker / Aquatic Chamber Simulation */}
          <div className="relative w-full h-72 sm:h-80 bg-stone-900 rounded-xl p-5 overflow-hidden flex flex-col justify-between text-white border border-stone-800">
            {/* Water chamber lighting tint */}
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 20%, rgba(14, 165, 233, ${Math.min(
                  0.45,
                  lightLux / 40000
                )}), rgba(12, 74, 110, 0.9) 70%, #0c1723 100%)`,
              }}
            />

            {/* Top Chamber Telemetry */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-cyan-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>RESPIROMETER ACTIVE</span>
              </span>
              <span className="tabular-nums">TOTAL O2 EMISSIONS: {bubbleCount}</span>
            </div>

            {/* Aquatic Plant Graphic & Rising Bubbles */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Rising bubble animations */}
                {bubblesPerMinute > 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-cyan-300/80 animate-bounce mb-1" />
                    <span className="w-3 h-3 rounded-full bg-cyan-200/90 animate-pulse mb-2" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-ping" />
                  </div>
                )}

                {/* Botanical Stem Vector representation */}
                <div className="w-4 h-24 bg-emerald-600 rounded-full relative">
                  <div className="absolute -left-5 top-4 w-7 h-3 bg-emerald-500 rounded-full -rotate-25" />
                  <div className="absolute -right-5 top-8 w-7 h-3 bg-emerald-500 rounded-full rotate-25" />
                  <div className="absolute -left-6 top-14 w-8 h-3.5 bg-emerald-500 rounded-full -rotate-20" />
                  <div className="absolute -right-6 top-18 w-8 h-3.5 bg-emerald-500 rounded-full rotate-20" />
                </div>
              </div>

              <div className="text-center mt-2">
                <div className="text-2xl font-bold text-cyan-300 tabular-nums">
                  {bubblesPerMinute} <span className="text-sm font-normal text-cyan-100">O2 bubbles / min</span>
                </div>
                <div className="text-xs text-stone-300 mt-0.5">
                  Chemical Yield: <span className="font-mono text-white font-semibold">{glucoseYield} mg/hr</span> glucose
                </div>
              </div>
            </div>

            {/* Bottom Biochemical Limiting Factor Indicator */}
            <div className="relative z-10 pt-3 border-t border-cyan-900/40 flex items-center justify-between text-xs">
              <span className="text-stone-300">Active Limiting Factor:</span>
              <span className="font-semibold text-amber-300 truncate max-w-xs">{limitingFactor}</span>
            </div>
          </div>

          {/* Real-time Reaction Formula Box */}
          <div className="mt-4 p-4 bg-white rounded-lg border border-stone-200">
            <div className="text-xs font-semibold text-stone-600 mb-1">Photochemical Mass Balance Equation</div>
            <div className="text-sm font-mono text-stone-900 tracking-tight font-medium">
              6 CO₂ + 6 H₂O + Light Energy → C₆H₁₂O₆ + 6 O₂ ↑
            </div>
            <div className="flex items-center gap-4 text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
              <span>Thylakoid Photolysis: {lightFactor >= 1 ? '100% Saturated' : `${(lightFactor * 100).toFixed(0)}% Capacity`}</span>
              <span aria-hidden="true">·</span>
              <span>RuBisCO Stroma Fixation: {co2Factor >= 1 ? '100% Saturated' : `${(co2Factor * 100).toFixed(0)}% Capacity`}</span>
            </div>
          </div>
        </div>

        {/* Right Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Limiting Factor Sliders
            </h3>

            {/* Light Intensity Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Illuminance</span>
                </span>
                <span className="font-mono text-stone-900 tabular-nums">{lightLux.toLocaleString()} lux</span>
              </div>
              <input
                type="range"
                min="0"
                max="30000"
                step="1000"
                value={lightLux}
                onChange={(e) => setLightLux(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>0 lux (Dark)</span>
                <span className="text-stone-600 font-medium">18.5k (Saturation)</span>
                <span>30,000 lux</span>
              </div>
            </div>

            {/* CO2 Concentration Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                  <span>Sodium Bicarbonate (CO₂ Supply)</span>
                </span>
                <span className="font-mono text-stone-900 tabular-nums">{co2Percent.toFixed(1)}% w/v</span>
              </div>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.1"
                value={co2Percent}
                onChange={(e) => setCo2Percent(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>0.0% (Deficient)</span>
                <span className="text-stone-600 font-medium">1.5% (Max RuBisCO)</span>
                <span>2.5%</span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                  <span>Water Bath Temperature</span>
                </span>
                <span className="font-mono text-stone-900 tabular-nums">{tempCelsius}°C</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={tempCelsius}
                onChange={(e) => setTempCelsius(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>5°C (Chilled)</span>
                <span className="text-emerald-700 font-medium">25°C (Optimal)</span>
                <span>45°C (Denatured)</span>
              </div>
            </div>
          </div>

          {/* Scientific Annotation Card */}
          <div className="p-4 rounded-lg bg-stone-100/70 border border-stone-200 text-xs text-stone-700 leading-relaxed">
            <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Blackman's Law Observation</span>
            </div>
            When you slide light intensity past 18,500 lux without increasing CO₂, notice how the oxygen evolution line levels off. Light is no longer the limiting factor—biochemical carbon fixation is!
          </div>
        </div>
      </div>
    </div>
  );
};
