/*
 * npm records frontend dependencies and scripts in package.json. Build tools
 * transform modules/assets for development and production; they do not replace
 * understanding the browser runtime.
 */
const packageIntent = { scripts: { build: "tool build", test: "tool test" } };
console.log(packageIntent.scripts.build);
// Challenge: inspect a package.json and explain each script before running it.
