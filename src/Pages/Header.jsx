import { Header, Text, UnstyledButton } from "@mantine/core";
import React from "react";

export default function HeaderSec() {
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
