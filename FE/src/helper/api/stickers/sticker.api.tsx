interface Header  {
	method: string,
	headers: HeadersInit,
	body: string
}

const StickersAPI = async (header: Header) => {

	const {method} = header;

	if(method==="GET"){
		
		const URL = "http://localhost:3001/stickers";

		const response = await fetch(URL);
		const stickers = await response.json();
		return stickers;
	}
	if(method==="POST"){
		
		const URL = "http://localhost:3001/stickers";

		const response = await fetch(URL, header);
		if (response.status === 201) {
			const isSave = await response.json();
			return {
				isSave,
				status: response.status
			}

		}else {
			const errorResponse =[{"status":response.status}, {"error":response.statusText}]
			return errorResponse;
		}

	}
}

module.exports = StickersAPI