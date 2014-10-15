var app = angular.module("app", []);

app.controller("SearchScreen", ["$scope", "BookSearch", function($scope, bookSearch){
    $scope.title = "Search App";
    $scope.searchKeyword = "";
    $scope.searchResults = [];

    $scope.onSubmit = function(){
        // do something with user input here
        bookSearch.searchByKeyword($scope.searchKeyword).then(function SearchScreenSuccess(){
            $scope.searchResults = bookSearch.lastSearch;
        }, function SearchScreenError(){
            alert("error");// bad practice
        });
    };
}]);

app.service("BookSearch", ["$http", "$q", function($http, $q){
    var myPrivateVar = "whatever";

    var BookSearch = {
        lastSearch: [],
        searchByKeyword: function(keyword){
            var d = $q.defer();
            var reqUrl = "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "&maxResults=10";
            $http({
                method: "GET",
                url: reqUrl
            }).success(function(response){
                BookSearch.lastSearch = response.items;
                d.resolve(response.items);
            }).error(function(err){
                d.reject(err);
            });
            return d.promise;
        }
    };
    return BookSearch;
}]);