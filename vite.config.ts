import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [react(), svgr()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'DesignSystemApp',
          fileName: (format) => `index.${format}.js`,
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        }
      }
    };
  }
  
  return {
    plugins: [react(), svgr()],
  };
});
