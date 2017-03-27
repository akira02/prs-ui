import * as React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { RequireToken } from 'prs-ui/components/RequireToken'
import {Tabs, Tab} from 'material-ui/Tabs'

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
    @action.bound
    handleRoleChange (value: string) {
        this.props.userList.role = value
    }
    
    render () {
        const {users, role} = this.props.userList
        return <RequireToken onLoggedIn={this.handleLoggedIn}>
            <Page>
                <Tabs
                    onChange={this.handleRoleChange}
                    value={role} >
                    <Tab label="所有使用者" value="all" />
                    <Tab label="教師" value="teacher" />
                    <Tab label="學生" value="student" />
                </Tabs>
                {
                    users.map(user =>
                        <UserCard key={user.id} user={user}/>
                    )
                }
            </Page>
        </RequireToken>
    }
}
