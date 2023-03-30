import { Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import { Center } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
const backendLoc = require("../config");

export default function VideoPage(props) {
	// const id = locationArray[0];
	const [id, setId] = useState("");
	const location = useLocation();
	useEffect(() => {
		const locationArray = location.pathname.split("/");
		setId(locationArray[2]);
	}, []);
	useEffect(() => console.log(`ID - ${id}`), [id]);
	return (
		<div>
			<Text>{props.name}</Text>
			<div style={{ paddingTop: 30 }}>
				<Center>
					<Player
						playsInline
						poster="/assets/poster.png"
						src={`${backendLoc}${id}`}
						fluid={false}
						height={650}
					/>
					{/* <video src={`${backendLoc}${id}`} height={650} /> */}
				</Center>
			</div>
		</div>
	);
}
