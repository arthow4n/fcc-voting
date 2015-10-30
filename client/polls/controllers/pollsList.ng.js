angular.module("fcc-voting").controller("PollsListCtrl", ["$scope", "$meteor", "$state",
    function ($scope, $meteor, $state) {
        $scope.userId = Meteor.userId();
        $scope.showMyPollsOnly = $state.current.data.showMyPollsOnly;
        $scope.dataLoaded = false;
        $meteor.subscribe("polls", false).then(function (subscriptionHandle) {
            $scope.polls = $meteor.collection(Polls); 
            $scope.dataLoaded = true;
        });
}]);