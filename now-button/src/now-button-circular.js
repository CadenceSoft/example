import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import {filterAriaAttributes} from '@servicenow/library-enhanced-utils';
import {Fragment} from '@servicenow/ui-renderer-snabbdom';
import rtlBehavior from '@servicenow/behavior-rtl';
import '@servicenow/now-icon';
import '@servicenow/now-tooltip';
import styles from './_now-button-circular.scss';
import {configAriaSchema} from '@servicenow/library-schemas';

const {COMPONENT_DOM_READY} = actionTypes;

const handleClick = (dispatch) => {
	dispatch(({properties}) => ({
		type: 'NOW_BUTTON_CIRCULAR#CLICKED',
		payload: {},
		shouldDispatch: !properties.disabled
	}));
};

const view = (state, {dispatch}) => {
	const {
		disabled,
		hasShadow,
		icon,
		tooltipContent,
		configAria
	} = state.properties;
	const {targetRef, componentId} = state;

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
					'now-button-circular': true,
					'is-disabled': disabled,
					'has-shadow': hasShadow
				}}
				tabindex={disabled && !tooltipContent ? '-1' : '0'}
				on-mousedown={disabled ? (e) => e.preventDefault() : undefined}
				{...filterAriaAttributes(configAria, 'button')}
				aria-disabled={String(disabled)}
				aria-describedby={tooltipContent ? `tooltip-${componentId}` : undefined}
				on-click={() => handleClick(dispatch)}>
				<now-icon icon={icon} size="lg" />
			</button>
			{renderTooltip}
		</Fragment>
	);
};

/**
 * Circular buttons use a circle container to display
 * an actionable icon and do not include a label. Always include
 * a `config-aria` property with `aria-label` set to denote its relationship to other elements
 * or describe its action.
 *
 * ```jsx
 * <now-button-circular icon="chat-fill"></now-button-iconic>
 * <now-button-circular icon="chat-fill" has-shadow></now-button-iconic>
 * <now-button-circular icon="chat-fill" disabled></now-button-iconic>
 * ```
 *
 * @seismicElement now-button-circular
 * @summary An actionable icon in a circular format.
 * @uib.label Button circular
 * @uib.icon button-circular
 * @uib.description An actionable icon in a circular format.
 * @uib.category primitives
 * @uib.associatedTypes global.core
 * @uib.properties icon, disabled, tooltipContent, configAria, hasShadow
 * @uib.actions NOW_BUTTON_CIRCULAR#CLICKED
 */
createCustomElement('now-button-circular', {
	properties: {
		/**
		 * Defines the icon to display inside the button.
		 * See the `now-icon` component documentation for valid inputs.
		 * @type {string}
		 * @uib.label Icon
		 * @uib.defaultValue chat-fill
		 * @uib.fieldType icon
		 */
		icon: {required: true, schema: {type: 'string'}},
		/**
		 * When true, mutes the button color and disables user interactions.
		 * @type {boolean}
		 * @uib.label Disabled
		 * @uib.description When true, mutes the button color and disables user interactions
		 */
		disabled: {default: false, schema: {type: 'boolean'}},
		/**
		 * An object whose keys reference a specific HTML element within the
		 * now-button. The value of each key is an object that contains an ARIA
		 * property (or properties) and corresponding value/s that are set on the specified element.
		 * The 'button' key corresponds to the inner html `<button>` in
		 * now-button. See https://www.w3.org/TR/wai-aria-1.1/#button for
		 * properties and accepted values.
		 * @type {{ 'aria-*': string }}
		 * @uib.label ARIA properties
		 * @uib.defaultValue {"aria-label": "Chat"}
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
		 * When true, adds a box shadow to the button.
		 * @type {boolean}
		 * @uib.label Show Shadow
		 * @uib.description When true, adds a box shadow to the button
		 */
		hasShadow: {default: false, schema: {type: 'boolean'}},
		/**
		 * Text shown inside the tooltip.
		 * @type {string}
		 * @uib.label Tooltip text
		 * @uib.defaultValue Open chat window
		 * @uib.description Text shown inside the tooltip.
		 * @uib.translatable true
		 */
		tooltipContent: {schema: {type: 'string'}}
	},
	dispatches: {
		/**
		 * Dispatched when the button is clicked.
		 * @type {{}}
		 * @uib.description Dispatched when the button is clicked
		 */
		'NOW_BUTTON_CIRCULAR#CLICKED': {
			schema: {
				type: 'object'
			}
		}
	},
	initialState: {
		targetRef: null
	},
	actionHandlers: {
		[COMPONENT_DOM_READY]: ({host, updateState}) => {
			const targetRef = host.shadowRoot.querySelector('.now-button-circular');
			updateState({targetRef});
		}
	},
	behaviors: [{behavior: rtlBehavior}],
	view,
	styles
});
