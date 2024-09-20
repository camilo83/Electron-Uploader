import { useEffect, useState } from 'react';
import ProductList, { Product } from '../products/productList/productList';
import './products.scss';

type PropsType = {
  handleNext: () => void;
  handlePrev: () => void;
  setGlobalProducts: (products: Product[]) => void;
};

export default function Products({
  handleNext,
  handlePrev,
  setGlobalProducts,
}: PropsType) {
  const [products, setProducts] = useState<Product[]>([
    { id: Date.now(), image: '', name: '' },
  ]);
  const [validationAttempted, setValidationAttempted] = useState(false);

  useEffect(() => {
    setGlobalProducts(products);
  }, [products, setGlobalProducts]);

  const handleNextStep = () => {
    let isValid = true;
    for (let product of products) {
      if (!product.name || !product.image) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      alert('Por favor, llena todos los campos');
      setValidationAttempted(true);
      return;
    }

    handleNext();
  };

  return (
    <div className="products-section">
      <div className="instructions">
        <h2>Preparación de Productos</h2>
        <p>
          Prepara los productos para posteriormente enviarlos a todos los
          provedores configurados <span className="underline">aqui.</span>
        </p>
      </div>
      <ProductList
        products={products}
        setProducts={setProducts}
        validationAttempted={validationAttempted}
      />
      <div className="buttons">
        <button onClick={handlePrev}>Atras</button>
        <button onClick={handleNextStep}>Continuar</button>
      </div>
    </div>
  );
}
