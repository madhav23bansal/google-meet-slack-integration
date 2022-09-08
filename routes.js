const routes = require("express").Router();
const axios = require("axios");
// const fs = require("fs");
const botToken = process.env.BOT_TOKEN;

routes.get("/", (req, res) => {
  res.status(200).send("Working");
});

routes.post("/create", async (req, res) => {
  // console.log(req.body.channel_id);
  const slackResponse = await axios.get(
    "https://slack.com/api/conversations.members?channel=" +
      req.body.channel_id,
    {
      headers: { authorization: `Bearer ${botToken}` },
    }
  );

  const groupMembers = slackResponse.data.members;
  const groupMembersInfo = [];

  for (let i = 0; i < groupMembers.length; i++) {
    try {
      const response = await axios.get(
        "https://slack.com/api/users.info?user=" + groupMembers[i],
        {
          headers: { authorization: `Bearer ${botToken}` },
        }
      );
      groupMembersInfo.push(response.data.user.profile.email);
    } catch (err) {
      console.log(err);
      res.json({
        text: "Sorry some error occured, please contact admin",
      });
    }
  }

  console.log(groupMembersInfo);

  res.json({
    text: "Working",
  });
});

module.exports = routes;
