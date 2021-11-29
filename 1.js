function totalHandshake(orang) {
    let res = 0
    let i = 0
    while (i < orang) {
        res += i
        i++
        console.log(i, res)
    }
    console.log(res)
    //(n*(n-1))/2
}

totalHandshake(3)
totalHandshake(6)