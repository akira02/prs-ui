import * as React from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {List, ListItem} from 'material-ui/List'

import {History} from '../../../stores/History'
import {AssignmentStore} from '../../../stores/AssignmentStore'

interface Props {
    store: AssignmentStore
    history?: History
}

@inject('history') @observer
export class AssignmentCard extends React.Component<Props> {


    @action.bound
    openSubmissions () {
        const {store, history} = this.props
        history.push(`/courses/${store.assignment.course.id}/assignments/${store.assignment.id}`)
    }

    render () {
        const {store} = this.props
        const assignment = store.assignment

        return <Card className="card">
            <CardHeader 
                title={assignment.name}
                subtitle={assignment.created_date}
                actAsExpander={true}
                showExpandableButton={true} />
            <CardText expandable={true}>
                {assignment.data_link}<br />
                {assignment.description}
            </CardText>
            <CardText expandable={true}>
                <List>
                {
                    store.forms.map(form => 
                        <ListItem
                            key={form.content}
                            primaryText={form.name}
                            onTouchTap={() => { window.open(form.content) }} />
                    )
                }
                </List>
            </CardText>
            <CardActions>
                <FlatButton label="Submissions" onTouchTap={this.openSubmissions} />
            </CardActions>
        </Card>
    }
}