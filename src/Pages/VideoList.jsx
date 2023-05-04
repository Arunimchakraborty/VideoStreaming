import React, { useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import AWS from "aws-sdk";
import { useNavigate } from "react-router-dom";

import {
	Card,
	Text,
	Group,
	createStyles,
	Button,
} from "@mantine/core";

var backendLoc = require("../config");

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
		maxWidth: 20,
		maxHeight: 250,
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

function VideoCard(props) {

	const navigate = useNavigate();
	const { classes } = useStyles();

	return (
		<Card withBorder radius="md" className={classes.card}>
			{/* <Card.Section className={classes.imageSection}> */}
			{/* <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" /> */}
			{/* <Thumbnail url={props.url} height={300} width={300} /> */}
			{/* </Card.Section> */}

			<Group position="center" mt="md">
				<div>
					<Text weight={500}>{props.name}</Text>
				</div>
			</Group>

			<Card.Section className={classes.section}>
				<Group spacing={30}>
					<Button radius="xl" style={{ flex: 1 }} onClick={() => {navigate(`video/${props.name}`)}}>
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
				console.log(`${process.env.REACT_APP_LOC}${e.Key}`);
				return (
					<Grid.Col key={e.ETag} span={4}>
						<VideoCard name={e.Key} url={`${backendLoc}${e.Key}`} />
					</Grid.Col>
				);
			})}
		</Grid>
	);
}
