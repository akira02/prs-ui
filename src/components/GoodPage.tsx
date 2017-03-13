import * as React from 'react'
import {RequireToken} from './RequireToken'
import {Page} from './Page'
import {LoadingCat} from './LoadingCat'

export const GoodPage = () =>
    <RequireToken>
        <Page>
            <LoadingCat loading={true}>
                <p>MUST NOT SHOW</p>
            </LoadingCat>
        </Page>
    </RequireToken>