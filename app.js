var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      });
    $urlRouterProvider.otherwise('home');

}]);

app.factory('posts',[function(){
  var o = {
    posts: [{title: 'post 1', upvotes: 5},
    ]
  };
  return o;
}]);

app.controller('MainCtrl', ['$scope','posts',
  function($scope,posts){
    $scope.posts = posts.posts;


    $scope.addPost = function(){
      $scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0});
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementupVote = function(post){
      post.upvotes += 1;
    };
}]);
