import { PuffinState } from './puffin'

type EventsNames = 
	/*
	* Allow custom event names
	*/
	| String 
	/*
	* Event fired when a tab is created
	* interface: TabEventArgs
	*/
	| 'aTabHasBeenCreated'
	/*
	* Event fired when a tab is focused
	* interface: TabEventArgs
	*/
	| 'aTabHasBeenFocused' 
	/*
	* Event fired when a tab is closed
	* interface: TabEventArgs
	*/
	| 'aTabHasBeenClosed' 
	/*
	* Event fired when a file has been created in any of the opened folders
	* interface: FileEventsArgs
	*/
	| 'aFileHasBeenCreated' 
	/*
	* Event fired when a file has been changed (it's content got modified) in any of the opened folders
	* interface: FileEventsArgs
	*/
	| 'aFileHasBeenChanged'
	/*
	* Event fired when a folder has been created in any of the opened folders
	* interface: FileEventsArgs
	*/
	| 'aFolderHasBeenChanged'
	/*
	* Event fired when the App UI has been completely loaded
	* interface: FolderEventsArgs
	*/
	| 'appLoaded'
	/*
	* Event fired when a folder (aka project) is opened
	*/
	| 'addFolderToRunningWorkspace'
	/*
	* Event fired when a folder (aka project) is no longer opened 
	*/
	| 'removeFolderFromRunningWorkspace'
	/*
	* Event fired when a LSP server is being registered
	*/
	| 'registerLanguageServer'
	/*
	* Event fired when a Environment (aka Project) Inspector is being registered
	*/
	| 'registerEnvironmentInspector'
	

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

/*
* Mix all interfaces into one
*/
interface EventsArgs extends TabEventArgs, FileEventsArgs, FolderEventsArgs {}

export default interface RunningConfig extends PuffinState<EventsNames, EventsArgs>{ }