import React, { Children, PureComponent } from 'react'

const Wrapper = ({children}) => {
    const style = {
        border : '2px solid gray',
        padding : 16
    }
    return(
        <div style={style}>{children}</div>
    ) 
}

export default Wrapper; 