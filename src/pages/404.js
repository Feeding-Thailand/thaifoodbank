import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import { Link } from 'gatsby'
import { withTranslation } from 'react-i18next'
import '../components/i18n'

const Privacy = ({t, i18n}) => (
    <div>
        <Header>
            <title>Feeding Thailand | 404 Not Found</title>
        </Header>
        <div>
            <div style={{ maxWidth: 720 }} className='container pt-5 pb-5'>
                <Link to='/'><img className='mb-1' height='40px' src={require('../assets/images/logo-single-line.svg')} /></Link>
                <h1>404 {t('notFound')}</h1>
                <Link to='/'>{t('returnToMain')}</Link>
            </div>
        </div>
        <JoinUs />
        <Footer />
    </div>
)
export default withTranslation()(Privacy)