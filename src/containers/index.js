import React from 'react'

// redux store
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'store'
// router
import { BrowserRouter as Router } from 'react-router-dom'
import { ErrRes } from 'components'
import Wiki from './Wiki'

const Root = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<ErrRes/>
			<Router basename={
				process.env.REACT_APP_ENVIRONMENT === 'production'
					? 'https://bluedemontr.github.io/se3355-midterm/'
					: ''
				
			}>
				<Wiki />
			</Router>
		</PersistGate>
	</Provider>
)

export default Root
