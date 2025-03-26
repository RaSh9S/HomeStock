import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {


    const {id} = useParams();

    const [values, setValues] = useState({
        itemName: '',
        category: '',
        quentity: ''
         
  });


      

      useEffect(() => {
        axios.get(`http://localhost:9080/shoppinglist/get/${id}`)
          .then(res => {
            const itemData = res.data.item;
           
            setValues({
                itemName: itemData.itemName || '',
                category: itemData.category || '',
                quentity: itemData.quentity || ''
              
            });
          })
          .catch(err => console.log(err));
      }, [id]);
      
       const navigate = useNavigate()

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9080/shoppinglist/update/${id}`, values)
          .then(res => {
            navigate('/');
          })
          .catch(err => console.log(err));
      }

    return (
        <div className='container'>
          <h1>Item Details</h1><br></br>
    <form onSubmit={handleSubmit}>
        
      <div className="mb-3">
        <label htmlFor="itemName">itemName</label>
        <input
            type="text"
            className="form-control"
            id="itemName"
            placeholder='Item Name'
            value={values.itemName}
            onChange={(e) => setValues({...values, itemName: e.target.value })}
            />
        
      </div>
      


      <div className="mb-3">
        <label htmlFor="category">category</label>
        <input type="text" className="form-control" id="category" placeholder='category'
        value={values.category}
        onChange={(e) => setValues({...values, category: e.target.value })}
       
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="quentity">Quantity</label>
        <input type="text" className="form-control" id="quentity" placeholder='Quantity'
        value={values.quentity}
        onChange={(e) => setValues({...values, quentity: e.target.value })}
       
        />
        
      </div>

    
     
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
    </div>
    );
}

export default Update;
