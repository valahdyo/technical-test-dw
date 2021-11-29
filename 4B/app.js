// bug :
// - terkadang setelah add book redirect ke home tapi tidak muncul kategori nya sehingga harus reload lagi.
// - blum ditambah middleware untuk upload gambar.
// - semua komponen masih dalam satu file

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { urlencoded } = require('express')
const _ = require('lodash')

const app = express()
app.use(express.static("public"))
app.use(urlencoded({extended: true}))
app.set("view engine", "ejs")

mongoose.connect(`mongodb+srv://va-admin:${process.env.SECRET}@cluster0.gkfbx.mongodb.net/perpusDB`)

const bookSchema = new mongoose.Schema({
    name: String,
    stok: Number,
    image: String,
    desc: String,
})

const Book = new mongoose.model("Book", bookSchema)

const categorySchema = new mongoose.Schema({
    name : String,
    book: [bookSchema]
  });

const Category = new mongoose.model("Category", categorySchema)


app.get("/", function(req, res) {
    Category.find({}, function (err, foundCategory) {
        res.render("home", {contents:foundCategory})
    })
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.get("/contact", function(req, res) {
    res.render("contact")
})

app.get("/addcategory", function(req, res) {
    res.render("addcategory")
})

app.get("/addbook", function(req, res) {
    res.render("addbook")
})

app.get("/category/:categoryId", function(req, res) {
    categoryId = req.params.categoryId
    Category.findOne({_id: categoryId}, function(err, foundCategory) {
        res.render("category", {name: foundCategory.name, categoryId: foundCategory._id, contents: foundCategory.book})
    })
})

app.post("/addbook", function(req, res) {
  const postTitle = req.body.postTitle
  const postCategory = _.capitalize(req.body.postCategory)
  const postStock = Number(req.body.postStock)
  const postDesc = req.body.postDesc
  
  const newBook = new Book({
    name: postTitle,
    stok: postStock,
    image: null,
    desc: postDesc,
  })
  newBook.save()

  Category.findOne({name: postCategory}, function(err, foundCategory) {
      if (foundCategory) {
      foundCategory.book.push(newBook)
      foundCategory.save()
      } else {
          const newCategory = new Category({
              name: postCategory,
          })
          newCategory.book.push(newBook)
          newCategory.save()
      }
      res.redirect("/")
  })
})

app.get("/pinjam/:categoryId/:bookId", function(req,res){
    const categoryId = req.params.categoryId
    const bookId = req.params.bookId
    Category.findOne({_id: categoryId}, function(err, foundCategory){
        foundCategory.book.forEach(buku => {
            if (buku._id == bookId) {
                if (buku.stok !== 0) {
                    buku.stok = buku.stok-1
                    foundCategory.save() 
                }
            }
        })
        res.redirect(`/category/${categoryId}`)
    })
})

app.get("/kembalikan/:categoryId/:bookId", function(req,res){
    const categoryId = req.params.categoryId
    const bookId = req.params.bookId
    Category.findOne({_id: categoryId}, function(err, foundCategory){
        foundCategory.book.forEach(buku => {
            if (buku._id == bookId) {
                buku.stok = buku.stok+1
                foundCategory.save()
            }
        })
        res.redirect(`/category/${categoryId}`)
    })
})


let port = process.env.PORT
if (port == null || port == ""){
    port = 3000
}
app.listen(port, function(){
    console.log("Server has started on port 3000")
})



