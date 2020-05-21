import React from 'react'
import {Link} from 'gatsby'

const PostHero = (props) => (
    <Link to={props.link} className='fig-link col-md-6 p-5'>
        <div className='aspect-1-1' style={{ backgroundImage: `url(${props.image})` }}>
        </div>
        <div>
            <h5>{props.title}</h5>
            <span className='sarabun text-muted mb-0'>{props.excerpt}</span>
        </div>
    </Link>
)

export default PostHero