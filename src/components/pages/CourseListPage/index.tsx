import * as React from 'react'
import {computed, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {Page} from '../Page'
import {CourseCard} from './CourseCard'

import {CourseMap} from '../../../stores/CourseMap'
import {CourseStore} from '../../../stores/CourseStore'

export interface Props {
    courseMap?: CourseMap
}

@inject('courseMap') @observer
export class CourseListPage extends React.Component<Props> {
    @computed get sortedCourses (): CourseStore[] {
        return this.props.courseMap.courseStores.values()
            .sort((a, b) => a.course.name.localeCompare(b.course.name))
    }
    render () {
        return <Page>
            {
                this.sortedCourses.map(store =>
                    <CourseCard key={store.course.id} store={store}/>
                )
            }
        </Page>
    }
}