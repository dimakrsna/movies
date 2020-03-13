import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { store } from './store'
import { Main } from './pages/main'
import { Page404 } from './pages/404'
import { ErrorBoundary } from './common/error-boundary'
import AboutFilm from './pages/about-film'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router, Switch, Route } from 'react-router'
const createBrowserHistory = require('history').createBrowserHistory
const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)

const stores = {
	store: store,
	routing: routingStore,
}

class App extends React.Component {
	render() {
		return (
			<ErrorBoundary>
				<Switch>
					<Route exact path="/about-film/:id" component={AboutFilm} />
					<Route exact path="/" component={Main} />
					<Route path="*" component={Page404} />
				</Switch>
			</ErrorBoundary>
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
