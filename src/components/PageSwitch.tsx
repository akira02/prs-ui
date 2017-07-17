import * as React from 'react'
import { inject, observer } from 'mobx-react'

import { LoginPage } from './pages/LoginPage'
import { CourseListPage } from './pages/CourseListPage'
import { CoursePage } from './pages/CoursePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { EmptyPage } from './pages/EmptyPage'

import { SlideTransition } from './SlideTransition'

import { ViewStore } from '../stores/ui/ViewStore'
import * as PageStore from '../stores/ui/PageStore'

interface Props {
    viewStore?: ViewStore
}

/**
 * 根據 page.name 顯示不同頁面, 並加上滑動特效
 * @export
 * @class PageSwitch
 * @extends {React.Component<Props>}
 */
@inject('viewStore') @observer
export class PageSwitch extends React.Component<Props> {
    render () {
        const {page} = this.props.viewStore
        if (page == null) return null

        return <SlideTransition>
            {this.renderPage(page)}
        </SlideTransition>
    }

    renderPage (page: PageStore.PageStore): React.ReactNode {
        switch (page.name) {
            case 'login':
                return <LoginPage key="login" />
            case 'courseList':
                return <CourseListPage key="courseList" />
            case 'course':
                return <CoursePage key="course" />
            case 'notFound':
                return <NotFoundPage key="notFound" />
            default:
                return <EmptyPage key="empty" />
        }   
    }
}
