import { restartAsync } from "@/core/restart";

export function app(option: string): void {
	console.log(`${option} selected !`);
	restartAsync();
}
