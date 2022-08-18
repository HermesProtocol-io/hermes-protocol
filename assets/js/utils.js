/*
 * @function getJSON
 * @description Get json content of the file
 * @param {string} URL - The url path for to getting the content
 * @returns {objectJson} 
 */
const getJSON = URL => fetchURL(URL, 'GET', 'json');

/*
 * @function fetchURL
 * @description Make ajax request based on method
 * @param {string} URL - The url path for to getting the content
 * @param {string} method - RESTful methods 
 * @param {string} dataType - Return data type as want
 * @returns {string} - The return data 
 */
function fetchURL(URL, method, dataType) {
    return $.ajax({
        url: URL,
        method: method,
        dataType: dataType
    });
}
