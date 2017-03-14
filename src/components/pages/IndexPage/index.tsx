import * as React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

import { Page } from '../Page'

import './style.css'

export const IndexPage = () =>
    <Page id="index">
        <div>
            <p>Welcome to use PRS</p>
            <Link to="/good"><RaisedButton>GoGo!</RaisedButton></Link>
        </div>
    </Page>
