const PRODUCTS = [
  // --- Wedding Dresses (6 items) ---
  {
    id: 'wd-01',
    category: 'dresses',
    name: 'Aura Silk Column Gown',
    price: 1850,
    sizes: ['AU 6', 'AU 8', 'AU 10', 'AU 12'],
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight matte silk crepe with clean athletic lines and a low square back.'
  },
  {
    id: 'wd-02',
    category: 'dresses',
    name: 'Nova Sculpted Halter',
    price: 2100,
    sizes: ['AU 6', 'AU 8', 'AU 10', 'AU 14'],
    image: 'https://images.unsplash.com/photo-1549416878-b9ca95e26903?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary racerback silhouette in micro-ribbed duchess satin.'
  },
  {
    id: 'wd-03',
    category: 'dresses',
    name: 'Solace Minimal Slip',
    price: 1450,
    sizes: ['AU 6', 'AU 8', 'AU 10', 'AU 12', 'AU 16'],
    image: 'https://images.unsplash.com/photo-1525299374597-911581e1bdef?auto=format&fit=crop&w=800&q=80',
    description: 'Bias-cut mulberry silk slip gown engineered for effortless drape and movement.'
  },
  {
    id: 'wd-04',
    category: 'dresses',
    name: 'Kinetics High-Neck Sheath',
    price: 1950,
    sizes: ['AU 8', 'AU 10', 'AU 12'],
    image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=800&q=80',
    description: 'Architectural mock-neck collar with streamlined seam work and center split.'
  },
  {
    id: 'wd-05',
    category: 'dresses',
    name: 'Vessel Off-Shoulder Gown',
    price: 2350,
    sizes: ['AU 6', 'AU 8', 'AU 10', 'AU 12', 'AU 14'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Sharp horizontal cuff line tailored across structural Italian cady.'
  },
  {
    id: 'wd-06',
    category: 'dresses',
    name: 'Eclipse Plunge Column',
    price: 1750,
    sizes: ['AU 8', 'AU 10', 'AU 12', 'AU 16'],
    image: 'https://images.unsplash.com/photo-1560932684-5e552e2894e9?auto=format&fit=crop&w=800&q=80',
    description: 'Deep V tailored sheath featuring raw-edge minimalist hem detailing.'
  },

  // --- Tuxedos (6 items) ---
  {
    id: 'tx-01',
    category: 'tuxedos',
    name: 'Prime Shawl Tuxedo',
    price: 1350,
    sizes: ['36R', '38R', '40R', '42R', '44R'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Deep midnight wool with seamless black grosgrain shawl collar.'
  },
  {
    id: 'tx-02',
    category: 'tuxedos',
    name: 'Linear Peak Lapel Suit',
    price: 1400,
    sizes: ['38R', '40R', '42R', '44R'],
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    description: 'Single-button tailored jacket with ultra-wide razor-sharp peak lapels.'
  },
  {
    id: 'tx-03',
    category: 'tuxedos',
    name: 'Vantage Double-Breasted Dinner Suit',
    price: 1550,
    sizes: ['36R', '38R', '40R', '42R'],
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary 4x1 button stance cut in ultra-fine Australian merino wool.'
  },
  {
    id: 'tx-04',
    category: 'tuxedos',
    name: 'Alabaster Ivory Tuxedo',
    price: 1450,
    sizes: ['38R', '40R', '42R', '44R'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    description: 'Pure ecru wool blend jacket with contrasting black tailored trousers.'
  },
  {
    id: 'tx-05',
    category: 'tuxedos',
    name: 'Monolith Mandarin Collar Suit',
    price: 1250,
    sizes: ['36R', '38R', '40R', '42R'],
    image: 'https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&w=800&q=80',
    description: 'Collarless minimalist evening jacket with hidden placket fastening.'
  },
  {
    id: 'tx-06',
    category: 'tuxedos',
    name: 'Graphite Modern Cut Tuxedo',
    price: 1300,
    sizes: ['38R', '40R', '42R', '44R'],
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    description: 'Deep slate-grey tailored suit with satin piped edges and tapered leg trousers.'
  },

  // --- Bouquets & Promotional Bundles ---
  {
    id: 'bq-01',
    category: 'bouquets',
    name: 'Monochrome Calla Lily Bundle',
    price: 220,
    sizes: ['Standard', 'Full'],
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    description: 'Single-stem architecture featuring fresh white calla lilies and hand-tied raw silk.'
  },
  {
    id: 'bq-02',
    category: 'bouquets',
    name: 'Nordic Bleached Orchid Arrangement',
    price: 260,
    sizes: ['Standard'],
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80',
    description: 'Cascading Phalaenopsis orchids with preserved dried botanical accents.'
  },
  {
    id: 'pkg-01',
    category: 'packages',
    name: 'The Essential Everlune Couple Bundle',
    price: 2900,
    sizes: ['One Size Fits Custom Tailoring'],
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    description: 'Promotional package: Includes 1 Minimalist Gown, 1 Bespoke Wool Tuxedo, and complimentary Bridal Bouquet. Save $400 AUD.'
  }
];