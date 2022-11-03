class PaginationTool {
    
    static MAX_PAGE_SIZE = 1001;

    static extractPaginationSetup(requestParams) {
        let page = parseInt(requestParams["page"]);
        let size = parseInt(requestParams["size"]);

        if( isNaN(page) || !page || page < 0) page = page = 1;
        if( isNaN(size) || !size || size < 0) size = PaginationTool.MAX_PAGE_SIZE;
        return {page, size};
    }

    static applyPagination(list, page, size) {
        if(size > list.length) size = list.length;
        const totalPages = Math.ceil(list.length / size);
        
        let offset = (page - 1) * size;
        if(offset >= list.length) offset = (totalPages -  1) * size;
        console.log("pagination", page, size, totalPages, offset);

        return list.slice( offset, offset + size);
    }
}

module.exports = PaginationTool;