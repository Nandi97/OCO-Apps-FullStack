import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '../../../prisma/client';

const adapter = PrismaAdapter(prisma);

export const authOptions = {
	// Configure one or more authentication providers
	adapter: adapter,
	secret: process.env.AUTH_SECRET,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		AzureADProvider({
			clientId: process.env.AZURE_AD_CLIENT_ID,
			clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
			tenantId: process.env.AZURE_AD_TENANT_ID,
			authorization: { params: { scope: 'User.Read.All openid offline_access' } },
		}),
	],
	async profile(profile, tokens) {
		const profilePicture = await fetch(
			`https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
			{
				headers: {
					Authorization: `Bearer ${tokens.access_token}`,
				},
			}
		);

		if (profilePicture.ok) {
			const pictureBuffer = await profilePicture.arrayBuffer();
			const pictureBase64 = Buffer.from(pictureBuffer).toString('base64');
			return {
				id: profile.sub,
				name: profile.name,
				email: profile.email,
				image: `data:image/jpeg;base64, ${pictureBase64}`,
			};
		} else {
			return {
				id: profile.sub,
				name: profile.name,
				email: profile.email,
			};
		}
	},
};

export default NextAuth(authOptions);
