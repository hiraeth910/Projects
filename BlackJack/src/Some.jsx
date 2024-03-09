import { useEffect, useState } from "react"
import Game from "./code/Game"
import React from "react"

const Some = () => {
  const [state, setState] = useState(false)
  useEffect(()=>{document.body.style.backgroundColor = !state ? "black" : "rgb(37, 132, 20)"})
  return (
    <div>
      {state ? (
        <div>
          <Game />
        </div>
      ) : (
        <div id='x'>
          <a id='game' href='#'>
            Black Jack
          </a>
          <a
            id='link'
            href='https://64c8cec952a8f46216b2eee3--incomparable-kitten-be0e53.netlify.app/'
          >
            learn to play
          </a>
          <button
            onClick={() => {
              setState(true)
            }}
            id='one'
          >
            <b>let`s start</b>
          </button>
        </div>
      )}
    </div>
  )
}
export default Some
