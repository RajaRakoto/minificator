import { restart } from "@/core/restart";

export function app(option: string): void {
	console.log(`${option} selected !`);
	restart();
}
