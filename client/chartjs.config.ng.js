angular.module("fcc-voting")
    .config(["ChartJsProvider", function (ChartJsProvider) {
        
        ChartJsProvider.setOptions({
            
            responsive: true
        });
        
}]);