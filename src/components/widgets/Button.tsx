import * as React from 'react';
import styled from 'react-emotion';

export enum ButtonStyle {
	default,
	danger
}

interface StyledButtonProps {
	buttonStyle: ButtonStyle
}

function backgroundColor({ buttonStyle }: StyledButtonProps): string {
	return ({
		[ButtonStyle.default]: '#454ea0',
		[ButtonStyle.danger]: '#f16628'
	})[buttonStyle];
}

function borderColor({ buttonStyle }: StyledButtonProps): string {
	return ({
		[ButtonStyle.default]: '#3d4590',
		[ButtonStyle.danger]: '#dc632d'
	})[buttonStyle];
}

const StyledButton = styled('button')`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px;
	text-align: center;
	color: #FFFFFF;
	background-color: ${backgroundColor};
	border: 1px solid transparent;
	border-color: ${borderColor};
	border-radius: 4px;
	cursor: pointer;
`;

interface OwnProps {
	content: string,
	onClick: () => void,
	disabled?: boolean
}

export function Button(props: OwnProps & StyledButtonProps) {
	return (
		<StyledButton
			buttonStyle={props.buttonStyle}
			onClick={props.onClick}>
			{props.content}
		</StyledButton>
	);
}
