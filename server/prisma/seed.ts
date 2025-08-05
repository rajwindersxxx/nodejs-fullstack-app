import { prisma } from "../src/utils/prismaClient";
import { faker } from "@faker-js/faker";

// * run main script
async function main() {
  console.log("clear all data ");
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();
  console.log("seeding users...");
  const users: { email: string; password: string }[] = [];
  for (let i = 0; i <= 10; i++) {
    const user = {
      email: faker.internet.email(),
      password: "$2b$12$6neU6UMkKISM2q/mgCTF2.bp0XHzy0FXXCvLSmIuRg2rPIYp9MZ0W",
    };
    users.push(user);
  }
  const userData = await prisma.user.createManyAndReturn({
    data: users,
  });
  console.log("seeding jobs..... ");
  const jobs: {
    userId: number;
    title: string;
    location: string;
    company: string;
    description: string;
  }[] = [];
  for (let i = 0; i <= 20; i++) {
    const job = {
      userId: userData[Math.floor(Math.random() * userData.length)].id,
      title: faker.person.jobTitle(),
      location: faker.location.city(),
      company: faker.company.name(),
      description: faker.lorem.paragraphs({ min: 1, max: 3 }),
    };
    jobs.push(job);
  }
  const jobData = await prisma.job.createManyAndReturn({
    data: jobs,
  });

  console.log("seeding application data ....");

  const applications: {
    name: string;
    email: string;
    resumeUrl: string;
    jobId: number;
  }[] = [];
  for (const jobId of jobData) {
    const numApplications = faker.number.int({ min: 3, max: 5 });
    for (let i = 0; i < numApplications; i++) {
      applications.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        resumeUrl: "https://www.tiven.xyz/pdf/resume.pdf",
        jobId: jobId.id,
      });
    }
  }
  const userAuth = userData[0].email;
  await prisma.application.createManyAndReturn({
    data: applications,
  });
  console.log({
    email: userAuth,
    password: "user",
    message: "all user password is same",
  });
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
