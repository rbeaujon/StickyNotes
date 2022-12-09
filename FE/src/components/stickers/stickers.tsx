import { useContext, useEffect, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
import LoginContext from '../../helper/context/context';
import StickersAPI from '../../helper/sticker.api';
import './stickers.css';

type Headers = {
	method: string,
	header: object,
	body: string
}
type MousePos = {
	clientX: number,
	clientY: number
	}
// type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;
// type DraggableData = {
//   node: HTMLElement,
//   // lastX + deltaX === x
//   x: number, y: number,
//   deltaX: number, deltaY: number,
//   lastX: number, lastY: number
// };

const Stickers = () => {
	
	const {user} = useContext(LoginContext); // User logged 

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
	const handleLastPositions = (data:DraggableEvent) => { 
		// const {x,y} = data
		stickers[Number(activeSticker.split('sticker')[1])].position = {}
	}

	//creates a new sticker
	const newSticker = () => {
		const stickerNum = `sticker${stickers.length}`
		let myStickers = [...stickers];
		const obj = {
			sticker:
				<div id={stickerNum} className="sticker" 
					onMouseOver={()=> setActiveSticker(stickerNum)} 
					onMouseLeave={()=> setActiveSticker("")}
				>
					<div className='user'>{user}</div>
				</div>
			,
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
			header: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: ""
		  };
		const resp = await StickersAPI(header);
		setStickers(resp)
	}

	const saveStickers = async () => {
		
		const header: Headers = {
			method: 'POST',
			header: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(stickers)
		  };
		const resp = await StickersAPI(header);
		
	}
	
	useEffect(() => {
		//getStickers()
	}, [])

	useEffect(() => {
		//saveStickers()
	}, [stickers])
	
	return (
		<div>
			<div id="dragContainer" className="dragContainer" onMouseUp={mousePos} onClick={() => !activeSticker && newSticker()}>
			
				{stickers && stickers.map(item => {
					return (
					<Draggable
						disabled={isDisabled}
						defaultPosition={item.position}
						onStop={handleLastPositions}
					>
						
						<div 
							className={`${item.user === user && "userStickers"} sticker`}
							onDoubleClick={() => handleNote(activeSticker)} 
						>
							{item.sticker} 
							<span className='note' 
								onDoubleClick={() => handleNote(activeSticker)} 
								// onMouseOver={()=> setActiveSticker(activeSticker)} 
								// onMouseLeave={()=> setActiveSticker(null)}
								
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