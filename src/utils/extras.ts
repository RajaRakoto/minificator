/* libs */
import * as emoji from "node-emoji";
import * as path from "path";
import open from "open";
import fs from "fs";
import { execa } from "execa";

/* constants */
import { DEVMODE } from "@/constants";

// ==============================

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
export function resolveRealPath(relativePath: string): string {
	const sourceIndex = fs.realpathSync(process.argv[1]);
	const realPath = path.join(path.dirname(sourceIndex), relativePath);
	return realPath;
}

/**
 * @description A function that opens a file using the default application
 * @param filePath The path of the file to open
 */
export async function defaultOpen(filePath: string): Promise<void> {
	try {
		const platform = process.platform;
		const realPath = DEVMODE ? filePath : resolveRealPath(filePath);
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
export function copyFile(source: string, target: string): void {
	const realSource = DEVMODE ? source : resolveRealPath(source);
	const targetDir = path.resolve(path.join(process.cwd(), target));

	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true });
	}

	const targetFile = path.join(targetDir, path.basename(source));
	fs.copyFileSync(realSource, targetFile);
}
