import { z } from "zod";

const configSchema = z.object({
  databaseUrl: z.string(),
  directUrl: z.string(),

  redisUrl: z.string().optional(),

  nextAuthSecret: z.string(),
  nextAuthUrl: z.string(),

  googleClientId: z.string(),
  googleClientSecret: z.string(),

  googleServiceKey: z.string(),

  razorpayKeyId: z.string(),
  razorpayKeySecret: z.string(),
  razorpayWebhookSecret: z.string(),

  telegramBotToken: z.string(),
  telegramChatId: z.string(),
  nodeEnv: z.enum(["development", "test", "production"]).default("development"),
  adminEmail: z.string().optional(),
});

type Config = z.infer<typeof configSchema>;

function loadConfig(): Config {
  return configSchema.parse({
    databaseUrl: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
    redisUrl: process.env.REDIS_URL,
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleServiceKey: process.env.GOOGLE_SERVICE_KEY,
    razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,
    razorpayWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID,
    nodeEnv: process.env.NODE_ENV,
    adminEmail: process.env.ADMIN_EMAIL,
  });
}

export const config = loadConfig();
