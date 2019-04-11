import $ from 'jquery'

class Unit{
    constructor(element){
        this._currentElement = element
    }   
}

class ReactTextUnit extends Unit {
    //返回reactzhongdehtml片段
    getMakeUp(rootId){
        this._rootId = rootId
        return `<span data-reactid=${rootId}>${this._currentElement}</span>`
    }
}
class ReactNativeUnit extends Unit{
    getMakeUp(rootId){
        this._rootId = rootId
        let {type,props} = this._currentElement;
        let tagopen = `<${type} data-reactid=${rootId} `
        let content = ''
        let tagclose = `</${type}>`
        for(let proKey in props){
            if(/^on[A-Za-z]/.test(proKey)){
                let eventType = proKey.slice(2).toLowerCase();
                console.log(eventType)
                $(document).delegate(`[data-reactid=${rootId}]`,`${eventType}.${rootId}`,props[proKey])
            }else if(proKey==='children'){
                let children = props.children||[];
                children.forEach((child,index)=>{
                    let childUninstance = createReactUnit(child)
                    let childMakeUp = childUninstance.getMakeUp(`${rootId}.${index}`)
                    content += childMakeUp
                })
            }else{
                tagopen += `${proKey}=${props[proKey]}`
            }
        }
        return tagopen+'>'+content+tagclose
    }
}
class ReactCompositeUnit extends Unit{
    getMakeUp(rootId){
        this._rootId = rootId
        let {type:Component,props} = this._currentElement;
        // 创建couter组建实例
        let ComponentInstance = this._ComponentInstance = new Component(props)
        // 执行钩子函数
        ComponentInstance.componentWillMount&&ComponentInstance.componentWillMount()
        // 执行render函数 
        let renderElement =  ComponentInstance.render()
        // 根据虚拟Dom元素实例化
        let renderUnitInstance = this._renderUnitInstance = createReactUnit(renderElement)
        let renderMakeUp = renderUnitInstance.getMakeUp(rootId)
        $(document).on('mounted',()=>{
            ComponentInstance.componentDidMount&&ComponentInstance.componentDidMount()
        })
        return renderMakeUp
    }
}

function createReactUnit(element){
    // 当element是数字或者字符串的时候
    if(typeof element === 'number' || typeof element === 'string'){
        return new ReactTextUnit(element)
    }else if(typeof element === 'object' && typeof element.type === 'string'){
        return new ReactNativeUnit(element)
    }else if (typeof element == 'object' && typeof element.type == 'function'){
        console.log(element)
        return new ReactCompositeUnit(element)
    }
}

export default createReactUnit