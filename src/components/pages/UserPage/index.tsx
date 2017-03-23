import * as React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { RequireToken } from 'prs-ui/components/RequireToken'
import { Page } from '../Page'
//import { UserCard } from './UserCard'

//import { UserList } from 'prs-ui/stores'

/*export interface Props {
    userList: userList
}

@inject('userList') @observer
export class UsersPage extends React.Component<Props, void> {
    @action.bound
    handleLoggedIn () {
        this.props.userList.fetch()
    }
    @action.bound
    handleAdd () {
        
    }
    render () {
        const {Users} = this.props.userList
        return <RequireToken onLoggedIn={this.handleLoggedIn}>
            <Page>
                {
                    Users.map(user =>
                        <userCard key={user.id} user={user}/>
                    )
                }
                <FloatingActionButton className="button-fixed" onTouchTap={this.handleAdd}>
                    <ContentAdd />
                </FloatingActionButton>
            </Page>
        </RequireToken>
    }
}*/

export const UsersPage = () =>
    <Page>
        <div>
            <p>測試中</p>
        </div>
    </Page>