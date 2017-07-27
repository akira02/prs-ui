import * as React from 'react'
import styled from 'styled-components'

import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { CardHeader } from 'material-ui/Card'
import { CustomCard } from '../../CustomCard'

import { History } from '../../../stores/History'
import { Course } from '../../../stores/Course'

const StyledCard = styled(CustomCard)`
    &:hover {    
        background-color: rgba(153, 153, 153, 0.2) !important;
        filter:brightness(1.5);
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
            <StyledCard
                onTouchTap={this.handleTouchTap}
                style={{
                    backgroundImage: 'url(/static/pic/course-bg-blur.jpg)',
                    backgroundAttachment: 'fixed',
                    height: '70px',
                    margin: '0px 180px 0px 180px'
                }}
            >
                <CardHeader
                    title={course.name}
                    titleStyle={{
                        color: 'white',
                        fontSize: '1.3em'
                    }}
                />
            </StyledCard>
        )
    }
}
