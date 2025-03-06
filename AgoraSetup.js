import {createClient, createMicrophoneAndCameraTracks, createScreenVideoTrack, useLocalMicrophoneTrack } from "agora-rtc-react";

import AgoraRTM from 'agor-rtm-sdk';

const appId = "8b87af443b0144fcb717f4a88512c41c";
const token = null;
export const config = {mode: "rtc", codec: "vp8", appId: appId, token: token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTrack = createMicrophoneAndCameraTracks();