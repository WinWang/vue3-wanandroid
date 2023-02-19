export interface SiteModel {
	articles: SiteModelArticles[];
	cid: number;
	name: string;
}
export interface SiteModelArticles {
	adminAdd: boolean;
	apkLink: string;
	audit: number;
	author: string;
	canEdit: boolean;
	chapterId: number;
	chapterName: string;
	collect: boolean;
	courseId: number;
	desc: string;
	descMd: string;
	envelopePic: string;
	fresh: boolean;
	host: string;
	id: number;
	isAdminAdd: boolean;
	link: string;
	niceDate: string;
	niceShareDate: string;
	origin: string;
	prefix: string;
	projectLink: string;
	publishTime: number;
	realSuperChapterId: number;
	route: boolean;
	selfVisible: number;
	shareDate?: any;
	shareUser: string;
	superChapterId: number;
	superChapterName: string;
	tags: any[];
	title: string;
	type: number;
	userId: number;
	visible: number;
	zan: number;
}