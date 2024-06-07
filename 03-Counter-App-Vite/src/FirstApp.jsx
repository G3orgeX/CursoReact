import {Fragment} from 'react';
import PropTypes from 'prop-types';

export const FirstApp =( {
    title ,
    subtitle,name} ) => {
     
    
    return ( 
        <>        
        <h1>{ title}</h1>
        {/* <h1> { JSON.stringify(newMessage) } </h1>  */}
        <p>{subtitle+1}</p>
        <p>{name}</p>
        </>)
} 

FirstApp.propTypes= {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.number.isRequired
}
FirstApp.defaultProps = {
    title:'No hay Prop Title',
    subtitle:'No hay subtitulo',
    name:'Jorge Cabrera'
}