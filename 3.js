// function cetak_gambar(num) {
//   if (num % 2 !== 0) {
//     console.log('Input harus bilangan genap!')
//   }
//   else {
//     console.log('-----panjang-------')
//     const row = []
//     for (let i = 1; i <= num; i++) {
//       for (let j= 1; j <= num; j++) {
//         if (i === 1) {
//           row.push('+ ')
//         }
//         else if (i === num) {
//           row.push('+ ')
//         }
//         else {
//           if (j % 3 === 0) {
//             row.push("+ ")
//           } 
//           else {
//           row.push("= ")
//           }
//         }
//       }
//       row.push('\n')
//     }
//     return row.join('')
//   }
// }

//membuat patter letter I (?)
function cetak_gambar(num) {
  if (num % 2 !== 0) {
    console.log('Input harus bilangan genap!')
  }
  else {
    //logic coba coba
    const left = (num/2)-1
    const right =(num-left+1)
    
    
    console.log('-----panjang-------')
    const row = []
    for (let i = 1; i <= num; i++) {
      for (let j= 1; j <= num; j++) {
        if (i === 1) {
          row.push('+ ')
        }
        else if (i === num) {
          row.push('+ ')
        }
        else {
          if (j === left || j === right) {
            row.push("+ ")
          } 
          else {
          row.push("= ")
          }
        }
      }
      row.push('\n')
    }
    console.log(row.join(''))
  }
}

cetak_gambar(8)
