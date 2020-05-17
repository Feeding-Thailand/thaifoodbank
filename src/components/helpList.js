import React from 'react'
const Person = () => (
    <div className='col-md-6 mb-4'>
        <div className='item pb-3 shadow-md pt-3' style={{ backgroundColor: 'black' }} >
            <div className='text-white pl-3'>
                <h4 className='mb-0 text-white'>Name Lastname</h4>
                <span>short address</span>
                <p className='mb-0'>description</p>
            </div>
        </div>
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