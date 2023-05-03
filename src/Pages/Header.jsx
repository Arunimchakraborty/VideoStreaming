import { Button, Header, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderSec() {
	const navigate = useNavigate()
	return (
		<Header height={{ base: 20, md: 50 }} p="md">
			<div style={{ display: "flex", alignItems: "center", height: "100%" }}>
				<UnstyledButton>
					<Text>Watch</Text>
				</UnstyledButton>
				<UnstyledButton>
					<Text style={{ paddingLeft: 60 }}>Upload</Text>
				</UnstyledButton>
				<UnstyledButton>
					<Text style={{ paddingLeft: 60 }}>User</Text>
				</UnstyledButton>
			</div>
		</Header>
	);
}
