import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import HelloWorldNPM from "@tenonhq/hello-world-npm";
import generate from "@tenonhq/helloworldfn"
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div>Welcome, {generate()}!
			<HelloWorldNPM text={generate()} />
		</div>
	);
};

createCustomElement('cadso-hello-world', {
	renderer: {type: snabbdom},
	view,
	styles
});
