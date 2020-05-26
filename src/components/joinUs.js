import React from 'react'

const JoinUs = () => (
	<div className='mt-1 hero position-relative' style={{ backgroundImage: `url(${require('../assets/images/cover.jpg')})` }}>
		<div className='container text-center'>
			<h2 className='text-white'>ร่วมเป็นส่วนหนึ่งกับพวกเรา</h2>
			<div className='mt-3'>
				<button disabled style={{ width: 100 }} className="btn mr-4 btn-light">ร่วมบริจาค</button>
				<a target='_blank' href='https://facebook.com/feedingthailand' style={{ width: 100 }} className="btn btn-outline-light">ติดต่อเรา</a>
			</div>
		</div>
		<div className='text-alt'>
			<span className='sarabun text-white'>หนึ่งในครอบครัวที่ได้รับการช่วเหลือจาก Feeding Thailand</span>
		</div>
	</div>
)

export default JoinUs