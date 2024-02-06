import {createEnhancedElement} from '@servicenow/library-enhanced-element';
import {
	extensionSplit,
	filterAriaAttributes
} from '@servicenow/library-enhanced-utils';
import {actionTypes} from '@servicenow/ui-core';
const {COMPONENT_CONNECTED} = actionTypes;
import {Fragment} from '@servicenow/ui-renderer-snabbdom';
import styles from './_now-button.scss';
import '@servicenow/now-icon';
import '@servicenow/now-tooltip';
import focusBehavior from '@servicenow/behavior-focus';
import {configAriaSchema} from '@servicenow/library-schemas';

const _renderIcon = (icon, size) => {
	if (icon) {
		return (
			<now-icon
				className="now-button-icon"
				icon={icon}
				size={size}
				aria-hidden="true"
			/>
		);
	}
};

const _renderTooltip = (state, tooltipContent) => {
	if (tooltipContent) {
		return (
			<now-tooltip
				id={`tooltip-${state.componentId}`}
				target-ref={state.targetRef}
				content={tooltipContent}
			/>
		);
	}
};

/** @seismicView now-button */
const view = (state, {dispatch, updateState}) => {
	const {componentId} = state;
	const {
		label,
		variant,
		size,
		icon = state.properties.iconName,
		bare,
		disabled,
		configAria,
		tooltipContent
	} = state.properties;

	const setTargetRef = (ref) => setTimeout(() => updateState({targetRef: ref}));

	return (
		<Fragment>
			<button
				type="button"
				tabindex={disabled && !tooltipContent ? '-1' : '0'}
				on-mousedown={disabled ? (e) => e.preventDefault() : undefined}
				on-click={() => {
					dispatch(({properties}) => ({
						type: 'NOW_BUTTON#CLICKED',
						payload: {},
						shouldDispatch: !properties.disabled
					}));
				}}
				class={{
					'now-button': true,
					...(!disabled ? extensionSplit(variant) : {}),
					['-' + size]: size,
					'is-bare': bare,
					'is-disabled': disabled,
					'only-icon': icon && !label
				}}
				hook-insert={({elm}) => setTargetRef(elm)}
				hook-destroy={() => setTargetRef(null)}
				{...filterAriaAttributes(configAria, 'button')}
				aria-disabled={String(disabled)}
				aria-describedby={
					tooltipContent ? `tooltip-${componentId}` : undefined
				}>
				<slot>
					{_renderIcon(icon, size)}
					{label ? <span className="now-line-height-crop">{label}</span> : null}
				</slot>
			</button>
			{_renderTooltip(state, tooltipContent)}
		</Fragment>
	);
};

/**
 * Buttons help users act, undo a mistake, or keep a conversation going.
 * Buttons may seem like a simple element, but they often have the biggest impact.
 *
 * There are many types and sizes of buttons, each with a proper use case.
 * In addition to type and size, buttons use smaller design elements
 * such as containers, borders, colors, icons, or text, to accommodate specific use cases.
 *
 * ```jsx
 * <now-button label="Click me" variant="primary" size="lg"></now-button>
 * <now-button label="Settings" icon="cog"></now-button>
 * <now-button label="Disabled button" disabled></now-button>
 * ```
 *
 * @seismicElement now-button
 * @summary Simple button. Contains a text label and an optional icon.
 * @uib.label Button
 * @uib.icon button
 * @uib.description Button with a background color.
 * @uib.category primitives
 * @uib.associatedTypes global.core
 * @uib.properties variant, size, label, icon, disabled, tooltipContent, configAria
 * @uib.actions NOW_BUTTON#CLICKED
 * @uib.slots
 */
createEnhancedElement('now-button', {
	properties: {
		/**
		 * Text displayed inside the button.
		 * @type {string}
		 * @uib.label Label
		 * @uib.defaultValue Button
		 * @uib.description Text displayed inside the button
		 * @uib.translatable true
		 */
		label: {schema: {type: 'string'}},

		/**
		 * Sets the button style, including color and interaction behavior.
		 * @type {('primary'|'primary-positive'|'primary-negative'|'secondary'|'secondary-positive'|'secondary-negative'|'tertiary')}
		 * @uib.label Variant
		 * @uib.description Sets the button style
		 * @uib.typeMetadata.choices [{"label": "Primary", "value": "primary"}, {"label": "Secondary", "value": "secondary"}, {"label": "Tertiary", "value": "tertiary"}, {"label": "Positive Primary", "value": "primary-positive"}, {"label": "Positive Secondary", "value": "secondary-positive"}, {"label": "Negative Primary", "value": "primary-negative"}, {"label": "Negative Secondary", "value": "secondary-negative"}]
		 */
		variant: {
			default: 'secondary',
			schema: {
				type: 'string',
				enum: [
					'primary',
					'primary-positive',
					'primary-negative',
					'secondary',
					'secondary-positive',
					'secondary-negative',
					'tertiary'
				]
			}
		},
		/**
		 * Sets the button size.
		 * @type {('sm'|'md'|'lg')}
		 * @uib.label Size
		 * @uib.description Sets the button size
		 */
		size: {
			default: 'md',
			schema: {
				type: 'string',
				enum: ['sm', 'md', 'lg']
			}
		},
		/** @private */
		iconName: {},
		/**
		 * If defined, specifies the icon to display at the start of the button.
		 * See the `now-icon` component documentation for valid inputs.
		 * For icon-only buttons, use `<now-button-iconic>` instead.
		 * @type {string}
		 * @uib.label Icon
		 * @uib.description Defines icon displayed at the start of the button
		 * @uib.fieldType icon
		 */
		icon: {schema: {type: 'string'}},
		/**
		 * Deprecated in favor of the `<now-button-bare>` tag.
		 * @private
		 */
		bare: {default: false, schema: {type: 'boolean'}},
		/**
		 * Whether to mute the button color and prevent user click interactions.
		 * @type {boolean}
		 * @uib.label Disabled
		 * @uib.description When true, disables user click interactions
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
		 * @uib.description Configures ARIA properties
		 * @uib.defaultValue {}
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
		 * Text content shown inside the tooltip.
		 * @type {string}
		 * @uib.label Tooltip label
		 * @uib.defaultValue Enter a label
		 * @uib.description Text shown inside the tooltip
		 * @uib.translatable true
		 */
		tooltipContent: {schema: {type: 'string'}}
	},
	view,
	styles,
	behaviors: [
		{
			behavior: focusBehavior
		}
	],
	actionHandlers: {
		[COMPONENT_CONNECTED]: ({state, action}) => {
			// eslint-disable-next-line no-undef
			if (process.env.NODE_ENV === 'development') {
				const {id} = action.meta;
				const {icon, label, bare} = state.properties;
				if (icon && !label) {
					// eslint-disable-next-line no-console
					console.warn(
						`[@servicenow/now-button: ${id}] for icon-only buttons, use the <now-button-iconic> tag instead.`
					);
				}
				if (bare) {
					// eslint-disable-next-line no-console
					console.warn(
						`[@servicenow/now-button: ${id}] for bare buttons, use the <now-button-bare> tag instead.`
					);
				}
			}
		}
	},
	dispatches: {
		/**
		 * Dispatched when the button is clicked.
		 * @type {{}}
		 * @uib.description Dispatched when the button is clicked
		 */
		'NOW_BUTTON#CLICKED': {schema: {type: 'object'}}
	},
	slots: {
		/**
		 * Content placed in the default slot appears inside
		 * the button body, taking the place of the `icon` and/or `label`.
		 * @defaultSlot
		 */
		defaultSlot: {}
	}
});
