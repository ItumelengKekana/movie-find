import {useState} from 'react';


function App() {
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);
	const [total, setTotal] = useState('');

	let type = '';

	const selectType = () =>{
		const mov = document.querySelector('#movie');
		const ser = document.querySelector('#series');

		if(mov.checked){
			type='movie'
		}else if(ser.checked){
			type='series';
		}
	}

	const handleSearch = async e =>{
		e.preventDefault();
		if(search === '') return;

		const endpoint = `https://www.omdbapi.com/?apikey=4960b75e&s=${search}&type=${type}&r=json&plot=short&page=1`

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
					return(
						<div className="result" key={i}>
							<h3>{result.Title}</h3>
							<img src={result.Poster} alt="" />
						</div>
					)
				})}

			</div>
		</div>
	);
}

export default App;
