<template>
  <q-card>
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify-start"
      narrow-indicator
      inline-label
    >
      <q-tab name="items" :label="`${itemLabel}一覧`" />
      <q-tab name="deleted" icon="delete" label="ゴミ箱" />
      <q-tab name="export" icon="cloud_download" label="エクスポート" />
      <q-tab name="import" icon="cloud_upload" label="インポート" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="items" class="q-pa-none">
        <q-list separator>
          <q-item
            v-for="item in items"
            clickable
            v-ripple
            @click.prevent="$emit('itemClick', item)"
          >
            <q-item-section>
              <q-item-label>
                {{ item.data.title }}
              </q-item-label>
              <q-item-label caption>
                最終更新<text-date-time :value="item.data.updatedAt" />
                <a
                  class="q-ml-sm text-secondary"
                  @click.stop="$emit('itemDelete', item)"
                >
                  ゴミ箱へ
                </a>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-show="!items.length">
            <q-item-section>何もありません</q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="deleted" class="q-pa-none">
        <q-list separator>
          <q-item v-for="item in trashedItems">
            <q-item-section>
              <q-item-label>
                {{ item.data.title }}
              </q-item-label>
              <q-item-label caption>
                削除日<text-date-time :value="item.data.deletedAt" />
                <a
                  class="q-ml-sm text-secondary cursor-pointer"
                  @click.stop="$emit('itemRestore', item)"
                >
                  復元
                </a>
                <a
                  class="q-ml-sm text-negative cursor-pointer"
                  @click.stop="$emit('itemForceDelete', item)"
                >
                  削除
                </a>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-show="!trashedItems.length">
            <q-item-section>何もありません</q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="export">
        <p>{{ itemLabel }}データをjson形式で出力します。</p>
        <exporter :data="items" :exportName="itemLabel" />
      </q-tab-panel>
      <q-tab-panel name="import">
        <p>json形式の{{ itemLabel }}データを取り込みます。</p>
        <importer @import="$emit('import', $event)" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script>
import TextDateTime from "./Text/TextDateTime.vue";
import Exporter from "./IExporter/Exporter.vue";
import Importer from "./IExporter/Importer.vue";
export default {
  components: {
    Exporter,
    Importer,
    TextDateTime,
  },
  props: {
    itemLabel: {
      type: String,
      defualt: "アイテム",
    },
    itemName: {
      type: String,
      defualt: "item",
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    trashedItems: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: [
    "itemClick",
    "itemDelete",
    "itemRestore",
    "itemForceDelete",
    "import",
  ],
  data() {
    return {
      tab: "items",
    };
  },
};
</script>