import * as React from 'react'
import {render} from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {autorun} from 'mobx'
import {Provider} from 'mobx-react'

import {RootStoreModel} from './stores/RootStore'

import {createRouter, runRouter} from './router'
import {routes} from './routes'
import {App} from './components/App'

import {api} from './api'

// material-ui 需要這個東西
injectTapEventPlugin()

// 產生所有 store
const stores = RootStoreModel.create({}, { api })

// 產生 router
const router = createRouter(routes)

// 用 autorun 讓 router 能在 url 改變時自動重新執行
autorun(async () => {
    await runRouter(router, { stores })
})

render(
    // 將 api 和 stores 由 Provider 傳給各 Component
    <Provider api={api} {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)

/**
 * 為了 debug 方便, 把一些東西掛到 window 上
 */
window['stores'] = stores
window['api'] = api