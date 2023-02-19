export interface ProjectListModel {
	curPage: number;
	datas: ProjectListModelDatas[];
	offset: number;
	over: boolean;
	pageCount: number;
	size: number;
	total: number;
}
export interface ProjectListModelDatasTags {
	name: string;
	url: string;
}
export interface ProjectListModelDatas {
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
	shareDate: number;
	shareUser: string;
	superChapterId: number;
	superChapterName: string;
	tags: ProjectListModelDatasTags[];
	title: string;
	type: number;
	userId: number;
	visible: number;
	zan: number;
}