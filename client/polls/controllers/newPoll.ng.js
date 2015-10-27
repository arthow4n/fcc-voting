angular.module("fcc-voting").controller("NewPollCtrl", ["$scope", "$meteor", 
    function ($scope, $meteor) {
        $scope.polls = $meteor.collection(Polls);
        $scope.userId = Meteor.userId();
        
}]);