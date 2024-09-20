import { useState } from 'react';
import './start.scss';

type PropsType = {
  setStep: (step: number) => void;
};

export default function Start({ setStep }: PropsType) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextStep = () => {
    if (selectedOption === 'Powerpoint') {
      setStep(6);
    } else {
      setStep(2);
    }
  };
  return (
    <div className="start-section">
      <div className="instructions">
        <h2>Inicio de carga</h2>
        <p>Selecciona cómo deseas iniciar el proceso de cotización</p>
      </div>
      <div className="options">
        <button
          className={`option-button red ${
            selectedOption === 'Powerpoint' ? 'active' : ''
          }`}
          onClick={() => handleSelectOption('Powerpoint')}
        >
          <div className="red-box"></div>
          <p>Powerpoint</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            className="red-icon"
          >
            <circle cx="18" cy="18" r="18" />
            <path
              d="M14.7681 23.4L13.7971 24.3379L14.7681 25.3432L15.7391 24.3379L14.7681 23.4ZM26.171 13.5379C26.689 13.0016 26.6741 12.147 26.1379 11.629C25.6016 11.111 24.7469 11.1258 24.229 11.6621L26.171 13.5379ZM8.92896 19.2979L13.7971 24.3379L15.7391 22.4621L10.871 17.4221L8.92896 19.2979ZM15.7391 24.3379L26.171 13.5379L24.229 11.6621L13.7971 22.4621L15.7391 24.3379Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          className={`option-button blue ${
            selectedOption === 'Manual' ? 'active' : ''
          }`}
          onClick={() => handleSelectOption('Manual')}
        >
          <div className="blue-box"></div>
          <p>Manual</p>
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
        </button>
      </div>
      <div className="buttons">
        <button className="back-button">Atras</button>
        <button onClick={handleNextStep} disabled={!selectedOption}>
          Continuar
        </button>
      </div>
    </div>
  );
}
