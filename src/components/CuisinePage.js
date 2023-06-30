import React, {useState, useEffect} from 'react';

const CuisinePage = () => {
    const [currentTab, setCurrentTab] = useState ('');
    const [imagesData, setImagesData] = useState ([]);
    const [filteredImages, setFilteredImages] = useState([]);

    useEffect(() => {
        fetchImageData(currentTab);
    }, [currentTab]);

    const fetchImageData = (cuisine) => {
        fetch(
            `https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=${cuisine}&image_type=photo&per_page=100`
        )
        .then((response)=> response.json())
        .then((data) => {
            if (data.hits) {
                const formattedImages =data.hits.map((hit)=> {
                    return {
                        id: hit.id,
                        imageUrl: hit.webformURL,
                        title: hit.tags,
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
            <img key= {image.id} src= {image.imageUrl} alt={image.title}/>
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
          
       </div>

        </div>

        })
    }
} 