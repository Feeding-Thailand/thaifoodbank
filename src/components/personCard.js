import React from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/th'
moment.locale('th')

function parseAddress(address) {
    var x = address.split(', ')
    x.splice(0, 1)
    return x.join(', ')
}
function formatText(text) {
    if (text.length < 100) {
        return text
    }
    else {
        return `${text.substring(0, 100)} ...`
    }
}
const Person = (props) => (
    <div className='col-md-6 mb-4'>
        <Link to={`/help-matcher/view?id=${props.id}`}>
            <div className='item pb-3 shadow-md pt-3' style={{ backgroundImage: !_.isUndefined(props.data.photos) ? `url(https://firebasestorage.googleapis.com/v0/b/thaifoodbank.appspot.com/o/${props.id}%2f1.jpg?alt=media)` : 'url()' }} >
                <div className='date-badge'>                    
                    <p><span style={{fontWeight: 500}} className='badge badge-primary'>{moment(props.data.createdAt).fromNow()}</span></p>
                </div>
                <div className='text-white pl-3 text-over'>
                    <h4 className='mb-0 text-white'>{props.data.name}</h4>
                    <span>{parseAddress(props.data.placename)}</span>
                    <p className='mb-0'>{formatText(props.data.need)}</p>
                </div>
                <div className='overlay'></div>
            </div>
        </Link>
    </div>
)

export default Person