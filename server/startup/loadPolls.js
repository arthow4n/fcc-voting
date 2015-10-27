Meteor.startup( function () {
    if (Polls.find().count() === 0) {
        var polls = [
                { owner: "ciMc3oXug4Yyu3gvp",
                    title: "What OS do you use?",
                    results: { "Windows": 10,
                                "Linux": 25,
                                "OSX": 8}
                },
                { owner: "ciMc3oXug4Yyu3gvp",
                    title: "What DE do you use?",
                    results: { "KDE": 20,
                                "Xfce": 20,
                                "Cinnamon": 8}
                }
            ];
        for (var i = 0; i < polls.length; i++) {
            Polls.insert(polls[i]);
        }
    }
});