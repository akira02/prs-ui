import * as React from 'react'
import { Provider } from 'mobx-react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { App } from './components/App'

import { auth } from './store/auth'
import { history } from './store/history'


const stores = { auth, history }

injectTapEventPlugin()

render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// for debug purpose
window['stores'] = stores