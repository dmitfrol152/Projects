/*global UIkit, Vue */

(() => {
  const notification = (config) =>
    UIkit.notification({
      pos: "top-right",
      timeout: 5000,
      ...config,
    });

  const alert = (message) =>
    notification({
      message,
      status: "danger",
    });

  const info = (message) =>
    notification({
      message,
      status: "success",
    });

  const fetchJson = (...args) =>
    fetch(...args)
      .then((res) =>
        res.ok
          ? res.status !== 204
            ? res.json()
            : null
          : res.text().then((text) => {
              throw new Error(text);
            })
      )
      .catch((err) => {
        alert(err.message);
      });

  new Vue({
    el: "#app",
    data: {
      desc: "",
      activeTimers: [],
      oldTimers: [],
      socket: null
    },
    methods: {
      fetchActiveTimers() {
        fetchJson("/api/timers?isActive=true").then((activeTimers) => {
          this.activeTimers = activeTimers;
        });
      },
      fetchOldTimers() {
        fetchJson("/api/timers?isActive=false").then((oldTimers) => {
          this.oldTimers = oldTimers;
        });
      },
      createTimer() {
        const description = this.desc;
        this.desc = "";
        fetchJson("/api/timers", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description }),
        }).then(({ id }) => {
          info(`Created new timer "${description}" [${id}]`);
        });
      },
      stopTimer(id) {
        fetchJson(`/api/timers/${id}/stop`, {
          method: "post",
        }).then(() => {
          info(`Stopped the timer [${id}]`);
        });
      },
      formatTime(ts) {
        return new Date(ts).toTimeString().split(" ")[0];
      },
      formatDuration(d) {
        d = Math.floor(d / 1000);
        const s = d % 60;
        d = Math.floor(d / 60);
        const m = d % 60;
        const h = Math.floor(d / 60);
        return [h > 0 ? h : null, m, s]
          .filter((x) => x !== null)
          .map((x) => (x < 10 ? "0" : "") + x)
          .join(":");
      },
      initSocket() {
        const wsProto = location.protocol === "https" ? "wss" : "ws";
        this.socket = io(`${wsProto}://${location.host}`, {
          auth: {
            sessionId: window.AUTH_TOKEN
          }
        });

        this.socket.on("active_timers", (timers) => {
          this.activeTimers = timers;
        });

        this.socket.on("old_timers", (timers) => {
          this.oldTimers = timers;
        });

        this.socket.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
          alert("Ошибка подключения к серверу");
        });
      }
    },
    created() {
      this.fetchActiveTimers();
      this.fetchOldTimers();
      this.initSocket();
    },
    beforeDestroy() {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
  });
})();
