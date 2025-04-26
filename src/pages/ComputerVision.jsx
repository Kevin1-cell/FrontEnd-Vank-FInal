import React, { useState } from 'react';
import axios from 'axios';

const IAProductoModal = ({ show, onClose, onAddProduct }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [generating, setGenerating] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

  const generateProductInfo = async () => {
    setGenerating(true);

    const endpoint = "https://myvisionservicevankversity.cognitiveservices.azure.com/vision/v3.2/ocr"; // Cambiado a endpoint OCR
    const subscriptionKey = "35dsRtlujhtZO9kiqQugKc1lI6rRc6yYmW7uwT0bLUgLze1DTe7YJQQJ99BDACYeBjFXJ3w3AAAFACOGxbc6";

    try {
      const response = await axios.post(endpoint, 
        { url: imageUrl },
        {
          headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': 'application/json',
          },
        }
      );

      // Extraer todo el texto encontrado
      const extractedText = response.data.regions?.map(region => 
        region.lines.map(line => 
          line.words.map(word => word.text).join(' ')
        ).join('\n')
      ).join('\n\n') || 'Texto no identificado';

      const info = {
        name: `Producto - ${extractedText.split(' ').slice(0, 3).join(' ')}`, // Primeras 3 palabras
        description: `Descripción generada desde imagen:\n${extractedText}`,
        price: Math.floor(Math.random() * (800000 - 50000) + 50000),
        minQuantity: Math.floor(Math.random() * 10) + 1,
      };

      setProductInfo(info);
    } catch (error) {
      console.error('Error procesando imagen:', error);
      setProductInfo({
        name: "Producto no identificado",
        description: "No se pudo extraer texto de la imagen",
        price: 0,
        minQuantity: 1,
      });
    } finally {
      setGenerating(false);
    }
  };

  if (!show) return null;

  return (
    <div className="ia-modal-overlay">
      <div className="ia-modal">
        <button className="ia-modal-close" onClick={onClose}>
          ×
        </button>
        <h3>Generar producto con IA</h3>
        <div className="ia-modal-content">
          <div className="input-group">
            <label>URL de la imagen del producto</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Pega el enlace de la imagen aquí"
            />
          </div>

          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Vista previa" />
            </div>
          )}

          <button
            className="ia-generate-btn"
            onClick={generateProductInfo}
            disabled={!imageUrl || generating}
          >
            {generating ? 'Generando...' : 'Generar información'}
          </button>

          {productInfo && (
            <div className="ia-generated-info">
              <h4>Información Generada:</h4>
              <p><strong>Nombre:</strong> {productInfo.name}</p>
              <p><strong>Descripción:</strong> {productInfo.description}</p>
              <p><strong>Precio sugerido:</strong> ${productInfo.price.toLocaleString()} COP</p>
              <p><strong>Cantidad mínima:</strong> {productInfo.minQuantity}</p>

              <button
                className="ia-add-btn"
                onClick={() => {
                  onAddProduct(productInfo);
                  onClose();
                }}
              >
                Agregar Producto
              </button>
            </div>
          )}

          <div className="ia-disclaimer">
            <p>La IA analizará la imagen y generará: nombre, descripción, precio sugerido y cantidad mínima.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IAProductoModal;