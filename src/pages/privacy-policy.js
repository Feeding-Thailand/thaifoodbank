import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import {Link} from 'gatsby'
import { withTranslation } from 'react-i18next'
import '../components/i18n'

const Privacy = ({t, i18n}) => (
    <div>
        <Header>
            <title>{t('appName')} | {t('privacyPolicy')}</title>
        </Header>
        <div>
            <div style={{ maxWidth: 720 }} className='container pt-5 pb-5'>
                <Link to='/'><img className='mb-2' height='40px' src={require('../assets/images/logo-single-line.svg')}/></Link>
                <h1>{t('privacyPolicy')}</h1>
                <h5 className='text-muted mb-4'>{t('privacyPolicyLastUpdated')}</h5>
                <p>
                    {t('privacyPolicyDefinition')}
                </p>

                <h3>{t('privacyPolicySources')}</h3>
                <p><ol>
                    <li>{t('privacyPolicyUponServices')}</li>
                    <li>{t('privacyPolicyUponSubmissions')}</li>
                    <li>{t('privacyPolicyUponCookies')}</li>
                </ol>
                </p>
                <h3>{t('privacyPolicyKeeping')}</h3>
                <p>
                    {t('privacyPolicyKeepingDescription')}
                </p>
                <h3>{t('privacyPolicyData')}</h3>
                <p>
                    <ol>
                        <li>
                            {t('privacyPolicyDataDescription1')}
                        </li>
                        <li>
                            {t('privacyPolicyDataDescription2')} <a href='https://policies.google.com/privacy?hl=en-US'>{t('privacyPolicyOfGoogle')}</a>
                        </li>
                    </ol>
                </p>
                <h3>{t('contactMethods')}</h3>
                <p>
                    {t('facebook')} <a href='https://facebook.com/feedingthailand'>Feeding Thailand</a><br/>
                    {t('website')} <a href='https://feedingthai.co'>feedingthai.co</a><br/>
                    {t('email')} <a href='mailto:feedingthailand@gmail.com'>feedingthailand@gmail.com</a>
                </p>
            </div>
        </div>
        <JoinUs />
        <Footer />
    </div>
)
export default withTranslation()(Privacy)