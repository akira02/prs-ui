import styled from 'styled-components'
import FloatingActionButton from 'material-ui/FloatingActionButton'

export const FixedButton = styled(FloatingActionButton)`
    position: fixed;
    /* need this because material-ui sets z-index of some elements to 1 */
    z-index: 1;
    bottom: 23px;
    right: 23px;
`
