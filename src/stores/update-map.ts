import { ObservableMap } from 'mobx'
import { ISnapshottable, getSnapshot, applySnapshot } from 'mobx-state-tree'

/** 有 id 的東西 */
export interface Keyed {
    id: string
}

/**
 * 用新的項目列表更新 map 中的值
 * 刪除不見的項目, 新增新的項目, 更新原有項目的值
 * @param {ObservableMap<ISnapshottable<Keyed>>} target 要更新的 map
 * @param {Keyed[])} newValues 新的項目列表 
 */
export function updateMap(
    target: ObservableMap<ISnapshottable<Keyed>>,
    newValues: Keyed[]
) {
    const newIds = new Set(newValues.map(value => value.id))

    // 刪除新列表中沒有的項目
    for (let id of target.keys()) {
        if (!newIds.has(id)) {
            target.delete(id)
        }
    }

    for (let value of newValues) {
        const currentValue = target.get(value.id)
        if (currentValue != null) {
            const currentSnpshot = getSnapshot(currentValue)
            applySnapshot(currentValue, {
                ...currentSnpshot,
                ...value
            })
        } else {
            target.set(value.id, value)
        }
    }
}
