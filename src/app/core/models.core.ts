interface ModeOfUseModel {
	version: string,
	selectedMode: string;
	modes: any[];
}

interface SettingModel {
	values: string;
	valueSelected: number;
	isTool?: boolean;
	order?: number;
}

interface SettingsDictionnary {
	name: string;
	element: string;
}
