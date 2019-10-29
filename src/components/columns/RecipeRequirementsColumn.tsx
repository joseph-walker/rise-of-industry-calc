import * as React from 'react';
import { toPairs } from 'ramda';
import { css } from 'emotion';

import { Response } from 'util/Response';
import { Either } from 'util/Either';
import { RequirementTuple, NotificationMessage } from 'data/types';
import { FullSizeLoader } from 'components/widgets/FullSizeLoader';
import { FullSizeNotification, NotificationType } from 'components/widgets/FullSizeNotification';
import { md } from 'styles/breakpoints';

const recipeRequirementsColumnStyles = css`
	grid-area: c;
	margin-left: 12px;

	@media(max-width: ${md}) {
		flex-basis: 100%;
		margin-left: 0;
		margin-top: 24px;
	}
`;

const requirementListStyles = css`
	display: block;
	overflow-y: scroll;
`;

const requirementStyles = css`
	position: relative;
	display: flex;
	margin: 3px 3px 0 3px;
	background-color: #f7f7f7;
	border: 1px solid #F5F5F5;
	padding: 12px;
	height: 42px;
	align-items: center;

	& i {
		position: absolute;
		top: -1px;
		right: 0;
		line-height: 42px;
		color: #FFF;
		width: 40px;
		text-align: center;
		display: block;
		background-color: #454ea0;
	}

	&:last-child {
		margin-bottom: 3px;
	}
`;

interface OwnProps {
	recipeRequirements: Response<Either<NotificationMessage, RequirementTuple>, string>
}

export function RecipeRequirementsColumn(props: OwnProps) {
	const noBlocksMessage = `...and the number of factories you need will show up here`;
	const noBlocksNotification = <FullSizeNotification message={noBlocksMessage} type={NotificationType.notification} />;

	const requirementsContents = props.recipeRequirements.with({
		// Don't show the loader or errors in this column,
		// there's already a notification in the left column
		loading: () => noBlocksNotification,
		error: (err) => null,
		ready: function(eitherRequirements) {
			return eitherRequirements.with({
				left: (err) => <FullSizeNotification message={err.message} type={err.type} />,
				right: function(requirements) {
					if (!Object.keys(requirements).length)
						return noBlocksNotification;

					const listElements = toPairs(requirements).map(function([p, n], i) {
						return (
							<li className={requirementStyles} key={i}>
								<em>{p}</em><i>{n}</i>
							</li>
						);
					});

					return (
						<ul className={requirementListStyles}>{listElements}</ul>
					);
				}
			});
		}
	});

	return (
		<div className={`column ${recipeRequirementsColumnStyles}`}>
			<h2>Factory Requirements</h2>
			<section>{requirementsContents}</section>
		</div>
	);
}
