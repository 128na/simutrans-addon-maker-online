export default [
  {
    name: '自然オブジェクト（静止物）',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_GroundobjDef
obj=tree
name=
copyright=
trees_on_top=1
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
cost
# 任意項目
distributionweight=3
seasons=1
# 画像
image[0][0]=image.0.0
`
  },
  {
    name: '自然オブジェクト（移動物）',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_GroundobjDef
obj=tree
name=
copyright=
trees_on_top=1
speed=
waytype=none
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
cost
# 任意項目
distributionweight=3
seasons=1
# 画像
image[s][0]=image.0.0
image[n][0]=image.0.0
image[e][0]=image.0.0
image[w][0]=image.0.0
image[se][0]=image.0.0
image[nw][0]=image.0.0
image[ne][0]=image.0.0
image[sw][0]=image.0.0
`
  },
];