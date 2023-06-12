import router from '.'
import { handleLogin } from '../controllers/users/login'

router.post('api/v1/login', handleLogin)
