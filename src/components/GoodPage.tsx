import * as React from 'react'
import {RequireToken} from './RequireToken'
import {Page} from './Page'

export const GoodPage = () =>
    <RequireToken>
        <Page>
            <p>YOU ARE LOGGED IN</p>
        </Page>
    </RequireToken>