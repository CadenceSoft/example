import './now-button';
import './now-button-bare';
import './now-button-iconic';
import './now-button-stateful';
import './now-button-circular';
export {createNowButtonDriver} from '../drivers';

/*
 * TODO: This is a temporary way of debugging customer problems during the
 * Seismic 18 upgrade process, because tectonic resolution makes it hard to
 * know what version of a component is running. Remove when not needed.
 * Intentionally runs in dev + production environments so we can debug all builds.
 */
const {name, version} = require('../package.json');
const registry = (window.___NOW_DESIGN_SYSTEM_PACKAGES___ =
	window.___NOW_DESIGN_SYSTEM_PACKAGES___ || {});
if (!registry[name]) {
	registry[name] = version;
}
