import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import importCss from 'rollup-plugin-import-css';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/index.ts',
		output: {
			dir: 'dist',
			sourcemap: true
		},
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
