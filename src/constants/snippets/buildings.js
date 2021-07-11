export default [
  {
    name: '市内建築物',
    dat: `# https://simutrans-germany.com/wiki/wiki/en_BuildingsDef
obj=building
name=
copyright=
# res, com, ind
type=res
dims=1,1,1
level=
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
backImage[0][0][0][0][0]=image.0.0
`
  },
  {
    name: '駅舎',
    dat: `# https://simutrans-germany.com/wiki/wiki/en_BuildingsDef
obj=building
name=
copyright=
# stop, hall, post, shed
type=hall
enables_pax=1
enables_post=0
enables_ware=0
dims=1,1,1
extension_building=1
level=1
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
waytype=
noConstruction=0
needs_ground=1
allow_underground=2
# 画像
cursor=image.0.0
icon=> image.0.0
backImage[0][0][0][0][0]=image.0.0
    `
  },
  {
    name: 'バス停、プラットフォーム',
    dat: `# https://simutrans-germany.com/wiki/wiki/en_BuildingsDef
obj=building
name=
copyright=
# carstop, busstop, station, habour, airport, wharf, monorailstop
type=carstop
enables_pax=0
enables_post=0
enables_ware=1
dims=1,1,1
extension_building=1
level=1
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
noConstruction=0
needs_ground=1
allow_underground=2
# 画像
cursor=image.0.0
icon=> image.0.0
backImage[0][0][0][0][0]=image.0.0
frontImage[0][0][0][0][0]=image.0.1
    `
  },
  {
    name: '記念碑、特殊建築物',
    dat: `# https://simutrans-germany.com/wiki/wiki/en_BuildingsDef
obj=building
name=
copyright=
# mon, cur
type=mon
dims=1,1,1
level=1
passengers=
chance=100
# 特殊建築物のみ
build_time=1
## land, city
Location=land
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
noConstruction=0
needs_ground=1
# 画像
backImage[0][0][0][0][0]=image.0.0
    `
  },
  {
    name: '役所',
    dat: `# https://simutrans-germany.com/wiki/wiki/en_BuildingsDef
obj=building
name=
copyright=
type=tow
dims=1,1,1
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
noConstruction=0
needs_ground=1
# 画像
backImage[0][0][0][0][0]=image.0.0
    `
  },
  {
    name: '役所',
    dat: `# https://simutrans-germany.com/wiki/wiki/en_BuildingsDef
obj=building
name=
copyright=
type=tow
dims=1,1,1
build_time=100
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
noConstruction=0
needs_ground=1
# 画像
backImage[0][0][0][0][0]=image.0.0
    `
  },
  {
    name: '本社',
    dat: `# https://simutrans-germany.com/wiki/wiki/en_BuildingsDef
obj=building
name=
copyright=
type=hq
dims=1,1,1
hq_level=1
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
noConstruction=0
needs_ground=1
# 画像
backImage[0][0][0][0][0]=image.0.0
    `
  },
];