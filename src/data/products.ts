export interface ProductVariation {
  id: string;
  sku: string;
  color: string;
  colorHex: string;
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  sku: string; // Código/referência
  name: string;
  department: "Feminino" | "Masculino" | "Infantil";
  type: "Conjuntos" | "Vestidos" | "Camisetas" | "Calças" | "Shorts" | "Moda fitness" | "Tops" | "Macacões";
  categories: string[]; // ['feminino', 'moda-fitness', 'conjuntos', 'lancamentos', 'promocoes']
  category: "leggings" | "tops" | "conjuntos" | "shorts" | "macacoes" | "seamless" | "camisetas" | "vestidos";
  categoryLabel: string;
  retailPrice: number;
  wholesalePrice: number;
  minWholesaleQty: number; // Quantidade mínima para atacado
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number; // Estoque total
  variations: ProductVariation[]; // Variações (cor x tamanho com estoque)
  isNew?: boolean;
  isBestSeller?: boolean;
  isPromo?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  fabric: string;
  description: string;
}

export const CATALOG_CATEGORIES = [
  { id: "todos", name: "Todos os Produtos", count: 12 },
  { id: "feminino", name: "Feminino", count: 8 },
  { id: "masculino", name: "Masculino", count: 3 },
  { id: "infantil", name: "Infantil", count: 2 },
  { id: "conjuntos", name: "Conjuntos", count: 4 },
  { id: "vestidos", name: "Vestidos", count: 2 },
  { id: "camisetas", name: "Camisetas", count: 3 },
  { id: "calcas", name: "Calças", count: 3 },
  { id: "shorts", name: "Shorts", count: 3 },
  { id: "moda-fitness", name: "Moda Fitness", count: 9 },
  { id: "lancamentos", name: "Lançamentos", count: 5 },
  { id: "promocoes", name: "Promoções", count: 5 },
];

export const CATEGORIES = [
  {
    id: "conjuntos",
    name: "Conjuntos",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    itemCount: 42,
    description: "Combinações perfeitas de alta performance",
  },
  {
    id: "leggings",
    name: "Leggings & Calças",
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80",
    itemCount: 56,
    description: "Zero transparência e modelagem anatômica",
  },
  {
    id: "tops",
    name: "Tops & Croppeds",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    itemCount: 38,
    description: "Sustentação ideal com bojo removível",
  },
  {
    id: "shorts",
    name: "Shorts & Bermudas",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80",
    itemCount: 29,
    description: "Liberdade de movimento e cós anatômico",
  },
  {
    id: "macacoes",
    name: "Macacões & Bodys",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
    itemCount: 24,
    description: "Elegância e conforto em peça única",
  },
  {
    id: "seamless",
    name: "Linha Sem Costura",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    itemCount: 19,
    description: "Tecnologia Seamless toque suave e compressão",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "am-01",
    sku: "REF-AM8401",
    name: "Conjunto Fit Power Magenta Glow",
    department: "Feminino",
    type: "Conjuntos",
    categories: ["feminino", "moda-fitness", "conjuntos", "lancamentos"],
    category: "conjuntos",
    categoryLabel: "Conjuntos",
    retailPrice: 159.90,
    wholesalePrice: 89.90,
    minWholesaleQty: 6,
    originalPrice: 189.90,
    discountPercentage: 15,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Magenta AM", hex: "#ff0055" },
      { name: "Preto Ônix", hex: "#111111" },
      { name: "Chumbo", hex: "#4b5563" },
    ],
    stock: 74,
    variations: [
      { id: "am01-mag-p", sku: "REF-AM8401-MAG-P", color: "Magenta AM", colorHex: "#ff0055", size: "P", stock: 12 },
      { id: "am01-mag-m", sku: "REF-AM8401-MAG-M", color: "Magenta AM", colorHex: "#ff0055", size: "M", stock: 18 },
      { id: "am01-mag-g", sku: "REF-AM8401-MAG-G", color: "Magenta AM", colorHex: "#ff0055", size: "G", stock: 10 },
      { id: "am01-prt-p", sku: "REF-AM8401-PRT-P", color: "Preto Ônix", colorHex: "#111111", size: "P", stock: 8 },
      { id: "am01-prt-m", sku: "REF-AM8401-PRT-M", color: "Preto Ônix", colorHex: "#111111", size: "M", stock: 14 },
      { id: "am01-prt-g", sku: "REF-AM8401-PRT-G", color: "Preto Ônix", colorHex: "#111111", size: "G", stock: 12 },
    ],
    isFeatured: true,
    isBestSeller: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 128,
    fabric: "Poliamida com Elastano LYCRA® 320g (Zero Transparência)",
    description: "Conjunto fitness composto por top reforçado com bojo removível e calça legging de cós alto duplo. Modela a cintura e não desce durante o treino.",
  },
  {
    id: "am-02",
    sku: "REF-AM8402",
    name: "Calça Legging Efeito Empina Bumbum",
    department: "Feminino",
    type: "Calças",
    categories: ["feminino", "moda-fitness", "calcas", "lancamentos"],
    category: "leggings",
    categoryLabel: "Calças",
    retailPrice: 119.90,
    wholesalePrice: 59.90,
    minWholesaleQty: 6,
    originalPrice: 139.90,
    discountPercentage: 14,
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Preto Puro", hex: "#000000" },
      { name: "Magenta Glow", hex: "#ff0055" },
      { name: "Cinza Grafite", hex: "#374151" },
    ],
    stock: 92,
    variations: [
      { id: "am02-prt-p", sku: "REF-AM8402-PRT-P", color: "Preto Puro", colorHex: "#000000", size: "P", stock: 22 },
      { id: "am02-prt-m", sku: "REF-AM8402-PRT-M", color: "Preto Puro", colorHex: "#000000", size: "M", stock: 35 },
      { id: "am02-prt-g", sku: "REF-AM8402-PRT-G", color: "Preto Puro", colorHex: "#000000", size: "G", stock: 15 },
      { id: "am02-mag-m", sku: "REF-AM8402-MAG-M", color: "Magenta Glow", colorHex: "#ff0055", size: "M", stock: 20 },
    ],
    isFeatured: true,
    isBestSeller: true,
    rating: 5.0,
    reviewsCount: 214,
    fabric: "Suplex Poliamida 320g com proteção UV50+",
    description: "Nossa calça best-seller! Costura franzida estratégica na parte traseira que desenha e valoriza as curvas femininas com compressão anatômica.",
  },
  {
    id: "am-03",
    sku: "REF-AM8403",
    name: "Top Fitness Cruzado Costas Magenta",
    department: "Feminino",
    type: "Tops",
    categories: ["feminino", "moda-fitness", "lancamentos"],
    category: "tops",
    categoryLabel: "Tops & Croppeds",
    retailPrice: 69.90,
    wholesalePrice: 34.90,
    minWholesaleQty: 6,
    originalPrice: 79.90,
    discountPercentage: 12,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Magenta Neon", hex: "#ff0055" },
      { name: "Preto Ônix", hex: "#111111" },
      { name: "Branco Neve", hex: "#ffffff" },
    ],
    stock: 58,
    variations: [
      { id: "am03-mag-p", sku: "REF-AM8403-MAG-P", color: "Magenta Neon", colorHex: "#ff0055", size: "P", stock: 14 },
      { id: "am03-mag-m", sku: "REF-AM8403-MAG-M", color: "Magenta Neon", colorHex: "#ff0055", size: "M", stock: 20 },
      { id: "am03-prt-m", sku: "REF-AM8403-PRT-M", color: "Preto Ônix", colorHex: "#111111", size: "M", stock: 16 },
      { id: "am03-brc-g", sku: "REF-AM8403-BRC-G", color: "Branco Neve", colorHex: "#ffffff", size: "G", stock: 8 },
    ],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 84,
    fabric: "Microfibra de Poliamida de alta respirabilidade",
    description: "Design moderno com tiras cruzadas nas costas, elástico embutido de alta sustentação e bojo removível impermeável.",
  },
  {
    id: "am-04",
    sku: "REF-AM8404",
    name: "Shorts Duplo com Bolso Térmico",
    department: "Feminino",
    type: "Shorts",
    categories: ["feminino", "moda-fitness", "shorts", "promocoes"],
    category: "shorts",
    categoryLabel: "Shorts & Bermudas",
    retailPrice: 89.90,
    wholesalePrice: 44.90,
    minWholesaleQty: 6,
    originalPrice: 99.90,
    discountPercentage: 10,
    images: [
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto com Detalhe Magenta", hex: "#18181b" },
      { name: "Cinza Grafite", hex: "#374151" },
    ],
    stock: 46,
    variations: [
      { id: "am04-prt-p", sku: "REF-AM8404-PRT-P", color: "Preto com Detalhe Magenta", colorHex: "#18181b", size: "P", stock: 10 },
      { id: "am04-prt-m", sku: "REF-AM8404-PRT-M", color: "Preto com Detalhe Magenta", colorHex: "#18181b", size: "M", stock: 18 },
      { id: "am04-prt-g", sku: "REF-AM8404-PRT-G", color: "Preto com Detalhe Magenta", colorHex: "#18181b", size: "G", stock: 12 },
      { id: "am04-prt-gg", sku: "REF-AM8404-PRT-GG", color: "Preto com Detalhe Magenta", colorHex: "#18181b", size: "GG", stock: 6 },
    ],
    isPromo: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 167,
    fabric: "Tactel com elastano externo + compressão interna",
    description: "Shorts duplo 2 em 1 perfeito para corrida e treinos pesados. Bolso interno para celular que não escorrega durante os movimentos.",
  },
  {
    id: "am-05",
    sku: "REF-AM8405",
    name: "Macacão Fit Sculptor Black & Magenta",
    department: "Feminino",
    type: "Macacões",
    categories: ["feminino", "moda-fitness", "lancamentos"],
    category: "macacoes",
    categoryLabel: "Macacões & Bodys",
    retailPrice: 179.90,
    wholesalePrice: 99.90,
    minWholesaleQty: 6,
    originalPrice: 219.90,
    discountPercentage: 18,
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["M", "G"],
    colors: [
      { name: "Preto & Magenta", hex: "#0f0f11" },
      { name: "Azul Marinho", hex: "#1e3a8a" },
    ],
    stock: 31,
    variations: [
      { id: "am05-pm-m", sku: "REF-AM8405-PM-M", color: "Preto & Magenta", colorHex: "#0f0f11", size: "M", stock: 16 },
      { id: "am05-pm-g", sku: "REF-AM8405-PM-G", color: "Preto & Magenta", colorHex: "#0f0f11", size: "G", stock: 15 },
    ],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 92,
    fabric: "Poliamida Emana® que estimula a microcirculação sanguínea",
    description: "Macacão que esculpe o corpo sem apertar. Recortes estratégicos que alongam a silhueta e tecido térmico respirável.",
  },
  {
    id: "am-06",
    sku: "REF-AM8406",
    name: "Conjunto Seamless Canelado Ribbed",
    department: "Feminino",
    type: "Conjuntos",
    categories: ["feminino", "moda-fitness", "conjuntos", "promocoes", "lancamentos"],
    category: "seamless",
    categoryLabel: "Linha Sem Costura",
    retailPrice: 169.90,
    wholesalePrice: 94.90,
    minWholesaleQty: 6,
    originalPrice: 199.90,
    discountPercentage: 15,
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Rosa Magenta Soft", hex: "#e11d48" },
      { name: "Preto", hex: "#18181b" },
      { name: "Nude Bege", hex: "#d4a373" },
    ],
    stock: 52,
    variations: [
      { id: "am06-rms-p", sku: "REF-AM8406-RMS-P", color: "Rosa Magenta Soft", colorHex: "#e11d48", size: "P", stock: 12 },
      { id: "am06-rms-m", sku: "REF-AM8406-RMS-M", color: "Rosa Magenta Soft", colorHex: "#e11d48", size: "M", stock: 22 },
      { id: "am06-prt-g", sku: "REF-AM8406-PRT-G", color: "Preto", colorHex: "#18181b", size: "G", stock: 18 },
    ],
    isNew: true,
    isPromo: true,
    rating: 5.0,
    reviewsCount: 104,
    fabric: "Seamless Tech 3D Canelado Ultra Macio",
    description: "Tecnologia sem costura que se molda como uma segunda pele. Toque acetinado com visual moderno que vai da academia ao dia a dia.",
  },
  {
    id: "am-07",
    sku: "REF-AM8407",
    name: "Bermuda Ciclista Cós Super Alto",
    department: "Feminino",
    type: "Shorts",
    categories: ["feminino", "moda-fitness", "shorts", "promocoes"],
    category: "shorts",
    categoryLabel: "Shorts & Bermudas",
    retailPrice: 79.90,
    wholesalePrice: 39.90,
    minWholesaleQty: 6,
    originalPrice: 99.90,
    discountPercentage: 20,
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto Essencial", hex: "#0f0f11" },
      { name: "Magenta Glow", hex: "#ff0055" },
    ],
    stock: 65,
    variations: [
      { id: "am07-pe-p", sku: "REF-AM8407-PE-P", color: "Preto Essencial", colorHex: "#0f0f11", size: "P", stock: 18 },
      { id: "am07-pe-m", sku: "REF-AM8407-PE-M", color: "Preto Essencial", colorHex: "#0f0f11", size: "M", stock: 24 },
      { id: "am07-mg-g", sku: "REF-AM8407-MG-G", color: "Magenta Glow", colorHex: "#ff0055", size: "G", stock: 14 },
      { id: "am07-mg-gg", sku: "REF-AM8407-MG-GG", color: "Magenta Glow", colorHex: "#ff0055", size: "GG", stock: 9 },
    ],
    isPromo: true,
    isBestSeller: true,
    rating: 4.7,
    reviewsCount: 76,
    fabric: "Poliamida com Elastano de compressão média",
    description: "Comprimento meia coxa que não enrola na perna. Perfeita para agachamentos pesados, treinos funcionais e pedal.",
  },
  {
    id: "am-08",
    sku: "REF-AM8408",
    name: "Camiseta Dry Fit Masculina Performance",
    department: "Masculino",
    type: "Camisetas",
    categories: ["masculino", "camisetas", "moda-fitness"],
    category: "camisetas",
    categoryLabel: "Camisetas",
    retailPrice: 79.90,
    wholesalePrice: 39.90,
    minWholesaleQty: 6,
    originalPrice: 89.90,
    discountPercentage: 11,
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["P", "M", "G", "GG", "XG"],
    colors: [
      { name: "Preto Carbono", hex: "#111111" },
      { name: "Cinza Chumbo", hex: "#374151" },
      { name: "Branco Neve", hex: "#ffffff" },
    ],
    stock: 85,
    variations: [
      { id: "am08-pc-m", sku: "REF-AM8408-PC-M", color: "Preto Carbono", colorHex: "#111111", size: "M", stock: 25 },
      { id: "am08-pc-g", sku: "REF-AM8408-PC-G", color: "Preto Carbono", colorHex: "#111111", size: "G", stock: 30 },
      { id: "am08-pc-gg", sku: "REF-AM8408-PC-GG", color: "Preto Carbono", colorHex: "#111111", size: "GG", stock: 15 },
      { id: "am08-bn-g", sku: "REF-AM8408-BN-G", color: "Branco Neve", colorHex: "#ffffff", size: "G", stock: 15 },
    ],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 68,
    fabric: "Poliamida Dry Fit respirável com microperfurações a laser",
    description: "Camiseta masculina de alto rendimento. Absorve o suor rapidamente e seca em minutos. Modelagem slim com ótimo caimento nos ombros.",
  },
  {
    id: "am-09",
    sku: "REF-AM8409",
    name: "Bermuda Treino Masculina com Forro Compression",
    department: "Masculino",
    type: "Shorts",
    categories: ["masculino", "shorts", "moda-fitness"],
    category: "shorts",
    categoryLabel: "Shorts",
    retailPrice: 99.90,
    wholesalePrice: 49.90,
    minWholesaleQty: 6,
    originalPrice: 119.90,
    discountPercentage: 16,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#111111" },
      { name: "Cinza Militar", hex: "#4b5563" },
    ],
    stock: 48,
    variations: [
      { id: "am09-prt-m", sku: "REF-AM8409-PRT-M", color: "Preto", colorHex: "#111111", size: "M", stock: 18 },
      { id: "am09-prt-g", sku: "REF-AM8409-PRT-G", color: "Preto", colorHex: "#111111", size: "G", stock: 20 },
      { id: "am09-prt-gg", sku: "REF-AM8409-PRT-GG", color: "Preto", colorHex: "#111111", size: "GG", stock: 10 },
    ],
    rating: 4.8,
    reviewsCount: 42,
    fabric: "Tactel com elastano ultra leve + Bermuda interna compressora",
    description: "Bermuda funcional masculina com suporte muscular duplo e bolsos laterais selados.",
  },
  {
    id: "am-10",
    sku: "REF-AM8410",
    name: "Vestido Fitness Tennis Court com Shorts Interno",
    department: "Feminino",
    type: "Vestidos",
    categories: ["feminino", "vestidos", "moda-fitness", "lancamentos"],
    category: "vestidos",
    categoryLabel: "Vestidos",
    retailPrice: 139.90,
    wholesalePrice: 74.90,
    minWholesaleQty: 6,
    originalPrice: 169.90,
    discountPercentage: 17,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Branco Clean", hex: "#ffffff" },
      { name: "Magenta Glow", hex: "#ff0055" },
      { name: "Preto", hex: "#111111" },
    ],
    stock: 36,
    variations: [
      { id: "am10-bc-p", sku: "REF-AM8410-BC-P", color: "Branco Clean", colorHex: "#ffffff", size: "P", stock: 10 },
      { id: "am10-bc-m", sku: "REF-AM8410-BC-M", color: "Branco Clean", colorHex: "#ffffff", size: "M", stock: 14 },
      { id: "am10-mg-m", sku: "REF-AM8410-MG-M", color: "Magenta Glow", colorHex: "#ff0055", size: "M", stock: 12 },
    ],
    isNew: true,
    rating: 5.0,
    reviewsCount: 39,
    fabric: "Poliamida light com elastano e proteção térmica",
    description: "Vestido esportivo estilo beach tennis e academia com shorts interno acoplado e bolso para bolinha/celular.",
  },
  {
    id: "am-11",
    sku: "REF-AM8411",
    name: "Conjunto Infantil Kids Power Fit Menina",
    department: "Infantil",
    type: "Conjuntos",
    categories: ["infantil", "conjuntos", "moda-fitness"],
    category: "conjuntos",
    categoryLabel: "Infantil",
    retailPrice: 89.90,
    wholesalePrice: 45.90,
    minWholesaleQty: 6,
    originalPrice: 109.90,
    discountPercentage: 18,
    images: [
      "https://images.unsplash.com/photo-1503944543280-76d323c319e3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["06", "08", "10", "12", "14"],
    colors: [
      { name: "Rosa Magenta & Preto", hex: "#ff0055" },
      { name: "Lilás Pastel", hex: "#c084fc" },
    ],
    stock: 50,
    variations: [
      { id: "am11-rm-06", sku: "REF-AM8411-RM-06", color: "Rosa Magenta & Preto", colorHex: "#ff0055", size: "06", stock: 10 },
      { id: "am11-rm-08", sku: "REF-AM8411-RM-08", color: "Rosa Magenta & Preto", colorHex: "#ff0055", size: "08", stock: 12 },
      { id: "am11-rm-10", sku: "REF-AM8411-RM-10", color: "Rosa Magenta & Preto", colorHex: "#ff0055", size: "10", stock: 15 },
      { id: "am11-rm-12", sku: "REF-AM8411-RM-12", color: "Rosa Magenta & Preto", colorHex: "#ff0055", size: "12", stock: 8 },
      { id: "am11-rm-14", sku: "REF-AM8411-RM-14", color: "Rosa Magenta & Preto", colorHex: "#ff0055", size: "14", stock: 5 },
    ],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 57,
    fabric: "Poliamida com elastano suave e anti-alérgica",
    description: "Conjunto infantil com top confortável e legging infantil. Liberdade total para ginástica, dança e atividades escolares.",
  },
  {
    id: "am-12",
    sku: "REF-AM8412",
    name: "Camiseta Infantil Kids Dry Fit Esportiva",
    department: "Infantil",
    type: "Camisetas",
    categories: ["infantil", "camisetas", "promocoes"],
    category: "camisetas",
    categoryLabel: "Infantil",
    retailPrice: 59.90,
    wholesalePrice: 29.90,
    minWholesaleQty: 6,
    originalPrice: 79.90,
    discountPercentage: 25,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    ],
    sizes: ["06", "08", "10", "12"],
    colors: [
      { name: "Preto", hex: "#111111" },
      { name: "Branco", hex: "#ffffff" },
      { name: "Magenta", hex: "#ff0055" },
    ],
    stock: 44,
    variations: [
      { id: "am12-prt-08", sku: "REF-AM8412-PRT-08", color: "Preto", colorHex: "#111111", size: "08", stock: 12 },
      { id: "am12-prt-10", sku: "REF-AM8412-PRT-10", color: "Preto", colorHex: "#111111", size: "10", stock: 18 },
      { id: "am12-mag-10", sku: "REF-AM8412-MAG-10", color: "Magenta", colorHex: "#ff0055", size: "10", stock: 14 },
    ],
    isPromo: true,
    rating: 4.8,
    reviewsCount: 31,
    fabric: "Dry Fit infantil leve e respirável",
    description: "Camiseta esportiva para crianças com rápida evaporação do suor e toque extremamente macio.",
  }
];

export const CAMPAIGNS = [
  {
    id: 1,
    tag: "COLEÇÃO 2026",
    title: "POTÊNCIA & ESTILO FIT",
    subtitle: "Moda fitness feminina de alta compressão e conforto inigualável.",
    ctaText: "VER COLEÇÃO",
    ctaLink: "/catalogo",
    badge: "Lançamento Exclusivo",
    bgGradient: "from-zinc-950 via-zinc-900 to-black",
    accentColor: "#ff0055",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    tag: "ATACADO | PREÇO DE FÁBRICA",
    title: "LUCRE 100% COM NOSSOS PRODUTOS",
    subtitle: "Exclusivo para revendedores. Seu negócio começa aqui com pedido mínimo facilitado e envio para todo o Brasil.",
    ctaText: "QUERO REVENDER",
    ctaLink: "#atacado",
    badge: "Exclusivo para Revendedores",
    bgGradient: "from-black via-zinc-950 to-neutral-900",
    accentColor: "#ff0055",
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    tag: "OFERTAS DA SEMANA",
    title: "PROMOÇÃO FLASH FIT",
    subtitle: "Descontos de até 40% nas peças queridinhas das academias. Aproveite enquanto durarem os estoques!",
    ctaText: "VER PROMOÇÕES",
    ctaLink: "/catalogo?categoria=promocoes",
    badge: "Por Tempo Limitado",
    bgGradient: "from-zinc-900 via-neutral-950 to-black",
    accentColor: "#ff0055",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85",
  },
];

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function getProductSlug(product: Product): string {
  return `${slugify(product.name)}-${product.id}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const decoded = decodeURIComponent(slug).toLowerCase();
  return PRODUCTS.find((p) => {
    const fullSlug = getProductSlug(p).toLowerCase();
    const nameSlug = slugify(p.name);
    return (
      p.id.toLowerCase() === decoded ||
      fullSlug === decoded ||
      nameSlug === decoded ||
      decoded.endsWith(p.id.toLowerCase())
    );
  });
}

