import {createEnhancedElement} from '@servicenow/library-enhanced-element';
import {
	extensionSplit,
	filterAriaAttributes
} from '@servicenow/library-enhanced-utils';
import {Fragment} from '@servicenow/ui-renderer-snabbdom';
import styles from './_now-button-stateful.scss';
import '@servicenow/now-icon';
import '@servicenow/now-tooltip';
import focusBehavior from '@servicenow/behavior-focus';
import {actionTypes} from '@servicenow/ui-core';
import {
	ariaTranslatableProps,
	configAriaSchema
} from '@servicenow/library-schemas';

const {COMPONENT_DOM_READY} = actionTypes;

const _renderIcon = (icon, size, variant, selected) => {
	if (icon) {
		let iconFilledOrOutline = icon;
		if (
			selected &&
			(variant === 'primary-highlighted' || variant === 'secondary-highlighted')
		) {
			iconFilledOrOutline = icon;
		} else if (selected) {
			iconFilledOrOutline = icon.replace('-outline', '-fill');
		} else {
			iconFilledOrOutline = icon.replace('-fill', '-outline');
		}

		return (
			<now-icon icon={iconFilledOrOutline} size={size} aria-hidden="true" />
		);
	}
};

/** @seismicView now-button-stateful */
const view = (state, {dispatch}) => {
	const {
		configRole,
		variant,
		highContrast,
		size,
		icon,
		selected,
		hidePadding,
		disabled,
		configAria,
		tooltipContent
	} = state.properties;
	const {targetRef} = state;

	const ariaRole =
		(configAria && configAria.button && configAria.button.role) || configRole;

	const renderTooltip =
		targetRef && tooltipContent ? (
			<now-tooltip
				id="tooltip"
				target-ref={targetRef}
				content={tooltipContent}
			/>
		) : (
			undefined
		);

	const onButtonClicked = (evt) => {
		evt.preventDefault();
		dispatch(({properties}) => ({
			type: 'NOW_BUTTON_STATEFUL#SELECTED_SET',
			payload: {value: !properties.selected},
			shouldDispatch: !properties.disabled
		}));
	};

	const ariaPressedCheckedOrSelected = (ariaRole, selected) => {
		if (ariaRole === 'button') {
			return {['aria-pressed']: selected ? 'true' : 'false'};
		}
		if (ariaRole === 'radio') {
			return {['aria-checked']: selected ? 'true' : 'false'};
		}
		if (ariaRole === 'tab') {
			return {['aria-selected']: selected ? 'true' : 'false'};
		}
	};

	return (
		<Fragment>
			<button
				type="button"
				class={{
					'now-button-stateful': true,
					'is-selected': selected,
					...(!disabled ? extensionSplit(variant) : {}),
					['-' + size]: size,
					'high-contrast': highContrast && !disabled,
					'hide-padding': hidePadding,
					'is-disabled': disabled
				}}
				tabindex={disabled && !tooltipContent ? '-1' : '0'}
				on-mousedown={disabled ? (e) => e.preventDefault() : undefined}
				// eslint-disable-next-line jsx-a11y/role-has-required-aria-props
				role={ariaRole}
				{...filterAriaAttributes(configAria, 'button')}
				{...ariaPressedCheckedOrSelected(ariaRole, selected)}
				aria-describedby={tooltipContent ? 'tooltip' : undefined}
				aria-disabled={String(disabled)}
				on-click={onButtonClicked}>
				{icon ? _renderIcon(icon, size, variant, selected) : undefined}
			</button>
			{renderTooltip}
		</Fragment>
	);
};

/**
 * The stateful button can be toggled between two states that are visually
 * distinguishable from each other. It also provides an option for displaying an active
 * or selected state.
 *
 * Currently, the stateful button only displays an icon and doesn't support other elements, such as labels.
 *
 * Examples
 *
 * ```jsx
 * <now-button-stateful
 *      icon="magnifying-glass-outline"
 *		variant="primary"
 * />
 *
 * <now-button-stateful
 *      icon="magnifying-glass-outline"
 *		variant="primary-highlighted"
 *		config-role="radio"
 * />
 *
 * <now-button-stateful
 *      icon="magnifying-glass-outline"
 *		variant="primary-highlighted"
 *		config-role="tab"
 * />
 *
 * <now-button-stateful
 *      icon="magnifying-glass-outline"
 *		config-role="radio"
 *		config-aria={{
 * 			button: {'aria-label': 'Search'}
 * 		}}
 *
 * />
 *
 * <now-button-stateful
 * 		icon="envelope-outline"
 * 		tooltip-content="Email"
 * />
 * ```
 *
 * @seismicElement now-button-stateful
 * @summary The stateful button is a button used to display an actionable icon.
 * The stateful button doesn't share all the properties of the standard button component.
 * The stateful button only displays an icon and cannot display any other elements, like labels.
 * The button can be toggled between an on and off state.
 * @uib.label Button stateful
 * @uib.icon button-stateful
 * @uib.description The stateful button is a button used to display an actionable icon. The stateful button doesn't share all the properties of the standard button component. The stateful button only displays an icon and cannot display any other elements, like labels.
 * @uib.category primitives
 * @uib.associatedTypes global.core
 * @uib.properties icon, selected, variant, size, configRole, disabled, hidePadding, highContrast, tooltipContent, configAria
 * @uib.actions NOW_BUTTON_STATEFUL#SELECTED_SET
 */

createEnhancedElement('now-button-stateful', {
	properties: {
		/**
		 * Deprecated, use `config-aria` instead
		 * Defines the aria role of the component.
		 * @type {('button'|'radio'|'tab')}
		 * @private
		 */
		configRole: {
			default: 'button',
			schema: {type: 'string', enum: ['button', 'radio', 'tab']}
		},
		/**
		 * Defines the icon displayed.
		 * See the `now-icon` component documentation for valid inputs.
		 * Note: By default, the `-outline` version of this icon displays,
		 * even if the `-fill` version is assigned. The `-fill` version
		 * shows if the button is selected by the user.
		 * @type {string}
		 * @uib.label Icon
		 * @uib.description By default, the `-outline` version of this icon displays, even if the `-fill` version is assigned. The `-fill` version shows if the button is selected by the user.
		 * @uib.defaultValue magnifying-glass-plus-outline
		 * @uib.fieldType icon
		 */
		icon: {required: true, schema: {type: 'string'}},
		/**
		 * Indicates the selected state of the stateful button.
		 * Maps to `aria-pressed` for a toggle button, `aria-checked` for a radio button,
		 * and `aria-selected` for a tab.
		 * Use `manage-selected` to override the default behavior and handle the
		 * `NOW_BUTTON_STATEFUL#SELECTED_SET` action manually.
		 * @type {boolean}
		 * @uib.description Indicates the selected state of the stateful button. Maps to `aria-pressed` for a toggle button, `aria-checked` for a radio button, and `aria-selected` for a tab.
		 */
		selected: {default: false, manageable: true, schema: {type: 'boolean'}},
		/**
		 * Sets the stateful button styles.
		 * For `primary`, `secondary`, and `tertiary`, the selected style is indicated with a filled icon.
		 * For `primary-highlighted` and `secondary-highlighted` the selected style is indicated with a highlighted background.
		 * @type {('primary'|'primary-highlighted'|'secondary'|'secondary-highlighted'|'tertiary')}
		 * @uib.label Variant
		 * @uib.description Color and behavior of the button
		 */
		variant: {
			default: 'secondary',
			schema: {
				type: 'string',
				enum: [
					'primary',
					'primary-highlighted',
					'secondary',
					'secondary-highlighted',
					'tertiary'
				]
			}
		},
		/**
		 * Sets the button size.
		 * @type {('sm'|'md'|'lg')}
		 * @uib.label Size
		 * @uib.description Size of the button
		 */
		size: {default: 'md', schema: {type: 'string', enum: ['sm', 'md', 'lg']}},
		/**
		 * Sets the style to increase the contrast when a stateful button is displayed on a colored background.
		 * @type {boolean}
		 */
		highContrast: {default: false, schema: {type: 'boolean'}},
		/**
		 * By default, a stateful button's height is based on the `size` property. Set
		 * to `true` to reduce this height so that the stateful button only occupies the
		 * height required by its icon. Note: Buttons with this property don't align
		 * vertically with other button types.
		 * @type {boolean}
		 * @uib.label Padding
		 * @uib.description Removes padding from the bare button. Note that the button won't align vertically with other buttons
		 * @uib.fieldType choice
		 * @uib.typeMetadata.choices [{"label": "Show","value": false}, {"label": "Hide","value": true}]
		 * @uib.defaultValue false
		 */
		hidePadding: {default: false, schema: {type: 'boolean'}},
		/**
		 * Whether to mute the button color and disallow user-click interactions.
		 * @type {boolean}
		 * @uib.label Disabled
		 * @uib.description Disables the button by muting the colors and preventing click interactions
		 */
		disabled: {default: false, schema: {type: 'boolean'}},
		/**
		 * An object whose keys reference a specific HTML element within the
		 * now-button-stateful. The value of each key is an object that contains an ARIA
		 * property (or properties) and corresponding value/s. These ARIA
		 * properties will be set on the specified element.
		 * The 'button' key corresponds to the inner html `<button>` in
		 * now-button-stateful.
		 * Set the "role" attribute to specify the aria role of the component.
		 * Set the role to "button" for a toggle button.
		 * Set the role to "radio" for a radio button.
		 * Set the role to "tab" for a button used as a tab.
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
							button: {
								type: 'object',
								properties: ariaTranslatableProps,
								patternProperties: {
									'^aria-': {type: 'string'}
								},
								additionalProperties: {
									role: {type: 'string', enum: ['button', 'radio', 'tab']}
								}
							}
						},
						additionalProperties: false
					},
					configAriaSchema
				]
			}
		},
		/**
		 * Text content shown inside the tooltip.
		 * @type {string}
		 * @uib.label Tooltip text
		 * @uib.defaultValue Start search
		 * @uib.description Text to display in a tooltip when hovering over the button
		 * @uib.translatable true
		 */
		tooltipContent: {schema: {type: 'string'}}
	},
	view,
	styles,
	actionHandlers: {
		[COMPONENT_DOM_READY]: ({host, updateState}) => {
			const targetRef = host.shadowRoot.querySelector('.now-button-stateful');
			updateState({targetRef});
		}
	},
	dispatches: {
		/**
		 * Dispatched when the user toggles the selected status of the button.
		 * Set the `manage-selected` property to override the default behavior and
		 * handle this action manually.
		 * @type {{value: boolean}}
		 * @uib.description Dispatched when the user toggles the selected status of the button
		 */
		'NOW_BUTTON_STATEFUL#SELECTED_SET': {
			schema: {
				type: 'object',
				properties: {
					value: {type: 'boolean'}
				}
			}
		}
	},
	behaviors: [{behavior: focusBehavior}]
});
