Meteor.startup( function () {
    if (Polls.find().count() === 0) {
        var polls = [
                { id: "ciMc3oXug4Yyu3gvp"}
            
            ];
        for (var i = 0; i < polls.length; i++) {
            Polls.insert(polls[i]);
        }
    }
});