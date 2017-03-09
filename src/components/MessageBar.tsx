import * as React from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'
import classNames from 'classnames'

import Snackbar from 'material-ui/Snackbar'

import {Message} from '../stores'

interface Props {
    message?: Message
}

@inject('message') @observer
export class MessageBar extends React.Component<Props, {}> {
    @action.bound
    handleClose () {
        this.props.message.open = false
    }
    @action.bound
    handleActionTouchTap () {
        this.props.message.open = false
        this.props.message.action.run()
    }
    render () {
        const {text, open, isError, action} = this.props.message
        return <Snackbar
            className={classNames('message', isError ? 'message-error' : null)}
            autoHideDuration={action == null ? 2000 : 4000}
            message={text}
            open={open}
            onRequestClose={this.handleClose}
            action={action && action.name.toUpperCase()}
            onActionTouchTap={action && this.handleActionTouchTap}
        />
    }
}