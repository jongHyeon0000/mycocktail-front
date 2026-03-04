import { authHandlers } from './authHandlers'
import { cocktailHandlers } from './cocktailHandlers'
import { spiritHandlers } from './spiritHandlers'
import { toolHandlers } from './toolHandlers'
import { techniqueHandlers } from './techniqueHandlers'
import { glasswareHandlers } from './glasswareHandlers'
import { ingredientsHandlers } from './ingredientsHandlers'

export const handlers = [
  ...authHandlers,
  ...cocktailHandlers,
  ...spiritHandlers,
  ...toolHandlers,
  ...techniqueHandlers,
  ...glasswareHandlers,
  ...ingredientsHandlers,
]
