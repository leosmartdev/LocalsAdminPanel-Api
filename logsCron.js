const cron = require('node-cron');
const dateFormat = require('date-format');
const { logsSchemaModel } = require("./models/logsModel");
const { userSchemaModel } = require("./models/userModel");

let logsTask;

const createCronJob = () => {
    // every day 23:59 register log - calculate statistics
    logsTask = cron.schedule('59 23 * * *', async function() {
        console.log('running a task every day 23:59', dateFormat('yyyy.MM.dd hh:mm:ss.SSS', new Date()));
        try {
            const active_user_num = await userSchemaModel.find({status: "active"}).count();
            const register_user_num = await userSchemaModel.count();
            const online_user_num = await userSchemaModel.find({online: true}).count();
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            if (await logsSchemaModel.findOne({year,month,day})) {
                console.log(`already logged: ${year}-${month}-${day}`);
                return;
            }
            const logsModel = logsSchemaModel({
                online_user_num: online_user_num,
                register_user_num: register_user_num,
                year: year,
                month: month,
                day: day
            });
            logsModel.save();
        } catch(err) {
            console.error(err.message);
        }
        
    });
};

const initCron = async () => {
  createCronJob();
};

const stopCron = async () => {
  await logsTask.stop();
};

module.exports = {
  initCron,
  stopCron
};