
interface NotificationButton {
	label: string
	action?: () => void
}

export interface NotificationOptions {
	title: string
	content?: string
	buttons?: NotificationButton[]
	lifeTime?: number | typeof Infinity
}

export interface NotificationDetails {
	title: string
	content?: string
	element: HTMLElement
}

export interface NotificationInstance {
	remove: () => void,
	NotificationElement: HTMLElement
}

export type NotificationConstructor = (args: NotificationOptions) => NotificationInstance