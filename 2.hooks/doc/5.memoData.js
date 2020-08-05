
//缓存数据
let lastState;
function memoData(initialState){
    let state = lastState || initialState

    function setState(newState) {
        if(typeof newState == 'function'){
            newState = newState()
        }

        if(!Object.is(lastState, newState)){
            lastState = newState
        }
    }
    return [state, setState]
}

function handleclick() {
    let [state, setState] = memoData(0)   
    setState(state + 1)
    console.log(state)
    
}

function handleclick1(){
    let [state, setState] = memoData(0)  
    setTimeout(() => {
        setState(state + 1)
        console.log(state)
    }, 3000)
}