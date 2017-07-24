import * as React from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { CardHeader, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'

import { IframeDialog } from '../../IframeDialog'
import { MarginCard } from '../../MarginCard'

import { History } from '../../../stores/History'
import { Assignment } from '../../../stores/Assignment'

interface Props {
    assignment: Assignment
    history?: History
}

@inject('history')
@observer
export class AssignmentCard extends React.Component<Props> {
    @observable iframeUrl: string | null = null

    @action.bound
    openSubmissions() {
        const { assignment, history } = this.props
        history.push(
            `/courses/${assignment.course.id}/assignments/${assignment.id}`
        )
    }

    render() {
        const { assignment } = this.props

        return (
            <MarginCard>
                <CardHeader
                    title={assignment.name}
                    subtitle={assignment.assigned}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {assignment.description}
                </CardText>
                <CardText expandable={true}>
                    <List>
                        {assignment.forms.map(form =>
                            <ListItem
                                key={form.content}
                                primaryText={form.name}
                                onTouchTap={() => {
                                    this.iframeUrl = form.content
                                }}
                            />
                        )}
                    </List>
                </CardText>
                <CardActions>
                    <FlatButton
                        label="繳交列表"
                        onTouchTap={this.openSubmissions}
                    />
                </CardActions>
                <IframeDialog
                    open={this.iframeUrl != null}
                    src={this.iframeUrl}
                    onRequestClose={() => {
                        this.iframeUrl = null
                    }}
                />
            </MarginCard>
        )
    }
}
