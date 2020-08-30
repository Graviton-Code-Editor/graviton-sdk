import { PuffinState } from './puffin'

type EventsNames = 
	| String 
	| 'aTabHasBeenCreated'
	| 'aTabHasBeenFocused' 
	| 'aTabHasBeenClosed' 
	| 'aFileHasBeenCreated' 
	| 'aFileHasBeenChanged'

interface TabEventArgs {
	tabElement: HTMLElement,
	directory: string,
	client: any,
	instance: any,
	parentFolder: string,
	projectPath: string,
	isEditor: boolean,
	justCreated: boolean
}

interface FileEventsArgs {
	parentFolder: string,
	filePath: string
}

interface FolderEventsArgs {
	parentFolder: string,
	filePath: string
}

interface EventsArgs extends TabEventArgs, FileEventsArgs, FolderEventsArgs {}


export default interface RunningConfig extends PuffinState<EventsNames, EventsArgs>{
	
}