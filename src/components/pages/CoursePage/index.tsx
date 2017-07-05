import * as React from 'react'
import {inject, observer} from 'mobx-react'

import {SlideTransition} from '../../SlideTransition'
import {Page} from '../Page'
import {SideMenu} from './SideMenu'

import {AssignmentsPage} from '../AssignmentsPage'
//import {FormsPage} from '../FormsPage'
import {StudentsPage} from '../StudentsPage'

import * as PageData from '../../../stores/ui/PageData'
import {ViewStore} from '../../../stores/ui/ViewStore'

import "./style.css"

interface Props {
    viewStore?: ViewStore
}

@inject('viewStore') @observer
export class CoursePage extends React.Component<Props> {
    render () {
        const page = this.props.viewStore.page as PageData.Course
        return <Page className="course-page">
            <SideMenu />

            <div className="page-container">
                <SlideTransition>
                    {this.renderSubPage(page)}
                </SlideTransition>
            </div>
        </Page>
    }

    renderSubPage ({subPage, selectedCourse}: PageData.Course): React.ReactNode {
        if (selectedCourse == null) {
            // still loading course list
            return null
        }

        switch (subPage.name) {
            case 'assignmentList':
                return <AssignmentsPage key={subPage.name} selectedCourse={selectedCourse} />
            case 'formList':
                // return <FormsPage key={page.subPage.name} selectedCourse={selectedCourse} />
                return null
            case 'studentList':
                return <StudentsPage key={subPage.name} selectedCourse={selectedCourse} />
            default:
                // unknown subPage
                return null
        }   
    }

}
