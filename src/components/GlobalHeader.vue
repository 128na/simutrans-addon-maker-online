<template>
  <q-header elevated reveal class="bg-dark text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

      <q-toolbar-title
        id="title"
        class="cursor-pointer"
        @click="drawer = !drawer"
      >
        {{ title }}
      </q-toolbar-title>
      <theme-toggler />
    </q-toolbar>
  </q-header>
  <q-drawer v-model="drawer" bordered :class="drawerClass">
    <q-scroll-area class="fit">
      <q-list>
        <q-item>
          <q-item-section>
            {{ title }}
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
          <small>
            <div>version {{ version }}</div>
            <div>
              <q-icon name="mdi-github" />
              <a
                href="https://github.com/128na/simutrans-addon-maker-online"
                class="text-secondary"
                target="_blank"
                rel="noopener"
              >
                Github
              </a>
            </div>
            <div>
              <q-icon name="mdi-twitter" />
              <a
                href="https://twitter.com/128Na"
                target="_blank"
                rel="noopener"
              >
                128Na
              </a>
            </div>
          </small>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import ThemeToggler from "./ThemeToggler.vue";
import { mapGetters } from "vuex";
import { themeControl } from "@/mixins";

export default {
  name: "GlobalHeader",
  components: { ThemeToggler },
  mixins: [themeControl],
  data() {
    return {
      drawer: false,
    };
  },
  created() {
    // PCサイズの場合はデフォルトでサイドバー表示状態
    this.drawer = ["md", "lg", "xl"].includes(this.$q.screen.name);
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
    drawerClass() {
      return this.isDarkTheme ? "bg-grey-8" : "bg-grey-3";
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
          route: "Images",
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