const {inflection} = require("../../src/countdown.js");

describe("Inflection unit tests", function () {
	it("inflection of year", function() {
		expect(inflection(1, "years", "en")).to.eq("year")
	});
	
	it("inflection of minutes", function() {
		expect(inflection(4, "minutes", "cs")).to.eq("minuty")
	});
	
	it("inflection of days", function() {
		expect(inflection(23, "days", "sk")).to.eq("dní")
	});
});
