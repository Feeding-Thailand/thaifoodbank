import React from 'react'

const Footer = () => (
    <div className='w-100 footer'>
        <div className='container text-center'>
        <img className='mb-3' src={require('../assets/images/feeding-thailand-logo-center.svg')} height='80px'/>
            <div className='m-3'>
                <button className='btn shadow-none btn-icon'>
                    <img height='25px' src={require('../assets/images/facebook-black.svg')} />
                </button>
                <button className='btn shadow-none btn-icon'>
                    <img height='25px' src={require('../assets/images/instagram-black.svg')} />
                </button>
                <button className='btn shadow-none btn-icon'>
                    <img height='25px' src={require('../assets/images/youtube-black.svg')} />
                </button>
            </div>
            <div className='mb-2'>
                <a href='#' className='mr-3'>เกี่ยวกับเรา</a>
                <a href='#' className='mr-3'>สื่อมวลชน</a>
                <a href='#'>ติดต่อเรา</a>
            </div>
            <div>
                <span>© Feeding Thailand 2020</span>
            </div>
        </div>
    </div>
)

export default Footer