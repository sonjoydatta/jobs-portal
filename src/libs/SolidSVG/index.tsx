import { FC, memo, SVGAttributes } from 'react';

export type SolidSVGProps = {
	path: string;
} & SVGAttributes<SVGElement>;

const SolidSVG: FC<SolidSVGProps> = (props) => {
	const {
		path,
		fill = 'currentColor',
		width = 24,
		height = 24,
		viewBox = '0 0 24 24',
		...rest
	} = props;
	const svgProps = { width, height, fill, viewBox, ...rest };

	return (
		<svg {...svgProps} xmlns='http://www.w3.org/2000/svg'>
			<path d={path} />
		</svg>
	);
};

export default memo(SolidSVG);
export * from './paths';
