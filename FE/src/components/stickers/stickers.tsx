import { useContext, useEffect, useState } from 'react';
import Draggable, {  DraggableEventHandler } from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../helper/context/context';
import StickersAPI from '../../helper/api/stickers/sticker.api';
import './stickers.css';

type Headers = {
	method: string,
	headers: HeadersInit,
	body: string
}
type MousePos = {
	clientX: number,
	clientY: number
	}


const Stickers = () => {
	
	const {user} = useContext(LoginContext); // User logged 

	// Checking the user and redirect to login if doesn't have a valid user
	const navigate = useNavigate();
	if(user === "") {
		navigate("/" );
	}

	const [pos, setPos] = useState({x:0,y:0}); //Mouse Coordinates
	const [activeSticker, setActiveSticker] = useState<string>("") 
	const [stickers, setStickers] = useState<any[]>([]) //All Stickers
	let isDisabled = activeSticker && user === stickers[Number(activeSticker.split('sticker')[1])].user 
	? false : true // check if it's available to drag
	
	//control the notes added to the sticker
	const handleNote = (act: string) => {
		if(act){
			const arrayPos = Number(act.split('sticker')[1] );
			const oldNote = stickers && stickers[arrayPos].note
			const addNote = prompt("Please add a note", oldNote && oldNote);
			let newNote = [...stickers]
			newNote[arrayPos].note = addNote
			setStickers(newNote)	
		}
		
	  };
	
	// Set mouse position for get the first sticker position
	const mousePos = (event: MousePos) => {
		const mouse = {
			x: event.clientX, 
			y: event.clientY
		}
		setPos(mouse)	
	}

	//save the last position when the sticker is dragged
	const handleLastPositions:DraggableEventHandler = (e,data) => { 
		const lastPosition = {x: data.x, y: data.y}
		const arrayPos = Number(activeSticker.split('sticker')[1] );
		let location = [...stickers]
		location[arrayPos].position = lastPosition
		setStickers(location)	
	}

	//creates a new sticker
	const newSticker = () => {
		const stickerNum = `sticker${stickers.length}`
		const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
		let myStickers = [...stickers];
		const obj = {
			sticker: stickerNum,
			color: randomColor,
			position: pos,
			note: "",
			user
		};
		myStickers.push(obj);

		setStickers(myStickers)
		
	}

	const getStickers = async () => {
		const header: Headers = {
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body:""
		  };
		const resp = await StickersAPI(header);
		if(resp.length !== 0){
			setStickers(resp)
		}
		
	}

	useEffect(() => {
		getStickers()
	}, [])

	useEffect(()=>{
			
		const saveStickers = async () => {
		
			const header: Headers = {
				method: 'POST',
				headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				body: JSON.stringify(stickers)
			};
			if(stickers.length !==0){
				const resp = await StickersAPI(header);
				if(resp.status === 201){
					// Stickers saved in the Node server
				}
			}

		}
		saveStickers();
	

		
	},[stickers])
	
	return (
		<div>
			<div id="dragContainer" className="dragContainer" onMouseUp={mousePos} onClick={() => !activeSticker && newSticker()}>
			
				{stickers && stickers.map((item, index) => {
					return (
					<Draggable
						key={index} 
						disabled={isDisabled}
						defaultPosition={item.position}
						onStop={handleLastPositions}
					>
						
						<div 
							className={`${item.user === user && "userStickers"} sticker`}
							onDoubleClick={() => handleNote(activeSticker)} 
						>
						<div id={item.sticker} className="sticker" key={item.sticker} 
							style={{ backgroundColor: item.color }}
							onMouseOver={()=> setActiveSticker(item.sticker)} 
							onMouseLeave={()=> setActiveSticker("")}
						>
							<div className='user'>{item.user}</div>
						</div>
							<span	
								className='note' 
								onDoubleClick={() => handleNote(activeSticker)} 
								onMouseOver={()=> setActiveSticker(activeSticker)} 
								onMouseLeave={()=> setActiveSticker("")}
								
							>{item.note}  </span>
						</div>
						
					</Draggable>
					)
				})}
			</div>
		</div>
		
	)
}

export default Stickers;