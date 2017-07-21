import * as React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { autorun } from 'mobx'
import { Provider } from 'mobx-react'

import Router from 'universal-router'

import { RootStoreModel, RootStore } from './stores/RootStore'
import { routes } from './routes'
import { App } from './components/App'

import { api } from './api'

// material-ui 需要這個東西
injectTapEventPlugin()

const stores = RootStoreModel.create({}, { api })

const Redirect = Object.freeze({})

const router = new Router(routes, {
    /** 將 stores 經由 context 傳給各個 route 的 action */
    context: {
        stores,
        redirect: {
            push (path: string, state?: any): never {
                stores.history.push(path, state)
                throw Redirect
            },
            replace (path: string, state?: any): never {
                stores.history.replace(path, state)
                throw Redirect
            },
        }
    },
    resolveRoute (context, params) {
        if (context.route.requireLogin && !stores.auth.isLoggedIn) {
            context.redirect.push('/login', { goBack: true })
        }
        return Router.resolveRoute(context, params)
    }
})

/**
 * 執行一次 router, 然後每當移動到新的path, 自動重新執行
 */
autorun(async () => {
    try {
        const page = await router.resolve({path: stores.history.location.pathname})
        stores.viewStore.setPage(page)
    } catch (error) {
        if (error != Redirect) {
            throw error
        }
    }
})

/**
 * 將 stores 由 Provider 傳給各 Component
 */
render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)

/**
 * 為了 debug 方便, 把一些東西掛到 window 上
 */
window['stores'] = stores
window['api'] = api