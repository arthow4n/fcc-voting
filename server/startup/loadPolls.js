Meteor.startup( function () {
    if (Polls.find().count() === 0) {
        var polls = [
                { owner: "ciMc3oXug4Yyu3gvp",
                    title: "What OS do you use?",
                    results: { "Windows": 10,
                                "Linux": 25,
                                "OSX": 8},
                    votedBy: []
                },
                { owner: "ciMc3oXug4Yyu3gvp",
                    title: "What DE do you use?",
                    results: { "KDE": 20,
                                "Xfce": 20,
                                "Cinnamon": 8},
                    votedBy: ["ciMc3oXug4Yyu3gvp"]
                },
                { owner: "BLAH!",
                    title: "??",
                    results: { "123": 2,
                                "456": 2,
                                "789": 5},
                    votedBy: []
                },
                { owner: "BLAH!",
                    title: "??",
                    results: { 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10
                    },
                    votedBy: []
                }
            ];
        for (var i = 0; i < polls.length; i++) {
            Polls.insert(polls[i]);
        }
    }
});