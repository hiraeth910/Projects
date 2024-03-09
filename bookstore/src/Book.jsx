import books from './books'

const Book = (props) => {
    const {image,title,author,num} = props
  return (
    <div id="a">
        <span id="xx">{`#${num+1}`}</span>
        <img src={image} alt={title} className="image" />
        <h3>{title}</h3>
        <h2>{author}</h2>
    </div>
  )
}

export default Book
