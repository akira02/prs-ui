import * as React from 'react'
import { inject, observer } from 'mobx-react'

// 元件
import { PageContainer } from './PageContainer'

// 頁面
import { LoginPage } from './pages/LoginPage'
import { CourseListPage } from './pages/CourseListPage'
import { CoursePage } from './pages/CoursePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { EmptyPage } from './pages/EmptyPage'

// 特效
import { SlideTransition } from './SlideTransition'

// store
import { ViewStore } from '../stores/ui/ViewStore'
import * as PageData from '../stores/ui/PageData'

interface Props {
    viewStore?: ViewStore
}

/** 根據 page.name 顯示不同頁面, 並加上滑動特效 */
@inject('viewStore')
@observer
export class PageSwitch extends React.Component<Props> {
    render() {
        return (
            <PageContainer>
                <SlideTransition>
                    {this.renderPage(this.props.viewStore.page)}
                </SlideTransition>
            </PageContainer>
        )
    }

    renderPage(page: PageData.PageData | null): React.ReactNode {
        if (page == null) return this.renderEmptyPage()

        switch (page.name) {
            case 'login':
                return <LoginPage key="login" />
            case 'courseList':
                return <CourseListPage key="courseList" />
            case 'course':
                return (
                    <CoursePage
                        key="course"
                        page={page as PageData.CoursePage}
                    />
                )
            case 'notFound':
                return <NotFoundPage key="notFound" />
            default:
                return this.renderEmptyPage()
        }
    }

    renderEmptyPage() {
        return <EmptyPage key="empty" />
    }
}
