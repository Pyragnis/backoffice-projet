// SketchfabEmbed.js
import React,{useEffect} from 'react';


const SketchfabEmbed = ({ modelId, modelName }) => {

  useEffect(() => {
    // Sélectionnez la div avec la classe 'controls'
    const controlsDiv = document.querySelector('.controls');

    // Ajoutez du CSS à la div si elle existe
    if (controlsDiv) {
      controlsDiv.style.display = 'none';
    }

    // Nettoyez le style lorsque le composant est démonté
    return () => {
      if (controlsDiv) {
        controlsDiv.style.display = 'block'; // ou la valeur initiale que vous souhaitez
      }
    };
  }, []); // Le tableau vide signifie que cela ne s'exécute qu'une seule fois après le montage du composant

  return (
    <div className="sketchfab-embed-wrapper">
      <iframe
        title={modelName}
        frameBorder="0"
        allowFullScreen
        mozAllowFullScreen="true"
        webkitAllowFullScreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&controls=0`}
        style={{ width: '100%', height: '100%' }}
      ></iframe>

    </div>
  );
};

export default SketchfabEmbed;
