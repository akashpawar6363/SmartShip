import React from 'react';
import './PhotoModal.css'; 

const PhotoModal = ({ photo, onClose }) => {
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={photo.url} alt={photo.title} className="modal-image" />
        <h2>{photo.title}</h2>
        <p>Album ID: {photo.albumId}</p>
        <p>Photo ID: {photo.id}</p>
      </div>
    </div>
  );
};

export default PhotoModal;
