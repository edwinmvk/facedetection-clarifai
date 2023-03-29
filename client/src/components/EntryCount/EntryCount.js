import React from 'react';
import 'tachyons';

const EntryCount= (props) =>{
    return(
        <div className='tc'>
            <div className='white f3'>
                {`${props.name}, your current entry count is ...`}
            </div>
            <div className='white f2'>
                {`#${props.entries}`}
            </div>
        </div>
    )
}

export default EntryCount;