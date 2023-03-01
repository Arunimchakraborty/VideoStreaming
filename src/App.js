import { useState } from "react";
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	MantineProvider,
} from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/SignUp";
import VideoList from "./Pages/VideoList";
import VideoPage from "./Pages/VideoPage";

export default function App() {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<AppShell
				styles={{
					main: {
						background:
							theme.colorScheme === "dark"
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				}}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				header={
					<Header height={{ base: 20, md: 50 }} p="md">
						<div
							style={{ display: "flex", alignItems: "center", height: "100%" }}
						>
							<Text>Application header</Text>
						</div>
					</Header>
				}
			>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<VideoList />}>
							{/* <Route index element={<Home />} />
						<Route path="blogs" element={<Blogs />} />
						<Route path="contact" element={<Contact />} />
						<Route path="*" element={<NoPage />} /> */}
						</Route>
					</Routes>
				</BrowserRouter>
			</AppShell>
		</MantineProvider>
	);
}
