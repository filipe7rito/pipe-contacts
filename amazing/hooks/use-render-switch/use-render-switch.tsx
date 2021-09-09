import { useState } from 'react';

export type RenderSwitchNode = React.ReactNode;
export type RenderSwitchNodes = Record<string, RenderSwitchNode>;

/**
 * useRenderSwitch provides a switch like construct in a React hook
 */
export default function useRenderSwitch<T extends RenderSwitchNodes>(config: T) {
	const [state, setState] = useState<keyof T | null>(null);

	return {
		/** The name of the current switch */
		currentSwitch: state,

		/** The rendered output of the switch */
		renderSwitch: state ? config[state] : null,

		/** Activates the switch to the given position */
		switchTo(name: keyof T) {
			setState(name);
		},

		/** Unsets the switch from it's active position */
		unswitch() {
			setState(null);
		},
	};
}
