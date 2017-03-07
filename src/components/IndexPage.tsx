import * as React from 'react'
import {Link} from 'react-router-dom'
import {Page} from './Page'
import RaisedButton from 'material-ui/RaisedButton';

export const IndexPage = () =>
        <Page id="index">
            <div>
                <p>尼毫</p>
                <Link to="/login"><RaisedButton>GoGo!</RaisedButton></Link>
            </div>
        </Page>
