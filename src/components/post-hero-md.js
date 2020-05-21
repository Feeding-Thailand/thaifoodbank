import React from 'react'
import {Link} from 'gatsby'

const PostHero = (props) => (
    <Link to={props.link} className='fig-link col-md-4 p-5'>
        <div className='aspect-1-1' style={{ backgroundImage: `url(https://images.unsplash.com/photo-1588615419957-bf66d53c6b49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)` }}>
        </div>
        <div>
            <h5>{props.title}</h5>
            <span className='sarabun text-muted mb-0'>{props.excerpt}</span>
        </div>
    </Link>
)

export default PostHero