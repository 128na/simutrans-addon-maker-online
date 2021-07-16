import firebase from "firebase";
const url = process.env.VUE_APP_PORTAL_URL;

export default {
  signin() {
    const win = window.open(url, "portal", [
      "width=400",
      "height=600",
      "status=no",
    ]);

    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
      }
      try {
        if (win.location) {
          const param = new URLSearchParams(win.location.search);
          const token = param.get("token");
          win.close();
          this.customLogin(token);
          clearInterval(timer);
        }
      } catch (e) { }
    }, 2000);
  },

  async customLogin(token) {
    try {
      await firebase.auth().signInWithCustomToken(token);
    } catch (error) {
      console.error({ error });
      alert('連携に失敗しました');
    }
  },

  link() { }



}