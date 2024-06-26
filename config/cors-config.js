// cors setup
const developmentOrigins = ["http://localhost:3000"];
const productionOrigins = ["https://www.mobilemoneybw.co.bw"];

const allowlist = process.env.NODE_ENV === "production" ? productionOrigins : developmentOrigins;

export const corsConfig = {
    origin: function (origin, callback) {
      if (allowlist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true,  
}