angular.module("fcc-voting").controller("indexCtrl", ["$scope", "$state", 
    function ($scope, $state) {
        Accounts.onLogin(function () {
            $state.go($state.current, {}, {reload: true});
        });
        Accounts.onLogout(function () {
            $state.go($state.current, {}, {reload: true});
        });
        
}]);