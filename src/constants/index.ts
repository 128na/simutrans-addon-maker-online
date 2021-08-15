import bridges from './snippets/bridges';
import buildings from './snippets/buildings';
import citycars from './snippets/citycars';
import crossings from './snippets/crossings';
import cursors from './snippets/cursors';
import factories from './snippets/factories';
import fields from './snippets/fields';
import goods from './snippets/goods';
import groundobjs from './snippets/groundobjs';
import grounds from './snippets/grounds';
import menus from './snippets/menus';
import miscs from './snippets/miscs';
import pedestrians from './snippets/pedestrians';
import signals from './snippets/signals';
import smokes from './snippets/smokes';
import symbols from './snippets/symbols';
import trees from './snippets/trees';
import tunnels from './snippets/tunnels';
import vehicles from './snippets/vehicles';
import wayobjects from './snippets/wayobjects';
import ways from './snippets/ways';
import windowskins from './snippets/windowskins';
import { SnippetDefinitionList } from '@/plugins/interface';

export const SNIPPETS: SnippetDefinitionList[] = [
  {
    title: '建物', caption: "building", icon: "maps_home_work", snippets: [
      ...buildings,
    ]
  },
  {
    title: '車両', caption: 'vehicle, citycar', icon: "local_shipping", snippets: [
      ...vehicles,
      ...citycars,
    ]
  },
  {
    title: '軌道', caption: 'way, tunnel, bridge', icon: "mdi-road", snippets: [
      ...ways,
      ...tunnels,
      ...bridges,
    ]
  },
  {
    title: '軌道関連', caption: 'way-object, crossing, signal', icon: "traffic", snippets: [
      ...wayobjects,
      ...crossings,
      ...signals,
    ]
  },
  {
    title: '産業', caption: 'factory, field, smoke, good', icon: "mdi-factory", snippets: [
      ...factories,
      ...fields,
      ...smokes,
      ...goods,
    ]
  },
  {
    title: '地形', caption: 'tree, groundObj, ground', icon: "landscape", snippets: [
      ...trees,
      ...groundobjs,
      ...grounds,
    ]
  },
  {
    title: 'その他', caption: 'pedestrian, misc, menu, symbol, cursor, windowSkin', icon: "mdi-cursor-default", snippets: [
      ...pedestrians,
      ...miscs,
      ...menus,
      ...symbols,
      ...cursors,
      ...windowskins,
    ]
  }
];

// 対応pakセット
const PAK_64 = 'pak64';
const PAK_128 = 'pak128';
const PAK_128JP = 'pak128japan';

export const PAKSETS = [
  { size: 64, value: PAK_64, label: 'pak64' },
  { size: 128, value: PAK_128, label: 'pak128' },
  { size: 128, value: PAK_128JP, label: 'pak128.Japan' },
];

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

export const OWN_WAYTYPES = [
  { value: 'electrified_track', label: '電化' },
  ...WAYTYPES
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
  { size: 64, pak: PAK_64, value: 'Steam', label: '蒸気機関車、蒸気船用' },
  { size: 64, pak: PAK_64, value: 'Diesel', label: 'ディーゼル車用' },
  { size: 128, pak: PAK_128, value: 'Diesel', label: 'ディーゼル (白煙)' },
  { size: 128, pak: PAK_128, value: 'Diesel_black', label: 'ディーゼル (黒煙)' },
  { size: 128, pak: PAK_128, value: 'Diesel_small', label: 'ディーゼル (小型機関車用)' },
  { size: 128, pak: PAK_128, value: 'Steam', label: '蒸気機関車用 (黒煙のみ)' },
  { size: 128, pak: PAK_128, value: 'Steam2', label: '蒸気機関車用 (黒煙+ピストンの蒸気)' },
  { size: 128, pak: PAK_128, value: 'Steam_ship', label: '蒸気船用 (白煙)' },
]

// 貨物一覧
// https://japanese.simutrans.com/index.php?cmd=read&page=%A5%A2%A5%C9%A5%AA%A5%F3%B3%AB%C8%AF%2Fdat%A5%D5%A5%A1%A5%A4%A5%EB%B5%AD%BD%D2%A5%EA%A5%D5%A5%A1%A5%EC%A5%F3%A5%B9%2Fgoods%28%B2%DF%CA%AA%29
export const FREIGHTS = [
  { size: 64, pak: PAK_64, catg: 0, cat_name: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '0', metric: '' },
  { size: 64, pak: PAK_64, catg: 0, cat_name: '専用貨物', label: '旅客', name: 'Passagiere', value: '0.45', speed_bonus: '15', weight_per_unit: '75', metric: '' },
  { size: 64, pak: PAK_64, catg: 0, cat_name: '専用貨物', label: '郵便', name: 'Post', value: '0.55', speed_bonus: '15', weight_per_unit: '50', metric: 'sack' },
  { size: 64, pak: PAK_64, catg: 0, cat_name: '専用貨物', label: '自動車', name: 'Autos', value: '3.8', speed_bonus: '5', weight_per_unit: '1800', metric: '' },
  { size: 64, pak: PAK_64, catg: 0, cat_name: '専用貨物', label: '紙', name: 'Papier', value: '1.2', speed_bonus: '4', weight_per_unit: '2500', metric: 'rolls' },
  { size: 64, pak: PAK_64, catg: 0, cat_name: '専用貨物', label: '鉄鋼', name: 'Stahl', value: '1.6', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 0, cat_name: '専用貨物', label: 'ミルク', name: 'milk', value: '0.9', speed_bonus: '9', weight_per_unit: '100', metric: 'm3' },
  { size: 64, pak: PAK_64, catg: 0, cat_name: '専用貨物', label: 'ゴミ', name: 'waste', value: '0.24', speed_bonus: '0', weight_per_unit: '500', metric: 'm3' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: '書籍', name: 'Buecher', value: '3.3', speed_bonus: '3', weight_per_unit: '250', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: '化学製品', name: 'Chemicals', value: '2.7', speed_bonus: '5', weight_per_unit: '300', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: 'ALCパネル', name: 'Concrete', value: '1.3', speed_bonus: '8', weight_per_unit: '1000', metric: 'm3' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: '薬', name: 'Medicine', value: '3.9', speed_bonus: '8', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: '家具', name: 'Moebel', value: '3.6', speed_bonus: '3', weight_per_unit: '200', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: '印刷インク', name: 'PrintersInk', value: '6.3', speed_bonus: '12', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: '缶詰', name: 'canned_food', value: '2.7', speed_bonus: '2', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: 'ビール', name: 'beer', value: '2.85', speed_bonus: '9', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 1, cat_name: '混載貨物', label: '小麦粉', name: 'flour', value: '2.55', speed_bonus: '7', weight_per_unit: '100', metric: 'sack' },
  { size: 64, pak: PAK_64, catg: 2, cat_name: 'ばら荷貨物', label: '鉄鉱石', name: 'Eisenerz', value: '1.95', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 2, cat_name: 'ばら荷貨物', label: '石炭', name: 'Kohle', value: '2.1', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 2, cat_name: 'ばら荷貨物', label: '砂', name: 'Sand', value: '1.5', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 2, cat_name: 'ばら荷貨物', label: '石', name: 'Stone', value: '1.5', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 2, cat_name: 'ばら荷貨物', label: '穀物', name: 'grain', value: '1.4', speed_bonus: '5', weight_per_unit: '100', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 3, cat_name: '石油類', label: 'ガソリン', name: 'Gasoline', value: '5.1', speed_bonus: '4', weight_per_unit: '860', metric: 'm3' },
  { size: 64, pak: PAK_64, catg: 3, cat_name: '石油類', label: '石油', name: 'Oel', value: '2.1', speed_bonus: '3', weight_per_unit: '900', metric: 'm3' },
  { size: 64, pak: PAK_64, catg: 4, cat_name: '低温貨物', label: '食品', name: 'food', value: '6.6', speed_bonus: '14', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 4, cat_name: '低温貨物', label: '肉', name: 'meat', value: '8.7', speed_bonus: '8', weight_per_unit: '100', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 4, cat_name: '低温貨物', label: '魚肉', name: 'fish', value: '9.3', speed_bonus: '7', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: PAK_64, catg: 6, cat_name: '長物貨物', label: '板材', name: 'Bretter', value: '1.52', speed_bonus: '4', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 6, cat_name: '長物貨物', label: '木材', name: 'Holz', value: '1.85', speed_bonus: '2', weight_per_unit: '850', metric: 'tonnen' },
  { size: 64, pak: PAK_64, catg: 7, cat_name: 'ペレット/粉体貨物', label: 'セメント', name: 'Cement', value: '1', speed_bonus: '3', weight_per_unit: '1000', metric: 'm3' },
  { size: 64, pak: PAK_64, catg: 7, cat_name: 'ペレット/粉体貨物', label: 'プラスチック', name: 'Plastik', value: '0.7', speed_bonus: '4', weight_per_unit: '500', metric: 'm3' },
  { size: 128, pak: PAK_128, catg: 0, cat_name: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '1', metric: '' },
  { size: 128, pak: PAK_128, catg: 0, cat_name: '専用貨物', label: '旅客', name: 'Passagiere', value: '14', speed_bonus: '18', weight_per_unit: '85', metric: '' },
  { size: 128, pak: PAK_128, catg: 0, cat_name: '専用貨物', label: '郵便', name: 'Post', value: '16', speed_bonus: '15', weight_per_unit: '50', metric: 'sack' },
  { size: 128, pak: PAK_128, catg: 0, cat_name: '専用貨物', label: 'セメント', name: 'Cement', value: '40', speed_bonus: '5', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 0, cat_name: '専用貨物', label: 'コンクリート', name: 'Concrete', value: '80', speed_bonus: '10', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 0, cat_name: '専用貨物', label: '鉄鋼', name: 'Stahl', value: '25', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 0, cat_name: '専用貨物', label: '自動車', name: 'Autos', value: '170', speed_bonus: '15', weight_per_unit: '1800', metric: '' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '綿花', name: 'cotton', value: '40', speed_bonus: '0', weight_per_unit: '200', metric: 'sack' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '雑貨', name: 'goods_', value: '45', speed_bonus: '15', weight_per_unit: '250', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '織物', name: 'textile', value: '45', speed_bonus: '12', weight_per_unit: '250', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: 'ウール', name: 'wool', value: '45', speed_bonus: '2', weight_per_unit: '250', metric: 'sack' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '電化製品', name: 'electronics', value: '55', speed_bonus: '15', weight_per_unit: '300', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '家具', name: 'Moebel', value: '50', speed_bonus: '12', weight_per_unit: '300', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: 'ビール', name: 'beer', value: '50', speed_bonus: '8', weight_per_unit: '800', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '書籍', name: 'Bucher', value: '50', speed_bonus: '8', weight_per_unit: '900', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '小麦粉', name: 'flour', value: '40', speed_bonus: '3', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '紙', name: 'Papier', value: '30', speed_bonus: '5', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: 'プラスチック', name: 'Plastik', value: '40', speed_bonus: '4', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: '缶詰', name: 'canned_food', value: '40', speed_bonus: '3', weight_per_unit: '1100', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 1, cat_name: '混載貨物', label: 'ガラス', name: 'glass', value: '45', speed_bonus: '2', weight_per_unit: '1300', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 2, cat_name: 'ばら荷貨物', label: '鉄鉱石', name: 'Eisenerz', value: '32', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 2, cat_name: 'ばら荷貨物', label: '肥料', name: 'fertilizer', value: '37', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 2, cat_name: 'ばら荷貨物', label: '石炭', name: 'Kohle', value: '32', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 2, cat_name: 'ばら荷貨物', label: '砂', name: 'Sand', value: '34', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 2, cat_name: 'ばら荷貨物', label: '石', name: 'Stone', value: '34', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 2, cat_name: 'ばら荷貨物', label: '廃棄物', name: 'waste', value: '39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 3, cat_name: '石油類', label: '化学薬品', name: 'Chemicals', value: '40', speed_bonus: '8', weight_per_unit: '700', metric: 'm3' },
  { size: 128, pak: PAK_128, catg: 3, cat_name: '石油類', label: 'バイオエタノール', name: 'Ethanol', value: '53', speed_bonus: '6', weight_per_unit: '780', metric: 'm3' },
  { size: 128, pak: PAK_128, catg: 3, cat_name: '石油類', label: 'ガソリン', name: 'Gasoline', value: '40', speed_bonus: '4', weight_per_unit: '860', metric: 'm3' },
  { size: 128, pak: PAK_128, catg: 3, cat_name: '石油類', label: '原油', name: 'Oel', value: '35', speed_bonus: '0', weight_per_unit: '900', metric: 'm3' },
  { size: 128, pak: PAK_128, catg: 4, cat_name: '低温貨物', label: '食品', name: 'food', value: '70', speed_bonus: '18', weight_per_unit: '300', metric: 'paletten' },
  { size: 128, pak: PAK_128, catg: 4, cat_name: '低温貨物', label: '魚肉', name: 'fish', value: '45', speed_bonus: '15', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 4, cat_name: '低温貨物', label: '肉', name: 'meat', value: '50', speed_bonus: '18', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 5, cat_name: '飲料', label: 'ミルク', name: 'milk', value: '50', speed_bonus: '15', weight_per_unit: '1000', metric: 'm3' },
  { size: 128, pak: PAK_128, catg: 6, cat_name: '長物貨物', label: '板材', name: 'Bretter', value: '40', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 6, cat_name: '長物貨物', label: '木材', name: 'Holz', value: '50', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 7, cat_name: '繊維農作物', label: '穀物', name: 'grain', value: '35', speed_bonus: '5', weight_per_unit: '300', metric: 'tonnen' },
  { size: 128, pak: PAK_128, catg: 7, cat_name: '繊維農作物', label: 'トウモロコシ', name: 'corn', value: '40', speed_bonus: '3', weight_per_unit: '350', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 0, cat_name: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '0', metric: '' },
  { size: 128, pak: PAK_128JP, catg: 0, cat_name: '専用貨物', label: '二等旅客', name: 'Passagiere', value: '0.3', speed_bonus: '10', weight_per_unit: '60', metric: 'nin' },
  { size: 128, pak: PAK_128JP, catg: 0, cat_name: '専用貨物', label: '一等旅客', name: 'Post', value: '0.9', speed_bonus: '15', weight_per_unit: '60', metric: 'nin' },
  { size: 128, pak: PAK_128JP, catg: 0, cat_name: '専用貨物', label: '木材チップ', name: 'woodchip', value: '0.63', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 0, cat_name: '専用貨物', label: '化成品', name: 'Chemicals0', value: '0.7', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 0, cat_name: '専用貨物', label: '鉄鋼', name: 'Stahl0', value: '0.45', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 1, cat_name: 'ばら積み貨物', label: '石炭（未使用）', name: 'Kohle', value: '1.5', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 1, cat_name: 'ばら積み貨物', label: '石炭', name: 'Kohle1', value: '0.3', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 1, cat_name: 'ばら積み貨物', label: '鉄鉱石', name: 'Eisenerz1', value: '0.39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 2, cat_name: '小口混載貨物', label: '玄米', name: 'genmai2', value: '0.06', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 2, cat_name: '小口混載貨物', label: '白米（小口混載）', name: 'hakumai2', value: '0.08', speed_bonus: '5', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 2, cat_name: '小口混載貨物', label: '日本酒（小口混載）', name: 'sake2', value: '0.09', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 2, cat_name: '小口混載貨物', label: '野菜（農協へ、小口混載）', name: 'vegetableA2', value: '0.09', speed_bonus: '3', weight_per_unit: '80', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 2, cat_name: '小口混載貨物', label: '野菜（需要先へ、小口混載）', name: 'vegetableB2', value: '0.09', speed_bonus: '3', weight_per_unit: '80', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 2, cat_name: '小口混載貨物', label: '生活雑貨（小口混載）', name: 'household_goods2', value: '0.12', speed_bonus: '1', weight_per_unit: '60', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 2, cat_name: '小口混載貨物', label: '本（小口混載）', name: 'Bucher2', value: '0.1', speed_bonus: '1', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 2, cat_name: '小口混載貨物', label: '新聞（小口混載）', name: 'newspaper2', value: '0.08', speed_bonus: '8', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '玄米（未使用）', name: 'genmai', value: '0.1', speed_bonus: '2', weight_per_unit: '1000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '白米（パレット）', name: 'hakumai3', value: '0.8', speed_bonus: '5', weight_per_unit: '1000', metric: 'paletten' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '日本酒（未使用）', name: 'sake', value: '0.2', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '日本酒（パレット）', name: 'sake3', value: '0.9', speed_bonus: '2', weight_per_unit: '1000', metric: 'paletten' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '紙（パレット）', name: 'Papier3', value: '1.2', speed_bonus: '1', weight_per_unit: '1000', metric: 'paletten' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: 'プラスチックペレット（パレット）', name: 'Plastik3', value: '1', speed_bonus: '2', weight_per_unit: '500', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '野菜（需要先へ、パレット）', name: 'vegetableB3', value: '0.9', speed_bonus: '3', weight_per_unit: '800', metric: 'paletten' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '生活雑貨（パレット）', name: 'household_goods3', value: '1.2', speed_bonus: '1', weight_per_unit: '600', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '本（パレット）', name: 'Bucher3', value: '1', speed_bonus: '1', weight_per_unit: '1000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 3, cat_name: 'パレット輸送貨物', label: '新聞（パレット）', name: 'newspaper3', value: '1.2', speed_bonus: '8', weight_per_unit: '1000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '白米（国鉄／JRコンテナ）', name: 'hakumai4', value: '4.8', speed_bonus: '5', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '日本酒（国鉄／JRコンテナ）', name: 'sake4', value: '5.4', speed_bonus: '2', weight_per_unit: '6000', metric: 'paletten' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '紙（国鉄／JRコンテナ）', name: 'Papier4', value: '7.2', speed_bonus: '1', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '野菜（需要先へ、国鉄／JRコンテナ）', name: 'vegetableB4', value: '5.4', speed_bonus: '3', weight_per_unit: '4800', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '生活雑貨（国鉄／JRコンテナ）', name: 'household_goods4', value: '7.2', speed_bonus: '1', weight_per_unit: '3600', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '本（国鉄／JRコンテナ）', name: 'Bucher4', value: '6', speed_bonus: '1', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '新聞（国鉄／JRコンテナ）', name: 'newspaper4', value: '8.4', speed_bonus: '8', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '魚（需要先へ、国鉄／JRコンテナ）', name: 'fishB4', value: '2.52', speed_bonus: '8', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '水産加工品（国鉄／JRコンテナ）', name: 'processed_fish4', value: '9', speed_bonus: '5', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 5, cat_name: 'ISOコンテナ貨物', label: '化成品（ISOコンテナ貨物）', name: 'Chemicals5', value: '10', speed_bonus: '2', weight_per_unit: '16000', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 6, cat_name: '小荷物', label: '新聞（小荷物）', name: 'newspaper6', value: '0.12', speed_bonus: '8', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: PAK_128JP, catg: 7, cat_name: '石油類', label: '原油', name: 'Oel7', value: '0.45', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 7, cat_name: '石油類', label: 'ガソリン（製油所→油槽所）', name: 'GasolineA7', value: '0.54', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 7, cat_name: '石油類', label: 'ガソリン（油槽所→需要先）', name: 'GasolineB7', value: '0.54', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 8, cat_name: '長物貨物', label: '木材', name: 'Holz', value: '0.36', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 8, cat_name: '長物貨物', label: '材木', name: 'Bretter', value: '0.39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 12, cat_name: '冷蔵加工食品', label: '水産加工品（冷蔵加工食品）', name: 'processed_fish12', value: '12.15', speed_bonus: '5', weight_per_unit: '100', metric: 'crate' },
  { size: 128, pak: PAK_128JP, catg: 12, cat_name: '冷蔵加工食品', label: '弁当（冷蔵加工食品）', name: 'bento12', value: '0.18', speed_bon12s: '5', weight_per_unit: '100', metric: 'crate' },
  { size: 128, pak: PAK_128JP, catg: 13, cat_name: '鮮魚', label: '魚（市場へ）', name: 'fishA13', value: '0.42', speed_bonus: '8', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: PAK_128JP, catg: 13, cat_name: '鮮魚', label: '魚（需要先へ、鮮魚）', name: 'fishB13', value: '0.42', speed_bonus: '8', weight_per_unit: '1000', metric: 'tonnen' },
];


// 建物タイプ一覧
export const TYPES = [
  { value: 'res', label: '住宅用建築物' },
  { value: 'com', label: '商業用建築物' },
  { value: 'ind', label: '工業用建築物' },
  { value: 'cur', label: '市内特殊建築物、観光名所' },
  { value: 'mon', label: '記念碑' },
  { value: 'tow', label: '役所' },
  { value: 'hq', label: '本社' },
  { value: 'stop', label: '駅・停留所' },
  { value: 'extension', label: '駅舎' },
  { value: 'depot', label: '車庫' },
  { value: 'harbour', label: '港' },
];

// 気候一覧
export const CLIMATES = [
  { value: 'water', label: '沿岸' },
  { value: 'desert', label: '砂漠気候' },
  { value: 'tropic', label: '熱帯気候' },
  { value: 'mediterran', label: '地中海気候' },
  { value: 'temperate', label: '温帯気候' },
  { value: 'tundra', label: 'ツンドラ気候' },
  { value: 'rocky', label: '高地気候' },
  { value: 'arctic', label: '極地気候' },
];

export const ALLOW_UNDERGROUNDS = [
  { value: '0', label: '地上のみ' },
  { value: '1', label: '地下のみ' },
  { value: '2', label: '地上と地下' },
];

export const SYSTEM_TYPES = [
  { value: '0', label: '地上（誘導路）' },
  { value: '1', label: '高架（滑走路）' },
  { value: '64', label: '地下' },
  { value: '255', label: '特殊' },
];

export const DIRECTIONS_STRAIGHT = [
  "ns", "ew",
];
export const DIRECTIONS_VEHICLE = [
  "s", "n", "e", "w", "ne", "sw", "se", "nw",
];
export const DIRECTIONS_WAY = [
  ...DIRECTIONS_VEHICLE,
  "sw", "nw", "ne", "se", "ns", "ew", "nsew", "-", "new", "nse", "sew", "nsw",
];
export const DIRECTIONS_WAY_TOGGLE = [
  "new1", "nse1", "sew1", "nsw1", "nsew1",
  "new2", "nse2", "sew2", "nsw2", "nsew2",
];
export const DIRECTIONS_UP_DOWN = [
  "3", "6", "9", "12",
];
export const DIRECTIONS_DIAGONAL = [
  "sw", "nw", "ne", "se",
];

export const IMAGE_TYPE_SNOW = [0, 1];

interface ParamSortKeys {
  [index: string]: number
}

// dat書き出し時の項目ソート順定義
export const SORT_KEYS: ParamSortKeys = {
  // コメント
  comment: 0,
  // 不明
  unknown: 10000,
  // 一般
  obj: 1,
  name: 2,
  copyright: 3,
  intro_month: 10,
  intro_year: 11,
  retire_month: 20,
  retire_year: 21,
  // 金額関係
  cost: 100,
  maintenance: 101,
  runningcost: 102,
  // 建物
  type: 1000,
  dims: 1010,
  level: 1020,
  passengers: 1030,
  location: 1040,
  enables_pax: 1050,
  enables_post: 1051,
  enables_ware: 1052,
  extension_building: 1060,
  needs_ground: 1070,
  noconstruction: 1080,
  noinfo: 1090,
  allow_underground: 1110,
  build_time: 1120,
  chance: 1130,
  clusters: 1140,
  hq_level: 1150,
  // 工場
  distributionweight: 2000,
  productivity: 2010,
  range: 2020,
  inputgood: 2030,
  inputcapacity: 2031,
  inputfactor: 2032,
  inputsupplier: 2033,
  outputgood: 2040,
  outputcapacity: 2041,
  outputfactor: 2042,
  pax_level: 2050,
  expand_probability: 2070,
  expand_minimum: 2071,
  expand_range: 2072,
  expand_times: 2073,
  electricity_boost: 2080,
  passenger_boost: 2081,
  mail_boost: 2082,
  electricity_amount: 2090,
  passenger_demand: 2100,
  mail_demand: 2101,
  smoke: 2110,
  smoketile: 2111,
  smokeoffset: 2112,
  smokespeed: 2113,
  fields: 2120,
  has_snow: 2121,
  min_fields: 2122,
  max_fields: 2123,
  production_per_field: 2124,
  probability_to_spawn: 2125,
  storage_capacity: 2126,
  spawn_weight: 2127,
  start_fields: 2128,
  // 車両
  waytype: 3000,
  engine_type: 3010,
  freight: 3020,
  payload: 3030,
  speed: 3040,
  gear: 3050,
  weight: 3060,
  power: 3070,
  loading_time: 3080,
  length: 3090,
  sound: 3100,
  constraint: 3110,
  freightimagetype: 3120,
  // 信号
  min_speed: 4000,
  single_way: 4010,
  free_route: 4020,
  is_private: 4030,
  is_signal: 4040,
  is_presignal: 4050,
  is_longblocksignal: 4060,
  is_prioritysignal: 4070,
  end_of_choose: 4080,
  offset_left: 4090,
  // 軌道
  system_type: 5000,
  topspeed: 5010,
  draw_as_ding: 5020,
  max_weight: 5030,
  max_height: 5040,
  max_length: 5050,
  own_waytype: 5060,
  pillar_asymmetric: 5070,
  pillar_distance: 5080,
  // 木
  height: 6000,
  seasons: 6010,
  // 貨物
  metric: 7000,
  catg: 7010,
  value: 7020,
  speed_bonus: 7030,
  weight_per_unit: 7040,
  mapcolor: 7050,
  // その他
  trees_on_top: 8000,
  climates: 8010,
  // カーソル・アイコン
  cursor: 90000,
  icon: 90010,
  // 画像
  image: 90100,
  backimage: 90101,
  frontimage: 90102,
  emptyimage: 90103,
  freightimage: 90104,
  // 斜め
  diagonal: 90200,
  backdiagonal: 90201,
  frontdiagonal: 90202,
  // 傾斜
  imageup: 90300,
  backimageup: 90301,
  frontimageup: 90302,
  imageup2: 90310,
  backimageup2: 90311,
  frontimageup2: 90312,
  // 橋
  backimage2: 90401,
  frontimage2: 90402,
  backramp: 90411,
  frontramp: 90412,
  backramp2: 90421,
  frontramp2: 90422,
  backstart: 90431,
  frontstart: 90432,
  backstart2: 90441,
  frontstart2: 90442,
  backpillar: 90451,
  frontpillar: 90452,
  backpillar2: 90461,
  frontpillar2: 90462,
  // 踏切
  openimage: 90500,
  closedimage: 90501,
  front_openimage: 90510,
  front_closedimage: 90511,
};
