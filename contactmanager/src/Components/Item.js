import React from 'react';
import parse from 'html-react-parser'
const yourHtmlString = '<h1>Hello</h1>'

export const Item = ( prop ) => {
    const mes = prop.value
    //console.log(mes)
    return parse(mes)    
}