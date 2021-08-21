import Api from "./api";

const CrudService = {
    getFiltered: async (resource, params) => {
        const response = await Api.get('/developers', params);
        return response;
    },
    delete: async (resource, id) => {
        const response = await Api.delete('/'+resource+'/' + id);
        return response;
    },
    info: async (resource, id) => {
        const response = await Api.get('/'+resource+'/' + id);
        return response;
    },
};

export default CrudService;