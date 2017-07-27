import * as React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'

import { CardHeader, CardMedia } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

import { CustomCard } from '../../CustomCard'

import { User } from '../../../stores/User'

export interface Props {
    user: User
}

export const UserCard = ({ user }) =>
    <CustomCard>
        <CardHeader title={user.name} />
    </CustomCard>
