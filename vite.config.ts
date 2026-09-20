import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        login: resolve(import.meta.dirname, "src/pages/auth/login/login.html"),
        registro: resolve(import.meta.dirname, "src/pages/auth/registro/registro.html"),
        adminHome: resolve(import.meta.dirname, "src/pages/admin/home/home.html"),
        clientHome: resolve(import.meta.dirname, "src/pages/client/home/home.html"),
        clientCart: resolve(import.meta.dirname, "src/pages/client/cart/cart.html"),
      },
    },
  },
  base: "./",
});
