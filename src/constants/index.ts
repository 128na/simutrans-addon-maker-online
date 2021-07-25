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