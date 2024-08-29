require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const sns = new AWS.SNS();

const publishMessage = async () => {
  const topicArn = process.env.SNS_TOPIC;
  const params = {
    Message: "Hello World",
    TopicArn: topicArn,
  };

  try {
    const result = await sns.publish(params).promise();
    console.log("MessageID:", result.MessageId);
  } catch (err) {
    console.error("Error publishing message:", err);
  }
};

setInterval(publishMessage, 30 * 1000);

publishMessage();
