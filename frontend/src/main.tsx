import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './state/store';

const app = (
	<Provider store={store}>
		<div />
	</Provider>
);

render(app, document.getElementById('app'));
