export interface SystemModel {
	articleList: any[];
	author: string;
	children: SystemModelChildren[];
	courseId: number;
	cover: string;
	desc: string;
	id: number;
	lisense: string;
	lisenseLink: string;
	name: string;
	order: number;
	parentChapterId: number;
	type: number;
	userControlSetTop: boolean;
	visible: number;
}
export interface SystemModelChildren {
	articleList: any[];
	author: string;
	children: any[];
	courseId: number;
	cover: string;
	desc: string;
	id: number;
	lisense: string;
	lisenseLink: string;
	name: string;
	order: number;
	parentChapterId: number;
	type: number;
	userControlSetTop: boolean;
	visible: number;
}