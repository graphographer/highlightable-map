import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import importCss from 'rollup-plugin-import-css';

export default [
	{
		input: 'src/index.ts',
		output: {
			dir: 'dist',
			sourcemap: true
		},
		external: ['lit', 'leaflet'],
		plugins: [nodeResolve(), json(), commonjs(), importCss(), typescript()]
	},
	{
		input: 'src/HighlightableMapBundled.ts',
		output: {
			file: 'dist/HighlightableMapBundled.min.js',
			sourcemap: true,
			plugins: [terser()]
		},
		plugins: [nodeResolve(), json(), commonjs(), importCss(), typescript()]
	}
];
