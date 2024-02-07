import './cadso-hello-world-npm';
const {name, version} = require('../package.json');
const registry = (window.___TENON_COMPONENTS___ =
	window.___TENON_COMPONENTS___ || {});
if (!registry[name]) {
	registry[name] = version;
}
