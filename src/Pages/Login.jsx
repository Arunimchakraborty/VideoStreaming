import { Button, PasswordInput } from "@mantine/core";
import React from "react";
import { Input } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

export default function Login() {
	return (
		<div>
			<Input icon={<IconAt />} placeholder="Your email" withAsterisk />
			<PasswordInput placeholder="Password" withAsterisk />
			<Button>Sign up</Button>
		</div>
	);
}
