Polls.allow({
    insert: function (userId, poll) {
        return false;
    },
    update: function (userId, poll, fields, modifier) {
        return false;
    },
    remove: function (userId, poll) {
        return false;
    }
});


Meteor.methods({
    addNewPoll: function (title, options) {
        var spaceOnly = /^\s*$/g;
        if (spaceOnly.test(title) === false &&
            Array.isArray(options) &&
            options.length >= 2) {
            var pendingPoll = {};
            pendingPoll.owner = Meteor.userId();
            pendingPoll.title = title;
            pendingPoll.results = {};
            for (var i = 0; i < options.length; i++) {
                pendingPoll.results[options[i]] = 0;
            }
            console.log("New poll added: ");
            console.log(pendingPoll);
            return Polls.insert(pendingPoll);
        } else {
            throw new Meteor.Error(400,"Bad Request");
        }
    }
});