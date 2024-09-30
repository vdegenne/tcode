import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

/** @type {import('rollup').RollupOptions} */
export default [
	{
		input: './src/binance.ts',
		output: {file: './lib/binance.js'},
		plugins: [
			typescript(),
			nodeResolve(),
			terser({
				format: {
					comments: false,
				},
			}),
		],
	},
];
