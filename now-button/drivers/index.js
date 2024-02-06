import {createDriverAPI} from '@servicenow/ui-testing-helpers';
import {createNowTooltipDriver} from '@servicenow/now-tooltip/drivers';
import {createNowIconDriver} from '@servicenow/now-icon/drivers';
import {toArray} from '@servicenow/library-enhanced-utils';

export const createNowButtonDriver = createDriverAPI(
	[
		'now-button',
		'now-button-iconic',
		'now-button-bare',
		'now-button-stateful',
		'now-button-circular'
	],
	({find, element, driver}) => {
		const __private = {
			async getIcon() {
				const icons = await driver.getNodes('>>> now-icon').then(toArray);
				if (icons.length === 1) {
					return createNowIconDriver(icons[0], element);
				}

				return Promise.all(
					icons.map((icon) => createNowIconDriver(icon, element))
				);
			}
		};

		return {
			__private,

			/**
			 * Returns the text content of the button
			 * @returns {Promise<string>}
			 */
			async getText() {
				return (await find('.now-line-height-crop')).getText();
			},

			/**
			 * Returns a `<now-tooltip>` driver for the tooltip of the button
			 * @returns {Promise<object>}
			 */
			async getTooltip() {
				const tooltip = await find('now-tooltip');
				return createNowTooltipDriver(await tooltip.getNodes(), element);
			},

			/**
			 * Clicks the button
			 * @returns {Promise<void>}
			 */
			async click() {
				return (await find('button')).click();
			}
		};
	}
);
