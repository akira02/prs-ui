import * as React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react' 

import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

import { User } from '../../../stores/User'

export interface Props {
    user: User
}

export const UserCard = ({user}) =>
    <Card className="card">
        <CardHeader title={user.name} />
    </Card>
