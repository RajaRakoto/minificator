// dev
export const DEVMODE = true;

// path
export const FONT_PATH = "./fonts/Standard.flf";
export const INPUT_IMAGES_PATH = DEVMODE ? "./tests" : "./";
export const OUTPUT_MIN_IMAGES_PATH = DEVMODE
	? "./tests/minificator/minified-images"
	: "./minificator/minified-images";
export const OUTPUT_RESIZE_IMAGES_PATH = DEVMODE
	? "./tests/minificator/resized-images"
	: "./minificator/resized-images";
