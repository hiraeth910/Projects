import {symbol} from './Btnvals'
export const reducer = (ios, action) => {
  switch (action.type) {
    case "normal":
      if (ios.ip === 0) {
        if (ios.ip === 0 && action.value == 0) {
          return ios
        }
        return { ...ios, ip: action.value }
      }
      return { ...ios, ip: ios.ip + String(action.value) }
    case "sym":
      if (ios.op === 0) {
        let g = ios.op + Number(ios.ip)
        let m = g + action.value
        return { ...ios, ip: 0, op: m }
      } else {
        ios.op = ios.op + ios.ip
        ios.ip = 0

        const x = String(ios.op)
        try {
          ios.op = eval(ios.op)
        } catch {
          if (symbol.includes(x.charAt(x.length - 1))) {
            if (x.charAt(x.length - 1) === action.value) {
              return ios
            } else {
              const y = x.slice(0, -1) + action.value
              return { ...ios, op: y }
            }
          }
        }
      }
      return { ...ios, op: ios.op + action.value }
    case "pow":
      ios.ip = Number(ios.ip)
      if (ios.ip == 1) {
        return { ...ios, ip: 1 }
      } else if (action.value === "x³") {
        return { ...ios, ip: eval(ios.op + ios.ip * ios.ip * ios.ip), op: 0 }
      } else if (action.value === "x²") {
        return { ...ios, ip: eval(ios.op + ios.ip * ios.ip), op: 0}
      } else if (action.value === "1/x") {
        return { ...ios, ip: eval(ios.op + 1 / ios.ip), op: 0 }
      }else if(action.value=== "√"){
        return{...ios,ip:eval(ios.op+Math.sqrt(ios.ip)),op:0}
      }
      case 'clear':
        return({...ios,ip:0,op:0})
      case 'done':
        const t = String(ios.op)
        if (symbol.includes(t.charAt(t.length - 1))){

            return({...ios,ip:eval(t+ios.ip),op:0})
        }
     case 'bs':
        if(ios.ip==0){
            return ios
        }
        let i = String(ios.ip)
        let k = i.slice(0,-1)
        if (k===""){
            return({...ios,ip:0})
        }
        else{
            return({...ios,ip:k})
        }
    default:
      return ios
  }
}
  
