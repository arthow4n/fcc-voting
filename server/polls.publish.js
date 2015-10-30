Meteor.publish("polls", function (id) {
    if (id) {
        return Polls.find({_id: id});
    } else {
        return Polls.find({});
    }
});