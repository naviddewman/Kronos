const { Client, ActivityType } = require("discord.js");
const OpenAI = require('openai');

const openai = new OpenAI({apiKey: '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'});
async function interpret(msgContent, msgTime) {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You only reply a time HH:MM based on when the user will arrive from the given message. If it is not clear when a user will arrive, you reply '0000'. If a user message is a single number, assume that that is the time they will arrive" },
        { role: "user", content: 'message: ' + msgContent + ' ' + 'sent at: ' + msgTime },
    ],
      model: "gpt-3.5-turbo",
    });
  
    return (response.choices[0]);
}

// finction to get current time and convert to HH:MM format
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');      // Get hours and pad with leading zeros if needed
    const minutes = String(now.getMinutes()).padStart(2, '0');  // Get minutes and pad with leading zeros if needed
  
    return `${hours}:${minutes}`;
}

function compareTimeStrings(timeString1, timeString2) {
    if (timeString1 < timeString2) { return -1; } 
    else if (timeString1 > timeString2) { return 1; } 
    else { return 0; } // the times are equal
}

module.exports = {
    operating: false,
    instances: [],

    init: async function (msg) {
        const regex = /\b\d{2}:\d{2}\b/;

        // new instance object
        const inst = {
            msg: null,
            member: null,
            time: null,
            minLate: 0,
        }

        // interpret user's arrival via AI 
        const response = await interpret(msg.content, msg.createdAt);
        const match = response.message.content.match(regex);
        if (match) { 
            inst.time = match; 
            inst.msg = msg;
            inst.member = msg.member;
            this.operating = true;

            this.instances.push(inst);

            // get a dynamic reply
            msg.reply('We will see about that.');
            console.log('initialised checker');
    
            // set bot status and custom activity
            msg.client.user.setStatus('online');
            msg.client.user.setActivity('Operating', { type: ActivityType.Custom });
        }
        else {
            // throw error message
        }
    },

    run: function () {
        if (!this.instances.length) { this.operating = false; }
        if (this.operating) {
            const voiceId = '1060874466617471001';      // voice channel id
            const msgChannel = '1178443473037312131';   // message channel id
            // loop through all instances
            this.instances.forEach(inst => {
                const guild = inst.msg.guild;
                // const vc = guild.channels.resolve(voiceId);
                const memId = inst.member.id;

                // --> inst.member.voice.channelId

                // get member's unique roles
                let roleIds = inst.member.roles.cache.map((role) => role.id);
                roleIds = roleIds.filter((r) => r != '1060874466617470997');

                const comparison = compareTimeStrings(inst.time, getCurrentTime());
                // if (comparison === 0) {  // the time is here

                // }
                // else if (comparison < 0) {  // the times has past

                //}  
            });
        }
    }
};




