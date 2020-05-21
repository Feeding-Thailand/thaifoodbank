import React from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import { apiEndpoint } from './constants'
import _ from 'lodash'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
function parseAddress(address) {
    var x = address.split(', ')
    x.splice(0, 1)
    return x.join(', ')
}
function formatText(text) {
    if (text.length < 100) {
        return text
    }
    else {
        return `${text.substring(0, 100)} ...`
    }
}
const Person = (props) => (
    <div className='col-md-6 mb-4'>
        <Link to={`/help-matcher/view?id=${props.id}`}>
            <div className='item pb-3 shadow-md pt-3' style={{ backgroundImage: !_.isUndefined(props.data.photos) ? `url(https://firebasestorage.googleapis.com/v0/b/thaifoodbank.appspot.com/o/${props.id}%2f${props.data.photos[0]}?alt=media)` : 'url()' }} >
                <div className='text-white pl-3 text-over'>
                    <h4 className='mb-0 text-white'>{props.data.name}</h4>
                    <span>{parseAddress(props.data.placename)}</span>
                    <p className='mb-0'>{formatText(props.data.need)}</p>
                </div>
                <div className='overlay'></div>
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
    async loadMore() {
        try {
            const req = await axios.get(`${apiEndpoint}/posts/oldest?lastVisible=${this.lastVisible}`)
            this.setState({ data: [...this.state.data, req.data] }, () => {
                this.lastVisible = this.state.data[this.state.data.length - 1].id
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    async componentDidMount() {
        try {
            const req = await axios.get(`${apiEndpoint}/posts/oldest`)
            this.setState({ data: req.data })
            if (req.data.length % 12 === 0) {
                this.lastVisible = req.data[req.data.length - 1].id
            }
        } catch (err) {
            console.log(err)
            this.setState({ data: 'error' })
        }

    }
    render() {
        return (
            <div className='mt-4 row'>
                {this.state.data === 'loading' &&
                    <div className='flex-center pt-5 pb-5 w-100' style={{ alignItems: 'center' }}>
                        <Spinner variant='primary' animation="border" />
                    </div>
                }
                {_.isEmpty(this.state.data) &&
                    <div className='container'>
                        <div className='w-100 pt-5 pb-5 alert alert-dark'>
                            <h4 className='text-center text-muted mb-0'>ไม่พบข้อมูลผู้ต้องการความช่วยเหลือ</h4>
                        </div>
                    </div>
                }
                {(this.state.data !== 'loading' && this.state.data !== 'error') &&
                    this.state.data.map((item, index) => {
                        return (
                            <Person id={item.id} key={index} data={item.data} />
                        )
                    }
                    )}
                {(this.state.data.length % 12) === 0 &&
                    <div className='w-100 text-center mt-3'>
                        <Button onClick={async () => await this.loadMore()} style={{ fontWeight: 600 }} variant='link'>ดูเพิ่มเติม</Button>
                    </div>
                }
            </div>
        )
    }
}