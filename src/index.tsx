import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { store } from './store'
import { Main } from './pages/main'

class App extends React.Component {

	render() {
		return (
			<Main />
		)
	}
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
)
