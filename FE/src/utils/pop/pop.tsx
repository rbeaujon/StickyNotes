import  './pop.css'

interface Field {
	id: string;
	name: string;
	functionName: () => void;
}

const Pop = ({id, name, functionName}: Field ) => {

	return (
		<div id={id} className="pop">
			<label>{name}</label><br/>
			<input type="text" id={`${id}Text`} name={id}></input>
			<div>
				<button  onClick={ () => functionName()}>Submit</button>
			</div>
		</div>
		
	)

}

 export default Pop