import {createEnhancedElement} from '@servicenow/library-enhanced-element';
import {filterAriaAttributes} from '@servicenow/library-enhanced-utils';
import {Fragment} from '@servicenow/ui-renderer-snabbdom';
import styles from './_now-button-iconic.scss';
import '@servicenow/now-icon';
import '@servicenow/now-tooltip';
import focusBehavior from '@servicenow/behavior-focus';
import {actionTypes} from '@servicenow/ui-core';
import {configAriaSchema} from '@servicenow/library-schemas';

const {COMPONENT_DOM_READY} = actionTypes;

/** @seismicView now-button-iconic */
const view = (state, {dispatch}) => {
	const {componentId, targetRef} = state;
	const {
		variant,
		bare,
		highContrast,
		size,
		icon,
		hidePadding,
		disabled,
		configAria,
		tooltipContent
	} = state.properties;

	const renderTooltip =
		targetRef && tooltipContent ? (
			<now-tooltip
				id={`tooltip-${componentId}`}
				target-ref={targetRef}
				content={tooltipContent}
			/>
		) : (
			undefined
		);

	return (
		<Fragment>
			<button
				type="button"
				class={{
					'now-button-iconic': true,
					['-' + variant]: variant && !disabled,
					['-' + size]: size,
					'high-contrast': highContrast && !disabled,
					'hide-padding': hidePadding,
					'is-disabled': disabled,
					'is-bare': bare
				}}
				tabindex={disabled && !tooltipContent ? '-1' : '0'}
				on-mousedown={disabled ? (e) => e.preventDefault() : undefined}
				on-click={() => {
					dispatch(({properties}) => ({
						type: 'NOW_BUTTON_ICONIC#CLICKED',
						payload: {},
						shouldDispatch: !properties.disabled
					}));
				}}
				{...filterAriaAttributes(configAria, 'button')}
				aria-disabled={String(disabled)}
				aria-describedby={
					tooltipContent ? `tooltip-${componentId}` : undefined
				}>
				<now-icon icon={icon} size={size} aria-hidden="true" />
			</button>
			{renderTooltip}
		</Fragment>
	);
};

/**
 * Iconic buttons use an icon instead of text to convey an action.
 * Although similar to a standard button component, iconic buttons don’t share
 * all of the same properties. The iconic button only displays an icon and
 * cannot display other elements (like labels).
 *
 * ```jsx
 * <now-button-iconic icon="envelope-fill" variant="primary" bare></now-button-iconic>
 * <now-button-iconic icon="envelope-fill" variant="tertiary"></now-button-iconic>
 * <now-button-iconic icon="envelope-outline"></now-button-iconic>
 * ```
 *
 * @seismicElement now-button-iconic
 * @summary Iconic button is a button used to display an actionable icon.
 * The iconic button does not share all the properties of the standard button
 * component.
 * The iconic button only displays an icon and cannot display any other
 * elements like labels.
 * @uib.label Button iconic
 * @uib.icon button-iconic
 * @uib.description Iconic buttons use an icon instead of text to convey an action.
 * @uib.category primitives
 * @uib.associatedTypes global.core
 * @uib.properties icon, variant, size, bare, disabled, hidePadding, highContrast, tooltipContent, configAria
 * @uib.actions NOW_BUTTON_ICONIC#CLICKED
 */
createEnhancedElement('now-button-iconic', {
	properties: {
		/**
		 * Defines icon displayed.
		 * See the `now-icon` component documentation for valid inputs.
		 * @type {string}
		 * @uib.label Icon
		 * @uib.description Name of the icon to use in the button
		 * @uib.defaultValue magnifying-glass-outline
		 * @uib.fieldType icon
		 */
		icon: {required: true, schema: {type: 'string'}},
		/**
		 * Sets the iconic button styles.
		 * @type {('primary'|'secondary'|'tertiary')}
		 * @uib.label Variant
		 * @uib.description Color and behavior of the button
		 */
		variant: {
			default: 'secondary',
			schema: {type: 'string', enum: ['primary', 'secondary', 'tertiary']}
		},
		/**
		 * Removes iconic button border and sets the default background to be
		 * transparent.
		 * @type {boolean}
		 * @uib.description Removes the border and sets the default background to be transparent
		 */
		bare: {default: false, schema: {type: 'boolean'}},
		/**
		 * Sets the iconic button size.
		 * @type {('sm'|'md'|'lg')}
		 * @uib.label Size
		 * @uib.description Size of the button
		 */
		size: {default: 'md', schema: {type: 'string', enum: ['sm', 'md', 'lg']}},
		/**
		 * Sets whether variant colors have higher contrast. Only works when `bare`
		 * is `true`.
		 * @type {boolean}
		 */
		highContrast: {default: false, schema: {type: 'boolean'}},
		/**
		 * Whether to mute the button color and disable user click interactions.
		 * @type {boolean}
		 * @uib.label Disabled
		 * @uib.description Disables the button by muting the colors and preventing click interactions
		 */
		disabled: {default: false, schema: {type: 'boolean'}},
		/**
		 * By default, an iconic button's height is based on the `size` property.
		 * Set to `true` to reduce the iconic button height. This ensures that the
		 * iconic button only takes up the height required by its icon. Buttons
		 * with this property do not align vertically with other button types.
		 * Not recommended for iconic buttons without `bare` property.
		 * @type {boolean}
		 * @uib.label Padding
		 * @uib.description Removes padding from the bare button. Note that the button won't align vertically with other buttons
		 * @uib.fieldType choice
		 * @uib.typeMetadata.choices [{"label": "Show","value": false}, {"label": "Hide","value": true}]
		 * @uib.defaultValue false
		 */
		hidePadding: {default: false, schema: {type: 'boolean'}},
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
		 * @uib.defaultValue {"aria-label": "Search"}
		 * @uib.description Configures ARIA properties
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
		},
		/**
		 * Text content shown inside the tooltip
		 * @type {string}
		 * @uib.label Tooltip text
		 * @uib.defaultValue Enter a label
		 * @uib.description Text to display in a tooltip that describes the button's action
		 * @uib.translatable true
		 */
		tooltipContent: {schema: {type: 'string'}}
	},
	actionHandlers: {
		[COMPONENT_DOM_READY]: ({host, updateState}) => {
			const targetRef = host.shadowRoot.querySelector('.now-button-iconic');
			updateState({targetRef});
		}
	},
	view,
	styles,
	behaviors: [{behavior: focusBehavior}],
	dispatches: {
		/**
		 * Dispatched when the button is clicked.
		 * @type {{}}
		 * @uib.description Dispatched when the button is clicked
		 */
		'NOW_BUTTON_ICONIC#CLICKED': {
			schema: {
				type: 'object'
			}
		}
	}
});
