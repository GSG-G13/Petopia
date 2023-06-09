import app from './app'
app.listen(app.get('port'), (): void => {
  console.log(`App live on: ${app.get('port') as number}`)
})
