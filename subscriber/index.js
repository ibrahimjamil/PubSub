// listen.js
require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const sqs = new AWS.SQS();

const receiveMessage = async () => {
  const queueUrl = process.env.SQS_URL;
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10,
  };

  try {
    while (true) {
      const result = await sqs.receiveMessage(params).promise();
      if (result.Messages && result.Messages.length > 0) {
        console.log("Received message:", result.Messages[0].Body);

        // Delete the message after processing
        const deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: result.Messages[0].ReceiptHandle,
        };
        await sqs.deleteMessage(deleteParams).promise();
      } else {
        console.log("No messages received, waiting...");
      }
    }
  } catch (err) {
    console.error("Error receiving message:", err);
  }
};

receiveMessage();
