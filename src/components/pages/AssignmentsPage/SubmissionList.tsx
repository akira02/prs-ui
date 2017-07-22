import * as React from 'react'
import styled from 'styled-components'
import { computed, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { Page } from '../Page'
import { SubmissionCard } from './SubmissionCard'

import { ViewStore } from '../../../stores/ui/ViewStore'
import * as PageData from '../../../stores/ui/PageData'
import { Assignment } from '../../../stores/Assignment'

export interface Props {
    viewStore?: ViewStore
}

/** 顯示在右半邊的 page */
const StyledPage = styled(Page)`
    top: 0;
    left: 50%;
    width: 50%;
    z-index: 3;
`

@inject('viewStore')
@observer
export class SubmissionList extends React.Component<Props> {
    render() {
        const page = this.props.viewStore.page as PageData.AssignmentPage
        const selectedAssignment = page.selectedAssignment

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
