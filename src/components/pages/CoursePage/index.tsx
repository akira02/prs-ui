import * as React from 'react'
import { observer } from 'mobx-react'
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

interface Props {
    page: PageData.CoursePage
}

const FlexPage = styled(Page)`
    display: flex;
`

@observer
export class CoursePage extends React.Component<Props> {
    render() {
        return (
            <FlexPage>
                <SideMenu page={this.props.page} />

                <PageContainer>
                    <SlideTransition>
                        {this.renderSubPage()}
                    </SlideTransition>
                </PageContainer>
            </FlexPage>
        )
    }

    renderSubPage(): React.ReactNode {
        const { page } = this.props
        const { subPage, selectedCourse } = page

        if (selectedCourse == null) {
            // still loading course list
            return <EmptyPage key="empty" />
        }

        switch (subPage.name) {
            case 'assignmentList':
                return (
                    <AssignmentsPage
                        key="assignmentList"
                        // prettier-ignore
                        page={page as PageData.CoursePage<PageData.AssignmentListPage>}
                    />
                )

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
