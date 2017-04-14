export interface Course {
    id: string
    name: string
    semester: string
    teacher: {
        id: string
        name: string
    }
}
