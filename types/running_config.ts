import { PuffinState } from './puffin'

type EventsNames = 
	| String 
	| 'aTabHasBeenCreated'
	| 'aTabHasBeenFocused' 
	| 'aTabHasBeenClosed' 
	| 'aFileHasBeenCreated' 
	| 'aFileHasBeenChanged'



interface EventsArgs {
	
}


export default interface RunningConfig extends PuffinState<EventsNames, EventsArgs>{
	
}