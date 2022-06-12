function isEmpty(variable) {
	if (typeof variable === 'string') variable.trim();
	if ([null, undefined, {}, [], ''].includes(variable)) return true;
	if (variable?.length === 0) return true;
	if (typeof variable === 'object' && Object.keys(variable)?.length === 0) {
		return true;
	}
	return false;
}

module.exports = {
	isEmpty,
};
