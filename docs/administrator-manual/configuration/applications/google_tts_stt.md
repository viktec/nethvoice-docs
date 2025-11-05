---
title: Google Text-To-Speech Speech-To-Text
sidebar_position: 6
---

# Google Text-To-Speech and Speech-To-Text

The *Google TTS/STT* integration allows you to leverage Google's advanced speech recognition and text-to-speech services within NethVoice. These services can be used to create dynamic voice announcements and enable custom speech recognition scenarios.

## Setup and Authentication {#setup-authentication}

### Obtaining Google API Credentials

To use Google's TTS and STT services, you need to obtain authentication credentials from the Google Developer Platform:

1. Visit the [Google Developer Console](https://console.developers.google.com/)
2. Create or select an existing project
3. Enable the required APIs:
   - Google Cloud Text-to-Speech API
   - Google Cloud Speech-to-Text API
4. Create a service account and generate a JSON key file
5. Download the JSON credentials file to your local machine

For detailed instructions on obtaining your credentials, refer to the links inside the page.

### Uploading Credentials to NethVoice

To enable Google services in NethVoice:

1. Navigate to `Applications > Cloud services`
2. Click the **Upload** button
3. Select the JSON credentials file downloaded from the Google Developer Platform
4. The credentials will be stored securely in NethVoice

Once credentials are uploaded, both TTS and STT features become available.

## Google Text-To-Speech (TTS) {#google-tts}

### Overview

Google TTS allows you to generate high-quality voice recordings from text. This is particularly useful for creating professional voice announcements, IVR prompts, and call queue recordings without requiring manual voice recording.

### Using TTS in VisualPlan

You can use Google TTS anywhere in NethVoice where you can add a recording:

- **Announcements**: Create voice announcements for calls
- **IVR (Interactive Voice Response)**: Build voice menus with dynamic prompts
- **CQR (Call Queue Recordings)**: Generate professional queue messages

#### Creating a TTS Recording

1. Navigate to the recording addition dialog in your desired feature (Announcements, IVR, CQR)
2. If credentials have not been uploaded yet, you will have the option to upload your Google API key in the dialog
3. If credentials are already configured, two dropdown menus will appear:
   - **Language**: Select the language for the voice
   - **Voice**: Select the specific voice variant
4. Enter your message text in the provided text field
5. Click the **Play** button (speaker icon) to preview the generated voice
6. After confirming the recording sounds as desired:
   - Enter a **Name** for the recording
   - Enter a **Description**
   - Click **Save** to store it as a system recording

The recording can now be used throughout NethVoice wherever recordings are supported.

## Google Speech-To-Text (STT) {#google-stt}

### Overview

Google STT provides advanced speech recognition capabilities for custom NethVoice implementations and integrations.

### Custom Implementation

STT is primarily used through custom API implementations and integrations. For specific use cases and integration guidance, please contact Nethesis support by opening a ticket through the [helpdesk](https://helpdesk.nethesis.it/).

**Support Resources:**
- Open a support ticket for custom STT implementation guidance
- Discuss your specific use case and requirements with the support team
- Receive expert recommendations for your particular scenario

## Cost Considerations

Both Google TTS and STT services are subject to Google Cloud pricing. Usage costs depend on:

- Number of characters processed (TTS)
- Duration of audio processed (STT)
- API call frequency

Refer to the [Google Cloud Pricing](https://cloud.google.com/pricing) page for current rates and usage limits.