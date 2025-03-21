import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const categoryData = Object.values(
    filteredProducts.reduce((acc, product) => {
      acc[product.category] = acc[product.category] || { category: product.category, count: 0 };
      acc[product.category].count++;
      return acc;
    }, {})
  );

  return (
    <div className="container"> 
      <h1 className="title">Lista de Productos</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td className="price">${product.price.toFixed(2)}</td>
                <td className="capitalize">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h2 className="chart-title">Cantidad de Productos por Categoría</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="category" tick={{ fill: "#333" }} />
            <YAxis tick={{ fill: "#333" }} />
            <Tooltip />
            <Bar dataKey="count" fill="#1D4ED8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <style>
        {`
          .container {
            padding: 24px;
            max-width: 800px;
            margin: auto;
            background: linear-gradient(to right, #ebf8ff, #dbeafe);
            min-height: 100vh;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #1E40AF;
            margin-bottom: 16px;
          }
          .search-container {
            display: flex;
            justify-content: center;
            margin-bottom: 16px;
          }
          .search-input {
            border: 1px solid #93C5FD;
            padding: 8px;
            width: 75%;
            border-radius: 5px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
            outline: none;
          }
          .table-container {
            overflow-x: auto;
            background: white;
            border-radius: 5px;
            padding: 10px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
          }
          .product-table {
            width: 100%;
            border-collapse: collapse;
          }
          .product-table th, .product-table td {
            padding: 10px;
            text-align: left;
          }
          .product-table th {
            background: #1E40AF;
            color: white;
          }
          .product-table tr:nth-child(even) {
            background: #F3F4F6;
          }
          .product-table tr:hover {
            background: #DBEAFE;
            transition: 0.3s;
          }
          .price {
            color: #10B981;
            font-weight: bold;
          }
          .capitalize {
            text-transform: capitalize;
          }
          .chart-title {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            color: #1E40AF;
            margin-top: 20px;
          }
          .chart-container {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
            margin-top: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default App;
