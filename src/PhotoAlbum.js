import React, { useState, useEffect } from 'react';
import './PhotoAlbum.css'; 
import PhotoModal from './PhotoModal';

const PhotoAlbum = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((data) => setPhotos(data));
  }, []);

  const limitTitle = (title) => {
    return title.length > 20 ? title.slice(0, 20) + '...' : title;
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleModalClose = () => {
    setSelectedPhoto(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Album and Photo Exploration</h1>
      <input
        type="text"
        placeholder="Search photos by title"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="photo-list">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="photo-card"
            onClick={() => handlePhotoClick(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="photo-thumbnail"
            />
            <p className="photo-title">{limitTitle(photo.title)}</p>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default PhotoAlbum;