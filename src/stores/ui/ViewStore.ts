import { types } from 'mobx-state-tree'
import { PageDataModel, PageData } from './PageData'

import * as shortId from 'shortid'

export const ViewStoreModel = types.model(
    'ViewStore',
    {
        pageMap: types.optional(types.map(PageDataModel), {}),
        pageKey: types.maybe(types.string),
        get page(): PageData | null {
            if (this.pageKey == null) return null
            return this.pageMap.get(this.pageKey)
        }
    },
    {
        setPage(page: PageData) {
            if (this.pageKey != null) {
                this.pageMap.get(this.pageKey).leave()
                this.sechduleDelete(this.pageKey)
            }

            const newKey = shortId.generate()
            this.pageMap.set(newKey, page)
            this.pageKey = newKey
        },
        sechduleDelete(key: string) {
            setTimeout(() => {
                this.deletePage(key)
            }, 1000)
        },
        deletePage(key: string) {
            this.pageMap.delete(key)
        }
    }
)

export type ViewStore = typeof ViewStoreModel.Type
