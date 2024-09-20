import { useState } from 'react';
import Start from '../../components/start/start';
import Products from '../../components/products/products';
import Preparing from '../../components/preparing/preparing';
import Finish from '../../components/finish/finish';
import Errors from '../../components/errors/errors';
import './homePage.scss';
import { Product } from '../../components/products/productList/productList';
import Powerpoint from '../../components/powerpoint/powerpoint';

export default function HomePage() {
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [uploadedData, setUploadedData] = useState<
    { name: string; url: string }[]
  >([]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  console.log(products);

  return (
    <div className="full-screen">
      <div className="left">
        <div className="logo-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="81"
            height="108"
            viewBox="0 0 81 108"
            fill="none"
          >
            <path
              d="M34.6019 83.8978V77.7571H60.4316L80.1206 107.291C71.1858 107.388 49.5734 107.525 34.6019 107.291C45.5186 89.824 39.1505 84.4176 34.6019 83.8978Z"
              fill="#C45424"
            />
            <path
              d="M32.0678 37.307H26.512V15.6685C39.0856 -11.5257 68.9116 3.28978 71.3484 11.1849C73.7851 19.08 72.9079 20.542 71.3484 24.6358C70.1007 27.9108 63.9406 33.0183 61.0165 35.1626C67.742 36.4297 81.1929 44.4223 80.9979 56.6061C80.842 66.3531 71.3484 70.7393 67.2546 71.6165C63.1608 72.4938 35.2843 72.7862 35.2843 72.7862V67.5228C35.2843 67.5228 61.0165 68.2051 66.6698 66.2557C72.3231 64.3063 75.1042 61.5771 74.4674 53.3896C73.7537 44.2132 63.4533 39.9387 57.4101 39.2564C51.3669 38.5741 52.634 35.455 53.1214 33.8955C53.6087 32.336 62.8684 26.7801 65.89 23.4661C68.3073 20.8149 67.8394 17.3255 67.8394 17.3255C60.5291 -3.33822 32.0678 5.72654 32.0678 18.3977V37.307Z"
              fill="#265088"
            />
            <path
              d="M17.4472 92.2803C16.1801 98.7133 5.10095 102.19 0 102.612V107.583C6.40056 107.713 19.884 105.341 22.6131 92.8651C23.003 89.3562 23.3929 84.2877 23.9777 66.743C25.1671 51.5376 39.7679 48.8085 46.1035 48.8085L45.5187 43.2527L41.1325 43.8375L38.2084 44.3248C26.317 45.397 18.9093 57.5808 18.6168 64.5012C18.3244 71.4216 18.7143 85.8472 17.4472 92.2803Z"
              fill="#C45424"
            />
          </svg>
        </div>
        <h2>Generar Cotización para productos</h2>
        <p>
          Bushwick Schlitz. Est Shoreditch small batch, dolor Schlitz sapiente
          twee stumptown ex. Duis Carles pickled,{' '}
        </p>
      </div>
      <div className="right">
        {step === 1 && <Start setStep={setStep} />}
        {step === 2 && (
          <Products
            handleNext={handleNext}
            handlePrev={handlePrev}
            setGlobalProducts={setProducts}
          ></Products>
        )}
        {step === 3 && (
          <Preparing
            setStep={setStep}
            products={products}
            setUploadedData={setUploadedData}
          />
        )}
        {step === 4 && <Finish uploadedData={uploadedData} setStep={setStep} />}
        {step === 5 && <Errors></Errors>}
        {step === 6 && <Powerpoint></Powerpoint>}
      </div>
    </div>
  );
}
