import * as React from 'react'
import {observer} from 'mobx-react'

import {Page} from '../Page'
import {UserCard} from './UserCard'

import {CourseStore} from '../../../stores/CourseStore'

export interface Props {
    selectedCourse: CourseStore
}

@observer
export class StudentsPage extends React.Component<Props> {
    render () {
        return <Page>
            {
                this.props.selectedCourse.students.map(user => {
                    <UserCard key={user.id} user={user}/>
                })
            }
        </Page>
    }
}
