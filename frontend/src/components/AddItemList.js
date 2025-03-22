import React,{useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";



export default function AddItemList(){

    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [quentity, setQuentity] = useState("");

    const navigate = useNavigate();

    function sendData(e){
        e.preventDefault();
        const newItem ={
            itemName,
            category,
            quentity
            
        }

        

       axios.post("http://localhost:9080/shoppinglist/add-to-list",newItem).then(()=>{
        alert("Item Added");
        
        navigate('/');
       
       }).catch((err)=>{
         alert(err);
       })


    }



    return(
        <div className="container">
            <form onSubmit={sendData}>
  <div className="mb-3">
    <label for="ItemName" className="form-label">Item Name</label>
    <input type="text" className="form-control" id="itemName" 
       
       onChange={(e)=>{

        setItemName(e.target.value);

       }}
    
    />
   
  </div>
  <div className="mb-3">
    <label for="category" className="form-label">Category</label>
    <input type="text" className="form-control" id="category" 
      
      onChange={(e)=>{

        setCategory(e.target.value);

       }}
    
    
    />
  </div>

  <div class="mb-3">
    <label for="quentity" className="form-label">Quentity</label>
    <input type="text" className="form-control" id="quentity"
    
    onChange={(e)=>{

        setQuentity(e.target.value);

       }}
    
    />
   
  </div>
  
  <button type="submit" className="btn btn-primary">Add</button>
</form>
        </div>
    )
}