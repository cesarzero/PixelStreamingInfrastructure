import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { Application, PixelStreamingApplicationStyle, UIElementCreationMode } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4';
const PixelStreamingApplicationStyles =
    new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

declare global {
    interface Window { pixelStreaming: PixelStreaming; }
}

document.body.onload = function() {
	const config = new Config({ useUrlParams: true });
	const stream = new PixelStreaming(config);
	const application = new Application({
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode),
		settingsPanelConfig:{
			isEnabled:false,
			visibilityButtonConfig:{
				creationMode:UIElementCreationMode.Disable
			}
		},
		statsPanelConfig:{
			isEnabled:false,
			visibilityButtonConfig:{
				creationMode:UIElementCreationMode.Disable
			}
		},
		fullScreenControlsConfig:{
			creationMode:UIElementCreationMode.Disable
		},
		videoQpIndicatorConfig:{
			disableIndicator:true
		}
	});
	document.body.appendChild(application.rootElement);
	stream.addResponseEventListener("handle_responses",myHandleResponseFunction);
	window.pixelStreaming = stream;
}

/**
 * 接收UE的消息
 * @param data 消息主题
 */
function myHandleResponseFunction(data:string) {
	console.warn("Response received!");
	console.log(data);
}


/*function SendMessage(){
	window.pixelStreaming.emitUIInteraction("test");
	console.log("send message");
}*/
