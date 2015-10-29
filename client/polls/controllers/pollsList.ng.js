angular.module("fcc-voting").controller("PollsListCtrl", ["$scope", "$meteor", "$state",
    function ($scope, $meteor, $state) {
        $scope.polls = $meteor.collection(Polls);
        $scope.userId = Meteor.userId();
        $scope.showMyPollsOnly = $state.current.data.showMyPollsOnly;
}]);