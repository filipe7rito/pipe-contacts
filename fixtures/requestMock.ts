const request = function() {
	return Promise.resolve({
		data: { name: 'dummyData', from: 'automation-workflow' },
	});
};

export default request;
