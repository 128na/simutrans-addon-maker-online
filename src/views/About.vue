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
        <q-btn
          color="primary"
          label="サンプル"
          @click="notifyPositive('サンプル処理完了メッセージ')"
        />
        その画面における主な操作に利用されます。（新規作成や保存など）
      </p>
      <p>
        <q-btn
          color="secondary"
          label="サンプル"
          @click="notifyInfo('サンプル補足情報メッセージ')"
        />
        その画面における補助的な操作に利用されます。
      </p>
      <p>
        <q-btn
          color="negative"
          label="サンプル"
          @click="notifyNegative('サンプルエラーメッセージ')"
        />
        その画面における破壊的な操作に利用されます。実行前に確認ダイアログが表示されます。（削除など）
      </p>
      <p>
        <q-btn disable color="primary" label="サンプル" />
        そのボタンの操作を利用可能な条件が揃っていないことを表します。（未入力項目があるなど）
      </p>
      <p>
        <q-btn loading color="primary" label="サンプル" />
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
      画像とは、ユーザーがアップロードした画像のことです。
      画像はプロジェクト単位でなく、ユーザー単位で管理されています。
      異なるプロジェクトでも画像を共有できますが、同じファイル名があると上書きされてしまいますのでご注意ください。
    </layout-box>

    <title-main>更新履歴</title-main>
    <layout-box>
      <q-list>
        <q-item v-for="log in changeLogs">
          <q-item-section>
            <q-item-label overline>{{ log[0] }}</q-item-label>
            <q-item-label>{{ log[1] }}</q-item-label>
            <q-item-label caption>{{ log[2] }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </layout-box>
  </div>
</template>
<script>
import TitleMain from "@/components/Text/TitleMain.vue";
import LayoutBox from "@/components/LayoutBox.vue";
import TitleSub from "@/components/Text/TitleSub.vue";
export default {
  components: { TitleMain, LayoutBox, TitleSub },
  computed: {
    desc() {
      return process.env.VUE_APP_DESCRIPTION;
    },
    changeLogs() {
      return [
        ["2021/xx/xx", "RC2", "Portalアップロード連携機能"],
        ["2021/xx/xx", "RC1", "Datパラメータ編集機能"],
        ["2021/07/26", "v 0.1.5 Beta", "デザイン周りを調整"],
        ["2021/07/18", "v 0.1.4", "画像まわりを変更、Portalログインを追加"],
        ["2021/07/13", "v 0.1.3", "テンプレート機能を追加"],
        ["2021/07/13", "v 0.1.2", "インポート・エクスポート機能を追加"],
        ["2021/07/05", "v 0.1.1", "ファイルドロップでの読み込みに対応"],
        ["2021/07/04", "v 0.1.0 Prototype", "プロトタイプ版公開"],
      ];
    },
  },
};
</script>