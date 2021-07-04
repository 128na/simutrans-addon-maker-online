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
        <button @click="handleDelete(p)">削除</button>
      </div>
      <div>
        <span>作成：{{ p.data.createdAt }}</span>
        、
        <span>更新：{{ p.data.updatedAt }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Projects",
  computed: {
    ...mapGetters(["projects"]),
  },
  methods: {
    ...mapActions(["createProject", "deleteProject"]),
    randomTitle() {
      const arr = [
        "新しい",
        "どちらかというと新しい",
        "やや新しい",
        "それなりに新しい",
        "伝承によると新しいとされる",
      ];
      return `${arr[Math.floor(Math.random() * arr.length)]}プロジェクト`;
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
    handleDelete(p) {
      confirm("削除しますか？") && this.deleteProject(p);
    },
    routeProject(p) {
      return { name: "Project", params: { id: p.id } };
    },
  },
};
</script>
