import * as React from 'react'

import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';

import { Auth } from 'prs-ui/stores/Auth'
import { Assignment } from 'prs-ui/models/Assignment'

import {api} from 'prs-ui/api'

const style = {
  margin: 12,
};

interface Props {
    auth?: Auth
    assignment: Assignment
}

@inject('auth') @observer
export class AssignmentCard extends React.Component<Props, void> {
    @action.bound
    async handleSubmit () {
        const result = await api.post('forms/create')
            .auth(this.props.auth.token)
            .send({ assignment_id: this.props.assignment.id })

        const win = window.open(result.url, '_blank')
        win.focus()
    }

    render () {
        const {auth, assignment} = this.props
        return <Card className="card">
            <CardHeader 
                title={assignment.name}
                subtitle={assignment.created_date}
                actAsExpander={true}
                showExpandableButton={true}
                />
            <CardText expandable={true}>{assignment.data_link}<br />{assignment.description}</CardText>
            <RaisedButton 
                label="Add New Form" 
                style={style}
                onTouchTap={this.handleSubmit}
            />
        </Card>
    }
}