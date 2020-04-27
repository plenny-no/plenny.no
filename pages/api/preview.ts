import { NextApiRequest, NextApiResponse } from "next";
import { timingSafeEqual } from "crypto";

const { PREVIEW_TOKEN } = process.env;

function isValidPreviewToken(token: string) {
	if (PREVIEW_TOKEN === undefined) return false;
	return timingSafeEqual(Buffer.from(token), Buffer.from(PREVIEW_TOKEN));
}

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (
		typeof req.query.secret !== "string" ||
		!isValidPreviewToken(req.query.secret)
	) {
		return res.status(401).json({ message: "Invalid token" });
	}

	if (typeof req.query.url !== "string") {
		return res.status(401).json({ message: "Invalid url" });
	}

	res.setPreviewData({});
	res.writeHead(307, { Location: req.query.url });
	res.end();
};
