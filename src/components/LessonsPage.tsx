import * as React from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {LessonList} from '../stores'

import {RequireToken} from './RequireToken'
import {Page} from './Page'
import {LessonCard} from './LessonCard'


export interface Props {
    lessonList: LessonList
}

@inject('lessonList') @observer
export class LessonsPage extends React.Component<Props, void> {
    @action.bound
    handleLoggedIn () {
        this.props.lessonList.fetch()
    }
    render () {
        const {lessons} = this.props.lessonList
        return <RequireToken onLoggedIn={this.handleLoggedIn}>
            <Page>
                {
                    lessons.entries().map(([lessonId, store]) =>
                        <LessonCard key={lessonId} store={store}/>
                    )
                }
            </Page>
        </RequireToken>
    }
}