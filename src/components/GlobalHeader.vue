<template>
  <nav class="navbar navbar-dark navbar-expand-md bg-dark">
    <div class="container-fluid">
      <router-link
        class="navbar-brand"
        :to="{ name: 'Projects' }"
        @click="handleClick"
      >
        <span class="d-md-inline d-none">
          {{ title }}
          <small class="ms-2">v {{ version }}</small>
        </span>
        <span class="d-md-none">Simutrans Addon Maker</span>
      </router-link>
      <button
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#global-menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="global-menu" ref="global-menu">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'About' }"
              @click="handleClick"
            >
              使い方
            </router-link>
          </li>
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'Projects' }"
                @click="handleClick"
              >
                プロジェクト
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'Snippets' }"
                @click="handleClick"
              >
                テンプレート
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'User' }"
                @click="handleClick"
              >
                {{ userName }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="{ name: 'Signin' }"
                @click="handleClick"
              >
                Signin
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "GlobalHeader",
  computed: {
    ...mapGetters(["isLoggedIn", "userName"]),
    version() {
      return process.env.VUE_APP_VERSION;
    },
    title() {
      return process.env.VUE_APP_TITLE;
    },
    version() {
      return process.env.VUE_APP_VERSION;
    },
  },
  methods: {
    handleClick() {
      const instance = bootstrap.Collapse.getInstance(
        this.$refs["global-menu"]
      );
      if (instance) {
        instance.hide();
      }
    },
  },
};
</script>