import React from 'react'
import firebase from './firebase'

export default class HallOfFame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            donors: 'loading',
            scrollX: 0
        }
    }
    async componentDidMount() {
        const db = firebase.firestore()
        const hof = await db.collection('transactions').orderBy('createdAt', 'desc').limit(6).get()
        var donors = []
        hof.forEach((item) => {
            donors.push(item.data())
        })
        console.log(donors)
        this.setState({ donors: donors })
    }
    moveLeft() {
        var x = this.state.scrollX
        if (x > -1200) {
            this.setState({
                scrollX: x - 300
            }, () => console.log(this.state.scrollX))
        }
    }
    moveRight() {
        var x = this.state.scrollX
        if (x < 0) {
            this.setState({
                scrollX: x + 300
            }, () => console.log(this.state.scrollX))
        }
    }
    render() {
        return (
            <div className='pt-5 pb-5 gradient-purple flex-center' style={{ minHeight: 400 }}>
                <h2 className='text-center text-white mb-2'>รายชื่อผู้ร่วมบริจาคโครงการ Help Matcher</h2>

                <div className='container pt-4 pb-4'>
                    <div className='row'>
                        {(this.state.donors !== [] && this.state.donors !== 'loading') &&
                            this.state.donors.map((item, index) => {
                                return (
                                    <div className='col-md-4 col-12 p-3' key={index} >
                                        <div className='donor-card shadow-md rounded p-3'>
                                            <img className='avatar' src={item.donor.photoURL} />
                                            <span className='ml-3'>
                                                {item.donor.displayName}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div >
        )
    }
}