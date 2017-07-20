import {ObservableMap} from 'mobx'
import {getSnapshot} from 'mobx-state-tree'

export function updateMap (map: ObservableMap<any>, newValues: object & {id: string}[]) {
    const ids = new Set(newValues.map(value => value.id))

    for (let key of map.keys()) {
        if (!ids.has(key)) {
            map.delete(key)
        }
    }

    for (let value of newValues) {
        if (map.has(value.id)) {
            const snapshot = getSnapshot(map.get(value.id))
            map.set(value.id, {...snapshot, ...value})
        } else {
            map.set(value.id, value)
        }
    }
}