import RunningConfig from './running_config'
import { WindowConstructor } from './window'
import { NotificationConstructor } from './notification'

export default interface EntryContext {
	RunningConfig: RunningConfig;
	Window: WindowConstructor;
	Notification: NotificationConstructor;
}