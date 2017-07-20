import {ObservableMap} from 'mobx'
import * as objectAssign from 'object-assign'

export function updateMap (map: ObservableMap<any>, newValues: object & {id: string}[]) {
    const ids = new Set(newValues.map(value => value.id))

    for (let key of map.keys()) {
        if (!ids.has(key)) {
            map.delete(key)
        }
    }

    for (let value of newValues) {
        if (map.has(value.id)) {
            objectAssign(map.get(value.id), value)
        } else {
            map.set(value.id, value)
        }
    }
}