import React, { useState } from 'react';
import Select from 'react-select';
import { FaMapMarkerAlt, FaPlaneDeparture, FaLeaf, FaCar, FaTree, FaBolt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Airport options with coordinates for distance calculation
const airportData = {
  DEL: { label: 'DEL – New Delhi, India', lat: 28.5665, lon: 77.1031 },
  BOM: { label: 'BOM – Mumbai, India', lat: 19.0896, lon: 72.8656 },
  BLR: { label: 'BLR – Bengaluru, India', lat: 13.1986, lon: 77.7066 },
  MAA: { label: 'MAA – Chennai, India', lat: 12.9941, lon: 80.1709 },
  HYD: { label: 'HYD – Hyderabad, India', lat: 17.2403, lon: 78.4294 },
  CCU: { label: 'CCU – Kolkata, India', lat: 22.6520, lon: 88.4463 },
  JFK: { label: 'JFK – New York, USA', lat: 40.6413, lon: -73.7781 },
  LAX: { label: 'LAX – Los Angeles, USA', lat: 33.9425, lon: -118.4081 },
  SFO: { label: 'SFO – San Francisco, USA', lat: 37.6213, lon: -122.379 },
  ORD: { label: "ORD – Chicago, USA", lat: 41.9742, lon: -87.9073 },
  ATL: { label: 'ATL – Atlanta, USA', lat: 33.6407, lon: -84.4277 },
  LHR: { label: 'LHR – London, UK', lat: 51.477500, lon: -0.461389 },
  LGW: { label: 'LGW – London Gatwick, UK', lat: 51.1537, lon: -0.1821 },
  MAN: { label: 'MAN – Manchester, UK', lat: 53.3537, lon: -2.2750 },
  CDG: { label: 'CDG – Paris, France', lat: 49.0097, lon: 2.5479 },
  FCO: { label: 'FCO – Rome, Italy', lat: 41.8003, lon: 12.2389 },
  AMS: { label: 'AMS – Amsterdam, Netherlands', lat: 52.3086, lon: 4.7639 },
  FRA: { label: 'FRA – Frankfurt, Germany', lat: 50.0379, lon: 8.5622 },
  ZRH: { label: 'ZRH – Zurich, Switzerland', lat: 47.4647, lon: 8.5492 },
  BCN: { label: 'BCN – Barcelona, Spain', lat: 41.2971, lon: 2.0785 },
  DXB: { label: 'DXB – Dubai, UAE', lat: 25.2532, lon: 55.3657 },
  DOH: { label: 'DOH – Doha, Qatar', lat: 25.2731, lon: 51.6081 },
  AUH: { label: 'AUH – Abu Dhabi, UAE', lat: 24.4330, lon: 54.6511 },
  RUH: { label: 'RUH – Riyadh, Saudi Arabia', lat: 24.9578, lon: 46.6989 },
  JED: { label: 'JED – Jeddah, Saudi Arabia', lat: 21.6796, lon: 39.1565 },
  HND: { label: 'HND – Tokyo Haneda, Japan', lat: 35.5494, lon: 139.7798 },
  NRT: { label: 'NRT – Tokyo Narita, Japan', lat: 35.7719, lon: 140.3929 },
  PEK: { label: 'PEK – Beijing, China', lat: 40.0801, lon: 116.5846 },
  HKG: { label: 'HKG – Hong Kong', lat: 22.3080, lon: 113.9185 },
  ICN: { label: 'ICN – Seoul, South Korea', lat: 37.4602, lon: 126.4407 },
  SIN: { label: 'SIN – Singapore', lat: 1.3644, lon: 103.9915 },
  SYD: { label: 'SYD – Sydney, Australia', lat: -33.9399, lon: 151.1753 },
  MEL: { label: 'MEL – Melbourne, Australia', lat: -37.6690, lon: 144.8410 },
  JNB: { label: 'JNB – Johannesburg, South Africa', lat: -26.1367, lon: 28.2411 },
  CPT: { label: 'CPT – Cape Town, South Africa', lat: -33.9715, lon: 18.6021 },
  CAI: { label: 'CAI – Cairo, Egypt', lat: 30.1219, lon: 31.4056 },
  ADD: { label: 'ADD – Addis Ababa, Ethiopia', lat: 8.9779, lon: 38.7993 },
  NBO: { label: 'NBO – Nairobi, Kenya', lat: -1.3192, lon: 36.9275 },
  GRU: { label: 'GRU – São Paulo, Brazil', lat: -23.4356, lon: -46.4731 },
  EZE: { label: 'EZE – Buenos Aires, Argentina', lat: -34.8222, lon: -58.5358 },
  BOG: { label: 'BOG – Bogotá, Colombia', lat: 4.7016, lon: -74.1469 },
  LIM: { label: 'LIM – Lima, Peru', lat: -12.0219, lon: -77.1143 },
  SCL: { label: 'SCL – Santiago, Chile', lat: -33.3930, lon: -70.7858 },
  AKL: { label: 'AKL – Auckland, New Zealand', lat: -37.0082, lon: 174.7850 },
  SVO: { label: 'SVO – Moscow, Russia', lat: 55.9726, lon: 37.4146 },
};

const airportOptions = Object.entries(airportData).map(([code, data]) => ({
  value: code,
  label: data.label,
}));

const travelClasses = [
  { value: 'economy', label: '🪑 Economy', multiplier: 1.0 },
  { value: 'premium', label: '💺 Premium Economy', multiplier: 1.6 },
  { value: 'business', label: '🛋️ Business', multiplier: 2.9 },
  { value: 'first', label: '👑 First Class', multiplier: 4.0 },
];

const tripTypes = [
  { value: 'one-way', label: '✈️ One Way' },
  { value: 'round-trip', label: '🔄 Round Trip' },
];

// Haversine formula to calculate distance in km
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// CO₂ per km per passenger (kg) — ICAO standard
function getCO2kg(distanceKm, classMultiplier, isRoundTrip) {
  let baseEmission;
  if (distanceKm < 1500) baseEmission = 0.255;       // Short-haul
  else if (distanceKm < 4000) baseEmission = 0.195;  // Medium-haul
  else baseEmission = 0.147;                          // Long-haul (more efficient per km)

  const total = distanceKm * baseEmission * classMultiplier * (isRoundTrip ? 2 : 1);
  return Math.round(total);
}

const glassStyle = {
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '16px',
};

const selectStyles = {
  control: (base) => ({
    ...base,
    background: 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '10px',
    color: 'white',
    boxShadow: 'none',
    minHeight: '44px',
    ':hover': { borderColor: 'rgba(80,209,238,0.6)' },
  }),
  singleValue: (base) => ({ ...base, color: 'white' }),
  placeholder: (base) => ({ ...base, color: 'rgba(255,255,255,0.5)' }),
  dropdownIndicator: (base) => ({ ...base, color: 'rgba(255,255,255,0.6)' }),
  indicatorSeparator: () => ({ display: 'none' }),
  input: (base) => ({ ...base, color: 'white' }),
  menu: (base) => ({
    ...base,
    background: 'rgba(15, 30, 50, 0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.15)',
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? 'rgba(80,209,238,0.35)'
      : state.isFocused
      ? 'rgba(80,209,238,0.15)'
      : 'transparent',
    color: 'white',
    fontSize: '13px',
    cursor: 'pointer',
  }),
};

const ResultCard = ({ icon: Icon, label, value, color }) => (
  <div
    style={{ ...glassStyle, borderColor: color + '55' }}
    className="flex flex-col items-center justify-center p-5 gap-2 text-white text-center"
  >
    <Icon style={{ color }} size={28} />
    <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    <p className="text-xs text-white/60 leading-tight">{label}</p>
  </div>
);

const OffsetTip = ({ co2kg }) => {
  const trees = Math.ceil(co2kg / 21);
  const carKm = Math.round(co2kg * 6.3);
  const bulbs = Math.round(co2kg * 6.7);

  return (
    <div style={glassStyle} className="p-6 text-white mt-4">
      <h3 className="text-lg font-bold mb-4 text-[#50d1ee]">🌱 What does this mean?</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <FaTree size={22} className="text-green-400" />
          <p className="font-bold text-lg">{trees}</p>
          <p className="text-xs text-white/55">trees needed to absorb this CO₂ in a year</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <FaCar size={22} className="text-yellow-400" />
          <p className="font-bold text-lg">{carKm.toLocaleString()} km</p>
          <p className="text-xs text-white/55">equivalent driving distance</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <FaBolt size={22} className="text-orange-400" />
          <p className="font-bold text-lg">{bulbs}</p>
          <p className="text-xs text-white/55">hours of a 100W bulb running</p>
        </div>
      </div>
    </div>
  );
};

const CarbonFootprintCalculator = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [travelClass, setTravelClass] = useState(travelClasses[0]);
  const [tripType, setTripType] = useState(tripTypes[0]);
  const [passengers, setPassengers] = useState(1);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!from || !to) {
      toast.error('Please select both departure and destination airports.', {
        theme: 'colored', autoClose: 2500, position: 'bottom-right',
      });
      return;
    }
    if (from.value === to.value) {
      toast.error('Origin and destination cannot be the same!', {
        theme: 'colored', autoClose: 2500, position: 'bottom-right',
      });
      return;
    }

    const origin = airportData[from.value];
    const dest = airportData[to.value];
    const distKm = Math.round(getDistanceKm(origin.lat, origin.lon, dest.lat, dest.lon));
    const isRound = tripType.value === 'round-trip';
    const co2PerPerson = getCO2kg(distKm, travelClass.multiplier, isRound);
    const totalCO2 = co2PerPerson * passengers;

    setResult({
      distKm,
      isRound,
      co2PerPerson,
      totalCO2,
      passengers,
      travelClass: travelClass.label,
    });
  };

  const handleReset = () => {
    setFrom(null);
    setTo(null);
    setTravelClass(travelClasses[0]);
    setTripType(tripTypes[0]);
    setPassengers(1);
    setResult(null);
  };

  return (
    <>
      <ToastContainer />
      {/* Full-page background matching Home page's dark travel aesthetic */}
      <div
        className="min-h-screen w-full flex flex-col items-center justify-start pt-28 pb-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #0d2137 40%, #0f2e2e 100%)',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-3 mb-3">
              <FaPlaneDeparture size={32} className="text-[#50d1ee]" />
              <h1 className="text-4xl font-extrabold text-white capitalize tracking-wide">
                Flight Carbon Calculator
              </h1>
            </div>
            <p className="text-white/50 text-sm">
              Estimate the CO₂ emissions of your flight and understand your environmental impact.
            </p>
          </div>

          {/* Calculator Card */}
          <div style={glassStyle} className="p-8 mb-6">
            {/* Trip Type Toggle */}
            <div className="flex gap-3 mb-6">
              {tripTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTripType(t)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background:
                      tripType.value === t.value
                        ? 'rgba(80,209,238,0.3)'
                        : 'rgba(255,255,255,0.07)',
                    border:
                      tripType.value === t.value
                        ? '1px solid rgba(80,209,238,0.6)'
                        : '1px solid rgba(255,255,255,0.12)',
                    color: tripType.value === t.value ? '#50d1ee' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[#50d1ee]" /> From
                </label>
                <Select
                  options={airportOptions}
                  value={from}
                  onChange={setFrom}
                  placeholder="Departure airport"
                  styles={selectStyles}
                />
              </div>
              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[#50d1ee]" /> To
                </label>
                <Select
                  options={airportOptions}
                  value={to}
                  onChange={setTo}
                  placeholder="Destination airport"
                  styles={selectStyles}
                />
              </div>
            </div>

            {/* Class & Passengers */}
            <div className="grid grid-cols-2 gap-4 mb-7">
              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block">
                  Travel Class
                </label>
                <Select
                  options={travelClasses}
                  value={travelClass}
                  onChange={setTravelClass}
                  styles={selectStyles}
                />
              </div>
              <div>
                <label className="text-white/60 text-xs uppercase tracking-widest mb-2 block">
                  Passengers
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                    className="w-10 h-10 rounded-xl text-white font-bold text-xl transition"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    −
                  </button>
                  <span
                    className="flex-1 text-center text-white font-bold text-xl py-2 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    {passengers}
                  </span>
                  <button
                    onClick={() => setPassengers((p) => Math.min(20, p + 1))}
                    className="w-10 h-10 rounded-xl text-white font-bold text-xl transition"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleCalculate}
                className="flex-1 py-4 font-bold text-base rounded-br-[24px] rounded-tl-[24px] hover:rounded-tr-[24px] hover:rounded-bl-[24px] hover:rounded-br-[0] hover:rounded-tl-[0] transition-all duration-300"
                style={{
                  background: 'rgba(80,209,238,0.25)',
                  border: '1px solid rgba(80,209,238,0.5)',
                  color: '#50d1ee',
                }}
              >
                🌍 Calculate CO₂
              </button>
              {result && (
                <button
                  onClick={handleReset}
                  className="px-6 py-4 font-semibold text-sm rounded-xl transition"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="animate-fade-in">
              {/* Summary line */}
              <div style={glassStyle} className="p-5 mb-4 text-center text-white/70 text-sm">
                <span className="text-white font-semibold">{from.value}</span>
                {result.isRound ? ' ↔ ' : ' → '}
                <span className="text-white font-semibold">{to.value}</span>
                {'  ·  '}
                <span>{result.distKm.toLocaleString()} km{result.isRound ? ' (round trip)' : ''}</span>
                {'  ·  '}
                <span>{result.travelClass}</span>
                {'  ·  '}
                <span>{result.passengers} passenger{result.passengers > 1 ? 's' : ''}</span>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <ResultCard
                  icon={FaLeaf}
                  label="CO₂ per passenger"
                  value={`${result.co2PerPerson.toLocaleString()} kg`}
                  color="#50d1ee"
                />
                <ResultCard
                  icon={FaPlaneDeparture}
                  label={`Total CO₂ (${result.passengers} pax)`}
                  value={`${result.totalCO2.toLocaleString()} kg`}
                  color="#f1b556"
                />
                <ResultCard
                  icon={FaTree}
                  label="Tonnes of CO₂"
                  value={`${(result.totalCO2 / 1000).toFixed(2)} t`}
                  color="#4ade80"
                />
              </div>

              {/* Context / Offset tips */}
              <OffsetTip co2kg={result.totalCO2} />

              {/* Offset CTA */}
              <div style={{ ...glassStyle, borderColor: 'rgba(74,222,128,0.3)' }} className="p-5 mt-4 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold text-sm">Want to offset your footprint?</p>
                  <p className="text-white/45 text-xs mt-1">
                    Consider donating to reforestation or renewable energy projects.
                  </p>
                </div>
                <button
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm transition"
                  style={{
                    background: 'rgba(74,222,128,0.2)',
                    border: '1px solid rgba(74,222,128,0.45)',
                    color: '#4ade80',
                  }}
                >
                  🌿 Offset Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarbonFootprintCalculator;
