const Home = () => {
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
					/>
					<input
						type="text"
						placeholder="USERNAME"
						className="inputBox"
					/>
					<button className="btn joinBtn">Join</button>
					<span className="createInfo">
						<a href="" className="createNewBtn">
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
