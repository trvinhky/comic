import React from 'react';
import './index.scss'

type child = {
    children: React.ReactNode
}

const Center = (props: child) => {

    return (
      <div className='center'>
        {props.children}
      </div>
    )
  }
  
  export default Center
  