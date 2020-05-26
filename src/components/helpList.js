import React from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import { apiEndpoint } from './constants'
import _ from 'lodash'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Person from './personCard'

export default class HelpList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: 'loading'
        }
    }
    async loadMore() {
        this.setState({ loading: true })
        try {
            const req = await axios.get(`${apiEndpoint}/posts/oldest?lastVisible=${this.lastVisible}`)
            var data = this.state.data
            this.setState({ data: data.concat(req.data), loading: false }, () => {
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
            if (!_.isEmpty(req.data)) {
                if (req.data.length % 12 === 0) {
                    this.lastVisible = req.data[req.data.length - 1].id
                }
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
                {!_.isEmpty(this.state.data) && (this.state.data.length % 12) === 0 &&
                    <div className='w-100 text-center mt-3'>
                        {!this.state.loading &&
                            <Button onClick={async () => await this.loadMore()} style={{ fontWeight: 600 }} variant='link'>ดูเพิ่มเติม</Button>
                        }
                        {this.state.loading &&
                            <Spinner className='m-3' variant='primary' animation='border' />
                        }
                    </div>
                }
            </div>
        )
    }
}