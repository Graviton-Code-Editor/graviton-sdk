import { PuffinEventInstance } from './puffin'

interface WindowOptions {
	title?: string
	component: object
	minWidth?: string
	minHeight?: string
	height?: string
	width?: string
	id?: string
}

interface WindowInstance {
	launch: () => void
	close: () => void
	on: (eventName: string, eventData: any) => PuffinEventInstance
}


type WindowConstructor = (args: WindowOptions) => WindowInstance

export { WindowConstructor, WindowOptions, WindowInstance }
