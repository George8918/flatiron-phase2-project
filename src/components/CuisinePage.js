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
        `https://pixabay.com/api/?key=36404956-dbea71482a1b61f69c95cb03c&q=${country}+ food +dinner&image_type=photo&per_page=100`
        )
        .then((response)=> response.json())
        .then((data) => {
            if (data.hits) {
                const formattedImages =data.hits.map((hit)=> {
                    return {
                        id: hit.id,
                        imageUrl: hit.webformatURL,
                        title: hit.tags,
                        description: '',
                    }
                });
                setImagesData(formattedImages)
                setFilteredImages(formattedImages);
            } else {
                console.log('No result 404');

            }
        })
    }

    const displayImages = (images) => {
        return images.map((image) => (
            <img CuisineItem key= {image.id} src= {image.imageUrl} alt={image.title} description={image.description}/>
        ))  
    }

    const filterImages = (query) => {
        const filtered = imagesData.filter((image) => 
        image.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredImages(filtered)
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