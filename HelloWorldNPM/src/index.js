import { createCustomElement } from "@servicenow/ui-core";

const HelloWorldNPM = ({ text }) => {
	return (
		<div>Hello World, <bold>{text}</bold></div>);
};

createCustomElement("hello-world-npm", {
	initialState: {
		text: "Bob",
	},
	view: HelloWorldNPM,
});

export default HelloWorldNPM;
