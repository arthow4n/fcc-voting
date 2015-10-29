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
            return Polls.insert(pendingPoll);
        } else {
            throw new Meteor.Error(400,"Bad Request");
        }
    },
    
    voteFor: function (pollId, option) {
        var clientIp = (this.connection.httpHeaders["x-forwarded-for"]).split(",")[0];
        var poll = Polls.findOne(pollId);
        var userHaveNotVoted = Meteor.userId() && poll.votedBy.indexOf(Meteor.userId()) === -1;
        console.log(poll.votedBy.indexOf(Meteor.userId()));
        var IpHaveNotVoted = poll.votedBy.indexOf(clientIp) === -1;
        var inc = {};
        inc["results."+option] = 1;
        
        if (spaceOnly.test(option) === false) {
            var whoVoting = [];
            if (userHaveNotVoted && Meteor.userId()) {
                whoVoting.push(Meteor.userId());
            }
            if (IpHaveNotVoted) {
                whoVoting.push(clientIp);
            }
            if (userHaveNotVoted || IpHaveNotVoted) {
                return Polls.update(pollId, {
                    $inc: inc,
                    $push: {votedBy: { $each: whoVoting }}
                });
            } else {
                throw new Meteor.Error("user-or-ip-voted","You can only vote once a poll.");
            }
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