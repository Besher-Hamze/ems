import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "البريد", type: "email" },
        password: { label: "كلمة المرور", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password || "");
        if (!email || !password) return null;
        const bcrypt = (await import("bcryptjs")).default;
        const { connectDB } = await import("@/lib/db");
        const { User } = await import("@/lib/models/User");
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) return null;
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;
        return { id: String(user._id), email: user.email, name: user.name };
      },
    }),
  ],
});
