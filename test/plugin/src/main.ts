import { EntryContext} from '../../../types'

export const entry = ({ RunningConfig }: EntryContext) => {
	RunningConfig.on('aFileHasBeenChanged',({ }) => {
		
	})
}

