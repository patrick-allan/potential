import Api from "./api";

const CrudService = {
    getFiltered: async (resource, params) => {
        const response = await Api.get('/developers', params);
    },
    delete: async (resource, id) => {
        const response = await Api.delete('/'+resource+'/' + id);
    },
    info: async (resource, id) => {
        const response = await Api.get('/'+resource+'/' + id);
        return response;
    },
};

export default CrudService;