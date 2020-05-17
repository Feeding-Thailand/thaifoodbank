import React from 'react'
import Header from '../../components/header'
import NavHeader from '../../components/navHeader'
export default class Dashboard extends React.Component {
    render(){
        return(
            <div>
                <Header>
                    <title>Help Matcher | Dashboard</title>
                </Header>
                <NavHeader/>
                <div className='container'>
                    Dashboard
                </div>
            </div>
        )
    }
}