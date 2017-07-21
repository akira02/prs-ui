import * as React from 'react'
import styled from 'styled-components'
import { computed, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { Page } from '../Page'
import { SubmissionCard } from './SubmissionCard'

import { Assignment } from '../../../stores/Assignment'

export interface Props {
    selectedAssignment: Assignment | null
}

const StyledPage = styled(Page)`
    top: 0;
    left: 50%;
    width: 50%;
    z-index: 3;
`

@observer
export class SubmissionList extends React.Component<Props> {
    render() {
        const { selectedAssignment } = this.props

        return (
            <StyledPage>
                {selectedAssignment == null ||
                selectedAssignment.submissions == null
                    ? 'Loading!!!'
                    : selectedAssignment.submissions
                          .values()
                          .map(submission =>
                              <SubmissionCard
                                  key={submission.id}
                                  submission={submission}
                              />
                          )}
            </StyledPage>
        )
    }
}
