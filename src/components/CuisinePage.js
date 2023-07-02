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
        fetch(
            `http://localhost:3001/cuisines?name=${encodeURIComponent(country.toLowerCase())}`
        )
        .then((response)=> response.json())
        .then((data) => {
            if (data) {
                const formattedImages =data.hits.map((hit)=> {
                    return {
                setImagesData(formattedImages)
                setFilteredImages(formattedImages);
            } else {
                console.log('No result 404');

            }
        })
    }

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
        e.preventDefault()

        const formData = new FormData(e.target)
        const newCuisine = {
            name: formData.get('name'),
            description: formData.get('description'),
        }

        fetch('http://localhost:3001/cuisines,' {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCuisine),
        })
         .then((response) => response.json())
         .then((data) => {
            setImagesData([...imagesData, data]);
            setFilteredImages([...filteredImages, data]);
         })
    }

    return (
        <div>
            <h1>Cuisine Page</h1>
        <div className="tab">
            <button className="tablinks" onClick={() => setCurrentTab('Italian')}>Italian</button>
            <button className="tablinks" onClick={() => setCurrentTab('Turkish')}>Turkish</button>
            <button className="tablinks" onClick={() => setCurrentTab('Chinese')}>Chinese</button>
            <button className="tablinks" onClick={() => setCurrentTab('Canadian')}>Canadian</button>
            <button className="tablinks" onClick={() => setCurrentTab('American')}>American</button>
            <button className="tablinks" onClick={() => setCurrentTab('Indian')}>Indian</button>
            <button className="tablinks" onClick={() => setCurrentTab('Ukrainian')}>Ukrainian</button>
            <button className="tablinks" onClick={() => setCurrentTab('English')}>English</button>
            <button className="tablinks" onClick={() => setCurrentTab('Austrian')}>Austrian</button>
            <button className="tablinks" onClick={() => setCurrentTab('Japanese')}>Japanese</button>
            <button className="tablinks" onClick={() => setCurrentTab('Korean')}>Korean</button>
            <button className="tablinks" onClick={() => setCurrentTab('Australian')}>Australian</button>
            <button className="tablinks" onClick={() => setCurrentTab('Russian')}>Russian</button>

        </div>
    
       <div className="search-container">
        <input
           type="text"
           id="search-input"
           placeholder="Search..."
           onChange={(e) => filterImages(e.target.value)}
           />
        
        <button
          id = "clear-btn"
          onClick={() => setFilteredImages(imagesData)}
          >
          Clear
          </button>
       </div>
       <div className="image-container">{displayImages(filteredImages)}</div>

        </div>

        )
    }
    
    export default CuisinePage;