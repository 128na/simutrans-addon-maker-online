import { SnippetDefinition } from '../../plugins/interface';
const defs: SnippetDefinition[] = [
  {
    title: '架線',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_SmokeDef
obj=way-object
name=
copyright=
waytype=
cost=
maintenance=
topspeed=
own_waytype=
draw_as_ding=1
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
# 画像
cursor=> image.0.0
icon=> image.0.0
backimage[s]=image.0.0
backimage[w]=image.0.0
backimage[n]=image.0.0
backimage[e]=image.0.0
backimage[ns]=image.0.0
backimage[ew]=image.0.0
backimage[se]=image.0.0
backimage[sw]=image.0.0
backimage[nw]=image.0.0
backimage[ne]=image.0.0
backimage[new]=image.0.0
backimage[nse]=image.0.0
backimage[sew]=image.0.0
backimage[nsw]=image.0.0
backimage[nsew]=image.0.0
backimage[-]=image.0.0
frontimage[s]=image.0.0
frontimage[w]=image.0.0
frontimage[n]=image.0.0
frontimage[e]=image.0.0
frontimage[ns]=image.0.0
frontimage[ew]=image.0.0
frontimage[se]=image.0.0
frontimage[sw]=image.0.0
frontimage[nw]=image.0.0
frontimage[ne]=image.0.0
frontimage[new]=image.0.0
frontimage[nse]=image.0.0
frontimage[sew]=image.0.0
frontimage[nsw]=image.0.0
frontimage[nsew]=image.0.0
frontimage[-]=image.0.0
# 斜め方向
backdiagonal[sw]=image.0.0
backdiagonal[nw]=image.0.0
backdiagonal[ne]=image.0.0
backdiagonal[se]=image.0.0
frontdiagonal[sw]=image.0.0
frontdiagonal[nw]=image.0.0
frontdiagonal[ne]=image.0.0
frontdiagonal[se]=image.0.0
# 通常坂（高低差１）
backimageUp[3]=image.0.0
backimageUp[6]=image.0.0
backimageUp[9]=image.0.0
backimageUp[12]=image.0.0
frontimageUp[3]=image.0.0
frontimageUp[6]=image.0.0
frontimageUp[9]=image.0.0
frontimageUp[12]=image.0.0
# 緩急坂（高低差２）
backimageUp2[3]=image.0.0
backimageUp2[6]=image.0.0
backimageUp2[9]=image.0.0
backimageUp2[12]=image.0.0
frontimageUp2[3]=image.0.0
frontimageUp2[6]=image.0.0
frontimageUp2[9]=image.0.0
frontimageUp2[12]=image.0.0
`
  },
];
export default defs;
