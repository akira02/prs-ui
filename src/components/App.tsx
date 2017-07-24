import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { theme } from '../theme'

// components
import { MessageBar } from './MessageBar'
import { PageSwitch } from './PageSwitch'

const DevTools =
    process.env.NODE_ENV != 'production'
        ? require('mobx-react-devtools').default
        : null

injectGlobal`
    body {
        margin: 0;
        font-family: 'Noto Sans TC', sans-serif !important;
        font-weight: bold;
        font-size: 1.4em;
    }
    /*
    * Noto Sans TC (Chinese_traditional) http://www.google.com/fonts/earlyaccess
    */
    @font-face {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 100;
    src: url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Thin.woff2) format('woff2'),
        url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Thin.woff) format('woff'),
        url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Thin.otf) format('opentype');
    }
    @font-face {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 300;
    src: url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Light.woff2) format('woff2'),
        url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Light.woff) format('woff'),
        url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Light.otf) format('opentype');
    }
    @font-face {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 400;
    src: url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Regular.woff2) format('woff2'),
            url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Regular.woff) format('woff'),
            url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Regular.otf) format('opentype');
    }
    @font-face {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 500;
    src: url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Medium.woff2) format('woff2'),
            url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Medium.woff) format('woff'),
            url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Medium.otf) format('opentype');
    }
    @font-face {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 700;
    src: url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Bold.woff2) format('woff2'),
            url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Bold.woff) format('woff'),
            url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Bold.otf) format('opentype');
    }
    @font-face {
    font-family: 'Noto Sans TC';
    font-style: normal;
    font-weight: 900;
    src: url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Black.woff2) format('woff2'),
            url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Black.woff) format('woff'),
            url(//fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Black.otf) format('opentype');
    }
`

const AppWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
`

/**
 * 根 react 元件
 * 用來注入 material-ui 的主題
 */
export class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
                <AppWrapper>
                    <PageSwitch />
                    <MessageBar />
                    {process.env.NODE_ENV != 'production' ? <DevTools /> : null}
                </AppWrapper>
            </MuiThemeProvider>
        )
    }
}
