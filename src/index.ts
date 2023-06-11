import app from './app'
import { sequelize } from './db';

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database sync complete');
    app.listen(app.get('port'), () => {
      console.log(`App live on: http://localhost:${app.get('port') as number}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();


