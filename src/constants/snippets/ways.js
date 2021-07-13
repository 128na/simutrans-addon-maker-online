export default [
  {
    name: ' 道路',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_WayDef
obj=way
name=
copyright=
waytype=road
system_type=
cost=
maintenance=
topspeed=
draw_as_ding=1
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
# 画像
cursor=> image.0.0
icon=> image.0.0
image[s]=image.0.0
image[w]=image.0.0
image[n]=image.0.0
image[e]=image.0.0
image[ns]=image.0.0
image[ew]=image.0.0
image[se]=image.0.0
image[sw]=image.0.0
image[nw]=image.0.0
image[ne]=image.0.0
image[new]=image.0.0
image[nse]=image.0.0
image[sew]=image.0.0
image[nsw]=image.0.0
image[nsew]=image.0.0
image[-]=image.0.0
# 斜め方向
diagonal[sw]=image.0.0
diagonal[nw]=image.0.0
diagonal[ne]=image.0.0
diagonal[se]=image.0.0
# 通常坂（高低差１）
imageup[12]=image.0.0
imageup[9]=image.0.0
imageup[3]=image.0.0
imageup[6]=image.0.0
# 緩急坂（高低差２）
imageup2[12]=image.0.0
imageup2[9]=image.0.0
imageup2[3]=image.0.0
imageup2[6]=image.0.0
    `
  },
  {
    name: ' 軌道（ポイント切替対応）',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_WayDef
obj=way
name=
copyright=
waytype=
system_type=
cost=
maintenance=
topspeed=
draw_as_ding=1
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
# 画像
cursor=> image.0.0
icon=> image.0.0
image[s]=image.0.0
image[w]=image.0.0
image[n]=image.0.0
image[e]=image.0.0
image[ns]=image.0.0
image[ew]=image.0.0
image[se]=image.0.0
image[sw]=image.0.0
image[nw]=image.0.0
image[ne]=image.0.0
image[new]=image.0.0
image[nse]=image.0.0
image[sew]=image.0.0
image[nsw]=image.0.0
image[nsew]=image.0.0
image[-]=image.0.0
# 斜め方向
diagonal[sw]=image.0.0
diagonal[nw]=image.0.0
diagonal[ne]=image.0.0
diagonal[se]=image.0.0
# 通常坂（高低差１）
imageup[12]=image.0.0
imageup[9]=image.0.0
imageup[3]=image.0.0
imageup[6]=image.0.0
# 緩急坂（高低差２）
imageup2[12]=image.0.0
imageup2[9]=image.0.0
imageup2[3]=image.0.0
imageup2[6]=image.0.0
# ポイント切替画像（任意）
image[nse1]=image.0.0
image[nsw1]=image.0.0
image[new1]=image.0.0
image[sew1]=image.0.0
image[nsew1]=image.0.0
image[nse2]=image.0.0
image[nsw2]=image.0.0
image[new2]=image.0.0
image[sew2]=image.0.0
image[nsew2]=image.0.0
    `
  },
];