import React from 'react'

const NavHeader = (props) => (
    <div className='bg-white shadow-xs w-100 d-flex light-border pt-3 pb-3 pl-md-5 pr-md-5 pl-3 pr-3' style={{ borderBottom: 'solid 1px' }}>
        <div className='d-flex w-100' style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
                <span className='logo-header' />
            </div>
            <div>
                profile
            </div>
        </div>

    </div>
)

export default NavHeader