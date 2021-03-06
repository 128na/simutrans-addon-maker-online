import { SnippetDefinition } from '../../plugins/interface';
const defs: SnippetDefinition[] = [
  {
    title: '建設中画像',
    caption: 'name=Construction',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_MiscDef
obj=misc
name=Construction
image[0]=image.0.0
image[1]=image.0.0
image[2]=image.0.0
image[3]=image.0.0
image[4]=image.0.0
image[5]=image.0.0
image[6]=image.0.0
`
  },
  {
    title: '市内地面タイル',
    caption: 'name=Sidewalk',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_MiscDef
obj=misc
name=Sidewalk
image[0][0]=image.0.0
image[1][0]=image.0.1
image[2][0]=image.0.2
image[3][0]=image.0.3
image[4][0]=image.0.4
image[5][0]=image.0.5
image[6][0]=image.0.6
image[7][0]=image.0.7
image[8][0]=image.0.8
image[9][0]=image.0.9
image[10][0]=image.0.10
image[11][0]=image.0.11
image[12][0]=image.0.12
image[13][0]=image.0.13
image[14][0]=image.0.14
`
  },
  {
    title: 'トンネル内地面タイル',
    caption: 'name=TunnelTexture',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_MiscDef
obj=misc
name=TunnelTexture
image[0][0]=image.0.0
image[1][0]=image.0.1
image[2][0]=image.0.2
image[3][0]=image.0.3
image[4][0]=image.0.4
image[5][0]=image.0.5
image[6][0]=image.0.6
image[7][0]=image.0.7
image[8][0]=image.0.8
image[9][0]=image.0.9
image[10][0]=image.0.10
image[11][0]=image.0.11
image[12][0]=image.0.12
`
  },
  {
    title: '変電所',
    caption: 'name=PowerSource',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_MiscDef
obj=misc
name=PowerSource
image[0][0]=image.0.0
image[1][0]=image.0.1
image[2][0]=image.0.2
image[3][0]=image.0.3
# メニューアイコン
image[4][0]=> image.0.4
# カーソル
image[5][0]=> image.0.5
`
  },
  {
    title: '変電所',
    caption: 'name=PowerDest',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_MiscDef
obj=misc
name=PowerDest
image[0][0]=image.0.0
image[1][0]=image.0.1
image[2][0]=image.0.2
image[3][0]=image.0.3
`
  },
];
export default defs;
