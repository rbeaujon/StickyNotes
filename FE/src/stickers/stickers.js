import { isDisabled } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import StickersAPI from '../helper/sticker.api';
import './stickers.css';

const Stickers = () => {
	
	const user = "ricardo";
	let note 
	const [pos, setPos] = useState({x:0,y:0}); //Mouse Coordinates
	const [activeSticker, setActiveSticker] = useState(null) 
	const [stickers, setStickers] = useState([]) //All Stickers
	let isDisabled = activeSticker && user === stickers[Math.abs(activeSticker.split('sticker')[1])].user ? false : true // check if it's available to drag
	
	//control the notes added to the sticker
	const handleNote = (act) => {
		if(act){
			const arrayPos = Math.abs(act.split('sticker')[1]);
			const oldNote = stickers[arrayPos].note
			const addNote = prompt("Please add a note", oldNote && oldNote);
			let newNote = [...stickers]
			newNote[arrayPos].note = addNote
			setStickers(newNote)	
		}
		
	  };
	
	// Set the mouse position for get the first sticker position
	const mousePos = (event) => {
		const mouse = {
			x: event.clientX, 
			y: event.clientY
		}
		setPos(mouse)	
	}

	//save the last position when the sticker is dragged
	const handleLastPositions = (data) => { 
		stickers[Math.abs(activeSticker.split('sticker')[1])].position = {x:data.x, y:data.y}
	}

	//creates a new sticker
	const newSticker = () => {
		const stickerNum = `sticker${stickers.length}`
		let myStickers = [...stickers];
		const obj = {
			sticker:
				<div id={stickerNum} className="sticker" 
					onMouseOver={()=> setActiveSticker(stickerNum)} 
					onMouseLeave={()=> setActiveSticker(null)}
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

	

	const callAPIStickers = async () => {
		const resp = await StickersAPI();
		setStickers(resp)
	}
	
	useEffect(() => {
		callAPIStickers()
	}, [])
	
	
	return (
		<div>
			<div id="dragContainer" class="dragContainer" onMouseUp={mousePos} onClick={() => !activeSticker && newSticker()}>
			
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