angular.module("fcc-voting").controller("PollsListCtrl", ["$scope", "$meteor", 
    function ($scope, $meteor) {
        $scope.polls = $meteor.collection(Polls);
        
        
}]);