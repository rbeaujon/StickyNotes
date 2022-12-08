const StickersAPI = async () => {

	const URL = "localhost:3001/stickers";

	const response = await fetch(URL);
	const data = await response.json();
	return data;
}

export default StickersAPI