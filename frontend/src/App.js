
import './App.css';
import Header from './components/Header';
import AddItemList from './components/AddItemList';
import ShoppingList from './components/ShoppingList';
import Update from './components/EditItem';
import List from './components/List';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes> 
        
          <Route path='/addItem' element={<AddItemList />} /> 
          <Route path='/' element={<ShoppingList/>} /> 
          <Route path='/update/:id' element={<Update/>} /> 
          <Route path='/list' element={<List/>} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

