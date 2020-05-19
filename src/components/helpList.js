import React from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import { apiEndpoint } from './constants'
import _ from 'lodash'

const Person = (props) => (
    <div className='col-md-6 mb-4'>
        <Link to={`/help-matcher/view?id=${props.id}`}>
            <div className='item pb-3 shadow-md pt-3' style={{ backgroundImage: !_.isUndefined(props.data.photos) ? `url(https://firebasestorage.googleapis.com/v0/b/thaifoodbank.appspot.com/o/${props.id}%2f${props.data.photos[0]}?alt=media)` : 'url()' }} >
                <div className='text-white pl-3'>
                    <h4 className='mb-0 text-white'>{props.data.name}</h4>
                    <span>{props.data.placename}</span>
                    <p className='mb-0'>{props.data.need}</p>
                </div>
            </div>
        </Link>
    </div>
)

export default class HelpList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: 'loading'
        }
    }

    async componentDidMount() {
        try {
            const req = await axios.get(`${apiEndpoint}/posts/latest`)
            this.setState({ data: req.data })
        } catch (err) {
            console.log(err)
            this.setState({ data: 'error' })
        }

    }
    render() {
        return (
            <div className='mt-4 row'>

                {(this.state.data !== 'loading' && this.state.data !== 'error') &&
                    this.state.data.map((item, index) => {
                        console.log(item.data)
                        return (
                            <Person id={item.id} key={index} data={item.data} />
                        )
                    })}
            </div>
        )
    }
}