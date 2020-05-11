import React from 'react';  
import styled from "styled-components";

class Popup extends React.Component {  
  render() {  

return (  
<Wrapper>
<div className='popup'>  
<div className='popup\_inner'>  
<p>{this.props.text}</p>  
</div>  
</div>  
</Wrapper>
);  
}  
}  

export default Popup;

const Wrapper = styled.div`

.popup {
    border: 1px solid blue;
    text-align: left;
    // color: #FAFAD2;
    color: black;
    background-color: white;
    font-family: 'Helvetica Neue';
    font-size: 16px;
    margin: auto;
    width: 20%;
    padding: 10px 10px 10px 10px;
    // border-radius: 5%;
    position: absolute; 
}

// .h1 {
//     text-align: left;
//     color: green;
//     font-family: 'HelveticaNeue-Light';
//     font-size: 16px;
// }

button {
    width: 50px;
}
`
