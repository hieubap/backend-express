function isEmpty(variable) {
	if (variable === []) return true;
	if (variable === {}) return true;
	if (typeof variable === 'string') variable.trim();
	return !variable;
}

module.exports = {
	isEmpty,
};
