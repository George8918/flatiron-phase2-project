import React, {useState, useEffect} from 'react';
import CuisineItem from './CuisineItem';


const CuisinePage = () => {
    const [currentTab, setCurrentTab] = useState ('');
    const [imagesData, setImagesData] = useState ([]);
    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        fetchImageData(currentTab);
    }, [currentTab]);

    const fetchImageData = (country) => {

  fetch(`https://json-server-project-phase2.onrender.com/cuisines?country=${country}+food`)
        .then((response)=> response.json())
        .then((data) => {
            if (data.hits) {
                const formattedImages = data.hits.map((hit) => ({
                  id: hit.id,
                  imageUrl: hit.imageUrl,
                  title: hit.tags,
                  description: hit.description,
                }));
                setImagesData(formattedImages);
                setFilteredImages(formattedImages);
              } else {
                console.log('No result');
              }
            });
        };

    const displayImages = (images) => {
    
        return images.map((image) => (
            < CuisineItem 
            key= {image.id} 
            imageUrl= {image.imageUrl} 
            title={image.title} 
            description={image.description}/>
        ))  
    }

    const filterImages = (query) => {
        const filtered = imagesData.filter((image) => 
        image.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredImages(filtered)
    }

    
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newImage = {
      id: formData.id(),
      imageURL: formData.get('imageURL'),
      title: formData.get('title'),
      description: formData.get('description'),
    };

    fetch('https://json-server-project-phase2.onrender.com/cuisines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newImage),
    })
      .then((response) => response.json())
      .then((data) => {
        setImagesData([...imagesData, data]);
        setFilteredImages([...filteredImages, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

   
    e.target.reset();
  };


    return (
        <div>
            <h1>Cuisine Page</h1>
        <div className="tab">
            <button className="tablinks" onClick={() => setCurrentTab('Italian')}>Italian</button>
            <button className="tablinks" onClick={() => setCurrentTab('Chinese')}>Chinese</button>
            <button className="tablinks" onClick={() => setCurrentTab('Canadian')}>Canadian</button>
            <button className="tablinks" onClick={() => setCurrentTab('American')}>American</button>
            <button className="tablinks" onClick={() => setCurrentTab('Ukrainian')}>Ukrainian</button>
            <button className="tablinks" onClick={() => setCurrentTab('Iran')}>Iran</button>
            <button className="tablinks" onClick={() => setCurrentTab('English')}>English</button>
            <button className="tablinks" onClick={() => setCurrentTab('Austrian')}>Austrian</button>
            <button className="tablinks" onClick={() => setCurrentTab('Japanese')}>Japanese</button>
            <button className="tablinks" onClick={() => setCurrentTab('Korean')}>Korean</button>
            <button className="tablinks" onClick={() => setCurrentTab('Russian')}>Russian</button>

        </div>
    
        <div className="search-container">
  <input
    type="text"
    id="search-input"
    placeholder="Name"
    onChange={(e) => filterImages(e.target.value)}
  />

  <form className="image-form" onSubmit={handleSubmit}>
    <input
      type="text"
      id="description-input"
      name="description"
      placeholder="Description"
    />

    <button type="submit">Add Image</button>
  </form>
</div>
<div className="image-container">{displayImages(filteredImages)}</div>

</div>
    )
}
    export default CuisinePage;