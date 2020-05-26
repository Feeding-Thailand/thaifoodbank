import React from 'react'

const Footer = () => (
    <div className='w-100 footer'>
        <div className='container text-center'>
        <img className='mb-2' src={require('../assets/images/feeding-thailand-logo-center.svg')} height='80px'/>
            <div className='m-3'>
                <a href='https://facebook.com/feedingthailand' className='btn shadow-none btn-icon p-2'>
                    <img height='25px' src={require('../assets/images/facebook-black.svg')} />
                </a>
                <button className='btn shadow-none btn-icon p-2'>
                    <img height='25px' src={require('../assets/images/instagram-black.svg')} />
                </button>
                <a href='https://www.youtube.com/channel/UC5S8Wj_AzdFp1WYtJHA4u5A' className='btn shadow-none btn-icon p-2'>
                    <img height='25px' src={require('../assets/images/youtube-black.svg')} />
                </a>
            </div>
            <div className='mb-2'>
                <a href='/about-us' className='mr-3'>เกี่ยวกับเรา</a>
                <a href='/press' className='mr-3'>สื่อมวลชน</a>
                <a href='/privacy-policy' className='mr-3'>นโยบายข้อมูลส่วนบุคคล</a>
                <a href='https://messenger.com/t/feedingthailand'>ติดต่อเรา</a>
            </div>
            <div>
                <span>© Feeding Thailand 2020</span>
            </div>
        </div>
    </div>
)

export default Footer