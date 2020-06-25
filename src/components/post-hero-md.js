import React from 'react'
import {Link} from 'gatsby'

const PostHero = (props) => (
    <Link to={props.link} className='fig-link col-lg-3 col-6 pl-md-5 pr-md-5 pl-4 pr-4 pb-3 pt-3'>
        <div className='square' style={{ backgroundImage: `url(${props.image})` }}>
        </div>
        <div className='text-center'>
            <h5>{props.title}</h5>
            <span className='sarabun text-muted mb-0'>{props.excerpt}</span>
        </div>
    </Link>
)

export default PostHero