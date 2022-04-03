import { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material-ocean.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import ACTIONS from "../actions";

const Editor = ({ socketRef, roomId }) => {
	const editorRef = useRef();

	useEffect(() => {
		const init = async () => {
			editorRef.current = Codemirror.fromTextArea(
				document.getElementById("realtimeEditor"),
				{
					mode: { name: "javascript", json: true },
					theme: "material-ocean",
					autoCloseTags: true,
					autoCloseBrackets: true,
					lineNumbers: true,
				}
			);

			editorRef.current.on("change", (instance, changes) => {
				const { origin } = changes;
				const code = instance.getValue();
				if (origin !== "setValue") {
					socketRef.current.emit(ACTIONS.CODE_CHANGE, {
						roomId,
						code,
					});
				}
			});
		};

		init();
	}, []);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
				if (code !== null) {
					editorRef.current.setValue(code);
				}
			});
		}

		return () => {
			socketRef.current.off(ACTIONS.CODE_CHANGE);
		};
	}, [socketRef.current]);

	return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
