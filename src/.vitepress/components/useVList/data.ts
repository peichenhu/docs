export const dataList = new Array(10000).fill(1).map((_, i) => {
	return {
		id: i,
		height: Math.ceil(Math.random() * 300) + 30
	};
});
