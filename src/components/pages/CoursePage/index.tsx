import * as React from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

// 元件
import { Page } from '../Page'
import { PageContainer } from '../../PageContainer'
import { SideMenu } from './SideMenu'
import { SlideTransition } from '../../SlideTransition'

// 子頁面
import { AssignmentsPage } from '../AssignmentsPage'
import { FormsPage } from '../FormsPage'
import { StudentsPage } from '../StudentsPage'
import { EmptyPage } from '../EmptyPage'

import * as PageData from '../../../stores/ui/PageData'
import { ViewStore } from '../../../stores/ui/ViewStore'

interface Props {
    viewStore?: ViewStore
}

const FlexPage = styled(Page)`
    display: flex;
`

@inject('viewStore')
@observer
export class CoursePage extends React.Component<Props> {
    render() {
        const page = this.props.viewStore.page as PageData.CoursePage
        return (
            <FlexPage>
                <SideMenu />

                <PageContainer>
                    <SlideTransition>
                        {this.renderSubPage(page)}
                    </SlideTransition>
                </PageContainer>
            </FlexPage>
        )
    }

    renderSubPage({
        subPage,
        selectedCourse
    }: PageData.CoursePage): React.ReactNode {
        if (selectedCourse == null) {
            // still loading course list
            return <EmptyPage key="empty" />
        }

        switch (subPage) {
            case 'assignmentList':
                return <AssignmentsPage key="assignmentList" />
            case 'formList':
                return (
                    <FormsPage key="formList" selectedCourse={selectedCourse} />
                )
            case 'studentList':
                return (
                    <StudentsPage
                        key="studentList"
                        selectedCourse={selectedCourse}
                    />
                )
            default:
                // unknown subPage
                return <EmptyPage key="empty" />
        }
    }
}
