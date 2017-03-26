import * as React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { RequireToken } from 'prs-ui/components/RequireToken'
import { Page } from '../Page'
import { UserCard } from './UserCard'

import { UserList } from 'prs-ui/stores'

export interface Props {
    userList: UserList
}

@inject('userList') @observer
export class UsersPage extends React.Component<Props, void> {
    @action.bound
    handleLoggedIn () {
        this.props.userList.fetch()
    }
    render () {
        const {users} = this.props.userList
        return <RequireToken onLoggedIn={this.handleLoggedIn}>
            <Page>
                {
                    users.map(user =>
                        <UserCard key={user.id} user={user}/>
                    )
                }
            </Page>
        </RequireToken>
    }
}
