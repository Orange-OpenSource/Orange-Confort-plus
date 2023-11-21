interface iconsService {
	locale?: string;
	getMessage(message: string): string;
	translate(root: ShadowRoot): void;
}
