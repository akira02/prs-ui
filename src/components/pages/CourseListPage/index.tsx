import * as React from 'react'
import {computed, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {Page} from '../Page'
import {CourseCard} from './CourseCard'

import {CourseStore} from '../../../stores/CourseStore'
import {Course} from '../../../stores/Course'
import './style.css'

export interface Props {
    courseStore?: CourseStore
}

@inject('courseStore') @observer
export class CourseListPage extends React.Component<Props> {
    @computed get sortedCourses (): Course[] {
        return this.props.courseStore.courses.slice()
            .sort((a, b) => a.name.localeCompare(b.name))
    }
    render () {
        return <Page>
            {
                this.sortedCourses.map(course =>
                    <CourseCard key={course.id} course={course}/>
                )
            }
        </Page>
    }
}