import { types } from 'mobx-state-tree'
import { PageDataModel, PageData } from './PageData'

import * as shortId from 'shortid'

export const ViewStoreModel = types.model(
    'ViewStore',
    {
        /**
         * 儲存所有 page 的 map
         * 因為有過場動畫，不能馬上刪掉已經退出的 page
         * 所以要弄個 map 讓他有地方放一陣子
         */
        pageMap: types.optional(types.map(PageDataModel), {}),
        /** 目前的 page 的 key */
        pageKey: types.maybe(types.string),
        /** 目前的 page */
        get page(): PageData | null {
            if (this.pageKey == null) return null
            return this.pageMap.get(this.pageKey)
        }
    },
    {
        /** 設定新的 page */
        setPage(newPage: PageData) {
            if (this.page != null) {
                // 退出原本的 page, 並準備刪除
                this.pageMap.get(this.pageKey).exit()
                this.sechduleDelete(this.pageKey)
            }

            if (newPage != null) {
                // 隨機生成新的key
                const newKey = shortId.generate()
                this.pageMap.set(newKey, newPage)
                this.pageKey = newKey
                this.pageMap.get(newKey).enter()
            } else {
                this.pageKey = null
            }
        },
        /**
         * 排程 page 的刪除
         * 因為直接刪掉 page 會使它在進行過場動畫時抓不到資料
         * 所以過一段時間再刪
         */
        sechduleDelete(key: string) {
            setTimeout(() => {
                this.deletePage(key)
            }, 1000)
        },
        /** 刪除 page */
        deletePage(key: string) {
            this.pageMap.delete(key)
        }
    }
)

export type ViewStore = typeof ViewStoreModel.Type
