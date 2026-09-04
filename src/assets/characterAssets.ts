// Character assets for Lumi
import greetingImg from './images/lumi_greeting_1787492961283.jpg';
import speakingImg from './images/lumi_speaking_1787492978470.jpg';
import listeningImg from './images/lumi_listening_1787492997307.jpg';
import encouragingImg from './images/lumi_encouraging_1787493011784.jpg';
import profileImg from './images/lumi-profile.png';
import userImg from './images/user.jpg';
import { LumiMood } from '../types';
import { MOOD_STATUS_TEXT } from '../utils/lumiMood';

export const LUMI_IMAGES: Record<LumiMood, string> = {
  greeting: greetingImg,
  speaking: speakingImg,
  listening: listeningImg,
  encouraging: encouragingImg,
  evaluating: listeningImg,
  celebrating: encouragingImg,
};

// Fixed profile avatars for the messaging interface: Lumi's profile picture
// and the learner's photo (uploaded by the user from the assets folder).
export const LUMI_PROFILE_IMAGE = profileImg;
export const USER_AVATAR_IMAGE = userImg;

// Status text is owned by the central mood system (src/utils/lumiMood.ts).
export const LUMI_STATUS_TEXT: Record<LumiMood, string> = MOOD_STATUS_TEXT;
