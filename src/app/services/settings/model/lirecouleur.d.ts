/**
 * Globals fournis par les scripts LireCouleur (bundle toolbar, voir build/terser.js).
 */
declare class JsonProfile {
	static from(obj: Record<string, unknown>): JsonProfile;
	asUserProfile(): UserProfile;
	stringify(): string;

	name: string;
	description?: string;
	params?: object;
	format?: object;
	process?: ProcessStep[];

}

	declare type LcFunctionName =
		| 'defaut'
		| 'lettres'
		| 'phonemes'
		| 'syllabes'
		| 'syllarc'
		| 'alternphonemes'
		| 'alternlettres'
		| 'alternsyllabes'
		| 'alternmots'
		| 'alternlignes'
		| 'reglelecture'
		| 'lecteur';

	declare class ProcessStep {
		function: LcFunctionName;
		params: [];
		format: ProcessFormatRule[] ;
	}


	declare class ProcessFormatRule {
		color?: string;
		phonemes?: string[];
		phonetics?: string;
		example?: string | string[];
}

declare class UserProfile {
	style: string;
	toHTML(text: string, elt: HTMLElement): string;
	postProcessHTML(elt: HTMLElement): void;
}
