import * as React from 'react';
import styled from 'react-emotion';

export enum ButtonStyle {
	default,
	danger
}

interface StyledButtonProps {
	buttonStyle: ButtonStyle,
	disabled?: boolean
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
	cursor: ${props => props.disabled ? 'default' : 'pointer'};
	opacity: ${props => props.disabled ? '0.5' : '1'};
`;

interface OwnProps {
	content: string,
	onClick: () => void
}

export function Button(props: OwnProps & StyledButtonProps) {
	const noOp = () => {};

	return (
		<StyledButton
			buttonStyle={props.buttonStyle}
			disabled={props.disabled}
			onClick={props.disabled ? noOp : props.onClick}>
			{props.content}
		</StyledButton>
	);
}
