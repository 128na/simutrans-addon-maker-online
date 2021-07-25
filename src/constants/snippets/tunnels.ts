import { SnippetDefinition } from '../../plugins/interface';
const defs: SnippetDefinition[] = [
  {
    title: 'トンネル',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_TunnelDef
obj=tunnel
name=
copyright=
waytype=
cost=
maintenance=
topspeed=
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
way=
# 画像
cursor=> image.0.0
icon=> image.0.0
backimage[n][0]=image.0.0
frontimage[n][0]=image.0.0
backimage[s][0]=image.0.0
frontimage[s][0]=image.0.0
backimage[e][0]=image.0.0
frontimage[e][0]=image.0.0
backimage[w][0]=image.0.0
frontimage[w][0]=image.0.0
    `
  },
  {
    title: 'トンネル（複線対応）',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_TunnelDef
obj=tunnel
name=
copyright=
waytype=
cost=
maintenance=
topspeed=
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
way=
# 画像
cursor=> image.0.0
icon=> image.0.0
# 単線
backimage[n][0]=image.0.0
frontimage[n][0]=image.0.0
backimage[s][0]=image.0.0
frontimage[s][0]=image.0.0
backimage[e][0]=image.0.0
frontimage[e][0]=image.0.0
backimage[w][0]=image.0.0
frontimage[w][0]=image.0.0
# 複線左端
backimage[nl][0]=image.0.0
frontimage[nl][0]=image.0.0
backimage[sl][0]=image.0.0
frontimage[sl][0]=image.0.0
backimage[el][0]=image.0.0
frontimage[el][0]=image.0.0
backimage[wl][0]=image.0.0
frontimage[wl][0]=image.0.0
# 複線中央
backimage[nm][0]=image.0.0
frontimage[nm][0]=image.0.0
backimage[sm][0]=image.0.0
frontimage[sm][0]=image.0.0
backimage[em][0]=image.0.0
frontimage[em][0]=image.0.0
backimage[wm][0]=image.0.0
frontimage[wm][0]=image.0.0
# 複線右端
backimage[nr][0]=image.0.0
frontimage[nr][0]=image.0.0
backimage[sr][0]=image.0.0
frontimage[sr][0]=image.0.0
backimage[er][0]=image.0.0
frontimage[er][0]=image.0.0
backimage[wr][0]=image.0.0
frontimage[wr][0]=image.0.0
    `
  },
];
export default defs;
