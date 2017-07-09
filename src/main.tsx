import * as React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { autorun } from 'mobx'
import { Provider } from 'mobx-react'

import Router from 'universal-router'

import { Stores } from './stores'
import { routes } from './routes'
import { App } from './components/App'

import { api } from './api'

// material-ui 需要這個東西
injectTapEventPlugin()

// 創造所有 store
const stores = new Stores()

const router = new Router(routes, {
    /**
     * 將 stores 經由 context 傳給各個 route 的 action
     */
    context: { stores },
    
    /**
     * 覆寫 universal-router 預設的行為
     */
    resolveRoute (context, params) {
        if (typeof context.route.action === 'function') {
            context.route.action(context, params)

            // 如果 route 有 action, 直接 return ture,
            // 使 router 不再往下尋找 route
            return true
        } else {

             // return null,
             // 使 router 繼續往下尋找 route
            return null
        }
    }
})

/**
 * 當 pathname 有新的值, 自動執行 router
 */
autorun(() => {
    router.resolve({path: stores.history.location.pathname})
})

/**
 * 將 stores 由 Provider 傳給各 Component
 * 並掛到 html 裡的 .root 上
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