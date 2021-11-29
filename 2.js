//membuang angka kurang dari input
function removeSmallest(n, num_list) {
    if (n <= 0) {
        console.log(num_list)
    } else {
    const res = []
    //cek tiap index
    for (let i = 0; i < num_list.length; i++) {
        if (num_list[i] > n) {
            res.push(num_list[i])
        }
    }
    console.log(res)
    }
}

removeSmallest(20, [2, 34, 19, 22, 17, 15])
removeSmallest(15, [11, 22, 9, 15, 12, 24])
removeSmallest(24, [11, 22, 9, 15, 12, 24])
removeSmallest(0, [11, 22, 9, 15, 12, 24])