/* constants */
import { INPUT_FILES_PATH } from "@/constants";

/* utils */
import { readDirAsync } from "@/utils/extras";

// ==============================

/**
 * @description A function to get all pdf file names from a directory
 */
export async function getAllPdfFilesAsync(): Promise<string[]> {
	try {
		const files = await readDirAsync(INPUT_FILES_PATH);
		const pdfFiles = files.filter((file) => /\.pdf$/i.test(file));
		return pdfFiles;
	} catch (error) {
		throw new Error(`[error]: error during getting all pdf files: \n${error}`);
	}
}
