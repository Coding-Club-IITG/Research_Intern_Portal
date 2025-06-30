import cron from "node-cron";
import axios from "axios";
import Jobs from "./models/jobs.js";
import recruiter from "./models/recruiter.js";
import logger from "../utils/logger.js";

export default function jobExpiryNotifier() {
  logger.info("jobExpiryNotifier started");

  // Runs every 24 hours
  cron.schedule("0 0 * * *", async () => {
    logger.info("Checking for jobs expiring within 24 hours...");

    const now = new Date();
    const after24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    try {
      const expiringJobs = await Jobs.find({
        accepting: true,
        last_date: {
          $gte: now,
          $lte: after24hrs,
        },
      });

      for (const job of expiringJobs) {
        const recruiter_data = await recruiter.findById(job.recruiter);
        const notificationResponse = await axios.post(
          `${process.env.NOTIFICATION_URL}/create-students`,
          {
            title: `Internship is closing soon!`,
            message: `Applications for "${job.title}" by ${recruiter_data.name} will close within 24 hours.\nClick on "View More" to know more about the internship.`,
            link: `/student/internships/internship/${job._id}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        logger.info(
          "Notification sent successfully:",
          notificationResponse.data
        );
      }
    } catch (err) {
      logger.error(
        "jobExpiryNotifier error:",
        err?.response?.data || err.message
      );
    }
  });
}
