const { Client, ActivityType } = require("discord.js");

module.exports = {
    operating: false,
    instances: [],

    init: function (msg) {
        // new instance object
        const inst = {
            msg: null,
            member: null,
            value: null,
        }

        this.operating = true;
        inst.msg = msg;
        this.member = msg.member;
        this.instances.push(inst);

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
