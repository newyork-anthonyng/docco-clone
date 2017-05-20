import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  moduleName: 'Docco',
  format: 'cjs',
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs()
  ]
};
