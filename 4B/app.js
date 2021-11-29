// bug :
// - terkadang setelah add book redirect ke home tapi tidak muncul kategori nya sehingga harus reload lagi.
// - blum ditambah middleware untuk upload gambar.
// - semua komponen masih dalam satu file
// - error handling blum ada


//import semua package yang dibutuhkan
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { urlencoded } = require('express')
const _ = require('lodash')

//use express
const app = express()
//set static file
app.use(express.static("public"))
//parse url
app.use(urlencoded({extended: true}))
//setting ejs sebagai default view engine
app.set("view engine", "ejs")

//connect mongoose
mongoose.connect(`mongodb+srv://va-admin:${process.env.SECRET}@cluster0.gkfbx.mongodb.net/perpusDB`)


//inisiasi model buku dan kategori
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

// routing home
app.get("/", function(req, res) {
    //ambil data dari tabel kategori
    Category.find({}, function (err, foundCategory) {
        res.render("home", {contents:foundCategory})
    })
})

//routing halaman about
app.get("/about", function(req, res) {
    res.render("about")
})

//routing halaman contact
app.get("/contact", function(req, res) {
    res.render("contact")
})

//routing ke halaman tambahbuku
app.get("/addbook", function(req, res) {
    res.render("addbook")
})

//routing ketika kategori diklik
app.get("/category/:categoryId", function(req, res) {
    categoryId = req.params.categoryId
    //cari buku sesuai kategori
    Category.findOne({_id: categoryId}, function(err, foundCategory) {
        res.render("category", {name: foundCategory.name, categoryId: foundCategory._id, contents: foundCategory.book})
    })
})

//post method utk tambah buku
app.post("/addbook", function(req, res) {
  const postTitle = req.body.postTitle
  const postCategory = _.capitalize(req.body.postCategory)
  const postStock = Number(req.body.postStock)
  const postDesc = req.body.postDesc
  
  //inisiasi objek buku baru
  const newBook = new Book({
    name: postTitle,
    stok: postStock,
    image: null,
    desc: postDesc,
  })
  newBook.save()

  //cek apakah kategori sudah ada
  Category.findOne({name: postCategory}, function(err, foundCategory) {
      //kalau sudah ada push objek buku baru tanpa membuat kategori baru
      if (foundCategory) {
      foundCategory.book.push(newBook)
      foundCategory.save()
      } else {
          // jika blum ada membuat objek kategori baru
          const newCategory = new Category({
              name: postCategory,
          })
          //push buku baru ke kategori baru
          newCategory.book.push(newBook)
          newCategory.save()
      }
      res.redirect("/")
  })
})

//routing untuk tombol pinjam
app.get("/pinjam/:categoryId/:bookId", function(req,res){
    const categoryId = req.params.categoryId
    const bookId = req.params.bookId
    Category.findOne({_id: categoryId}, function(err, foundCategory){
        //mencari buku sesuai id dan kategori
        foundCategory.book.forEach(buku => {
            if (buku._id == bookId) {
                if (buku.stok !== 0) {
                    //kurangin stok
                    buku.stok = buku.stok-1
                    foundCategory.save() 
                }
            }
        })
        res.redirect(`/category/${categoryId}`)
    })
})

//route untuk tombol kembalikan
app.get("/kembalikan/:categoryId/:bookId", function(req,res){
    const categoryId = req.params.categoryId
    const bookId = req.params.bookId
    Category.findOne({_id: categoryId}, function(err, foundCategory){
        //cari buku sesuai id dan tambah stok
        foundCategory.book.forEach(buku => {
            if (buku._id == bookId) {
                buku.stok = buku.stok+1
                foundCategory.save()
            }
        })
        res.redirect(`/category/${categoryId}`)
    })
})

//setting port untuk heroku dan lokal environment
let port = process.env.PORT
if (port == null || port == ""){
    port = 3000
}

app.listen(port, function(){
    console.log("Server has started on port 3000")
})



