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
          return this.clearLeaveDialog();
        } else {
          return false;
        }
      }
    },
    leaveDialog(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }
  }
};

import deviceConfig from '@/services/deviceConfig'
import { useQuasar } from 'quasar'
export const themeToggler: ComponentOptionsMixin = {
  data() {
    return {
      $q: null,
    };
  },
  created() {
    const $q = useQuasar();
    this.$q = $q;

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

export const globalMixin: ComponentOptionsMixin = {
  methods: {
    /**
     * ルーターショートハンド
     * @param name 
     * @param params 
     */
    routeTo(name: string, params = {}) {
      this.$router.push({ name, params });
    }
  }
}