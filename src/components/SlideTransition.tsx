import * as React from 'react'
import { injectGlobal } from 'styled-components'
import { inject, observer } from 'mobx-react'
import { CSSTransitionGroup } from 'react-transition-group'

import { History } from '../stores/History'

interface Props {
    history?: History
}

/**
 * 滑動特效
 * children 要有 key, 才能讓 CSSTransitionGroup 偵測到 children 的改變
 */
@inject('history')
@observer
export class SlideTransition extends React.Component<Props> {
    render() {
        const { history, children } = this.props
        return (
            <CSSTransitionGroup
                transitionName={`slide-${history.action.toLowerCase()}`}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                children={children}
            />
        )
    }
}

injectGlobal`
    .slide-push-leave {
        z-index: -1;
    }

    .slide-push-enter {
        transform: translateX(100%);
    }

    .slide-push-enter.slide-push-enter-active {
        transform: translateX(0);
        transition: transform .5s ease-out;
    }

    .slide-pop-leave {
        transform: translateX(0);
    }

    .slide-pop-leave.slide-pop-leave-active {
        transform: translateX(100%);
        transition: transform .5s ease-out;
    }

    .slide-replace-leave {
        z-index: -1;
    }
`
