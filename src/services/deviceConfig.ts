export default {
  darkMode: {
    get(): boolean {
      return localStorage.getItem("deviceConfig.darkMode") === "1";
    },
    set(value: boolean) {
      localStorage.setItem("deviceConfig.darkMode", value ? "1" : "0")
    },
  },
  offlineMode: {
    get(): boolean {
      return localStorage.getItem("deviceConfig.offlineMode") === "1";
    },
    set(value: boolean) {
      localStorage.setItem("deviceConfig.offlineMode", value ? "1" : "0")
    },
  }
};