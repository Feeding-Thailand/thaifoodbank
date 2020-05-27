import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
import Footer from '../../components/footer'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { apiEndpoint } from '../../components/constants'
import _ from 'lodash'
import Person from '../../components/personCard'
import { Link } from 'gatsby'
import Spinner from 'react-bootstrap/Spinner'
import { withTranslation } from 'react-i18next'

class Mapping extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            requestGeo: true,
            position: {},
            data: 'loading'
        }
    }
    async getGeo() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const geo = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                console.log(geo)
                this.setState({ position: geo, requestGeo: false })
                const req = await axios.get(`${apiEndpoint}/posts/${geo.lat}/${geo.lng}/100`)
                this.setState({ data: req.data }, () => console.log(this.state.data))
            })
        }
        else {

        }

    }
    render() {
        const {t, i18n} = this.props
        return (
            <div>
                <div className=' bg-light-grey'>
                    <Header>
                        <title>Help Matcher | {t('needHelpAround')}</title>
                    </Header>

                    <NavHeader></NavHeader>
                    <Modal show={this.state.requestGeo} onHide={() => { }}>
                        <Modal.Header>
                            <Modal.Title>
                                {t('requestNavigationData')}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className='mb-0'>
                                {t('requestNavigationDataDescription')}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => window.location.replace('/help-matcher')} variant='light'>{t('deny')}</Button>
                            <Button onClick={async () => await this.getGeo()}>{t('allow')}</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className='container pt-5 pb-5'>
                        <div className='row mb-4'>
                            <div className='col-6'>
                                <h2>{t('needHelpAround')}</h2>
                            </div>
                            <div className='col-md-6 pb-3 d-flex justify-content-md-end align-items-md-start'>
                                <Link to='/help-matcher' className='btn btn-primary'>{t('viewAllReceivers')}</Link>
                            </div>
                        </div>
                        <div className='row'>
                            {this.state.data !== 'loading' && !_.isEmpty(this.state.data) &&
                                this.state.data.map((item, index) => {
                                    return (
                                        <Person data={{ ...item.data }} key={index} id={item.id} />
                                    )
                                })
                            }
                            {_.isEmpty(this.state.data) &&
                                <div className='container'>
                                    <div className='w-100 pt-5 pb-5 alert alert-dark'>
                                        <h4 className='text-center text-muted mb-0'>{t('noReceiverFound')}</h4>
                                    </div>
                                </div>
                            }
                            {this.state.data === 'loading' &&
                                <div className='flex-center pt-5 pb-5 w-100' style={{ alignItems: 'center' }}>
                                    <Spinner variant='primary' animation="grow" />
                                </div>
                            }
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}

export default withTranslation()(Mapping)