import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: adapter as any,
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		AzureADProvider({
			clientId: process.env.AZURE_AD_CLIENT_ID as string,
			clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
			tenantId: process.env.AZURE_AD_TENANT_ID as string,
			// authorization: { params: { scope: 'User.Read.All openid offline_access' } },
		}),
	],
};

export default NextAuth(authOptions);
