const fs = require("fs");
const path = require("path");

const products = [
  // ================= 1. AVTO (13 ta) =================
  {
    id: "1",
    title: "Chevrolet Cobalt 4-pozitsiya Style AT 2024",
    category: "Avto",
    price: 178000000,
    currency: "so'm",
    location: "Toshkent, Sergeli mashina bozori",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 18:40"
  },
  {
    id: "2",
    title: "Chevrolet Gentra 3-pozitsiya Elegant Plus 2023",
    category: "Avto",
    price: 195000000,
    currency: "so'm",
    location: "Samarqand shahar, Registon",
    image: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 12:40"
  },
  {
    id: "3",
    title: "BYD Song Plus Champion Flagship Plus 2024",
    category: "Avto",
    price: 365000000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1590362891988-f77804783180?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 15:50"
  },
  {
    id: "4",
    title: "Chevrolet Tracker 2 Premier Redline 2023",
    category: "Avto",
    price: 245000000,
    currency: "so'm",
    location: "Toshkent, Yunusobod",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 13:10"
  },
  {
    id: "5",
    title: "Chevrolet Onix Premier 2 Turbo AT 2023",
    category: "Avto",
    price: 205000000,
    currency: "so'm",
    location: "Farg'ona shahar markazi",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Kecha 20:15"
  },
  {
    id: "6",
    title: "Chevrolet Malibu 2 Premier 2.0 Turbo 2022",
    category: "Avto",
    price: 335000000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 11:05"
  },
  {
    id: "7",
    title: "Kia K5 GT-Line 2.5 GDI 2023 yangi holatda",
    category: "Avto",
    price: 420000000,
    currency: "so'm",
    location: "Toshkent, Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 09:30"
  },
  {
    id: "8",
    title: "Hyundai Elantra 1.6 Elegance 2023",
    category: "Avto",
    price: 295000000,
    currency: "so'm",
    location: "Namangan shahar",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 14:50"
  },
  {
    id: "9",
    title: "Chevrolet Tahoe High Country 2023 Qora",
    category: "Avto",
    price: 980000000,
    currency: "so'm",
    location: "Toshkent, Yakkasaroy",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 16:20"
  },
  {
    id: "10",
    title: "Geely Monjaro 2.0T 4WD Flagship 2024",
    category: "Avto",
    price: 460000000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 14:15"
  },
  {
    id: "11",
    title: "Chevrolet Spark 4-pozitsiya Avtomat 2020",
    category: "Avto",
    price: 118000000,
    currency: "so'm",
    location: "Andijon shahar",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 16:30"
  },
  {
    id: "12",
    title: "Mercedes-Benz E 220d AMG Line 2022",
    category: "Avto",
    price: 780000000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 17:05"
  },
  {
    id: "13",
    title: "BMW 530i M Sport Package 2023",
    category: "Avto",
    price: 850000000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 19:40"
  },

  // ================= 2. KO'CHMAS MULK (13 ta) =================
  {
    id: "14",
    title: "2-xonali shinam kvartira, Chilonzor 9-kvartal",
    category: "Ko'chmas mulk",
    price: 720000000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 10:15"
  },
  {
    id: "15",
    title: "3-xonali novostroyka, Yunusobod 14-mavze",
    category: "Ko'chmas mulk",
    price: 950000000,
    currency: "so'm",
    location: "Toshkent, Yunusobod",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 11:30"
  },
  {
    id: "16",
    title: "Premium kvartira, Tashkent City Gardens Residence",
    category: "Ko'chmas mulk",
    price: 2400000000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 12:45"
  },
  {
    id: "17",
    title: "6 sotixli shinam hovli uy, Qorasuv",
    category: "Ko'chmas mulk",
    price: 1850000000,
    currency: "so'm",
    location: "Toshkent, Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 17:20"
  },
  {
    id: "18",
    title: "Dacha basseynli, Bo'stonliq Chorvoq yonida",
    category: "Ko'chmas mulk",
    price: 1200000000,
    currency: "so'm",
    location: "Toshkent viloyati, Bo'stonliq",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Bugun 09:10"
  },
  {
    id: "19",
    title: "1-xonali zamonaviy studiya kvartira, Mirobod",
    category: "Ko'chmas mulk",
    price: 580000000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 15:35"
  },
  {
    id: "20",
    title: "Tayyor biznes ofis binosi 120 kv.m, Yakkasaroy",
    category: "Ko'chmas mulk",
    price: 1900000000,
    currency: "so'm",
    location: "Toshkent, Yakkasaroy",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 13:40"
  },
  {
    id: "21",
    title: "4-xonali keng xonadon novostroyka, Sergeli",
    category: "Ko'chmas mulk",
    price: 1100000000,
    currency: "so'm",
    location: "Toshkent, Sergeli",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 14:50"
  },
  {
    id: "22",
    title: "3-xonali kvartira Samarqand markazida",
    category: "Ko'chmas mulk",
    price: 780000000,
    currency: "so'm",
    location: "Samarqand shahar markazi",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 18:10"
  },
  {
    id: "23",
    title: "Zamonaviy hi-tech kottej, Qibray",
    category: "Ko'chmas mulk",
    price: 2100000000,
    currency: "so'm",
    location: "Toshkent viloyati, Qibray",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 16:00"
  },
  {
    id: "24",
    title: "Shinam xona mebellari bilan talabalar uchun",
    category: "Ko'chmas mulk",
    price: 2500000,
    currency: "so'm",
    location: "Toshkent, Olmazor",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 08:45"
  },
  {
    id: "25",
    title: "2 qavatli pishiq g'ishtli hovli, Nazarbek",
    category: "Ko'chmas mulk",
    price: 1450000000,
    currency: "so'm",
    location: "Toshkent, Uchtepa",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 11:25"
  },
  {
    id: "26",
    title: "Penthouse shahar panoramasi bilan, Oloy bozori",
    category: "Ko'chmas mulk",
    price: 3100000000,
    currency: "so'm",
    location: "Toshkent, Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 17:35"
  },

  // ================= 3. ELEKTRONIKA (13 ta) =================
  {
    id: "27",
    title: "iPhone 15 Pro Max 256GB Natural Titanium",
    category: "Elektronika",
    price: 15400000,
    currency: "so'm",
    location: "Toshkent, Malika bozor A-12",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 11:15"
  },
  {
    id: "28",
    title: "Apple MacBook Pro 16 M3 Max 36GB / 1TB SSD",
    category: "Elektronika",
    price: 52000000,
    currency: "so'm",
    location: "Toshkent, Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 13:20"
  },
  {
    id: "29",
    title: "Samsung Galaxy S24 Ultra 12/512GB Titanium Gray",
    category: "Elektronika",
    price: 14800000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Bugun 10:40"
  },
  {
    id: "30",
    title: "Sony PlayStation 5 Slim 1TB + 2 ta DualSense",
    category: "Elektronika",
    price: 7200000,
    currency: "so'm",
    location: "Toshkent, Yunusobod",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 19:15"
  },
  {
    id: "31",
    title: "Apple Watch Ultra 2 49mm Titanium Ocean Band",
    category: "Elektronika",
    price: 9800000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 12:05"
  },
  {
    id: "32",
    title: "Sony WH-1000XM5 shovqinni so'ndiruvchi quloqchin",
    category: "Elektronika",
    price: 4300000,
    currency: "so'm",
    location: "Samarqand shahar",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 16:45"
  },
  {
    id: "33",
    title: "iPad Pro 11 M2 128GB Wi-Fi Space Gray",
    category: "Elektronika",
    price: 10500000,
    currency: "so'm",
    location: "Toshkent, Yakkasaroy",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 14:30"
  },
  {
    id: "34",
    title: "ASUS ROG Strix G16 i7-13650HX / RTX 4060 / 16GB",
    category: "Elektronika",
    price: 17200000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 15:40"
  },
  {
    id: "35",
    title: "AirPods Pro 2 (USB-C MagSafe Case) Original",
    category: "Elektronika",
    price: 2850000,
    currency: "so'm",
    location: "Toshkent, Sergeli",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Kecha 14:10"
  },
  {
    id: "36",
    title: "Samsung 65 dyuym 4K QLED Smart TV 2023",
    category: "Elektronika",
    price: 11200000,
    currency: "so'm",
    location: "Namangan shahar",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 09:50"
  },
  {
    id: "37",
    title: "Canon EOS R6 Mark II Body Professional Kamera",
    category: "Elektronika",
    price: 28900000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 16:55"
  },
  {
    id: "38",
    title: "Lenovo ThinkPad X1 Carbon Gen 11 i7 / 32GB / 1TB",
    category: "Elektronika",
    price: 19500000,
    currency: "so'm",
    location: "Toshkent, Olmazor",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 18:30"
  },
  {
    id: "39",
    title: "Gaming PC Rig i9-14900K / RTX 4080 Super / 64GB",
    category: "Elektronika",
    price: 36000000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 17:10"
  },

  // ================= 4. ISH O'RINLARI (12 ta) =================
  {
    id: "40",
    title: "Senior React / Next.js Frontend Dasturchi",
    category: "Ish o'rinlari",
    price: 22000000,
    currency: "so'm",
    location: "Toshkent, IT Park Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 09:20"
  },
  {
    id: "41",
    title: "Bosh buxgalter (1C 8.3 dasturida tajribali)",
    category: "Ish o'rinlari",
    price: 12000000,
    currency: "so'm",
    location: "Toshkent, Yakkasaroy",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 10:50"
  },
  {
    id: "42",
    title: "SMM-menejer va Mobilograf (Kreativ agentlik)",
    category: "Ish o'rinlari",
    price: 8500000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Bugun 11:45"
  },
  {
    id: "43",
    title: "B2B Sotuv bo'yicha menejer (Oylik + Bonuslar)",
    category: "Ish o'rinlari",
    price: 15000000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 17:15"
  },
  {
    id: "44",
    title: "UI/UX Dizayner (Figma, Web & Mobile)",
    category: "Ish o'rinlari",
    price: 14000000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 14:05"
  },
  {
    id: "45",
    title: "Kuryer kerak shaxsiy avtomobil bilan (Yandex Eats)",
    category: "Ish o'rinlari",
    price: 9000000,
    currency: "so'm",
    location: "Toshkent shahar bo'ylab",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 15:30"
  },
  {
    id: "46",
    title: "Tajribali Barista yangi ochilayotgan qahvaxonaga",
    category: "Ish o'rinlari",
    price: 6500000,
    currency: "so'm",
    location: "Toshkent, Yunusobod",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 13:40"
  },
  {
    id: "47",
    title: "Administrator qizlar klinika qabulxonasiga",
    category: "Ish o'rinlari",
    price: 5500000,
    currency: "so'm",
    location: "Samarqand shahar",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 12:20"
  },
  {
    id: "48",
    title: "Call-markaz operatori (Rus va o'zbek tillarida)",
    category: "Ish o'rinlari",
    price: 6000000,
    currency: "so'm",
    location: "Toshkent, Sergeli",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 16:15"
  },
  {
    id: "49",
    title: "Restoranga bosh oshpaz (Milliy va Yevropa taomlari)",
    category: "Ish o'rinlari",
    price: 18000000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Kecha 18:50"
  },
  {
    id: "50",
    title: "Tikuvchi ayollar zamonaviy tekstil sexiga",
    category: "Ish o'rinlari",
    price: 5000000,
    currency: "so'm",
    location: "Andijon shahar",
    image: "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 09:40"
  },
  {
    id: "51",
    title: "IELTS 7.5+ Ingliz tili o'qituvchisi (O'quv markaz)",
    category: "Ish o'rinlari",
    price: 13000000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 17:00"
  },

  // ================= 5. XIZMATLAR (12 ta) =================
  {
    id: "52",
    title: "Kvartira va uylarni kalit topshirishgacha yevroremont",
    category: "Xizmatlar",
    price: 15000000,
    currency: "so'm",
    location: "Toshkent shahar va viloyat",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 10:00"
  },
  {
    id: "53",
    title: "Konditsioner o'rnatish, tozalash va freon quyish",
    category: "Xizmatlar",
    price: 250000,
    currency: "so'm",
    location: "Toshkent bo'ylab tezkor chiqish",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 11:20"
  },
  {
    id: "54",
    title: "Mebel yig'ish, yasash va restavratsiya qilish",
    category: "Xizmatlar",
    price: 350000,
    currency: "so'm",
    location: "Toshkent, Yunusobod",
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 16:10"
  },
  {
    id: "55",
    title: "Santexnik va elektr xizmatlari 24/7 tezkor usta",
    category: "Xizmatlar",
    price: 150000,
    currency: "so'm",
    location: "Toshkent, Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 09:15"
  },
  {
    id: "56",
    title: "Professional klining tozalash xizmati (Uylar va ofislar)",
    category: "Xizmatlar",
    price: 500000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Bugun 13:50"
  },
  {
    id: "57",
    title: "Yuk tashish xizmati Labo, Gazel, yuk ortuvchilar bilan",
    category: "Xizmatlar",
    price: 200000,
    currency: "so'm",
    location: "Toshkent va viloyatlararo",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 14:40"
  },
  {
    id: "58",
    title: "Professional fotosessiya va LoveStory video",
    category: "Xizmatlar",
    price: 1200000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 15:10"
  },
  {
    id: "59",
    title: "Avtomobillarni polirovka va kimyoviy tozalash (Deteyling)",
    category: "Xizmatlar",
    price: 800000,
    currency: "so'm",
    location: "Toshkent, Sergeli",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 16:40"
  },
  {
    id: "60",
    title: "Kir yuvish va idish yuvish mashinalarini ta'mirlash",
    category: "Xizmatlar",
    price: 180000,
    currency: "so'm",
    location: "Samarqand shahar",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 17:55"
  },
  {
    id: "61",
    title: "To'ylar uchun oq Chevrolet Malibu 2 ijarasi haydovchi bilan",
    category: "Xizmatlar",
    price: 700000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 12:30"
  },
  {
    id: "62",
    title: "Gaz plitalari va isitish qozonlari (Kotel) ustasi",
    category: "Xizmatlar",
    price: 220000,
    currency: "so'm",
    location: "Farg'ona shahar",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 14:25"
  },
  {
    id: "63",
    title: "Gilamlarni olib ketib professional yuvish va quritish",
    category: "Xizmatlar",
    price: 18000,
    currency: "so'm",
    location: "Toshkent shahar",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 17:20"
  },

  // ================= 6. MODA VA STIL (13 ta) =================
  {
    id: "64",
    title: "Erkaklar tabiiy charm kurtkasi Zara Man Original",
    category: "Moda va stil",
    price: 1450000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 10:30"
  },
  {
    id: "65",
    title: "Nike Air Jordan 1 Retro High OG Krossovka 42",
    category: "Moda va stil",
    price: 2100000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 11:55"
  },
  {
    id: "66",
    title: "Nike Air Max 270 Qizil krossovka yangi",
    category: "Moda va stil",
    price: 1250000,
    currency: "so'm",
    location: "Samarqand shahar",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 13:10"
  },
  {
    id: "67",
    title: "Klassik erkaklar kostyumi va shimi (Italiya matosi)",
    category: "Moda va stil",
    price: 2800000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 18:25"
  },
  {
    id: "68",
    title: "Tissot PRX Powermatic 80 Shveytsariya qo'l soati",
    category: "Moda va stil",
    price: 8900000,
    currency: "so'm",
    location: "Toshkent, Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 14:40"
  },
  {
    id: "69",
    title: "Ayollar nafis oqshom ko'ylagi (To'y va bayramlar)",
    category: "Moda va stil",
    price: 1650000,
    currency: "so'm",
    location: "Toshkent, Yunusobod",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 15:20"
  },
  {
    id: "70",
    title: "Michael Kors ayollar charm sumkasi Original",
    category: "Moda va stil",
    price: 2300000,
    currency: "so'm",
    location: "Toshkent, Yakkasaroy",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Kecha 15:40"
  },
  {
    id: "71",
    title: "Ray-Ban Aviator Classic Quyosh ko'zoynagi",
    category: "Moda va stil",
    price: 1400000,
    currency: "so'm",
    location: "Toshkent, Sergeli",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 09:35"
  },
  {
    id: "72",
    title: "Issiq qishki pufik kurtka The North Face 700",
    category: "Moda va stil",
    price: 2450000,
    currency: "so'm",
    location: "Namangan shahar",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 16:30"
  },
  {
    id: "73",
    title: "Levi's 501 Original Fit Erkaklar jinsi shimi",
    category: "Moda va stil",
    price: 850000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 12:15"
  },
  {
    id: "74",
    title: "Ayollar qishki baland poshnali charm botinkasi",
    category: "Moda va stil",
    price: 1100000,
    currency: "so'm",
    location: "Andijon shahar",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Bugun 12:50"
  },
  {
    id: "75",
    title: "Tommy Hilfiger qulay oq paxtali futbolka",
    category: "Moda va stil",
    price: 450000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 19:05"
  },
  {
    id: "76",
    title: "Erkaklar klassik jigar rang charm poyabzali",
    category: "Moda va stil",
    price: 950000,
    currency: "so'm",
    location: "Buxoro shahar markazi",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 17:15"
  },

  // ================= 7. BOLALAR DUNYOSI (12 ta) =================
  {
    id: "77",
    title: "Chicco Bravo Trio 3-in-1 Bolalar aravachasi",
    category: "Bolalar dunyosi",
    price: 3600000,
    currency: "so'm",
    location: "Toshkent, Yunusobod",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 10:25"
  },
  {
    id: "78",
    title: "Bolalar tabiiy yog'och kravatchasi matrasi bilan",
    category: "Bolalar dunyosi",
    price: 1850000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Bugun 11:35"
  },
  {
    id: "79",
    title: "Lego City Politsiya uchastkasi Katta konstruktor",
    category: "Bolalar dunyosi",
    price: 950000,
    currency: "so'm",
    location: "Toshkent, Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 17:40"
  },
  {
    id: "80",
    title: "Mercedes G63 Bolalar akkumulyatorli elektromobili",
    category: "Bolalar dunyosi",
    price: 2900000,
    currency: "so'm",
    location: "Toshkent, Sergeli",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 13:45"
  },
  {
    id: "81",
    title: "Bolalar velosipedi 16 dyuym qo'shimcha g'ildirak bilan",
    category: "Bolalar dunyosi",
    price: 850000,
    currency: "so'm",
    location: "Samarqand shahar",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 14:15"
  },
  {
    id: "82",
    title: "Katta yumshoq Teddy ayiqcha 160 sm yangi",
    category: "Bolalar dunyosi",
    price: 480000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Kecha 16:50"
  },
  {
    id: "83",
    title: "Yangi tug'ilgan chaqaloqlar uchun paxtali kiyimlar",
    category: "Bolalar dunyosi",
    price: 320000,
    currency: "so'm",
    location: "Namangan shahar",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 09:10"
  },
  {
    id: "84",
    title: "Bolalar ovqatlanish stulchasi qulay va xavfsiz",
    category: "Bolalar dunyosi",
    price: 680000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 15:05"
  },
  {
    id: "85",
    title: "Micro Mini 3 g'ildirakli yorug'likli bolalar samokati",
    category: "Bolalar dunyosi",
    price: 420000,
    currency: "so'm",
    location: "Farg'ona shahar",
    image: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Kecha 13:20"
  },
  {
    id: "86",
    title: "Montessori rivojlantiruvchi yog'och o'yinchoqlar",
    category: "Bolalar dunyosi",
    price: 380000,
    currency: "so'm",
    location: "Toshkent, Yakkasaroy",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 16:10"
  },
  {
    id: "87",
    title: "Qishki issiq bolalar kombinezoni Reima 86-92",
    category: "Bolalar dunyosi",
    price: 750000,
    currency: "so'm",
    location: "Toshkent, Olmazor",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 12:10"
  },
  {
    id: "88",
    title: "Bolalar uchun elektr poyezd va temiryo'l to'plami",
    category: "Bolalar dunyosi",
    price: 540000,
    currency: "so'm",
    location: "Andijon shahar",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Kecha 18:00"
  },

  // ================= 8. UY VA BOG' (12 ta) =================
  {
    id: "89",
    title: "Yumshoq burchakli Chezy divani yostiqlari bilan",
    category: "Uy va bog'",
    price: 6800000,
    currency: "so'm",
    location: "Toshkent, Uchtepa mebel bozori",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 10:45"
  },
  {
    id: "90",
    title: "Ergonomik ortopedik ofis kreslosi to'rli orqa bilan",
    category: "Uy va bog'",
    price: 1450000,
    currency: "so'm",
    location: "Toshkent, Chilonzor",
    image: "https://images.unsplash.com/photo-1580481077195-c54d39f6060d?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Bugun 11:50"
  },
  {
    id: "91",
    title: "Ikki kishilik zamonaviy kravat ortopedik matrasi bilan",
    category: "Uy va bog'",
    price: 4900000,
    currency: "so'm",
    location: "Toshkent, Yunusobod",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 13:00"
  },
  {
    id: "92",
    title: "Zamonaviy oshxona garnituri MDF fasad 3 metr",
    category: "Uy va bog'",
    price: 8500000,
    currency: "so'm",
    location: "Samarqand shahar",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Kecha 17:30"
  },
  {
    id: "93",
    title: "Mehmonxona marmar naqshli jurnal stoli",
    category: "Uy va bog'",
    price: 950000,
    currency: "so'm",
    location: "Toshkent, Mirobod",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 14:35"
  },
  {
    id: "94",
    title: "Katta 3 eshikli oynali shkaf-kupe yotoqxona uchun",
    category: "Uy va bog'",
    price: 3800000,
    currency: "so'm",
    location: "Toshkent, Sergeli",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 15:45"
  },
  {
    id: "95",
    title: "Bog' va hovli uchun to'qilgan mebel to'plami (Rattan)",
    category: "Uy va bog'",
    price: 5200000,
    currency: "so'm",
    location: "Toshkent viloyati, Qibray",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Kecha 15:15"
  },
  {
    id: "96",
    title: "Elektr maysazor o'rgich apparati (Gazonokosilka)",
    category: "Uy va bog'",
    price: 1850000,
    currency: "so'm",
    location: "Toshkent, Mirzo Ulug'bek",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d69104a49?auto=format&fit=crop&w=800&q=80",
    tags: null,
    date: "Bugun 09:25"
  },
  {
    id: "97",
    title: "Katta zal va mehmonxonalar uchun kristall lyustra",
    category: "Uy va bog'",
    price: 2600000,
    currency: "so'm",
    location: "Namangan shahar",
    image: "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 16:20"
  },
  {
    id: "98",
    title: "Bosch ichki o'rnatiladigan duxovka va gaz plita",
    category: "Uy va bog'",
    price: 6400000,
    currency: "so'm",
    location: "Toshkent, Shayxontohur",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    tags: "YANGI",
    date: "Kecha 18:40"
  },
  {
    id: "99",
    title: "LG 8.5kg Inverter Steam kir yuvish mashinasi",
    category: "Uy va bog'",
    price: 5800000,
    currency: "so'm",
    location: "Toshkent, Yakkasaroy",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
    tags: "TOP",
    date: "Bugun 12:40"
  },
  {
    id: "100",
    title: "Intex karkasli katta bog' basseyni 4.5m x 2.2m",
    category: "Uy va bog'",
    price: 3400000,
    currency: "so'm",
    location: "Toshkent viloyati, Bo'stonliq",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    tags: "VIP",
    date: "Bugun 17:30"
  }
];

const destFile = path.join(__dirname, "..", "mock-data", "products.json");
fs.writeFileSync(destFile, JSON.stringify(products, null, 2), "utf-8");

const rootMockFile = path.join(__dirname, "..", "..", "mock-data", "products.json");
if (fs.existsSync(path.dirname(rootMockFile))) {
  fs.writeFileSync(rootMockFile, JSON.stringify(products, null, 2), "utf-8");
}

console.log(`✅ ${products.length} ta real va sifatli fotosuratli tovarlar saqlandi: ${destFile}`);
