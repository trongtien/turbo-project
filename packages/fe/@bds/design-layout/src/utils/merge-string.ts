

export const mergeString = (stringArray: Array<string | null | undefined>) => {
    return stringArray.filter(el => el !== null && el !== undefined && el.length > 0).join(" ")
}