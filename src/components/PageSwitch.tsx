import * as React from 'react'
import { computed } from 'mobx' 
import { inject, observer } from 'mobx-react'

import { LoginPage } from './pages/LoginPage'
import { CourseListPage } from './pages/CourseListPage'
import { CoursePage } from './pages/CoursePage'
import { NotFoundPage } from './pages/NotFoundPage'

import { SlideTransition } from './SlideTransition'

import { ViewStore } from '../stores/ui/ViewStore'

interface Props {
    viewStore?: ViewStore
}

@inject('viewStore') @observer
export class PageSwitch extends React.Component<Props> {
    @computed get currentPage (): React.ReactNode {
        const {page} = this.props.viewStore
        switch (page.name) {
            case 'login':
                return <LoginPage key={page.name} />
            case 'courseList':
                return <CourseListPage key={page.name} />
            case 'course':
                return <CoursePage key={page.name} />
            case 'notFound':
                return <NotFoundPage key={page.name} />
        }   
    }

    render () {
        return <SlideTransition>
            {this.currentPage}
        </SlideTransition>
    }
}
