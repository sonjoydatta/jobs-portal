/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { FC } from 'react';
import { StyledComponent } from 'styled-components';
import { CardHeader, CardTitle, CardWrapper } from './styles';

type PropertyType = 'Header' | 'Title';
type CardProperties = Record<
	PropertyType,
	StyledComponent<'div', any, {}, never>
>;

export const Card: FC & CardProperties = (props) => <CardWrapper {...props} />;

Card.Header = CardHeader;
Card.Title = CardTitle;
