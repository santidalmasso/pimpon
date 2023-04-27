import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {NextAuthOptions} from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {sendEmail} from '~/lib/email'

import {db} from '~/lib/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
        port: Number(process.env.SMTP_PORT || 587),
        auth: {
          user: process.env.SMTP_USER || 'apikey',
          pass: process.env.EMAIL_API_KEY || '',
        },
      },
      sendVerificationRequest: async ({identifier, url, provider}) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })

        const templateId = user?.emailVerified
          ? process.env.EMAIL_SIGN_IN_TEMPLATE_ID
          : process.env.EMAIL_ACTIVATION_TEMPLATE

        if (!templateId) {
          throw new Error('Missing template id')
        }

        const result = await sendEmail({
          to: identifier,
          from: 'no_reply@santid.me',
          subject: 'Sign in to PinPon',
          text: `Login ${url}`,
          template: {
            id: templateId,
            data: {
              signInURL: url,
            },
          },
        })
      },
    }),
  ],
  callbacks: {
    async session({token, session}) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({token, user}) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async signIn({user}) {
      if (!user.name) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: user.email,
          },
        })
      }

      return true
    },
  },
}
