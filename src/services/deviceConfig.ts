export default {
  darkMode: {
    get(): boolean {
      return localStorage.getItem("deviceConfig.darkMode") === "1";
    },
    set(value: boolean) {
      localStorage.setItem("deviceConfig.darkMode", value ? "1" : "0")
    },
  },
};