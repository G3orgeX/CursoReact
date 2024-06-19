import React from 'react'
import PropTypes from 'prop-types';

export const GifGridItem = ({title,url}) => {
    // console.log(props)
  return (
    <div className='card'>
        <img src={url} alt={title}/>
        <p>{title}</p>
    </div>
  )
}

GifGridItem.propsTypes={
  title:PropTypes.string.isRequired,
  url:PropTypes.string.isRequired
}