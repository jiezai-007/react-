import React from './react/index';
// import ReactDOM from 'react-dom';
// function sayHello(){
//     alert('hello');
// }
// let element = React.createElement('button',{
//     id:'sayHello',
//     onClick:sayHello
// },'say',React.createElement('b',null,'Helo'))
class couter extends React.Component{
    constructor(props){
        super(props)
        this.state={
            number:0
        }
    }
    componentWillMount(){
        console.log('挂载组件')
    }
    componentDidMount(){
        console.log("挂载组建成功")
    }
    handleClick(){
        this.setState({
            number:this.state.number
        })
    }
    render(){
        let p = React.createElement('p',{},this.state.number)
        let buttom  = React.createElement('button',{onClick:this.handleClick},'+')
        return React.createElement('div',{id:'couter'},p,buttom)
    }
}

let element = React.createElement(couter,{name:'计数器'})
React.render(element, document.getElementById('root'));
