import { sortOrderList } from "../constants/index.js";

export const parseSortParams = ({sortBy,sortOrder},fieldList) => {
    const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : "asc";
    const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];

    return {
        sortOrder:parsedSortOrder,
        sortBy:parsedSortBy
    };
};
