// Compile time constants
// see webpack.config.js

// base url of the PRS api
declare const API_BASE: string

declare const process: {
    readonly env: {
        readonly NODE_ENV: string
    }
}