import { createEnhancedElement } from '@servicenow/library-enhanced-element';


const HelloWorldNPM = ({ text, properties }) => {
	const { text: propText = '' } = properties;
	return (
		<div className="npm-package-has-been-packaged">
			Hello World, <bold>{propText || text}</bold>
		</div>
	);
};

createEnhancedElement("cadso-hello-world-npm", {
	initialState: {
		text: "No Value Provided",
	},
	properties: {
		text: {
			default: "",
		},
	},
	view: HelloWorldNPM,
});