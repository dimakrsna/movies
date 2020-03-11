import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { store } from './store'
import { Main } from './pages/main'
import AboutFilm from './pages/about-film'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router, Switch, Route } from 'react-router'
const createBrowserHistory = require("history").createBrowserHistory
const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore);

const stores = {
	store: store,
	routing: routingStore,
}

class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/about-film/:id">
					<AboutFilm />
				</Route>
				<Route path="/">
					<Main />
				</Route>
			</Switch>
		)
	}
}

ReactDOM.render(
	<Provider {...stores}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root'),
)
