import * as React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import { RequireToken } from 'prs-ui/components/RequireToken'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

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
    handleRoleChange (event, index, value) {
        this.props.userList.role = value
    }
    
    render () {
        const {users, role} = this.props.userList
        return <RequireToken onLoggedIn={this.handleLoggedIn}>
            <Page>
                <DropDownMenu value={role} onChange={this.handleRoleChange}>
                    <MenuItem value="all" primaryText="所有使用者" />
                    <MenuItem value="teacher" primaryText="教師" />
                    <MenuItem value="student" primaryText="學生" />
                </DropDownMenu>
                {
                    users.map(user =>
                        <UserCard key={user.id} user={user}/>
                    )
                }
            </Page>
        </RequireToken>
    }
}
