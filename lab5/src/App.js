import './App.css';
import database from './assets/database.json'
import Blogs from './components/Blogs';
import Navbar from './components/Navbar';


function App() {


  return (
    <div className="App flex flex-row min-h-screen">
      <nav className="sticky top-0 h-screen">
        <Navbar data={database} />
      </nav>
      <main className='flex-grow bg-gray-100'>
        <section className='bg-transparent'>
          {
            database.map(el => <Blogs data={el} key={el.name} />)
          }
        </section>
        <footer className="footer">
          ce.kmitl all rights reserved & copyright 2022
        </footer>
      </main>

    </div>
  );
}

export default App;
