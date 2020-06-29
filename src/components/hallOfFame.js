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
        const hof = await db.collection('transactions').orderBy('createdAt', 'desc').limit(5).get()
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
            <div className='pt-5 pb-5 gradient-purple flex-center' style={{minHeight: 400}}>
                <h2 className='text-center text-white mb-4'>รายชื่อผู้ร่วมบริจาคโครงการ Help Matcher</h2>
                <div className='d-flex container' style={{ alignItems: 'center' }}>
                    <button className='btn circle-btn mr-3' onClick={() => this.moveRight()}>
                        <i className='material-icons'>arrow_back</i>
                    </button>
                    <div className='d-flex pl-3 pr-3 pt-4 pb-4' style={{ overflow: 'hidden' }}>
                        {(this.state.donors !== [] && this.state.donors !== 'loading') &&
                            this.state.donors.map((item, index) => {
                                return (
                                    <div key={index} className='mr-4 donor-card shadow-md rounded p-3' style={{ transform: `translateX(${this.state.scrollX}px)` }}>
                                        <img className='avatar' src={item.donor.photoURL} />
                                        <span className='ml-3'>
                                            {item.donor.displayName}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className='ml-3 btn circle-btn' onClick={() => this.moveLeft()}>
                        <i className='material-icons'>arrow_forward</i>
                    </button>

                </div>

            </div >
        )
    }
}