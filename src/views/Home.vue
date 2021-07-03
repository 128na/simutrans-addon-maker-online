<template>
  <div class="home">
    home
    <div>
      <button @click="handleFetch">fetch</button>
      <button @click="handleCreate">create</button>
    </div>
    <ul>
      <li v-for="p in projects">
        <span>{{ p.id }}</span>
        :
        <input type="text" v-model="p.data.name" />
        <button @click="handleUpdate(p)">Update</button>
        <button @click="handleDelete(p)">Delete</button>
        <div>{{ p.data.createdAt }}</div>
        <div>{{ p.data.updatedAt }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["projects"]),
  },
  methods: {
    ...mapActions([
      "fetchProjects",
      "createProject",
      "updateProject",
      "deleteProject",
    ]),
    handleFetch() {
      this.fetchProjects();
    },
    handleCreate() {
      this.createProject({
        name: 123,
        isPublic: Math.random() > 0.5,
      });
    },
    handleUpdate(p) {
      this.updateProject(p);
    },
    handleDelete(p) {
      this.deleteProject(p);
    },
  },
};
</script>
