<template>
  <q-card flat bordered>
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
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
          <template v-for="item in items">
            <q-item
              clickable
              v-ripple
              @click.prevent="$emit('itemClick', item)"
            >
              <q-item-section>
                <q-item-label caption>
                  最終更新: <text-date-time v-model="item.data.updatedAt" />
                </q-item-label>
                <q-item-label class="q-mb-sm">
                  {{ item.data.title }}
                </q-item-label>
                <q-item-label class="text-right">
                  <slot name="itemAction" :item="item" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <q-item v-show="!items.length">
            <q-item-section>何もありません</q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="deleted" class="q-pa-none">
        <q-list separator>
          <template v-for="item in trashedItems">
            <q-item>
              <q-item-section>
                <q-item-label caption>
                  削除日<text-date-time v-model="item.data.deletedAt" />
                </q-item-label>
                <q-item-label class="q-mb-sm">
                  {{ item.data.title }}
                </q-item-label>
                <q-item-label class="text-right">
                  <slot name="trashedItemAction" :item="item" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <q-item v-show="!trashedItems.length">
            <q-item-section>何もありません</q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="export">
        <p>{{ itemLabel }}をjson形式で出力します。</p>
        <exporter :data="items" :exportName="itemLabel" />
      </q-tab-panel>
      <q-tab-panel name="import">
        <p>json形式の{{ itemLabel }}を取り込みます。</p>
        <importer @import="$emit('import', $event)" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script>
import Exporter from "./IExporter/Exporter.vue";
import Importer from "./IExporter/Importer.vue";
import TextDateTime from "./Text/TextDateTime.vue";

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
  emits: ["itemClick", "import"],
  data() {
    return {
      tab: "items",
    };
  },
};
</script>