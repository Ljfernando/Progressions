
var app = angular.module("app", ['ngTable']);
app.controller("MainController", ['$scope','$http','NgTableParams', function ($scope,$http,NgTableParams) {
    $scope.sections /*= [
        {
            title: "Advising Fellow Status",
            charts: []
        },
        {
            title: "High School Fellows",
            charts: []
        },
        {
            title: "HSF Demographic Information",
            charts: []
        }]*/;
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
    console.log(data)


}]);