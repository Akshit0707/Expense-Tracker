import { Dimensions, PixelRatio } from "react-native";

const {width:SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("window");
const [shortDimension, longDimension] = SCREEN_WIDTH < SCREEN_HEIGHT ? 
[SCREEN_WIDTH, SCREEN_HEIGHT] : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const s=scale;
export const vs=verticalScale;
export const ms=moderateScale;
export const mvs=moderateVerticalScale;