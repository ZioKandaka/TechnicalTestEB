function response(res, code, success, message, data, count, page, size) {
    let resp = {}
    resp.code = code
    resp.success = success
    resp.message = message || 'Success'
    resp.data = data
    if(count) resp.count = count
    if(page) resp.page = page
    if(size) resp.size = size

    res.status(code).json(resp)
}

module.exports = response