// 模拟一个用户的列表，增加，查指定
export const User = {
    getList(){
        return localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : []
    },
    add(user){
        let list = this.getList()
        list.push(user)
        localStorage.setItem('userList', JSON.stringify(list))
    },
    find(id){
        let list = this.getList()
        return list.find(item => item.id === id)
    }
}