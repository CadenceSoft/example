import { createEnhancedElement } from '@servicenow/library-enhanced-element';


const HelloWorldNPM = ({ text }) => {
	return (
		<div className="npm-package-has-been-packaged">
			Hello World, <bold>{text}</bold>
		</div>
	);
};

createEnhancedElement("cadso-hello-world-npm", {
	initialState: {
		text: "Bob",
	},
	view: HelloWorldNPM,
});