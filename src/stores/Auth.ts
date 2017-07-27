import { types, getEnv, addDisposer } from 'mobx-state-tree'
import { reaction } from 'mobx'

/** 在瀏覽器 storage 存資料時使用的 key */
const STORAGE_KEY: string = 'auth'

/** 儲存登入訊息 */
export const AuthModel = types.model(
    'Auth',
    {
        /** 是否記住使用者 */
        remember: false,
        /** api 的 token */
        token: types.maybe(types.string),
        /** 是否已經登入 */
        get isLoggedIn() {
            return this.token != null
        }
    },
    {
        /** 登入 */
        async login(name: string, password: string) {
            const { api } = getEnv(this)
            const response = await api
                .post('users/login')
                .send({ name, password })

            this.updateToken(response.body.token)
        },
        /** 設定是否記住使用者 */
        setRemember(remember: boolean) {
            this.remember = remember
        },
        /** 更新 token */
        updateToken(token) {
            this.token = token
        },
        /** 登出 */
        logout() {
            this.token = null
        },
        afterAttach() {
            this.readFromStorage()

            // 資料有變動時, 自動儲存資料
            addDisposer(
                this,
                reaction(
                    () => ({
                        storage: this.remember ? localStorage : sessionStorage,
                        data: { token: this.token, remember: this.remember }
                    }),
                    this.saveToStorage
                )
            )
        },
        /** 從瀏覽器讀取資料 */
        readFromStorage() {
            const json =
                sessionStorage.getItem(STORAGE_KEY) ||
                localStorage.getItem(STORAGE_KEY)
            if (json == null) return
            const { remember, token } = JSON.parse(json)
            this.remember = remember
            this.token = token
        },
        /** 將資料寫入瀏覽器 */
        saveToStorage({ storage, data }) {
            storage.setItem(STORAGE_KEY, JSON.stringify(data))
        }
    }
)

export type Auth = typeof AuthModel.Type
