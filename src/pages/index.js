import React from "react"
import Header from '../components/header'
import Footer from '../components/footer'
import { Link } from 'gatsby'
import PostHero from '../components/post-hero-md'
import JoinUs from '../components/joinUs'
import firebase from '../components/firebase'
import { withTranslation } from 'react-i18next'
import '../components/i18n'

class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	async componentDidMount() {
		const db = firebase.firestore()
		const snap = await db.collection('stats').doc('stats').get()
		this.setState(snap.data())
	}
	render() {
        const {t, i18n} = this.props
		return (
			<div className='mt-1'>
				<div className='container pt-5 pb-5 flex-center' style={{ minHeight: 250 }}>
					<div className='row'>
						<div className='col-md-4 p-3'>
							<div className='counter text-center'>
								<h2 className=''>{this.state?.currentPosts} {t('people')}</h2>
								<span>{t('waitingForHelp')}</span>
							</div>
						</div>
						<div className='col-md-4 p-3'>
							<div className='counter text-center'>
								<h2 className=''>{this.state?.donors} {t('people')}</h2>
								<span>{t('donorsCount')}</span>
							</div>
						</div>
						<div className='col-md-4 p-3'>
							<div className='counter text-center'>
								<h2 className=''>{this.state?.closedPosts} {t('people')}</h2>
								<span>{t('successCount')}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
const Posts = ({t, i18n}) => (
	<div>
		<div className='container pt-5 pb-5'>
            <h2 className='text-center mb-0'>{t('latestNews')}</h2>
			<div className='row'>
				<PostHero link='/post' title='กาแฟทำให้คุณเป็นนักพัฒนาที่ดีขึ้นจริงหรอ?' excerpt='ข้อตกลง: ต่อไปผมจะเรียก 1x หรือ 100% ว่าเป็นอัตราการทำงานปกติของผม (อาจจะไม่เท่าคนอื่น ถือว่าเป็นอัตราที่ผมใช้ความรู้สึก โดยนำข้อมูลจากในอดีต: ต.ค. 2017 - มี.ค 2020 มาคิด) ในที่นี้จะพูดถึงอัตราการทำงานด้าน software development นับ ...' />
				<PostHero link='/post' title='กาแฟทำให้คุณเป็นนักพัฒนาที่ดีขึ้นจริงหรอ?' excerpt='ข้อตกลง: ต่อไปผมจะเรียก 1x หรือ 100% ว่าเป็นอัตราการทำงานปกติของผม (อาจจะไม่เท่าคนอื่น ถือว่าเป็นอัตราที่ผมใช้ความรู้สึก โดยนำข้อมูลจากในอดีต: ต.ค. 2017 - มี.ค 2020 มาคิด) ในที่นี้จะพูดถึงอัตราการทำงานด้าน software development นับ ...' />
				<PostHero link='/post' title='กาแฟทำให้คุณเป็นนักพัฒนาที่ดีขึ้นจริงหรอ?' excerpt='ข้อตกลง: ต่อไปผมจะเรียก 1x หรือ 100% ว่าเป็นอัตราการทำงานปกติของผม (อาจจะไม่เท่าคนอื่น ถือว่าเป็นอัตราที่ผมใช้ความรู้สึก โดยนำข้อมูลจากในอดีต: ต.ค. 2017 - มี.ค 2020 มาคิด) ในที่นี้จะพูดถึงอัตราการทำงานด้าน software development นับ ...' />
			</div>
			<div className='row'>
				<div className='col-12 text-center'>
					<Link to='/blog'>{t('readAllNews')}<span className='material-icons'>chevron_right</span></Link>
				</div>
			</div>
		</div>
	</div>
)
const AboutUs = ({t, i18n}) => (
	<div>
		<div className='container pt-3 pb-3'>
			<div className='row mt-4'>
				<div className='col-md-6'>
					<h2>{t('aboutUs')}</h2>
					<p>{t('aboutUsDescription')}</p>
					<a href='/about-us'>{t('aboutUsRead')}<span className='material-icons'>chevron_right</span></a>
				</div>
				<div className='col-md-6'></div>
			</div>
			<hr />
			<h2 className='text-center mb-0'>{t('ourProjects')}</h2>
			<div className='row'>
				<PostHero
					image={require('../assets/images/feeding.jpg')}
					link='/help-matcher'
					title='Help Matcher'
					excerpt={t('about1')}
				/>
				<PostHero
					image={require('../assets/images/food.jpg')}
					link='/help-matcher'
					title='Food Bank'
					excerpt={t('about2')}
				/>

			</div>
		</div>
	</div>
)

const IndexPage = ({t, i18n}) => (
	<div>
		<Header>
			<title>{t('appName')}</title>
		</Header>
		<div className='hero d-flex' style={{ backgroundImage: `url(${require('../assets/images/cover.jpg')})` }}>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 mb-5 mb-md-0 d-flex' style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start' }}>
						<img className='mb-3' src={require('../assets/images/feeding-thailand-logo.svg')} height='120px' />
						<h3 className='text-white'>{t('helpThaiInCrisis')}</h3>
						<Link to='/help-matcher' className='btn btn-lg btn-primary shadow-md mt-3'>{t('registerAcceptor')}</Link>
					</div>
				</div>
			</div>
		</div>
		<div className='bg-light-grey'>
			<AboutUs t={t} i18n={i18n} />

		</div>
		<Counter t={t} i18n={i18n} />
		<JoinUs t={t} i18n={i18n} />
		<Footer t={t} i18n={i18n} />

	</div>
)

export default withTranslation()(IndexPage)
