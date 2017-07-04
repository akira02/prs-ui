import * as React from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { Page } from '../Page'
import { AssignmentCard } from './AssignmentCard'
import { AssignmentInput } from './AssignmentInput'

import {CourseStore} from '../../../stores/CourseStore'

export interface Props {
    selectedCourse: CourseStore
}

@observer
export class AssignmentsPage extends React.Component<Props> {
    @observable dialogOpen = false

    @action.bound
    openDialog () {
        this.dialogOpen = true
    }

    @action.bound
    closeDialog () {
        this.dialogOpen = false
    }

    render () {
        const {selectedCourse} = this.props
        return <Page>
            {
                selectedCourse.assignmentStores.values().map(store =>
                    <AssignmentCard key={store.assignment.id} store={store}/>
                )
            }

            <FloatingActionButton className="button-fixed" onTouchTap={this.openDialog}>
                <ContentAdd />
            </FloatingActionButton>

            <AssignmentInput
                selectedCourse={this.props.selectedCourse}
                open={this.dialogOpen}
                onRequestClose={this.closeDialog} />
        </Page>
    }
}