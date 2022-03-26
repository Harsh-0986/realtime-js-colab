import { useEffect } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material-ocean.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";

const Editor = () => {
	useEffect(() => {
		const init = async () => {
			Codemirror.fromTextArea(document.getElementById("realtimeEditor"), {
				mode: { name: "javascript", json: true },
				theme: "material-ocean",
				autoCloseTags: true,
				autoCloseBrackets: true,
				lineNumbers: true,
			});
		};

		init();
	}, []);

	return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
