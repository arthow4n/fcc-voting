Polls = new Mongo.Collection("polls");

Polls.allow({
    insert: function (userId, poll) {
        return userId && poll.owner === userId;
    },
    update: function (userId, poll, fields, modifier) {
        return userId && poll.owner === userId;
    },
    remove: function (userId, poll) {
        return userId && poll.owner === userId;
    }
});