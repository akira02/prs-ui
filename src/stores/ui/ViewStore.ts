import { types, detach, destroy } from 'mobx-state-tree'
import { PageDataModel, PageData } from './PageData'

export const ViewStoreModel = types.model(
    'ViewStore',
    {
        page: types.maybe(PageDataModel)
    },
    {
        setPage(nextPage: PageData) {
            // 直接 destroy 掉的話, 跑過場動畫時會抓不到資料 , 所以過一秒再 destroy
            // 爛 hack QQ
            if (this.page != null) {
                const oldPage = detach(this.page)
                setTimeout(() => {
                    destroy(oldPage)
                }, 1000)
            }

            this.page = nextPage
        }
    }
)

export type ViewStore = typeof ViewStoreModel.Type
