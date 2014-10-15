beforeEach(function() {
	module('app');
});

describe('BookSearch Service', function() {

	var search, $httpBackend;
	beforeEach(inject(function($injector) {
		search = $injector.get("BookSearch");
		$httpBackend = $injector.get("$httpBackend");
		$httpBackend
			.when("GET", "https://www.googleapis.com/books/v1/volumes?q=Blue&maxResults=10")
			.respond({
				items: "pass"
			});
		$httpBackend
			.when("GET", "https://www.googleapis.com/books/v1/volumes?q=Green&maxResults=10")
			.respond(400, {
				items: "fail"
			});
	}));

	it("should have default last search", function() {
		expect(search.lastSearch.length).toBe(0);
	});

	it("should fetch book information", function(done) {
		search.searchByKeyword("Blue").then(function() {
			expect(search.lastSearch).toBe("pass");
			done();
		}, function() {
			expect(true).toBe(false);
			done();
		});
		$httpBackend.flush();
	});

	it("should not modify last search when failing", function(done) {
		search.searchByKeyword("Green").then(function() {
			expect(true).toBe(false);
			done();
		}, function() {
			expect(search.lastSearch.length).toBe(0);
			done();
		});
		$httpBackend.flush();
	});
});

describe('BookSearch Controller', function() {

	var scope, search;
	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		search = $injector.get("BookSearch");
		scope = $rootScope.$new();
		$controller = $injector.get('$controller');
		$controller("SearchScreen", {
			'$scope': scope
		});

		$httpBackend = $injector.get("$httpBackend");
		$httpBackend
			.when("GET", "https://www.googleapis.com/books/v1/volumes?q=Blue&maxResults=10")
			.respond({
				items: "pass"
			});
	}));

	it("should have default values", function(){
		expect(scope.title).toBe("Search App");
		expect(scope.searchKeyword).toBe("");
		expect(scope.searchResults.length).toBe(0);
	});

	it("should pass the keyword into the book search service", function(){
		spyOn(search, "searchByKeyword").and.returnValue({then: function(){}});
		scope.searchKeyword = "input";
		scope.onSubmit();
		expect(search.searchByKeyword).toHaveBeenCalledWith("input");
	});

	it("should correctly populate the response from the book search service", function(){
		scope.searchKeyword = "Blue";
		scope.onSubmit();
		$httpBackend.flush();
		expect(scope.searchResults).toBe("pass");
	});
});





