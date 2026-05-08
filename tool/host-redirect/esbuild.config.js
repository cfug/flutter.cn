import esbuild from 'esbuild'

await esbuild.build({
  globalName: 'hostRedirect',
  entryPoints: ['src/index.js'],
  outfile: 'build/host-redirect.min.js',
  bundle: true,
  minify: true,
  format: 'iife',
  sourcemap: false,
}).catch(() => process.exit(1));