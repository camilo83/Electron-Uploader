import { jsPDF } from 'jspdf';
import './finish.scss';

type UploadedData = {
  name: string;
  url: string;
};

type FinishProps = {
  uploadedData: UploadedData[];
  setStep: (step: number) => void;
};

// Función para convertir una imagen URL a base64
const getImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Convierte la imagen a base64
    });
  } catch (error) {
    console.error('Error convirtiendo la imagen a base64:', error);
    return null;
  }
};

export default function Finish({ uploadedData, setStep }: FinishProps) {
  console.log(uploadedData);

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Resumen de Imágenes Subidas', 20, 20);

    let yPosition = 40; // Posición inicial en el PDF

    // Agregar las imágenes al PDF
    for (const data of uploadedData) {
      // Agregar nombre de la imagen
      doc.setFontSize(12);
      doc.text(data.name, 20, yPosition);
      yPosition += 10; // Ajustar la posición para la imagen

      // Obtener la imagen en formato base64
      const base64Image = await getImageAsBase64(data.url);
      if (base64Image) {
        // Insertar la imagen en el PDF (x, y, width, height)
        doc.addImage(base64Image, 'JPEG', 20, yPosition, 50, 50);
        yPosition += 60; // Ajustar la posición para el siguiente elemento
      }
    }

    // Guardar el PDF
    doc.save('resumen_imagenes.pdf');
  };

  return (
    <div className="finish-section">
      <div className="empty"></div>
      <div className="instructions">
        <div className="title-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            className="blue-icon"
          >
            <circle cx="18" cy="18" r="18" />
            <path
              d="M14.7681 23.4L13.7971 24.3379L14.7681 25.3432L15.7391 24.3379L14.7681 23.4ZM26.171 13.5379C26.689 13.0016 26.6741 12.147 26.1379 11.629C25.6016 11.111 24.7469 11.1258 24.229 11.6621L26.171 13.5379ZM8.92896 19.2979L13.7971 24.3379L15.7391 22.4621L10.871 17.4221L8.92896 19.2979ZM15.7391 24.3379L26.171 13.5379L24.229 11.6621L13.7971 22.4621L15.7391 24.3379Z"
              fill="white"
            />
          </svg>
          <h2>Plantilla Enviada</h2>
        </div>
        <p>
          Aquí tienes un resumen de las imágenes subidas. Puedes descargar el
          resumen haciendo clic en el botón de abajo.
        </p>
      </div>
      <div className="buttons">
        <button onClick={handleDownloadPDF}>Descargar Resumen</button>
        <button onClick={() => setStep(1)}>Enviar otro correo</button>
      </div>
    </div>
  );
}
