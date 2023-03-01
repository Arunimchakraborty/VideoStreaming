import React, { useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import AWS from "aws-sdk";
import VideoThumbnail from "react-video-thumbnail"; // use npm published version

import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	createStyles,
	Center,
	Button,
} from "@mantine/core";
import {
	IconGasStation,
	IconGauge,
	IconManualGearbox,
	IconUsers,
} from "@tabler/icons-react";

var backendLoc = require("../config");

const demoArray = [
	{
		name: "Video 1",
		length: 10,
		id: 1,
	},
	{
		name: "Video 2",
		length: 10,
		id: 2,
	},
	{
		name: "Video 3",
		length: 10,
		id: 3,
	},
	{
		name: "Video 4",
		length: 10,
		id: 4,
	},
	{
		name: "Video 4",
		length: 10,
		id: 4,
	},
	{
		name: "Video 4",
		length: 10,
		id: 4,
	},
	{
		name: "Video 4",
		length: 10,
		id: 4,
	},
	{
		name: "Video 4",
		length: 10,
		id: 4,
	},
];

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	imageSection: {
		padding: theme.spacing.md,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderBottom: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	label: {
		marginBottom: theme.spacing.xs,
		lineHeight: 1,
		fontWeight: 700,
		fontSize: theme.fontSizes.xs,
		letterSpacing: -0.25,
		textTransform: "uppercase",
	},

	section: {
		padding: theme.spacing.md,
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	icon: {
		marginRight: 5,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[2]
				: theme.colors.gray[5],
	},
}));

const mockdata = [
	{ label: "4 passengers", icon: IconUsers },
	{ label: "100 km/h in 4 seconds", icon: IconGauge },
	{ label: "Automatic gearbox", icon: IconManualGearbox },
	{ label: "Electric", icon: IconGasStation },
];

function VideoCard(props) {
	const { classes } = useStyles();
	const features = mockdata.map((feature) => (
		<Center key={feature.label}>
			<feature.icon size={18} className={classes.icon} stroke={1.5} />
			<Text size="xs">{feature.label}</Text>
		</Center>
	));

	return (
		<Card withBorder radius="md" className={classes.card}>
			<Card.Section className={classes.imageSection}>
				{/* <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" /> */}
				<Thumbnail url={props.url} />
			</Card.Section>

			<Group position="center" mt="md">
				<div>
					<Text weight={500}>{props.name}</Text>
				</div>
			</Group>

			<Card.Section className={classes.section}>
				<Group spacing={30}>
					<Button radius="xl" style={{ flex: 1 }}>
						Watch now
					</Button>
				</Group>
			</Card.Section>
		</Card>
	);
}

AWS.config.update({
	accessKeyId: process.env.REACT_APP_ACCESS,
	secretAccessKey: process.env.REACT_APP_SECRET,
});

// Create an S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Set the bucket name
const bucketName = "video.arunimchakraborty.co.in";

// Create a function to list all objects in the bucket
async function listBucketObjects() {
	s3.listObjectsV2({ Bucket: bucketName }, (err, data) => {
		if (err) {
			console.log(err, err.stack);
		} else {
			// console.log(data.Contents);
			return data.Contents;
		}
	});
}

function createVideoLink(key) {
	// Set the S3 bucket and video file key
	const params = { Bucket: bucketName, Key: key };

	// Retrieve the video file from S3
	s3.getObject(params, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			// Create a URL object from the video data and set it as the source for the video player
			const videoBlob = new Blob([data.Body], { type: data.ContentType });
			const videoUrl = URL.createObjectURL(videoBlob);
			console.log(videoUrl);
			return videoUrl;
		}
	});
}

function Thumbnail(props) {
	return (
		<div>
			<VideoThumbnail videoUrl={props.url} />
		</div>
	);
}

// Call the function to list all objects in the bucket
// listBucketObjects();

export default function VideoList() {
	const [arrayData, setArrayData] = useState([]);

	useEffect(() => {
		s3.listObjects({ Bucket: bucketName }, function (err, data) {
			if (err) {
				console.log("Error", err);
			} else {
				setArrayData(data.Contents);
			}
		});
	}, []);

	useEffect(() => {
		console.log(arrayData);
	}, [arrayData]);

	return (
		<Grid>
			{arrayData.map((e) => {
				console.log(`${process.env.REACT_APP_LOC}/${e.Key}`);
				return (
					<Grid.Col key={e.ETag} span={4}>
						<VideoCard name={e.Key} url={`${backendLoc}${e.Key}`} />
					</Grid.Col>
				);
			})}
		</Grid>
	);
}
