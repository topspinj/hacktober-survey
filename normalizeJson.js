function normalizeJson(json) {
	var normal = json;
	for(var obj in normal) {
		for(var range in normal[obj].age) {
			if(normal[obj].age[range] === '1') {
				normal[obj].age = range;
				break;
			}
		}
		normal[obj].programmingExperienceYears = normal[obj].programmingExperience.years;
		normal[obj].programmingExperienceMonths = normal[obj].programmingExperience.months;
		delete normal[obj].programmingExperience;
		normal[obj].id = parseInt(obj) + 1 + '';
	}
	normal = JSON.parse(JSON.stringify(normal, ["id", "city", "country", "favLanguage", "gender", "nativeLanguage", "age", "programmingExperienceYears", "programmingExperienceMonths"]));
	return normal;
}

module.exports = normalizeJson;