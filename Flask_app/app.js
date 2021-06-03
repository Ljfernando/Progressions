
var app = angular.module("app", ['ngTable', 'ngRoute']);

app.config(function($routeProvider) {
    console.log($routeProvider)
    $routeProvider
    .when("/", {
        templateUrl : "views/main.html"
    })
    .when("/sim-by-song?:id", {
        templateUrl : "views/simBySong.html"
    })
    .when("/sim-by-prog?:chords", {
        templateUrl : "views/simByProg.html"
    })
    .when("/song?:id", {
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


    $scope.simSong = function(row_id){
        $location.path('/sim-by-song?songid='+row_id);
    }
    $scope.simChords = function(chords){
        $scope.chords = chords;
        $location.path('/sim-by-prog?chords='+chords);
    }
}]);

app.controller("SimSongCtrlr", ['$scope','$http','$location','NgTableParams', function ($scope,$http,$location,NgTableParams) {

    // console.log('chords', $scope.chords)
    // console.log('location', $location.$$path)
    var path ='http://localhost:5000' + $location.$$path
    console.log('path', path)    
    $scope.path = path
    $http.get(path)
        .then(function(response){
            console.log('in controller')
            console.log('response', response)
            data=response.data.dataset.slice(1,response.data.dataset.length - 1);
            $scope.song = response.data.dataset[0]
            
            $scope.simSongsTable = new NgTableParams({
            },{dataset : data})

            $scope.links = response.data.links
            console.log('links', $scope.links)
        }, function(response){
            console.log("error")
    })

    $scope.simSong = function(song){
        $location.path('/sim-by-song?songid='+song);
    }

}]);

app.controller("SimProgCtrlr", ['$scope','$http','$location','NgTableParams', function ($scope,$http,$location,NgTableParams) {

    // console.log('chords', $scope.chords)
    // console.log('location', $location.$$path)
    var path ='http://localhost:5000' + $location.$$path
    console.log('path', path)
    $scope.path = path
    chords = $location.$$path.slice(13,$location.$$path.length)
    if(chords.length > 50){
        $scope.chords = chords.slice(0,50) + " ..."
    }else{
        $scope.chords = chords
    }
    $http.get(path)
        .then(function(response){
            data=response.data.dataset;
            $scope.comp_key = response.data.comp_key
            $scope.simSongsTable = new NgTableParams({
            },{dataset : data})
        }, function(response){
            console.log("error")
    })

    $scope.simSong = function(song){
        $location.path('/sim-by-song?songid='+song);
    }
    $scope.simChords = function(chords){
        $scope.chords = chords;
        $location.path('/sim-by-prog?chords='+chords);
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