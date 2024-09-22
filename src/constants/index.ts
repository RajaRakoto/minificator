/* types */
import type { T_ImageExtension } from "@/@types";

// ==============================

// dev
export const DEV_MODE = false;

// path
export const FONT_PATH = "./fonts/Standard.flf";
export const INPUT_FILES_PATH = DEV_MODE ? "./tests" : "./";
export const OUTPUT_ROOT_PATH = DEV_MODE
	? "./tests/minificator"
	: "./minificator";
export const OUTPUT_MIN_IMAGES_PATH = DEV_MODE
	? "./tests/minificator/minified-images"
	: "./minificator/minified-images";
export const OUTPUT_RESIZE_IMAGES_PATH = DEV_MODE
	? "./tests/minificator/resized-images"
	: "./minificator/resized-images";
export const OUTPUT_MIN_PDF_PATH = DEV_MODE
	? "./tests/minificator/minified-pdf"
	: "./minificator/minified-pdf";

// supported extensions
export const SUPPORTED_MIN_IMAGES_EXTENSIONS: T_ImageExtension[] = [
	"jpg",
	"jpeg",
	"png",
	"webp",
];
export const SUPPORTED_RESIZE_IMAGES_EXTENSIONS: T_ImageExtension[] = [
	"jpg",
	"jpeg",
	"png",
	"webp",
];
export const SUPPORTED_ALL_IMAGES_EXTENSIONS: T_ImageExtension[] = [
	...new Set([
		...SUPPORTED_MIN_IMAGES_EXTENSIONS,
		...SUPPORTED_RESIZE_IMAGES_EXTENSIONS,
	]),
];
