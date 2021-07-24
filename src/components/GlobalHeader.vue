<template>
  <q-header elevated class="bg-dark text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

      <q-toolbar-title id="title">
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
  <q-drawer v-model="drawer" show-if-above bordered class="bg-grey-3">
    <q-scroll-area class="fit">
      <q-list>
        <q-item
          v-ripple
          clickable
          @click="drawer = !drawer"
          class="rounded-borders"
        >
          <q-item-section avatar>
            <q-icon name="navigate_before" />
          </q-item-section>
        </q-item>
        <q-separator />
        <template v-for="(item, index) in menus">
          <q-item
            v-show="canShow(item)"
            clickable
            v-ripple
            @click="routeTo(item.route)"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
          <q-separator v-show="canShow(item) && item.separator" />
        </template>
        <q-separator />
        <q-item>
          <small>{{ title }} v{{ version }} </small>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "GlobalHeader",
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    canShow(item) {
      if (this.isLoggedIn && item.auth === false) {
        return false;
      }
      if (!this.isLoggedIn && item.auth === true) {
        return false;
      }
      return true;
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn", "userName"]),
    title() {
      return process.env.VUE_APP_TITLE;
    },
    version() {
      return process.env.VUE_APP_VERSION;
    },
    menus() {
      return [
        {
          label: "プロジェクト管理",
          icon: "library_books",
          route: "Projects",
          auth: true,
          separator: false,
        },
        {
          label: "テンプレート管理",
          icon: "assignment",
          route: "Snippets",
          auth: true,
          separator: false,
        },
        {
          label: "画像管理",
          icon: "photo_library",
          route: "About",
          auth: true,
          separator: true,
        },
        {
          label: "サインイン",
          icon: "login",
          route: "Signin",
          auth: false,
          separator: true,
        },
        {
          label: this.userName,
          icon: "person",
          route: "User",
          auth: true,
          separator: true,
        },
        {
          label: "使い方",
          icon: "help",
          route: "About",
          auth: null,
          separator: false,
        },
      ];
    },
  },
};
</script>