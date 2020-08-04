import React, {useState} from 'react'
import ReactDOM from 'react-dom'
function Counter(props) {
    let [number, setNumber] = useState(0)
    function btnClick() {
        setNumber(number + 1)
        console.log(number, 'number')
    }

   function alertNumber(){
        setTimeout(() => {
            alert(number)
        },3000)
    }
    function add(){
        setTimeout(() => {
            setNumber(number + 1) 
        },3000) 
    }
    return (
        <div>
            {number}<br />
            <button onClick={btnClick}>+</button> 
            <button onClick={alertNumber}>alertNumber</button>
            <button onClick={add}>add</button>
        </div>
    )
}

function render() {
    ReactDOM.render(<Counter />, document.getElementById('root'))
}
render()