// Compile time constants
// see webpack.config.js
declare const API_BASE: string
declare const process: Readonly<{
    env: Readonly<{
        NODE_ENV: string
    }>
}>