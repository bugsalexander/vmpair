import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: "http://127.0.0.1:5000",
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
    // pathRewrite: {
    //   "^/api/google": "https://google.com",
    //   "^/api/myhome": "https://github.com/stegano",
    // },
  });
