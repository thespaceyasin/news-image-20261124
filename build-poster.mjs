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
  SE: "#0F766E",
  NA: "#6D28D9",
  LA: "#A16207",
  OC: "#0369A1",
  WS: "#334155",
};

const REGIONS = [
  { key: "EU", name: "EUROPE", count: 6 },
  { key: "ME", name: "MIDDLE EAST", count: 4 },
  { key: "AF", name: "AFRICA", count: 3 },
  { key: "EA", name: "EAST ASIA", count: 5 },
  { key: "SE", name: "SOUTH & SE ASIA", count: 5 },
  { key: "NA", name: "N. AMERICA", count: 3 },
  { key: "LA", name: "LATIN AMERICA", count: 4 },
  { key: "OC", name: "OCEANIA", count: 3 },
  { key: "WS", name: "WORLD & SPACE", count: 3 },
];

const UTC_TIMELINE = [
  { time: "~01:00", label: "Hanoi gas blast" },
  { time: "02:30", label: "Villavicencio bomb" },
  { time: "05:30", label: "TAIEX closes +8.99%" },
  { time: "~06:50", label: "Sanofi $41bn deal" },
  { time: "~13:00", label: "EU €200bn tax gap" },
  { time: "~19:30", label: "Huawei 10/12 verdict" },
];

const KEY_NUMBERS = [
  { val: "$41bn", lbl: "Sanofi–Insmed cash deal", c: REGION_COLORS.NA },
  { val: "5,258", lbl: "England heat deaths", c: REGION_COLORS.EU },
  { val: "10 / 12", lbl: "Huawei guilty counts", c: REGION_COLORS.NA },
  { val: "+8.99%", lbl: "Taiwan TAIEX jump", c: REGION_COLORS.EA },
  { val: "47,000", lbl: "UN 2025 femicides", c: REGION_COLORS.WS },
  { val: "6,500+", lbl: "Rohingya return plan", c: REGION_COLORS.SE },
];

function svgLead1() {
  return `<svg viewBox="0 0 320 100" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F5DFC8"/><stop offset="100%" stop-color="#FBEFE4"/>
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#sky1)"/>
    <!-- Sun halo -->
    <circle cx="98" cy="34" r="22" fill="#E89D72" opacity="0.45"/>
    <!-- Lujiazui skyline -->
    <rect x="8" y="54" width="16" height="32" fill="#334155"/>
    <rect x="27" y="42" width="18" height="44" fill="#1E293B"/>
    <rect x="48" y="34" width="14" height="52" fill="#475569"/>
    <!-- Jin Mao & Shanghai Tower -->
    <polygon points="84,86 89,22 97,22 102,86" fill="#1E293B"/>
    <path d="M107,86 L112,14 L120,14 L124,86 Z" fill="#0F172A"/>
    <!-- Oriental Pearl Tower -->
    <line x1="70" y1="86" x2="70" y2="10" stroke="#334155" stroke-width="2.5"/>
    <line x1="62" y1="86" x2="70" y2="54" stroke="#334155" stroke-width="2.5"/>
    <line x1="78" y1="86" x2="70" y2="54" stroke="#334155" stroke-width="2.5"/>
    <circle cx="70" cy="30" r="5" fill="#B91C1C"/>
    <circle cx="70" cy="54" r="8" fill="#B91C1C"/>
    <rect x="129" y="46" width="16" height="40" fill="#334155"/>
    <!-- Huangpu river -->
    <rect x="0" y="84" width="320" height="16" fill="#2A4A62"/>
    <line x1="18" y1="90" x2="96" y2="90" stroke="#7BA4BF" stroke-width="1.4"/>
    <line x1="60" y1="95" x2="145" y2="95" stroke="#E2B49A" stroke-width="1.2"/>
    <!-- Crimson inquiry seal + pillar silhouette right -->
    <g transform="translate(160,50)">
      <rect x="0" y="14" width="148" height="14" fill="#991B1B" opacity="0.16"/>
      <circle cx="132" cy="12" r="14" fill="#991B1B"/>
      <rect x="125" y="5" width="14" height="14" fill="none" stroke="#FDE68A" stroke-width="1.4"/>
      <text x="132" y="15" text-anchor="middle" font-family="Georgia, serif" font-size="8" font-weight="700" fill="#FDE68A">CCDI</text>
    </g>
    <!-- Crisp banner block -->
    <rect x="158" y="10" width="152" height="26" rx="2" fill="#7F1D1D"/>
    <text x="234" y="27" text-anchor="middle" font-family="Arial, sans-serif" font-size="13.5" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">POLITBURO PROBE</text>
    <rect x="158" y="39" width="114" height="16" rx="2" fill="#D97706"/>
    <text x="215" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.6" font-weight="700" fill="#11100D">24-SEAT ELITE BODY</text>
  </svg>`;
}

function svgLead2() {
  return `<svg viewBox="0 0 320 100" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="navy2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0F1F3D"/><stop offset="100%" stop-color="#1E3A6E"/>
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#navy2)"/>
    <!-- Classical Courthouse on left -->
    <polygon points="14,32 56,12 98,32" fill="#E2E8F0"/>
    <rect x="16" y="32" width="80" height="5" fill="#CBD5E1"/>
    <rect x="21" y="37" width="8" height="44" fill="#F1F5F9"/>
    <rect x="37" y="37" width="8" height="44" fill="#F1F5F9"/>
    <rect x="53" y="37" width="8" height="44" fill="#F1F5F9"/>
    <rect x="69" y="37" width="8" height="44" fill="#F1F5F9"/>
    <rect x="84" y="37" width="8" height="44" fill="#F1F5F9"/>
    <rect x="10" y="81" width="92" height="7" fill="#94A3B8"/>
    <!-- Silicon chip motif bottom center -->
    <g transform="translate(107,50)">
      <line x1="-6" y1="10" x2="36" y2="10" stroke="#F59E0B" stroke-width="1.6"/>
      <line x1="-6" y1="18" x2="36" y2="18" stroke="#F59E0B" stroke-width="1.6"/>
      <line x1="-6" y1="26" x2="36" y2="26" stroke="#F59E0B" stroke-width="1.6"/>
      <rect x="2" y="3" width="26" height="30" rx="2" fill="#1E293B" stroke="#F59E0B" stroke-width="1.8"/>
      <rect x="9" y="10" width="12" height="16" fill="#F59E0B" opacity="0.85"/>
    </g>
    <!-- 10 of 12 verdict callout -->
    <rect x="156" y="10" width="154" height="27" rx="2" fill="#F59E0B"/>
    <text x="233" y="28" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#0F172A">10 OF 12 COUNTS</text>
    <!-- 12 Jury Count Squares -->
    <g transform="translate(156,45)">
      ${Array.from({ length: 12 }, (_, i) => {
        const fill = i < 10 ? "#EF4444" : "#475569";
        return `<rect x="${i * 12.9}" y="0" width="10.5" height="14" rx="1.5" fill="${fill}" stroke="#F8FAFC" stroke-width="0.7"/>`;
      }).join("")}
    </g>
    <rect x="156" y="67" width="154" height="19" rx="2" fill="#0B162C" stroke="#3B82F6" stroke-width="1"/>
    <text x="233" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.5" font-weight="700" fill="#93C5FD">GUILTY: FRAUD · NO RICO</text>
  </svg>`;
}

function svgLead3() {
  return `<svg viewBox="0 0 320 100" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mint3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#E1F4EF"/><stop offset="100%" stop-color="#C6E8DF"/>
      </linearGradient>
    </defs>
    <rect width="320" height="100" fill="url(#mint3)"/>
    <!-- Molecular hex lattice + medical capsule -->
    <g stroke="#0F766E" stroke-width="2" fill="none">
      <polygon points="34,16 50,25 50,43 34,52 18,43 18,25" fill="#FFFDF8" opacity="0.85"/>
      <polygon points="66,34 82,43 82,61 66,70 50,61 50,43" fill="#FFFDF8" opacity="0.85"/>
      <circle cx="34" cy="34" r="5" fill="#0F766E"/>
      <circle cx="66" cy="52" r="5" fill="#1D4ED8"/>
    </g>
    <!-- Bicolor capsule -->
    <g transform="translate(18,70) rotate(-14)">
      <rect x="0" y="0" width="44" height="16" rx="8" fill="#0F766E"/>
      <path d="M22,0 H36 A8,8 0 0 1 36,16 H22 Z" fill="#E11D48"/>
    </g>
    <!-- Rising 3-yr Pharma M&A bars -->
    <g transform="translate(96,24)">
      <rect x="0" y="42" width="16" height="24" fill="#64748B"/>
      <rect x="22" y="30" width="16" height="36" fill="#0284C7"/>
      <rect x="44" y="6" width="18" height="60" fill="#0F766E"/>
      <text x="8" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#334155">'24</text>
      <text x="30" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#334155">'25</text>
      <text x="53" y="75" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#065F46">'26</text>
    </g>
    <!-- Bold Teal M&A Callout -->
    <rect x="170" y="10" width="140" height="28" rx="2" fill="#065F46"/>
    <text x="240" y="29" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="#FFFFFF">$41 BILLION</text>
    <rect x="170" y="42" width="140" height="19" rx="2" fill="#F59E0B"/>
    <text x="240" y="55" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.5" font-weight="800" fill="#11100D">$175 / SHARE · ALL-CASH</text>
    <text x="240" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.6" font-weight="700" fill="#0F766E">SANOFI BUYS INSMED</text>
    <text x="240" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.8" font-weight="600" fill="#334155">LARGEST PHARMA DEAL IN 3 YRS</text>
  </svg>`;
}

function svgFeature4() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="58" fill="#DDE6F2"/>
    <rect x="0" y="0" width="96" height="58" fill="#C7D6EA"/>
    <rect x="96" y="0" width="144" height="58" fill="#EFE4CF"/>
    <line x1="96" y1="0" x2="96" y2="58" stroke="#B91C1C" stroke-width="2" stroke-dasharray="4,2"/>
    <!-- Radar arcs left -->
    <path d="M22,52 A28,28 0 0 1 78,52" fill="none" stroke="#1D4ED8" stroke-width="1.6"/>
    <path d="M34,52 A16,16 0 0 1 66,52" fill="none" stroke="#1D4ED8" stroke-width="1.6"/>
    <!-- Drone path crossing 20km border -->
    <path d="M126,28 Q84,12 66,24 Q84,36 126,34" fill="none" stroke="#1E293B" stroke-width="1.6" stroke-dasharray="2.5,2"/>
    <polygon points="56,24 68,19 65,24 68,29" fill="#111827"/>
    <!-- Strike starburst -->
    <polygon points="122,33 126,25 130,33 137,31 131,37 135,45 128,41 122,47 122,39 115,37" fill="#DC2626"/>
    <text x="16" y="13" font-family="Arial, sans-serif" font-size="7.5" font-weight="800" fill="#1E3A8A">POLAND · 20 KM</text>
    <rect x="140" y="6" width="94" height="19" rx="2" fill="#991B1B"/>
    <text x="187" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.4" font-weight="800" fill="#FFFFFF">2 DEAD · 40+ HURT</text>
  </svg>`;
}

function svgFeature5() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heat5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FDE2D2"/><stop offset="100%" stop-color="#F9C5AD"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#heat5)"/>
    <!-- Blazing sun -->
    <circle cx="34" cy="24" r="15" fill="#DC2626"/>
    <circle cx="34" cy="24" r="10" fill="#F59E0B"/>
    <!-- London skyline silhouette -->
    <rect x="12" y="42" width="10" height="16" fill="#1E293B"/>
    <rect x="26" y="34" width="7" height="24" fill="#0F172A"/>
    <polygon points="26,34 29.5,23 33,34" fill="#0F172A"/>
    <polygon points="44,58 49,26 54,58" fill="#334155"/>
    <!-- Rising heat bars -->
    <rect x="74" y="42" width="9" height="16" fill="#F59E0B"/>
    <rect x="86" y="35" width="9" height="23" fill="#EA580C"/>
    <rect x="98" y="26" width="9" height="32" fill="#DC2626"/>
    <rect x="110" y="16" width="9" height="42" fill="#991B1B"/>
    <!-- Big callout -->
    <rect x="132" y="8" width="100" height="24" rx="2" fill="#991B1B"/>
    <text x="182" y="24.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="11.5" font-weight="800" fill="#FFFFFF">5,258 DEATHS</text>
    <rect x="132" y="35" width="100" height="15" rx="2" fill="#F59E0B"/>
    <text x="182" y="45.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="800" fill="#11100D">UK RECORD SUMMER</text>
  </svg>`;
}

function svgFeature6() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="58" fill="#1E4E79"/>
    <!-- Coastlines top (Iran) & bottom (Oman) -->
    <path d="M0,0 H240 V12 Q180,20 120,10 Q60,18 0,10 Z" fill="#D6BA8A"/>
    <path d="M0,58 V46 Q70,40 130,50 Q185,42 240,48 V58 Z" fill="#C7A672"/>
    <!-- 2 Tankers & flame -->
    <g transform="translate(18,23)">
      <polygon points="0,12 46,12 42,19 4,19" fill="#0F172A"/>
      <rect x="10" y="7" width="10" height="5" fill="#334155"/>
      <path d="M26,12 Q30,0 35,8 Q38,2 40,12 Z" fill="#F97316"/>
      <circle cx="34" cy="2" r="3" fill="#475569" opacity="0.7"/>
    </g>
    <g transform="translate(76,27)">
      <polygon points="0,10 40,10 36,16 4,16" fill="#0F172A"/>
      <path d="M18,10 Q22,0 26,6 Q28,2 30,10 Z" fill="#EF4444"/>
    </g>
    <!-- Naval mine -->
    <circle cx="132" cy="34" r="4.5" fill="#111827" stroke="#FBBF24" stroke-width="1"/>
    <!-- Badge -->
    <rect x="142" y="11" width="92" height="21" rx="2" fill="#C2410C"/>
    <text x="188" y="24.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.6" font-weight="800" fill="#FFFFFF">3 TANKERS CLAIM</text>
    <rect x="142" y="35" width="92" height="14" rx="2" fill="#0F172A" opacity="0.9"/>
    <text x="188" y="44.8" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.3" font-weight="700" fill="#FDE68A">STRAIT OF HORMUZ</text>
  </svg>`;
}

function svgFeature7() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="58" fill="#DCFCE7"/>
    <!-- Senegal tricolor flag -->
    <g transform="translate(12,11)">
      <rect x="0" y="0" width="16" height="36" fill="#15803D"/>
      <rect x="16" y="0" width="16" height="36" fill="#FACC15"/>
      <rect x="32" y="0" width="16" height="36" fill="#DC2626"/>
      <polygon points="24,11 25.8,16.5 31.5,16.5 26.8,19.8 28.5,25.2 24,22 19.5,25.2 21.2,19.8 16.5,16.5 22.2,16.5" fill="#15803D"/>
    </g>
    <!-- Gold AFCON cup -->
    <g transform="translate(76,10)">
      <path d="M4,4 H26 V16 C26,24 20,28 15,28 C10,28 4,24 4,16 Z" fill="#D97706" stroke="#92400E" stroke-width="1"/>
      <rect x="12" y="28" width="6" height="7" fill="#B45309"/>
      <rect x="7" y="35" width="16" height="4" fill="#78350F"/>
    </g>
    <rect x="120" y="9" width="112" height="22" rx="2" fill="#065F46"/>
    <text x="176" y="23.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.8" font-weight="800" fill="#FFFFFF">TITLE RESTORED</text>
    <rect x="120" y="34" width="112" height="15" rx="2" fill="#FACC15"/>
    <text x="176" y="44.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.8" font-weight="800" fill="#11100D">CAS OVERTURNS CAF</text>
  </svg>`;
}

function svgFeature8() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="un8" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#271B4B"/><stop offset="100%" stop-color="#432C7A"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#un8)"/>
    <!-- UN Globe + Olive wreath -->
    <g stroke="#93C5FD" fill="none" stroke-width="1.4" transform="translate(36,29)">
      <circle cx="0" cy="0" r="14"/>
      <ellipse cx="0" cy="0" rx="7" ry="14"/>
      <line x1="-14" y1="0" x2="14" y2="0"/>
      <path d="M-19,6 A20,20 0 0 0 0,20 A20,20 0 0 0 19,6" stroke="#C4B5FD" stroke-width="2"/>
    </g>
    <!-- Memorial candle -->
    <rect x="76" y="27" width="9" height="23" rx="1" fill="#F8FAFC"/>
    <path d="M80.5,12 Q85,19 80.5,25 Q76,19 80.5,12 Z" fill="#FBBF24"/>
    <!-- Big Callout -->
    <text x="170" y="29" text-anchor="middle" font-family="Georgia, serif" font-size="21" font-weight="800" fill="#FFFFFF">47,000</text>
    <rect x="108" y="35" width="124" height="15" rx="2" fill="#F59E0B"/>
    <text x="170" y="45.2" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.6" font-weight="800" fill="#11100D">~5 WOMEN / HOUR (2025)</text>
  </svg>`;
}

function svgFeature9() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <rect width="240" height="58" fill="#0F172A"/>
    <!-- Subtle grid -->
    <line x1="0" y1="20" x2="240" y2="20" stroke="#1E293B" stroke-width="1"/>
    <line x1="0" y1="40" x2="240" y2="40" stroke="#1E293B" stroke-width="1"/>
    <!-- Area chart shooting up -->
    <polygon points="10,50 42,46 68,40 94,30 118,12 118,54 10,54" fill="#10B981" opacity="0.28"/>
    <polyline points="10,50 42,46 68,40 94,30 118,12" fill="none" stroke="#34D399" stroke-width="2.6"/>
    <circle cx="118" cy="12" r="3.5" fill="#FBBF24"/>
    <!-- Callouts right -->
    <rect x="128" y="9" width="106" height="22" rx="2" fill="#059669"/>
    <text x="181" y="24" text-anchor="middle" font-family="Arial, sans-serif" font-size="11.2" font-weight="800" fill="#FFFFFF">TAIEX +8.99%</text>
    <rect x="128" y="34" width="106" height="15" rx="2" fill="#FBBF24"/>
    <text x="181" y="44.2" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.2" font-weight="800" fill="#0F172A">KOSPI +7% · NIKKEI +4%</text>
  </svg>`;
}

function svgFeature10() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sea10" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D7ECFA"/><stop offset="52%" stop-color="#C3E1F5"/><stop offset="53%" stop-color="#29668E"/><stop offset="100%" stop-color="#1A496B"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#sea10)"/>
    <!-- Myanmar coast top-left & Malaysia shore bottom-right -->
    <path d="M0,0 H56 L42,14 L18,16 L0,24 Z" fill="#D8C8A8"/>
    <path d="M84,58 L104,44 L132,46 L132,58 Z" fill="#CBB893"/>
    <!-- Aircraft flying north-west -->
    <g transform="translate(56,14) rotate(-14)">
      <path d="M0,4 L26,2 L32,4 L26,6 L0,4 Z" fill="#1E293B"/>
      <polygon points="10,4 16,-4 20,4" fill="#334155"/>
      <polygon points="10,4 16,11 20,4" fill="#334155"/>
    </g>
    <!-- Transit arc -->
    <path d="M90,34 Q68,26 42,18" fill="none" stroke="#0F766E" stroke-width="1.3" stroke-dasharray="3,2"/>
    <!-- Navy transport vessel -->
    <g transform="translate(14,34)">
      <polygon points="0,8 56,8 50,16 5,16" fill="#0F172A"/>
      <rect x="12" y="2" width="18" height="6" fill="#475569"/>
      <rect x="33" y="4" width="10" height="4" fill="#94A3B8"/>
    </g>
    <!-- Callout -->
    <rect x="122" y="8" width="112" height="22" rx="2" fill="#0F766E"/>
    <text x="178" y="22.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.6" font-weight="800" fill="#FFFFFF">6,500+ RETURNED</text>
    <rect x="122" y="34" width="112" height="15" rx="2" fill="#F59E0B"/>
    <text x="178" y="44.2" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.4" font-weight="800" fill="#11100D">1,500 SHIP · 5,300 AIR</text>
  </svg>`;
}

function svgFeature11() {
  return `<svg viewBox="0 0 240 58" width="100%" height="58" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="space11" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#070B1D"/><stop offset="100%" stop-color="#172554"/>
      </linearGradient>
    </defs>
    <rect width="240" height="58" fill="url(#space11)"/>
    <circle cx="16" cy="12" r="1" fill="#E2E8F0"/><circle cx="98" cy="10" r="1.2" fill="#FDE68A"/>
    <circle cx="88" cy="48" r="1" fill="#93C5FD"/><circle cx="114" cy="44" r="1.1" fill="#FFFFFF"/>
    <!-- Quasar & relativistic jet -->
    <line x1="22" y1="48" x2="82" y2="10" stroke="#38BDF8" stroke-width="2" opacity="0.8"/>
    <ellipse cx="52" cy="29" rx="22" ry="6" fill="none" stroke="#F59E0B" stroke-width="2.4" transform="rotate(-18 52 29)"/>
    <circle cx="52" cy="29" r="5" fill="#FEF3C7"/>
    <!-- Euclid tiny silhouette -->
    <rect x="86" y="20" width="12" height="16" fill="#94A3B8"/>
    <rect x="98" y="23" width="10" height="10" fill="#3B82F6"/>
    <!-- Callout -->
    <rect x="121" y="9" width="113" height="22" rx="2" fill="#1D4ED8"/>
    <text x="177.5" y="23.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8.8" font-weight="800" fill="#FFFFFF">630M YRS POST-BB</text>
    <text x="177.5" y="44.5" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#93C5FD">360M SOLAR MASSES</text>
  </svg>`;
}

function svgWorldMap() {
  const pins = [
    { n: 2, x: 56, y: 55, c: REGION_COLORS.NA },
    { n: 3, x: 73, y: 67, c: REGION_COLORS.NA },
    { n: 5, x: 116, y: 45, c: REGION_COLORS.EU },
    { n: 7, x: 110, y: 95, c: REGION_COLORS.AF },
    { n: 8, x: 133, y: 48, c: REGION_COLORS.WS },
    { n: 4, x: 149, y: 55, c: REGION_COLORS.EU },
    { n: 6, x: 166, y: 76, c: REGION_COLORS.ME },
    { n: 10, x: 194, y: 94, c: REGION_COLORS.SE },
    { n: 1, x: 205, y: 63, c: REGION_COLORS.EA },
    { n: 9, x: 221, y: 76, c: REGION_COLORS.EA },
    { n: 11, x: 234, y: 14, c: REGION_COLORS.WS },
  ];
  return `<svg viewBox="0 0 254 168" width="100%" height="168" xmlns="http://www.w3.org/2000/svg">
    <rect width="254" height="168" fill="#D8E8F4" stroke="#B6C7D6" stroke-width="1"/>
    <!-- Latitude/longitude lines -->
    <g stroke="#C2D7E8" stroke-width="0.6">
      <line x1="0" y1="42" x2="254" y2="42"/>
      <line x1="0" y1="86" x2="254" y2="86" stroke-dasharray="3,2"/>
      <line x1="0" y1="128" x2="254" y2="128"/>
      <line x1="64" y1="0" x2="64" y2="168"/>
      <line x1="127" y1="0" x2="127" y2="168"/>
      <line x1="190" y1="0" x2="190" y2="168"/>
    </g>
    <!-- Recognizable continents -->
    <g fill="#E7DFCE" stroke="#9AA6B2" stroke-width="0.7">
      <!-- Greenland -->
      <path d="M84,12 L102,10 L98,26 L84,24 Z"/>
      <!-- North America -->
      <path d="M12,30 L36,21 L66,26 L78,40 L68,62 L54,74 L44,84 L32,74 L24,57 L14,45 Z"/>
      <!-- South America -->
      <path d="M54,86 L74,91 L88,110 L78,136 L66,156 L58,134 L52,106 Z"/>
      <!-- Europe -->
      <path d="M118,31 L138,22 L152,29 L154,55 L142,60 L126,62 L116,53 Z"/>
      <!-- UK & Ireland -->
      <ellipse cx="114" cy="43" rx="3.2" ry="6"/>
      <!-- Africa -->
      <path d="M114,67 L142,67 L154,82 L150,113 L136,142 L124,115 L112,91 Z"/>
      <!-- Madagascar -->
      <ellipse cx="156" cy="122" rx="2.6" ry="7" transform="rotate(18 156 122)"/>
      <!-- Middle East + Asia -->
      <path d="M150,62 L166,65 L172,79 L158,82 Z"/>
      <path d="M154,26 L214,26 L224,45 L212,72 L196,89 L182,79 L168,62 L154,55 Z"/>
      <!-- Japan & Indonesia -->
      <ellipse cx="222" cy="57" rx="2.6" ry="8" transform="rotate(24 222 57)"/>
      <path d="M188,95 L208,98 L206,103 L186,101 Z"/>
      <!-- Australia + NZ -->
      <path d="M196,113 L226,113 L230,137 L214,146 L194,134 Z"/>
      <ellipse cx="240" cy="146" rx="2.3" ry="6" transform="rotate(26 240 146)"/>
    </g>
    <!-- Space box top right -->
    <rect x="218" y="3" width="32" height="30" rx="2" fill="#E2E8F0" stroke="#64748B" stroke-width="0.7" opacity="0.9"/>
    <text x="234" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="5.8" font-weight="800" fill="#334155">SPACE</text>
    ${pins
      .map(
        (p) => `<g>
        <circle cx="${p.x}" cy="${p.y}" r="6.8" fill="${p.c}" stroke="#FFFFFF" stroke-width="1.2"/>
        <text x="${p.x}" y="${p.y + 2.4}" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.2" font-weight="800" fill="#FFFFFF">${p.n}</text>
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
    place: "TAIPEI, TAIWAN",
    status: "CONFIRMED",
    statusColor: "#1D4ED8",
    svg: svgFeature9(),
    headline: "Taiwan TAIEX jumps +8.99% in chip surge",
    summary: "Record single-day jump leads Asia tech rebound (Kospi +7%, Nikkei +4%).",
    source: "Focus Taiwan, Reuters",
  },
  {
    num: 10,
    reg: "SE",
    place: "KUALA LUMPUR · MYANMAR",
    status: "OFFICIAL",
    statusColor: "#0F766E",
    svg: svgFeature10(),
    headline: "Malaysia to return 6,500+ Rohingya to Myanmar",
    summary: "PM Anwar says 1,500 will depart by navy ship in Dec and 5,300 by air.",
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
    summary: "Holds 360M-solar-mass black hole seen 630M yrs after Big Bang.",
    source: "ESA",
  },
];

const BRIEFS_COL1 = [
  { num: 12, reg: "EU", title: "Geneva Chess", text: "World Championship G1 (Gukesh–Sindarov) drawn", src: "FIDE" },
  { num: 13, reg: "EU", title: "EU Tax Gap", text: "Commission cites €200bn uncollected revenue", src: "EU Comm." },
  { num: 14, reg: "EU", title: "UK–EU Auto", text: "Irish plan offers UK car plants tariff status", src: "Guardian" },
  { num: 15, reg: "EU", title: "UNSC Clash", text: "Russia & Ukraine spar over Black Sea & grid", src: "Anadolu" },
  { num: 16, reg: "ME", title: "Gaza City", text: "Israeli strikes kill 7; meningitis alert issued", src: "Al Jazeera" },
  { num: 17, reg: "ME", title: "White House", text: "Vance & Rubio meet Qatari PM on Iran crisis", src: "Reuters" },
  { num: 18, reg: "ME", title: "Baghdad", text: "Oil Ministry moves to take over Kurdish oilfields", src: "Al Jazeera" },
  { num: 19, reg: "AF", title: "Madagascar", text: "Prosecutors seek arrest of ex-Pres. Rajoelina", src: "AFP" },
  { num: 20, reg: "AF", title: "Indian Ocean", text: "M6.4 quake near Mauritius; no tsunami alert", src: "GDACS" },
  { num: 21, reg: "EA", title: "China Aviation", text: "China Southern unit buys 50 Boeing 737-8 jets", src: "Al Jazeera" },
  { num: 22, reg: "EA", title: "Beijing", text: "China & US hold first bilateral farm talks", src: "Xinhua" },
  { num: 23, reg: "EA", title: "Asia Tech", text: "Data centers shift AI compute to US amid curbs", src: "Reuters" },
  { num: 24, reg: "SE", title: "Singapore", text: "Q3 GDP up 6.1% YoY on chips; 2026 view ~6%", src: "MTI" },
];

const BRIEFS_COL2 = [
  { num: 25, reg: "SE", title: "Hanoi", text: "Restaurant gas blast in Dong Da kills 6, hurts 10", src: "WashPost" },
  { num: 26, reg: "SE", title: "Indonesia", text: "Repatriates 139 held in Manila scam raid", src: "AP" },
  { num: 27, reg: "SE", title: "New Delhi", text: "PM Modi & Germany’s Merz review ties by phone", src: "Reuters" },
  { num: 28, reg: "NA", title: "UN / WFP", text: "Sea chokepoints risk food aid for 7.3M (+$727m)", src: "WFP" },
  { num: 29, reg: "LA", title: "Villavicencio", text: "Car bomb by governor office hurts 23 (02:30 UTC)", src: "WashPost" },
  { num: 30, reg: "LA", title: "Mexico City", text: "To try ‘El Chapo Isidro’ at home, no extradition", src: "AP" },
  { num: 31, reg: "LA", title: "Brasília", text: "Petrobras buys 42% of Neomille; ECLAC opens", src: "Reuters" },
  { num: 32, reg: "LA", title: "Galápagos", text: "El Niño rains force Santa Cruz flood emergency", src: "AP" },
  { num: 33, reg: "OC", title: "Canberra", text: "Online Duty bill sets 5% global revenue fines", src: "Guardian" },
  { num: 34, reg: "OC", title: "Singapore–Aus", text: "Wong & Albanese sign carbon & minerals pacts", src: "Reuters" },
  { num: 35, reg: "OC", title: "Gold Coast", text: "England beat Australia to level T20 series", src: "ICC" },
  { num: 36, reg: "WS", title: "Jiuquan", text: "China names Pakistan’s Zeeshan Ali for Shenzhou-24", src: "Xinhua" },
];

function renderBriefRow(b) {
  const col = REGION_COLORS[b.reg];
  return `<div class="brief-row">
    <span class="b-num" style="background:${col}">${b.num}</span>
    <span class="b-body"><strong style="color:${col}">${b.title}:</strong> ${b.text}</span>
    <span class="b-src">${b.src}</span>
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
    padding: 8px 14px 8px 14px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: #FBF7EE;
  }
  .top-kicker {
    display: flex;
    justify-content: space-between;
    font-size: 8.6px;
    font-weight: 800;
    letter-spacing: 0.55px;
    border-bottom: 1.5px solid #1A1713;
    padding-bottom: 2px;
  }
  .k-left { color: #8B1E1E; }
  .k-right { color: #1A1713; }

  .masthead {
    text-align: center;
    padding: 0 0 3px 0;
  }
  .masthead h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 50px;
    font-weight: 700;
    letter-spacing: -0.9px;
    line-height: 0.98;
    color: #11100D;
  }
  .masthead-deck {
    font-family: Georgia, "Times New Roman", serif;
    font-style: italic;
    font-size: 11.4px;
    font-weight: 700;
    color: #8B1E1E;
    margin-top: 2px;
  }

  .region-bar {
    display: flex;
    width: 100%;
    height: 19px;
    border-top: 1.5px solid #1A1713;
    border-bottom: 1.5px solid #1A1713;
  }
  .reg-seg {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 7.9px;
    font-weight: 800;
    letter-spacing: 0.3px;
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
    height: 25px;
  }
  .utc-badge {
    background: #8B1E1E;
    color: #FFFFFF;
    font-size: 7.6px;
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
    grid-template-columns: repeat(6, 1fr);
  }
  .utc-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 6px;
    border-left: 1px solid #D3C9B4;
    line-height: 1.08;
  }
  .utc-t {
    font-size: 8.4px;
    font-weight: 800;
    color: #8B1E1E;
  }
  .utc-l {
    font-size: 7.9px;
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
    padding-bottom: 5px;
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
    font-size: 8.2px;
    font-weight: 800;
    color: #292524;
    letter-spacing: 0.35px;
  }
  .num-dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: #FFFFFF;
    font-size: 8.2px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .status-tag {
    font-size: 7px;
    font-weight: 800;
    padding: 0.5px 4px;
    border: 1.2px solid currentColor;
    border-radius: 2px;
    background: #FFFDF8;
    letter-spacing: 0.35px;
  }
  .lead-col h2 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 14.6px;
    font-weight: 700;
    line-height: 1.13;
    color: #11100D;
  }
  .lead-col p {
    font-size: 9.7px;
    line-height: 1.22;
    color: #292524;
  }
  .src-inline {
    color: #57534E;
    font-weight: 600;
    font-size: 8.5px;
  }

  /* Rows 2 & 3: 2x4 Unboxed Feature Columns */
  .feat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 7px 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #1A1713;
  }
  .feat-col {
    display: flex;
    flex-direction: column;
    gap: 2.5px;
    border-right: 1px solid #DFD7C8;
    padding-right: 8px;
  }
  .feat-col:nth-child(4n) {
    border-right: none;
    padding-right: 0;
  }
  .feat-col h3 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11.7px;
    font-weight: 700;
    line-height: 1.13;
    color: #11100D;
  }
  .feat-col p {
    font-size: 8.6px;
    line-height: 1.18;
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
    gap: 4px;
  }
  .sec-hdr {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1.5px solid #1A1713;
    padding-bottom: 1.5px;
  }
  .sec-title {
    font-size: 9.2px;
    font-weight: 800;
    color: #8B1E1E;
    letter-spacing: 0.4px;
  }
  .sec-sub {
    font-size: 7.6px;
    color: #57534E;
    font-weight: 600;
  }
  .reg-legend {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px 4px;
    padding: 2px 0;
    border-bottom: 1px solid #D8CFC0;
  }
  .leg-item {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 7px;
    font-weight: 700;
    color: #292524;
  }
  .leg-dot {
    width: 6.5px;
    height: 6.5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .kpi-hdr {
    font-size: 7.8px;
    font-weight: 800;
    color: #8B1E1E;
    letter-spacing: 0.45px;
    border-bottom: 1px solid #C8BFA9;
    padding-bottom: 1px;
    margin-top: 2px;
  }
  .kpi-mini-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px 6px;
    padding-top: 2px;
  }
  .kpi-mini {
    border-left: 2.5px solid var(--kc);
    padding-left: 4px;
  }
  .kpi-mv {
    font-family: Georgia, serif;
    font-size: 12px;
    font-weight: 800;
    line-height: 1.02;
    color: #11100D;
  }
  .kpi-ml {
    font-size: 6.8px;
    line-height: 1.1;
    color: #44403C;
  }

  /* Dispatches Right */
  .briefs-area {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .brief-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
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
    font-size: 8.85px;
    line-height: 1.18;
    padding: 1.8px 0;
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
    font-size: 7.4px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .b-body {
    flex: 1;
    color: #1C1917;
    white-space: nowrap;
    overflow: hidden;
  }
  .b-src {
    font-size: 7.4px;
    font-weight: 700;
    color: #6B655D;
    flex-shrink: 0;
  }
  .fields-note {
    font-size: 7.4px;
    color: #57534E;
    background: #F2ECE0;
    border-left: 2.5px solid #8B1E1E;
    padding: 2.5px 5px;
    line-height: 1.2;
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
    font-size: 8.2px;
    font-weight: 800;
    padding: 3px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    line-height: 1.05;
    flex-shrink: 0;
  }
  .dc-text {
    padding: 3px 7px;
    font-size: 7.6px;
    line-height: 1.22;
    color: #450A0A;
  }

  /* Bottom archival footer key */
  .footer-key {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.4px;
    color: #57534E;
  }
  .key-badges {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .kb {
    font-size: 6.8px;
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
    <span class="k-right">36 STORIES · 9 REGIONS · 14 FIELDS · EVERY STORY FROM TUESDAY 24 NOVEMBER 2026</span>
  </div>

  <div class="masthead">
    <h1>Tuesday 24 November 2026</h1>
    <div class="masthead-deck">China probes Shanghai chief · US jury convicts Huawei (10/12) · Sanofi $41bn buyout · England 5,258 heat deaths</div>
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
        <span class="sec-sub">pins 1–11 match cards above</span>
      </div>
      ${svgWorldMap()}
      <div class="reg-legend">
        ${REGIONS.map(
          (r) => `<div class="leg-item"><span class="leg-dot" style="background:${REGION_COLORS[r.key]}"></span><span>${r.name === "SOUTH & SE ASIA" ? "S & SE Asia" : r.name === "LATIN AMERICA" ? "Lat. America" : r.name === "WORLD & SPACE" ? "World/Space" : r.name.charAt(0) + r.name.slice(1).toLowerCase()} ${r.count}</span></div>`
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
        <span class="sec-sub">25 additional verified dispatches (color-coded by region)</span>
      </div>
      <div class="brief-cols">
        <div class="brief-list">
          ${BRIEFS_COL1.map(renderBriefRow).join("")}
        </div>
        <div class="brief-list">
          ${BRIEFS_COL2.map(renderBriefRow).join("")}
          <div class="fields-note"><strong>14 Fields:</strong> Geopolitics, Courts, Tech, Pharma, Climate, War, Markets, Energy, Space, Sport, Aid, Trade, Disasters &amp; Science.</div>
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
      <span><span class="kb" style="color:#C2410C">CLAIM</span> one side's account</span>
    </div>
    <span>Sources: AP, Reuters, AFP, Guardian, Al Jazeera, WashPost, Xinhua, ESA, UNODC, UKHSA, Focus Taiwan, FIDE, WFP, ICC, Sanofi · Original vector drawings &amp; map</span>
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
