import * as React from 'react'
import {computed} from 'mobx'
import {inject, observer} from 'mobx-react'

import {SlideTransition} from '../../SlideTransition'
import {Page} from '../Page'
import {SideMenu} from './SideMenu'

import {AssignmentsPage} from '../AssignmentsPage'
//import {FormsPage} from '../FormsPage'
import {StudentsPage} from '../StudentsPage'

import * as PageData from '../../../stores/ui/PageData'
import {ViewStore} from '../../../stores/ui/ViewStore'

interface Props {
    viewStore?: ViewStore
}

@inject('viewStore') @observer
export class CoursePage extends React.Component<Props> {
    @computed get subPage (): React.ReactNode {
        const page = this.props.viewStore.page as PageData.Course
        const selectedCourse = page.selectedCourse

        if (page.subPage == null || selectedCourse == null) {
            // still loading course list
            return null
        }

        switch (page.subPage.name) {
            case 'assignments':
                return <AssignmentsPage key={page.subPage.name} selectedCourse={selectedCourse} />
            case 'forms':
                // return <FormsPage key={page.subPage.name} selectedCourse={selectedCourse} />
                return null
            case 'students':
                return <StudentsPage key={page.subPage.name} selectedCourse={selectedCourse} />
            default:
                // unknown subPage
                return null
        }   
    }

    render () {
        const page = this.props.viewStore.page as PageData.Course
        return <Page>
            <SideMenu />

            <div className="page-container">
                <SlideTransition>
                    {this.subPage}
                </SlideTransition>
            </div>
        </Page>
    }
}
