import { ITheme } from './theme.model'
import { ICredentials } from './credentials.model'

export interface ILocalStorage {
  theme: ITheme
  credentials: ICredentials
}
