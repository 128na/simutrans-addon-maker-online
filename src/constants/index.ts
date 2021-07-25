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