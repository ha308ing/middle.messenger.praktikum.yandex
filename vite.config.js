import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

const projectPages = {
  "/pages/authorization/index.html": { title: "Authorization" },
  "/pages/registration/index.html": { title: "Registration" },
  "/pages/threadList/index.html": { title: "List of threads" },
  "/pages/threadActive/index.html": { title: "Active thread" },
  "/pages/threadManage/index.html": { title: "Manage thread" },
  "/pages/profile/index.html": { title: "User profile" },
  "/pages/passwordChange/index.html": { title: "Change password" },
  "/pages/404/index.html": { title: "404" },
  "/pages/5xx/index.html": { title: "5xx " },
};

const title = "YP-Project Messenger-Sprint 1";
const pageData = {
  "/index.html": { title, pages: projectPages },
  ...projectPages,
};

export default defineConfig({
  root: resolve(__dirname, "src"),
  // publicDir: resolve(__dirname, "static"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        authorization: resolve(__dirname, "src/pages/authorization/index.html"),
        registration: resolve(__dirname, "src/pages/registration/index.html"),
        threadList: resolve(__dirname, "src/pages/threadList/index.html"),
        threadActive: resolve(__dirname, "src/pages/threadActive/index.html"),
        threadManage: resolve(__dirname, "src/pages/threadManage/index.html"),
        profile: resolve(__dirname, "src/pages/profile/index.html"),
        passwordChange: resolve(
          __dirname,
          "src/pages/passwordChange/index.html"
        ),
        404: resolve(__dirname, "src/pages/404/index.html"),
        "5xx": resolve(__dirname, "src/pages/5xx/index.html"),
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
      partialDirectory: [resolve(__dirname, "src/components")],
      helpers: {},
    }),
  ],
});
