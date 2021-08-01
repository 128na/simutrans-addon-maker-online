// 軌道タイプ一覧
export const WAYTYPES = [
  { value: 'road', label: '道路' },
  { value: 'track', label: '線路' },
  { value: 'tram_track', label: 'トラム' },
  { value: 'monorail_track', label: 'モノレール' },
  { value: 'maglev_track', label: 'マグレブ・リニア' },
  { value: 'narrowgauge_track', label: 'ナローゲージ' },
  { value: 'water', label: '海路・運河' },
  { value: 'air', label: '空路' },
];
// 動力タイプ一覧
export const ENGINE_TYPES = [
  { value: 'steam', label: '蒸気機関' },
  { value: 'diesel', label: 'ディーゼル機関' },
  { value: 'electric', label: '電気機関' },
  { value: 'bio', label: '動物' },
  { value: 'sail', label: '帆走' },
  { value: 'fuel_cell', label: '燃料電池' },
  { value: 'hydrogene', label: '水素燃料' },
  { value: 'battery', label: '蓄電池' }
];

export const SMOKES = [
  { pak: '64', value: 'Steam', label: '蒸気機関車、蒸気船用' },
  { pak: '64', value: 'Diesel', label: 'ディーゼル車用' },
  { pak: '128', value: 'Diesel', label: 'ディーゼル (白煙)' },
  { pak: '128', value: 'Diesel_black', label: 'ディーゼル (黒煙)' },
  { pak: '128', value: 'Diesel_small', label: 'ディーゼル (小型機関車用)' },
  { pak: '128', value: 'Steam', label: '蒸気機関車用 (黒煙のみ)' },
  { pak: '128', value: 'Steam2', label: '蒸気機関車用 (黒煙+ピストンの蒸気)' },
  { pak: '128', value: 'Steam_ship', label: '蒸気船用 (白煙)' },
]

// 貨物一覧
// https://japanese.simutrans.com/index.php?cmd=read&page=%A5%A2%A5%C9%A5%AA%A5%F3%B3%AB%C8%AF%2Fdat%A5%D5%A5%A1%A5%A4%A5%EB%B5%AD%BD%D2%A5%EA%A5%D5%A5%A1%A5%EC%A5%F3%A5%B9%2Fgoods%28%B2%DF%CA%AA%29
export const FREIGHTS = [
  { pak: '64', catg: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '0', metric: '' },
  { pak: '64', catg: '専用貨物', label: '旅客', name: 'Passagiere', value: '0.45', speed_bonus: '15', weight_per_unit: '75', metric: '' },
  { pak: '64', catg: '専用貨物', label: '郵便', name: 'Post', value: '0.55', speed_bonus: '15', weight_per_unit: '50', metric: 'sack' },
  { pak: '64', catg: '専用貨物', label: '自動車', name: 'Autos', value: '3.8', speed_bonus: '5', weight_per_unit: '1800', metric: '' },
  { pak: '64', catg: '専用貨物', label: '紙', name: 'Papier', value: '1.2', speed_bonus: '4', weight_per_unit: '2500', metric: 'rolls' },
  { pak: '64', catg: '専用貨物', label: '鉄鋼', name: 'Stahl', value: '1.6', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '64', catg: '専用貨物', label: 'ミルク', name: 'milk', value: '0.9', speed_bonus: '9', weight_per_unit: '100', metric: 'm3' },
  { pak: '64', catg: '専用貨物', label: 'ゴミ', name: 'waste', value: '0.24', speed_bonus: '0', weight_per_unit: '500', metric: 'm3' },
  { pak: '64', catg: '混載貨物', label: '書籍', name: 'Buecher', value: '3.3', speed_bonus: '3', weight_per_unit: '250', metric: 'paletten' },
  { pak: '64', catg: '混載貨物', label: '化学製品', name: 'Chemicals', value: '2.7', speed_bonus: '5', weight_per_unit: '300', metric: 'paletten' },
  { pak: '64', catg: '混載貨物', label: 'ALCパネル', name: 'Concrete', value: '1.3', speed_bonus: '8', weight_per_unit: '1000', metric: 'm3' },
  { pak: '64', catg: '混載貨物', label: '薬', name: 'Medicine', value: '3.9', speed_bonus: '8', weight_per_unit: '100', metric: 'paletten' },
  { pak: '64', catg: '混載貨物', label: '家具', name: 'Moebel', value: '3.6', speed_bonus: '3', weight_per_unit: '200', metric: 'paletten' },
  { pak: '64', catg: '混載貨物', label: '印刷インク', name: 'PrintersInk', value: '6.3', speed_bonus: '12', weight_per_unit: '100', metric: 'paletten' },
  { pak: '64', catg: '混載貨物', label: '缶詰', name: 'canned_food', value: '2.7', speed_bonus: '2', weight_per_unit: '100', metric: 'paletten' },
  { pak: '64', catg: '混載貨物', label: 'ビール', name: 'beer', value: '2.85', speed_bonus: '9', weight_per_unit: '100', metric: 'paletten' },
  { pak: '64', catg: '混載貨物', label: '小麦粉', name: 'flour', value: '2.55', speed_bonus: '7', weight_per_unit: '100', metric: 'sack' },
  { pak: '64', catg: 'ばら荷貨物', label: '鉄鉱石', name: 'Eisenerz', value: '1.95', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '64', catg: 'ばら荷貨物', label: '石炭', name: 'Kohle', value: '2.1', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '64', catg: 'ばら荷貨物', label: '砂', name: 'Sand', value: '1.5', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '64', catg: 'ばら荷貨物', label: '石', name: 'Stone', value: '1.5', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '64', catg: 'ばら荷貨物', label: '穀物', name: 'grain', value: '1.4', speed_bonus: '5', weight_per_unit: '100', metric: 'tonnen' },
  { pak: '64', catg: '石油類', label: 'ガソリン', name: 'Gasoline', value: '5.1', speed_bonus: '4', weight_per_unit: '860', metric: 'm3' },
  { pak: '64', catg: '石油類', label: '石油', name: 'Oel', value: '2.1', speed_bonus: '3', weight_per_unit: '900', metric: 'm3' },
  { pak: '64', catg: '低温貨物', label: '食品', name: 'food', value: '6.6', speed_bonus: '14', weight_per_unit: '100', metric: 'paletten' },
  { pak: '64', catg: '低温貨物', label: '肉', name: 'meat', value: '8.7', speed_bonus: '8', weight_per_unit: '100', metric: 'tonnen' },
  { pak: '64', catg: '低温貨物', label: '魚肉', name: 'fish', value: '9.3', speed_bonus: '7', weight_per_unit: '100', metric: 'paletten' },
  { pak: '64', catg: '長物貨物', label: '板材', name: 'Bretter', value: '1.52', speed_bonus: '4', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '64', catg: '長物貨物', label: '木材', name: 'Holz', value: '1.85', speed_bonus: '2', weight_per_unit: '850', metric: 'tonnen' },
  { pak: '64', catg: 'ペレット/粉体貨物', label: 'セメント', name: 'Cement', value: '1', speed_bonus: '3', weight_per_unit: '1000', metric: 'm3' },
  { pak: '64', catg: 'ペレット/粉体貨物', label: 'プラスチック', name: 'Plastik', value: '0.7', speed_bonus: '4', weight_per_unit: '500', metric: 'm3' },
  { pak: '128', catg: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '1', metric: '' },
  { pak: '128', catg: '専用貨物', label: '旅客', name: 'Passagiere', value: '14', speed_bonus: '18', weight_per_unit: '85', metric: '' },
  { pak: '128', catg: '専用貨物', label: '郵便', name: 'Post', value: '16', speed_bonus: '15', weight_per_unit: '50', metric: 'sack' },
  { pak: '128', catg: '専用貨物', label: 'セメント', name: 'Cement', value: '40', speed_bonus: '5', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '専用貨物', label: 'コンクリート', name: 'Concrete', value: '80', speed_bonus: '10', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '専用貨物', label: '鉄鋼', name: 'Stahl', value: '25', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '専用貨物', label: '自動車', name: 'Autos', value: '170', speed_bonus: '15', weight_per_unit: '1800', metric: '' },
  { pak: '128', catg: '混載貨物', label: '綿花', name: 'cotton', value: '40', speed_bonus: '0', weight_per_unit: '200', metric: 'sack' },
  { pak: '128', catg: '混載貨物', label: '雑貨', name: 'goods_', value: '45', speed_bonus: '15', weight_per_unit: '250', metric: 'paletten' },
  { pak: '128', catg: '混載貨物', label: '織物', name: 'textile', value: '45', speed_bonus: '12', weight_per_unit: '250', metric: 'paletten' },
  { pak: '128', catg: '混載貨物', label: 'ウール', name: 'wool', value: '45', speed_bonus: '2', weight_per_unit: '250', metric: 'sack' },
  { pak: '128', catg: '混載貨物', label: '電化製品', name: 'electronics', value: '55', speed_bonus: '15', weight_per_unit: '300', metric: 'paletten' },
  { pak: '128', catg: '混載貨物', label: '家具', name: 'Moebel', value: '50', speed_bonus: '12', weight_per_unit: '300', metric: 'paletten' },
  { pak: '128', catg: '混載貨物', label: 'ビール', name: 'beer', value: '50', speed_bonus: '8', weight_per_unit: '800', metric: 'paletten' },
  { pak: '128', catg: '混載貨物', label: '書籍', name: 'Bucher', value: '50', speed_bonus: '8', weight_per_unit: '900', metric: 'paletten' },
  { pak: '128', catg: '混載貨物', label: '小麦粉', name: 'flour', value: '40', speed_bonus: '3', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '混載貨物', label: '紙', name: 'Papier', value: '30', speed_bonus: '5', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '混載貨物', label: 'プラスチック', name: 'Plastik', value: '40', speed_bonus: '4', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '混載貨物', label: '缶詰', name: 'canned_food', value: '40', speed_bonus: '3', weight_per_unit: '1100', metric: 'paletten' },
  { pak: '128', catg: '混載貨物', label: 'ガラス', name: 'glass', value: '45', speed_bonus: '2', weight_per_unit: '1300', metric: 'paletten' },
  { pak: '128', catg: 'ばら荷貨物', label: '鉄鉱石', name: 'Eisenerz', value: '32', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: 'ばら荷貨物', label: '肥料', name: 'fertilizer', value: '37', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: 'ばら荷貨物', label: '石炭', name: 'Kohle', value: '32', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: 'ばら荷貨物', label: '砂', name: 'Sand', value: '34', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: 'ばら荷貨物', label: '石', name: 'Stone', value: '34', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: 'ばら荷貨物', label: '廃棄物', name: 'waste', value: '39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '石油類', label: '化学薬品', name: 'Chemicals', value: '40', speed_bonus: '8', weight_per_unit: '700', metric: 'm3' },
  { pak: '128', catg: '石油類', label: 'バイオエタノール', name: 'Ethanol', value: '53', speed_bonus: '6', weight_per_unit: '780', metric: 'm3' },
  { pak: '128', catg: '石油類', label: 'ガソリン', name: 'Gasoline', value: '40', speed_bonus: '4', weight_per_unit: '860', metric: 'm3' },
  { pak: '128', catg: '石油類', label: '原油', name: 'Oel', value: '35', speed_bonus: '0', weight_per_unit: '900', metric: 'm3' },
  { pak: '128', catg: '低温貨物', label: '食品', name: 'food', value: '70', speed_bonus: '18', weight_per_unit: '300', metric: 'paletten' },
  { pak: '128', catg: '低温貨物', label: '魚肉', name: 'fish', value: '45', speed_bonus: '15', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '低温貨物', label: '肉', name: 'meat', value: '50', speed_bonus: '18', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '飲料', label: 'ミルク', name: 'milk', value: '50', speed_bonus: '15', weight_per_unit: '1000', metric: 'm3' },
  { pak: '128', catg: '長物貨物', label: '板材', name: 'Bretter', value: '40', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '長物貨物', label: '木材', name: 'Holz', value: '50', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128', catg: '繊維農作物', label: '穀物', name: 'grain', value: '35', speed_bonus: '5', weight_per_unit: '300', metric: 'tonnen' },
  { pak: '128', catg: '繊維農作物', label: 'トウモロコシ', name: 'corn', value: '40', speed_bonus: '3', weight_per_unit: '350', metric: 'tonnen' },
  { pak: '128jp', catg: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '0', metric: '' },
  { pak: '128jp', catg: '専用貨物', label: '二等旅客', name: 'Passagiere', value: '0.3', speed_bonus: '10', weight_per_unit: '60', metric: 'nin' },
  { pak: '128jp', catg: '専用貨物', label: '一等旅客', name: 'Post', value: '0.9', speed_bonus: '15', weight_per_unit: '60', metric: 'nin' },
  { pak: '128jp', catg: '専用貨物', label: '木材チップ', name: 'woodchip', value: '0.63', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '専用貨物', label: '化成品', name: 'Chemicals0', value: '0.7', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '専用貨物', label: '鉄鋼', name: 'Stahl0', value: '0.45', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: 'ばら積み貨物', label: '石炭（未使用）', name: 'Kohle', value: '1.5', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: 'ばら積み貨物', label: '石炭', name: 'Kohle1', value: '0.3', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: 'ばら積み貨物', label: '鉄鉱石', name: 'Eisenerz1', value: '0.39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '小口混載貨物', label: '玄米', name: 'genmai2', value: '0.06', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { pak: '128jp', catg: '小口混載貨物', label: '白米（小口混載）', name: 'hakumai2', value: '0.08', speed_bonus: '5', weight_per_unit: '100', metric: 'ko' },
  { pak: '128jp', catg: '小口混載貨物', label: '日本酒（小口混載）', name: 'sake2', value: '0.09', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { pak: '128jp', catg: '小口混載貨物', label: '野菜（農協へ、小口混載）', name: 'vegetableA2', value: '0.09', speed_bonus: '3', weight_per_unit: '80', metric: 'ko' },
  { pak: '128jp', catg: '小口混載貨物', label: '野菜（需要先へ、小口混載）', name: 'vegetableB2', value: '0.09', speed_bonus: '3', weight_per_unit: '80', metric: 'ko' },
  { pak: '128jp', catg: '小口混載貨物', label: '生活雑貨（小口混載）', name: 'household_goods2', value: '0.12', speed_bonus: '1', weight_per_unit: '60', metric: 'ko' },
  { pak: '128jp', catg: '小口混載貨物', label: '本（小口混載）', name: 'Bucher2', value: '0.1', speed_bonus: '1', weight_per_unit: '100', metric: 'ko' },
  { pak: '128jp', catg: '小口混載貨物', label: '新聞（小口混載）', name: 'newspaper2', value: '0.08', speed_bonus: '8', weight_per_unit: '100', metric: 'ko' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '玄米（未使用）', name: 'genmai', value: '0.1', speed_bonus: '2', weight_per_unit: '1000', metric: 'ko' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '白米（パレット）', name: 'hakumai3', value: '0.8', speed_bonus: '5', weight_per_unit: '1000', metric: 'paletten' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '日本酒（未使用）', name: 'sake', value: '0.2', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '日本酒（パレット）', name: 'sake3', value: '0.9', speed_bonus: '2', weight_per_unit: '1000', metric: 'paletten' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '紙（パレット）', name: 'Papier3', value: '1.2', speed_bonus: '1', weight_per_unit: '1000', metric: 'paletten' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: 'プラスチックペレット（パレット）', name: 'Plastik3', value: '1', speed_bonus: '2', weight_per_unit: '500', metric: 'ko' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '野菜（需要先へ、パレット）', name: 'vegetableB3', value: '0.9', speed_bonus: '3', weight_per_unit: '800', metric: 'paletten' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '生活雑貨（パレット）', name: 'household_goods3', value: '1.2', speed_bonus: '1', weight_per_unit: '600', metric: 'ko' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '本（パレット）', name: 'Bucher3', value: '1', speed_bonus: '1', weight_per_unit: '1000', metric: 'ko' },
  { pak: '128jp', catg: 'パレット輸送貨物', label: '新聞（パレット）', name: 'newspaper3', value: '1.2', speed_bonus: '8', weight_per_unit: '1000', metric: 'ko' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '白米（国鉄／JRコンテナ）', name: 'hakumai4', value: '4.8', speed_bonus: '5', weight_per_unit: '6000', metric: 'ko' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '日本酒（国鉄／JRコンテナ）', name: 'sake4', value: '5.4', speed_bonus: '2', weight_per_unit: '6000', metric: 'paletten' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '紙（国鉄／JRコンテナ）', name: 'Papier4', value: '7.2', speed_bonus: '1', weight_per_unit: '6000', metric: 'ko' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '野菜（需要先へ、国鉄／JRコンテナ）', name: 'vegetableB4', value: '5.4', speed_bonus: '3', weight_per_unit: '4800', metric: 'ko' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '生活雑貨（国鉄／JRコンテナ）', name: 'household_goods4', value: '7.2', speed_bonus: '1', weight_per_unit: '3600', metric: 'ko' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '本（国鉄／JRコンテナ）', name: 'Bucher4', value: '6', speed_bonus: '1', weight_per_unit: '6000', metric: 'ko' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '新聞（国鉄／JRコンテナ）', name: 'newspaper4', value: '8.4', speed_bonus: '8', weight_per_unit: '6000', metric: 'ko' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '魚（需要先へ、国鉄／JRコンテナ）', name: 'fishB4', value: '2.52', speed_bonus: '8', weight_per_unit: '6000', metric: 'ko' },
  { pak: '128jp', catg: '国鉄／JRコンテナ貨物', label: '水産加工品（国鉄／JRコンテナ）', name: 'processed_fish4', value: '9', speed_bonus: '5', weight_per_unit: '6000', metric: 'ko' },
  { pak: '128jp', catg: 'ISOコンテナ貨物', label: '化成品（ISOコンテナ貨物）', name: 'Chemicals5', value: '10', speed_bonus: '2', weight_per_unit: '16000', metric: 'ko' },
  { pak: '128jp', catg: '小荷物', label: '新聞（小荷物）', name: 'newspaper6', value: '0.12', speed_bonus: '8', weight_per_unit: '100', metric: 'ko' },
  { pak: '128jp', catg: '石油類', label: '原油', name: 'Oel7', value: '0.45', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '石油類', label: 'ガソリン（製油所→油槽所）', name: 'GasolineA7', value: '0.54', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '石油類', label: 'ガソリン（油槽所→需要先）', name: 'GasolineB7', value: '0.54', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '長物貨物', label: '木材', name: 'Holz', value: '0.36', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '長物貨物', label: '材木', name: 'Bretter', value: '0.39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '冷蔵加工食品', label: '水産加工品（冷蔵加工食品）', name: 'processed_fish12', value: '0.15', speed_bonus: '5', weight_per_unit: '100', metric: 'crate' },
  { pak: '128jp', catg: '冷蔵加工食品', label: '弁当（冷蔵加工食品）', name: 'bento12', value: '0.18', speed_bonus: '5', weight_per_unit: '100', metric: 'crate' },
  { pak: '128jp', catg: '鮮魚', label: '魚（市場へ）', name: 'fishA13', value: '0.42', speed_bonus: '8', weight_per_unit: '1000', metric: 'tonnen' },
  { pak: '128jp', catg: '鮮魚', label: '魚（需要先へ、鮮魚）', name: 'fishB13', value: '0.42', speed_bonus: '8', weight_per_unit: '1000', metric: 'tonnen' },
];

const IMAGEABLE_KEYS: string[] = [
  "icon",
  "cursor",
  // vehicle
  "emptyimage",
  "freightimage",
  // way
  "image",
  "diagonal",
  "imageUp",
  "imageUp2",
  // way-obj
  "backimage",
  "fountimage",
  "backdiagonal",
  "fountdiagonal",
  "backimageUp",
  "frontimageUp",
  "backimageUp2",
  "frontimageUp2",
  // bridge
  "backstart",
  "frontstart",
  "backstart2",
  "frontstart2",
  "backramp",
  "frontramp",
  "backramp2",
  "frontramp2",
  "backpillar",
  "frontpillar",
  "backpillar2",
  "frontpillar2",
  // crossing
  "openimage",
  "front_openimage",
  "closedimage",
  "front_closedimage",
];

const OBJ_SEPARATOR = '---';
/**
 * datファイル全体
 */
export class Dat {
  _original: string;
  _objs: Obj[];

  constructor(original: string) {
    this._original = original
      .replaceAll("\r\n", "\n") // win CRLF -> LF
      .replaceAll("\r", "\n") // mac CR -> LF

    this._objs = this._original
      .replace(/---+/gi, OBJ_SEPARATOR).split(`${OBJ_SEPARATOR}\n`)
      .map(o => new Obj(o));
  }

  get objs(): Obj[] {
    return this._objs;
  }

  toString(): string {
    return this._objs.map(o => o.toString()).join(`\n${OBJ_SEPARATOR}\n`).replace(/\n+/mgi, '\n');
  }
}

export class Obj {
  _original: string;
  _params: Param[];

  constructor(original: string) {
    this._original = original;
    this._params = original.split("\n")
      .map(l => new Param(l));
  }

  updateFromString(original: string) {
    this._original = original;
    this._params = original.split("\n")
      .map(l => new Param(l));
  }
  updateOrCreate(key: string, value: string, operator = '=') {
    const param = this.findParamByKey(key);
    if (param) {
      param.value = value;
    } else {
      this.updateFromString(`${this._original}\n${key}${operator}${value}`);
    }
  }

  get obj(): string | undefined {
    return this.findParamByKey('obj')?.valueVal;
  }
  get name(): string | undefined {
    return this.findParamByKey('name')?.valueVal;
  }

  findParamsByKeyVal(keyVal: string): Param[] {
    return this._params.filter(p => p.keyVal === keyVal);
  }
  findParamByKey(key: string): Param | undefined {
    return this._params.find(p => p.key === key);
  }

  toString(): string {
    return this._params
      .filter(p => !p.isEmpty)
      .map(p => p.toString())
      .join("\n");
  }
}

/**
 * dat記述の1行
 * foo=bar
 */
class Param {
  _original: string;
  _key: Key;
  _operator: string;
  _value: Value;

  constructor(original: string) {
    this._original = original;
    const tmp = original.match(/^([^=]*)(=> |=)?(\S*)?$/i) || [];
    if (!tmp[2]) {
      this._key = new Key("");
      this._operator = "";
      this._value = new Value(tmp[1] || "");
    } else {
      this._key = new Key((tmp[1] || "").toLowerCase());
      this._operator = tmp[2] || "";
      this._value = new Value(tmp[3] || "");
    }
  }
  get hasImage(): boolean {
    return IMAGEABLE_KEYS.includes(this.keyVal);
  }
  get isStaticImage(): boolean {
    return this.hasImage && this._operator === '=> ';
  }

  get key(): string {
    return this._key._original;
  }
  set key(key: string) {
    this._key = new Key(key);
  }
  get value(): string {
    return this._value._original;
  }
  set value(value: string) {
    this._value = new Value(value);
  }

  get keyVal(): string {
    return this._key._val;
  }
  get keyParams(): string[] {
    return this._key._params;
  }
  get keyParam(): string {
    return this._key._params.join(',');
  }

  get valueVal(): string {
    return this._value._val;
  }
  get valueParams(): string[] {
    return this._value._params;
  }
  get valueParam(): string {
    return this._value._params.join(',');
  }

  get isEmpty(): boolean {
    return !this.value
  }

  get isComment(): boolean {
    return this.valueVal.startsWith('#');
  }
  get isSplit(): boolean {
    return this.valueVal.startsWith('---');
  }

  toString(): string {
    return `${this.key}${this._operator}${this.value}`;
  }
}

class Key {
  _original: string;
  _val: string;
  _params: string[];

  constructor(original: string) {
    this._original = original
    this._val = (original.split("[")[0] || "");
    this._params = [...original.matchAll(/\[([\w\d]*)\]/ig)].map(p => p[1] || "");
  }
}

class Value {
  _original: string;
  _val: string;
  _params: string[];

  constructor(original: string) {
    this._original = original
    this._val = original.split(".")[0] || "";
    this._params = [...original.matchAll(/[\.,]([-\d]*)/ig)].map(p => p[1] || "");
  }
}

export function calculateMaxSpeed(power: number, gear = 100, weight: number): number {
  const pg = (power * gear) / 100;
  const w = Math.max(1, weight);

  return Math.max(0, Math.ceil(51.44 * Math.sqrt(pg / w) - 15.637));
}