import { useEffect, useState } from 'react';
import './preparing.scss';
import { Product } from '../products/productList/productList';

type PropsType = {
  setStep: (step: number) => void;
  products: Product[];
  setUploadedData: (data: { name: string; url: string }[]) => void; // Recibe una función para almacenar la data
};

export default function Preparing({
  setStep,
  products,
  setUploadedData,
}: PropsType) {
  const [error, setError] = useState(false); // Estado para manejar errores

  const uploadImages = async () => {
    const uploadImageToCloudinary = async (
      imageFile: File,
      productName: string
    ) => {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'powerpointssss');
      formData.append('folder', 'productos');
      formData.append('public_id', productName);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dydb0lj4r/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        return data.secure_url;
      } catch (error) {
        console.error('Error subiendo la imagen a Cloudinary:', error);
        return null;
      }
    };

    const uploadedData = [];
    let isValid = true;

    for (let product of products) {
      const imageFile = await fetch(product.image)
        .then((r) => r.blob())
        .then((blob) => new File([blob], product.name, { type: blob.type }));

      const uploadedImageUrl = await uploadImageToCloudinary(
        imageFile,
        product.name
      );
      if (uploadedImageUrl) {
        uploadedData.push({ name: product.name, url: uploadedImageUrl });
      } else {
        isValid = false;
        break;
      }
    }

    return { isValid, uploadedData };
  };

  useEffect(() => {
    const processImages = async () => {
      const { isValid, uploadedData } = await uploadImages();
      if (isValid) {
        setUploadedData(uploadedData); // Guardamos los nombres y URLs subidos
        setStep(4); // Avanza a `Finish`
      } else {
        setError(true); // Maneja error
        setStep(5); // Avanza a `Errors`
      }
    };

    processImages();
  }, [setStep, setUploadedData]);

  return (
    <div className="preparing-section">
      <div className="instructions">
        <h2>Subiendo Imágenes...</h2>
        <p>Estamos subiendo tus imágenes. Esto puede tardar unos momentos.</p>
        <img src="/loadingGif.gif" alt="Cargando..." />
        {error && (
          <p style={{ color: 'red' }}>Hubo un error subiendo las imágenes</p>
        )}
      </div>
    </div>
  );
}
