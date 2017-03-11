export interface Lesson {
    id: string
    name: string
    semester: string
    teacher: {
        id: string
        name: string
    }
}
