import * as React from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'
import classNames from 'classnames'

import Snackbar from 'material-ui/Snackbar'

import {Message} from '../stores/ui/Message'

interface Props {
    message?: Message
}

/**
 * 底部通知條
 * @export
 * @class MessageBar
 * @extends {React.Component<Props>}
 */
@inject('message') @observer
export class MessageBar extends React.Component<Props> {
    @action.bound
    handleClose () {
        this.props.message.close()
    }
    @action.bound
    handleActionTouchTap () {
        this.props.message.close()
        this.props.message.action.run()
    }
    render () {
        const {text, open, isError, action} = this.props.message
        const hasAction = action != null

        return <Snackbar
            className={classNames('message', isError ? 'message-error' : null)}
            autoHideDuration={hasAction ? 4000 : 2000}
            message={text}
            open={open}
            onRequestClose={this.handleClose}
            action={hasAction ? action.name.toUpperCase() : null }
            onActionTouchTap={hasAction ? this.handleActionTouchTap : null}
        />
    }
}