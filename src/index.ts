import app from './app'
app.listen(app.get('port'), (): void => {
  console.log(`App live on: http://localhost:${app.get('port') as number}`)
})
