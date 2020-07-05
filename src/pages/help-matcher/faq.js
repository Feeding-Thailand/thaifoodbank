import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
import Footer from '../../components/footer'
import Button from 'react-bootstrap/Button'
import { Link } from 'gatsby'
import firebase from '../../components/firebase'

export default class Faq extends React.Component {
    render() {
        return (
            <div>
                <Header>
                    <title>Help Matcher | คำถามที่พบบ่อย</title>
                </Header>
                <div style={{ backgroundColor: '#f7fafc' }}>
                    <NavHeader />
                    <div className='container pt-5 pb-5' >
                        <div className='bg-white rounded shadow-md container p-4' style={{ maxWidth: 720 }}>
                            <h1>คำถามที่พบบ่อย</h1>
                            <br />
                            <h3>วิธีการใช้งานระบบ</h3>
                            <div class="mt-3 embed-responsive embed-responsive-16by9">
                                <iframe src="https://www.youtube.com/embed/vMdIwEVgN30" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <hr/>   
                            <h3>เกี่ยวกับโครงการ Help Matcher</h3>
                            <div class="mt-3 embed-responsive embed-responsive-16by9">
                                <iframe src="https://www.youtube.com/embed/h5h6DE0Ec5Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}