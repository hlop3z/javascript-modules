# Auto-Load

## Vue 2

```js
const requireModule = require.context('./namespace', false, /\.store\.js$/);
const modules = {};

requireModule.keys().forEach((filename) => {
  const moduleName = filename
    .replace(/(\.\/|\.store\.js)/g, '')
    .replace(/^\w/, (c) => c.toLowerCase());

  modules[moduleName] = requireModule(filename).default || requireModule(filename);
});

export default modules;
```

---

## Vue 3 (Vite)

```js
const requireModule = import.meta.globEager('./namespace/*.store.js');

const modules = {};

Object.keys(requireModule).forEach((filename) => {
  const moduleName = filename
    .replace('namespace/', '')
    .replace(/(\.\/|\.store\.js)/g, '')
    .replace(/^\w/, (c) => c.toLowerCase());

    modules[moduleName] = requireModule[filename].default || requireModule[filename];
});

export default modules;
```