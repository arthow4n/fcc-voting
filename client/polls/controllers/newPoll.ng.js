angular.module("fcc-voting").controller("NewPollCtrl", ["$scope", "$meteor", "$location", 
    function ($scope, $meteor, $location) {
        $scope.polls = $meteor.collection(Polls);
        $scope.newPollTitle = "";
        $scope.newPollOptions = [];
        
        $scope.addNewPoll = function () {
            if ($scope.newPollTitle !== "" && $scope.newPollOptions.length >= 2) {
                Meteor.call("addNewPoll", $scope.newPollTitle, $scope.newPollOptions, function (error, result) {
                    console.log("addNewPoll");
                    if (error) {
                        window.alert("Something went wrong!" + error);
                    } else {
                        console.log("addNewPollSuccess");
                        $scope.newPollTitle = "";
                        $scope.newPollOptions = [];
                        $location.url("/polls/" + result);
                        $scope.$apply();
                    }
                });
            } else {
                if ($scope.newPollTitle === "") {
                    window.alert("Your poll needs a title!");
                }
                if ($scope.newPollOptions.length < 2) {
                    window.alert("You need 2 or more options to make a poll!");
                }
            }
        }
}]);