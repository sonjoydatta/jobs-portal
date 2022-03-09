import 'styled-components';

type ColorVariant = 'primary' | 'success' | 'danger';
type Colors = Record<ColorVariant, string>;
type Border = {
	radius: string;
};

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: Colors;
		border: Border;
	}
}
