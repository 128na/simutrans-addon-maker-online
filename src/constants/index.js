// https://github.com/aburch/simutrans/blob/master/descriptor/objversion.h
export const OBJS = [
  { value: 'bridge', text: '橋', desc: '地上の地形に影響されないません。', link: 'https://simutrans-germany.com/wiki/wiki/de_BridgeDef' },
  { value: 'building', text: '建物', desc: '市内建築物や駅舎など様々な建物。', link: 'https://simutrans-germany.com/wiki/wiki/de_BuildingsDef' },
  { value: 'citycar', text: '自家用車', desc: '市内を徘徊する良き市民の車。', link: 'https://simutrans-germany.com/wiki/wiki/de_CitycarsDef' },
  { value: 'crossing', text: '踏切', desc: '種類の異なるway同士の平面交差。', link: 'https://simutrans-germany.com/wiki/wiki/de_CrossingDef' },
  { value: 'cursor', text: 'カーソル', desc: 'ゲーム内で表示されるカーソルアイコン。', link: 'https://simutrans-germany.com/wiki/wiki/de_CursorDef' },
  { value: 'factory', text: '産業', desc: '発電所や産業施設。', link: 'https://simutrans-germany.com/wiki/wiki/de_FactoryDef' },
  { value: 'field', text: '産業フィールド', desc: '発電所や産業施設に付随する建物（畑など）。', link: 'https://simutrans-germany.com/wiki/wiki/tiki-index.php?page=en_FactoryDef#felder' },
  { value: 'good', text: '貨物', desc: '旅客や各種貨物などの定義です。', link: 'https://simutrans-germany.com/wiki/wiki/de_GoodsDef' },
  { value: 'ground', text: '地上', desc: '地面テクスチャ。', link: 'https://simutrans-germany.com/wiki/wiki/de_GroundDef' },
  { value: 'groundobj', text: '地上オブジェクト', desc: '地表のオブジェクト。', link: 'https://simutrans-germany.com/wiki/wiki/de_GroundobjDef' },
  { value: 'menu', text: 'メニュー', desc: 'メニューアイコン。', link: 'https://simutrans-germany.com/wiki/wiki/de_oldMenuDef' },
  { value: 'misc', text: 'その他', desc: '市内道路の側道やトンネル背景など。', link: 'https://simutrans-germany.com/wiki/wiki/de_MiscDef' },
  { value: 'pedestrian', text: '歩行者', desc: '駅から湧き出る良き市民。', link: 'https://simutrans-germany.com/wiki/wiki/de_PedestrianDef' },
  { value: 'roadsign', text: '標識', desc: '道路標識や鉄道信号など。', link: 'https://simutrans-germany.com/wiki/wiki/de_SignalsDef' },
  { value: 'smoke', text: '煙', desc: 'SLや工場の煙。', link: 'https://simutrans-germany.com/wiki/wiki/de_SmokeDef' },
  { value: 'symbol', text: 'シンボル', desc: '起動時のロゴやUIアイコン。', link: 'https://simutrans-germany.com/wiki/wiki/de_SymbolDef' },
  { value: 'tree', text: '樹木', desc: '自生している木。', link: 'https://simutrans-germany.com/wiki/wiki/de_TreeDef' },
  { value: 'tunnel', text: 'トンネル', desc: 'トンネル。', link: 'https://simutrans-germany.com/wiki/wiki/de_TunnelDef' },
  { value: 'vehicle', text: '車両', desc: 'プレーヤーが管理できる車両。', link: 'https://simutrans-germany.com/wiki/wiki/de_VehicleDef' },
  { value: 'way', text: '軌道', desc: '道路や線路、運河など。', link: 'https://simutrans-germany.com/wiki/wiki/de_WayDef' },
  { value: 'way_obj', text: '軌道オブジェクト', desc: '軌道上の架線など。', link: 'https://simutrans-germany.com/wiki/wiki/de_WayobjectsDef' },
];

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

export const SNIPPETS = [
  {
    title: '建物 (building)', snippets: [
      ...buildings,
    ]
  },
  {
    title: '車両 (vehicle, citycar)', snippets: [
      ...vehicles,
      ...citycars,
    ]
  },
  {
    title: '軌道 (way, tunnel, bridge)', snippets: [
      ...ways,
      ...tunnels,
      ...bridges,
    ]
  },
  {
    title: '軌道関連 (way-object, crossing, signal)', snippets: [
      ...wayobjects,
      ...crossings,
      ...signals,
    ]
  },
  {
    title: '産業 (factory, field, smoke, good)', snippets: [
      ...factories,
      ...fields,
      ...smokes,
      ...goods,
    ]
  },
  {
    title: '地形 (tree, groundObj, ground)', snippets: [
      ...trees,
      ...groundobjs,
      ...grounds,
    ]
  },
  {
    title: 'その他 (pedestrian, misc)', snippets: [
      ...pedestrians,
      ...miscs,
    ]
  },
  {
    title: 'その他 (menu, symbol, cursor, windowSkin)', snippets: [
      ...menus,
      ...symbols,
      ...cursors,
      ...windowskins,
    ]
  }
];