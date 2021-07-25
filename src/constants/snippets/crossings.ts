import { SnippetDefinition } from '../../plugins/interface';
const defs: SnippetDefinition[] = [
  {
    title: '踏切',
    dat: `#https://simutrans-germany.com/wiki/wiki/de_CrossingDef
obj=crossing
name=
copyright=
sound=
# 優先度の低い軌道（道路など）
waytype[0]=
speed[0]=
# 優先度の高い軌道（鉄道など）
waytype[1]=
speed[1]=
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
# 画像
openimage[ns][0]=image.0.0
front_openimage[ns][0]=image.0.0
closedimage[ns][0]=image.0.0
front_closedimage[ns][0]=image.0.0
openimage[ew][0]=image.0.0
front_openimage[ew][0]=image.0.0
closedimage[ew][0]=image.0.0
front_closedimage[ew][0]=image.0.0
`
  },
];
export default defs;
