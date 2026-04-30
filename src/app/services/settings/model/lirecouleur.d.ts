/**
 * Globals fournis par les scripts LireCouleur (bundle toolbar, voir build/terser.js).
 */
declare class JsonProfile {
	static from(obj: Record<string, unknown>): JsonProfile;
	asUserProfile(): UserProfile;
	stringify(): string;
}

declare class UserProfile {
	style: string;
	toHTML(text: string, elt: HTMLElement): string;
	postProcessHTML(elt: HTMLElement): void;
}
