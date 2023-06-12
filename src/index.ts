import app from './app'
import { sequelize } from './database'

sequelize.authenticate()
  .then(() => {
    console.log('Database sync complete')
    app.listen(app.get('port'), () => {
      console.log(`App live on: http://localhost:${app.get('port') as number}`)
    })
  })
  .catch(err => { console.error('Error syncing database:', err) })
