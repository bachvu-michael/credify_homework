
class Utility {
    ordinal_suffix_of = (i: number) => {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }
    merge_area_data_chart = (arr: any[], name: any, keyUpdate: any, value: any) => {
        var index = arr.findIndex(function (c) {
            return c.name == name;
        });
        if (index > -1) {
            arr[index][keyUpdate] = value
        } else {
            let ob = {}
            if (keyUpdate == 'profit') {
                ob = {
                    "name": name,
                    "profit": value,
                    "user": 0,
                }
            } else {
                ob = {
                    "name": name,
                    "profit": 0,
                    "user": value,
                }
            }
            arr.push(ob)
        }
        return arr
    }
}
const utility = new Utility()
export default utility
