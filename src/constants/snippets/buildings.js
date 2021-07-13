export default [
  {
    name: '駅舎、プラットフォーム、停留所など',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_BuildingsDef
obj=building
name=
copyright=
# stop, extension, depot, habour
type=extension
waytype=
enables_pax=1
enables_post=0
enables_ware=0
dims=1,1,1
level=
noinfo=1
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
needs_ground=1
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
animation_time=300
allow_underground=2
# 画像
cursor=> image.0.0
icon=> image.0.0
backimage[0][0][0][0][0]=image.0.0
frontimage[0][0][0][0][0]=image.0.0
`
  },
  {
    name: '市内建築物',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_BuildingsDef
obj=building
name=
copyright=
# res, com, ind
type=res
dims=1,1,1
level=
noinfo=0
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
needs_ground=1
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
clusters=0
animation_time=300
# 画像
backimage[0][0][0][0][0]=image.0.0
`
  },
  {
    name: '記念碑、特殊建築物',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_BuildingsDef
obj=building
name=
copyright=
# mon, cur
type=mon
dims=1,1,1
level=1
passengers=
chance=100
noinfo=0
# 特殊建築物のみ
build_time=1
## land, city
location=land
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
noconstruction=0
needs_ground=1
# 画像
backimage[0][0][0][0][0]=image.0.0
    `
  },
  {
    name: '役所',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_BuildingsDef
obj=building
name=
copyright=
type=tow
dims=1,1,1
noinfo=1
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
noconstruction=0
needs_ground=1
# 画像
backimage[0][0][0][0][0]=image.0.0
    `
  },
  {
    name: '本社',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_BuildingsDef
obj=building
name=
copyright=
type=hq
dims=1,1,1
hq_level=1
noinfo=1
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
noconstruction=0
needs_ground=1
# 画像
backimage[0][0][0][0][0]=image.0.0
    `
  },
];