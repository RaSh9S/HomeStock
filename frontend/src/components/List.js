import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function List() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const componentRef = useRef();

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

    const handleDownloadPdf = () => {
        const input = componentRef.current;

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // portrait, millimeters, A4 size

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('shopping-list-report.pdf');
        });
    };

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

            {/* Capture this div as PDF */}
            <div ref={componentRef} className="p-4 bg-white">
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

            {/* Download Button */}
            <div className="text-center mt-4">
                <button onClick={handleDownloadPdf} className="btn btn-success mt-2">
                    Download PDF
                </button>
            </div>
        </div>
    );
}
