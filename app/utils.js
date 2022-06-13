function isEmpty(variable) {
	if (typeof variable === 'string') variable.trim();
	if ([null, undefined, {}, [], ''].includes(variable)) return true;
	if (variable?.length === 0) return true;
	if (typeof variable === 'object' && Object.keys(variable)?.length === 0) {
		return true;
	}
	return false;
}
function isUpdateHasNoEffect(result) {
	return result[0] === 0;
}
module.exports = {
	isEmpty,
	isUpdateHasNoEffect,
};
