import { useReducer,useState } from "react";
import { useEffect } from "react";
import Button from "./Button";
import {buttons,yes,pows} from "./Btnvals";
import { symbol } from "./Btnvals";
import {reducer} from './Red'
import './App.css'
let ios = { ip: 0, op: 0 }

const First = () => {
  
  const [someVariable, setSomeVariable] = useState(false);
  const [dynamicCssLoaded, setDynamicCssLoaded] = useState(false);
 const loadDynamicCss = () => {
   
   if(dynamicCssLoaded){
    const dynamicCss = document.querySelector(
      "link[rel=stylesheet][href='../src/dark.css']"
    )
    if (dynamicCss) {
      dynamicCss.parentNode.removeChild(dynamicCss)
    }

    setDynamicCssLoaded(false)
    return
   }
   const link = document.createElement("link")
   link.href = "../src/dark.css"
   link.rel = "stylesheet"

   link.onload = () => {
     setDynamicCssLoaded(true)
   }

   document.head.appendChild(link)
 }
  const [state,dispatch] = useReducer(reducer,ios)
    // useEffect(() => {
    //   if (someVariable && !dynamicCssLoaded) {
    //     loadDynamicCss()
    //   }
    // }, [someVariable, dynamicCssLoaded])

  // useEffect(()=>{console.log(state)},[state])7
  const handleclick = (label)=>{
    if (yes.includes(label)){      
        dispatch({type:"normal",value:label})
    }
    else if(symbol.includes(label)){
        dispatch({type:"sym",value:label})
      }
    else if(pows.includes(label)){
      dispatch({type:"pow",value:label})
    }
    else if (label==='C'){
      dispatch({type:'clear'})
    }
    else if (label==="="){
      dispatch({type:'done'})
    }else if(label==="⌫"){
      dispatch({type:'bs'})
    }
    else if(label==="l/d"){
      loadDynamicCss()
    }
  }
  return (
    <div className='app'>
      <div id='expression'>{state.op?(state.op):''}</div>
      <div id='ip'>{state.ip}</div>
      <div className='buttons'>
        {buttons.map((button)=>{
            return (
              <Button
                {...button}
                key={button.id}
                onClick={() => handleclick(button.label)}
              />
            )     
        })}
      </div>
    </div>
  )
}
export default First