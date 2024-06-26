import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import importCss from 'rollup-plugin-import-css';
import { visualizer } from 'rollup-plugin-visualizer';

export default [
	{
		input: 'src/index.ts',
		output: {
			dir: 'dist',
			sourcemap: true
		},
		external: ['lit', /\@lit\/(.*)/, 'leaflet'],
		plugins: [
			// visualizer(),
			nodeResolve(),
			json(),
			commonjs(),
			importCss(),
			typescript({ compilerOptions: { declaration: true } })
		],
		cache: false
	},
	{
		input: 'src/HighlightableMapBundled.ts',
		output: {
			file: 'dist/HighlightableMapBundled.min.js',
			sourcemap: true,
			plugins: [terser()]
		},
		watch: true,
		plugins: [nodeResolve(), json(), commonjs(), importCss(), typescript()]
	}
];
