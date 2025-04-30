import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import autoprefixer from 'autoprefixer'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'

const outDir = './dist'
const inputBase = './dist/.build'
const basePlugins = [resolve(), terser({ output: { comments: false } })]

const createConfig = ({ input, output, external = [], babelPlugin = false }) => ({
  input,
  output,
  external,
  plugins: [
    resolve(),
    ...(babelPlugin ? [babel()] : []),
    terser({ output: { comments: false } }),
  ],
})

const jsBundles = [
  createConfig({
    input: `${inputBase}/keen-slider.js`,
    output: {
      file: `${outDir}/keen-slider.js`,
      format: 'umd',
      name: 'KeenSlider',
      strict: true,
      sourcemap: false,
    },
    babelPlugin: true,
  }),
  createConfig({
    input: `${inputBase}/keen-slider.js`,
    output: {
      file: `${outDir}/keen-slider.cjs.js`,
      format: 'cjs',
      exports: 'named',
    },
  }),
  createConfig({
    input: `${inputBase}/keen-slider.js`,
    output: {
      file: `${outDir}/keen-slider.es.js`,
      format: 'es',
      exports: 'named',
    },
  }),
]

const reactBundles = [
  createConfig({
    input: `${inputBase}/react.js`,
    output: {
      file: `${outDir}/react/react.js`,
      format: 'cjs',
      exports: 'named',
    },
    external: ['react'],
  }),
  createConfig({
    input: `${inputBase}/react.js`,
    output: {
      file: `${outDir}/react/react.es.js`,
      format: 'es',
      exports: 'named',
    },
    external: ['react'],
  }),
  createConfig({
    input: `${inputBase}/react-native.js`,
    output: {
      file: `${outDir}/react/react-native.js`,
      format: 'es',
      exports: 'named',
    },
    external: ['react', 'react-native'],
  }),
]

const vueBundles = [
  createConfig({
    input: `${inputBase}/vue.js`,
    output: {
      file: `${outDir}/vue/vue.js`,
      format: 'cjs',
      exports: 'named',
    },
    external: ['vue'],
  }),
  createConfig({
    input: `${inputBase}/vue.js`,
    output: {
      file: `${outDir}/vue/vue.es.js`,
      format: 'es',
      exports: 'named',
    },
    external: ['vue'],
  }),
]

const styleBundles = [
  {
    input: 'src/keen-slider.scss',
    output: {
      file: `${outDir}/keen-slider.css`,
    },
    plugins: [
      copy({
        targets: [{ dest: `${outDir}/`, src: './src/keen-slider.scss' }],
      }),
      postcss({
        extract: true,
        plugins: [autoprefixer()],
        sourceMap: false,
      }),
    ],
  },
  {
    input: 'src/keen-slider.scss',
    output: {
      file: `${outDir}/keen-slider.min.css`,
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        plugins: [autoprefixer()],
        sourceMap: false,
      }),
    ],
  },
]

export default [...jsBundles, ...reactBundles, ...vueBundles, ...styleBundles]