import { ObservableMap } from 'mobx'
import { getSnapshot, applySnapshot } from 'mobx-state-tree'

/**
 * 用新的項目列表更新 map 中的值
 * 刪除不見的項目, 新增新的項目, 更新原有項目的值
 * @param {ObservableMap<any>} target 要更新的 map
 * @param {(object & {id: string}[])} newValues 新的項目列表 
 */
export function updateMap(
    target: ObservableMap<any>,
    newValues: object & { id: string }[]
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
