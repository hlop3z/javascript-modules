var $HTTP = (function apiWrapper() {
  function apiHandler(URL, OPTIONS) {
    return new Promise((myResolve, myReject) => {
      fetch(URL, OPTIONS)
        .then((response) => response.json())
        .then((json) => myResolve(json))
        .catch((error) => myReject(error));
    });
  }
  const ApiBase = class {
    constructor(baseURL, cors) {
      let optionsDefault = {
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      cors &&
        ((optionsDefault.mode = "cors"),
        (optionsDefault.credentials = "include")),
        (this.host = baseURL),
        (this.options = optionsDefault),
        (this.baseURL = (url) =>
          baseURL +
          (url.startsWith("/") && baseURL.endsWith("/")
            ? `${url.replace("/", "")}`
            : url));
      this.$keys = ["get", "post", "login", "graphql"];
      const $vm = this;
      function gqlHandler({
        url = "graphql/",
        query = null,
        variables = null,
        operationName = null,
      } = {}) {
        return new Promise((myResolve, myReject) => {
          const gqlRequest = { query: query };
          if (variables) {
            gqlRequest.variables = variables;
          }
          if (operationName) {
            gqlRequest.operationName = operationName;
          }
          $vm
            .post({
              url: url,
              data: gqlRequest,
            })
            .then((response) => {
              const { data, errors } = response;
              let isAuthorized = true;
              if (errors && errors.length > 0) {
                const msg = errors[0].message;
                if (msg.toString().toLowerCase().includes("not authorized")) {
                  isAuthorized = false;
                }
              }
              return myResolve({
                data: data,
                errors: errors,
                isAuthorized: true,
              });
            })
            .catch((error) => myReject(error));
        });
      }
      this.gql = gqlHandler;
    }
    static init({ url: url = null, cors: cors = !1 } = {}) {
      return new ApiBase(url, cors);
    }
    get({ url: url = null, data: data = !1, options: options = {} } = {}) {
      const params = data ? `?${new URLSearchParams(data).toString()}` : "";
      return apiHandler(`${this.baseURL(url)}${params}`, {
        ...this.options,
        method: "GET",
        ...options,
      });
    }
    post({ url: url = null, data: data = !1, options: options = {} } = {}) {
      const path = `${this.baseURL(url)}`,
        params = data ? JSON.stringify(data) : data,
        method = {
          method: "POST",
        };
      return (
        data && (method.body = params),
        apiHandler(path, {
          ...this.options,
          ...method,
          ...options,
        })
      );
    }
  };
  return ApiBase.init;
})();
