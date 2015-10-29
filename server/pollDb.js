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


var spaceOnly = /^\s*$/g;
Meteor.methods({
    
    addNewPoll: function (title, options) {
        if (spaceOnly.test(title) === false &&
            Array.isArray(options) &&
            options.length >= 2) {
            var pendingPoll = {};
            pendingPoll.owner = Meteor.userId();
            pendingPoll.title = title;
            pendingPoll.results = {};
            pendingPoll.votedBy = [];
            for (var i = 0; i < options.length; i++) {
                pendingPoll.results[options[i]] = 0;
            }
            console.log("New poll added: ");
            console.log(pendingPoll);
            return Polls.insert(pendingPoll);
        } else {
            throw new Meteor.Error(400,"Bad Request");
        }
    },
    
    voteFor: function (pollId, option) {
        var inc = {};
        inc["results."+option] = 1;
        console.log(inc);
        
        if (spaceOnly.test(option) === false) {
            return Polls.update(pollId, {
                $inc: inc,
                $push: {votedBy: Meteor.userId()}
            });
        } else {
            throw new Meteor.Error(400,"Bad Request");
        }
    },
    
    removePoll: function (pollId) {
        var poll = Polls.findOne(pollId);
        if (poll.owner === Meteor.userId()) {
            Polls.remove(poll);
        } else {
            throw new Meteor.Error(400, "Bad Request");
        }
    }
});