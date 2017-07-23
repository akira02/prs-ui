import * as React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import styled, { injectGlobal } from 'styled-components'
import { CSSTransitionGroup } from 'react-transition-group'

import { SubmissionList } from './SubmissionList'
import { SubmissionListBackground as Background } from './SubmissionListBackground'

import { History } from '../../../stores/History'
import * as PageData from '../../../stores/ui/PageData'

export interface Props {
    page: PageData.CoursePage<PageData.AssignmentListPage>

    history?: History
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

@inject('history')
@observer
export class SubmissionListController extends React.Component<Props> {
    @action.bound
    closeSubmissionList() {
        const { page, history } = this.props
        this.props.history.push(
            `/courses/${page.selectedCourse.id}/assignments`
        )
    }

    render() {
        const { page } = this.props
        const subPage = page.subPage as PageData.AssignmentListPage
        return (
            <Wrapper>
                <CSSTransitionGroup
                    transitionName="submission-list-background"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {subPage.showSubmissions
                        ? <Background
                              key="background"
                              onClick={this.closeSubmissionList}
                          />
                        : null}
                </CSSTransitionGroup>

                <CSSTransitionGroup
                    transitionName="submission-list"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {subPage.showSubmissions
                        ? <SubmissionList key="submission-list" page={page} />
                        : null}
                </CSSTransitionGroup>
            </Wrapper>
        )
    }
}

injectGlobal`
.submission-list-enter {
    transform: translateX(100%);
}
.submission-list-enter.submission-list-enter-active {
    transform: translateX(0);
    transition: transform .5s ease-out;
}
.submission-list-leave {
    transform: translateX(0);
}
.submission-list-leave.submission-list-leave-active {
    transform: translateX(100%);
    transition: transform .5s ease-out;
}
`

injectGlobal`
.submission-list-background-enter {
    opacity: 0;
}
.submission-list-background-enter.submission-list-background-enter-active {
    opacity: 1;
    transition: opacity .5s ease-out;
}
.submission-list-background-leave {
    opacity: 1;
}
.submission-list-background-leave.submission-list-background-leave-active {
    opacity: 0;
    transition: opacity .5s ease-out;
}
`
