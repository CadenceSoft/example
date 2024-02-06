import {createEnhancedElement} from '@servicenow/library-enhanced-element';
import {filterAriaAttributes} from '@servicenow/library-enhanced-utils';
import styles from './_now-button-bare.scss';
import '@servicenow/now-icon';
import focusBehavior from '@servicenow/behavior-focus';
import {configAriaSchema} from '@servicenow/library-schemas';

const _renderIcon = (icon, logicalProperty, size) => {
	if (icon) {
		return (
			<now-icon
				className={
					size === 'lg'
						? `now-m-${logicalProperty}--xs`
						: `now-m-${logicalProperty}--xxs`
				}
				icon={icon}
				size={size}
				aria-hidden="true"
			/>
		);
	}
};

/** @seismicView now-button-bare */
const view = (state, {dispatch}) => {
	const {
		label,
		variant,
		highContrast,
		size,
		iconStart = state.properties.iconNameStart,
		iconEnd = state.properties.iconNameEnd,
		hidePadding,
		disabled,
		configAria
	} = state.properties;

	return (
		<button
			type="button"
			on-click={() => {
				dispatch(({properties}) => ({
					type: 'NOW_BUTTON_BARE#CLICKED',
					payload: {},
					shouldDispatch: !properties.disabled
				}));
			}}
			class={{
				'now-button-bare': true,
				['-' + variant]: variant && !disabled,
				['-' + size]: size,
				'high-contrast': highContrast && !disabled,
				'hide-padding': hidePadding,
				'is-disabled': disabled
			}}
			disabled={disabled}
			title={label}
			{...filterAriaAttributes(configAria, 'button')}>
			<slot>
				{_renderIcon(iconStart, 'inline-end', size)}
				<span className="now-line-height-crop">
					<span className="now-button-bare-label">{label}</span>
				</span>
				{_renderIcon(iconEnd, 'inline-start', size)}
			</slot>
		</button>
	);
};

/**
 * Bare button is a type of button used to display text with an action.
 * The bare button does not share all the properties of the standard button component.
 *
 * ```jsx
 * <now-button-bare label="Click me" variant="primary" size="lg"></now-button-bare>
 * <now-button-bare label="With icon" icon-start="cog"></now-button-bare>
 * <now-button-bare label="Disabled button" disabled></now-button-bare>
 * ```
 *
 * @seismicElement now-button-bare
 * @summary Simple bare button. Can contain a text label, with or without icons
 * (before and/or after the label).
 * @uib.label Button bare
 * @uib.icon button-bare
 * @uib.description Button with no background color or border
 * @uib.category primitives
 * @uib.associatedTypes global.core
 * @uib.properties variant, size, label, iconStart, iconEnd, disabled, hidePadding, highContrast, configAria
 * @uib.actions NOW_BUTTON_BARE#CLICKED
 * @uib.slots
 */
createEnhancedElement('now-button-bare', {
	properties: {
		/**
		 * Text displayed inside the bare button.
		 * @type {string}
		 * @uib.label Label
		 * @uib.description Text displayed inside the button.
		 * @uib.defaultValue Button
		 * @uib.translatable true
		 */
		label: {schema: {type: 'string'}},
		/**
		 * Sets the bare button styles, including colors and interaction behaviors.
		 * @type {('primary'|'secondary')}
		 * @uib.label Variant
		 * @uib.description Sets the button style.
		 */
		variant: {
			default: 'primary',
			schema: {type: 'string', enum: ['primary', 'secondary']}
		},
		/**
		 * Sets the bare button size.
		 * @type {('sm'|'md'|'lg')}
		 * @uib.label Size
		 * @uib.description Sets the button size.
		 */
		size: {default: 'md', schema: {type: 'string', enum: ['sm', 'md', 'lg']}},
		/**
		 * Sets whether variant colors have higher contrast.
		 * @type {boolean}
		 * @uib.description Increases the accessibility contrast ratio of the icon and label when displayed on darker backgrounds.
		 */
		highContrast: {default: false, schema: {type: 'boolean'}},
		/** @private */
		iconNameStart: {},
		/**
		 * If defined, specifies the icon to display at the start of the bare button.
		 * See the `now-icon` component documentation for valid inputs.
		 * @type {string}
		 * @uib.label Icon left of label
		 * @uib.description Displays an icon at the start of the button.
		 * @uib.fieldType icon
		 */
		iconStart: {schema: {type: 'string'}},
		/** @private */
		iconNameEnd: {},
		/**
		 * If defined, specifies the icon to display at the end of the bare button.
		 * See the `now-icon` component documentation for valid inputs.
		 * @type {string}
		 * @uib.label Icon right of label
		 * @uib.description Displays an icon at the end of the button.
		 * @uib.fieldType icon
		 */
		iconEnd: {schema: {type: 'string'}},
		/**
		 * By default, a bare button's height is based on the `size` property. Set
		 * this to reduce this height so that the bare button only takes up the
		 * height required by the label and/or icons. Note that the buttons with this
		 * property do not align vertically with other button types.
		 * @type {boolean}
		 * @uib.label Hide Padding
		 * @uib.description By default, the button's height is based on the size. Turn on to reduce the button height. This sets the button height to the size of the text. Buttons with this property do not align vertically with other button types.
		 */
		hidePadding: {default: false, schema: {type: 'boolean'}},
		/**
		 * Whether to mute the button color and not allow user click interactions.
		 * @type {boolean}
		 * @uib.label Disabled
		 * @uib.description Disables user click interactions.
		 */
		disabled: {default: false, schema: {type: 'boolean'}},
		/**
		 * An object whose keys reference a specific HTML element within the
		 * now-button. The value of each key is an object that contains an ARIA
		 * property (or properties) and corresponding value/s. These ARIA
		 * properties will be set on the specified element.
		 * The 'button' key corresponds to the inner html `<button>` in
		 * now-button. See https://www.w3.org/TR/wai-aria-1.1/#button for
		 * properties and accepted values.
		 * @type {{ 'aria-*': string }}
		 * @uib.label ARIA properties
		 * @uib.defaultValue {}
		 * @uib.description ARIA properties that are set on the inner html. See https://www.w3.org/TR/wai-aria-1.1/#button for properties and accepted values.
		 */
		configAria: {
			schema: {
				oneOf: [
					{
						type: 'object',
						properties: {
							button: configAriaSchema
						},
						additionalProperties: false
					},
					configAriaSchema
				]
			}
		}
	},
	view,
	styles,
	behaviors: [
		{
			behavior: focusBehavior
		}
	],
	dispatches: {
		/**
		 * Dispatched when the button is clicked.
		 * @type {{}}
		 * @uib.description Dispatched when the button is clicked
		 */
		'NOW_BUTTON_BARE#CLICKED': {schema: {type: 'object'}}
	},
	slots: {
		/**
		 * Content placed in the default slot of the now-button-bare appears
		 * inside the body of the button, taking the place of `iconStart`,
		 * `iconEnd`, and/or `label`.
		 * @defaultSlot
		 */
		defaultSlot: {}
	}
});
