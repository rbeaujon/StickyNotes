import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/login/login';
import LoginContext from "./helper/context/context";
import Stickers from './components/stickers/stickers';


const App = () => {
	const [user, setUser] = useState<string>("")

	return (
		<LoginContext.Provider value={{user, setUser}}>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={ <Login /> } />
					<Route path="/" element={ <Login /> } />
					<Route path="/stickers" element={ <Stickers/>} />
				</Routes>
			</BrowserRouter>
		</LoginContext.Provider>

	)
}

export default App