import Job from "../models/Job.js";
import Request from "../models/Request.js";

export default class JobRepository {
  constructor() {
    this.jobs = this.loadJobs();
  }

  loadJobs() {
    const jobsData = localStorage.getItem("jobs");
    return jobsData
      ? JSON.parse(jobsData).map(
          (job) =>
            new Job(
              job.name,
              job.id,
              new Request(
                job.request.method,
                job.request.url,
                job.request.headers,
                job.request.body,
                job.request.executionTime
              ),
              job.favorite
            )
        )
      : [];
  }

  saveJobs() {
    localStorage.setItem("jobs", JSON.stringify(this.jobs));
  }

  getAllJobs() {
    return this.jobs;
  }

  // Save jobs to localStorage whenever a new job is added
  createJob(job) {
    this.jobs.push(job);
    this.saveJobs();
  }
}

export const jobRepositoryInstance = new JobRepository();
