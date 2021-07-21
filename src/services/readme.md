

|要素名|親要素|意味|例|
|---|---|---|---|
|project         |-      |アドオン全体の記述や画像、ファイル名などをまとめたもの||
|dat             |project|セパレーターで区切られた1つ以上のアドオン記述||
|size            |project|pakするサイズ|`64`|
|filename        |project|pak化する際のファイル名。拡張子無し|`example`|
|imageUrls       |project|画像URL一覧配列|`[{filename:'example.png', url:'http://example.com/1.png'}]`|
|obj             |dat    |アドオン単体の記述||
|line            |obj    |アドオン記述の行|`image[0][1]=example.2.3,4,5`|
|comment         |line   |コメント|`# にゃーん`|
|separator       |line   |アドオン単体を区切る境界線。ハイフン3つ以上を連続させる|`---`|
|key             |line   |キー名|`image[0][1]`|
|operator        |line   |値の扱い指定])|`=`, `=>_`(`_`は半角スペース)|
|value           |line   |値|`example.2.3,4,5`|
|key element     |key    |キーの要素名|`image`|
|key parameters  |key    |キーのパラメーター配列|`[0,1]`|
|value element   |value  |値の要素名|`example`|
|value parameters|value  |値のパラメータ配列|`[2,3,4,5]`|
