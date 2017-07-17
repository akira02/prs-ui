import * as React from 'react'
import {inject, observer} from 'mobx-react'

import {SlideTransition} from '../../SlideTransition'
import {Page} from '../Page'
import {SideMenu} from './SideMenu'

import {AssignmentsPage} from '../AssignmentsPage'
//import {FormsPage} from '../FormsPage'
import {StudentsPage} from '../StudentsPage'
import {EmptyPage} from '../EmptyPage'

import * as PageStore from '../../../stores/ui/PageStore'
import {ViewStore} from '../../../stores/ui/ViewStore'

import "./style.css"

interface Props {
    viewStore?: ViewStore
}

@inject('viewStore') @observer
export class CoursePage extends React.Component<Props> {
    render () {
        const page = this.props.viewStore.page as PageStore.Course
        return <Page className="course-page">
            <SideMenu />

            <div className="page-container">
                <SlideTransition>
                    {this.renderSubPage(page)}
                </SlideTransition>
            </div>
        </Page>
    }

    renderSubPage ({subPage, selectedCourse}: PageStore.Course): React.ReactNode {
        if (selectedCourse == null) {
            // still loading course list
            return <EmptyPage key="empty" />
        }

        switch (subPage) {
            case 'assignmentList':
                return <AssignmentsPage key="assignmentList" />
            case 'formList':
                // return <FormsPage key="formList" selectedCourse={selectedCourse} />
                return <EmptyPage key="formList" />
            case 'studentList':
                return <StudentsPage key="studentList" selectedCourse={selectedCourse} />
            default:
                // unknown subPage
                return <EmptyPage key="empty" />
        }   
    }
}
