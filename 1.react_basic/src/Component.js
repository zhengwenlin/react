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
       let { state } = this.classInstance
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
}
//表示为一个类组件
Component.prototype.isReactComponent = {}
export default Component