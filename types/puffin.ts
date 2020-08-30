export interface PuffinEventInstance {
	cancel: () => void
}

export interface PuffinState<EventNames = string | string[], EventArgs = any > {
	data: any
	on: (eventName: EventNames, callback: (data: EventArgs) => void) => PuffinEventInstance
	once: (eventName: string, callback: (data: any) => void) => void
	emit: (eventName: string, args?: any) => PuffinEventInstance
	keyChanged: (keyName: string, callback: (keyValue: string) => void) => PuffinEventInstance
	changed: (callback: (data: any, keyName: string) => void) => PuffinEventInstance
	triggerChange: () => void
}
