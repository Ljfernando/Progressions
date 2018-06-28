
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
    .when("/song", {
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


    $scope.rowClick = function(row_id){
        $location.path('/similar-songs/'+row_id);
    }
}]);

app.controller("SimController", ['$scope','$http','$location','NgTableParams', function ($scope,$http,$location,NgTableParams) {

    // console.log('location', $location.$$path)
    var path ='http://localhost:5000' + $location.$$path
    console.log('path',path)
    $http.get(path)
        .then(function(response){
            console.log(response.data)
        }, function(response){
            console.log("error")
        })
    $scope.simSongsTable = new NgTableParams({},{
        dataset : [{id:0, Song:'Hello', Artist:'Adele'},
                    {id:1, Song:'Yesterday', Artist:'Beatles'}]
    })
    // var path= 'http://localhost:5000/';
    // var data;
    // $http.get(path)
    //     .then(function(response){
    //         data=response.data;
    //         console.log(data)
    //         $scope.songsTable = new NgTableParams({

    //         },{dataset : data})
    //     },function(response){
    //         console.log("Error")
    //     })


    // $scope.rowClick = function(row_id){
    //     $location.path('/similar-songs/'+row_id);
    // }
}]);