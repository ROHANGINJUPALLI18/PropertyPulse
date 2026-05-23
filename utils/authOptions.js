import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  // Ensure auth errors redirect to home instead of /api/auth/error
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      try {
        // 1.Connect to the database
        await connectDB();
        // 2.Check if user exsist
        const userExsist = await User.findOne({ email: profile.email });
        // 3.if not create user
        if (!userExsist) {
          // truncate username if too long
          const username = profile.name.slice(0, 20);
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
        // 4.return true to allow sign in
        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    // Session callback funtion that modifies the session object
    async session({ session }) {
      try {
        // 1.get user from the database
        await connectDB();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
          console.error('User not found in database');
          return session;
        }
        // 2.Assgin userid from the session
        session.user.id = user._id.toString();
        // return session
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
  },
};
