import { SnippetDefinition } from '../../plugins/interface';
const defs: SnippetDefinition[] = [
  {
    title: 'トラック・バス',
    caption: 'waytype=road',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_VehicleDef
obj=vehicle
name=
copyright=
waytype=road
freight=
payload=
speed=
cost=
runningcost=
power=
gear=
engine_type=diesel
weight=
length=
sound=
constraint[prev][0]=none
constraint[next][0]=none
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
smoke=Diesel
loading_time=1000
freightimagetype[0]=
# 画像
## 空荷画像
emptyimage[s]=image.0.0
emptyimage[n]=image.0.0
emptyimage[e]=image.0.0
emptyimage[w]=image.0.0
emptyimage[sw]=image.0.0
emptyimage[se]=image.0.0
emptyimage[nw]=image.0.0
emptyimage[ne]=image.0.0
## 積載画像
freightimage[0][s]=image.0.0
freightimage[0][n]=image.0.0
freightimage[0][e]=image.0.0
freightimage[0][w]=image.0.0
freightimage[0][sw]=image.0.0
freightimage[0][se]=image.0.0
freightimage[0][nw]=image.0.0
freightimage[0][ne]=image.0.0
`
  },
  {
    title: '電車',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_VehicleDef
obj=vehicle
name=
copyright=
waytype=
freight=
payload=
speed=
cost=
runningcost=
power=
gear=
engine_type=electric
weight=
length=
sound=
constraint[prev][0]=none
constraint[next][0]=none
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
smoke=
loading_time=1000
freightimagetype[0]=
# 画像
## 空荷画像
emptyimage[s]=image.0.0
emptyimage[n]=image.0.0
emptyimage[e]=image.0.0
emptyimage[w]=image.0.0
emptyimage[sw]=image.0.0
emptyimage[se]=image.0.0
emptyimage[nw]=image.0.0
emptyimage[ne]=image.0.0
## 積載画像
freightimage[0][s]=image.0.0
freightimage[0][n]=image.0.0
freightimage[0][e]=image.0.0
freightimage[0][w]=image.0.0
freightimage[0][sw]=image.0.0
freightimage[0][se]=image.0.0
freightimage[0][nw]=image.0.0
freightimage[0][ne]=image.0.0
`
  },
];
export default defs;
