
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */


/**
 * 声明Youngli.array包
 */
Youngli.array = Youngli.array || {};
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array/each.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.array;

/**
 * 遍历数组中所有元素
 * 
 * @param {Array}    source   需要遍历的数组
 * @param {Function} iterator 对每个数组元素进行调用的函数
 * @return {Array} 遍历的数组
 */
Youngli.array.each = function (source, iterator) {
    var returnValue, item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            returnValue = iterator.call(source, item, i);
    
            if (returnValue === false) {
                break;
            }
        }
    }
    return source;
};

// 声明快捷方法
var each = Youngli.array.each;
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array/filter.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.array;

/**
 * 从数组中筛选符合条件的元素
 * 
 * @param {Array}    source   需要筛选的数组
 * @param {Function} iterator 对每个数组元素进行筛选的函数
 * @return {Array} 符合条件的数组项集合
 */
Youngli.array.filter = function (source, iterator) {
    var result = [],
        resultIndex = 0,
        len = source.length,
        item,
        i;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            if (true === iterator.call(source, item, i)) {
                // resultIndex用于优化对result.length的多次读取
                result[resultIndex++] = item;
            }
        }
    }
    
    return result;
};
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array/find.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.array;

/**
 * 从数组中寻找符合条件的第一个数组元素
 * 
 * @param {Array}    source   需要查找的数组
 * @param {Function} iterator 对每个数组元素进行查找的函数
 * @return {Any|null} 符合条件的第一个数组元素，找不到时返回null
 */
Youngli.array.find = function (source, iterator) {
    var item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            if (true === iterator.call(source, item, i)) {
                return item;
            }
        }
    }
    
    return null;
};
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array/indexOf.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.array;

/**
 * 查询数组中指定元素的索引位置
 * 
 * @param {Array}        source             需要查询的数组
 * @param {Any|Function} condition          查询项或查询函数
 * @param {number}       position optional  查询的起始位索引位置
 * @return {number} 指定元素的索引位置
 */
Youngli.array.indexOf = function (source, condition, position) {
    var len = source.length,
        iterator = condition;
        
    // 参考ecma262的String.prototype.indexOf实现
    // 为undefined时归0，否则进行ToInteger(参见ecma262 3rd 9.4)
    position = Number(position) || 0;
    position = position < 0 ? Math.ceil(position) : Math.floor(position); 
    position = Math.min(Math.max(position, 0), len);
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    for ( ; position < len; position++) {
        if (true === iterator.call(source, source[position], position)) {
            return position;
        }
    }
    
    return -1;
};
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array/lastIndexOf.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/14
 */

///import Youngli.array;

/**
 * 从后往前，查询数组中指定元素的索引位置
 * 
 * @param {Array}        source    需要查询的数组
 * @param {Any|Function} condition 查询项或查询函数
 * @return {number} 指定元素的索引位置
 */
Youngli.array.lastIndexOf = function (source, condition) {
    var len = source.length,
        iterator = condition;
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    while (len--) {
        if (true === iterator.call(source, source[len], len)) {
            return len;
        }
    }
    
    return -1;
};
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array/remove.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */

///import Youngli.array;

/**
 * 移除数组中的项
 * 
 * @param {Array}        source    需要移除项的数组
 * @param {Any|Function} condition 要移除的项或移除匹配函数
 */
Youngli.array.remove = function (source, condition) {
    var len = source.length,
        iterator = condition;
    
    if ('function' != typeof condition) {
        iterator = function (item) {
            return condition === item;
        };
    }
    
    while (len--) {
        if (true === iterator.call(source, source[len], len)) {
            source.splice(len, 1);
        }
    }
};
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array/removeAt.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/30
 */

///import Youngli.array;

/**
 * 移除数组中的项
 * 
 * @param {Array}  source 需要移除项的数组
 * @param {number} index  要移除项的索引位置
 * @return {Any} 被移除的数组项
 */
Youngli.array.removeAt = function (source, index) {
    return source.splice(index, 1)[0];
};
/*
 * Tangram
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: array/unique.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.array;

/**
 * 过滤数组中的相同项
 * 
 * @param {Array}    source             需要过滤相同项的数组
 * @param {Function} compareFn optional 比较2个数组项是否相同的函数
 * @return {Array} 过滤后的新数组
 */
Youngli.array.unique = function (source, compareFn) {
    var len = source.length,
        result = source.slice(0),
        i, datum;
        
    if ('function' != typeof compareFn) {
        compareFn = function (item1, item2) {
            return item1 === item2;
        };
    }
    
    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];
        i = len - 1;
        while (i--) {
            if (compareFn(datum, result[i])) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
};

var array = Youngli.array;