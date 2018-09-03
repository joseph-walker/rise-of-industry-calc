import * as React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';

export enum NotificationType {
	error,
	notification
}

interface IconProps {
	notificationType: NotificationType
}

function iconColor({ notificationType }: IconProps): string {
	return ({
		[NotificationType.error]: '#f16628',
		[NotificationType.notification]: '#999'
	})[notificationType];
}

function fasIcon(type: NotificationType) {
	return ({
		[NotificationType.error]: <i className="fas fa-exclamation-triangle"></i>,
		[NotificationType.notification]: <i className="far fa-question-circle"></i>
	})[type];
}

const fullSizeNotificationStyles = css`
	display: flex;
	flex-direction: column;
	padding: 12px;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;
	max-width: 320px;
	margin: auto;
`;

const bugReportCopy = css`
	font-size: 12px;
	color: #999;
	margin-top: 24px;
`;

const Icon = styled('i')`
	font-size: 18px;
	display: block;
	margin-bottom: 6px;
	color: ${iconColor};
`;

interface OwnProps {
	type: NotificationType,
	message: string | JSX.Element
}

export function FullSizeNotification(props: OwnProps) {
	return (
		<div className={fullSizeNotificationStyles}>
			<Icon notificationType={props.type}>{fasIcon(props.type)}</Icon>
			<p>{props.message}</p>
			{ props.type === NotificationType.error
				? <p className={bugReportCopy}>This obviously shouldn't happen. Consider opening an issue on GitHub about this problem.</p>
				: null
			}
		</div>
	);
}
