import React, { useEffect } from 'react';

function ProductList({ products, loadData, loading, error }) {
  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <h1>{loading.message}</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {products.map(x => (
        <div key={x.id}>
          <h1>{x.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
