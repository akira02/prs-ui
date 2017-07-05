import * as React from 'react'
import { autorun } from 'mobx'
import { Provider } from 'mobx-react'
import Router from 'universal-router'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'


import { Stores } from './stores'
import { routes } from './routes'
import { App } from './components/App'

import { api } from './api'

// material-ui requires this to work properly
injectTapEventPlugin()

// root of all MobX stores
const stores = new Stores()

const router = new Router(routes, {
    context: { stores },
    resolveRoute (context, params) {
        if (typeof context.route.action === 'function') {
            context.route.action(context, params)
            // don't check action result
            return true
        }
        return null
    }
})

autorun(() => {
    router.resolve({path: stores.history.location.pathname})
})

render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// for debug purpose
window['stores'] = stores
window['api'] = api