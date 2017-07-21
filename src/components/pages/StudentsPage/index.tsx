import * as React from 'react'
import {observer} from 'mobx-react'

import {Page} from '../Page'
import {UserCard} from './UserCard'

import {Course} from '../../../stores/Course'

export interface Props {
    selectedCourse: Course
}

@observer
export class StudentsPage extends React.Component<Props> {
    render () {
        return <Page>
            {
                this.props.selectedCourse.students.map(user =>
                    <UserCard key={user.id} user={user}/>
                )
            }
        </Page>
    }
}
