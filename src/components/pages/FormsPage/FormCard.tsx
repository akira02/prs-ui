import * as React from 'react'

import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';

import { Assignment } from 'prs-ui/models/Assignment'

const style = {
  margin: 12,
};


export const AssignmentCard = ({assignment}: {assignment: Assignment}) =>

    <Card className="card">
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
            href="https://github.com/callemall/material-ui"
            target="_blank"
            onTouchTap={this.handleAdd}
        />
    </Card>