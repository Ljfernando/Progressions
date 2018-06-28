
var app = angular.module("app", ['ngTable', 'ngRoute']);

app.config(function($routeProvider) {
    console.log($routeProvider)
    $routeProvider
    .when("/", {
        templateUrl : "views/main.html"
    })
    .when("/similar-songs/:id", {
        templateUrl : "views/similarity.html"
    })
    .when("/song/:id", {
        templateUrl : "views/song.html"
    })

    .otherwise({
        templateUrl : "views/main.html"
    });
});



app.controller("MainController", ['$scope','$http','$location','NgTableParams', function ($scope,$http,$location,NgTableParams) {

    var path= 'http://localhost:5000/';
    var data;
    $http.get(path)
        .then(function(response){
            data=response.data;
            console.log(data)
            $scope.songsTable = new NgTableParams({

            },{dataset : data})
        },function(response){
            console.log("Error")
        })


    $scope.simClick = function(row_id){
        $location.path('/similar-songs/'+row_id);
    }
}]);

app.controller("SimController", ['$scope','$http','$location','NgTableParams', function ($scope,$http,$location,NgTableParams) {

    // console.log('location', $location.$$path)
    var path ='http://localhost:5000' + $location.$$path
    $scope.path = path
    console.log('path',path)
    $http.get(path)
        .then(function(response){
            data=response.data;

            $scope.song = data[0]
            $scope.simSongsTable = new NgTableParams({
            },{dataset : data})
        }, function(response){
            console.log("error")
    })

    $scope.simClick = function(row_id){
    $location.path('/similar-songs/'+row_id);
    }

}]);

app.controller("SongController", ['$scope','$http','$location','NgTableParams', function ($scope,$http,$location,NgTableParams) {

    // console.log('location', $location.$$path)
    var path ='http://localhost:5000' + $location.$$path
    $scope.path = path
    console.log('path',path)
    $http.get(path)
        .then(function(response){
            data=response.data;

            $scope.song = data[0]
            $scope.simSongsTable = new NgTableParams({
            },{dataset : data})
        }, function(response){
            console.log("error")
    })
}]);