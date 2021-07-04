<template>
  <h1>プロジェクト一覧</h1>
  <div>
    <button @click="handleCreate">新規作成</button>
  </div>
  <ul>
    <li v-for="p in projects">
      <div>
        <router-link :to="routeProject(p)">
          <span>{{ p.data.title }}</span>
        </router-link>
        <button @click="deleteProject(p)">ゴミ箱へ</button>
      </div>
      <div>
        <span>作成：{{ p.data.createdAt }}</span>
        、
        <span>更新：{{ p.data.updatedAt }}</span>
      </div>
    </li>
  </ul>
  <hr />
  <h2>ゴミ箱</h2>
  <ul>
    <li v-for="p in trashedProjects">
      <div>
        <span>{{ p.data.title }}</span>
        <button @click="restoreProject(p)">復元</button>
        <button @click="handleForceDelete(p)">削除</button>
      </div>
      <div>
        <span>削除：{{ p.data.createdAt }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Projects",
  computed: {
    ...mapGetters(["projects", "trashedProjects"]),
  },
  methods: {
    ...mapActions([
      "createProject",
      "deleteProject",
      "restoreProject",
      "forceDeleteProject",
    ]),
    randomTitle() {
      const arr = [
        "新しいプロジェクト",
        "どちらかというと新しいプロジェクト",
        "やや新しいプロジェクト",
        "それなりに新しいプロジェクト",
        "新しいプロジェクト。古事記にもそう書かれている",
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    },
    handleCreate() {
      this.createProject({
        title: this.randomTitle(),
        filename: "example",
        isPublic: false,
        dat: "",
        images: {},
        size: 64,
      });
    },
    handleForceDelete(p) {
      confirm("削除しますか？") && this.forceDeleteProject(p);
    },
    routeProject(p) {
      return { name: "Project", params: { id: p.id } };
    },
  },
};
</script>
