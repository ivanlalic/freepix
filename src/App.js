import React, {useState, useEffect} from 'react';
import Form from './components/form';
import List from './components/list';

function App() {

  //States
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [actualpage, setActualPage] = useState(1); //start from page 1
  const [totalpages, setTotalPages] = useState(1); //at least you have 1 page always 



  //useEffect to call API when user add a search tag

  useEffect( ()=> {
    const callAPI = async () => {

      if(search === '') return; //avoid call API if tag is empty, when load page

      const imagesPerPage = 30;
      const key = '17880079-27cce7dc00c09652002621953';
      const URL = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${actualpage}`;

      const answer = await fetch(URL);
      const result = await answer.json();
      
      setImages(result.hits);

      //Calc totalpages
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      setTotalPages(calculateTotalPages);

      //Move screen to top
      const jumbotron = document.querySelector('.jumbotron'); //Select where to go
      jumbotron.scrollIntoView({ behavior: 'smooth' }); //aply method scrollintoview and behavior so when reload DOM because
      //of page change or api call, it goes to the top(.jumbotron)

    }
    callAPI();
  }, [actualpage, search] )

  //Define previous page
  const prevPage = () => { // its the actual minus 1 page
    const newActualPage = actualpage - 1; 
    setActualPage(newActualPage);

    if(newActualPage === 0) return; // To avoid negative page 
  }

  //Define next page
  const nextPage = () => {
    const newActualPage = actualpage + 1; 
    setActualPage(newActualPage);

    if(newActualPage > totalpages) return; // To avoid going to more pages than total
  }



  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image finder</p>
        <Form 
          setSearch={setSearch}
        />
      </div>
      <div className="row justify-content-center">
        <List 
          images={images}
        />

        { (actualpage === 1) ? null : (
          <button
          type="button"
          className="btn btn-info mr-1"
          onClick={prevPage}
          >&laquo; Prev </button>
        ) }

        { (actualpage === totalpages) ? null : (
          <button
          type="button"
          className="btn btn-info"
          onClick={nextPage}
          >Next &raquo;</button>
        ) }

      </div>
    </div>
  );
}

export default App;
