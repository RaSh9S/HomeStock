import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

export default function List() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const componentsRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:9080/shoppinglist/")
            .then((res) => {
                setList(res.data);
                setLoading(false);
            })
            .catch((err) => {
                alert(err.message);
                setLoading(false);
            });
    }, []);

    // ✅ Properly initialize useReactToPrint outside of event handlers
    const handlePrint = useReactToPrint({
        content: () => componentsRef.current,
        documentTitle: "Shopping List Report",
        onAfterPrint: () => alert("Report Downloaded!"),
    });

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading report...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 display-4">Shopping List Report</h1>
            
            {/* ✅ Wrap the printable content inside a div with the ref */}
            <div ref={componentsRef}>
                <div className="card shadow">
                    <div className="card-body">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-center">Item Name</th>
                                    <th className="text-center">Category</th>
                                    <th className="text-center">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length > 0 ? (
                                    list.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{item.itemName}</td>
                                            <td className="text-center">{item.category}</td>
                                            <td className="text-center">{item.quentity}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No data available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ✅ Correct way to trigger printing */}
            <div className="text-center mt-4">
                <button onClick={handlePrint} className="btn btn-primary mt-2">
                    Download Report
                </button>
            </div>
        </div>
    );
}
