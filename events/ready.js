const { Events, ActivityType } = require('discord.js');
const checker = require('../checker.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
	    console.log(`Ready! Logged in as ${client.user.tag}`);

        client.user.setStatus('idle');
        client.user.setActivity('Kyle', { type:  ActivityType.Watching});

        setInterval(() => {
            checker.run();
        }, 5000);
    },
};