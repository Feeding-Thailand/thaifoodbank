import React from 'react'
import { Link } from 'gatsby'


const Person = () => (
    <div className='col-md-6 mb-4'>
        <Link to='/help-matcher/view?id=xxx'>
            <div className='item pb-3 shadow-md pt-3' style={{ backgroundColor: 'black' }} >
                <div className='text-white pl-3'>
                    <h4 className='mb-0 text-white'>Name Lastname</h4>
                    <span>short address</span>
                    <p className='mb-0'>description</p>
                </div>
            </div>
        </Link>
    </div>
)

export default class HelpList extends React.Component {
    render() {
        return (
            <div className='mt-4 row'>
                <Person />
                <Person />
                <Person />
                <Person />
            </div>
        )
    }
}