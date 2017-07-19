import * as React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

import {Page} from '../Page'
import {List, ListItem} from 'material-ui/List'
import {IframeDialog} from '../../IframeDialog'
import {CourseStore} from '../../../stores/CourseStore'

export interface Props {
    selectedCourse: CourseStore
}

@observer
export class FormsPage extends React.Component<Props> {
    @observable iframeUrl: string | null = null

    render () {
        return <Page>
            <List>
                {
                    this.props.selectedCourse.forms.map(form => 
                        <ListItem
                            key={form.content}
                            primaryText={form.name}
                            onTouchTap={() => { this.iframeUrl = form.content }} />
                    )
                }
            </List>
            <IframeDialog
                open={this.iframeUrl != null}
                src={this.iframeUrl}
                onRequestClose={() => { this.iframeUrl = null }} />
        </Page>
    }
}
