import RunningConfig from './running_config'
import { WindowConstructor } from './window'

export default interface EntryContext {
	RunningConfig: RunningConfig;
	Window: WindowConstructor;
}