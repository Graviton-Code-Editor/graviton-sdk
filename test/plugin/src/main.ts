import { EntryContext } from '../../../types'

export const entry = (args: EntryContext) => {
	args.RunningConfig.on('aFileHasBeenChanged', ({ }) => {
		
	})
}

