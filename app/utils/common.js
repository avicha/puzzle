let padZero = (str, len) => {
    str = str.toString()
    while (str.length < len) {
        str = '0' + str
    }
    return str
}
const CommonUtils = {
    formatDatetime(ms) {
        let time = Math.floor(ms / 1000)
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor((time - hours * 3600) / 60)
        let seconds = time % 60
        return (hours ? hours + ':' : '') + (minutes ? padZero(minutes, 2) + ':' : '') + ((hours || minutes) ? padZero(seconds, 2) : seconds + 's')
    },
    factorial(n) {
        if (n == 1 || n == 0) {
            return 1
        } else {
            return n * CommonUtils.factorial(n - 1)
        }
    }
}
export default CommonUtils