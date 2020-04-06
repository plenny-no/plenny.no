import React from "react";

const settings = (appId: string) =>
	`window.intercomSettings = {app_id: "${appId}"};`;
const script = (appId: string) =>
	`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${appId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`;

type Props = {
	appId: string;
};

const IntercomScripts: React.FC<Props> = (props) => {
	const { appId } = props;
	return (
		<>
			<script dangerouslySetInnerHTML={{ __html: settings(appId) }} />
			<script dangerouslySetInnerHTML={{ __html: script(appId) }} />
		</>
	);
};

export default IntercomScripts;
