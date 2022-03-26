import { v4 as uuidV4 } from "uuid";
import { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
	const [id, setId] = useState();
	const [userName, setUserName] = useState();

	const createNewRoom = (e) => {
		e.preventDefault();

		setId(uuidV4());

		//Toast
		toast.success("Created a new room");
	};

	return (
		<div className="homePageWrapper">
			<div className="formWrapper">
				<img
					className="homePageLogo"
					src="/code-sync.png"
					alt="code-sync"
				/>
				<h4 className="mainLabel">Paste invitation ROOM ID</h4>
				<div className="inputGroup">
					<input
						type="text"
						placeholder="ROOM ID"
						className="inputBox"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
					<input
						type="text"
						placeholder="USERNAME"
						className="inputBox"
						onChange={(e) => setUserName(e.target.value)}
						value={userName}
					/>
					<button className="btn joinBtn">Join</button>
					<span className="createInfo">
						<a
							onClick={createNewRoom}
							href="/"
							className="createNewBtn"
						>
							Create new room
						</a>
					</span>
				</div>
			</div>

			<footer>
				<h4>
					Built with 💛 by{" "}
					<a href="https://github.com/Harsh-0986">Harsh Shah</a>
				</h4>
			</footer>
		</div>
	);
};

export default Home;
