import snabbdom from '@servicenow/ui-renderer-snabbdom';
import cadsoHelloWorldNpm from "@tenonhq/hello-world-npm";
import generate from "@tenonhq/helloworldfn"
import {createEnhancedElement} from '@servicenow/library-enhanced-element';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div>Welcome, {generate()}!
			<cadso-hello-world-npm text={generate()} />
		</div>
	);
};

createEnhancedElement('cadso-hello-world', {
	renderer: {type: snabbdom},
	view,
	styles
});