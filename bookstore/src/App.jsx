import Book from './Book'
import books from './books'
import './App.css'
function App() {
  return <div >
    <h1>Most famous books</h1>
    {books.map((book,index)=>{
      return <section id='xy'>
        <Book {...book} key={book.id} num={index}/>
      </section>
    })}
    </div>
}

export default App
