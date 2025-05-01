import React from 'react';
import { BiBookAlt, BiDollar, BiChart, BiListCheck, BiReceipt } from 'react-icons/bi';
import '../styles/Reportssidebar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = () => {
    return (
        <div className="menu">
            <div className="logo">
                <BiBookAlt className="logo-icon" />
                <h2> STOCKMATE </h2>
            </div>
            <div className="menu--list">

            <Link to="/Reports_Home" className="item">
                    <BiReceipt className="icon" />
                    Reports Home               
                </Link>



                <Link to="/Reportsadd" className="item"> {/* Corrected path */}
                    <BiDollar className="icon" />
                    Budget Limit
                </Link>

                <Link to="/ReportsEditBudgetPortalForm" className="item">
                    <BiDollar className="icon" />
                    Update Budget Limit
                </Link>


                {/* 
                <Link to="/Pharmacyprescriptions " className="item">
                    <BiReceipt className="icon" />
                    Manage Prescription
                </Link> 
                */}

                <Link to="/ReportsBudgetPortal_History" className="item"> {/* Change the link to match the route for DrugHistory */}
                    <BiListCheck className="icon" />
                    Budget Limit History
                </Link>

                <Link to="/ReportsMonthly_Overview" className="item">
                    <BiChart className="icon" />
                    Monthly Overview
                </Link>
                {/* 
                <Link to="/PharmacyInvoice" className="item">
                        <BiReceipt className="icon"/>
                        Invoice
                    </Link>  */}

                



            </div>
        </div>
    )
}

export default Sidebar;
