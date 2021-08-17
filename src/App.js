import {useState} from 'react';


function App() {
	//set variables to save search results
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState('');

	let type = '';
	let page = 1; //set default page to 1

	//configure API endpoint
	const url = `https://www.omdbapi.com/?apikey=4960b75e&s=${search}&type=${type}&r=json&plot=short&${page}`

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
	const handleSearch = async e =>{
		e.preventDefault();
		if(search === '') return;

		const endpoint = `https://www.omdbapi.com/?apikey=4960b75e&s=${search}&type=${type}&r=json&plot=short&${page}`

		const response = await fetch(endpoint);
		
		if(!response){
			throw Error(response.statusText)
		}
		const json = await response.json();

		console.log(json);

		setResults(json.Search);
		setTotal(json.totalResults);

	}
	


	return (
		<div className="App">
			<header>
				<h1>Movie .find</h1>
				<form className='search-box' onSubmit={handleSearch}>
					<input 
					type="search" 
					placeholder='Enter movie or series name'
					value={search}
					onChange={e => setSearch(e.target.value)}
					/>
				</form>
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
			
			{/* //TODO: add function to change pages */}
			</div>
			{(total) ? <div className="pages">
							<a href=''>Prev</a>
							<a href=''>Next</a>
						</div> : ''}
			
		</div>
	);
}

export default App;
