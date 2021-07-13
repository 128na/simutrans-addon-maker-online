export default [
  {
    name: '鉄道信号',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_SignaleDef
obj=roadsign
name=
copyright=
cost=
waytype=
is_signal=1
single_way=0
# 振分終了標識のみ
end_of_choose
# 多閉塞信号のみ
is_longblocksignal=1
# 振分信号のみ
free_route=1
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
offset_left=14
# 画像
cursor=> image.0.0
icon=> image.0.0
image[0]=image.0.0
image[1]=image.0.0
image[2]=image.0.0
image[3]=image.0.0
image[4]=image.0.0
image[5]=image.0.0
image[6]=image.0.0
image[7]=image.0.0
image[8]=image.0.0
image[9]=image.0.0
image[10]=image.0.0
image[11]=image.0.0
image[12]=image.0.0
image[13]=image.0.0
image[14]=image.0.0
image[15]=image.0.0
`
  },
  {
    name: '鉄道信号（プレ、プライオリティ）',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_SignaleDef
obj=roadsign
name=
copyright=
cost=
waytype=
is_signal=1
single_way=0
# プレシグナルのみ
is_presignal=1
# プライオリティシグナルのみ
is_prioritysignal=1
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
offset_left=14
# 画像
cursor=> image.0.0
icon=> image.0.0
image[0]=image.0.0
image[1]=image.0.0
image[2]=image.0.0
image[3]=image.0.0
image[4]=image.0.0
image[5]=image.0.0
image[6]=image.0.0
image[7]=image.0.0
image[8]=image.0.0
image[9]=image.0.0
image[10]=image.0.0
image[11]=image.0.0
image[12]=image.0.0
image[13]=image.0.0
image[14]=image.0.0
image[15]=image.0.0
image[16]=image.0.0
image[17]=image.0.0
image[18]=image.0.0
image[19]=image.0.0
image[20]=image.0.0
image[21]=image.0.0
image[22]=image.0.0
image[23]=image.0.0
`
  },
  {
    name: '道路標識',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_SignaleDef
obj=roadsign
name=
copyright=
cost=
waytype=road
single_way=1
min_speed=0
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
offset_left=14
is_private=0
end_of_choose=0
# 画像
cursor=> image.0.0
icon=> image.0.0
image[0]=image.0.0
image[1]=image.0.0
image[2]=image.0.0
image[3]=image.0.0
`
  },
  {
    name: '道路信号',
    dat: `# https://simutrans-germany.com/wiki/wiki/de_SignaleDef
obj=roadsign
name=
copyright=
cost=
waytype=road
single_way=0
min_speed=0
# 任意項目
intro_year=1900
intro_month=1
retire_year=2999
retire_month=1
offset_left=14
# 画像
cursor=> image.0.0
icon=> image.0.0
image[0]=image.0.0
image[1]=image.0.0
image[2]=image.0.0
image[3]=image.0.0
image[4]=image.0.0
image[5]=image.0.0
image[6]=image.0.0
image[7]=image.0.0
image[8]=image.0.0
image[9]=image.0.0
image[10]=image.0.0
image[11]=image.0.0
image[12]=image.0.0
image[13]=image.0.0
image[14]=image.0.0
image[15]=image.0.0
`
  },
];