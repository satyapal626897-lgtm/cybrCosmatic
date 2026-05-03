'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/images');
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setImages(data.images);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p> {error}</p>;

  return (
    <main>
      <h1>Our Collection</h1>

      <div className="grid">
        {images.map((img) => (
          <div className="flip-card" key={img.public_id}>
            <div className="flip-inner">

             
              <div className="flip-front">
                <Image
                  src={img.secure_url}
                  alt={img.context?.custom?.title || 'image'}
                  width={img.width}
                  height={img.height}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div className="flip-back">
                <h3>{img.context?.custom?.title || 'No Title'}</h3>
                <p>{img.context?.custom?.description || ''}</p>
                <p className="price"> Rs. {img.context?.custom?.price || '0'}</p>
                <p className="tags">{img.tags?.join(', ') || ''}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </main>
  );
}