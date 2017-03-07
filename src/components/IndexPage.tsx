import * as React from 'react'
import {Page} from './Page'
import RaisedButton from 'material-ui/RaisedButton';

export const IndexPage = () =>
        <Page id="index">
            <div>
                <p>尼毫</p>
                <RaisedButton href="/login">GoGo!</RaisedButton>
            </div>
        </Page>
