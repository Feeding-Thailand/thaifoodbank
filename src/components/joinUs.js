import React from 'react'
import { Link } from 'gatsby'

const JoinUs = () => (
	<div className='hero position-relative bg-art' style={{ backgroundColor: '#309EFC' }}>
		<div className='w-100 text-center' style={{ zIndex: 1 }}>
			<div className='container text-center'>
				<h2 className='text-white'>ร่วมเป็นส่วนหนึ่งกับพวกเรา</h2>
				<div className='mt-3'>
					<Link to='/join' style={{ width: 100 }} className="btn mr-4 btn-light">ร่วมบริจาค</Link>
					<a target='_blank' href='https://facebook.com/feedingthailand' style={{ width: 100 }} className="btn btn-outline-light">ติดต่อเรา</a>
				</div>
			</div>
			{/*
		<div className='text-alt'>
			<span className='sarabun text-white'>หนึ่งในครอบครัวที่ได้รับการช่วเหลือจาก Feeding Thailand</span>
		</div>
		 */}
		</div>
		<div className='overlay-linear'></div>
	</div>
)

export default JoinUs