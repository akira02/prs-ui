import {types, addDisposer} from 'mobx-state-tree'
import {History, Location, UnregisterCallback} from 'history'
import createHistory from 'history/createBrowserHistory'

/**
 * Observable wrapper for Location
 */
export const LocationModel = types.model(
    'Location',
    {
        pathname: types.string,
        hash: types.string,
        search: types.string,
        state: types.optional(types.frozen, null),
        key: types.maybe(types.string),
    }
)

type ObservableLocation = typeof LocationModel.Type

/**
 * Observable wrapper for History
 */
export const HistoryModel = types.model(
    'History',
    {
        action: types.maybe(types.string),
        location: types.maybe(LocationModel)
    },
    {
        raw: <History>null,
    },
    {
        afterCreate () {
            this.raw = createHistory()
            this.action = this.raw.action
            this.location = convertLocation(this.raw.location)
            addDisposer(this, this.raw.listen(this.update))
        },
        update (location: Location, action: string) {
            this.action = action
            this.location = convertLocation(location)
        },
        push (path: string, state?: any) {
            this.raw.push(path, state)
        },
        replace (path: string, state?: any) {
            this.raw.replace(path, state)
        },
        goBack () {
            this.raw.goBack()
        }
    }
)

type ObservableHistory = typeof HistoryModel.Type

export {
    ObservableLocation as Location,
    ObservableHistory as History,
}

/**
 * Convert Location to plain object
 * @param {Location} location 
 * @returns 
 */
function convertLocation (location: Location) {
    return {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        state: location.state,
        key: location.key
    }
}

