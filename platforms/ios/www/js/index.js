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

 /*
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        $("input").change(function(){
            $.get("https://www.googleapis.com/books/v1/volumes?q=" + $("input").val() + "&maxResults=10", function(response){
                $("ul").html(" ");
                for(var i in response.items){
                    var item = response.items[i];
                    $("ul").append("<li class='topcoat-list__item'>" + item.volumeInfo.title + "</li>");
                }
            });
        });
    }
};
*/