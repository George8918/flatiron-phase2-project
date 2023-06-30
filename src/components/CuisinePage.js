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

    
        })
    }
} 