angular.module("fcc-voting")

    .config(["ChartJsProvider", function (ChartJsProvider) {
        
        ChartJsProvider.setOptions({
            
            responsive: false
        });
        
    }])
    
    .controller("PollDetailsCtrl", ["$scope", "$stateParams", "$meteor", "$location",
    
        function ($scope, $stateParams, $meteor, $location) {
            
            if ($meteor.object(Polls, $stateParams.pollId)._id !== $stateParams.pollId) {
                window.alert("Wrong PollId provided.");
                $location.url("/polls");
            }
            
            var poll = $meteor.object(Polls, $stateParams.pollId);
            $scope.pollTitle = poll.title;
            $scope.chartLabels = Object.keys(poll.results);
            $scope.chartData = [];
            for (var i = 0; i < $scope.chartLabels.length; i++) {
                $scope.chartData.push(poll.results[$scope.chartLabels[i]]);
            }
            
            $scope.submitVote = function () {
                if ($scope.votefor) {
                    Meteor.call("voteFor", poll._id, $scope.votefor,function (error, result) {
                        
                        if (error || result === 0) {
                            console.log( error );
                            console.log( result );
                            window.alert("Something went wrong while voting.");
                        } else {
                            window.alert("You've voted for" + $scope.votefor + ".");
                        }
                    });
                } else {
                    window.alert("You must choose which option to vote for.");
                }
            }
            
    }]);