import Router from 'universal-router'
import {RootStore} from './stores/RootStore'

export class Redirect {
    constructor (
        public action: 'push' | 'replace',
        public path: string,
        public state?: any
    ) {}
}

export function createRouter (routes: Route[]): Router {
    return new Router(routes, {
        context: {
            redirect: {
                push (path: string, state?: any): never {
                    throw new Redirect('push', path, state)
                },
                replace (path: string, state?: any): never {
                    throw new Redirect('replace', path, state)
                },
            }
        },
        resolveRoute (context, params) {
            if (context.route.requireLogin && !context.stores.auth.isLoggedIn) {
                context.redirect.push('/login', { goBack: true })
            }
            return Router.resolveRoute(context, params)
        }
    })
}

export async function runRouter (router: Router, context: Partial<Context>) {
    const {stores} = context
    try {
        const page = await router.resolve({
            path: stores.history.location.pathname,
            ...context
        })
        stores.viewStore.setPage(page)
    } catch (error) {
        if (error instanceof Redirect) {
            handleRedirect(error, stores)
        } else {
            throw error
        }
    }
}

function handleRedirect (redirect: Redirect, stores: RootStore) {
    switch (redirect.action) {
        case 'push':
            stores.history.push(redirect.path, redirect.state)
            break
        case 'replace':
            stores.history.replace(redirect.path, redirect.state)
            break
    }
}

interface Context {
    params: any,
    stores: RootStore,
    next: Function,
    redirect: {
        push (path: string, state?: any): never
        replace (path: string, state?: any): never
    }
}

type Action = (ctx: Context) => Promise<any> | any

/**
 * 定義 route 的資料格式
 * @export
 * @interface Route
 */
export interface Route {
    /** 用來跟 url 比對的字串 */
    path: string

    /** 生成 PageData 的 function */
    action?: Action

    /** 頁面是否需要登入 (也會作用到children) */
    requireLogin?: boolean

    /**
     * children 裡的 route 會用前面比對之後剩下部分繼續比對
     * 比如
     * {
     *     path: '/aaa',
     *     children: {
     *         path: '/bbb'
     *     }
     * }
     * 能比對到 '/aaa/bbb'
     */
    children?: Route[]
}

