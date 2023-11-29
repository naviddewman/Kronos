require('dotenv').config();

const messageChannelId = process.env.MESSAGE_ID;
let min;

const setMin = (minsLate) => { min = minsLate; }

const getLateMessages = () => {
    const lateMessages = [
        ` pull the pinky out, you are ${min}mins late`,
        ` it seems you have forgotten your agreement, ${min}mins late`,
        ` you are ${min}mins late.`,
        ` got his penis stuck in the vacuum again...`,
        ` is ${min}mins late, maybe they are having a shower?`,
        ` must be learning to walk, again... ${min}mins late.`,
        ` is probably stuck in a time warp, ${min}mins late.`,
        ` is trying to beat the world record for tardiness, currently at ${min}mins.`,
        ` may have fallen into a rabbit hole, ${min}mins and still falling.`,
        ` is playing hide and seek with time, ${min}mins late.`,
        ` might be giving a pep talk to their reflection, ${min}mins in.`,
        ` is on a secret mission, code-named 'Fashionably Late', now at ${min}mins.`,
        ` is ${min}mins late, probably took a detour through Narnia.`,
        ` is busy counting stars, hence the ${min}mins delay.`,
        ` is ${min}mins late, stuck in a slow-motion movie scene.`,
        ` is ${min}mins late, caught up in an epic dream battle.`,
        ` is practicing being a statue, ${min}mins late and frozen.`,
        ` might be stuck in a revolving door, ${min}mins and revolving.`,
        ` is ${min}mins late, busy solving the mystery of the missing sock.`,
        ` is trying to communicate with aliens, ${min}mins into the conversation.`,
        ` is on a spirit quest, ${min}mins into the other realm.`,
        ` is ${min}mins late, got caught in a spider web.`,
        ` is probably building a time machine, ${min}mins into the future.`,
        ` is busy arguing with Siri, ${min}mins and not winning.`,
        ` is ${min}mins late, might be stuck in an elevator... with music.`,
        ` is busy chasing rainbows, ${min}mins late to the pot of gold.`,
        ` is ${min}mins late, maybe they're a wizard in disguise.`,
        ` might be stuck on a loading screen, ${min}mins and buffering.`,
        ` is busy wrestling with their alarm clock, ${min}mins in the ring.`,
        ` is ${min}mins late, probably got sucked into a board game.`,
        ` is out there searching for Atlantis, ${min}mins into the expedition.`,
        ` is trying to out-stare a cat, ${min}mins into the staring contest.`,
        ` is ${min}mins late, caught in a parallel universe.`,
        ` is practicing teleportation, still hasn't nailed it after ${min}mins.`,
        ` is ${min}mins late, might have turned into a sloth.`,
        ` is on an undercover mission, code name 'Perpetually Late', ${min}mins in.`,
        ` is ${min}mins late, perhaps they're a time traveler stuck in the past.`,
        ` is learning to fly, ${min}mins late to take off.`,
        ` is stuck in a video game, ${min}mins and still not respawned.`,
        ` is on a quest for the Holy Grail of Punctuality, ${min}mins into the journey.`,
        ` is busy inventing a new excuse, ${min}mins into the brainstorm.`,
        ` is ${min}mins late, probably got tangled in their own yarn of stories.`,
        ` is exploring the Bermuda Triangle, ${min}mins into the mystery.`,
        ` is probably lost in the supermarket, ${min}mins in aisle 5.`,
        ` is ${min}mins late, might be stuck in a time loop... again.`,
    ];

    return lateMessages;
}

const sendMessage = (guild, arr, mention) => {
    const textChannel =  guild.channels.cache.get(messageChannelId);
    const msg = arr[Math.floor(Math.random() * arr.length)];
    textChannel.send(`${mention} ${msg}`);
}

module.exports = {
    promiseMessages: [
        "I've heard that one before. Let me know when you invent teleportation.",
        "I'll hold my breath until you arrive on time. Just kidding, I want to live.",
        "Tick, tock... tick, tock...",
        "Your punctuality is of utmost importance",
        "A timeley arrival might save you from the unkown...",
        "If you don't arrive on time, you better tread carefully. Your future hangs in the balance, and not all outcomes are favourable.",
    ],
    onTimeMessages: [
        ` Congratulations on discovering the concept of punctuality!`,
        ` Did you get lost on your way to being late and end up here on time by accident?`,
        ` Is on time, let's celebrate!`,
    ],

    sendLate: function (guild, mention, minsLate) {
        // update mins late
        setMin(minsLate);
        sendMessage(guild, getLateMessages(), mention);
    },

    sendOnTime: function (guild, mention) {
        sendMessage(guild, this.onTimeMessages, mention);
    },

    sendPromise: function () {
        const msg = this.promiseMessages[Math.floor(Math.random() * this.promiseMessages.length)];
        return msg;
    },

    sendFinal: function (guild, mention) {
        const textChannel = guild.channels.cache.get(messageChannelId);
        textChannel.send(`... alas it seems ${mention} has vanished.`);
    }
};