import pathToRegexp from 'path-to-regexp'
// const pathToRegexp = require('path-to-regexp');

/**
 * 根据Route的path，生成对应的正则和params
 * @param {*} path Route的path，组件路径匹配的规则
 * @param {*} options 选项
 */
function compilePath(path, options) {
    let params = []
    let regexp = pathToRegexp(path, params, options)
    return [regexp, params]
}

/**
 匹配的逻辑：
  pathToRegexp是根据路径生成正则 （这个路径应该是Route组件的path属性，路径的规则）
 */
/**
 * 
 * @param {*} pathname 当前的路径
 * @param {*} options 选项
 */
function matchPath(pathname, options) {
    // 路径  是否是精确匹配(后边可以有/)  是否是严格匹配(后边不能有/)  是否区别大小写
    let { path = '/', exact = false, strict = false, sensitive = false } = options
    //使用Route的path生成正则和当前的路径做匹配
    let [regexp, params] = compilePath(path, {
        end: exact,
        strict,
        sensitive
    })
    //进行匹配
    let match = regexp.exec(pathname);
    //匹配不到返回null
    if (!match) return null
    // url匹配到的路径  values分组数据
    let [url, ...values] = match

    // 是否是精确匹配
    let isExact = pathname === url
    // 返回匹配的结果
    return {
        path, //要匹配的路径
        url, //匹配到的路径
        isExact, //是否是精确匹配
        params: params.reduce((memo, current, index) => {
            memo[current.name] = values[index]
            return memo
        }, {})

    }
}

// let result = matchPath('/users/100', { path: '/users/:id', exact: false, strict: true, sensitive: true });

// console.log(result)

export default matchPath
