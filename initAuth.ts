import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    authPageURL: "/logg-inn",
    appPageURL: "/app",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    firebaseAdminInitConfig: {
      credential: {
        projectId: "unge-drabanter",
        clientEmail:
          "firebase-adminsdk-20336@unge-drabanter.iam.gserviceaccount.com",
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
          : undefined,
      },
      //   databaseURL: "https://mitt-hyttevel-default-rtdb.firebaseio.com",
      //   databaseURL: "https://unge-drabanter.firebaseio.com",
      databaseURL: "",
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyAkrlempNlWrPiAN9lTQc2sJCz8Racz0fA", // required
      authDomain: "unge-drabanter.firebaseapp.com",
      //   databaseURL: "https://mitt-hyttevel-default-rtdb.firebaseio.com",
      databaseURL: "",
      projectId: "unge-drabanter",
    },
    cookies: {
      name: "unge-drabanter", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  });
};

export default initAuth;
