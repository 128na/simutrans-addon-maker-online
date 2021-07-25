import { SnippetDefinition } from '../../plugins/interface';
const defs: SnippetDefinition[] = [
  {
    title: '産業',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_FactoryDef
obj=factory
name=
copyright=
location=land
distributionweight=
productivity=
range=
inputgood[0]=
inputcapacity[0]=
inputsupplier[0]=
inputfactor[0]=
outputgood[0]=
outputcapacity[0]=
outputfactor[0]=
mapcolor=
dims=
# location=waterの時必要
enables_pax=1
enables_post=0
enables_ware=0
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
needs_ground=0
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
animation_time=300
expand_probability=0
expand_minimum=0
expand_range=0
expand_times=0
electricity_boost=1000
passenger_boost=1000
mail_boost=1000
electricity_amount=
passenger_demand=
mail_demand=
# 煙
smoke=
smoketile=
smokeoffset=
smokespeed=
# フィールド（畑）
min_fields=5
max_fields=25
probability_to_spawn=0
start_fields=5
fields[0]=
has_snow[0]=1
storage_capacity[0]=0
spawn_weight[0]=
# 画像
backimage[0][0][0][0][0]=image.0.1
frontimage[0][0][0][0][0]=image.0.1
`
  }, {
    title: '発電所',
    caption: 'name=xxxkraftwerk',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_FactoryDef
obj=factory
# 名前末尾がkraftwerkで発電所になる
name=example_kraftwerk
copyright=
location=land
distributionweight=
productivity=
range=
inputgood[0]=
inputcapacity[0]=
inputsupplier[0]=
inputfactor[0]=
mapcolor=
dims=
# location=waterの時必要
enables_pax=1
enables_post=0
enables_ware=0
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
needs_ground=0
climates=water,desert,tropic,mediterran,temperate,tundra,rocky,arctic
animation_time=300
expand_probability=0
expand_minimum=0
expand_range=0
expand_times=0
electricity_boost=1000
passenger_boost=1000
mail_boost=1000
electricity_amount=
passenger_demand=
mail_demand=
# 煙
smoke=
smoketile=
smokeoffset=
smokespeed=
# フィールド（畑）
min_fields=5
max_fields=25
probability_to_spawn=0
start_fields=5
fields[0]=
has_snow[0]=1
storage_capacity[0]=0
spawn_weight[0]=
# 画像
backimage[0][0][0][0][0]=image.0.1
frontimage[0][0][0][0][0]=image.0.1
`
  },
];
export default defs;
