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
        <Books />
      </div>
    </>
  );
}

export default App;
