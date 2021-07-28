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
      <q-space />
      <theme-toggler />
    </q-toolbar>
  </q-header>
  <q-drawer v-model="drawer" bordered :class="drawerClass">
    <q-scroll-area class="fit">
      <q-list>
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
          <small>version {{ version }} </small>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { themeToggler } from "@/mixins";
import { mapGetters } from "vuex";
import ThemeToggler from "./ThemeToggler.vue";
export default {
  name: "GlobalHeader",
  components: { ThemeToggler },
  mixins: [themeToggler],
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