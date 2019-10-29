import { injectGlobal } from 'emotion';

import { md } from 'styles/breakpoints';

injectGlobal`
	* {
		all: unset;
		box-sizing: border-box;
	}

	base,
	basefont,
	datalist,
	head,
	meta,
	script,
	style,
	title,
	noembed,
	param,
	template {
		display: none !important;
	}

	body, html {
		display: block;
		width: 100%;
		height: 100%;
	}

	body {
		padding: 24px;
		background-color: rgb(242, 242, 242);
		font-family: 'Raleway', sans-serif;
		color: #333;
		font-size: 14px;
	}

	@media(max-width: ${md}) {
		body, html {
			height: auto;
		}
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: 'Roboto', sans-serif;
		display: block;
		margin-bottom: 12px;
	}
`;
