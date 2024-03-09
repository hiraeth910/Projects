import { GetnewCard,Imager } from "./Player"
export function System() {
  const sFCard = GetnewCard()
  const sm = Imager(sFCard)
  let ssCard = GetnewCard(sFCard)
  const ms = Imager(ssCard)
  const n = [
    { c: sFCard, img: sm },
    { c: ssCard, img: ms },
  ]
  return n
}
export const Player = () => {
  const fCard = GetnewCard()
  const im = Imager(fCard)
  const f = { c: fCard, img: im }
  let sCard = GetnewCard(fCard)
  const mi = Imager(sCard)
  const s = { c: sCard, img: mi }
  const m = [f, s]
  return m
}
export function Push (a){
    let op = 0
    a.forEach((obj) => {
      op += obj.c
    })
    if(op>=11){
        op =11
    }
    const a1 = GetnewCard(op)
    const a2 = Imager(a1)
    const p1 = {c:a1,img:a2}
    a = [...a,p1]
    return a
}
const Beginner = (a,b,d) => {
  if(b>a){return ('system')}
  if(b===21){return ('system')}
  if(b>21){return ('user')}
  if(b<a){
  if(b<21){
    let j = 0
    Push(d)
    d.forEach((obj)=>{
      j+=d.c
    })
    Beginner()}}
  return ('')
}
export default Beginner