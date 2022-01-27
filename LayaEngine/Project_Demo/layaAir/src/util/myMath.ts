export class myMath {
    /*** 格式化数字 */
    public static NumberFormat(coin: number): string {
        coin = Math.floor(coin);
        let strTemp: string = coin.toString();
        let index = strTemp.indexOf('e+');
        if (index != -1) {
            let str1 = strTemp.slice(0, index);
            let str2 = strTemp.slice(index + 2);
            let len = Number(str2);
            let a = str1.indexOf('.');
            str2 = str1.slice(a + 1);
            str1 = str1.slice(0, a);
            let len2 = len - str2.length;
            strTemp = `${str1}${str2}`;
            for (let i = 0; i < len2; i++) {
                strTemp += '0';
            }
        }
        let result;
        if (strTemp.length > 3) {
            let unitArr = ['K', 'M', 'B', "T", 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            let unit = Math.floor((strTemp.length - 4) / 3);
            let big = (coin / (Math.pow(1000, unit))).toFixed(0);
            if (big.length > 3) {
                result = big.substring(0, big.length - 3) + '.' + big.substring(big.length - 3, big.length - 2) + unitArr[unit]
            } else {
                result = big + unitArr[unit]
            }
        } else {
            if (coin.toString().length > 3) {
                let temp = coin.toString()
                result = temp.substring(0, temp.length - 3) + '.' + temp.substring(temp.length - 3, temp.length)
            } else {
                result = coin
            }
        }
        return result
    }


    /*** 格式化数字 */
    public static NumberFormat2(coin: number): string {
        coin = Math.floor(coin);
        let strTemp: string = coin.toString();
        let index = strTemp.indexOf('e+');
        if (index != -1) {
            let str1 = strTemp.slice(0, index);
            let str2 = strTemp.slice(index + 2);
            let len = Number(str2);
            let a = str1.indexOf('.');
            str2 = str1.slice(a + 1);
            str1 = str1.slice(0, a);
            let len2 = len - str2.length;
            strTemp = `${str1}${str2}`;
            for (let i = 0; i < len2; i++) {
                strTemp += '0';
            }
        }
        let result;
        if (strTemp.length > 3) {
            let unitArr = ['K', 'M', 'B', "T", 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            let unit = Math.floor((strTemp.length - 4) / 3);
            let big = (coin / (Math.pow(1000, unit))).toFixed(0);
            if (big.length > 3) {
                result = big.substring(0, big.length - 3) + '_' + big.substring(big.length - 3, big.length - 2) + unitArr[unit]
            } else {
                result = big + unitArr[unit]
            }
        } else {
            if (coin.toString().length > 3) {
                let temp = coin.toString()
                result = temp.substring(0, temp.length - 3) + '_' + temp.substring(temp.length - 3, temp.length)
            } else {
                result = coin
            }
        }
        return result
    }

    /** 时间格式化 */
    public static TimeFormat(num: number = 0): string {
        let min = Math.floor(num / 60);//分钟
        let hour = Math.floor(min / 60);//小时
        let day = Math.floor(hour / 24);//天
        let s = Math.floor(num % 60);
        if (day == 0) {
            if (hour == 0) {
                if (min == 0) {
                    if (s <= 9) {
                        return `${min}:0${s}`;
                    }
                    return `${min}:${s}`;
                }
                if (s <= 9) {
                    return `${min}:0${s}`;
                }
                return `${min}:${s}`;
            } else {
                return `${hour}:${min}:${s}`;
            }
        } else {
            return `${day}:${hour}:${min}:${s}`;
        }
    }
    /*** 定时器时间格式化 */
    public static TimerFormat(num: number = 0): string {
        let hour: any = Math.floor(num / 3600); // 小时
        let minute: any = Math.floor((num % 3600) / 60);// 分钟
        let second: any = Math.floor((num % 3600) % 60); // 秒
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        return `${hour}:${minute}:${second}`
    }

    /**
     * 返回两个时间戳是否在同一天吧
     * @param time1 时间戳1
     * @param time2 时间戳2
     */
    public static ContrastDay(time1: number, time2: number) {
        let signDate = new Date(time1);
        let now = new Date(time2);
        if (now.getFullYear() != signDate.getFullYear() || now.getMonth() != signDate.getMonth() || now.getDate() != signDate.getDate()) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * //直角边求角度
     * sideA 对边
     * sideC 斜边
     */
    public static MahtSin(sideA: number, sideC: number): number {
        //atan 是求反正切  asin求反正弦
        //atan 和 atan2 区别：
        //1：参数的填写方式不同；
        //2：atan2 的优点在于 如果 x2-x1等于0 依然可以计算，但是atan函数就会导致程序出错；
        //3：已经过滤掉 sideC == 0 的情况
        return 180 / Math.PI * Math.asin(sideA / sideC);
    }
    /**
     * 获取随机值
     * @param Min 最小值（包含）
     * @param Max 最大值(不包含)
     */
    public static GetRandom(Min, Max): number {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    //删除数组
    public static removeByValue(arr, val) {
        var i = arr.indexOf(val);
        if (i >= 0) {
            arr.splice(i, 1);
        }
    }
    /**从arr1 中 删除arr2数组元素 */
    public static removeFromAaary(arr1, arr2, arr1_length) {
        function removeNode() {
            for (var i = 0; i < arr1.length; i++) {
                for (var j = 0; j < arr2.length; j++) {
                    if (arr1[i] == arr2[j]) {
                        arr1.splice(i, 1); //删除下标为i的元素
                        return;
                    }
                }
            }
        }
        for (var k = 0; k < arr1_length; k++) {
            removeNode();
        }
        return arr1;
    }
    //混乱排序
    public static randomsort(a, b) {
        return Math.random() > .5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }


    /**
     * 获取[min~max)的随机值
     */
    public static RandomInt(min: number, max: number) {
        let length = max - min;
        return Math.floor(Math.random() * length + min);
    }



    /**在数组中查询元素是否存在 存在返回true 不存在为false */
    public static Arr_SearchNum(arr: number[], num): boolean {
        for (let i = 0; i < arr.length; i++) {
            if (num == arr[i]) {
                return true
            }
        }
        return false;
    }

    /**将数组顺序打乱
     * 返回一个新的数组
     */
    public static shuffle(arr) {
        let i = arr.length;
        let _arr = [];
        arr.forEach((val) => { _arr.push(val) });
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [_arr[j], _arr[i]] = [_arr[i], _arr[j]];
        }
        return _arr;
    }

    /**获得随机数组不相同数 不改变原数组
     * @param {Array} arr 数组
     * @param {number} num 数量
    */
    public static getRandomArr(arr, num) {
        let _arr = [];
        arr.forEach((val) => { _arr.push(val) });
        let arrOut = [];
        for (let i = 0; i < num; i++) {
            let len = _arr.length;
            let ran = Math.floor(Math.random() * len);
            arrOut[i] = _arr.splice(ran, 1)[0];
        }
        return arrOut;
    }
    /**从元数组中截取出指定个数的随机数组 
     * @param {Array} arr 源数组
     * @param {number} num 截取个数
     * 
     * */
    public static getRandomArr_splic(arr, num) {
        let _list = [...arr];
        let arrOut = [];
        for (let i = 0; i < num; i++) {
            let len = _list.length;
            let random = Math.floor(Math.random() * len);
            arrOut[i] = _list.splice(random, 1)[0];
        }
        return arrOut;
    }

    /**随机权重 */
    public static RandomWeight(weigthArr: any) {
        let randomConfig = weigthArr;

        let randomList = [];
        for (let i in randomConfig) {
            for (let j = 0; j < randomConfig[i].rate; j++) {
                randomList.push(i);
            }
        }
        let randomValue = randomList[Math.floor(Math.random() * randomList.length)];

        // if (curVal != 0) {
        //     while (randomValue == curVal) {
        //         randomValue = randomList[Math.floor(Math.random() * randomList.length)];
        //     }
        // }
        return randomValue;
    }

    /**随机权重 */
    public static RandomWeight2(weigthArr: any) {
        let randomConfig = weigthArr;
        let randomList = [];
        for (let i = 0; i < randomConfig.length; i++) {
            for (let j = 0; j < randomConfig[i].rate; j++) {
                randomList.push(randomConfig[i]);
            }
        }
        let randomValue = randomList[Math.floor(Math.random() * randomList.length)];

        // if (curVal != 0) {
        //     while (randomValue == curVal) {
        //         randomValue = randomList[Math.floor(Math.random() * randomList.length)];
        //     }
        // }
        return randomValue;
    }

    /**判断是否是今日时间 */
    public static isToday2(time: string): boolean {
        let _date: Date = new Date();
        let _month: number = _date.getMonth() + 1;
        let _day: number = _date.getDate();
        let _curTime = `${_month}${_day}`;
        let _Time: string = time; //服务器时间
        if (_curTime == _Time) {
            return true
        } else {
            return false;
        }
    }


    // public static log(tag: string, ...args): void {
    //     if(ConfigManager.instance.Debug){
    //         console.log(tag,args)
    //     }
    // }

    public static compare(property) {
        return function (a, b) {
            let value1 = a[property];
            let value2 = b[property];
            return value2 - value1;
        }
    }

    public static getTime(date_str) {
        let timestrip: Date = new Date(date_str)
        if (Number.isNaN(timestrip.getTime())) timestrip = new Date(date_str.replace(/-/g, '/'))
        return timestrip;
    }

    public static checkName(str: string, index: number) {
        let _len: number = str.length;
        let _s: string = "";
        if (_len > 5) {
            _s = str.substring(0, index) + "...";
        } else {
            _s = str;
        }
        return _s;
    }

    /**获得本周的开端日期 */
    public static getWeekStartDate() {
        let now = new Date(); //当前日期
        let nowDayOfWeek = now.getDay(); //今天本周的第几天
        let nowDay = now.getDate(); //当前日
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
        return myMath.formatDate(weekStartDate);
    }

    public static getWeekEndDate() {
        let now = new Date(); //当前日期
        let nowDayOfWeek = now.getDay(); //今天本周的第几天
        let nowDay = now.getDate(); //当前日
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getFullYear(); //当前年
        let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
        return myMath.formatDate(weekEndDate);
    }


    /*时间戳改日期--不传第二个参数返回年月日,传第二个参数返回年月日时分秒*/
    public static formatDateTime(inputTime, type) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m: any = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d: any = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h: any = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute: any = date.getMinutes();
        let second: any = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        if (type) {
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        } else {
            return y + '-' + m + '-' + d;
        }
    }

    public static formatDate(date) {
        let myyear = date.getFullYear();
        let mymonth = date.getMonth() + 1;
        let myweekday = date.getDate();

        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }

    public static angleToRad(angle: number) {//角度转弧度
        return Math.PI / 180 * angle;
    }
    public static radToAngle(rad: number) {//弧度转角度
        return 180 / Math.PI * rad;
    }

    /**
     * 从最大值和最小值之间取值 [min,max];
     * @param value 值
     * @param min 最小值
     * @param max 最大值
     * @returns 
     */
    public static Clamp(value, min, max) {
        if (value < min) {
            return min;
        } else {
            return value > max ? max : value;
        }
    }

    /***
     * 将传入的10进制的数值 转变成 XX进制的值的字符串
     */

    /**
     * 将XX进制的字符串  转换为 10进制的值
     */

}
