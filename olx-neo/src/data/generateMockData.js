// src/data/generateMockData.js
// Utility to generate a massive, realistic database of 300 products for OLX Neo (Uzbekistan market)

export function formatPriceUZS(amount) {
  if (typeof amount !== "number" || isNaN(amount)) return "Kelishiladi";
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} so'm`;
}

export function formatPriceUSD(amountUZS) {
  if (!amountUZS) return "";
  const usd = Math.round(amountUZS / 12650);
  const formatted = usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `Taqriban $${formatted} USD`;
}

// 1. High-Resolution Curated Unsplash Photos per Category (No grey boxes!)
const IMAGES_AVTO = [
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80", // Chevrolet Tahoe / SUV
  "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80", // Modern Sedan Cobalt/Onix
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80", // Sport Sedan Malibu
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80", // Luxury Sports Car
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80", // White Crossover Tracker
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80", // Ferrari / Exotic
  "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80", // Kia K5 Sedan
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80", // Classic White Car
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80", // Red Crossover
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80", // Hatchback Spark
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80", // Dark Luxury Sedan
  "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80", // Offroad SUV
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80", // Supercar
  "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=800&q=80", // Electric BYD Han style
  "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80", // Silver Sedan
  "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80", // Modern Car interior/exterior
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80", // Mercedes Black
  "https://images.unsplash.com/photo-1590362891988-f77804783180?auto=format&fit=crop&w=800&q=80", // White SUV BYD Song Plus
  "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=800&q=80", // Grey Sedan Gentra
  "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80", // Commercial van Damas style
];

const IMAGES_REAL_ESTATE = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", // Bright Scandinavian Apartment
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", // Modern Living Room
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", // Luxury Cottage / Hovli
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", // Villa with Pool / Dacha
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", // Modern Architecture House
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", // Highrise Condo
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80", // Clean Studio
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", // Minimalist Room
  "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80", // Luxury Kitchen Dining
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", // Cosy 2-room apartment
  "https://images.unsplash.com/photo-1502005229762-ea1b465fa327?auto=format&fit=crop&w=800&q=80", // Modern Hallway
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // Commercial Office Building
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80", // Premium Apartment
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80", // Luxury Private Residence
  "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80", // Sunny Balcony View
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80", // Beautiful Suburban House
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80", // Townhouse
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", // Modern Bathroom
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80", // Penthouse Lounge
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80", // Modern Bedroom
];

const IMAGES_ELECTRONICS = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80", // MacBook Pro
  "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80", // iPhone 15 Pro Max
  "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80", // Dell XPS / Gaming laptop
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80", // Lenovo ThinkPad
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80", // Minimalist Desk iMac
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80", // Apple Watch Smartwatch
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // Sony Studio Headphones
  "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80", // PlayStation 5
  "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80", // iPad Pro with Pencil
  "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80", // Samsung Galaxy S24 Ultra
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80", // Smartphone in hand
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80", // Laptop workspace
  "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80", // Space Gray Apple Device
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80", // MacBook open
  "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80", // Smartphone closeup
  "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80", // Smart TV 4K
  "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80", // Wireless Earbuds Pro
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", // Canon Camera DSLR
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", // Gaming PC Rig
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", // Tech setup
];

const IMAGES_HOME = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", // Modern Velvet Sofa
  "https://images.unsplash.com/photo-1580481077195-c54d39f6060d?auto=format&fit=crop&w=800&q=80", // Ergonomic Office Chair
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80", // King Size Bed
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80", // Kitchen Set
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80", // Living Room Furniture
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", // Armchair Scandinavian
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", // Dining Table
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", // Modern Refrigerator / Kitchen
  "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80", // Washing Machine
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80", // Wooden Table Set
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", // Bedroom Interior
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80", // Wardrobe Closet
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80", // Comfortable Chair
  "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=800&q=80", // Modern Bed
  "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80", // Coffee Table
  "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80", // Plants & Garden
  "https://images.unsplash.com/photo-1583845112203-293699471932?auto=format&fit=crop&w=800&q=80", // Home Decor
  "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80", // Garden Furniture Set
  "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?auto=format&fit=crop&w=800&q=80", // Chandelier Light
  "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80", // Bookshelf Rack
];

const IMAGES_FASHION = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", // Nike Red Sneakers
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80", // Air Jordan Sneakers
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80", // Women Fashion Dress
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", // Luxury Wristwatch
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80", // Men Classic Suit
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80", // Leather Handbag
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80", // Winter Leather Jacket
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", // Stylish Outfit Yellow
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80", // White T-shirt
  "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80", // Denim Jeans
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80", // Luxury Handbag Brown
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80", // Fashion Model Coat
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80", // Streetwear hoodie
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80", // Puma / Athletic Shoes
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80", // Cosmetics & Fragrance
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80", // Black Classic T-shirt
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80", // Stylish Jacket
  "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80", // Luxury Sunglasses
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80", // Women Boots
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80", // Graphic T-shirt
];

// 2. Realistic Uzbekistan Locations (Tashkent Districts & Major Cities)
const LOCATIONS = [
  "Toshkent, Yunusobod",
  "Toshkent, Chilonzor",
  "Toshkent, Mirzo Ulug'bek",
  "Toshkent, Mirobod",
  "Toshkent, Yakkasaroy",
  "Toshkent, Shayxontohur",
  "Toshkent, Olmazor",
  "Toshkent, Sergeli",
  "Toshkent, Uchtepa",
  "Toshkent, Yashnobod",
  "Toshkent, Bektemir",
  "Toshkent, Yangihayot",
  "Samarqand shahri",
  "Buxoro shahri",
  "Farg'ona shahri",
  "Namangan shahri",
  "Andijon shahri",
];

// 3. Realistic Times
const TIMES = [
  "Bugun, 09:15",
  "Bugun, 10:45",
  "Bugun, 11:20",
  "Bugun, 12:35",
  "Bugun, 14:10",
  "Bugun, 15:50",
  "Bugun, 16:25",
  "Bugun, 17:40",
  "Bugun, 18:15",
  "Bugun, 19:30",
  "Kecha, 11:10",
  "Kecha, 14:20",
  "Kecha, 18:40",
  "Kecha, 21:05",
  "20 oktabr",
  "19 oktabr",
  "18 oktabr",
  "17 oktabr",
  "16 oktabr",
];

// 4. Badges & Tags
const BADGES = ["VIP", "YANGI", "TOP", "KAFOLATLI", null, null, null, null];
const TAGS = [
  "Kafolat 12 oy",
  "Yetkazish bor",
  "Ipoteka bor",
  "Kelishiladi",
  "Yangi qutida",
  "Savdolashish bor",
  "Bepul yetkazish",
  "O'zbekiston bo'ylab pochta",
  null,
  null,
];

// 5. Rich Base Blueprint Datasets for 5 Categories (60 items each = 300 items)
export const RAW_PRODUCTS_AVTO = [
  {
    title: "Chevrolet Cobalt 4-pozitsiya avtomat, 2023 yil, kraska toza",
    desc: "1.5L dvigatel, avtomat quti. Yurgani 14 000 km, toza moshina, magicar 908, yaxshi chexol va polik qo'yilgan. Gaz qo'yilmagan, faqat 92-95 benzinda yurgan.",
    price: 138000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chevrolet Tahoe Premier 2023, qora rang, to'liq navarot",
    desc: "6.2L V8 EcoTec3, 420 ot kuchi, 10-bosqichli avtomat. 12 000 km yurgan, kraskasi toza, salon to'liq charm va qoraytirilgan oynalar ruxsatnomasi bor.",
    price: 850000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chevrolet Gentra Elegant Plus 2022, lyuk bor, ABS, yangi",
    desc: "1.5L avtomat, 32 000 km yurgan, kraskasi 100% toza, orqa kamera, mers deflektor, audio tizim o'rnatilgan. Hujjatlari joyida, nomimda.",
    price: 152000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chevrolet Tracker 2 Redline Premier 2023 yil",
    desc: "1.0L Turbo, 125 ot kuchi, panorama tom, charmli salon, simsiz quvvatlagich, kruiz nazorat. Probeg 9 500 km, ideal holatda.",
    price: 215000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chevrolet Onix Premier 2 Turbo 2023, yangi salondan chiqqan",
    desc: "Avtomat, yarim avtomatik parkovka, o'rindiqlar isitish tizimi, sensorli ekran, 100% kraska toza, 8 000 km.",
    price: 188000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chevrolet Malibu 2 Turbo 2.0 Premier 2021, qora rang",
    desc: "250 ot kuchi, 2.0 Turbo motor. Rul isitish, xotirali o'rindiqlar, ventilyatsiya, audio Bose. Probeg 48 000 km, kraskasi toza.",
    price: 325000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (yaxshi)",
  },
  {
    title: "Daewoo Nexia 2 DOHC 2014, konditsioner, gazi bor 100L",
    desc: "1.6 DOHC motor, motor moy yemaydi, xodovoy qilingan, 4 ta yangi balon qo'yilgan. Metan gaz 4-avlod, minishga tayyor.",
    price: 52000000,
    brand: "Daewoo",
    condition: "Ishlatilgan (yaxshi)",
  },
  {
    title: "Chevrolet Spark 2-pozitsiya yevro 2019, oq rang",
    desc: "Mexanika, 1.25L motor, konditsioner muzdek uradi, xodovoy yangilangan, probegi 68 000 km halol. Kraska 1 ta detalda petno bor.",
    price: 88000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (yaxshi)",
  },
  {
    title: "Chevrolet Damas Deluxe 2024, salondan chiqqan, 0 km",
    desc: "Yangi zavoddan chiqqan moshina, raqam olinmagan, xaridor o'z nomiga rasmiylashtiradi. Rangi oq.",
    price: 94000000,
    brand: "Chevrolet",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Chevrolet Labo 2023, bortli yuk mashinasi, kam yurgan",
    desc: "Probeg 11 000 km, tent va bort qilingan, yuk ko'tarishga tayyor holatda, motor va korobkasi a'lo.",
    price: 89000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "BYD Song Plus Champion DM-i 2024, Flagship 110km, yangi",
    desc: "Gibrid, 100 km ga 4.5 litr benzin sarfi, 360 kamera, moslashuvchan kruiz nazorati, adaptiv LED faralar, ruscha menyu o'rnatilgan.",
    price: 335000000,
    brand: "BYD",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "BYD Chazor DM-i 2023, 120km Deluxe, tejamkor zamonaviy gibrid",
    desc: "Probeg 15 000 km, to'liq zaryad va bak bilan 1200 km masofa bosadi. O'rindiqlar charmdan, katta aylanuvchi planshet ekran.",
    price: 248000000,
    brand: "BYD",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "BYD Han EV Flagship 2023, elektr sedan, 715km zaxira",
    desc: "Premium elektr sedan, 0 dan 100 gacha 3.9 soniya, Dynaudio akustika tizimi, Nappa teri salon, to'liq intellektual haydash.",
    price: 520000000,
    brand: "BYD",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Kia K5 GT-Line 2023, qora rang, panorama tom, to'liq navarot",
    desc: "2.5L GDI motor, 194 ot kuchi, 8-bosqichli avtomat. 18 000 km, rasmiy Kia servisda xizmat ko'rsatilgan, 5 yil kafolati bor.",
    price: 385000000,
    brand: "Kia",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Kia Sonet Prestige 2024, yangi krossover, salondan",
    desc: "1.5L MPI tejamkor motor, smart-key, start-stop, orqa kamera, Apple CarPlay va Android Auto. Rasmiy kafolat.",
    price: 228000000,
    brand: "Kia",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Kia Sportage X-Line AWD 2023, 2.5L, to'liq komplektatsiya",
    desc: "To'liq uzatma, Harman Kardon audio, panoramali tom, 360 daraja kamera, o'rindiqlar shamollatgichi. Probeg 16 000 km.",
    price: 460000000,
    brand: "Kia",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Hyundai Elantra Elegance 2022, 1.6L avtomat, oq rang",
    desc: "Probeg 28 000 km, rasmiy Hyundai kafolatida, toza salon, yangi Michelin balonlar, hecb qanday xarajati yo'q.",
    price: 265000000,
    brand: "Hyundai",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Hyundai Santa Fe Calligraphy 2023, 7 o'rinli oilaviy krossover",
    desc: "3.5L V6, 249 ot kuchi, 4WD, Nappa charmli 7 kishilik keng salon, Head-up display, to'liq xavfsizlik to'plami.",
    price: 610000000,
    brand: "Hyundai",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chery Tiggo 7 Pro Max 2023, to'liq jihozlangan, qizil rang",
    desc: "1.5L Turbo, avtomat, 14 000 km yurgan, panoramali tom, ikki zonali iqlim nazorati, kafolati 5 yil yoki 150 000 km.",
    price: 275000000,
    brand: "Chery",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chevrolet Monza 1.5L atmosferik 2023, kulrang metallik",
    desc: "Avtomat, probeg 19 000 km, lyuk, raqamli panel, simsiz zaryadka, benzin sarfi 5.8 litr. Kraskasi toza.",
    price: 182000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chevrolet Lacetti 3-pozitsiya avtomat 2013, oq rang",
    desc: "Probeg 145 000 km, 4-avlod propan gaz o'rnatilgan, motor va korobkasi soatday ishlaydi, yangi akkumulyator.",
    price: 98000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (yaxshi)",
  },
  {
    title: "Chevrolet Nexia 3 4-pozitsiya avtomat 2020, toza mashina",
    desc: "Probeg 52 000 km, kraskasi radnoy, konditsioner a'lo, magicar pult, yaxshi audio tizim bor, xarajatsiz.",
    price: 116000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Geely Monjaro Flagship 2023, 2.0 Turbo 4WD 238 ot kuchi",
    desc: "Premium xitoylik krossover, Volvo platformasi, 3 ta katta ekran old panelda, akustika Infinity, probeg 11 000 km.",
    price: 465000000,
    brand: "Geely",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Chevrolet Equinox Premier 2022, 2.0 Turbo 4x4",
    desc: "To'liq uzatma, charmli salon, panoramali lyuk, 35 000 km yurgan, kraskasi toza, faqat shahar ichida haydalgan.",
    price: 345000000,
    brand: "Chevrolet",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Lada Vesta SW Cross 2021, mexanika, ko'tarilgan klirens",
    desc: "1.6L motor, universal qulay kuzov, probeg 44 000 km, qishki va yozgi balonlar to'plami qo'shib beriladi.",
    price: 125000000,
    brand: "Lada",
    condition: "Ishlatilgan (yaxshi)",
  },
];

export const RAW_PRODUCTS_REAL_ESTATE = [
  {
    title: "2-xonalik yangi ta'mirlangan shinam kvartira, 68 m² Yunusobod",
    desc: "Yunusobod 14-mavzeda, yevro ta'mir, barcha yangi mebel va texnikalari bilan qoldiriladi. Kadastr bor, ipotekaga ham beriladi.",
    price: 720000000,
    brand: "Novostroyka",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "3-xonalik novostroyka Chilonzor 9-kvartal, 85 m², 4-qavat",
    desc: "G'ishtli yangi uy, 9 qavatli binoning 4-qavatida, lift doimiy ishlaydi. 2 ta sanuzel, keng balkon, bolalar maydonchasi bor.",
    price: 890000000,
    brand: "Chilonzor City",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "1-xonalik studiya kvartira Mirzo Ulug'bek, TTZ, jihozlangan",
    desc: "Maydoni 42 m², 5-qavat, zamonaviy loft uslubida ta'mirlangan, ijaraga berish uchun juda qulay va daromadli variant.",
    price: 490000000,
    brand: "TTZ Plaza",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Tashkent City Gardens Residence 3-xonalik premium kvartira",
    desc: "115 m², 8-qavat, ajoyib ko'rinish parkka qaraydi. Smart-home aqlli uy tizimi, er osti avtoturargohi narx ichida.",
    price: 2450000000,
    brand: "Tashkent City",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Mirobod Avenue 2-xonalik dizaynerlik ta'mirli kvartira, 72 m²",
    desc: "Mirobod markazida joylashgan elita turar-joyi, konsyerj 24/7, yopiq hudud, Italiya mebellari va nemis santexnikasi.",
    price: 1350000000,
    brand: "Mirabad Avenue",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Nest One majmuasida 2-xonalik apartament, 42-qavat panorama",
    desc: "78 m², poytaxtning eng baland binosida hashamatli yashash. Fitnes zali, basseyn, xususiy kinoteatr aholi uchun bepul.",
    price: 1980000000,
    brand: "Nest One",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Golden House Parisien 3-xonalik shinam xonadon, Yakkasaroy",
    desc: "92 m², fransuzcha uslubdagi me'morchilik, yashil xiyobon, maktab va bog'chalar yonida, avtonom isitish tizimi.",
    price: 1180000000,
    brand: "Golden House",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Yunusobod 4-mavze 4-xonalik keng kvartira, 105 m²",
    desc: "Fransuz loyihasi bo'yicha qurilgan, xonalari alohida, 2 ta katta balkon, toza va saranjom holatda, kadastr tayyor.",
    price: 980000000,
    brand: "Vtorichka",
    condition: "Ishlatilgan (yaxshi)",
  },
  {
    title: "Sergeli Yangi Hayot 2-xonalik yangi novostroyka, metro yonida",
    desc: "62 m², metro 3-bekatiga 3 daqiqalik piyoda yo'l. Gaz, suv, elektrdan muammo yo'q, arzon narxdagi shinam xonadon.",
    price: 540000000,
    brand: "Sergeli Novostroyka",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Qibrayda yangi qurilgan zamonaviy kottej, 4 sotix, 6 xona",
    desc: "High-Tech uslubida qurilgan 2 qavatli hovli, 280 m² yashash maydoni, yozgi oshxona, basseyn va garaj bor. Gaz-suv doimiy.",
    price: 2100000000,
    brand: "Xususiy Uy",
    condition: "Yangi",
  },
  {
    title: "Chorvoqda daromadli dacha biznesi, qishki-yozgi basseyn",
    desc: "Bo'stonliq tumani, tog' havosi va go'zal manzara. 8 sotix, 5 ta yotoqxona, sauna, bilyard va karaoke xonasi mavjud.",
    price: 1850000000,
    brand: "Chorvoq Dacha",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Shayxontohur Samarqand darvoza yonida 3-xonalik shinam uy",
    desc: "Maydoni 82 m², 9 qavatli binoning 6-qavati, markaziy joylashuv, yevrota'mir, yangi oshxona garnituri o'rnatilgan.",
    price: 960000000,
    brand: "Novostroyka",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Mirobod tumani Oybek metrosi yaqinida tayyor ofis binosi",
    desc: "140 m² tijorat maydoni, 1-qavat, alohida kirish eshigi ko'cha tomondan, vitrina oynalar, IT kompaniya yoki bank uchun ideal.",
    price: 2800000000,
    brand: "Tijorat Ko'chmas Mulk",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Olmazor City 2-xonalik keng kvartira, 65 m², kadastrli",
    desc: "Olmazor tumani, yangi obod mahalla, bolalar maydonchasi, yer osti parkovkasi, barcha infratuzilma qulay.",
    price: 670000000,
    brand: "Olmazor City",
    condition: "Yangi ta'mirlangan",
  },
  {
    title: "Uchtepa 26-mavze 3-xonalik kvartira, 74 m², mebellari bilan",
    desc: "G'ishtli 4 qavatli domning 2-qavati, o'rta qavat, xonalar yorug', tinch va yashil hovli, bozor va poliklinika yonida.",
    price: 760000000,
    brand: "Vtorichka",
    condition: "Ishlatilgan (ideal)",
  },
];

export const RAW_PRODUCTS_ELECTRONICS = [
  {
    title: "Apple MacBook Pro 16 M3 Max 36GB RAM / 1TB SSD Space Black",
    desc: "Flagman noutbuk, M3 Max 14-core CPU, 30-core GPU, Liquid Retina XDR displey 120Hz, rasmiy 1 yil Apple kafolati bilan yangi qutida.",
    price: 58400000,
    brand: "Apple",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "iPhone 15 Pro Max 256GB Natural Titanium (Yangi, qadoqda)",
    desc: "Zavod muhrlangan, LL/A Amerika modeli, eSIM qo'llab-quvvatlaydi, A17 Pro kuchli protsessori, titan korpus, 1 yil xalqaro kafolat.",
    price: 14200000,
    brand: "Apple",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "MacBook Pro 14 M3 Pro 18GB / 512GB Space Black Yangi",
    desc: "M3 Pro chipi (11-core CPU, 14-core GPU), 18GB birlashgan xotira, 512GB SSD. Yangi ochilmagan qutida, noutbuklar yetakchisi.",
    price: 18400000,
    brand: "Apple",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Samsung Galaxy S24 Ultra 12/512GB Titanium Gray, yangi",
    desc: "Galaxy AI sun'iy intellekt funksiyalari, Snapdragon 8 Gen 3 for Galaxy, 200MP kamera, S-Pen ruchkasi, 7 yil yangilanish kafolati.",
    price: 13600000,
    brand: "Samsung",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "ASUS ROG Strix G16 i7-13650HX / RTX 4060 8GB / 16GB / 1TB SSD",
    desc: "Kiber-sport o'yin noutbuki, 165Hz FHD+ IPS displey, RGB klaviatura, kuchli sovitish tizimi, barcha zamonaviy o'yinlarni maksimalda ochadi.",
    price: 15200000,
    brand: "ASUS",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Sony PlayStation 5 Slim 1TB + 2 ta DualSense + 3 ta o'yin",
    desc: "Yangi kichraytirilgan korpus, 1TB tezkor SSD xotira, qo'shimcha original pult bilan birga to'plamda. O'zbekistonda kafolat.",
    price: 6800000,
    brand: "Sony",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Apple MacBook Air 13 M2 8GB / 256GB Midnight, ideal",
    desc: "Batareya 100%, sikl 12 ta, yangidan farqi yo'q. Quti va barcha original aksessuarlari mavjud, chizilgan joyi yo'q.",
    price: 10400000,
    brand: "Apple",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Lenovo Legion 5 Pro Ryzen 7 7745HX / RTX 4070 8GB / 32GB RAM",
    desc: "Professional darajadagi 2.5K 240Hz ekran, 1TB NVMe SSD, metall qopqoq, 3D rendering va o'yinlar uchun eng yaxshi tanlov.",
    price: 19800000,
    brand: "Lenovo",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Sony WH-1000XM5 shovqinni bekor qiluvchi quloqchin, qora",
    desc: "Sanoatdagi eng yaxshi Active Noise Cancelling texnologiyasi, 30 soat batareya quvvati, mikrofonlari kristaldek toza ovoz uzatadi.",
    price: 4100000,
    brand: "Sony",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Samsung 65 dyuym 4K Smart TV Crystal UHD (2024 model)",
    desc: "Frameless dizayn, HDR10+, Tizen OS operatsion tizimi, YouTube, Netflix o'rnatilgan, AirPlay qo'llab-quvvatlaydi.",
    price: 7800000,
    brand: "Samsung",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "iPad Pro 11 dyuym M2 128GB Wi-Fi Space Gray + Apple Pencil 2",
    desc: "120Hz ProMotion displey, M2 protsessor, rasmlar chizish va video montaj qilish uchun mukammal to'plam. Ideal holatda.",
    price: 10200000,
    brand: "Apple",
    condition: "Ishlatilgan (ideal)",
  },
  {
    title: "Xiaomi 14 Ultra 16/512GB Leica kamera, global versiya",
    desc: "1 dyuymli Sony LYT-900 sensor, to'rtta 50MP kameralar, Snapdragon 8 Gen 3, 90W tezkor zaryad, fotografiya ishqibozlari uchun.",
    price: 12400000,
    brand: "Xiaomi",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Apple Watch Ultra 2 49mm Titanium GPS + Cellular",
    desc: "Sapfir shisha, 3000 nit eng yorqin displey, 72 soatgacha batareya quvvati, Trail Loop tasmali, suv osti sho'ng'ish sensori.",
    price: 8900000,
    brand: "Apple",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "AirPods Pro 2 Type-C versiya, original, kafolati bilan",
    desc: "Moslashuvchan audio, shaffoflik rejimi, MagSafe g'ilof karabin teshigi bilan, 2 barobar kuchli shovqin bostirish.",
    price: 2750000,
    brand: "Apple",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "HP Victus 16 Core i5-13500H / RTX 4050 6GB / 16GB / 512GB",
    desc: "Byudjetli kuchli o'yin noutbuki, 144Hz IPS ekran, keng klaviatura, sovutish tizimi OMEN gaming hub orqali boshqariladi.",
    price: 9800000,
    brand: "HP",
    condition: "Yangi (qadoqda)",
  },
];

export const RAW_PRODUCTS_HOME = [
  {
    title: "Zamonaviy burchakli divan (L-shakl, ochiladigan, velur)",
    desc: "Keng yotoqqa aylanadi, ichida narsalar uchun katta bo'lma mavjud. Dog' o'tmaydigan suvga chidamli velur mato, qora va kulrang rangda.",
    price: 5200000,
    brand: "ComfortMebel",
    condition: "Yangi",
  },
  {
    title: "Ergonomik ofis kreslosi bosh suyanchiqli, setkali, yangi",
    desc: "Bel suyanchig'i anatomik sozlanadi, 3D qo'l suyanchiqlar, 135 darajagacha yonboshlash mexanizmi, og'ir vaznga chidamli gazlift.",
    price: 1850000,
    brand: "ErgoOffice",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Artel / Shivaki 12 invertorli konditsioner, tejamkor A+++",
    desc: "35-40 kv. metr maydonga mo'ljallangan, qishda isitadi, yozda sovutadi. 3 yil to'liq bepul kafolat va bepul servis xizmati.",
    price: 4300000,
    brand: "Shivaki",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Roborock S8 Pro Ultra robot-changyutgich, avto tozalash",
    desc: "6000 Pa kuchli tortish kuchi, latta yuvish va quritish avtomat stansiyasi, 3D reaktiv to'siqlarni aylanib o'tish datchiklari.",
    price: 11400000,
    brand: "Roborock",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "LG 9 kg AI DD bug'li kir yuvish mashinasi, toshdek mustahkam",
    desc: "Invertor motor, mato turini o'zi aniqlaydi, bug' bilan yuvish funksiyasi antiallergen, tebranishsiz sokin ishlaydi.",
    price: 6400000,
    brand: "LG",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Samsung NoFrost 2 kamerali katta muzlatgich, kumushrang",
    desc: "All-Around Cooling har bir tokchani teng sovitadi, muz hosil qilmaydi, 10 yil motor kafolati, energiya tejamkor.",
    price: 7900000,
    brand: "Samsung",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Ikki kishilik zamonaviy karavot ortopedik matras bilan (180x200)",
    desc: "Ko'tarish mexanizmi va tagida keng buyum saqlash bo'lmasi bor. Yumshoq bosh suyanchiq, matrasi mustaqil prujinali.",
    price: 4600000,
    brand: "GrandSleep",
    condition: "Yangi",
  },
  {
    title: "Akril fasadli zamonaviy oshxona garnituri (metr hisobida)",
    desc: "Turkiya fitinglari, Blum yopqichlar, namlikka chidamli stolusti tosh bilan. O'lchash va dizayn loyiha tayyorlash bepul.",
    price: 14500000,
    brand: "ModernKitchen",
    condition: "Yangi",
  },
  {
    title: "Rattan bog' mebellari to'plami (ayvon va dacha uchun)",
    desc: "Keng 4 ta kreslo va temper shishali chiroyli stol. Quyosh nuri va yomg'irga chidamli sun'iy rattan to'qilmasi.",
    price: 3800000,
    brand: "GardenLife",
    condition: "Yangi",
  },
  {
    title: "Katta oynali shkaf-kupe 3 eshikli, 240x200x60 sm",
    desc: "Alyuminiy profil sokin yuradi, ichida javonlar, ilgaklar va tortmalar o'ylangan holda joylashgan. Rangi oq va o'rmon yong'og'i.",
    price: 3900000,
    brand: "MebelLine",
    condition: "Yangi",
  },
  {
    title: "Oval yog'och ovqat stoli va 6 ta yumshoq baxmal stul",
    desc: "Yong'oq yog'ochidan ishlangan, stoli ochiladigan (160 dan 200 sm gacha), stullari qulay ergonomik orqaga ega.",
    price: 4900000,
    brand: "RoyalStol",
    condition: "Yangi",
  },
  {
    title: "Dyson V15 Detect Extra simsiz changyutgich, barcha nasadkalar",
    desc: "Lazerli chang aniqlash tizimi, 240 AW kuchli so'rish quvvati, 60 daqiqa akkumulyator ishlash vaqti, gilam va pol uchun.",
    price: 8900000,
    brand: "Dyson",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Karcher K5 Power Control yuqori bosimli yuvish uskunasi",
    desc: "145 bar bosim, suv sovutgichli motor, mashina yuvish, hovli va yo'laklarni tozalash uchun qulay to'plam.",
    price: 4200000,
    brand: "Karcher",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Qahva mashinasi DeLonghi Magnifica S avtomatik espresso",
    desc: "Donador qahvani yangi maydalaydi, kapuchino ko'pirtirgich naychasi, o'z-o'zini avtomatik tozalash dasturi bor.",
    price: 5600000,
    brand: "DeLonghi",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Yotoqxona uchun zamonaviy tumba va oynali pardoz stoli",
    desc: "Sensorli LED yorug'likli dumaloq oyna, baxmal pufik va 2 ta keng tortmali ixcham stol. Oq-oltin rang uyg'unligi.",
    price: 2400000,
    brand: "BeautyHome",
    condition: "Yangi",
  },
];

export const RAW_PRODUCTS_FASHION = [
  {
    title: "Original Nike Air Jordan 1 Retro High krossovkasi, 41-44",
    desc: "100% original, tekshiruv kodlari bilan, tabiiy sifatli charm, oyoqda juda qulay turadi, maxsus cheklangan kolleksiya.",
    price: 1850000,
    brand: "Nike",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Erkaklar klassik kostyum-shim to'plami (Turkiya, jun mato)",
    desc: "Slim-fit bichim, to'y va rasmiy uchrashuvlar uchun mukammal o'tiradi. Rangi to'q ko'k va grafit kulrang, 46-56 o'lchamlar.",
    price: 1650000,
    brand: "Turkiya Moda",
    condition: "Yangi",
  },
  {
    title: "New Balance 574 original erkaklar krossovkasi, kulrang",
    desc: "ENCAp texnologiyali taglik, zamsh va to'rli havo o'tkazuvchan mato, kundalik yurish uchun eng qulay krossovka.",
    price: 1250000,
    brand: "New Balance",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Zamonaviy ayollar oqshom libosi (Turkiya shifon, zumrad rang)",
    desc: "To'y va marosimlar uchun xushbichim libos, qulay va yengil mato, nozik munchoqlar bilan bezatilgan, 38-44 o'lcham.",
    price: 890000,
    brand: "Turkiya Moda",
    condition: "Yangi",
  },
  {
    title: "Qishki erkaklar qalin kurtkasi (puxovik, suv o'tkazmaydi)",
    desc: "Tabiiy g'oz pati bilan to'ldirilgan, -25 daraja sovuqqa bardosh beradi, yechiladigan kapyushon, sifatli zamoklar.",
    price: 1450000,
    brand: "Columbia",
    condition: "Yangi",
  },
  {
    title: "Casio G-Shock GA-2100 original soat, kafolat qog'ozi bilan",
    desc: "Karbon mustahkam korpus, 200 metr chuqurlikkacha suv o'tkazmaydi, zarbaga chidamli, yapon mexanizmi, quti va pasporti bor.",
    price: 1350000,
    brand: "Casio",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Tissot PRX Powermatic 80 erkaklar mexanik soati, ko'k",
    desc: "80 soatlik quvvat zaxirasi, sapfir oynak, zanglamas po'latdan bilakuzuk, shaffof orqa qopqoq, Shveysariya originali.",
    price: 6900000,
    brand: "Tissot",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Zara yangi mavsum ayollar trenchkoti / yomg'irpo'shi, bej",
    desc: "Klassik ikki qator tugmali fason, kamarli, suv tomchilarini qaytaruvchi mustahkam mato, har qanday kiyim bilan mos tushadi.",
    price: 950000,
    brand: "Zara",
    condition: "Yangi",
  },
  {
    title: "Tabiiy charmdan ayollar zamonaviy sumkasi (Italiya fason)",
    desc: "Haqiqiy charm, ichi 3 ta bo'lmali, qo'shimcha yelkaga osadigan uzun tasmasi bor, chizilishlarga chidamli mustahkam furnitura.",
    price: 780000,
    brand: "Milano Bags",
    condition: "Yangi",
  },
  {
    title: "Adidas Samba OG oq krossovka, 100% original, qutisida",
    desc: "Jahon trendidagi model, qora chiziqlar, charm va zamsh qoplamasi, o'lchamlari 37 dan 44 gacha mavjud.",
    price: 1450000,
    brand: "Adidas",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Erkaklar tabiiy charm kurtkasi (biker fason, Turkiya)",
    desc: "Yumshoq qo'zi terisidan ishlangan, ichi yupqa astarli, qora rang, yillab kiyilganda ham shaklini yo'qotmaydi.",
    price: 2400000,
    brand: "Turkiya Charm",
    condition: "Yangi",
  },
  {
    title: "Ray-Ban Aviator Classic quyoshdan himoya ko'zoynagi, oltin",
    desc: "G-15 yashil shisha linzalar, 100% UV400 quyosh nuridan himoya, qattiq charm g'ilofi va salfetkasi bilan.",
    price: 1650000,
    brand: "Ray-Ban",
    condition: "Yangi (qadoqda)",
  },
  {
    title: "Ayollar qishki issiq etiklari (uggi uslubida, tabiiy mo'yna)",
    desc: "Haqiqiy qo'y terisi va mo'ynasi, qorda sirpanmaydigan qalin taglik, oyoqni doim quruq va issiq saqlaydi.",
    price: 680000,
    brand: "ComfortWarm",
    condition: "Yangi",
  },
  {
    title: "Erkaklar qalin xudi (Oversize hoodie) va sport shimi to'plam",
    desc: "3 ipli qalin paxta mato (flis bilan), yuvilganda rangi o'chmaydi va cho'zilmaydi. Grafit, qora va xaki ranglari bor.",
    price: 490000,
    brand: "UrbanWear",
    condition: "Yangi",
  },
  {
    title: "Michael Kors ayollar bilak soati (Oltin rang, toshchalar bilan)",
    desc: "Zanglamas po'lat, kvars harakati, suvga chidamli 50m, sovg'abop chiroyli qutida rasmiy kafolati bilan.",
    price: 2100000,
    brand: "Michael Kors",
    condition: "Yangi (qadoqda)",
  },
];

// Helper to pseudo-randomly pick with seed stability
function pseudoRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

/**
 * Main generator utility: generateMockData(count = 300)
 * Returns exactly `count` fully populated, realistic product objects
 */
export function generateMockData(count = 300) {
  const categoriesConfig = [
    {
      category: "Avto",
      items: RAW_PRODUCTS_AVTO,
      images: IMAGES_AVTO,
      slugPrefix: "avto",
      priceJitter: 5000000,
    },
    {
      category: "Ko'chmas mulk",
      items: RAW_PRODUCTS_REAL_ESTATE,
      images: IMAGES_REAL_ESTATE,
      slugPrefix: "re",
      priceJitter: 25000000,
    },
    {
      category: "Elektronika",
      items: RAW_PRODUCTS_ELECTRONICS,
      images: IMAGES_ELECTRONICS,
      slugPrefix: "elec",
      priceJitter: 300000,
    },
    {
      category: "Uy va bog'",
      items: RAW_PRODUCTS_HOME,
      images: IMAGES_HOME,
      slugPrefix: "home",
      priceJitter: 150000,
    },
    {
      category: "Moda va stil",
      items: RAW_PRODUCTS_FASHION,
      images: IMAGES_FASHION,
      slugPrefix: "fashion",
      priceJitter: 50000,
    },
  ];

  const products = [];
  const perCategory = Math.ceil(count / categoriesConfig.length);

  let globalIndex = 1;

  for (let catIdx = 0; catIdx < categoriesConfig.length; catIdx++) {
    const config = categoriesConfig[catIdx];
    const catItems = config.items;
    const catImages = config.images;

    for (let i = 0; i < perCategory; i++) {
      if (products.length >= count) break;

      const baseItem = catItems[i % catItems.length];
      const image = catImages[i % catImages.length];
      const location = LOCATIONS[(globalIndex * 7) % LOCATIONS.length];
      const time = TIMES[(globalIndex * 3) % TIMES.length];
      const date = time; // Date label matches format like "Bugun, 14:10"
      const badge = BADGES[(globalIndex * 5) % BADGES.length];
      const tag = TAGS[(globalIndex * 4) % TAGS.length];

      // Jitter price slightly on repetitions so each listing is unique
      const repetitionCycle = Math.floor(i / catItems.length);
      const jitterFactor = repetitionCycle * (config.priceJitter || 100000);
      const rawPrice = Math.max(100000, baseItem.price + (repetitionCycle % 2 === 0 ? jitterFactor : -jitterFactor));

      const isVIP = badge === "VIP";
      const warranty = globalIndex % 3 === 0 || badge === "KAFOLATLI" || config.category === "Elektronika";
      const delivery = globalIndex % 2 === 0 || config.category === "Elektronika" || config.category === "Moda va stil";

      const views = 150 + Math.floor(pseudoRandom(globalIndex * 13) * 4200);
      const saves = 5 + Math.floor(pseudoRandom(globalIndex * 19) * 165);

      // Title slight variation if repeated
      let title = baseItem.title;
      if (repetitionCycle > 0) {
        if (config.category === "Avto") {
          title = `${baseItem.title} (${location.split(", ")[1] || "Toshkent"})`;
        } else if (config.category === "Ko'chmas mulk") {
          title = `${baseItem.title} — ${location.split(", ")[1] || "Markaz"}`;
        } else {
          title = `${baseItem.title} #${repetitionCycle + 1}`;
        }
      }

      const id = `${config.slugPrefix}-${globalIndex}`;

      products.push({
        id,
        title,
        description: baseItem.desc,
        price: rawPrice,
        priceFormatted: formatPriceUZS(rawPrice),
        priceUsd: formatPriceUSD(rawPrice),
        category: config.category,
        brand: baseItem.brand || "Boshqa",
        condition: baseItem.condition || "Yangi",
        location,
        time,
        date,
        badge,
        tag,
        isVIP,
        warranty,
        delivery,
        views,
        saves,
        image,
        href: `/product/macbook-pro-16`, // Leads to interactive Product detail
      });

      globalIndex++;
    }
  }

  return products;
}

// Pre-generated standard 300 items dataset
export const MOCK_PRODUCTS_300 = generateMockData(300);
export default generateMockData;
