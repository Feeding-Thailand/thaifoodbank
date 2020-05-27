import React from 'react'
import Header from '../components/header'
import JoinUs from '../components/joinUs'
import Footer from '../components/footer'
import { Link } from 'gatsby'
import { withTranslation } from 'react-i18next'

const Person = (props) => (
    <div className='row mt-5 mb-5'>
        <div className='col-md-3 col-4'>
            <div className='profile-pic' style={{ backgroundImage: `url(${require(`../assets/images/${props.imgName}`)})` }} />
        </div>
        <div className='col-md-9 col-8 flex-center'>
            <h5>{props.name}</h5>
            <p className='text-muted mb-2'>
                {props.description}
            </p>
            {props.fbLink &&
                <div>
                    <a rel='contact-sirawit' target='_blank' href={props.fbLink}>
                        Facebook <span className='material-icons'>launch</span>
                    </a>
                </div>
            }
        </div>
    </div>
)
const Privacy = ({t, i18n}) => (
    <div>
        <Header>
            <title>{t('appName')} | {t('aboutUs')}</title>
        </Header>
        <div>
            <div style={{ maxWidth: 720 }} className='container pt-5 pb-5'>
                <Link to='/'><img className='mb-2' height='40px' src={require('../assets/images/logo-single-line.svg')} /></Link>
                <h1>{t('aboutUs')}</h1>
                <p>
                    {t('aboutUsDescription1')}
                </p>
                <p>
                    {t('aboutUsDescription2')}
                </p>
                <h3>{t('contactMethods')}</h3>
                <p>
                    {t('facebook')} <a href='https://facebook.com/feedingthailand'>Feeding Thailand</a><br />
                    {t('website')} <a href='https://feedingthailand.co'>feedingthailand.co</a><br />
                    {t('email')} <a href='mailto:feedingthailand@gmail.com'>feedingthailand@gmail.com</a>
                </p>
                <hr />
                <h1>{t('feedingThailandTeam')}</h1>
                <Person
                    imgName='891136.jpg'
                    name={t('admin1Name')}
                    description={t('admin1Description')}
                />
                <Person
                    imgName='891141.jpg'
                    name={t('admin2Name')}
                    description={t('admin2Description')}
                />
                <Person
                    imgName='891192.jpg'
                    name={t('admin3Name')}
                    description={t('admin3Description')}
                />
                <Person
                    imgName='891268.jpg'
                    name={t('admin4Name')}
                    description={t('admin4Description')}
                />
                <Person
                    imgName='891278.jpg'
                    name={t('admin5Name')}
                    description={t('admin5Description')}
                />
                <Person
                    imgName='891286.jpg'
                    name={t('admin6Name')}
                    description={t('admin6Description')}
                />
                <Person
                    imgName='TU_EW00_RJ.jpg'
                    name={t('admin7Name')}
                    description={t('admin7Description')}
                />
                <Person
                    imgName='tatar.jpg'
                    name={t('admin8Name')}
                    description={t('admin8Description')}
                />
                <Person
                    imgName='sirawit.jpg'
                    name={t('admin9Name')}
                    description={t('admin9Description')}
                    fbLink='https://www.facebook.com/pluminf'
                />
                <Person
                    imgName='porames-2.jpg'
                    name={t('admin10Name')}
                    description={t('admin10Description')}
                    fbLink='https://www.facebook.com/big.porames/'
                />
            </div>
        </div>
        <JoinUs />
        <Footer />
    </div>
)
export default withTranslation()(Privacy)