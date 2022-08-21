const express = require('express')
const app = express()
const db = require('./db/mongoose')
require('dotenv').config()

const userRouter = require('./routes/user')
const jobCategoryRouter = require('./routes/Categorys')
const subCategoryRouter = require('./routes/services')
const addressRouter = require('./routes/address')
const orderRouter = require('./routes/order')
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')
i18next.use(Backend).use(middleware.LanguageDetector)
  .init({
    
    backend: {
        loadpath: './locales/{{lng}}/translation.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'ar'],
    resources:{
      en:{
        translation: require('./locales/en/translation.json')
      },
      ar:{
        translation: require('./locales/ar/translation.json')
      }
    }

    
  })

const PORT = process.env.PORT || 3000

app.use(middleware.handle(i18next))
app.use(express.json())

app.use(userRouter)
app.use(jobCategoryRouter)
app.use(subCategoryRouter)
app.use(addressRouter)
app.use(orderRouter)





app.listen(PORT,()=>{
    console.log('server up  at port : ',PORT)
})