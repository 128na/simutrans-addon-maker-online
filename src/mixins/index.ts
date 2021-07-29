import { ComponentOptionsMixin } from "vue"
export const confirmBeforeLeave: ComponentOptionsMixin = {
  data() {
    return {
      hasLeaveDialog: false,
    };
  },
  methods: {
    setLeaveDialog() {
      if (!this.hasLeaveDialog) {
        console.log('setLeaveDialog')
        window.addEventListener("beforeunload", this.leaveDialog);
        this.hasLeaveDialog = true;
      }
    },
    clearLeaveDialog() {
      if (this.hasLeaveDialog) {
        console.log('clearLeaveDialog')
        window.removeEventListener("beforeunload", this.leaveDialog);
        this.hasLeaveDialog = false;
      }
    },
    handleBeforeLeave() {
      if (this.hasLeaveDialog) {
        if (confirm('未保存の変更があります。保存せずにページを離れますか？')) {
          this.clearLeaveDialog();
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    leaveDialog(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }
  }
};

import deviceConfig from '@/services/deviceConfig'
export const themeControl: ComponentOptionsMixin = {
  created() {
    this.$q.dark.set(deviceConfig.darkMode.get());
  },
  computed: {
    isDarkTheme() {
      return this.$q.dark.isActive;
    },
  },
  methods: {
    toggleTheme() {
      this.$q.dark.toggle();
      deviceConfig.darkMode.set(this.isDarkTheme);
    },
  },
};

import { useQuasar } from 'quasar'
export const globalMixin: ComponentOptionsMixin = {
  data() {
    return {
      $q: null,
    };
  },
  created() {
    const $q = useQuasar();
    this.$q = $q;
  },
  methods: {
    /**
     * ルーターショートハンド
     * @param name 
     * @param params 
     */
    routeTo(name: string, params = {}) {
      this.$router.push({ name, params });
    },
    notifyInfo(message: string) {
      console.warn(message);
      (message);
      return this.$q.notify({
        type: "info",
        message,
        position: 'top',
      });
    },
    // 自動で閉じない
    notifyNegative(message: string) {
      console.error(message);
      return this.$q.notify({
        type: "negative",
        message,
        position: 'top',
        actions: [{ icon: "close", color: "white" }],
        classes: ['pre-line'],
        timeout: 0,
      });
    },
    notifyPositive(message: string) {
      console.info(message);
      return this.$q.notify({
        type: "positive",
        message,
        position: 'top',
      });
    },
  }
}