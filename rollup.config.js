import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: 'utils/tracker.js',
  output: {
    file: 'public/tracker.js',
    format: 'iife',
  },
  plugins: [
    commonjs(),
    terser({ compress: { evaluate: false } }),
    resolve({
      // jsnext: true, --> this was depreciated, check later.
      preferBuiltins: true,
      browser: true,
    }),
  ],
};
