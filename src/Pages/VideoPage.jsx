import { Text } from "@mantine/core";
import React from "react";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import { Center } from "@mantine/core";

export default function VideoPage(props) {
	return (
		<div>
			<Text>{props.name}</Text>
			<div style={{paddingTop: 30}}>
				<Center>
					<Player
						playsInline
						poster="/assets/poster.png"
						src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
						fluid={false}
						height={650}
					/>
				</Center>
			</div>
		</div>
	);
}
