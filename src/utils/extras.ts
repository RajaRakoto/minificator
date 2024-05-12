/* libs */
import * as emoji from "node-emoji";
import * as path from "path";
import open from "open";
import util from "util";
import fs from "fs";
import { execa } from "execa";

/* constants */
import { DEVMODE } from "@/constants";

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
 * @description This function creates the directory as argument from the current directory
 * @param directory The directory to create
 */
export async function createDirectory(directory: string): Promise<void> {
	try {
		const realDirectory = DEVMODE
			? directory
			: await resolveRealPath(directory);
		const targetDir = path.resolve(path.join(process.cwd(), realDirectory));

		if (!fs.existsSync(targetDir)) {
			await mkdirAsync(targetDir, { recursive: true });
		}
	} catch (error) {
		throw new Error(`[error]: error during creating directory: \n${error}`);
	}
}
