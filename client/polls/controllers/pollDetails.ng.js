angular.module("fcc-voting")

    .config(["ChartJsProvider", function (ChartJsProvider) {
        
        ChartJsProvider.setOptions({
            
            responsive: false
        });
        
    }])
    
    .controller("PollDetailsCtrl", ["$scope", "$stateParams", "$meteor", "$state",
    
        function ($scope, $stateParams, $meteor, $state) {
            
            if ($meteor.object(Polls, $stateParams.pollId)._id !== $stateParams.pollId) {
                window.alert("Wrong PollId provided.");
                $state.go("pollsList");
            }
            
            var poll = $meteor.object(Polls, $stateParams.pollId);
            $scope.pollTitle = poll.title;
            $scope.votedBy = poll.votedBy;
            $scope.chartLabels = Object.keys(poll.results);
            $scope.chartData = [];
            $scope.isPollOwner = (poll.owner === Meteor.userId());
            
            for (var i = 0; i < $scope.chartLabels.length; i++) {
                $scope.chartData.push(poll.results[$scope.chartLabels[i]]);
            }
            
            $scope.submitVote = function () {
                if ($scope.votefor) {
                    Meteor.call("voteFor", poll._id, $scope.votefor,function (error, result) {
                        
                        if (error || result === 0) {
                            window.alert(error);
                        } else {
                            window.alert("You've voted for" + $scope.votefor + ".");
                            $state.go($state.current, {}, {reload: true});
                        }
                    });
                } else {
                    window.alert("You must choose which option to vote for.");
                }
            };
            
            $scope.removePoll = function () {
                if (window.confirm("Are you sure to remove this poll?")) {
                    Meteor.call("removePoll", poll._id, function (error, result) {
                        if (error) {
                            window.alert(error);
                            $state.go($state.current, {}, {reload: true});
                        } else {
                            window.alert("Successfully removed the poll.");
                            $state.go("pollsList", {}, {reload: true});
                        }
                    });
                }
            };
            
    }]);