<template>
  <nav class="navbar navbar-dark navbar-expand-md bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Projects' }">
        <span class="d-none d-sm-inline">
          {{ title }}
          <small class="ms-2">v {{ version }}</small>
        </span>
        <span class="d-sm-none">Addon Maker</span>
      </router-link>
      <button
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#global-menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="global-menu">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Projects' }">
              Projects
            </router-link>
          </li>
          <li class="nav-item dropdown ms-auto">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
            >
              {{ userName }}
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#" @click="signout">
                  Sign out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
    ...mapActions(["signout"]),
  },
};
</script>