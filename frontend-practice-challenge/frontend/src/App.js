import Navbar from "./components/Navbar"
import Form from "./components/Form"
import Books from "./components/Books"
import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Form />
      </div>
      <div className="container">
        <Books />

      </div>

    </>
  );
}

export default App;
