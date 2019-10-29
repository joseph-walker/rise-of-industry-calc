import * as React from 'react';
import { css } from 'emotion';

import { ButtonStyle, Button } from 'components/widgets/Button';
import { sm } from 'styles/breakpoints';

const footerStyles = css`
	grid-area: f;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 24px;

	@media(max-width: ${sm}) {
		flex-direction: column-reverse;
	}

	& button {
		margin-left: 6px;
	}

	& button:first-child {
		margin-left: 0;
	}
`;

const links = css`
	display: flex;
	align-items: center;

	& > li {
		margin: 0 6px;
	}

	& > li:first-child {
		margin-left: 0;
	}

	& > li:last-child {
		margin-right: 0;
	}
`;

const link = css`
	color: #999;
	font-weight: bold;
	cursor: pointer;
	transition: color 0.1s ease-in-out;

	&:hover {
		color: #454ea0;
	}
`;

const iconLink = css`
	${link}

	font-size: 24px;
	font-weight: normal;
`;

const controls = css`
	margin-left: auto;
	@media(max-width: ${sm}) {
		margin: auto;
		margin-bottom: 24px;
	}
`;

interface OwnProps {
	numSelectedProducts: number,
	onRemoveAllProducts: () => void
}

export function Footer(props: OwnProps) {
	return (
		<footer className={footerStyles}>
			<ul className={links}>
				<li><a target="_blank" className={link} href="https://dapperpenguinstudios.itch.io/rise-of-industry">Rise of Industry</a></li>
				<li>
					<a target="_blank" className={iconLink} href="https://store.steampowered.com/app/671440/Rise_of_Industry/">
						<i className="fab fa-steam-square"></i>
					</a>
				</li>
				<li>
					<a target="_blank" className={iconLink} href="https://www.reddit.com/r/RiseOfIndustry/">
						<i className="fab fa-reddit-square"></i>
					</a>
				</li>
				<li>
					<a target="_blank" className={iconLink} href="https://github.com/joseph-walker/rise-of-industry-calc">
						<i className="fab fa-github-square"></i>
					</a>
				</li>
			</ul>
			<section className={controls}>
				<Button
					buttonStyle={ButtonStyle.danger}
					disabled={props.numSelectedProducts == 0}
					content={`Clear Selected Products`}
					onClick={props.onRemoveAllProducts} />
			</section>
		</footer>
	);
}
