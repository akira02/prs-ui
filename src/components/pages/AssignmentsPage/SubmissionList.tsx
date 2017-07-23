import * as React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { Page } from '../Page'
import { SubmissionCard } from './SubmissionCard'

import * as PageData from '../../../stores/ui/PageData'
import { Assignment } from '../../../stores/Assignment'

export interface Props {
    page: PageData.CoursePage<PageData.AssignmentListPage>
}

/** 顯示在右半邊的 page */
const StyledPage = styled(Page)`
    top: 0;
    left: 50%;
    width: 50%;
    z-index: 3;
`

@observer
export class SubmissionList extends React.Component<Props> {
    render() {
        const { selectedAssignment } = this.props.page.subPage

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
