import * as React from 'react'
import {observer} from 'mobx-react'

import {Page} from '../Page'
import {List, ListItem} from 'material-ui/List'

import {CourseStore} from '../../../stores/CourseStore'

export interface Props {
    selectedCourse: CourseStore
}

@observer
export class FormsPage extends React.Component<Props> {
    render () {
        return <Page>
            <List>
                {
                    this.props.selectedCourse.forms.map(form => 
                        <ListItem
                            key={form.content}
                            primaryText={form.name}
                            onTouchTap={() => { window.open(form.content) }} />
                    )
                }
            </List>
        </Page>
    }
}
