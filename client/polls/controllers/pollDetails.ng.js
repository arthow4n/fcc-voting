angular.module("fcc-voting")
    
    .controller("PollDetailsCtrl", ["$scope", "$stateParams", "$meteor", "$state",
    
        function ($scope, $stateParams, $meteor, $state) {
            
            if ($meteor.object(Polls, $stateParams.pollId)._id !== $stateParams.pollId) {
                window.alert("Wrong PollId provided.");
                $state.go("pollsList");
            }
            
            var poll = $meteor.object(Polls, $stateParams.pollId);
            $scope.pollTitle = poll.title;
            $scope.chartLabels = Object.keys(poll.results);
            $scope.chartData = [];
            $scope.isPollOwner = (poll.owner === Meteor.userId());
            $scope.userId = Meteor.userId();
            for (var i = 0; i < $scope.chartLabels.length; i++) {
                $scope.chartData.push(poll.results[$scope.chartLabels[i]]);
            }
            
            $scope.submitVote = function () {
                var votefor = "";
                if ($scope.votefor && $scope.votefor !== "===custom-option") {
                    votefor = $scope.votefor;
                } else if ($scope.votefor === "===custom-option" && $scope.voteforCustom) {
                    votefor = $scope.voteforCustom;
                }
                
                if (votefor) {
                    Meteor.call("voteFor", poll._id, votefor,function (error, result) {
                        if (error || result === 0) {
                            window.alert(error);
                        } else {
                            window.alert("You've voted for" + votefor + ".");
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