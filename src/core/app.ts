import { restart } from './restart';

export function app(option: string): void {
  console.log(`${option} selected !`);
  restart();
}
