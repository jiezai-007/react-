// 虚拟dom就是用于描述真实dom的样子{type:buttpn,props:{}}
// 遍历子节点遵循深度优先
class Element {
    constructor(type,props){
        this.type = type
        this.props = props
    }
}
function createElement(type,props,...children){
    props = props || []
    props.children = children
    return new Element(type,props)
}

export default createElement