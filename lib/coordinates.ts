// Country coordinates database with ISO 3-letter country codes
export const countryCoordinates: Record<string, {latitude: number, longitude: number}> = {
  // A
  "AFG": { latitude: 33.93911, longitude: 67.709953 }, // Afghanistan
  "ALA": { latitude: 60.1785, longitude: 19.9156 }, // Åland Islands
  "ALB": { latitude: 41.153332, longitude: 20.168331 }, // Albania
  "DZA": { latitude: 28.033886, longitude: 1.659626 }, // Algeria
  "ASM": { latitude: -14.270972, longitude: -170.132217 }, // American Samoa
  "AND": { latitude: 42.546245, longitude: 1.601554 }, // Andorra
  "AGO": { latitude: -11.202692, longitude: 17.873887 }, // Angola
  "AIA": { latitude: 18.220554, longitude: -63.068615 }, // Anguilla
  "ATA": { latitude: -75.250973, longitude: -0.071389 }, // Antarctica
  "ATG": { latitude: 17.060816, longitude: -61.796428 }, // Antigua and Barbuda
  "ARG": { latitude: -38.416097, longitude: -63.616672 }, // Argentina
  "ARM": { latitude: 40.069099, longitude: 45.038189 }, // Armenia
  "ABW": { latitude: 12.52111, longitude: -69.968338 }, // Aruba
  "AUS": { latitude: -25.274398, longitude: 133.775136 }, // Australia
  "AUT": { latitude: 47.516231, longitude: 14.550072 }, // Austria
  "AZE": { latitude: 40.143105, longitude: 47.576927 }, // Azerbaijan

  // B
  "BHS": { latitude: 25.03428, longitude: -77.39628 }, // Bahamas
  "BHR": { latitude: 25.930414, longitude: 50.637772 }, // Bahrain
  "BGD": { latitude: 23.684994, longitude: 90.356331 }, // Bangladesh
  "BRB": { latitude: 13.193887, longitude: -59.543198 }, // Barbados
  "BLR": { latitude: 53.709807, longitude: 27.953389 }, // Belarus
  "BEL": { latitude: 50.503887, longitude: 4.469936 }, // Belgium
  "BLZ": { latitude: 17.189877, longitude: -88.49765 }, // Belize
  "BEN": { latitude: 9.30769, longitude: 2.315834 }, // Benin
  "BMU": { latitude: 32.321384, longitude: -64.75737 }, // Bermuda
  "BTN": { latitude: 27.514162, longitude: 90.433601 }, // Bhutan
  "BOL": { latitude: -16.290154, longitude: -63.588653 }, // Bolivia
  "BIH": { latitude: 43.915886, longitude: 17.679076 }, // Bosnia and Herzegovina
  "BWA": { latitude: -22.328474, longitude: 24.684866 }, // Botswana
  "BVT": { latitude: -54.423199, longitude: 3.413194 }, // Bouvet Island
  "BRA": { latitude: -14.235004, longitude: -51.92528 }, // Brazil
  "BRN": { latitude: 4.535277, longitude: 114.727669 }, // Brunei
  "BGR": { latitude: 42.733883, longitude: 25.48583 }, // Bulgaria
  "BFA": { latitude: 12.238333, longitude: -1.561593 }, // Burkina Faso
  "BDI": { latitude: -3.373056, longitude: 29.918886 }, // Burundi

  // C
  "KHM": { latitude: 12.565679, longitude: 104.990963 }, // Cambodia
  "CMR": { latitude: 7.369722, longitude: 12.354722 }, // Cameroon
  "CAN": { latitude: 56.130366, longitude: -106.346771 }, // Canada
  "CPV": { latitude: 16.002082, longitude: -24.013197 }, // Cape Verde
  "CYM": { latitude: 19.513469, longitude: -80.566956 }, // Cayman Islands
  "CAF": { latitude: 6.611111, longitude: 20.939444 }, // Central African Republic
  "TCD": { latitude: 15.454166, longitude: 18.732207 }, // Chad
  "CHL": { latitude: -35.675147, longitude: -71.542969 }, // Chile
  "CHN": { latitude: 35.86166, longitude: 104.195397 }, // China
  "CXR": { latitude: -10.447525, longitude: 105.690449 }, // Christmas Island
  "CCK": { latitude: -12.164165, longitude: 96.870956 }, // Cocos (Keeling) Islands
  "COL": { latitude: 4.570868, longitude: -74.297333 }, // Colombia
  "COM": { latitude: -11.875001, longitude: 43.872219 }, // Comoros
  "COG": { latitude: -0.228021, longitude: 15.827659 }, // Congo
  "COD": { latitude: -4.038333, longitude: 21.758664 }, // Congo, the Democratic Republic of the
  "COK": { latitude: -21.236736, longitude: -159.777671 }, // Cook Islands
  "CRI": { latitude: 9.748917, longitude: -83.753428 }, // Costa Rica
  "CIV": { latitude: 7.539989, longitude: -5.54708 }, // Côte d'Ivoire
  "HRV": { latitude: 45.1, longitude: 15.2 }, // Croatia
  "CUB": { latitude: 21.521757, longitude: -77.781167 }, // Cuba
  "CYP": { latitude: 35.126413, longitude: 33.429859 }, // Cyprus
  "CZE": { latitude: 49.817492, longitude: 15.472962 }, // Czech Republic

  // D
  "DNK": { latitude: 56.26392, longitude: 9.501785 }, // Denmark
  "DJI": { latitude: 11.825138, longitude: 42.590275 }, // Djibouti
  "DMA": { latitude: 15.414999, longitude: -61.370976 }, // Dominica
  "DOM": { latitude: 18.735693, longitude: -70.162651 }, // Dominican Republic

  // E
  "ECU": { latitude: -1.831239, longitude: -78.183406 }, // Ecuador
  "EGY": { latitude: 26.820553, longitude: 30.802498 }, // Egypt
  "SLV": { latitude: 13.794185, longitude: -88.89653 }, // El Salvador
  "GNQ": { latitude: 1.650801, longitude: 10.267895 }, // Equatorial Guinea
  "ERI": { latitude: 15.179384, longitude: 39.782334 }, // Eritrea
  "EST": { latitude: 58.595272, longitude: 25.013607 }, // Estonia
  "ETH": { latitude: 9.145, longitude: 40.489673 }, // Ethiopia

  // F
  "FLK": { latitude: -51.796253, longitude: -59.523613 }, // Falkland Islands (Malvinas)
  "FRO": { latitude: 61.892635, longitude: -6.911806 }, // Faroe Islands
  "FJI": { latitude: -16.578193, longitude: 179.414413 }, // Fiji
  "FIN": { latitude: 61.92411, longitude: 25.748151 }, // Finland
  "FRA": { latitude: 46.227638, longitude: 2.213749 }, // France
  "GUF": { latitude: 3.933889, longitude: -53.125782 }, // French Guiana
  "PYF": { latitude: -17.679742, longitude: -149.406843 }, // French Polynesia
  "ATF": { latitude: -49.280366, longitude: 69.348557 }, // French Southern Territories

  // G
  "GAB": { latitude: -0.803689, longitude: 11.609444 }, // Gabon
  "GMB": { latitude: 13.443182, longitude: -15.310139 }, // Gambia
  "GEO": { latitude: 42.315407, longitude: 43.356892 }, // Georgia
  "DEU": { latitude: 51.165691, longitude: 10.451526 }, // Germany
  "GHA": { latitude: 7.946527, longitude: -1.023194 }, // Ghana
  "GIB": { latitude: 36.137741, longitude: -5.345374 }, // Gibraltar
  "GRC": { latitude: 39.074208, longitude: 21.824312 }, // Greece
  "GRL": { latitude: 71.706936, longitude: -42.604303 }, // Greenland
  "GRD": { latitude: 12.262776, longitude: -61.604171 }, // Grenada
  "GLP": { latitude: 16.995971, longitude: -62.067641 }, // Guadeloupe
  "GUM": { latitude: 13.444304, longitude: 144.793731 }, // Guam
  "GTM": { latitude: 15.783471, longitude: -90.230759 }, // Guatemala
  "GGY": { latitude: 49.465691, longitude: -2.585278 }, // Guernsey
  "GIN": { latitude: 9.945587, longitude: -9.696645 }, // Guinea
  "GNB": { latitude: 11.803749, longitude: -15.180413 }, // Guinea-Bissau
  "GUY": { latitude: 4.860416, longitude: -58.93018 }, // Guyana

  // H
  "HTI": { latitude: 18.971187, longitude: -72.285215 }, // Haiti
  "HMD": { latitude: -53.08181, longitude: 73.504158 }, // Heard Island and McDonald Islands
  "VAT": { latitude: 41.902916, longitude: 12.453389 }, // Holy See (Vatican City State)
  "HND": { latitude: 15.199999, longitude: -86.241905 }, // Honduras
  "HKG": { latitude: 22.396428, longitude: 114.109497 }, // Hong Kong
  "HUN": { latitude: 47.162494, longitude: 19.503304 }, // Hungary

  // I
  "ISL": { latitude: 64.963051, longitude: -19.020835 }, // Iceland
  "IND": { latitude: 20.593684, longitude: 78.96288 }, // India
  "IDN": { latitude: -0.789275, longitude: 113.921327 }, // Indonesia
  "IRN": { latitude: 32.427908, longitude: 53.688046 }, // Iran
  "IRQ": { latitude: 33.223191, longitude: 43.679291 }, // Iraq
  "IRL": { latitude: 53.41291, longitude: -8.24389 }, // Ireland
  "IMN": { latitude: 54.236107, longitude: -4.548056 }, // Isle of Man
  "ISR": { latitude: 31.046051, longitude: 34.851612 }, // Israel
  "ITA": { latitude: 41.87194, longitude: 12.56738 }, // Italy

  // J
  "JAM": { latitude: 18.109581, longitude: -77.297508 }, // Jamaica
  "JPN": { latitude: 36.204824, longitude: 138.252924 }, // Japan
  "JEY": { latitude: 49.214439, longitude: -2.13125 }, // Jersey
  "JOR": { latitude: 30.585164, longitude: 36.238414 }, // Jordan

  // K
  "KAZ": { latitude: 48.019573, longitude: 66.923684 }, // Kazakhstan
  "KEN": { latitude: -0.023559, longitude: 37.906193 }, // Kenya
  "KIR": { latitude: -3.370417, longitude: -168.734039 }, // Kiribati
  "PRK": { latitude: 40.339852, longitude: 127.510093 }, // North Korea
  "KOR": { latitude: 35.907757, longitude: 127.766922 }, // South Korea
  "KWT": { latitude: 29.31166, longitude: 47.481766 }, // Kuwait
  "KGZ": { latitude: 41.20438, longitude: 74.766098 }, // Kyrgyzstan

  // L
  "LAO": { latitude: 19.85627, longitude: 102.495496 }, // Laos
  "LVA": { latitude: 56.879635, longitude: 24.603189 }, // Latvia
  "LBN": { latitude: 33.854721, longitude: 35.862285 }, // Lebanon
  "LSO": { latitude: -29.609988, longitude: 28.233608 }, // Lesotho
  "LBR": { latitude: 6.428055, longitude: -9.429499 }, // Liberia
  "LBY": { latitude: 26.3351, longitude: 17.228331 }, // Libya
  "LIE": { latitude: 47.166, longitude: 9.555373 }, // Liechtenstein
  "LTU": { latitude: 55.169438, longitude: 23.881275 }, // Lithuania
  "LUX": { latitude: 49.815273, longitude: 6.129583 }, // Luxembourg

  // M
  "MAC": { latitude: 22.198745, longitude: 113.543873 }, // Macao
  "MKD": { latitude: 41.608635, longitude: 21.745275 }, // North Macedonia
  "MDG": { latitude: -18.766947, longitude: 46.869107 }, // Madagascar
  "MWI": { latitude: -13.254308, longitude: 34.301525 }, // Malawi
  "MYS": { latitude: 4.210484, longitude: 101.975766 }, // Malaysia
  "MDV": { latitude: 3.202778, longitude: 73.22068 }, // Maldives
  "MLI": { latitude: 17.570692, longitude: -3.996166 }, // Mali
  "MLT": { latitude: 35.937496, longitude: 14.375416 }, // Malta
  "MHL": { latitude: 7.131474, longitude: 171.184478 }, // Marshall Islands
  "MTQ": { latitude: 14.641528, longitude: -61.024174 }, // Martinique
  "MRT": { latitude: 21.00789, longitude: -10.940835 }, // Mauritania
  "MUS": { latitude: -20.348404, longitude: 57.552152 }, // Mauritius
  "MYT": { latitude: -12.8275, longitude: 45.166244 }, // Mayotte
  "MEX": { latitude: 23.634501, longitude: -102.552784 }, // Mexico
  "FSM": { latitude: 7.425554, longitude: 150.550812 }, // Micronesia
  "MDA": { latitude: 47.411631, longitude: 28.369885 }, // Moldova
  "MCO": { latitude: 43.750298, longitude: 7.412841 }, // Monaco
  "MNG": { latitude: 46.862496, longitude: 103.846656 }, // Mongolia
  "MNE": { latitude: 42.708678, longitude: 19.37439 }, // Montenegro
  "MSR": { latitude: 16.742498, longitude: -62.187366 }, // Montserrat
  "MAR": { latitude: 31.791702, longitude: -7.09262 }, // Morocco
  "MOZ": { latitude: -18.665695, longitude: 35.529562 }, // Mozambique
  "MMR": { latitude: 21.913965, longitude: 95.956223 }, // Myanmar

  // N
  "NAM": { latitude: -22.95764, longitude: 18.49041 }, // Namibia
  "NRU": { latitude: -0.522778, longitude: 166.931503 }, // Nauru
  "NPL": { latitude: 28.394857, longitude: 84.124008 }, // Nepal
  "NLD": { latitude: 52.132633, longitude: 5.291266 }, // Netherlands
  "NCL": { latitude: -20.904305, longitude: 165.618042 }, // New Caledonia
  "NZL": { latitude: -40.900557, longitude: 174.885971 }, // New Zealand
  "NIC": { latitude: 12.865416, longitude: -85.207229 }, // Nicaragua
  "NER": { latitude: 17.607789, longitude: 8.081666 }, // Niger
  "NGA": { latitude: 9.081999, longitude: 8.675277 }, // Nigeria
  "NIU": { latitude: -19.054445, longitude: -169.867233 }, // Niue
  "NFK": { latitude: -29.040835, longitude: 167.954712 }, // Norfolk Island
  "MNP": { latitude: 17.33083, longitude: 145.38469 }, // Northern Mariana Islands
  "NOR": { latitude: 60.472024, longitude: 8.468946 }, // Norway

  // O
  "OMN": { latitude: 21.512583, longitude: 55.923255 }, // Oman

  // P
  "PAK": { latitude: 30.375321, longitude: 69.345116 }, // Pakistan
  "PLW": { latitude: 7.51498, longitude: 134.58252 }, // Palau
  "PSE": { latitude: 31.952162, longitude: 35.233154 }, // Palestine
  "PAN": { latitude: 8.537981, longitude: -80.782127 }, // Panama
  "PNG": { latitude: -6.314993, longitude: 143.95555 }, // Papua New Guinea
  "PRY": { latitude: -23.442503, longitude: -58.443832 }, // Paraguay
  "PER": { latitude: -9.189967, longitude: -75.015152 }, // Peru
  "PHL": { latitude: 12.879721, longitude: 121.774017 }, // Philippines
  "PCN": { latitude: -24.703615, longitude: -127.439308 }, // Pitcairn
  "POL": { latitude: 51.919438, longitude: 19.145136 }, // Poland
  "PRT": { latitude: 39.399872, longitude: -8.224454 }, // Portugal
  "PRI": { latitude: 18.220833, longitude: -66.590149 }, // Puerto Rico

  // Q
  "QAT": { latitude: 25.354826, longitude: 51.183884 }, // Qatar

  // R
  "REU": { latitude: -21.115141, longitude: 55.536384 }, // Réunion
  "ROU": { latitude: 45.943161, longitude: 24.96676 }, // Romania
  "RUS": { latitude: 61.52401, longitude: 105.318756 }, // Russia
  "RWA": { latitude: -1.940278, longitude: 29.873888 }, // Rwanda

  // S
  "BLM": { latitude: 17.9, longitude: -62.833333 }, // Saint Barthélemy
  "SHN": { latitude: -24.143474, longitude: -10.030696 }, // Saint Helena
  "KNA": { latitude: 17.357822, longitude: -62.782998 }, // Saint Kitts and Nevis
  "LCA": { latitude: 13.909444, longitude: -60.978893 }, // Saint Lucia
  "MAF": { latitude: 18.086947, longitude: -63.06006 }, // Saint Martin
  "SPM": { latitude: 46.941936, longitude: -56.27111 }, // Saint Pierre and Miquelon
  "VCT": { latitude: 12.984305, longitude: -61.287228 }, // Saint Vincent and the Grenadines
  "WSM": { latitude: -13.759029, longitude: -172.104629 }, // Samoa
  "SMR": { latitude: 43.94236, longitude: 12.457777 }, // San Marino
  "STP": { latitude: 0.18636, longitude: 6.613081 }, // Sao Tome and Principe
  "SAU": { latitude: 23.885942, longitude: 45.079162 }, // Saudi Arabia
  "SEN": { latitude: 14.497401, longitude: -14.452362 }, // Senegal
  "SRB": { latitude: 44.016521, longitude: 21.005859 }, // Serbia
  "SYC": { latitude: -4.679574, longitude: 55.491977 }, // Seychelles
  "SLE": { latitude: 8.460555, longitude: -11.779889 }, // Sierra Leone
  "SGP": { latitude: 1.352083, longitude: 103.819836 }, // Singapore
  "SVK": { latitude: 48.669026, longitude: 19.699024 }, // Slovakia
  "SVN": { latitude: 46.151241, longitude: 14.995463 }, // Slovenia
  "SLB": { latitude: -9.64571, longitude: 160.156194 }, // Solomon Islands
  "SOM": { latitude: 5.152149, longitude: 46.199616 }, // Somalia
  "ZAF": { latitude: -30.559482, longitude: 22.937506 }, // South Africa
  "SGS": { latitude: -54.429579, longitude: -36.587909 }, // South Georgia and the South Sandwich Islands
  "SSD": { latitude: 6.876991808268445, longitude: 31.306978225708008 }, // South Sudan
  "ESP": { latitude: 40.463667, longitude: -3.74922 }, // Spain
  "LKA": { latitude: 7.873054, longitude: 80.771797 }, // Sri Lanka
  "SDN": { latitude: 12.862807, longitude: 30.217636 }, // Sudan
  "SUR": { latitude: 3.919305, longitude: -56.027783 }, // Suriname
  "SJM": { latitude: 77.553604, longitude: 23.670272 }, // Svalbard and Jan Mayen
  "SWZ": { latitude: -26.522503, longitude: 31.465866 }, // Swaziland
  "SWE": { latitude: 60.128161, longitude: 18.643501 }, // Sweden
  "CHE": { latitude: 46.818188, longitude: 8.227512 }, // Switzerland
  "SYR": { latitude: 34.802075, longitude: 38.996815 }, // Syrian Arab Republic

  // T
  "TWN": { latitude: 23.69781, longitude: 120.960515 }, // Taiwan
  "TJK": { latitude: 38.861034, longitude: 71.276093 }, // Tajikistan
  "TZA": { latitude: -6.369028, longitude: 34.888822 }, // Tanzania
  "THA": { latitude: 15.870032, longitude: 100.992541 }, // Thailand
  "TLS": { latitude: -8.874217, longitude: 125.727539 }, // Timor-Leste
  "TGO": { latitude: 8.619543, longitude: 0.824782 }, // Togo
  "TKL": { latitude: -8.967363, longitude: -171.855881 }, // Tokelau
  "TON": { latitude: -21.178986, longitude: -175.198242 }, // Tonga
  "TTO": { latitude: 10.691803, longitude: -61.222503 }, // Trinidad and Tobago
  "TUN": { latitude: 33.886917, longitude: 9.537499 }, // Tunisia
  "TUR": { latitude: 38.963745, longitude: 35.243322 }, // Turkey
  "TKM": { latitude: 38.969719, longitude: 59.556278 }, // Turkmenistan
  "TCA": { latitude: 21.694025, longitude: -71.797928 }, // Turks and Caicos Islands
  "TUV": { latitude: -7.109535, longitude: 177.64933 }, // Tuvalu

  // U
  "UGA": { latitude: 1.373333, longitude: 32.290275 }, // Uganda
  "UKR": { latitude: 48.379433, longitude: 31.16558 }, // Ukraine
  "ARE": { latitude: 23.424076, longitude: 53.847818 }, // United Arab Emirates
  "GBR": { latitude: 55.378051, longitude: -3.435973 }, // United Kingdom
  "USA": { latitude: 37.09024, longitude: -95.712891 }, // United States
  "UMI": { latitude: 19.3, longitude: 166.633333 }, // United States Minor Outlying Islands
  "URY": { latitude: -32.522779, longitude: -55.765835 }, // Uruguay
  "UZB": { latitude: 41.377491, longitude: 64.585262 }, // Uzbekistan

  // V
  "VUT": { latitude: -15.376706, longitude: 166.959158 }, // Vanuatu
  "VEN": { latitude: 6.42375, longitude: -66.58973 }, // Venezuela
  "VNM": { latitude: 14.058324, longitude: 108.277199 }, // Vietnam
  "VGB": { latitude: 18.420695, longitude: -64.639968 }, // Virgin Islands, British
  "VIR": { latitude: 18.335765, longitude: -64.896335 }, // Virgin Islands, U.S.

  // W
  "WLF": { latitude: -13.768752, longitude: -177.156097 }, // Wallis and Futuna
  "ESH": { latitude: 24.215527, longitude: -12.885834 }, // Western Sahara

  // Y
  "YEM": { latitude: 15.552727, longitude: 48.516388 }, // Yemen

  // Z
  "ZMB": { latitude: -13.133897, longitude: 27.849332 }, // Zambia
  "ZWE": { latitude: -19.015438, longitude: 29.154857 }, // Zimbabwe

  // Special territories or entities
  "XKX": { latitude: 42.602636, longitude: 20.902977 }, // Kosovo
  "CUW": { latitude: 12.169570, longitude: -68.990021 }, // Curaçao
  "SXM": { latitude: 18.033333, longitude: -63.050000 }, // Sint Maarten
  "BES": { latitude: 12.178361, longitude: -68.238534 }, // Bonaire, Sint Eustatius and Saba

  // Common non-standard codes used in datasets
  "ROM": { latitude: 45.943161, longitude: 24.96676 }, // Romania (old code)
  "ZAR": { latitude: -4.038333, longitude: 21.758664 }, // Democratic Republic of the Congo (old code)
  "TMP": { latitude: -8.874217, longitude: 125.727539 }, // East Timor (old code)
}; 