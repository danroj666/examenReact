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
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Lista de Productos</h1>
      
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="border p-3 w-3/4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">Nombre</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-200">
                <td className="p-3">{product.title}</td>
                <td className="p-3 text-green-600 font-semibold">${product.price.toFixed(2)}</td>
                <td className="p-3">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h2 className="text-xl font-bold mt-6 text-center text-blue-600">Cantidad de Productos por Categoría</h2>
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="category" tick={{ fill: "#555" }} />
            <YAxis tick={{ fill: "#555" }} />
            <Tooltip />
            <Bar dataKey="count" fill="#3498db" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default App;
