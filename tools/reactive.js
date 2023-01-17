// Reactive
function reactive(obj) {
  const observer = new Proxy(obj, {
    set: (obj, prop, value) => {
      if (obj[prop] !== value) {
        obj[prop] = value;
        updateView(prop);
      }
      return true;
    },
  });
  return observer;
}

function updateView(property) {
  if (property === "name") {
    document.querySelector("#name").innerHTML = state.name;
  } else if (property === "age") {
    document.querySelector("#age").innerHTML = state.age;
  }
}

const state = reactive({
  name: "John Doe",
  method() {
    console.log(this.name);
  },
});

// the view will automatically update to reflect the change in the state
setInterval(() => {
  state.name = "Jane Doe " + Date.now();
}, 500);
