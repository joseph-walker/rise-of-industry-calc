import { injectGlobal } from 'emotion';

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
		background-color: rgb(242, 242, 242);
		font-family: 'Raleway', sans-serif;
		color: #333;
		font-size: 14px;
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
