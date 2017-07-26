import * as React from 'react'
import styled from 'styled-components'

import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { CardHeader } from 'material-ui/Card'
import { MarginCard } from '../../MarginCard'

import { History } from '../../../stores/History'
import { Course } from '../../../stores/Course'

const StyledCard = styled(MarginCard)`
    &:hover {    
        background-color: rgba(153, 153, 153, 0.2) !important;
    }
`

export interface Props {
    course: Course

    // injected props
    history?: History
}

@inject('history')
@observer
export class CourseCard extends React.Component<Props> {
    @action.bound
    handleTouchTap() {
        const { course, history } = this.props
        history.push(`/courses/${course.id}/assignments`)
    }

    render() {
        const { course } = this.props

        return (
            <StyledCard onTouchTap={this.handleTouchTap} styled={{
                color:'white',
            }}>
                <CardHeader title={course.name} />
            </StyledCard>
        )
    }
}
