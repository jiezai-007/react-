import $ from 'jquery'
import createReactUnit from './unit'
import createElement from './element'
import Component from './component'

const React = {
    nextRootIndex:0,
    render,
    createElement,
    Component
}
function render(element,container){
    // 为了扩展方便，定义一个工厂方法，只传入 element
    let unitInstance = createReactUnit(element);
    // 为了获取传入的html片段
    let makeup = unitInstance.getMakeUp(React.nextRootIndex);
    $(container).html(makeup)
    $(document).trigger('mounted')
    // container.innerHTML = `<span data-reactid=${React.nextRootIndex}>${element}</span>`
}

export default React