Meteor.publish("polls", function () {
   return Polls.find({});
});