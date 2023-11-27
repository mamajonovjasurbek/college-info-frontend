export function cutDate(date :string): string {
    const tLetter = "T"

    if (date.indexOf(tLetter) != 0) {
        return  date.slice(0 , date.indexOf(tLetter))
    }
    return  date
}