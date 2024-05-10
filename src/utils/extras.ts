/* libs */
import * as emoji from "node-emoji";
import * as path from "path";
import sharp from "sharp";
import open from "open";
import util from "util";
import fs from "fs";
import { execa } from "execa";

/* constants */
import { DEVMODE, INPUT_IMAGES_PATH, OUTPUT_IMAGES_PATH } from "@/constants";

/* types */
import { T_ImageExtension, T_SharpExtension } from "@/@types";

// ==============================

export const writeFileAsync = util.promisify(fs.writeFile);
export const fileExistsAsync = util.promisify(fs.exists);
export const readFileAsync = util.promisify(fs.readFile);
export const readDirAsync = util.promisify(fs.readdir);
export const realPathAsync = util.promisify(fs.realpath);
export const mkdirAsync = util.promisify(fs.mkdir);

/**
 * @description A function that exits the CLI
 */
export function exitCLI(): void {
	console.log(`See you soon ${emoji.get("blush")} !`);
	process.exit();
}

/**
 * @description A function that resolves the real path of a file
 * @param relativePath The relative path of the file
 * @returns The real path of the file
 */
export async function resolveRealPath(relativePath: string): Promise<string> {
	try {
		const sourceIndex = await realPathAsync(process.argv[1]);
		const realPath = path.join(path.dirname(sourceIndex), relativePath);
		return realPath;
	} catch (error) {
		throw new Error(`[error]: error during resolving real path: \n${error}`);
	}
}

/**
 * @description A function that opens a file using the default application
 * @param filePath The path of the file to open
 */
export async function defaultOpen(filePath: string): Promise<void> {
	try {
		const platform = process.platform;
		const realPath = DEVMODE ? filePath : await resolveRealPath(filePath);
		let execCMD: string = "";

		switch (platform) {
			case "win32":
				execCMD = "start";
				break;
			case "darwin":
				execCMD = "open";
				break;
			case "linux":
			case "freebsd":
			case "openbsd":
			case "sunos":
				execCMD = "xdg-open";
				break;
			default:
				throw new Error("[error]: unsupported os");
		}

		execCMD === "start"
			? await open(realPath)
			: await execa(execCMD, [realPath]);
	} catch (error) {
		throw new Error(`[error]: error during opening: \n${error}`);
	}
}

/**
 * @description A function to copy a file from source to target
 * @param source The source file
 * @param target The target file
 */
export async function copyFile(source: string, target: string): Promise<void> {
	try {
		const realSource = DEVMODE ? source : await resolveRealPath(source);
		const targetDir = path.resolve(path.join(process.cwd(), target));

		if (!fs.existsSync(targetDir)) {
			await mkdirAsync(targetDir, { recursive: true });
		}

		const targetFile = path.join(targetDir, path.basename(source));
		fs.copyFileSync(realSource, targetFile);
	} catch (error) {
		throw new Error(`[error]: error during copying file: \n${error}`);
	}
}

/**
 * @description A function to get image file names with a specific extension from a directory
 * @param extension The desired file extension (e.g: "jpg", "jpeg", "png", "webp", "gif", "svg")
 */
export async function getImageFilesByExtension(
	extension: T_ImageExtension,
): Promise<string[]> {
	try {
		const files = await readDirAsync(INPUT_IMAGES_PATH);
		const imageFiles = files.filter((file) =>
			new RegExp(`\\.${extension}$`, "i").test(file),
		);
		return imageFiles;
	} catch (error) {
		throw new Error(`[error]: error during getting image files: \n${error}`);
	}
}

/**
 * @description A function to test sharp image minification
 */
export function sharpTest(
	file: string,
	qualityValue: number,
	extension: T_SharpExtension,
): void {
	const input = `${INPUT_IMAGES_PATH}/${file}`;
	const output = `${OUTPUT_IMAGES_PATH}/${file}`;

	if (extension === "jpeg" || extension === "jpg") {
		sharp(input)
			.jpeg({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: JPEG -> sharp test failed: \n${error}`);
				} else {
					console.log("JPEG -> sharp test successful !");
				}
			});
	}
	if (extension === "png") {
		sharp(input)
			.png({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: PNG -> sharp test failed: \n${error}`);
				} else {
					console.log("PNG -> sharp test successful !");
				}
			});
	}
	if (extension === "webp") {
		sharp(input)
			.webp({ quality: qualityValue })
			.toFile(output, (error) => {
				if (error) {
					throw new Error(`[error]: WEBP -> sharp test failed: \n${error}`);
				} else {
					console.log("WEBP -> sharp test successful !");
				}
			});
	}
}
