import { useEffect, useState } from 'react';
import axios from 'axios';

const KeellsPrices = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:9080/api/keells-products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch product data.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // First fetch on mount
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Auto-refresh every 5 mins

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Keells Product Prices (Live)</h1>

      {loading && <p>Loading data, please wait...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KeellsPrices;
