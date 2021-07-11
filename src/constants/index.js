// https://github.com/aburch/simutrans/blob/master/descriptor/objversion.h
export const OBJS = [
  { value: 'bridge', text: '橋', desc: '地上の地形に影響されないません。', link: 'https://simutrans-germany.com/wiki/wiki/en_BridgeDef?page_ref_id=471' },
  { value: 'building', text: '建物', desc: '市内建築物や駅舎など様々な建物。', link: 'https://simutrans-germany.com/wiki/wiki/en_BuildingsDef?page_ref_id=465' },
  { value: 'citycar', text: '自家用車', desc: '市内を徘徊する良き市民の車。', link: 'https://simutrans-germany.com/wiki/wiki/en_CitycarsDef?page_ref_id=468' },
  { value: 'crossing', text: '踏切', desc: '種類の異なるway同士の平面交差。', link: 'https://simutrans-germany.com/wiki/wiki/en_CrossingDef?page_ref_id=477' },
  { value: 'cursor', text: 'カーソル', desc: 'ゲーム内で表示されるカーソルアイコン。', link: 'https://simutrans-germany.com/wiki/wiki/en_CursorDef?page_ref_id=480' },
  { value: 'factory', text: '産業', desc: '発電所や産業施設。', link: 'https://simutrans-germany.com/wiki/wiki/en_FactoryDef' },
  { value: 'field', text: '産業フィールド', desc: '発電所や産業施設に付随する建物（畑など）。', link: 'https://simutrans-germany.com/wiki/wiki/tiki-index.php?page=en_FactoryDef#felder' },
  { value: 'good', text: '貨物', desc: '旅客や各種貨物などの定義です。', link: 'https://simutrans-germany.com/wiki/wiki/en_GoodsDef?page_ref_id=469' },
  { value: 'ground', text: '地上', desc: '地面テクスチャ。', link: 'https://simutrans-germany.com/wiki/wiki/en_GroundDef?page_ref_id=1731' },
  { value: 'groundobj', text: '地上オブジェクト', desc: '地表のオブジェクト。', link: 'https://simutrans-germany.com/wiki/wiki/en_GroundobjDef?page_ref_id=476' },
  { value: 'menu', text: 'メニュー', desc: 'メニューアイコン。', link: 'https://simutrans-germany.com/wiki/wiki/en_oldMenuDef?page_ref_id=482' },
  { value: 'misc', text: 'その他', desc: '市内道路の側道やトンネル背景など。', link: 'https://simutrans-germany.com/wiki/wiki/en_MiscDef?page_ref_id=485' },
  { value: 'pedestrian', text: '歩行者', desc: '駅から湧き出る良き市民。', link: 'https://simutrans-germany.com/wiki/wiki/en_PedestrianDef?page_ref_id=478' },
  { value: 'roadsign', text: '標識', desc: '道路標識や鉄道信号など。', link: 'https://simutrans-germany.com/wiki/wiki/en_SignalsDef?page_ref_id=474' },
  { value: 'smoke', text: '煙', desc: 'SLや工場の煙。', link: 'https://simutrans-germany.com/wiki/wiki/en_SmokeDef' },
  { value: 'symbol', text: 'シンボル', desc: '起動時のロゴやUIアイコン。', link: 'https://simutrans-germany.com/wiki/wiki/en_SymbolDef' },
  { value: 'tree', text: '樹木', desc: '自生している木。', link: 'https://simutrans-germany.com/wiki/wiki/en_TreeDef?page_ref_id=475' },
  { value: 'tunnel', text: 'トンネル', desc: '山屋改定を貫くトンネル。', link: 'https://simutrans-germany.com/wiki/wiki/en_TunnelDef?page_ref_id=470' },
  { value: 'vehicle', text: '車両', desc: 'プレーヤーが管理できる車両。', link: 'https://simutrans-germany.com/wiki/wiki/en_VehicleDef?page_ref_id=467' },
  { value: 'way', text: '軌道', desc: '道路や線路、運河など。', link: 'https://simutrans-germany.com/wiki/wiki/en_WayDef?page_ref_id=472' },
  { value: 'way_obj', text: '軌道オブジェクト', desc: '軌道上の架線など。', link: 'https://simutrans-germany.com/wiki/wiki/en_WayobjectsDef?page_ref_id=473' },
];

import buildings from './snippets/buildings';
export const SNIPPETS = [
  { name: '建物', snippets: buildings },
  { name: '車両', snippets: [] }
];