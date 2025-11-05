---
title: Video sources
sidebar_position: 4
---

# Video sources

The Video sources section allows you to configure and manage IP cameras and video sources for integration with NethVoice. By clicking the **Create new source** button, you can fill out a form to create a new video source.
Users accessing CTI with appropriate permissions can view video streams from these sources directly within the CTI interface, they can also trigger actions such as opening gates or doors connected to the video source using DTMF tones.

## Creating a Video Source {#creating-video-source}

Click the **Create new source** button to access the configuration form. Complete the following fields:

- **Name**: Specify the name of the video source.
Specify the name to give to the video source. This name will be used to identify the video source within NethVoice.
- **Extension**: Specify the internal extension associated with the video source. This extension must have been previously created in the "Users" section.
- **URL**: Specify the connection URL to retrieve video frames. This should be the direct URL to the video stream or image source.
- **Opening Code**: Enter the DTMF tone code for an optional opening code. This is useful when the camera is connected to a gate or door that requires a code to open.
- **Profile**: Specify the profile to assign to the video source. This filters the type of user that has access to the video source based on their assigned profile.


#### Connection {#connection}

Press the **Verify** button to verify that the entered URL is correct. This will:

- Test the connection to the URL
- Retrieve and display the video frame from the source
- Confirm that the video source is accessible and functioning properly

## Saving the Video Source

Once you have completed filling out all required fields, press the **Save** button to save the configuration and create the new video source. The video source will then be available for use within CTI.