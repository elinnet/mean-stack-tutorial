var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/news');

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
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
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
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
      });

      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementupVote = function(post){
      console.log(123);
      post.upvotes += 1;
    };
}]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){

    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){

      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };

  }]);
