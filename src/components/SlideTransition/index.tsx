import * as React from 'react'
import {inject, observer} from 'mobx-react'
import {CSSTransitionGroup} from 'react-transition-group'

import {History} from '../../stores/History'

import './style.css'

interface Props {
    history?: History
}

/**
 * 滑動特效
 * children 要有 key, 才能讓 CSSTransitionGroup 偵測到 children 的改變
 * @export
 * @class SlideTransition
 * @extends {React.Component<Props>}
 */
@inject('history') @observer
export class SlideTransition extends React.Component<Props> {
    render () {
        const {history, children} = this.props
        return <CSSTransitionGroup
            transitionName={`slide-${history.action.toLowerCase()}`}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            children={children} />
    }
}
