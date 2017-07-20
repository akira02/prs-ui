import {types} from 'mobx-state-tree'
import {PageDataModel, PageData} from './PageData'

export const ViewStoreModel = types.model(
    'ViewStore',
    {
        page: types.maybe(PageDataModel)
    },
    {
        setPage (page: PageData) {
            this.page = page
        }
    }
)

export type ViewStore = typeof ViewStoreModel.Type
