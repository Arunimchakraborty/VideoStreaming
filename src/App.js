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
	UnstyledButton,
} from "@mantine/core";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HeaderSec from "./Pages/Header";
import VideoList from "./Pages/VideoList";
import VideoPage from "./Pages/VideoPage";
import { Outlet, Link } from "react-router-dom";
import UploadVideo from "./Pages/UploadVideo";

export default function App() {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const navigate = useNavigate();
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
							<UnstyledButton onClick={() => navigate('/')}>
								<Text>Watch</Text>
							</UnstyledButton>
							<UnstyledButton onClick={() => navigate('/upload')}>
								<Text style={{ paddingLeft: 60 }}>Upload</Text>
							</UnstyledButton>
						</div>
					</Header>
				}
			>
				<Routes>
					<Route path="/" element={<VideoList />} />
					<Route path="/upload" element={<UploadVideo />} />
					{/* <Route index element={<Home />} />
						<Route path="blogs" element={<Blogs />} />
						<Route path="contact" element={<Contact />} />
						<Route path="*" element={<NoPage />} /> */}
					<Route path="/video/:id" element={<VideoPage />} />
				</Routes>
			</AppShell>
			<Outlet />
		</MantineProvider>
	);
}
