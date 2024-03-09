import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.png"
import img6 from "../assets/6.png"
import img7 from "../assets/7.jpg"
import img8 from "../assets/8.jpg"
import img9 from "../assets/9.jpg"
import img10 from "../assets/10.jpg"
import imga from "../assets/a.jpg"


export const GetnewCard = (a=0) => {
  let x = Math.ceil(Math.random() * 13)
  if (x > 11) {
    x = 10
  }
  if (x === 1) {
    x = 11
  }
  if (a===11&&x==11){
    return 1
  }
  return x
}


export function Imager(g) {
  if (g % 2 === 0) {
    if (g === 10) {
      return img10
    }
    if (g === 8) {
      return img8
    }
    if (g === 6) {
      return img6
    }
    if (g === 4) {
      return img4
    }
    if (g === 2) {
      return img2
    }
  }
  if (g === 3) {
    return img3
  }
  if (g === 5) {
    return img5
  }
  if (g === 7) {
    return img7
  }
  if (g === 9) {
    return img9
  }
  if (g === 11 || g===1) {
    return imga
  }
}


