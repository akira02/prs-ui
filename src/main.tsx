import * as React from 'react'
import { Provider } from 'mobx-react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { App } from './components/App'

import { Stores } from './stores'

import { api } from './api'

injectTapEventPlugin()

const stores = new Stores()

render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// for debug purpose
window['stores'] = stores
window['api'] = api