angular.module("fcc-voting").controller("indexCtrl", ["$scope", "$state", 
    function ($scope, $state) {
        $scope.userId = Meteor.userId();
        Accounts.onLogin(function () {
            $scope.userId = Meteor.userId();
            $state.go($state.current, {}, {reload: true});
        });
        Accounts.onLogout(function () {
            $scope.userId = Meteor.userId();
            $state.go("pollsList", {}, {reload: true});
        });
}]);