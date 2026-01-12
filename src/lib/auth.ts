import {PrismaAdapter} from "@auth/prisma-adapter";
import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {prisma} from "@/lib/prisma";