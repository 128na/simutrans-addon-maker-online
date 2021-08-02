import buildings from './snippets/buildings';
import citycars from './snippets/citycars';
import factories from './snippets/factories';
import fields from './snippets/fields';
import goods from './snippets/goods';
import smokes from './snippets/smokes';
import vehicles from './snippets/vehicles';
import tunnels from './snippets/tunnels';
import bridges from './snippets/bridges';
import ways from './snippets/ways';
import wayobjects from './snippets/wayobjects';
import signals from './snippets/signals';
import trees from './snippets/trees';
import groundobjs from './snippets/groundobjs';
import crossings from './snippets/crossings';
import pedestrians from './snippets/pedestrians';
import cursors from './snippets/cursors';
import grounds from './snippets/grounds';
import menus from './snippets/menus';
import miscs from './snippets/miscs';
import symbols from './snippets/symbols';
import windowskins from './snippets/windowskins';
import { SnippetDefinitionList } from '../plugins/interface';

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
const PAK_64 = '64';
const PAK_128 = '128';
const PAK_128JP = '128jp';

export const PAKSETS = [
  { value: PAK_64, label: 'pak64' },
  { value: PAK_128, label: 'pak128' },
  { value: PAK_128JP, label: 'pak128.Japan' },
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
  { size: 64, pak: '64', value: 'Steam', label: '蒸気機関車、蒸気船用' },
  { size: 64, pak: '64', value: 'Diesel', label: 'ディーゼル車用' },
  { size: 128, pak: '128', value: 'Diesel', label: 'ディーゼル (白煙)' },
  { size: 128, pak: '128', value: 'Diesel_black', label: 'ディーゼル (黒煙)' },
  { size: 128, pak: '128', value: 'Diesel_small', label: 'ディーゼル (小型機関車用)' },
  { size: 128, pak: '128', value: 'Steam', label: '蒸気機関車用 (黒煙のみ)' },
  { size: 128, pak: '128', value: 'Steam2', label: '蒸気機関車用 (黒煙+ピストンの蒸気)' },
  { size: 128, pak: '128', value: 'Steam_ship', label: '蒸気船用 (白煙)' },
]

// 貨物一覧
// https://japanese.simutrans.com/index.php?cmd=read&page=%A5%A2%A5%C9%A5%AA%A5%F3%B3%AB%C8%AF%2Fdat%A5%D5%A5%A1%A5%A4%A5%EB%B5%AD%BD%D2%A5%EA%A5%D5%A5%A1%A5%EC%A5%F3%A5%B9%2Fgoods%28%B2%DF%CA%AA%29
export const FREIGHTS = [
  { size: 64, pak: '64', catg: null, cat_name: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '0', metric: '' },
  { size: 64, pak: '64', catg: null, cat_name: '専用貨物', label: '旅客', name: 'Passagiere', value: '0.45', speed_bonus: '15', weight_per_unit: '75', metric: '' },
  { size: 64, pak: '64', catg: null, cat_name: '専用貨物', label: '郵便', name: 'Post', value: '0.55', speed_bonus: '15', weight_per_unit: '50', metric: 'sack' },
  { size: 64, pak: '64', catg: 0, cat_name: '専用貨物', label: '自動車', name: 'Autos', value: '3.8', speed_bonus: '5', weight_per_unit: '1800', metric: '' },
  { size: 64, pak: '64', catg: 0, cat_name: '専用貨物', label: '紙', name: 'Papier', value: '1.2', speed_bonus: '4', weight_per_unit: '2500', metric: 'rolls' },
  { size: 64, pak: '64', catg: 0, cat_name: '専用貨物', label: '鉄鋼', name: 'Stahl', value: '1.6', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 0, cat_name: '専用貨物', label: 'ミルク', name: 'milk', value: '0.9', speed_bonus: '9', weight_per_unit: '100', metric: 'm3' },
  { size: 64, pak: '64', catg: 0, cat_name: '専用貨物', label: 'ゴミ', name: 'waste', value: '0.24', speed_bonus: '0', weight_per_unit: '500', metric: 'm3' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: '書籍', name: 'Buecher', value: '3.3', speed_bonus: '3', weight_per_unit: '250', metric: 'paletten' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: '化学製品', name: 'Chemicals', value: '2.7', speed_bonus: '5', weight_per_unit: '300', metric: 'paletten' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: 'ALCパネル', name: 'Concrete', value: '1.3', speed_bonus: '8', weight_per_unit: '1000', metric: 'm3' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: '薬', name: 'Medicine', value: '3.9', speed_bonus: '8', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: '家具', name: 'Moebel', value: '3.6', speed_bonus: '3', weight_per_unit: '200', metric: 'paletten' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: '印刷インク', name: 'PrintersInk', value: '6.3', speed_bonus: '12', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: '缶詰', name: 'canned_food', value: '2.7', speed_bonus: '2', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: 'ビール', name: 'beer', value: '2.85', speed_bonus: '9', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: '64', catg: 1, cat_name: '混載貨物', label: '小麦粉', name: 'flour', value: '2.55', speed_bonus: '7', weight_per_unit: '100', metric: 'sack' },
  { size: 64, pak: '64', catg: 2, cat_name: 'ばら荷貨物', label: '鉄鉱石', name: 'Eisenerz', value: '1.95', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 2, cat_name: 'ばら荷貨物', label: '石炭', name: 'Kohle', value: '2.1', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 2, cat_name: 'ばら荷貨物', label: '砂', name: 'Sand', value: '1.5', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 2, cat_name: 'ばら荷貨物', label: '石', name: 'Stone', value: '1.5', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 2, cat_name: 'ばら荷貨物', label: '穀物', name: 'grain', value: '1.4', speed_bonus: '5', weight_per_unit: '100', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 3, cat_name: '石油類', label: 'ガソリン', name: 'Gasoline', value: '5.1', speed_bonus: '4', weight_per_unit: '860', metric: 'm3' },
  { size: 64, pak: '64', catg: 3, cat_name: '石油類', label: '石油', name: 'Oel', value: '2.1', speed_bonus: '3', weight_per_unit: '900', metric: 'm3' },
  { size: 64, pak: '64', catg: 4, cat_name: '低温貨物', label: '食品', name: 'food', value: '6.6', speed_bonus: '14', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: '64', catg: 4, cat_name: '低温貨物', label: '肉', name: 'meat', value: '8.7', speed_bonus: '8', weight_per_unit: '100', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 4, cat_name: '低温貨物', label: '魚肉', name: 'fish', value: '9.3', speed_bonus: '7', weight_per_unit: '100', metric: 'paletten' },
  { size: 64, pak: '64', catg: 6, cat_name: '長物貨物', label: '板材', name: 'Bretter', value: '1.52', speed_bonus: '4', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 6, cat_name: '長物貨物', label: '木材', name: 'Holz', value: '1.85', speed_bonus: '2', weight_per_unit: '850', metric: 'tonnen' },
  { size: 64, pak: '64', catg: 7, cat_name: 'ペレット/粉体貨物', label: 'セメント', name: 'Cement', value: '1', speed_bonus: '3', weight_per_unit: '1000', metric: 'm3' },
  { size: 64, pak: '64', catg: 7, cat_name: 'ペレット/粉体貨物', label: 'プラスチック', name: 'Plastik', value: '0.7', speed_bonus: '4', weight_per_unit: '500', metric: 'm3' },
  { size: 128, pak: '128', catg: null, cat_name: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '1', metric: '' },
  { size: 128, pak: '128', catg: null, cat_name: '専用貨物', label: '旅客', name: 'Passagiere', value: '14', speed_bonus: '18', weight_per_unit: '85', metric: '' },
  { size: 128, pak: '128', catg: null, cat_name: '専用貨物', label: '郵便', name: 'Post', value: '16', speed_bonus: '15', weight_per_unit: '50', metric: 'sack' },
  { size: 128, pak: '128', catg: 0, cat_name: '専用貨物', label: 'セメント', name: 'Cement', value: '40', speed_bonus: '5', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 0, cat_name: '専用貨物', label: 'コンクリート', name: 'Concrete', value: '80', speed_bonus: '10', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 0, cat_name: '専用貨物', label: '鉄鋼', name: 'Stahl', value: '25', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 0, cat_name: '専用貨物', label: '自動車', name: 'Autos', value: '170', speed_bonus: '15', weight_per_unit: '1800', metric: '' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '綿花', name: 'cotton', value: '40', speed_bonus: '0', weight_per_unit: '200', metric: 'sack' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '雑貨', name: 'goods_', value: '45', speed_bonus: '15', weight_per_unit: '250', metric: 'paletten' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '織物', name: 'textile', value: '45', speed_bonus: '12', weight_per_unit: '250', metric: 'paletten' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: 'ウール', name: 'wool', value: '45', speed_bonus: '2', weight_per_unit: '250', metric: 'sack' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '電化製品', name: 'electronics', value: '55', speed_bonus: '15', weight_per_unit: '300', metric: 'paletten' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '家具', name: 'Moebel', value: '50', speed_bonus: '12', weight_per_unit: '300', metric: 'paletten' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: 'ビール', name: 'beer', value: '50', speed_bonus: '8', weight_per_unit: '800', metric: 'paletten' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '書籍', name: 'Bucher', value: '50', speed_bonus: '8', weight_per_unit: '900', metric: 'paletten' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '小麦粉', name: 'flour', value: '40', speed_bonus: '3', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '紙', name: 'Papier', value: '30', speed_bonus: '5', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: 'プラスチック', name: 'Plastik', value: '40', speed_bonus: '4', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: '缶詰', name: 'canned_food', value: '40', speed_bonus: '3', weight_per_unit: '1100', metric: 'paletten' },
  { size: 128, pak: '128', catg: 1, cat_name: '混載貨物', label: 'ガラス', name: 'glass', value: '45', speed_bonus: '2', weight_per_unit: '1300', metric: 'paletten' },
  { size: 128, pak: '128', catg: 2, cat_name: 'ばら荷貨物', label: '鉄鉱石', name: 'Eisenerz', value: '32', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 2, cat_name: 'ばら荷貨物', label: '肥料', name: 'fertilizer', value: '37', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 2, cat_name: 'ばら荷貨物', label: '石炭', name: 'Kohle', value: '32', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 2, cat_name: 'ばら荷貨物', label: '砂', name: 'Sand', value: '34', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 2, cat_name: 'ばら荷貨物', label: '石', name: 'Stone', value: '34', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 2, cat_name: 'ばら荷貨物', label: '廃棄物', name: 'waste', value: '39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 3, cat_name: '石油類', label: '化学薬品', name: 'Chemicals', value: '40', speed_bonus: '8', weight_per_unit: '700', metric: 'm3' },
  { size: 128, pak: '128', catg: 3, cat_name: '石油類', label: 'バイオエタノール', name: 'Ethanol', value: '53', speed_bonus: '6', weight_per_unit: '780', metric: 'm3' },
  { size: 128, pak: '128', catg: 3, cat_name: '石油類', label: 'ガソリン', name: 'Gasoline', value: '40', speed_bonus: '4', weight_per_unit: '860', metric: 'm3' },
  { size: 128, pak: '128', catg: 3, cat_name: '石油類', label: '原油', name: 'Oel', value: '35', speed_bonus: '0', weight_per_unit: '900', metric: 'm3' },
  { size: 128, pak: '128', catg: 4, cat_name: '低温貨物', label: '食品', name: 'food', value: '70', speed_bonus: '18', weight_per_unit: '300', metric: 'paletten' },
  { size: 128, pak: '128', catg: 4, cat_name: '低温貨物', label: '魚肉', name: 'fish', value: '45', speed_bonus: '15', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 4, cat_name: '低温貨物', label: '肉', name: 'meat', value: '50', speed_bonus: '18', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 5, cat_name: '飲料', label: 'ミルク', name: 'milk', value: '50', speed_bonus: '15', weight_per_unit: '1000', metric: 'm3' },
  { size: 128, pak: '128', catg: 6, cat_name: '長物貨物', label: '板材', name: 'Bretter', value: '40', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 6, cat_name: '長物貨物', label: '木材', name: 'Holz', value: '50', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 7, cat_name: '繊維農作物', label: '穀物', name: 'grain', value: '35', speed_bonus: '5', weight_per_unit: '300', metric: 'tonnen' },
  { size: 128, pak: '128', catg: 7, cat_name: '繊維農作物', label: 'トウモロコシ', name: 'corn', value: '40', speed_bonus: '3', weight_per_unit: '350', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: null, cat_name: '専用貨物', label: 'None', name: 'None', value: '0', speed_bonus: '0', weight_per_unit: '0', metric: '' },
  { size: 128, pak: '128jp', catg: null, cat_name: '専用貨物', label: '二等旅客', name: 'Passagiere', value: '0.3', speed_bonus: '10', weight_per_unit: '60', metric: 'nin' },
  { size: 128, pak: '128jp', catg: null, cat_name: '専用貨物', label: '一等旅客', name: 'Post', value: '0.9', speed_bonus: '15', weight_per_unit: '60', metric: 'nin' },
  { size: 128, pak: '128jp', catg: 0, cat_name: '専用貨物', label: '木材チップ', name: 'woodchip', value: '0.63', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 0, cat_name: '専用貨物', label: '化成品', name: 'Chemicals0', value: '0.7', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 0, cat_name: '専用貨物', label: '鉄鋼', name: 'Stahl0', value: '0.45', speed_bonus: '2', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 1, cat_name: 'ばら積み貨物', label: '石炭（未使用）', name: 'Kohle', value: '1.5', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 1, cat_name: 'ばら積み貨物', label: '石炭', name: 'Kohle1', value: '0.3', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 1, cat_name: 'ばら積み貨物', label: '鉄鉱石', name: 'Eisenerz1', value: '0.39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 2, cat_name: '小口混載貨物', label: '玄米', name: 'genmai2', value: '0.06', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 2, cat_name: '小口混載貨物', label: '白米（小口混載）', name: 'hakumai2', value: '0.08', speed_bonus: '5', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 2, cat_name: '小口混載貨物', label: '日本酒（小口混載）', name: 'sake2', value: '0.09', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 2, cat_name: '小口混載貨物', label: '野菜（農協へ、小口混載）', name: 'vegetableA2', value: '0.09', speed_bonus: '3', weight_per_unit: '80', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 2, cat_name: '小口混載貨物', label: '野菜（需要先へ、小口混載）', name: 'vegetableB2', value: '0.09', speed_bonus: '3', weight_per_unit: '80', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 2, cat_name: '小口混載貨物', label: '生活雑貨（小口混載）', name: 'household_goods2', value: '0.12', speed_bonus: '1', weight_per_unit: '60', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 2, cat_name: '小口混載貨物', label: '本（小口混載）', name: 'Bucher2', value: '0.1', speed_bonus: '1', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 2, cat_name: '小口混載貨物', label: '新聞（小口混載）', name: 'newspaper2', value: '0.08', speed_bonus: '8', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '玄米（未使用）', name: 'genmai', value: '0.1', speed_bonus: '2', weight_per_unit: '1000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '白米（パレット）', name: 'hakumai3', value: '0.8', speed_bonus: '5', weight_per_unit: '1000', metric: 'paletten' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '日本酒（未使用）', name: 'sake', value: '0.2', speed_bonus: '2', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '日本酒（パレット）', name: 'sake3', value: '0.9', speed_bonus: '2', weight_per_unit: '1000', metric: 'paletten' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '紙（パレット）', name: 'Papier3', value: '1.2', speed_bonus: '1', weight_per_unit: '1000', metric: 'paletten' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: 'プラスチックペレット（パレット）', name: 'Plastik3', value: '1', speed_bonus: '2', weight_per_unit: '500', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '野菜（需要先へ、パレット）', name: 'vegetableB3', value: '0.9', speed_bonus: '3', weight_per_unit: '800', metric: 'paletten' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '生活雑貨（パレット）', name: 'household_goods3', value: '1.2', speed_bonus: '1', weight_per_unit: '600', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '本（パレット）', name: 'Bucher3', value: '1', speed_bonus: '1', weight_per_unit: '1000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 3, cat_name: 'パレット輸送貨物', label: '新聞（パレット）', name: 'newspaper3', value: '1.2', speed_bonus: '8', weight_per_unit: '1000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '白米（国鉄／JRコンテナ）', name: 'hakumai4', value: '4.8', speed_bonus: '5', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '日本酒（国鉄／JRコンテナ）', name: 'sake4', value: '5.4', speed_bonus: '2', weight_per_unit: '6000', metric: 'paletten' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '紙（国鉄／JRコンテナ）', name: 'Papier4', value: '7.2', speed_bonus: '1', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '野菜（需要先へ、国鉄／JRコンテナ）', name: 'vegetableB4', value: '5.4', speed_bonus: '3', weight_per_unit: '4800', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '生活雑貨（国鉄／JRコンテナ）', name: 'household_goods4', value: '7.2', speed_bonus: '1', weight_per_unit: '3600', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '本（国鉄／JRコンテナ）', name: 'Bucher4', value: '6', speed_bonus: '1', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '新聞（国鉄／JRコンテナ）', name: 'newspaper4', value: '8.4', speed_bonus: '8', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '魚（需要先へ、国鉄／JRコンテナ）', name: 'fishB4', value: '2.52', speed_bonus: '8', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 4, cat_name: '国鉄／JRコンテナ貨物', label: '水産加工品（国鉄／JRコンテナ）', name: 'processed_fish4', value: '9', speed_bonus: '5', weight_per_unit: '6000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 5, cat_name: 'ISOコンテナ貨物', label: '化成品（ISOコンテナ貨物）', name: 'Chemicals5', value: '10', speed_bonus: '2', weight_per_unit: '16000', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 6, cat_name: '小荷物', label: '新聞（小荷物）', name: 'newspaper6', value: '0.12', speed_bonus: '8', weight_per_unit: '100', metric: 'ko' },
  { size: 128, pak: '128jp', catg: 7, cat_name: '石油類', label: '原油', name: 'Oel7', value: '0.45', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 7, cat_name: '石油類', label: 'ガソリン（製油所→油槽所）', name: 'GasolineA7', value: '0.54', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 7, cat_name: '石油類', label: 'ガソリン（油槽所→需要先）', name: 'GasolineB7', value: '0.54', speed_bonus: '1', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 8, cat_name: '長物貨物', label: '木材', name: 'Holz', value: '0.36', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 8, cat_name: '長物貨物', label: '材木', name: 'Bretter', value: '0.39', speed_bonus: '0', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 12, cat_name: '冷蔵加工食品', label: '水産加工品（冷蔵加工食品）', name: 'processed_fish12', value: '12.15', speed_bonus: '5', weight_per_unit: '100', metric: 'crate' },
  { size: 128, pak: '128jp', catg: 12, cat_name: '冷蔵加工食品', label: '弁当（冷蔵加工食品）', name: 'bento12', value: '0.18', speed_bon12s: '5', weight_per_unit: '100', metric: 'crate' },
  { size: 128, pak: '128jp', catg: 13, cat_name: '鮮魚', label: '魚（市場へ）', name: 'fishA13', value: '0.42', speed_bonus: '8', weight_per_unit: '1000', metric: 'tonnen' },
  { size: 128, pak: '128jp', catg: 13, cat_name: '鮮魚', label: '魚（需要先へ、鮮魚）', name: 'fishB13', value: '0.42', speed_bonus: '8', weight_per_unit: '1000', metric: 'tonnen' },
];