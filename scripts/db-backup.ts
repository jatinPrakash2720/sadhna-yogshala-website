
import "dotenv/config";
import fs from "fs";
import path from "path";
import { prisma } from "../src/lib/api/db";

async function backup() {
  const backupDir = path.join(process.cwd(), "backup");
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  console.log("Starting database backup...");

  try {
    // 1. Users
    console.log("Fetching Users...");
    const users = await prisma.user.findMany();
    fs.writeFileSync(
      path.join(backupDir, "users.json"),
      JSON.stringify(users, null, 2)
    );
    console.log(`Saved ${users.length} users.`);

    // 2. Accounts
    console.log("Fetching Accounts...");
    const accounts = await prisma.account.findMany();
    fs.writeFileSync(
      path.join(backupDir, "accounts.json"),
      JSON.stringify(accounts, null, 2)
    );
    console.log(`Saved ${accounts.length} accounts.`);

    // 3. Sessions
    console.log("Fetching Sessions...");
    const sessions = await prisma.session.findMany();
    fs.writeFileSync(
      path.join(backupDir, "sessions.json"),
      JSON.stringify(sessions, null, 2)
    );
    console.log(`Saved ${sessions.length} sessions.`);

    // 4. Payments
    console.log("Fetching Payments...");
    const payments = await prisma.payment.findMany();
    fs.writeFileSync(
      path.join(backupDir, "payments.json"),
      JSON.stringify(payments, null, 2)
    );
    console.log(`Saved ${payments.length} payments.`);

    // 5. Courses
    console.log("Fetching Courses...");
    const courses = await prisma.course.findMany({
      include: { classes: true, students: true } // Include relations for full context if needed, but separate files are better for pure backup
    });
    fs.writeFileSync(
      path.join(backupDir, "courses.json"),
      JSON.stringify(courses, null, 2)
    );
    console.log(`Saved ${courses.length} courses.`);

    // 6. Classes
    console.log("Fetching Classes...");
    const classes = await prisma.class.findMany();
    fs.writeFileSync(
      path.join(backupDir, "classes.json"),
      JSON.stringify(classes, null, 2)
    );
    console.log(`Saved ${classes.length} classes.`);

    // 7. Enrollments
    console.log("Fetching Enrollments...");
    const enrollments = await prisma.enrollment.findMany();
    fs.writeFileSync(
      path.join(backupDir, "enrollments.json"),
      JSON.stringify(enrollments, null, 2)
    );
    console.log(`Saved ${enrollments.length} enrollments.`);
    
    // Create a timestamped folder for this specific run
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const specificBackupDir = path.join(backupDir, timestamp);
    if (!fs.existsSync(specificBackupDir)) {
        fs.mkdirSync(specificBackupDir);
    }
    
    // Move files to timestamped folder to keep history
    ['users.json', 'accounts.json', 'sessions.json', 'payments.json', 'courses.json', 'classes.json', 'enrollments.json'].forEach(file => {
        if (fs.existsSync(path.join(backupDir, file))) {
            fs.copyFileSync(path.join(backupDir, file), path.join(specificBackupDir, file));
        }
    });

    console.log(`\nBackup completed successfully! Files saved to: ${specificBackupDir}`);

  } catch (error) {
    console.error("Error during backup:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backup();
