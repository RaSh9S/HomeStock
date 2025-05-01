import React, { useState } from 'react';
import { BiSearch, BiNotification } from 'react-icons/bi';
import '../styles/Reportscontent.css';

const ReportsContentHeader = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    let value = e.target.value;
    
    // Remove any non-numeric characters
    value = value.replace(/[^0-9]/g, '');
    
    // Format the value with Rs. prefix and commas
    if (value) {
      value = `Rs.${Number(value).toLocaleString()}`;
    }
    
    setSearchTerm(value);
    
    // Pass only numeric value for searching
    const searchValue = value.replace(/[Rs.,]/g, '').trim();
    onSearch(searchValue);
  };

  return (
    <div className='content--header'>
      <h1 className='header--title'> Budget Portal</h1>
      <div className='header--activity'>
        <div className='search-box'>
          <div className="search-input-container">
            <input
              type='text'
              placeholder='Search Budget..'
              value={searchTerm}
              onChange={handleInputChange}
              id="searchbox"
            />
            <BiSearch className='icon' />
          </div>
        </div>
        {/* <div className='notify'>
          <BiNotification className='icon' />
        </div> */}
      </div>
    </div>
  );
};

export default ReportsContentHeader;

