interface Props  {
	method: string,
	header: object
}

const StickersAPI = async (props: Props) => {

	const {method, header} = props;

	if(method==="GET"){
		
		const URL = "http://localhost:3001/stickers";

		const response = await fetch(URL, header );
		const stickers = await response.json();
		return stickers;
	}
	if(method==="POST"){
		
		const URL = "http://localhost:3001/stickers";

		const response = await fetch(URL, header);
		const isSave = await response.json();
		return isSave
	}
}

export default StickersAPI