import { useEffect, useState } from "react"
import "../code/game.css"
import {Player, System,Push} from './Beginner'
import React from "react"
import Default from "./Default"
import imgm from "../assets/back.jpg"
let set = [{ img: imgm }, { img: imgm }]
const Game = () => {
  let [pt,setPt] = useState(0);
  let [st,setSt] = useState(0);
  const [result, setResult] = useState(false)
  const [state, setState] = useState(false)
  const [winner,setWinner] = useState('')
  const [playercards, setPlayercards] = useState([])
  const [sytemcards, Setsytemcards] = useState([])
  function restart(){
    setState(false);
    setResult(false);
    setPlayercards([]);
    Setsytemcards([])
    setWinner('')
    setPt(0)
  }
  function starter() {
    setState(true)
    const m = Player()
    setPlayercards(m)
    const n = System()
    Setsytemcards(n)
  }
  useEffect(() => {
    let op = 0
    playercards.forEach((obj) => {
      op += obj.c
      let newpt = op
      setPt(newpt)
    })
  }, [playercards])
  useEffect(() => {
    let op = 0
    sytemcards.forEach((obj) => {
      op += obj.c
      let newpt = op
      setSt(newpt)
    })
  }, [sytemcards])
  function hitter(){
    const nep = Push(playercards)
    setPlayercards(nep)
  }
  function stander(){
    if(st===21 || st>pt){
      setWinner('system')
      setResult(true)
      return
    }
    if(st>21){
      setWinner('user') 
      setResult(true)
      return}
    if(st<pt || st==pt){
      ranku() 
    }
    return
  }
  const ranku = ()=>{
    let osk = 0
    const nes = Push(sytemcards)
    Setsytemcards(nes)
    nes.forEach((er) => {
      osk += er.c
    })
    if (osk > 21) {
      setWinner("user")
      setResult(true)
      console.log("ranku", osk)
      return
    }
    if ( osk>pt) {
      setWinner("system")
      setResult(true)
      console.log("ranku",osk)
      return
    }
    if(osk===21){
      setWinner("system")
      setResult(true)
      console.log("ranku", osk)
    }
    if (osk < pt < 21 || osk===pt) {ranku()
      
    }
  }
  useEffect(()=>{if(st===21){setWinner('system')}},[st])
  useEffect(()=>{
    if(pt===21){
      setResult(true)
      setWinner("user")
    }
    if(pt>21){
      setResult(true)
      setWinner("system")
    }
  },[pt])
 
  return (
    <div>
      <div className='imp'>
        <div className='cards' id='player'>
          {playercards.map((pc) => {
            return <img src={pc.img} alt={pc.c} className='image' key={pc.c} />
          })}
        </div>
        <div>
          {result ? (
            <div>
              <p id='resulte'>{winner} Wins</p>
              <div id='phb'>
                <button className='hehe' id='pn' onClick={restart}>
                  New Game
                </button>
                
              </div>
            </div>
          ) : (
            <div>
              {state ? (
                <div>
                  <div id='buton'>
                    <button className='btn' id='hit' onClick={hitter}>
                      hit
                    </button>
                  </div>
                  <button className='btn' id='stand' onClick={stander}>
                    stand
                  </button>
                </div>
              ) : (
                <button className='ub' onClick={starter}>
                  start game
                </button>
              )}
            </div>
          )}
        </div>
        {state ? (
          result ? (
            <div>
              <div className='cards' id='system'>
                {sytemcards.map((cards) => {
                  return (
                    <div>
                      <Default {...cards} />
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div>
              <div className='cards' id='system'>
                {set.map((cards) => {
                  return (
                    <div>
                      <Default {...cards} />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>
      <div className='res'>
        <div>
          <h1>User total:{pt}</h1>
        </div>
        {result ? (
          <div>
            <h1>System total:{st}</h1>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
export default Game
