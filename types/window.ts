import { PuffinEventInstance } from './puffin'

export interface WindowOptions {
	title?: string
	component: object
	minWidth?: string
	minHeight?: string
	height?: string
	width?: string
	id?: string
}

export interface WindowInstance {
	launch: () => void
	close: () => void
	on: (eventName: string, eventData: any) => PuffinEventInstance
}

export type WindowConstructor = (args: WindowOptions) => WindowInstance