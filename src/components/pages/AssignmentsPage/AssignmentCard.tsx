import * as React from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { CardHeader, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'

import { IframeDialog } from '../../IframeDialog'
import { CustomCard } from '../../CustomCard'

import { History } from '../../../stores/History'
import { Assignment } from '../../../stores/Assignment'

import * as moment from 'moment'

interface Props {
    assignment: Assignment
    history?: History
}

moment.locale('ja')

@inject('history')
@observer
export class AssignmentCard extends React.Component<Props> {
    @observable iframeUrl: string | null = null
    @observable expanded: boolean = false

    @action.bound
    toggleExpandState() {
        this.expanded = !this.expanded
    }
    @action.bound
    setExpandState(expanded) {
        this.expanded = expanded
    }

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
            <CustomCard
                expanded={this.expanded}
                onExpandChange={this.setExpandState}
                style={{
                    //backgroundImage: 'url(/static/pic/assignment-bg-blur.jpg)',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'local',
                    margin: '5px',
                    background:' linear-gradient(90deg, #3F72AF 7.5%, white 2.5%, white 90%)',
                    'background-size':'10%',
                    'background-repeat': 'repeat-y'
                }}
            >
                <CardHeader
                    title={assignment.name}
                    subtitle={
                        '指派時間 🕗  ' + moment(assignment.assigned).format('llll')
                    }
                    actAsExpander={true}
                    showExpandableButton={false}
                    style={{
                        fontSize: '1.8em',
                        right: '-25px',
                    }}
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
                        label="繳交列表 👉"
                        onTouchTap={this.openSubmissions}
                        style={{
                            position: 'absolute',
                            right: '60px',
                            top: '-400%',
                            fontWeight: 'bold'
                        }}
                    />
                    <FlatButton
                        label={`作業詳細 ${this.expanded ? '👆' : '👇'}`}
                        onTouchTap={this.toggleExpandState}
                        style={{
                            position: 'absolute',
                            right: '60px',
                            top: '-200%',
                            fontWeight: 'bold'
                        }}
                    />
                </CardActions>
                <IframeDialog
                    open={this.iframeUrl != null}
                    src={this.iframeUrl}
                    onRequestClose={() => {
                        this.iframeUrl = null
                    }}
                />
            </CustomCard>
        )
    }
}
