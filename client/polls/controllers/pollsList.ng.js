angular.module("fcc-voting").controller("PollsListCtrl", ["$scope", "$meteor", "$state",
    function ($scope, $meteor, $state) {
        $scope.userId = Meteor.userId();
        $scope.showMyPollsOnly = $state.current.data.showMyPollsOnly;
        if ($scope.showMyPollsOnly) {
            document.title = "My Polls | fcc-voting";
        } else {
            document.title = "All Polls | fcc-voting";
        }
        $scope.dataLoaded = false;
        $meteor.subscribe("polls", false).then(function (subscriptionHandle) {
            $scope.polls = $meteor.collection(Polls); 
            $scope.dataLoaded = true;
        });
}]);