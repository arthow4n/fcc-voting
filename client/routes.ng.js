angular.module("fcc-voting").config(
    function ($urlRouterProvider, $stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    
    $stateProvider
        .state("pollsList", {
            url: "/polls",
            templateUrl: "client/polls/views/polls-list.ng.html",
            controller: "PollsListCtrl"
        })
        .state("pollDetails", {
            url: "/polls/:pollId",
            templateUrl: "client/polls/views/poll-details.ng.html",
            controller: "PollDetailsCtrl"
        });
        
    $urlRouterProvider.otherwise("/polls");
    
});