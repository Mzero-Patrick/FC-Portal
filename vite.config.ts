// The shared build preset already registers TanStack Start, React, Tailwind CSS,
// tsconfig path aliases, nitro (build-only) and VITE_* env injection. Do NOT add
// these plugins again here or the app will break with duplicate plugins.
// Pass any extra Vite options via defineConfig({ vite: { ... } }).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
