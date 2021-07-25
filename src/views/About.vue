<template>
  <div>
    <title-main>概要</title-main>
    <layout-box>
      {{ desc }}
    </layout-box>

    <title-main>使い方</title-main>
    <title-sub>操作の種類</title-sub>
    <layout-box>
      <p>
        <q-btn color="primary">サンプル</q-btn>
        <a class="text-primary q-mx-xs">サンプル</a>
        その画面における主な操作に利用されます。（新規作成や保存など）
      </p>
      <p>
        <q-btn color="secondary">サンプル</q-btn>
        <a class="text-secondary q-mx-xs">サンプル</a>
        その画面における補助的な操作に利用されます。
      </p>
      <p>
        <q-btn color="negative">サンプル</q-btn>
        <a class="text-negative q-mx-xs">サンプル</a>
        その画面における破壊的な操作に利用されます。実行前に確認ダイアログが表示されます。（削除など）
      </p>
      <p>
        <q-btn disable color="primary">サンプル</q-btn>
        そのボタンの操作を利用可能な条件が揃っていないことを表します。（未入力項目があるなど）
      </p>
      <p>
        <q-btn :loading="true" color="primary">サンプル</q-btn>
        そのボタンの操作が実行中であることを表します。処理が完了するまで再度実行することができません。
      </p>
    </layout-box>
    <title-sub>プロジェクト管理</title-sub>
    <layout-box>
      プロジェクトとは、作成されるpakライブラリ単位のアドオンのことです。
      プロジェクトには複数のアドオン（obj）を含めて管理できます。
    </layout-box>

    <title-sub>テンプレート管理</title-sub>
    <layout-box>
      テンプレートとは、プロジェクト内のdatファイルのひな形テキストのことです。
      アプリ側で用意されたテンプレートと、自身で登録したテンプレートを使用してdat新規作成を効率的に行うことができます。
    </layout-box>

    <title-sub>画像管理</title-sub>
    <layout-box>
      画像とは、各プロジェクトでアップロードした画像のことです。
      画像はプロジェクト単位でなくユーザー単位で管理されています。
      異なるプロジェクトでも同じファイル名があると上書きされてしまいますのでご注意ください。
    </layout-box>

    <title-main>更新履歴</title-main>
    <layout-box>
      <dl>
        <dt>2021/07/26 v 0.1.5</dt>
        <dd>デザイン周りを調整</dd>
        <dt>2021/07/18 v 0.1.4</dt>
        <dd>画像まわりを変更、Portalログインを追加</dd>
        <dt>2021/07/13 v 0.1.3</dt>
        <dd>テンプレート機能を追加</dd>
        <dt>2021/07/13 v 0.1.2</dt>
        <dd>インポート・エクスポート機能を追加</dd>
        <dt>2021/07/05 v 0.1.1</dt>
        <dd>ファイルドロップでの読み込みに対応</dd>
        <dt>2021/07/04 v 0.1.0</dt>
        <dd>プロトタイプ版公開</dd>
      </dl>
    </layout-box>
  </div>
</template>
<script>
import TitleMain from "../components/Text/TitleMain.vue";
import LayoutBox from "../components/LayoutBox.vue";
import TitleSub from "../components/Text/TitleSub.vue";
export default {
  components: { TitleMain, LayoutBox, TitleSub },
  computed: {
    desc() {
      return process.env.VUE_APP_DESCRIPTION;
    },
  },
};
</script>