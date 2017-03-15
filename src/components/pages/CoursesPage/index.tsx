import * as React from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {RequireToken} from 'prs-ui/components/RequireToken'
import {Page} from '../Page'
import {CourseCard} from './CourseCard'

import {CourseList} from 'prs-ui/stores'

export interface Props {
    courseList: CourseList
}

@inject('courseList') @observer
export class CoursesPage extends React.Component<Props, void> {
    @action.bound
    handleLoggedIn () {
        this.props.courseList.fetch()
    }
    render () {
        const {stores} = this.props.courseList
        return <RequireToken onLoggedIn={this.handleLoggedIn}>
            <Page>
                {
                    stores.map(store =>
                        <CourseCard key={store.course.id} store={store}/>
                    )
                }
            </Page>
        </RequireToken>
    }
}