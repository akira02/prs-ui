import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { autorun } from 'mobx'
import { Provider } from 'mobx-react'

import { RootStoreModel } from './stores/RootStore'

import { createRouter, runRouter } from './router'
import { routes } from './routes'
import { App } from './components/App'

import { api } from './api'

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

function renderApp(Component: React.ReactType) {
    render(
        <AppContainer>
            <Provider api={api} {...stores}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}

renderApp(App)

// 為了 debug 方便, 把一些東西掛到 window 上
window['stores'] = stores
window['api'] = api

// 支援 webpack 的 hot reload
if (module.hot) {
    module.hot.accept('./components/App', () => {
        renderApp(App)
    })
}
