import './App.css';
import Map from './Map';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <a
          className="App-link"
          href="https://www.google.com/maps"
          rel="noopener noreferrer"
        >
          Esta es una aplicación para ver el mapa de google
        </a> */}
        <Map />
        
      </header>
    </div>
  );
}

export default App;
