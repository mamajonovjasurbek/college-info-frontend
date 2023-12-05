export function cutDate(date :string): string {
    const tLetter = "T"

    if (date.indexOf(tLetter) != 0) {
        return  date.slice(0 , date.indexOf(tLetter))
    }
    return  date
}

export function cutDateWithTime(date :string): string {
    const tLetter = "T"
    const dot = "."
    if (date.indexOf(tLetter) != 0) {
        const dateString = date.slice(0 , date.indexOf(tLetter))

        const timeString = date.slice(date.indexOf(tLetter) + 1 , date.indexOf(dot))

        return  dateString + " " + timeString
    }
    return  date
}