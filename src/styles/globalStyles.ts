import { injectGlobal } from 'emotion';

import { sm, md } from 'styles/breakpoints';

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
		width: 100%;
		height: 100%;
	}

	body {
		display: block;
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
