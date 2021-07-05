<template>
  <div>
    <common-title class="mb-3">プロジェクト管理</common-title>
    <common-box>
      <button class="btn btn-primary" @click="handleCreate">新規作成</button>
    </common-box>
    <common-box>
      <!-- tab list -->
      <ul class="nav nav-tabs">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#projects"
          >
            一覧
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#trashed"
          >
            ゴミ箱
          </button>
        </li>
      </ul>

      <!-- tab content -->
      <div class="tab-content">
        <div class="tab-pane fade show active p-3" id="projects">
          <ul>
            <li v-for="p in projects">
              <div>
                <router-link :to="routeProject(p)">
                  <span>{{ p.data.title }}</span>
                </router-link>
                <a
                  href="#"
                  class="text-secondary mx-1"
                  @click.prevent="deleteProject(p)"
                  >ゴミ箱</a
                >
              </div>
              <small>
                <span>{{ p.data.createdAt }} 作成</span>
                ,
                <span>{{ p.data.updatedAt }} 更新</span>
              </small>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade p-3" id="trashed">
          <ul>
            <li v-for="p in trashedProjects">
              <div>
                <span>{{ p.data.title }}</span>
                <a
                  href="#"
                  class="text-secondary mx-1"
                  @click.prevent="restoreProject(p)"
                  >復元</a
                >
                <a
                  href="#"
                  class="text-danger mx-1"
                  @click.prevent="handleForceDelete(p)"
                  >削除</a
                >
              </div>
              <small>
                <span>{{ p.data.createdAt }} 削除</span>
              </small>
            </li>
          </ul>
        </div>
      </div>
    </common-box>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CommonBox from "../components/CommonBox.vue";
import CommonTitle from "../components/CommonTitle.vue";
export default {
  components: { CommonTitle, CommonBox },
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
