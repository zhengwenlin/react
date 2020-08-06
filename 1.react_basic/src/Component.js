import {isFunction} from './utils.js';
import { createDOM } from './react-dom.js'
/**
 * 改变量用于控制组件的批量更新操作
 *（注意这里的维度是组件，不是组件中的状态）
 */
export const updateQueue = {
    //是否是批量更新模式，默认不是
    isBatchingUpdate: false,
    updaters: [], //存放异步更新的updaters
    add(updater){
        if(!this.updaters.includes(updater)){
            this.updaters.push(updater)
        }
    }
}
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance
        //处于等待状态的state，默认是一个空数组
        this.pendingStates = []
    }
    /**
     * 添加分状态的方法
     * @param {*} partialState 分状态(函数/对象)
     */
    addState(partialState){
       //先把分状态或者函数放到数组中进行缓存
       this.pendingStates.push(partialState)
       //判断当前的更新模式
       if(updateQueue.isBatchingUpdate){
           //处于批量更新模式（异步更新）
           updateQueue.add(this)// 将updater的实例传给updateQueue
       }else{
           //处于非批量更新模式（同步更新）
           this.updateComponent()
       }
    }

    updateComponent(){
        let {classInstance,pendingStates}= this;//updater里的类组件实例和数组中的状态
        //如果属性变化 了,或者 状态变化了
        if(pendingStates.length>0){//如果有新状态,则需要列新,否则不更新

            //从pendingStates中得新的状态
            classInstance.state = this.getState();
            //然后要重新渲染,进行更新
            classInstance.forceUpdate();
        }
    }
    getState(){
        let {classInstance,pendingStates}= this;//updater里的类组件实例和数组中的状态
        let {state}= classInstance;// 组件实例中的老状态
        let nextState =  pendingStates.reduce((nextState,partialState)=>{
            if(isFunction(partialState)){//当partialState是一个函数的话
                nextState=partialState(nextState);
            }else{
                nextState={...nextState,...partialState};//如果对象的话直接覆盖
            }
            return nextState;
        },state);
        pendingStates.length=0;
        return nextState;
    }

    

}

/**
 * Component组件类
 * - 每个类组件都一个updater更新器
 */
class Component {
    constructor(props){
        this.props = props
        //$updater每个类组件都有一个更新器，是一个类的实例
        //相互引用的关系，组件类上使用$updater引用Updater的实例，并将类组件的实例传递给Updater
        //Updater中，将类组件的实例保存到classInstance属性上
        this.$updater = new Updater(this)

        this.state = {} // 组件的状态，默认是空对象
    }

    /**
     * 分状态，有两种：
     * 1.分状态对象
     * 2.函数
     * @param {*} partialState 
     */
    setState(partialState){
        //调用更新器的addState方法，处理分状态
        this.$updater.addState(partialState)
    }
    forceUpdate(){
        let newVNode =  this.render();
        let newDom = createDOM(newVNode) 
        this.dom.parentNode.replaceChild(newDom, this.dom)
        this.dom = newDom
   }
}
//表示为一个类组件
Component.prototype.isReactComponent = {}
export default Component