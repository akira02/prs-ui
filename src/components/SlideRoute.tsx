import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Route} from 'react-router-dom'

export const SlideRoute = ({component: Component, ...rest}) =>
    <Route {...rest} children={({match, history, location}) =>
        <ReactCSSTransitionGroup
            transitionName={`slide-${history.action.toLowerCase()}`}
            transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
            {
                match && <Component key={location.pathname}/>
            }
        </ReactCSSTransitionGroup>
    } />
