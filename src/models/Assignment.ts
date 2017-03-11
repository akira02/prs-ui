export interface Assignment {
    id: string
    assigned: string
    due: string
    submitted?: string
    lesson: {
        id: string
        name: string
    }
}

