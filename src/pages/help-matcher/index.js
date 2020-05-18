import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
import HelpList from '../../components/helpList'
import Footer from '../../components/footer'
import Button from 'react-bootstrap/Button'
import { Link } from 'gatsby'

export default class HelpMatcher extends React.Component {
    render() {
        return (
            <div>
                <Header>

                </Header>
                <div style={{ backgroundColor: '#f7fafc' }}>
                    <NavHeader></NavHeader>
                    <div className='container pt-5 pb-5' >
                        <div className='mb-4 row'>
                            <div className='col-md-6 pb-3'>
                                <h2>ผู้ต้องการความช่วยเหลือขณะนี้</h2>
                            </div>
                            <div className='col-md-6 pb-3'>
                                <Link to='/help-matcher/register'>
                                <Button className='float-md-right'>ขอรับความช่วยเหลือ</Button>
                                </Link>
                            </div>
                        </div>
                        <HelpList />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}