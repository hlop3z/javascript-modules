var $HTTP = (function () {
  function b(a, b) {
    return new Promise((c, d) => {
      fetch(a, b)
        .then((a) => a.json())
        .then((a) => c(a))
        .catch((a) => d(a));
    });
  }
  let a = class {
    constructor(b, c) {
      let a = {
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      c && ((a.mode = "cors"), (a.credentials = "include")),
        (this.host = b),
        (this.options = a),
        (this.baseURL = (a) =>
          b +
          (a.startsWith("/") && b.endsWith("/") ? `${a.replace("/", "")}` : a)),
        (this.$keys = ["get", "post", "login", "graphql"]);
    }
    static init({ url: b = null, cors: c = !1 } = {}) {
      return new a(b, c);
    }
    get({ url: c = null, data: a = !1, options: d = {} } = {}) {
      let e = a ? `?${new URLSearchParams(a).toString()}` : "";
      return b(`${this.baseURL(c)}${e}`, {
        ...this.options,
        method: "GET",
        ...d,
      });
    }
    post({ url: d = null, data: a = !1, options: e = {} } = {}) {
      let f = `${this.baseURL(d)}`,
        g = a ? JSON.stringify(a) : a,
        c = { method: "POST" };
      return a && (c.body = g), b(f, { ...this.options, ...c, ...e });
    }
  };
  return a.init;
})();
