import AWS from "aws-sdk";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import {
	Button,
	Dialog,
	FileInput,
	LoadingOverlay,
	Notification,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

function Uploader(props) {
	return (
		<FileInput
			label="Upload file"
			placeholder="Upload file"
			accept="video/mp4"
			size="lg"
			value={props.value}
			onChange={props.setValue}
			style={{ width: "200" }}
			pos="relative"
		/>
	);
}

export default function UploadVideo() {
	const [value, setValue] = useState(undefined);
	const [visible, { toggle, close }] = useDisclosure(false);
	const [success, setSuccess] = useState(false);
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				marginTop: "250px",
				flexDirection: "column",
			}}
		>
			<LoadingOverlay visible={visible} overlayBlur={2} />
			<Uploader value={value} setValue={setValue} />
			<Button
				color="green"
				style={{ width: "200px", marginTop: "40px" }}
				onClick={async () => {
					await uploadVideo(
						{
							Body: value,
							Bucket: bucketName,
							Key: value.name,
						},
						close,
						toggle,
						setSuccess
					);
					console.log(value);
				}}
				pos="relative"
			>
				Upload
			</Button>
			{success ? <SuccessModal /> : null}
		</div>
	);
}

function SuccessModal() {
	return (
		<Dialog>
			<Notification
				icon={<IconCheck size="1.1rem" />}
				color="teal"
				title="Success"
			/>
		</Dialog>
	);
}

// Create an S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Set the bucket name
const bucketName = "video.arunimchakraborty.co.in";

async function uploadVideo(object, close, toggle, setSuccess) {
	toggle();
	AWS.config.update({
		accessKeyId: process.env.REACT_APP_ACCESS,
		secretAccessKey: process.env.REACT_APP_SECRET,
	});
	s3.putObject(object, (err, data) => {
		if (err) console.log(err, err.stack); // an error occurred
		else {
			console.log(data);
			close();
			setSuccess(true);
		} // successful response
	});
}
