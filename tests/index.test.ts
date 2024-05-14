/* utils */
import {
	sharpTestAsync,
	svgGoTestAsync,
	getAllImageFilesAsync,
} from "@/utils/images";
import { createDirectoryAsync } from "@/utils/extras";

/* constants */
import { OUTPUT_RESIZE_IMAGES_PATH, OUTPUT_MIN_IMAGES_PATH } from "@/constants";

// ==============================

async function test() {
	try {
		// create output directory
		await createDirectoryAsync(OUTPUT_MIN_IMAGES_PATH);
		await createDirectoryAsync(OUTPUT_RESIZE_IMAGES_PATH);

		// test JPEG, PNG, WEBP sharp compression
		const qualityValue = 70;

		await sharpTestAsync("test.jpg", qualityValue, "jpeg");
		await sharpTestAsync("test.png", qualityValue, "png");
		await sharpTestAsync("test.webp", qualityValue, "webp");

		// test SVGgo compression
		await svgGoTestAsync();

		// test getting all image files by extension
		await getAllImageFilesAsync([
			"jpg",
			"jpeg",
			"png",
			"webp",
			"gif",
			"svg",
		]).then((files) => {
			console.log(files);
		});
	} catch (error) {
		throw new Error(`[error]: error during tests: \n${error}`);
	}
}

test();
