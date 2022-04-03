import { useState, useEffect, useRef } from "react";
import ACTIONS from "../actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import {
	Navigate,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
	const reactNavigator = useNavigate();
	const socketRef = useRef(null);
	const location = useLocation();
	const { roomId } = useParams();
	const handleErrors = (e) => {
		console.log("socket error", e);
		toast.error("Socket connection failed, try again later.");
		reactNavigator("/");
	};

	useEffect(() => {
		const init = async () => {
			socketRef.current = await initSocket();
			socketRef.current.on("connect_error", (err) => handleErrors(err));
			socketRef.current.on("connect_failed", (err) => handleErrors(err));
			socketRef.current.emit(ACTIONS.JOIN, {
				roomId,
				username: location.state?.userName,
			});

			//Listening for joined event
			socketRef.current.on(
				ACTIONS.JOINED,
				({ clients, username, socketId }) => {
					if (username !== location.state?.username) {
						toast.success(`${username} joined the room`);
					}
					setClients(clients);
				}
			);

			//Listening for disconnected
			socketRef.current.on(
				ACTIONS.DISCONNECTED,
				({ socketId, username }) => {
					toast.success(`${username} left the room`);
					setClients((prev) => {
						return prev.filter(
							(client) => client.socketId != socketId
						);
					});
				}
			);
		};

		init();

		return () => {
			socketRef.current.disconnect();
			socketRef.current.off(ACTIONS.JOINED);
			socketRef.current.off(ACTIONS.DISCONNECTED);
		};
	}, []);

	const [clients, setClients] = useState([]);

	async function copyRoomID() {
		try {
			await navigator.clipboard.writeText(roomId);
			toast.success("Room Id has been copied to ypur clipboard");
		} catch (e) {
			console.error(e);
			toast.error("Could not copy Room Id");
		}
	}

	function leaveRoom() {
		reactNavigator("/");
	}

	if (!location.state) {
		return <Navigate to="/" />;
	}

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
								userName={client.username}
								key={client.socketId}
							/>
						))}
					</div>
				</div>
				<button className="btn copyBtn" onClick={copyRoomID}>
					Copy Room Id
				</button>
				<button className="btn leaveBtn" onClick={leaveRoom}>
					Leave
				</button>
			</div>
			<div className="editorWrap">
				<Editor socketRef={socketRef} roomId={roomId} />
			</div>
		</div>
	);
};

export default EditorPage;
