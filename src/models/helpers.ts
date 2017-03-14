import {custom, PropSchema} from 'serializr'

export const isoDate: PropSchema = custom(
    (value: Date) => value == null ? null : value.toISOString(),
    (json: any) => json == null ? null : new Date(json)
)
