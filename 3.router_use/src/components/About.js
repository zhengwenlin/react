import React from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
/**
 * router-hooks
 * - useHistory  使用历史对象
 * - useLocation 使用location对象
 * - useParams   使用参数
 */
export default class extends React.Component {
    //  history = useHistory()
    //  location = useLocation()
    //  params = useParams()
    render(){
        
        return (
            <div>
                <div>About</div>
                {/* <div>history: {JSON.stringify(this.history, null, 2)}</div>
                <div>location: {JSON.stringify(this.location, null, 2)}</div>
                <div>params: {JSON.stringify(this.params, null, 2)}</div> */}
               
            </div>
        )
    }
}