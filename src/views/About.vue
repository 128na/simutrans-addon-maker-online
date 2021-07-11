<template>
  <title-main>概要</title-main>
  <layout-box>
    {{ desc }}
  </layout-box>

  <title-main>使い方</title-main>
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

  <title-main>更新履歴</title-main>
  <layout-box>
    <dl>
      <dt>2021/07/04 v 0.1</dt>
      <dd>プロトタイプ版公開</dd>
    </dl>
  </layout-box>
</template>
<script>
import TitleMain from "../components/TitleMain.vue";
import LayoutBox from "../components/LayoutBox.vue";
import TitleSub from "../components/TitleSub.vue";
export default {
  components: { TitleMain, LayoutBox, TitleSub },
  computed: {
    desc() {
      return process.env.VUE_APP_DESCRIPTION;
    },
  },
};
</script>