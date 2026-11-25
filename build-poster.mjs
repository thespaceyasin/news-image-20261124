import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname);
const SCRATCH_HTML = path.join(ROOT, ".poster-render.html");
const OUT_PNG = path.join(ROOT, "entry.png");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

function findBrowser() {
  for (const p of CHROME_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("No headless Chromium/Edge binary found.");
}

const REGION_COLORS = {
  EU: "#1D4ED8",
  ME: "#C2410C",
  AF: "#15803D",
  EA: "#B91C1C",
  SA: "#9333EA",
  SE: "#0F766E",
  NA: "#4338CA",
  LA: "#A16207",
  OC: "#0369A1",
  WS: "#334155",
};

const REGIONS = [
  { key: "EU", name: "EUROPE", short: "Europe", count: 6 },
  { key: "ME", name: "MID. EAST", short: "Mid. East", count: 5 },
  { key: "AF", name: "AFRICA", short: "Africa", count: 4 },
  { key: "EA", name: "E. ASIA", short: "East Asia", count: 4 },
  { key: "SA", name: "S. ASIA", short: "South Asia", count: 3 },
  { key: "SE", name: "SE ASIA", short: "SE Asia", count: 4 },
  { key: "NA", name: "N. AMERICA", short: "N. America", count: 4 },
  { key: "LA", name: "LAT. AMER.", short: "Lat. Amer.", count: 3 },
  { key: "OC", name: "OCEANIA", short: "Oceania", count: 2 },
  { key: "WS", name: "WORLD/SPACE", short: "World/Space", count: 3 },
];

const UTC_TIMELINE = [
  { time: "02:30", label: "Villavicencio bomb" },
  { time: "05:30", label: "TAIEX +8.99%" },
  { time: "~06:50", label: "Sanofi $41bn" },
  { time: "~11:00", label: "EU 350k hybrid" },
  { time: "~15:00", label: "Sarkozy 2027 trial" },
  { time: "~19:30", label: "Huawei 10/12" },
  { time: "21:00", label: "Dow 50,019" },
];

const KEY_NUMBERS = [
  { val: "$41bn", lbl: "Sanofi–Insmed cash deal", c: REGION_COLORS.NA },
  { val: "50,019", lbl: "Dow milestone close", c: REGION_COLORS.NA },
  { val: "5,258", lbl: "England heat deaths", c: REGION_COLORS.EU },
  { val: "10 / 12", lbl: "Huawei guilty counts", c: REGION_COLORS.NA },
  { val: "47,000", lbl: "UN 2025 femicides", c: REGION_COLORS.WS },
  { val: "6,800", lbl: "Rohingya return plan", c: REGION_COLORS.SE },
];

function svgLead1() {
  return `<svg viewBox="0 0 320 100" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#EFC8A8"/><stop offset="68%" stop-color="#FBECE0"/><stop offset="100%" stop-color="#F6DEC8"/>
      </linearGradient>
      <linearGradient id="riv1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E3A54"/><stop offset="100%" stop-color="#102538"/>
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#sky1)"/>
    <!-- Warm sunset disc & haze -->
    <circle cx="146" cy="48" r="30" fill="#E98E62" opacity="0.38"/>
    <circle cx="146" cy="48" r="18" fill="#FDE68A" opacity="0.45"/>
    <!-- Distant skyline haze -->
    <g fill="#7C5E58" opacity="0.32">
      <rect x="0" y="54" width="22" height="28"/>
      <rect x="195" y="48" width="20" height="34"/>
      <rect x="220" y="56" width="24" height="26"/>
      <rect x="282" y="52" width="38" height="30"/>
    </g>
    <!-- Foreground Bund & Lujiazui panorama -->
    <rect x="6" y="56" width="26" height="26" fill="#334155"/>
    <path d="M12,56 Q19,44 26,56 Z" fill="#1E293B"/>
    <rect x="36" y="44" width="16" height="38" fill="#1E293B"/>
    <rect x="56" y="38" width="14" height="44" fill="#334155"/>
    <!-- Oriental Pearl Tower -->
    <line x1="88" y1="82" x2="88" y2="7" stroke="#1E293B" stroke-width="2.4"/>
    <line x1="78" y1="82" x2="88" y2="54" stroke="#1E293B" stroke-width="2.4"/>
    <line x1="98" y1="82" x2="88" y2="54" stroke="#1E293B" stroke-width="2.4"/>
    <circle cx="88" cy="27" r="5.5" fill="#B91C1C" stroke="#7F1D1D" stroke-width="0.8"/>
    <circle cx="88" cy="52" r="8.5" fill="#B91C1C" stroke="#7F1D1D" stroke-width="0.8"/>
    <circle cx="85.5" cy="49.5" r="2" fill="#FCA5A5" opacity="0.7"/>
    <!-- Jin Mao & Shanghai World Financial Center & Shanghai Tower -->
    <polygon points="108,82 113,22 121,22 126,82" fill="#1E293B"/>
    <path d="M132,82 L136,12 L146,12 L150,82 Z" fill="#0F172A"/>
    <line x1="138" y1="22" x2="144" y2="22" stroke="#F59E0B" stroke-width="1" opacity="0.6"/>
    <line x1="137" y1="36" x2="145" y2="36" stroke="#F59E0B" stroke-width="1" opacity="0.6"/>
    <line x1="136" y1="50" x2="146" y2="50" stroke="#F59E0B" stroke-width="1" opacity="0.6"/>
    <path d="M156,82 L160,18 L174,18 L178,82 Z" fill="#334155"/>
    <rect x="163" y="23" width="8" height="7" fill="#FBECE0"/>
    <rect x="184" y="42" width="16" height="40" fill="#1E293B"/>
    <!-- Official CCDI Dossier & Crimson Seal right foreground -->
    <g transform="translate(226,40)">
      <rect x="0" y="4" width="82" height="38" rx="2" fill="#FFFDF8" stroke="#991B1B" stroke-width="1.2"/>
      <line x1="8" y1="14" x2="48" y2="14" stroke="#94A3B8" stroke-width="1.8"/>
      <line x1="8" y1="21" x2="44" y2="21" stroke="#CBD5E1" stroke-width="1.6"/>
      <line x1="8" y1="28" x2="40" y2="28" stroke="#CBD5E1" stroke-width="1.6"/>
      <circle cx="64" cy="23" r="13" fill="#991B1B"/>
      <rect x="57" y="16" width="14" height="14" fill="none" stroke="#FDE68A" stroke-width="1.2"/>
      <text x="64" y="25.5" text-anchor="middle" font-family="Georgia, serif" font-size="7.2" font-weight="800" fill="#FDE68A">CCDI</text>
    </g>
    <!-- Huangpu river with warm reflections -->
    <rect x="0" y="81" width="320" height="19" fill="url(#riv1)"/>
    <line x1="20" y1="87" x2="108" y2="87" stroke="#F59E0B" stroke-width="1.3" opacity="0.6"/>
    <line x1="76" y1="92" x2="178" y2="92" stroke="#FCA5A5" stroke-width="1.2" opacity="0.5"/>
    <line x1="150" y1="96" x2="260" y2="96" stroke="#7BA4BF" stroke-width="1.1" opacity="0.5"/>
    <!-- Compact editorial corner ribbon -->
    <rect x="184" y="7" width="128" height="22" rx="2" fill="#7F1D1D"/>
    <text x="248" y="21.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="10.3" font-weight="800" fill="#FFFFFF" letter-spacing="0.4">POLITBURO PROBE</text>
  </svg>`;
}

function svgLead2() {
  return `<svg viewBox="0 0 320 100" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="navy2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0C1B33"/><stop offset="100%" stop-color="#1B3660"/>
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#navy2)"/>
    <!-- Subtle full-width silicon trace backdrop -->
    <g stroke="#3B82F6" stroke-width="1" fill="none" opacity="0.25">
      <polyline points="118,16 150,16 162,28 210,28"/>
      <polyline points="122,44 148,44 156,52 195,52"/>
      <polyline points="240,76 286,76 296,66 320,66"/>
      <circle cx="150" cy="16" r="2.2" fill="#3B82F6"/>
      <circle cx="296" cy="66" r="2.2" fill="#3B82F6"/>
    </g>
    <!-- Classical Brooklyn Federal Courthouse -->
    <polygon points="10,33 58,9 106,33" fill="#E2E8F0" stroke="#94A3B8" stroke-width="0.8"/>
    <circle cx="58" cy="24" r="4" fill="#F59E0B"/>
    <rect x="13" y="33" width="90" height="5" fill="#CBD5E1"/>
    <rect x="18" y="38" width="9" height="44" fill="#F8FAFC"/>
    <rect x="35" y="38" width="9" height="44" fill="#F8FAFC"/>
    <rect x="53" y="38" width="9" height="44" fill="#F8FAFC"/>
    <rect x="71" y="38" width="9" height="44" fill="#F8FAFC"/>
    <rect x="88" y="38" width="9" height="44" fill="#F8FAFC"/>
    <rect x="8" y="82" width="100" height="6" fill="#94A3B8"/>
    <rect x="4" y="88" width="108" height="6" fill="#64748B"/>
    <!-- Grounded Judge Bench & Gavel center -->
    <g transform="translate(110,48)">
      <rect x="0" y="34" width="52" height="18" fill="#78350F" stroke="#451A03" stroke-width="1"/>
      <rect x="4" y="38" width="44" height="10" fill="#92400E" stroke="#F59E0B" stroke-width="0.7"/>
      <text x="26" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="5.2" font-weight="800" fill="#FDE68A">EDNY COURT</text>
      <rect x="8" y="29" width="36" height="5" rx="1" fill="#B45309" stroke="#451A03" stroke-width="0.8"/>
      <line x1="12" y1="29" x2="40" y2="9" stroke="#D97706" stroke-width="3.6" stroke-linecap="round"/>
      <rect x="26" y="-1" width="18" height="10" rx="2" fill="#F59E0B" stroke="#78350F" stroke-width="0.9" transform="rotate(-34 35 4)"/>
    </g>
    <!-- Compact Verdict Strip + 12 Jury Count Lights -->
    <rect x="172" y="10" width="138" height="24" rx="2" fill="#F59E0B"/>
    <text x="241" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#0F172A">10 OF 12 GUILTY</text>
    <g transform="translate(172,42)">
      ${Array.from({ length: 12 }, (_, i) => {
        const fill = i < 10 ? "#EF4444" : "#475569";
        return `<rect x="${i * 11.6}" y="0" width="9.5" height="16" rx="1.5" fill="${fill}" stroke="#F8FAFC" stroke-width="0.7"/>`;
      }).join("")}
    </g>
    <text x="241" y="72" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.6" font-weight="800" fill="#93C5FD" letter-spacing="0.4">FRAUD &amp; TRADE SECRETS</text>
    <text x="241" y="84" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.8" font-weight="700" fill="#CBD5E1">ACQUITTED OF RACKETEERING</text>
  </svg>`;
}

function svgLead3() {
  return `<svg viewBox="0 0 320 100" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lab3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#DCF2EC"/><stop offset="100%" stop-color="#F2FAF7"/>
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#lab3)"/>
    <!-- Lab shelf & labeled vials left-top -->
    <line x1="8" y1="32" x2="120" y2="32" stroke="#1E293B" stroke-width="1.4"/>
    <g stroke="#1E293B" stroke-width="0.9">
      <rect x="14" y="13" width="18" height="19" rx="2" fill="#FFFFFF"/>
      <rect x="17" y="9" width="12" height="4" fill="#0F766E"/>
      <rect x="16" y="19" width="14" height="8" fill="#1D4ED8"/>
      <rect x="38" y="15" width="16" height="17" rx="2" fill="#FFFFFF"/>
      <rect x="41" y="11" width="10" height="4" fill="#E11D48"/>
      <rect x="40" y="20" width="12" height="8" fill="#0D9488"/>
      <rect x="60" y="11" width="20" height="21" rx="2" fill="#FFFDF8"/>
      <rect x="64" y="7" width="12" height="4" fill="#334155"/>
      <rect x="62" y="18" width="16" height="9" fill="#F59E0B"/>
    </g>
    <!-- Lab bench line -->
    <rect x="0" y="82" width="320" height="18" fill="#B8DED4"/>
    <line x1="0" y1="82" x2="320" y2="82" stroke="#1E293B" stroke-width="1.2"/>
    <!-- Biotech flasks & lung-drug Ligne Claire scene -->
    <g stroke="#1E293B" stroke-width="1.2" fill="none">
      <path d="M18,82 L27,48 V37 H35 V48 L44,82 Z" fill="#FFFFFF"/>
      <path d="M21,69 L41,69 L44,82 L18,82 Z" fill="#0D9488" stroke="none"/>
      <circle cx="31" cy="60" r="2.2" fill="#99F6E4" stroke="none"/>
      <circle cx="35" cy="54" r="1.8" fill="#5EEAD4" stroke="none"/>
    </g>
    <!-- Stylized geometric lungs + capsule with crisp ink lines -->
    <g transform="translate(58,36)">
      <line x1="24" y1="0" x2="24" y2="18" stroke="#1E293B" stroke-width="2.6"/>
      <path d="M22,12 C10,12 6,26 8,36 C10,43 18,43 22,36 Z" fill="#0F766E" stroke="#1E293B" stroke-width="1"/>
      <path d="M26,12 C38,12 42,26 40,36 C38,43 30,43 26,36 Z" fill="#0D9488" stroke="#1E293B" stroke-width="1"/>
      <g transform="translate(8,33) rotate(-10)">
        <rect x="0" y="0" width="34" height="11" rx="5.5" fill="#1D4ED8" stroke="#1E293B" stroke-width="1"/>
        <path d="M17,0 H28.5 A5.5,5.5 0 0 1 28.5,11 H17 Z" fill="#E11D48" stroke="#1E293B" stroke-width="1"/>
      </g>
    </g>
    <!-- Rising 3-year Pharma M&A towers with crisp outlines -->
    <g transform="translate(132,16)">
      <rect x="0" y="44" width="17" height="22" fill="#94A3B8" stroke="#1E293B" stroke-width="0.9"/>
      <rect x="23" y="30" width="17" height="36" fill="#0284C7" stroke="#1E293B" stroke-width="0.9"/>
      <rect x="46" y="4" width="20" height="62" fill="#065F46" stroke="#1E293B" stroke-width="0.9"/>
      <text x="8.5" y="77" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.6" font-weight="800" fill="#334155">'24</text>
      <text x="31.5" y="77" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.6" font-weight="800" fill="#334155">'25</text>
      <text x="56" y="77" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.6" font-weight="800" fill="#065F46">'26</text>
    </g>
    <!-- Compact high-impact deal callout -->
    <rect x="212" y="10" width="100" height="24" rx="2" fill="#065F46"/>
    <text x="262" y="26.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="13.5" font-weight="800" fill="#FFFFFF">$41BN CASH</text>
    <rect x="212" y="38" width="100" height="16" rx="2" fill="#F59E0B"/>
    <text x="262" y="49" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.6" font-weight="800" fill="#11100D">$175 / SHARE</text>
    <text x="262" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.2" font-weight="800" fill="#065F46">SANOFI → INSMED</text>
    <text x="262" y="93" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.4" font-weight="700" fill="#1E293B">TOP PHARMA M&amp;A IN 3 YRS</text>
  </svg>`;
}

function svgFeature4() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="58" fill="#ECE2CC"/>
    <path d="M0,0 H102 L94,24 L106,58 H0 Z" fill="#C7D7EA"/>
    <!-- Border line -->
    <path d="M102,0 L94,24 L106,58" fill="none" stroke="#B91C1C" stroke-width="2" stroke-dasharray="4,2"/>
    <!-- Concentric green NATO radar sweeps -->
    <g fill="none" stroke="#047857" stroke-width="1.3">
      <path d="M18,54 A34,34 0 0 1 86,54" opacity="0.65"/>
      <path d="M30,54 A22,22 0 0 1 74,54" opacity="0.85"/>
      <path d="M42,54 A10,10 0 0 1 62,54"/>
    </g>
    <!-- Drone crossing 20km in and curving back -->
    <path d="M150,34 Q96,10 66,24 Q90,39 144,41" fill="none" stroke="#0F172A" stroke-width="1.5" stroke-dasharray="2.5,2"/>
    <polygon points="55,24 69,18 65,24 69,30" fill="#111827"/>
    <!-- Zaporizhzhia strike starburst + smoke (cleanly above label) -->
    <circle cx="164" cy="31" r="9.5" fill="#F97316" opacity="0.35"/>
    <polygon points="164,21 167.5,28 175,26.5 169.5,32 173,39.5 166,36 160.5,41.5 160.5,34 153,32 160.5,28.5" fill="#DC2626"/>
    <text x="10" y="13" font-family="Arial, sans-serif" font-size="7.4" font-weight="800" fill="#1E3A8A">POLAND · 20 KM IN</text>
    <text x="164" y="54.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="6.8" font-weight="800" fill="#7F1D1D">ZAPORIZHZHIA</text>
    <rect x="148" y="5" width="87" height="17" rx="2" fill="#991B1B"/>
    <text x="191.5" y="16.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.2" font-weight="800" fill="#FFFFFF">2 DEAD · 40+ HURT</text>
  </svg>`;
}

function svgFeature5() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heat5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F9A882"/><stop offset="72%" stop-color="#FDE3C8"/><stop offset="100%" stop-color="#E56B4E"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#heat5)"/>
    <!-- Scorching summer sun & heat rings -->
    <circle cx="48" cy="24" r="22" fill="#DC2626" opacity="0.24"/>
    <circle cx="48" cy="24" r="14" fill="#DC2626"/>
    <circle cx="48" cy="24" r="9" fill="#FACC15"/>
    <!-- Full-width London skyline (Big Ben, London Eye, St Paul's, Shard) -->
    <g fill="#1E293B">
      <rect x="10" y="34" width="8" height="16"/>
      <polygon points="10,34 14,19 18,34"/>
      <rect x="20" y="40" width="24" height="10"/>
      <circle cx="62" cy="36" r="10" fill="none" stroke="#1E293B" stroke-width="1.6"/>
      <path d="M84,50 Q94,32 104,50 Z"/>
      <polygon points="116,50 122,14 128,50"/>
    </g>
    <!-- Rising mortality bars right (cleanly below badge) -->
    <rect x="148" y="42" width="11" height="8" fill="#F59E0B" opacity="0.9"/>
    <rect x="163" y="37" width="11" height="13" fill="#EA580C" opacity="0.95"/>
    <rect x="178" y="31" width="11" height="19" fill="#DC2626"/>
    <rect x="193" y="25" width="12" height="25" fill="#7F1D1D"/>
    <!-- Thames river -->
    <rect x="0" y="50" width="240" height="8" fill="#9A3412" opacity="0.65"/>
    <!-- Compact badge -->
    <rect x="142" y="4" width="93" height="18" rx="2" fill="#7F1D1D"/>
    <text x="188.5" y="16.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.6" font-weight="800" fill="#FFFFFF">5,258 DEATHS</text>
  </svg>`;
}

function svgFeature6() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="58" fill="#184C78"/>
    <!-- Wave lines -->
    <path d="M0,26 Q25,23 50,26 T100,26 T150,26 T200,26 T240,26" fill="none" stroke="#3B82B6" stroke-width="1"/>
    <!-- Iranian mainland north & Omani peninsula south -->
    <path d="M0,0 H240 V12 Q175,20 120,11 Q55,18 0,11 Z" fill="#D4B888" stroke="#9B8258" stroke-width="0.7"/>
    <path d="M0,58 V47 Q55,44 108,39 Q138,44 166,52 L240,48 V58 Z" fill="#C4A470" stroke="#8C734B" stroke-width="0.7"/>
    <text x="14" y="9" font-family="Arial, sans-serif" font-size="6.5" font-weight="800" fill="#574326">IRAN</text>
    <text x="106" y="54.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="6.5" font-weight="800" fill="#4A381F">OMAN</text>
    <!-- Three oil tankers ablaze -->
    <g transform="translate(14,22)">
      <polygon points="0,10 42,10 38,16 4,16" fill="#0F172A"/>
      <rect x="8" y="6" width="9" height="4" fill="#475569"/>
      <path d="M22,10 Q26,-1 30,6 Q33,1 35,10 Z" fill="#F97316"/>
      <circle cx="30" cy="2" r="4" fill="#334155" opacity="0.6"/>
    </g>
    <g transform="translate(76,20)">
      <polygon points="0,10 40,10 36,16 4,16" fill="#0F172A"/>
      <path d="M16,10 Q20,0 24,6 Q27,2 29,10 Z" fill="#EF4444"/>
      <circle cx="23" cy="2" r="3.5" fill="#334155" opacity="0.6"/>
    </g>
    <g transform="translate(138,31)">
      <polygon points="0,8 36,8 32,14 4,14" fill="#0F172A"/>
      <path d="M15,8 Q19,0 23,8 Z" fill="#F59E0B"/>
    </g>
    <!-- Floating naval mine -->
    <circle cx="126" cy="34" r="4" fill="#111827" stroke="#FBBF24" stroke-width="1"/>
    <rect x="142" y="5" width="93" height="17" rx="2" fill="#C2410C"/>
    <text x="188.5" y="16.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.4" font-weight="800" fill="#FFFFFF">3 TANKERS · CLAIM</text>
  </svg>`;
}

function svgFeature7() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pit7" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D7F4E3"/><stop offset="56%" stop-color="#EBFBEE"/><stop offset="57%" stop-color="#15803D"/><stop offset="100%" stop-color="#166534"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#pit7)"/>
    <!-- Stadium floodlights & subtle terrace silhouette -->
    <path d="M0,34 Q60,24 120,30 Q180,24 240,34 Z" fill="#166534" opacity="0.22"/>
    <polygon points="10,0 24,0 56,34 42,34" fill="#FFFFFF" opacity="0.28"/>
    <polygon points="216,0 230,0 198,34 184,34" fill="#FFFFFF" opacity="0.28"/>
    <!-- Stadium pitch markings -->
    <line x1="0" y1="35" x2="240" y2="35" stroke="#86EFAC" stroke-width="1" opacity="0.7"/>
    <ellipse cx="120" cy="48" rx="34" ry="8" fill="none" stroke="#86EFAC" stroke-width="1" opacity="0.7"/>
    <!-- Senegal waving flag left with crisp ink border -->
    <g transform="translate(12,10)">
      <rect x="0" y="0" width="17" height="36" fill="#15803D"/>
      <rect x="17" y="0" width="17" height="36" fill="#FACC15"/>
      <rect x="34" y="0" width="17" height="36" fill="#DC2626"/>
      <rect x="0" y="0" width="51" height="36" fill="none" stroke="#1E293B" stroke-width="1"/>
      <polygon points="25.5,11 27.3,16.5 33,16.5 28.3,19.8 30,25.2 25.5,22 21,25.2 22.7,19.8 18,16.5 23.7,16.5" fill="#15803D"/>
    </g>
    <!-- Gold AFCON championship trophy center with Ligne Claire outline -->
    <g transform="translate(82,7)">
      <path d="M5,5 H29 V19 C29,29 22,34 17,34 C12,34 5,29 5,19 Z" fill="#F59E0B" stroke="#1E293B" stroke-width="1.1"/>
      <path d="M5,10 C-2,10 -2,20 5,21" fill="none" stroke="#B45309" stroke-width="2"/>
      <path d="M29,10 C36,10 36,20 29,21" fill="none" stroke="#B45309" stroke-width="2"/>
      <rect x="14" y="34" width="6" height="8" fill="#B45309" stroke="#1E293B" stroke-width="0.9"/>
      <rect x="8" y="42" width="18" height="4.5" fill="#78350F" stroke="#1E293B" stroke-width="0.9"/>
    </g>
    <!-- Mini CAS court gavel icon -->
    <g transform="translate(125,37)">
      <line x1="0" y1="14" x2="15" y2="5" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round"/>
      <rect x="9" y="0" width="9" height="5" rx="1" fill="#F59E0B" stroke="#1E293B" stroke-width="0.7" transform="rotate(-30 13 3)"/>
    </g>
    <!-- Compact badge -->
    <rect x="136" y="7" width="98" height="19" rx="2" fill="#065F46"/>
    <text x="185" y="19.8" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF">TITLE RESTORED</text>
    <text x="185" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.6" font-weight="800" fill="#FEF08A">CAS OVERTURNS CAF</text>
  </svg>`;
}

function svgFeature8() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="un8" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E143B"/><stop offset="74%" stop-color="#3F2770"/><stop offset="100%" stop-color="#6B3FA0"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#un8)"/>
    <!-- Warm horizon glow -->
    <rect x="0" y="48" width="240" height="10" fill="#150E29"/>
    <!-- UN Globe & wreath left -->
    <g stroke="#93C5FD" fill="none" stroke-width="1.3" transform="translate(30,26)">
      <circle cx="0" cy="0" r="13"/>
      <ellipse cx="0" cy="0" rx="6.5" ry="13"/>
      <line x1="-13" y1="0" x2="13" y2="0"/>
      <path d="M-17,5 A18,18 0 0 0 0,18 A18,18 0 0 0 17,5" stroke="#C4B5FD" stroke-width="1.8"/>
    </g>
    <!-- Row of vigil memorial candles across horizon -->
    <g>
      <rect x="66" y="34" width="6" height="16" fill="#F8FAFC"/>
      <path d="M69,24 Q72,29 69,33 Q66,29 69,24 Z" fill="#FBBF24"/>
      <rect x="82" y="38" width="5" height="12" fill="#E2E8F0"/>
      <path d="M84.5,30 Q87,34 84.5,37 Q82,34 84.5,30 Z" fill="#F59E0B"/>
      <rect x="96" y="32" width="6" height="18" fill="#F8FAFC"/>
      <path d="M99,22 Q102,27 99,31 Q96,27 99,22 Z" fill="#FDE68A"/>
      <rect x="112" y="39" width="5" height="11" fill="#E2E8F0"/>
      <path d="M114.5,32 Q117,35 114.5,38 Q112,35 114.5,32 Z" fill="#FBBF24"/>
    </g>
    <!-- Clean Typography Callout -->
    <text x="182" y="27" text-anchor="middle" font-family="Georgia, serif" font-size="21" font-weight="800" fill="#FFFFFF">47,000</text>
    <rect x="132" y="33" width="100" height="14" rx="2" fill="#F59E0B"/>
    <text x="182" y="42.8" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.6" font-weight="800" fill="#11100D">~5 WOMEN / HOUR</text>
  </svg>`;
}

function svgFeature9() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="58" fill="#0B1626"/>
    <!-- Subtle semiconductor die grid -->
    <g stroke="#1E3A5F" stroke-width="0.8" opacity="0.6">
      <line x1="0" y1="19" x2="240" y2="19"/><line x1="0" y1="38" x2="240" y2="38"/>
      <line x1="60" y1="0" x2="60" y2="58"/><line x1="120" y1="0" x2="120" y2="58"/><line x1="180" y1="0" x2="180" y2="58"/>
    </g>
    <!-- Full-width steep ascending bull rally -->
    <polygon points="8,53 56,49 102,43 148,32 192,20 226,8 226,55 8,55" fill="#10B981" opacity="0.28"/>
    <polyline points="8,53 56,49 102,43 148,32 192,20 226,8" fill="none" stroke="#34D399" stroke-width="2.8"/>
    <!-- Secondary Kospi trace -->
    <polyline points="8,54 70,51 142,41 226,24" fill="none" stroke="#60A5FA" stroke-width="1.3" stroke-dasharray="3,2"/>
    <circle cx="226" cy="8" r="3.8" fill="#FBBF24"/>
    <!-- Compact badge top-left -->
    <rect x="8" y="6" width="96" height="18" rx="2" fill="#059669"/>
    <text x="56" y="18.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="10.2" font-weight="800" fill="#FFFFFF">TAIEX +8.99%</text>
    <text x="56" y="34" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.4" font-weight="800" fill="#FBBF24">KOSPI +7% · NIKKEI +4%</text>
  </svg>`;
}

function svgFeature10() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sea10" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D7ECFA"/><stop offset="48%" stop-color="#C3E1F5"/><stop offset="49%" stop-color="#225B84"/><stop offset="100%" stop-color="#163F5E"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#sea10)"/>
    <!-- Myanmar coast top-left & Malaysia coast bottom-right -->
    <path d="M0,0 H68 L48,16 L22,19 L0,27 Z" fill="#D8C8A8" stroke="#A69674" stroke-width="0.7"/>
    <path d="M150,58 L174,40 L240,42 V58 Z" fill="#CBB893" stroke="#9B8A68" stroke-width="0.7"/>
    <text x="24" y="11" font-family="Arial, sans-serif" font-size="6.4" font-weight="800" fill="#574B36">MYANMAR</text>
    <text x="206" y="53" text-anchor="middle" font-family="Arial, sans-serif" font-size="6.4" font-weight="800" fill="#453A28">MALAYSIA</text>
    <!-- Commercial aircraft high transit arc -->
    <path d="M168,40 Q120,24 58,15" fill="none" stroke="#0F766E" stroke-width="1.3" stroke-dasharray="3,2"/>
    <g transform="translate(82,12) rotate(-12)">
      <path d="M0,4 L26,2 L32,4 L26,6 L0,4 Z" fill="#1E293B"/>
      <polygon points="10,4 16,-4 20,4" fill="#334155"/>
      <polygon points="10,4 16,11 20,4" fill="#334155"/>
    </g>
    <!-- Navy transport vessel steaming across Andaman Sea -->
    <g transform="translate(36,34)">
      <polygon points="0,8 66,8 58,16 6,16" fill="#0F172A"/>
      <rect x="14" y="2" width="22" height="6" fill="#475569"/>
      <rect x="40" y="4" width="12" height="4" fill="#94A3B8"/>
      <line x1="6" y1="18" x2="62" y2="18" stroke="#93C5FD" stroke-width="1" opacity="0.6"/>
    </g>
    <!-- Compact badge -->
    <rect x="132" y="5" width="102" height="18" rx="2" fill="#0F766E"/>
    <text x="183" y="17.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.2" font-weight="800" fill="#FFFFFF">6,800 RETURN</text>
    <rect x="132" y="25" width="102" height="13" rx="2" fill="#0F172A" opacity="0.86"/>
    <text x="183" y="34.2" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.1" font-weight="800" fill="#FEF08A">1,500 SHIP · 5,300 AIR</text>
  </svg>`;
}

function svgFeature11() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="space11" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#050918"/><stop offset="100%" stop-color="#13224E"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#space11)"/>
    <!-- Crisp starfield -->
    <g fill="#E2E8F0">
      <circle cx="14" cy="11" r="1"/><circle cx="32" cy="46" r="0.9"/><circle cx="104" cy="10" r="1.2"/>
      <circle cx="136" cy="47" r="1"/><circle cx="182" cy="13" r="0.9"/><circle cx="222" cy="48" r="1.1"/>
    </g>
    <!-- Quasar J1504+6252 with long twin relativistic jets -->
    <line x1="18" y1="53" x2="112" y2="5" stroke="#38BDF8" stroke-width="2.4" opacity="0.85"/>
    <line x1="18" y1="53" x2="112" y2="5" stroke="#E0F2FE" stroke-width="0.9"/>
    <ellipse cx="65" cy="29" rx="28" ry="8" fill="none" stroke="#F59E0B" stroke-width="2.6" transform="rotate(-18 65 29)"/>
    <ellipse cx="65" cy="29" rx="18" ry="5" fill="none" stroke="#FDE68A" stroke-width="1.4" transform="rotate(-18 65 29)"/>
    <circle cx="65" cy="29" r="5.5" fill="#050918" stroke="#FEF3C7" stroke-width="1.4"/>
    <!-- Detailed ESA Euclid space telescope right -->
    <g transform="translate(198,28) scale(0.88)">
      <rect x="0" y="4" width="14" height="20" rx="1" fill="#CBD5E1"/>
      <rect x="2" y="0" width="10" height="5" fill="#F59E0B"/>
      <rect x="14" y="8" width="18" height="12" fill="#2563EB" stroke="#93C5FD" stroke-width="0.7"/>
    </g>
    <!-- Compact badge -->
    <rect x="122" y="5" width="112" height="17" rx="2" fill="#1D4ED8"/>
    <text x="178" y="16.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.4" font-weight="800" fill="#FFFFFF">630M YRS POST-BB</text>
    <text x="148" y="47" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.1" font-weight="700" fill="#93C5FD">360M SOLAR MASSES</text>
  </svg>`;
}

function svgWorldMap() {
  // Real-world geographic projection: lon [-180..180] -> [0..254], lat [85..-60] -> [0..166]
  const px = (lon) => +(((lon + 180) / 360) * 254).toFixed(1);
  const py = (lat) => +(((85 - lat) / 145) * 166).toFixed(1);
  const poly = (pts) => "M" + pts.map(([lo, la]) => `${px(lo)},${py(la)}`).join(" L") + " Z";

  const continents = [
    // Greenland
    [[-44,60],[-52,68],[-58,76],[-42,82],[-22,81],[-18,72],[-30,66]],
    // Iceland
    [[-24,64],[-14,66],[-14,64],[-22,63]],
    // North & Central America (Alaska, Hudson Bay, Labrador, Florida, Gulf, Yucatan, Baja)
    [[-168,66],[-156,71],[-136,69],[-118,68],[-96,68],[-94,60],[-82,53],[-78,61],[-66,60],[-55,52],[-60,46],[-70,42],[-75,35],[-80,25],[-83,29],[-90,29],[-97,26],[-96,19],[-88,21],[-87,16],[-83,10],[-78,8],[-84,9],[-92,15],[-105,20],[-110,24],[-114,31],[-118,34],[-124,41],[-125,49],[-136,58],[-152,60],[-162,56]],
    // Cuba & Hispaniola
    [[-84,22],[-74,20],[-75,21],[-83,23]],
    // South America (Colombia, Venezuela, Brazil NE bulge, Argentina, Tierra del Fuego, Andes)
    [[-78,9],[-70,12],[-60,9],[-50,2],[-35,-6],[-38,-14],[-42,-23],[-48,-28],[-54,-34],[-62,-40],[-66,-50],[-69,-55],[-74,-52],[-73,-40],[-71,-30],[-71,-18],[-78,-12],[-81,-5],[-79,2]],
    // Great Britain & Ireland
    [[-6,50],[-5,55],[-3,58],[0,56],[2,52],[0,50]],
    [[-10,52],[-8,55],[-6,54],[-8,51]],
    // Mainland Europe (Iberia, France, Italy boot, Greece, Scandinavia, Baltics)
    [[-9,37],[-9,43],[-2,43],[-4,48],[2,51],[8,54],[10,57],[5,60],[10,64],[18,69],[28,70],[32,66],[26,60],[21,59],[24,55],[14,54],[20,48],[28,46],[38,46],[36,42],[28,41],[24,38],[20,40],[18,43],[14,45],[12,42],[16,38],[14,40],[9,44],[4,43],[0,39],[-5,36]],
    // Africa (Maghreb, Egypt, Horn of Africa, Cape, Gulf of Guinea)
    [[-17,15],[-10,32],[0,36],[10,37],[12,33],[24,32],[32,31],[36,24],[42,12],[51,11],[44,2],[40,-6],[40,-16],[34,-24],[28,-33],[18,-34],[14,-22],[12,-12],[10,-2],[8,4],[0,5],[-10,5],[-16,11]],
    // Madagascar
    [[44,-25],[46,-17],[50,-12],[49,-18],[46,-25]],
    // Asia & Middle East (Anatolia, Arabia, India, Indochina, Malay, China, Korea, Siberia, Kamchatka)
    [[27,40],[36,42],[44,42],[48,46],[60,55],[68,72],[104,77],[140,73],[174,66],[162,55],[154,51],[142,54],[136,44],[129,40],[129,35],[126,37],[122,40],[118,38],[122,31],[120,24],[110,20],[108,12],[103,10],[100,13],[103,2],[100,5],[98,16],[92,22],[88,22],[80,14],[77,8],[72,21],[66,25],[58,25],[56,26],[50,28],[59,22],[52,15],[44,13],[39,21],[35,28],[35,36],[28,36]],
    // Sri Lanka
    [[80,9],[82,7],[80,6],[79,8]],
    // Japan archipelago
    [[130,32],[134,34],[140,36],[142,41],[145,44],[141,45],[138,38],[132,34]],
    // Taiwan & Philippines
    [[120,22],[122,25],[121,25],[120,23]],
    [[120,18],[124,14],[126,8],[123,7],[120,14]],
    // Sumatra, Java, Borneo
    [[96,5],[104,-5],[102,-6],[95,3]],
    [[106,-6],[114,-8],[114,-9],[106,-7]],
    [[109,1],[117,6],[119,1],[115,-4],[110,-3]],
    // New Guinea
    [[132,-2],[142,-3],[150,-10],[146,-10],[136,-5]],
    // Australia & Tasmania
    [[114,-22],[122,-17],[132,-12],[136,-15],[142,-11],[146,-18],[153,-26],[150,-37],[140,-38],[135,-34],[128,-32],[115,-34],[113,-26]],
    [[145,-41],[148,-41],[147,-43],[145,-43]],
    // New Zealand
    [[174,-35],[178,-38],[175,-41],[172,-44],[167,-46],[170,-42],[174,-39]],
  ];

  const mainPins = [
    { n: 2, x: 66, y: 48, c: REGION_COLORS.NA },   // Brooklyn NY
    { n: 3, x: 80, y: 56, c: REGION_COLORS.NA },   // NJ / Paris deal
    { n: 5, x: 121, y: 37, c: REGION_COLORS.EU },  // London
    { n: 8, x: 137, y: 41, c: REGION_COLORS.WS },  // Vienna UN
    { n: 4, x: 153, y: 44, c: REGION_COLORS.EU },  // Zaporizhzhia / Poland
    { n: 7, x: 115, y: 80, c: REGION_COLORS.AF },  // Dakar Senegal
    { n: 6, x: 168, y: 65, c: REGION_COLORS.ME },  // Strait of Hormuz
    { n: 10, x: 199, y: 92, c: REGION_COLORS.SE }, // Malaysia / Myanmar
    { n: 1, x: 211, y: 58, c: REGION_COLORS.EA },  // Shanghai
    { n: 9, x: 220, y: 72, c: REGION_COLORS.EA },  // Taipei
    { n: 11, x: 234, y: 14, c: REGION_COLORS.WS }, // Euclid Space
  ];
  const regionalPins = [
    { n: 16, x: 157, y: 78, c: REGION_COLORS.ME }, // Yemen / Riyadh
    { n: 20, x: 146, y: 126, c: REGION_COLORS.AF },// South Africa
    { n: 25, x: 189, y: 71, c: REGION_COLORS.SA }, // Dhaka South Asia
    { n: 33, x: 76, y: 92, c: REGION_COLORS.LA },  // Villavicencio
    { n: 35, x: 62, y: 101, c: REGION_COLORS.LA }, // Galapagos
    { n: 36, x: 229, y: 135, c: REGION_COLORS.OC },// Canberra Australia
  ];
  return `<svg viewBox="0 0 254 166" width="100%" height="166" xmlns="http://www.w3.org/2000/svg">
    <rect width="254" height="166" fill="#D5E7F5" stroke="#AEBFCE" stroke-width="1"/>
    <g stroke="#BED5E8" stroke-width="0.55">
      <line x1="0" y1="${py(60)}" x2="254" y2="${py(60)}"/>
      <line x1="0" y1="${py(30)}" x2="254" y2="${py(30)}"/>
      <line x1="0" y1="${py(0)}" x2="254" y2="${py(0)}" stroke-dasharray="3,2"/>
      <line x1="0" y1="${py(-30)}" x2="254" y2="${py(-30)}"/>
      <line x1="${px(-120)}" y1="0" x2="${px(-120)}" y2="166"/>
      <line x1="${px(-60)}" y1="0" x2="${px(-60)}" y2="166"/>
      <line x1="${px(0)}" y1="0" x2="${px(0)}" y2="166"/>
      <line x1="${px(60)}" y1="0" x2="${px(60)}" y2="166"/>
      <line x1="${px(120)}" y1="0" x2="${px(120)}" y2="166"/>
    </g>
    <g fill="#E9E1CF" stroke="#8E9CA8" stroke-width="0.65" stroke-linejoin="round">
      ${continents.map((c) => `<path d="${poly(c)}"/>`).join("")}
    </g>
    <rect x="218" y="3" width="32" height="29" rx="2" fill="#E2E8F0" stroke="#64748B" stroke-width="0.7" opacity="0.92"/>
    <text x="234" y="29.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="5.8" font-weight="800" fill="#334155">SPACE</text>
    ${regionalPins
      .map(
        (p) => `<g>
        <circle cx="${p.x}" cy="${p.y}" r="5.3" fill="${p.c}" stroke="#FFFFFF" stroke-width="1"/>
        <text x="${p.x}" y="${p.y + 1.9}" text-anchor="middle" font-family="Arial, sans-serif" font-size="5.5" font-weight="800" fill="#FFFFFF">${p.n}</text>
      </g>`
      )
      .join("")}
    ${mainPins
      .map(
        (p) => `<g>
        <circle cx="${p.x}" cy="${p.y}" r="6.6" fill="${p.c}" stroke="#FFFFFF" stroke-width="1.2"/>
        <text x="${p.x}" y="${p.y + 2.3}" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" font-weight="800" fill="#FFFFFF">${p.n}</text>
      </g>`
      )
      .join("")}
  </svg>`;
}

const LEADS = [
  {
    num: 1,
    reg: "EA",
    place: "SHANGHAI · BEIJING",
    status: "OFFICIAL",
    statusColor: "#0F766E",
    svg: svgLead1(),
    headline: "China probes Shanghai party chief Chen Jining",
    summary: "CCDI investigates 24-seat Politburo member for severe discipline & law violations.",
    source: "Al Jazeera, Guardian",
  },
  {
    num: 2,
    reg: "NA",
    place: "BROOKLYN · NEW YORK",
    status: "CONFIRMED",
    statusColor: "#1D4ED8",
    svg: svgLead2(),
    headline: "US jury convicts Huawei on 10 of 12 counts",
    summary: "Federal jury finds tech giant guilty of bank/wire fraud & trade-secret conspiracy; acquitted of racketeering.",
    source: "Guardian, Al Jazeera",
  },
  {
    num: 3,
    reg: "NA",
    place: "PARIS · NEW JERSEY",
    status: "OFFICIAL",
    statusColor: "#0F766E",
    svg: svgLead3(),
    headline: "Sanofi agrees $41bn cash buyout of Insmed",
    summary: "Largest pharma deal in 3 years ($175/share) adds rare lung drugs Brinsupri & Arikayce.",
    source: "Sanofi, Reuters",
  },
];

const FEATURES = [
  {
    num: 4,
    reg: "EU",
    place: "ZAPORIZHZHIA · POLAND",
    status: "CONFIRMED",
    statusColor: "#1D4ED8",
    svg: svgFeature4(),
    headline: "Russian strike kills 2; drone enters Poland",
    summary: "Night strike hits flats (40+ hurt); jet drone crosses 20 km into Poland.",
    source: "AP, Kyiv Indep.",
  },
  {
    num: 5,
    reg: "EU",
    place: "LONDON · ENGLAND",
    status: "OFFICIAL",
    statusColor: "#0F766E",
    svg: svgFeature5(),
    headline: "England logs record 5,258 summer heat deaths",
    summary: "UKHSA May–Sep 2026 heatwave toll is highest annual total on record.",
    source: "UKHSA, Guardian",
  },
  {
    num: 6,
    reg: "ME",
    place: "STRAIT OF HORMUZ",
    status: "CLAIM",
    statusColor: "#C2410C",
    svg: svgFeature6(),
    headline: "Iran Guards claim mines set 3 tankers ablaze",
    summary: "IRGC cites transit rule breach; US escorts active, Washington unconfirmed.",
    source: "IRGC, Reuters",
  },
  {
    num: 7,
    reg: "AF",
    place: "LAUSANNE · DAKAR",
    status: "OFFICIAL",
    statusColor: "#0F766E",
    svg: svgFeature7(),
    headline: "CAS restores Senegal’s 2025 AFCON title",
    summary: "Sports court overturns CAF stripping after chaotic January final.",
    source: "Guardian, Channels",
  },
  {
    num: 8,
    reg: "WS",
    place: "VIENNA · NEW YORK",
    status: "OFFICIAL",
    statusColor: "#0F766E",
    svg: svgFeature8(),
    headline: "UN reports 47,000 femicides globally in 2025",
    summary: "Partners or relatives killed ~5 women and girls every hour, UNODC says.",
    source: "UNODC, UN Women",
  },
  {
    num: 9,
    reg: "EA",
    place: "TAIPEI · SEOUL",
    status: "CONFIRMED",
    statusColor: "#1D4ED8",
    svg: svgFeature9(),
    headline: "Taiwan TAIEX jumps +8.99% in Asia chip surge",
    summary: "Record jump leads Asia tech rally (Kospi +7%, Nikkei +4%) before US cools.",
    source: "Focus Taiwan, Reuters",
  },
  {
    num: 10,
    reg: "SE",
    place: "KUALA LUMPUR · MYANMAR",
    status: "OFFICIAL",
    statusColor: "#0F766E",
    svg: svgFeature10(),
    headline: "Malaysia to return 6,800 Rohingya to Myanmar",
    summary: "PM Anwar says 1,500 depart by navy ship in Dec and 5,300 by air.",
    source: "Al Jazeera",
  },
  {
    num: 11,
    reg: "WS",
    place: "EUROPEAN SPACE AGENCY",
    status: "OFFICIAL",
    statusColor: "#0F766E",
    svg: svgFeature11(),
    headline: "Euclid finds most distant quasar J1504+6252",
    summary: "360M-solar-mass black hole spotted 630M yrs after the Big Bang.",
    source: "ESA",
  },
];

const BRIEFS_COL1 = [
  { num: 12, reg: "EU", title: "Paris Courts", text: "Sarkozy & Carla Bruni ordered to 2027 Libya trial", src: "AFP" },
  { num: 13, reg: "EU", title: "Brussels", text: "EU caps Chinese hybrid car imports at 350,000/yr", src: "Guardian" },
  { num: 14, reg: "EU", title: "Versailles", text: "Officer in Nahel shooting ordered to murder trial", src: "AP" },
  { num: 15, reg: "EU", title: "Europe Sport", text: "Chess G1 drawn; UCL Arsenal 1–1, Man City 2–2", src: "FIDE, UEFA" },
  { num: 16, reg: "ME", title: "Yemen / Riyadh", text: "Houthis 60 km from Aden; drone hurts 11 at KAFD", tag: "REPORTED", src: "Reuters" },
  { num: 17, reg: "ME", title: "Baghdad", text: "PM puts 4 provinces' Kurdish oilfields under state", src: "Al Jazeera" },
  { num: 18, reg: "ME", title: "Gaza City", text: "Israeli strikes kill 7; meningitis alert issued", src: "Al Jazeera" },
  { num: 19, reg: "ME", title: "White House", text: "Vance & Rubio meet Qatari PM on Iran crisis", src: "Reuters" },
  { num: 20, reg: "AF", title: "South Africa", text: "Johannesburg & Tshwane impose Level 2 water curbs", src: "Africanews" },
  { num: 21, reg: "AF", title: "Madagascar", text: "Prosecutors seek arrest of ex-Pres. Rajoelina", src: "AFP" },
  { num: 22, reg: "AF", title: "Indian Ocean", text: "M6.4 quake near Mauritius; no tsunami alert", src: "GDACS" },
  { num: 23, reg: "EA", title: "China Aviation", text: "China Southern unit buys 50 Boeing 737-8 jets", src: "Al Jazeera" },
  { num: 24, reg: "EA", title: "Beijing", text: "China & US hold first bilateral farm talks", src: "Xinhua" },
  { num: 25, reg: "SA", title: "Dhaka", text: "Hasina plans 16 Dec return; govt says arrest only", tag: "CLAIM", src: "Al Jazeera" },
];

const BRIEFS_COL2 = [
  { num: 26, reg: "SA", title: "India–China", text: "Commanders hold border talks; Modi calls Merz", src: "Reuters" },
  { num: 27, reg: "SA", title: "Nepal", text: "M5.6 quake hits Taplejung; felt in Bangladesh", src: "Daily Star" },
  { num: 28, reg: "SE", title: "Singapore", text: "Q3 GDP up 6.1% YoY on chips; 2026 view ~6%", src: "MTI" },
  { num: 29, reg: "SE", title: "Hanoi", text: "Restaurant gas blast in Dong Da kills 6, hurts 10", src: "WashPost" },
  { num: 30, reg: "SE", title: "Indonesia", text: "Repatriates 139 held in Manila scam raid", src: "AP" },
  { num: 31, reg: "NA", title: "Wall Street", text: "Dow closes above 50,000 (+0.85%); Nasdaq −1.48%", src: "AP" },
  { num: 32, reg: "NA", title: "Washington", text: "US blacklists Megaspeed in AI chip probe", src: "Al Jazeera" },
  { num: 33, reg: "LA", title: "Villavicencio", text: "Car bomb by governor office hurts 23 (02:30 UTC)", src: "WashPost" },
  { num: 34, reg: "LA", title: "Mexico City", text: "To try ‘El Chapo Isidro’ at home, no extradition", src: "AP" },
  { num: 35, reg: "LA", title: "Galápagos", text: "El Niño rains force Santa Cruz flood emergency", src: "AP" },
  { num: 36, reg: "OC", title: "Canberra", text: "Online Duty bill sets 5% global revenue fines", src: "Guardian" },
  { num: 37, reg: "OC", title: "Gold Coast", text: "England beat Australia to level T20 series", src: "ICC" },
  { num: 38, reg: "WS", title: "Jiuquan", text: "China names Pakistan’s Zeeshan Ali for Shenzhou-24", src: "Xinhua" },
];

function renderBriefRow(b) {
  const col = REGION_COLORS[b.reg];
  const tagHtml = b.tag
    ? `<span class="b-tag" style="color:${b.tag === "CLAIM" ? "#C2410C" : "#475569"}">${b.tag}</span>`
    : "";
  return `<div class="brief-row">
    <span class="b-num" style="background:${col}">${b.num}</span>
    <span class="b-body"><strong style="color:${col}">${b.title}:</strong> ${b.text}</span>
    ${tagHtml}<span class="b-src">${b.src}</span>
  </div>`;
}

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #FBF7EE;
    color: #1A1713;
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 7px 13px 7px 13px;
    display: flex;
    flex-direction: column;
    gap: 4.5px;
    background: #FBF7EE;
  }
  .top-kicker {
    display: flex;
    justify-content: space-between;
    font-size: 8.5px;
    font-weight: 800;
    letter-spacing: 0.5px;
    border-bottom: 1.5px solid #1A1713;
    padding-bottom: 1.5px;
  }
  .k-left { color: #8B1E1E; }
  .k-right { color: #1A1713; }

  .masthead {
    text-align: center;
    padding: 0 0 2px 0;
  }
  .masthead h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.9px;
    line-height: 0.98;
    color: #11100D;
  }
  .masthead-deck {
    font-family: Georgia, "Times New Roman", serif;
    font-style: italic;
    font-size: 11.2px;
    font-weight: 700;
    color: #8B1E1E;
    margin-top: 2px;
  }

  .region-bar {
    display: flex;
    width: 100%;
    height: 18px;
    border-top: 1.5px solid #1A1713;
    border-bottom: 1.5px solid #1A1713;
  }
  .reg-seg {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 7.4px;
    font-weight: 800;
    letter-spacing: 0.25px;
    border-right: 1px solid #FBF7EE;
    white-space: nowrap;
  }
  .reg-seg:last-child { border-right: none; }

  .utc-strip {
    display: flex;
    align-items: stretch;
    background: #EFE9DC;
    border-top: 1px solid #C8BFA9;
    border-bottom: 1.5px solid #1A1713;
    height: 24px;
  }
  .utc-badge {
    background: #8B1E1E;
    color: #FFFFFF;
    font-size: 7.5px;
    font-weight: 800;
    line-height: 1.05;
    padding: 0 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    flex-shrink: 0;
  }
  .utc-items {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .utc-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 6px;
    border-left: 1px solid #D3C9B4;
    line-height: 1.06;
  }
  .utc-t {
    font-size: 8.3px;
    font-weight: 800;
    color: #8B1E1E;
  }
  .utc-l {
    font-size: 7.8px;
    font-weight: 700;
    color: #1C1917;
    white-space: nowrap;
    overflow: hidden;
  }

  /* Row 1: 3 Unboxed Lead Columns */
  .leads-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding-bottom: 4px;
    border-bottom: 1.5px solid #1A1713;
  }
  .lead-col {
    display: flex;
    flex-direction: column;
    gap: 3px;
    border-right: 1px solid #D8CFC0;
    padding-right: 10px;
  }
  .lead-col:last-child {
    border-right: none;
    padding-right: 0;
  }
  .meta-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    margin-top: 1px;
  }
  .meta-left {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 8.1px;
    font-weight: 800;
    color: #292524;
    letter-spacing: 0.3px;
  }
  .num-dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 8.1px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .status-tag {
    font-size: 6.9px;
    font-weight: 800;
    padding: 0.5px 4px;
    border: 1.2px solid currentColor;
    border-radius: 2px;
    background: #FFFDF8;
    letter-spacing: 0.3px;
  }
  .lead-col h2 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 14.4px;
    font-weight: 700;
    line-height: 1.13;
    color: #11100D;
  }
  .lead-col p {
    font-size: 9.5px;
    line-height: 1.2;
    color: #292524;
  }
  .src-inline {
    color: #57534E;
    font-weight: 600;
    font-size: 8.4px;
  }

  /* Rows 2 & 3: 2x4 Unboxed Feature Columns */
  .feat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px 10px;
    padding-bottom: 4px;
    border-bottom: 2px solid #1A1713;
  }
  .feat-col {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-right: 1px solid #DFD7C8;
    padding-right: 8px;
  }
  .feat-col:nth-child(4n) {
    border-right: none;
    padding-right: 0;
  }
  .feat-col h3 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11.5px;
    font-weight: 700;
    line-height: 1.13;
    color: #11100D;
  }
  .feat-col p {
    font-size: 8.5px;
    line-height: 1.17;
    color: #292524;
  }

  /* Lower Band */
  .lower-band {
    display: grid;
    grid-template-columns: 254px 1fr;
    gap: 12px;
    flex: 1;
    min-height: 0;
  }
  .left-rail {
    display: flex;
    flex-direction: column;
    gap: 3.5px;
  }
  .sec-hdr {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1.5px solid #1A1713;
    padding-bottom: 1.5px;
  }
  .sec-title {
    font-size: 9px;
    font-weight: 800;
    color: #8B1E1E;
    letter-spacing: 0.35px;
  }
  .sec-sub {
    font-size: 7.3px;
    color: #57534E;
    font-weight: 600;
  }
  .reg-legend {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5px 6px;
    padding: 2px 0;
    border-bottom: 1px solid #D8CFC0;
  }
  .leg-item {
    display: flex;
    align-items: center;
    gap: 3.5px;
    font-size: 6.9px;
    font-weight: 700;
    color: #292524;
  }
  .leg-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .kpi-hdr {
    font-size: 7.6px;
    font-weight: 800;
    color: #8B1E1E;
    letter-spacing: 0.4px;
    border-bottom: 1px solid #C8BFA9;
    padding-bottom: 1px;
  }
  .kpi-mini-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px 5px;
    padding-top: 1px;
  }
  .kpi-mini {
    border-left: 2.5px solid var(--kc);
    padding-left: 4px;
  }
  .kpi-mv {
    font-family: Georgia, serif;
    font-size: 11.4px;
    font-weight: 800;
    line-height: 1.02;
    color: #11100D;
  }
  .kpi-ml {
    font-size: 6.6px;
    line-height: 1.08;
    color: #44403C;
  }

  /* Dispatches Right */
  .briefs-area {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
  }
  .brief-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 11px;
    flex: 1;
  }
  .brief-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .brief-list:first-child {
    border-right: 1px solid #D8CFC0;
    padding-right: 10px;
  }
  .brief-row {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 8.65px;
    line-height: 1.15;
    padding: 1.5px 0;
    border-bottom: 1px dotted #DDD5C4;
  }
  .brief-row:last-child { border-bottom: none; }
  .b-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 13px;
    border-radius: 2px;
    color: #FFFFFF;
    font-size: 7.3px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .b-body {
    flex: 1;
    color: #1C1917;
    white-space: nowrap;
    overflow: hidden;
  }
  .b-tag {
    font-size: 6.2px;
    font-weight: 800;
    padding: 0 2.5px;
    border: 1px solid currentColor;
    border-radius: 2px;
    background: #FFFDF8;
    flex-shrink: 0;
    letter-spacing: 0.2px;
  }
  .b-src {
    font-size: 7.3px;
    font-weight: 700;
    color: #6B655D;
    flex-shrink: 0;
  }
  .fields-note {
    font-size: 7.3px;
    color: #57534E;
    background: #F2ECE0;
    border-left: 2.5px solid #8B1E1E;
    padding: 2px 5px;
    line-height: 1.18;
  }

  /* Bottom Full-Width DATE CHECK */
  .date-check-bar {
    display: flex;
    align-items: stretch;
    border: 1.5px solid #991B1B;
    background: #FEF2F2;
  }
  .dc-tag {
    background: #991B1B;
    color: #FFFFFF;
    font-size: 8px;
    font-weight: 800;
    padding: 2.5px 7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 1.05;
    flex-shrink: 0;
  }
  .dc-text {
    padding: 2.5px 7px;
    font-size: 7.5px;
    line-height: 1.2;
    color: #450A0A;
  }

  /* Bottom archival footer key */
  .footer-key {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.3px;
    color: #57534E;
  }
  .key-badges {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .kb {
    font-size: 6.7px;
    font-weight: 800;
    padding: 0.5px 3.5px;
    border: 1px solid currentColor;
    border-radius: 2px;
  }
</style>
</head>
<body>
<div class="page">
  <div class="top-kicker">
    <span class="k-left">THE WORLD IN ONE DAY · ONE PAGE</span>
    <span class="k-right">38 STORIES · 10 REGIONS · 14 FIELDS · EVERY STORY FROM TUESDAY 24 NOVEMBER 2026</span>
  </div>

  <div class="masthead">
    <h1>Tuesday 24 November 2026</h1>
    <div class="masthead-deck">China probes Shanghai chief · US jury convicts Huawei (10/12) · Sanofi $41bn buyout · Dow tops 50,000</div>
  </div>

  <div class="region-bar">
    ${REGIONS.map(
      (r) => `<div class="reg-seg" style="background:${REGION_COLORS[r.key]}">${r.name} ${r.count}</div>`
    ).join("")}
  </div>

  <div class="utc-strip">
    <div class="utc-badge"><span>THE DAY</span><span>IN UTC</span></div>
    <div class="utc-items">
      ${UTC_TIMELINE.map(
        (u) => `<div class="utc-cell"><span class="utc-t">${u.time}</span><span class="utc-l">${u.label}</span></div>`
      ).join("")}
    </div>
  </div>

  <div class="leads-row">
    ${LEADS.map(
      (c) => `<div class="lead-col">
        ${c.svg}
        <div class="meta-line">
          <span class="meta-left"><span class="num-dot" style="background:${REGION_COLORS[c.reg]}">${c.num}</span>${c.place}</span>
          <span class="status-tag" style="color:${c.statusColor}">${c.status}</span>
        </div>
        <h2>${c.headline}</h2>
        <p>${c.summary} <span class="src-inline">${c.source}</span></p>
      </div>`
    ).join("")}
  </div>

  <div class="feat-grid">
    ${FEATURES.map(
      (f) => `<div class="feat-col">
        ${f.svg}
        <div class="meta-line">
          <span class="meta-left"><span class="num-dot" style="background:${REGION_COLORS[f.reg]}">${f.num}</span>${f.place}</span>
          <span class="status-tag" style="color:${f.statusColor}">${f.status}</span>
        </div>
        <h3>${f.headline}</h3>
        <p>${f.summary} <span class="src-inline">${f.source}</span></p>
      </div>`
    ).join("")}
  </div>

  <div class="lower-band">
    <div class="left-rail">
      <div class="sec-hdr">
        <span class="sec-title">WHERE IT HAPPENED</span>
        <span class="sec-sub">pins 1–11 + regional anchors</span>
      </div>
      ${svgWorldMap()}
      <div class="reg-legend">
        ${REGIONS.map(
          (r) => `<div class="leg-item"><span class="leg-dot" style="background:${REGION_COLORS[r.key]}"></span><span>${r.short} ${r.count}</span></div>`
        ).join("")}
      </div>
      <div class="kpi-hdr">KEY NUMBERS · TUESDAY 24 NOV</div>
      <div class="kpi-mini-grid">
        ${KEY_NUMBERS.map(
          (k) => `<div class="kpi-mini" style="--kc:${k.c}"><div class="kpi-mv">${k.val}</div><div class="kpi-ml">${k.lbl}</div></div>`
        ).join("")}
      </div>
    </div>

    <div class="briefs-area">
      <div class="sec-hdr">
        <span class="sec-title">ALSO ON TUESDAY 24 NOVEMBER 2026</span>
        <span class="sec-sub">27 additional verified dispatches (10 regions matched by color)</span>
      </div>
      <div class="brief-cols">
        <div class="brief-list">
          ${BRIEFS_COL1.map(renderBriefRow).join("")}
        </div>
        <div class="brief-list">
          ${BRIEFS_COL2.map(renderBriefRow).join("")}
          <div class="fields-note"><strong>14 Fields:</strong> Geopolitics, Courts, Tech, Pharma, Climate, Conflict, Markets, Trade, Energy, Space, Sport, Aid, Disasters &amp; Science.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="date-check-bar">
    <div class="dc-tag"><span>DATE</span><span>CHECK</span></div>
    <div class="dc-text"><strong>Every story above happened or was first reported on Tue 24 Nov 2026 (00:00–23:59 UTC).</strong> Left out: <strong>Mon 23 Nov</strong> (Nvidia reinstates Huang, EU 22nd sanctions, Belgium ATC strike, NATO AWACS, Dymer toll 11, FIFA 2031/2035, NZ–India draw) · <strong>Sun 22 Nov</strong> (COP31 collapse, Libya Merkury strike) · <strong>Wed 25 Nov</strong> (Shenzhou-24 launch 00:18 UTC, Solomon Islands–Australia treaty signing).</div>
  </div>

  <div class="footer-key">
    <div class="key-badges">
      <span><span class="kb" style="color:#1D4ED8">CONFIRMED</span> 2+ outlets</span>
      <span><span class="kb" style="color:#0F766E">OFFICIAL</span> on the record</span>
      <span><span class="kb" style="color:#475569">REPORTED</span> single wire/local</span>
      <span><span class="kb" style="color:#C2410C">CLAIM</span> one side's account</span>
    </div>
    <span>Sources: AP, Reuters, AFP, Guardian, Al Jazeera, WashPost, Xinhua, ESA, UNODC, UKHSA, Focus Taiwan, FIDE, UEFA, ICC, Sanofi · Original vector drawings &amp; map</span>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(SCRATCH_HTML, HTML, "utf8");
const browser = findBrowser();
execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--window-size=1024,1024",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--default-background-color=FBF7EE",
  `--screenshot=${OUT_PNG}`,
  `file:///${SCRATCH_HTML.replace(/\\/g, "/")}`,
]);
fs.unlinkSync(SCRATCH_HTML);

const stat = fs.statSync(OUT_PNG);
console.log(`Rendered ${OUT_PNG} (${stat.size} bytes)`);
