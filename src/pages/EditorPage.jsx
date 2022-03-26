import { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
	const [clients, setClients] = useState([
		{ socketId: 1, userName: "Harsh Shah" },
		{ socketId: 2, userName: "Rohit Shah" },
	]);

	return (
		<div className="mainWrap">
			<div className="aside">
				<div className="asideInner">
					<div className="logo">
						<img
							src="/code-sync.png"
							alt="logo"
							className="logoImage"
						/>
					</div>
					<h3>Connected</h3>
					<div className="clientsList">
						{clients.map((client) => (
							<Client
								userName={client.userName}
								key={client.socketId}
							/>
						))}
					</div>
				</div>
				<button className="btn copyBtn">Copy Room Id</button>
				<button className="btn leaveBtn">Leave</button>
			</div>
			<div className="editorWrap">
				<Editor />
			</div>
		</div>
	);
};

export default EditorPage;
