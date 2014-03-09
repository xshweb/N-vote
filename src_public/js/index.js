var app = angular.module('app', ['infinite-scroll']);

app.controller('Imgs', ['$scope', '$http', function($scope, $http) {
  // $scope.imgs_data = _.shuffle(window.imgs_data);
  $scope.imgs_data = window.imgs_data;

  // post vote
  $scope.vote = function(id){
    $http.get('isVote').success(function(data, status) {
      if (data === 'true') {
        alert('你已投票');
      } else if (confirm("确定要投这张图片?")) {
        var ret = $http.post('vote', $.param({imgs_id: id}), {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, status){
          if (data === 'true') {
            alert('投票成功');
            location.reload(); // XXX
          } else {
            alert('投票失败');
          }
        });
      }
    });
  };

  $scope.vote_count = function(id){
  };

  // load picture to i-st wrap-box of images
  $scope.load = function(i){
    if (imgs_index < $scope.imgs_data.length) {
      var img = $scope.imgs_data[imgs_index++];
      $http.get('vote_count/'+img.id).success(function(data, status){
        img.vote_count = data;
        $scope.imgs[i].push(img);
      });
    }
  };

  var len = 3;
  $scope.imgs = new Array(len);
  for (var i=0; i < len; ++i) {
    $scope.imgs[i] = [];
    $scope.load(i);
    $scope.load(i);
  }
  $scope.loadMore = function(i){
    $scope.load(i);
  };
}]);

$(function(){
  $('.fancybox').fancybox();
});
