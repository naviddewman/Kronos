const { Events } = require('discord.js');
const checker = require('../checker.js');

module.exports = {
    name: Events.MessageReactionAdd,
    execute(reaction) {
	    if (reaction._emoji.name === '⏰') {
            checker.init(reaction.message);
        }
    },
};