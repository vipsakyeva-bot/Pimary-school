import React, { useState } from 'react';
import { Sun, Wind, Battery, Zap, RotateCcw, Plus, Play, Pause } from 'lucide-react';

interface DataPoint {
  id: number;
  tilt: number;
  windSpeed: number;
  condition: string;
  solarWatts: number;
  windWatts: number;
  totalWatts: number;
}

export const SolarEnergySimulator: React.FC = () => {
  const [tiltAngle, setTiltAngle] = useState<number>(35);
  const [windSpeed, setWindSpeed] = useState<number>(6.5);
  const [weatherCondition, setWeatherCondition] = useState<'sunny' | 'partlyCloudy' | 'overcast' | 'stormy'>('sunny');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [batteryLevel, setBatteryLevel] = useState<number>(68);
  const [loggedPoints, setLoggedPoints] = useState<DataPoint[]>([
    { id: 1, tilt: 35, windSpeed: 6.5, condition: 'Sunny', solarWatts: 42.4, windWatts: 38.6, totalWatts: 81.0 },
    { id: 2, tilt: 45, windSpeed: 8.2, condition: 'Partly Cloudy', solarWatts: 28.1, windWatts: 58.4, totalWatts: 86.5 },
    { id: 3, tilt: 25, windSpeed: 3.1, condition: 'Overcast', solarWatts: 14.2, windWatts: 7.8, totalWatts: 22.0 },
  ]);

  // Irradiance factors based on weather
  const irradianceMap = {
    sunny: 950,
    partlyCloudy: 620,
    overcast: 280,
    stormy: 120,
  };

  const currentIrradiance = irradianceMap[weatherCondition];

  // Mathematical model calculation
  // Optimal angle assumed ~35 deg for latitude
  const angleEfficiency = Math.max(0.2, Math.cos(((tiltAngle - 35) * Math.PI) / 180));
  const solarWatts = Number(((currentIrradiance / 1000) * 45 * angleEfficiency).toFixed(1));

  // Wind power equation: P = 0.5 * rho * A * v^3 * Cp (cut-in speed: 2.5 m/s)
  const effectiveWind = Math.max(0, windSpeed - 2.5);
  const windWatts = windSpeed < 2.5 ? 0 : Number((0.15 * Math.pow(effectiveWind, 2.7) * 4.2).toFixed(1));

  const totalWatts = Number((solarWatts + windWatts).toFixed(1));

  // Simulation step effect
  React.useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        const netChange = (totalWatts - 30) * 0.05; // 30W base community load
        const next = Math.min(100, Math.max(5, prev + netChange));
        return Number(next.toFixed(1));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isRunning, totalWatts]);

  const handleLogObservation = () => {
    const newEntry: DataPoint = {
      id: Date.now(),
      tilt: tiltAngle,
      windSpeed: windSpeed,
      condition: weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1),
      solarWatts,
      windWatts,
      totalWatts,
    };
    setLoggedPoints((prev) => [newEntry, ...prev.slice(0, 9)]);
  };

  const handleReset = () => {
    setTiltAngle(35);
    setWindSpeed(6.5);
    setWeatherCondition('sunny');
    setBatteryLevel(68);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-stone-50/50">
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">
            Hybrid Clean Energy Grid Simulation
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
            <span>Physical Model v2.4</span>
            <span aria-hidden="true">·</span>
            <span>Diurnal STC Irradiance</span>
            <span aria-hidden="true">·</span>
            <span>Betz Limit Aerodynamics</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isRunning ? 'Pause Loop' : 'Run Loop'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reset Setup</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Interactive Visual Stage (Left 7 Cols) */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between bg-stone-50/30">
          {/* Live System Schematic Canvas */}
          <div className="relative w-full h-72 sm:h-80 bg-stone-900 rounded-xl p-5 overflow-hidden flex flex-col justify-between text-white border border-stone-800">
            {/* Sky Background Tint */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                weatherCondition === 'sunny'
                  ? 'bg-gradient-to-b from-sky-900/60 via-stone-900 to-stone-950'
                  : weatherCondition === 'partlyCloudy'
                  ? 'bg-gradient-to-b from-slate-800/70 via-stone-900 to-stone-950'
                  : weatherCondition === 'overcast'
                  ? 'bg-gradient-to-b from-stone-800/80 via-stone-900 to-stone-950'
                  : 'bg-gradient-to-b from-zinc-950 via-stone-950 to-black'
              }`}
            />

            {/* Top Status Strip */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-stone-300">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'}`} />
                <span>GRID BUS: 24.2 VDC</span>
              </span>
              <span className="tabular-nums">LOAD CONSUMPTION: 30.0 W</span>
            </div>

            {/* Center Visuals: Solar Panel & Wind Turbine with SVG Dynamics */}
            <div className="relative z-10 grid grid-cols-2 gap-4 items-center my-auto py-2">
              {/* Solar Panel Box */}
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-stone-800/70 border border-stone-700/60 backdrop-blur-xs">
                <Sun className={`w-8 h-8 mb-2 ${weatherCondition === 'sunny' ? 'text-amber-400 animate-spin-slow' : 'text-amber-200/50'}`} />
                <div className="text-xs font-medium text-stone-300">Photovoltaic Array</div>
                <div className="text-xl font-bold text-amber-400 tabular-nums mt-0.5">
                  {solarWatts} <span className="text-xs font-normal text-stone-300">W</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  Tilt: {tiltAngle}° · {currentIrradiance} W/m²
                </div>
              </div>

              {/* Wind Turbine Box */}
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-stone-800/70 border border-stone-700/60 backdrop-blur-xs">
                <Wind className={`w-8 h-8 mb-2 ${windSpeed > 3 ? 'text-cyan-400' : 'text-cyan-200/50'}`} />
                <div className="text-xs font-medium text-stone-300">Micro-Turbine (VAWT)</div>
                <div className="text-xl font-bold text-cyan-400 tabular-nums mt-0.5">
                  {windWatts} <span className="text-xs font-normal text-stone-300">W</span>
                </div>
                <div className="text-[11px] text-stone-400 mt-1">
                  Speed: {windSpeed} m/s · {windSpeed < 2.5 ? 'Below Cut-In' : 'Generating'}
                </div>
              </div>
            </div>

            {/* Bottom Energy Storage & Summation */}
            <div className="relative z-10 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Battery className={`w-4 h-4 ${batteryLevel > 20 ? 'text-emerald-400' : 'text-red-400'}`} />
                <span className="text-stone-300">Storage Bank:</span>
                <span className="font-semibold text-white tabular-nums">{batteryLevel}%</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                <span className="text-stone-300 font-sans">Combined:</span>
                <span className="font-bold text-sm tabular-nums text-white">{totalWatts} W</span>
              </div>
            </div>
          </div>

          {/* Real-Time Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-white rounded-lg border border-stone-200 text-stone-800">
              <div className="text-[11px] text-stone-500 font-medium">Net Power Delta</div>
              <div className={`text-base font-bold tabular-nums mt-0.5 ${totalWatts >= 30 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {totalWatts >= 30 ? `+${(totalWatts - 30).toFixed(1)} W` : `${(totalWatts - 30).toFixed(1)} W`}
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">
                {totalWatts >= 30 ? 'Surplus charging battery' : 'Deficit drawing battery'}
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 text-stone-800">
              <div className="text-[11px] text-stone-500 font-medium">Solar Array Efficiency</div>
              <div className="text-base font-bold tabular-nums text-stone-900 mt-0.5">
                {(angleEfficiency * 18.2).toFixed(1)}%
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">Rated cell baseline: 18.2%</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 text-stone-800">
              <div className="text-[11px] text-stone-500 font-medium">Turbine Power Coeff</div>
              <div className="text-base font-bold tabular-nums text-stone-900 mt-0.5">
                {windSpeed < 2.5 ? '0.00' : (0.28 + Math.min(0.12, windSpeed * 0.01)).toFixed(2)} Cp
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">Betz ceiling: 0.593</div>
            </div>
          </div>
        </div>

        {/* Control Deck (Right 5 Cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Experimental Controls & Variables
            </h3>

            {/* Weather / Irradiance Selector */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-2">
                Simulated Meteorological State
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['sunny', 'partlyCloudy', 'overcast', 'stormy'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setWeatherCondition(mode)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors ${
                      weatherCondition === mode
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {mode === 'sunny' && '☀️ Sunny Clear (950 W/m²)'}
                    {mode === 'partlyCloudy' && '⛅ Partly Cloudy (620 W/m²)'}
                    {mode === 'overcast' && '☁️ Overcast (280 W/m²)'}
                    {mode === 'stormy' && '⛈️ Storm Front (120 W/m²)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Solar Panel Tilt Angle Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span>Photovoltaic Panel Tilt</span>
                <span className="font-mono text-stone-900 tabular-nums">{tiltAngle}° from ground</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={tiltAngle}
                onChange={(e) => setTiltAngle(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>0° (Flat)</span>
                <span className="font-medium text-stone-600">35° (Optimal STC)</span>
                <span>90° (Vertical)</span>
              </div>
            </div>

            {/* Wind Velocity Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-stone-700 mb-1.5">
                <span>Ambient Wind Velocity</span>
                <span className="font-mono text-stone-900 tabular-nums">{windSpeed} m/s</span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                step="0.5"
                value={windSpeed}
                onChange={(e) => setWindSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>0 m/s (Calm)</span>
                <span>2.5 m/s (Cut-In)</span>
                <span>16 m/s (High Gale)</span>
              </div>
            </div>

            {/* Action to Log Observation */}
            <button
              onClick={handleLogObservation}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Data Point to Lab Notebook</span>
            </button>
          </div>

          {/* Mini Data Log Table */}
          <div className="pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-700">Recent Lab Trials ({loggedPoints.length})</span>
              <span className="text-[11px] text-stone-400">Values in Watts (W)</span>
            </div>

            <div className="overflow-x-auto max-h-36 overflow-y-auto rounded-lg border border-stone-200">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-stone-100/80 text-stone-600 font-medium">
                  <tr>
                    <th className="p-1.5 pl-2.5">Weather</th>
                    <th className="p-1.5">Tilt</th>
                    <th className="p-1.5">Wind</th>
                    <th className="p-1.5 text-right pr-2.5">Combined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {loggedPoints.map((pt) => (
                    <tr key={pt.id} className="hover:bg-stone-50">
                      <td className="p-1.5 pl-2.5 font-medium">{pt.condition}</td>
                      <td className="p-1.5 font-mono tabular-nums">{pt.tilt}°</td>
                      <td className="p-1.5 font-mono tabular-nums">{pt.windSpeed}m/s</td>
                      <td className="p-1.5 text-right pr-2.5 font-bold font-mono tabular-nums text-stone-900">
                        {pt.totalWatts} W
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
