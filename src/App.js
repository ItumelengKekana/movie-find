import {useState} from 'react';
import ReactPaginate from 'react-paginate';


function App() {
	//set variables to save search results
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	let type = '';

	//user can filter results based on preferance (movie or series)
	const selectType = () =>{
		const mov = document.querySelector('#movie');
		const ser = document.querySelector('#series');

		if(mov.checked){
			type='movie'
		}else if(ser.checked){
			type='series';
		}
	}

	// declare the search function
	const handleSearch = async () =>{
		//e.preventDefault();
		if(search === '') return;

		const endpoint = `https://www.omdbapi.com/?apikey=4960b75e&s=${search}&type=${type}&r=json&plot=short&page=${currentPage}`

		const response = await fetch(endpoint);
		
		if(!response){
			throw Error(response.statusText)
		}
		const json = await response.json();

		console.log(json);

		setResults(json.Search);
		setTotal(json.totalResults);

	}
	
	//handle pagination
	const handlePageChange = (e) =>{
		setCurrentPage(e.selected);
		handleSearch();
	}


	return (
		<div className="App">
			<header>
				<h1>Movie <span>.find</span></h1>
				<div className='search-box'>
					<input 
					type="search" 
					placeholder='Enter movie or series name'
					value={search}
					onChange={e => setSearch(e.target.value)}
					/>
				</div>
				<button id='search-btn' onClick={handleSearch}>Search</button>
				{(total) ? <p>Total results: {total}</p> : ''}
				<form className='radioGroup'>
					<input 
						type="radio" 
						name='type'
						id='movie'
						value='movie'
						onClick={selectType}
						/>
					<label htmlFor="type" for='movie'>Movie</label>	
					<input 
						type="radio"
						name='type' 
						id='series'
						value='series'
						onClick={selectType}
					/>
					<label htmlFor="type" for='series'>Series</label>
				</form>
			</header>
			<div className="results">
				{results.map((result, i) =>{
					// setting the url for the imdb page of a certain movie or series
					const id = `https://www.imdb.com/title/${result.imdbID}/?ref_=tt_sims_tt_i_1`;

					return(
						<div className="result" key={i}>
							<a href={id} target="_blank">{result.Title}</a>
							<img src={result.Poster} alt="" />
						</div>
					)
				})}
			</div>
			
			{total ? (<ReactPaginate
				pageCount={5}
				pageRange={2}
				marginPagesDisplayed={3}
				onPageChange={handlePageChange}
				containerClassName={'container'}
				previousLinkClassName={'page'}
				breakClassName={'page'}
				nextLinkClassName={'page'}
				pageClassName={'page'}
				disabledClassName={'disabled'}
				activeClassName={'active'}
				/>) : ''}			
		</div>
	);
}

export default App;
