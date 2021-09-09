import {
  ComponentProps,
  createElement,
  FunctionComponentFactory,
  Provider,
} from 'react';

type SupportedFactory = FunctionComponentFactory<any> | Provider<any>;
type SupportedFactoryProps<T extends SupportedFactory> = Omit<
  ComponentProps<T>,
  'children'
>;

type ComponentBlueprint<T extends SupportedFactory> = {
  factory: T;
  props?: Omit<ComponentProps<T>, 'children'>;
};

type AdderOptionalProps<P> = [P] | [undefined?];
type AdderRequiredProps<P> = [P];
type AdderProps<P> = RequiredKeys<P> extends never
  ? AdderOptionalProps<P>
  : AdderRequiredProps<P>;

type Adder = <T extends SupportedFactory, P extends SupportedFactoryProps<T>>(
  factory: T,
  ...args: AdderProps<P>
) => ComponentBlueprint<T>;

const addComponent: Adder = <
  T extends SupportedFactory,
  P extends SupportedFactoryProps<T>
>(
  factory: T,
  props?: P
) => {
  return { factory, props };
};

export function reduceComponents(
  callback: (add: typeof addComponent) => ComponentBlueprint<any>[]
) {
  return function ComponentReducer({ children }) {
    const blueprints = callback(addComponent);

    return blueprints.reduceRight((previousElement, currentBlueprint) => {
      return createElement(
        currentBlueprint.factory,
        currentBlueprint.props,
        previousElement
      );
    }, children);
  };
}

/** 
 * const AllProviders = reduceComponents((add) => [
				add(Provider1),
				add(Provider2),
				add(Provider3, { prop: "cenas" }),
				add(AwaitProvidersBoundary, {
					awaitFor: [
						'provider1',
						'provider2',

					],
				}),
			]);

			return (
				<AllProviders>
					<Root />
				</AllProviders>
			);
 */
