import React from 'react';
import './productList.scss';

export type Product = {
  id: number;
  image: string;
  name: string;
};

type ProductListProps = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  validationAttempted?: boolean;
};

export default function ProductList({
  products,
  setProducts,
  validationAttempted,
}: ProductListProps) {
  const handleAddProduct = () => {
    setProducts([...products, { id: Date.now(), image: '', name: '' }]);
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleChangeImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const newProducts = products.map((product) =>
        product.id === id
          ? { ...product, image: URL.createObjectURL(file) }
          : product
      );
      setProducts(newProducts);
    }
  };

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newProducts = products.map((product) =>
      product.id === id ? { ...product, name: event.target.value } : product
    );
    setProducts(newProducts);
  };

  const handleRemoveImage = (id: number) => {
    const newProducts = products.map((product) =>
      product.id === id ? { ...product, image: '' } : product
    );
    setProducts(newProducts);
  };

  return (
    <div className="products">
      {products.map((product) => {
        const fileInputRef = React.createRef<HTMLInputElement>();
        const hasError =
          validationAttempted && (!product.name || !product.image);
        return (
          <div
            key={product.id}
            className={`product-item ${hasError ? 'error' : ''}`}
          >
            {product.image ? (
              <div className="image-container">
                <img src={product.image} alt={product.name} />
                <div
                  className="overlay"
                  onClick={() => handleRemoveImage(product.id)}
                >
                  <div className="text">
                    {' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M22.1943 15.3403H9.13879"
                        stroke="white"
                        stroke-width="1.30556"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle
                        cx="15.6667"
                        cy="15.6667"
                        r="15.0641"
                        stroke="white"
                        stroke-width="1.20513"
                      />
                    </svg>
                    <p>Eliminar imagen</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="upload-btn-wrapper">
                <button
                  className="btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="button-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M22.2201 15.3403H9.16455M15.6923 8.48615V22.5209"
                        stroke="white"
                        stroke-width="1.30556"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle
                        cx="15.6923"
                        cy="15.6667"
                        r="15.0641"
                        stroke="white"
                        stroke-width="1.20513"
                      />
                    </svg>
                    <p>Subir Imagen</p>
                  </div>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleChangeImage(e, product.id)}
                />
              </div>
            )}
            <div className="input-text-remove">
              <textarea
                className="input-text"
                value={product.name}
                onChange={(e: any) => handleChangeName(e, product.id)}
                placeholder="Nombre del producto"
              />
              <button onClick={() => handleRemoveProduct(product.id)}>
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6.4 15L10 11.4L13.6 15L15 13.6L11.4 10L15 6.4L13.6 5L10 8.6L6.4 5L5 6.4L8.6 10L5 13.6L6.4 15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                    fill="#49454F"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
      <button className="add-product" onClick={handleAddProduct}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M22.1943 15.3403H9.13879M15.6666 8.48615V22.5209"
            stroke="#2C3744"
            stroke-width="1.30556"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            cx="15.6667"
            cy="15.6667"
            r="15.0641"
            stroke="#2C3744"
            stroke-width="1.20513"
          />
        </svg>
        <p>Agregar Producto</p>
      </button>
    </div>
  );
}
