interface ModeOfUseModel {
	version: string,
	selectedMode: string;
	modes: any[];
}

interface SettingModel {
	values: string;
	activeValue: number;
}

interface SettingsDictionnary {
	name: string;
	element: string;
}
