import typescript from "rollup-plugin-typescript2";
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import pkg from "./package.json";

export default {
  input: "./src/index.tsx",
  output: {
    file: "./lib/index.js",
    format: "es",
  },
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    typescript({ declaration: true }),
    styles({ modules: false }),
    copy({ targets: [{ src: "src/**/*.css", dest: "lib/" }] }),
    terser(),
  ],
};
