import React from "react";
import { SanitySection, SanityUnknown } from "../../sanity/models";
import TextArea from "./text-area";
import CallToAction from "./call-to-action";

type Props = {
	section: SanitySection;
};

const Section: React.FC<Props> = (props) => {
	switch (props.section._type) {
		case "textArea":
			return <TextArea content={props.section} />;
		case "callToAction":
			return <CallToAction content={props.section} />;
		default:
			console.warn(
				`Unknown block type: ${(props.section as SanityUnknown)._type}`
			);
			if (process.env.NODE_ENV !== "production") {
				return <pre>{JSON.stringify(props.section, null, 2)}</pre>;
			}
			return null;
	}
};

export default Section;
