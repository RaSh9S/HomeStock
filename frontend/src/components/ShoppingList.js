import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

export default function ShoppingList() { 
    const [shoppinglist, setShoppingList] = useState([]);

    useEffect(() => {
        function getList() {
            axios.get("http://localhost:9080/shoppinglist/")
                .then((res) => {
                    setShoppingList(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }

        getList();
    }, []);

     const ComponentsRef = useRef();
        const handlePrint = useReactToPrint({
            content: ()=> ComponentsRef.current,
            documentTitle:"Shopping List",
            onAfterPrint:()=>alert("Report Donloaded!"),
    
        })

    const navigate = useNavigate()
    
        const deleteItem = (id) => {
            axios.delete(`http://localhost:9080/shoppinglist/delete/${id}`)
            .then(() => {
                
                alert('Item Deleted Successfully');
                navigate('/');
                
                // Remove the deleted expense from the state to update UI
                setShoppingList(shoppinglist.filter(shoppinglist => shoppinglist._id !== id));
                
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }

    return (
        <div className="container mt-5">
        <h1 className="text-center mb-4">Shopping List</h1>
        <table className="table table-striped table-hover">
            <thead className="thead-dark">
                <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {shoppinglist.map((item, index) => (
                    <tr key={index}>
                        <td>{item.itemName}</td>
                        <td>{item.category}</td>
                        <td>{item.quentity}</td>
                        <td>
                            <Link to={`/update/${item._id}`} className="btn btn-info btn-sm">
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteItem(item._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="text-center mt-4">
            <Link to="/addItem" className="btn btn-primary">
                Add New Item
            </Link>

            <Link to={`/list`} className="btn btn-info">Report</Link>
        </div>
    </div>
    );
}