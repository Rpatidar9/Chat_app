
import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from "./page/HomePage";
import ChatPage from "./page/ChatPage";

function App() {
  return (<div className="App">
    <Route path="/" component={HomePage} />
    <Route path="/home" component={ChatPage} />
  </div>);
}

export default App;
