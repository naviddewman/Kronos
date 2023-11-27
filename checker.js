const { Client, ActivityType } = require("discord.js");
const OpenAI = require('openai');

const openai = new OpenAI({apiKey: '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'});
async function interpret(msgContent, msgTime) {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You only reply a time HH:MM based on when the user will arrive from the given message." },
        { role: "user", content: 'message: ' + msgContent + ' ' + 'sent at: ' + msgTime },
    ],
      model: "gpt-3.5-turbo",
    });
  
    return (response.choices[0]);
}

module.exports = {
    operating: false,
    instances: [],

    init: async function (msg) {
        // new instance object
        const inst = {
            msg: null,
            member: null,
            time: null,
        }

        this.operating = true;
        inst.msg = msg;
        this.member = msg.member;
        this.instances.push(inst);

        const response = await interpret(msg.content, msg.createdAt);
        console.log(response);

        msg.reply('We will see about that.');

        // get time in message

        console.log('initialised checker');

        // set bot status and custom activity
        msg.client.user.setStatus('online');
        msg.client.user.setActivity('Operating', { type: ActivityType.Custom });
    },

    run: function () {
        if (this.operating) {
            console.log(`OPERATING ON ${this.instances.length} INSTANCES.`);
        }
    }
};


